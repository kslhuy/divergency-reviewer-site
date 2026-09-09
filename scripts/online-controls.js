function createOnlineControls({getSession,note,bar,saveButton,dialog,restore,isEditing,hasChanges}) {
  const controls = document.createElement('div'); controls.className='online-account'; controls.hidden=true;
  note.after(controls);
  function button(text, action, parent=controls) {
    const b=document.createElement('button'); b.type='button'; b.textContent=text; b.onclick=action; parent.append(b); return b;
  }
  function link(text,path,parent=controls) {
    const a=document.createElement('a'); a.textContent=text; a.href=path; a.target='_top'; parent.append(a); return a;
  }
  function modal(title,description) {
    dialog.replaceChildren(); const h=document.createElement('h2');h.textContent=title;dialog.append(h);
    if(description){const p=document.createElement('p');p.textContent=description;dialog.append(p);}
    button('Đóng',()=>dialog.close(),dialog); if(!dialog.open)dialog.showModal();
  }
  function error(e) { const p=document.createElement('p');p.className='is-error';p.setAttribute('role','alert');p.textContent=e.message;dialog.append(p); }
  async function api(path,method='GET',data) {
    const r=await fetch(path,{method,headers:{'Content-Type':'application/json','X-Editor-Token':'same-origin'},body:data?JSON.stringify(data):undefined,signal:AbortSignal.timeout(20000)});
    const result=await r.json();if(!r.ok)throw new Error(result.error||'Không thực hiện được.');return result;
  }
  function access() {
    const s=getSession();
    if(!s){modal('Chưa kết nối được','Tải lại trang rồi thử lại.');return;}
    if(!s.user){
      modal('Đăng nhập để chỉnh sửa','Dùng tài khoản ChatGPT của bạn. Quản trị viên sẽ duyệt quyền sửa; khách vẫn đọc được tài liệu.');
      link('Đăng nhập bằng ChatGPT','/signin-with-chatgpt?return_to='+encodeURIComponent('/?edit=1#gameplay'),dialog);return;
    }
    modal('Quyền biên tập',s.role==='pending'?'Yêu cầu của bạn đang chờ quản trị viên duyệt. Sau khi được duyệt, tải lại trang.':'Bạn đã đăng nhập với '+s.user.email+'. Gửi yêu cầu để được thêm vào nhóm biên tập.');
    if(s.role!=='pending')button('Gửi yêu cầu quyền sửa',async e=>{
      e.target.disabled=true;
      try{await api('/api/access','POST',{});s.role='pending';update();access();}catch(err){error(err);e.target.disabled=false;}
    },dialog);
  }
  async function team() {
    modal('Thành viên biên tập','Thành viên mở trang, đăng nhập và gửi yêu cầu. Bạn duyệt quyền sửa tại đây.');
    try {
      const {members}=await api('/api/members');
      for(const m of members){
        const row=document.createElement('div');row.className='online-member';
        const p=document.createElement('p');p.textContent=m.email+' · '+({admin:'Quản trị viên',editor:'Được sửa',pending:'Chờ duyệt',revoked:'Đã thu hồi'}[m.role]||m.role);row.append(p);
        if(m.role!=='admin')button(m.role==='editor'?'Thu hồi quyền sửa':'Duyệt quyền sửa',async e=>{
          e.target.disabled=true;
          try{await api('/api/members','PUT',{userId:m.userId,role:m.role==='editor'?'revoked':'editor'});team();}catch(err){error(err);e.target.disabled=false;}
        },row);
        dialog.append(row);
      }
    }catch(e){error(e);}
  }
  async function history() {
    modal('Lịch sử gameplay','Mỗi lần lưu là một phiên bản. Khôi phục tạo bản nháp để bạn xem lại rồi bấm Lưu; các phiên bản cũ vẫn được giữ.');
    try {
      const {revisions}=await api('/api/history');
      if(!revisions.length){const p=document.createElement('p');p.textContent='Chưa có lần lưu online nào.';dialog.append(p);}
      for(const r of revisions){
        const row=document.createElement('div');row.className='online-member';
        const p=document.createElement('p');p.textContent='Bản '+r.revision+' · '+new Date(r.savedAt).toLocaleString('vi-VN')+' · '+r.savedBy;row.append(p);
        button('Tải bản này',async()=>{
          try{const data=await api('/api/history?revision='+r.revision);const url=URL.createObjectURL(new Blob([data.html],{type:'text/html;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='gameplay-v'+r.revision+'.html';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}catch(e){error(e);}
        },row);
        if(isEditing())button('Khôi phục vào bản nháp',async()=>{
          if(hasChanges()){error(new Error('Lưu hoặc tải bản nháp đang sửa trước khi khôi phục phiên bản khác.'));return;}
          try{const data=await api('/api/history?revision='+r.revision);restore(data.html);dialog.close();}catch(e){error(e);}
        },row);
        dialog.append(row);
      }
    }catch(e){error(e);}
  }
  function update() {
    const s=getSession();if(!s?.online)return;
    controls.hidden=false;controls.replaceChildren();saveButton.textContent='Lưu online';
    if(!s.user){link('Đăng nhập để chỉnh sửa','/signin-with-chatgpt?return_to='+encodeURIComponent('/?edit=1#gameplay'));return;}
    const label=document.createElement('span');label.textContent=s.user.email;controls.append(label);
    if(s.canEdit){
      button('Lịch sử',history);
      if(!bar.querySelector('[data-online-history]')){const b=button('Lịch sử',history,bar.querySelector('.editor-bar-row:last-child'));b.dataset.onlineHistory='true';}
    }else button(s.role==='pending'?'Đang chờ quyền sửa':'Yêu cầu quyền sửa',access);
    if(s.role==='admin')button('Thành viên',team);
    link('Đăng xuất','/signout-with-chatgpt?return_to=/');
  }
  return {update,access};
}
