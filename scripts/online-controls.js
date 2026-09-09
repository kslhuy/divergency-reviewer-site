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
    button('Close',()=>dialog.close(),dialog); if(!dialog.open)dialog.showModal();
  }
  function error(e) { const p=document.createElement('p');p.className='is-error';p.setAttribute('role','alert');p.textContent=e.message;dialog.append(p); }
  async function api(path,method='GET',data) {
    const r=await fetch(path,{method,headers:{'Content-Type':'application/json','X-Editor-Token':'same-origin'},body:data?JSON.stringify(data):undefined,signal:AbortSignal.timeout(20000)});
    const result=await r.json();if(!r.ok)throw new Error(result.error||'Could not complete the request.');return result;
  }
  function access() {
    const s=getSession();
    if(!s){modal('Connection unavailable','Reload the page and try again.');return;}
    if(!s.user){
      modal('Sign in to edit','Sign in with ChatGPT and request editor access. Visitors can still read the document.');
      link('Sign in with ChatGPT','/signin-with-chatgpt?return_to='+encodeURIComponent('/?edit=1#gameplay'),dialog);return;
    }
    modal('Editor access',s.role==='pending'?'Your request is awaiting approval. Reload after an administrator approves it.':'Signed in as '+s.user.email+'. Request access to join the editing team.');
    if(s.role!=='pending')button('Request access',async e=>{
      e.target.disabled=true;
      try{await api('/api/access','POST',{});s.role='pending';update();access();}catch(err){error(err);e.target.disabled=false;}
    },dialog);
  }
  async function team() {
    modal('Editors','Approve or revoke editing access for team members.');
    try {
      const {members}=await api('/api/members');
      for(const m of members){
        const row=document.createElement('div');row.className='online-member';
        const p=document.createElement('p');p.textContent=m.email+' · '+({admin:'Admin',editor:'Editor',pending:'Pending',revoked:'Revoked'}[m.role]||m.role);row.append(p);
        if(m.role!=='admin')button(m.role==='editor'?'Revoke access':'Approve access',async e=>{
          e.target.disabled=true;
          try{await api('/api/members','PUT',{userId:m.userId,role:m.role==='editor'?'revoked':'editor'});team();}catch(err){error(err);e.target.disabled=false;}
        },row);
        dialog.append(row);
      }
    }catch(e){error(e);}
  }
  async function history() {
    modal('Version history','Every save keeps a version. Restore into a draft, review it, then save. Earlier versions are retained.');
    try {
      const {revisions}=await api('/api/history');
      if(!revisions.length){const p=document.createElement('p');p.textContent='No saved versions yet.';dialog.append(p);}
      for(const r of revisions){
        const row=document.createElement('div');row.className='online-member';
        const p=document.createElement('p');p.textContent='Version '+r.revision+' · '+new Date(r.savedAt).toLocaleString('en-GB')+' · '+r.savedBy;row.append(p);
        button('Download HTML',async()=>{
          try{const data=await api('/api/history?revision='+r.revision);const url=URL.createObjectURL(new Blob([data.html],{type:'text/html;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='gameplay-v'+r.revision+'.html';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}catch(e){error(e);}
        },row);
        if(isEditing())button('Restore to draft',async()=>{
          if(hasChanges()){error(new Error('Save or download your current draft before restoring another version.'));return;}
          try{const data=await api('/api/history?revision='+r.revision);restore(data.html);dialog.close();}catch(e){error(e);}
        },row);
        dialog.append(row);
      }
    }catch(e){error(e);}
  }
  function update() {
    const s=getSession();if(!s?.online)return;
    controls.hidden=false;controls.replaceChildren();saveButton.textContent='Save';
    if(!s.user){link('Sign in to edit','/signin-with-chatgpt?return_to='+encodeURIComponent('/?edit=1#gameplay'));return;}
    const label=document.createElement('span');label.textContent=s.user.email;controls.append(label);
    if(s.canEdit){
      button('History',history);
      if(!bar.querySelector('[data-online-history]')){const b=button('History',history,bar.querySelector('.editor-bar-row:last-child'));b.dataset.onlineHistory='true';}
    }else button(s.role==='pending'?'Access pending':'Request access',access);
    if(s.role==='admin')button('Members',team);
    link('Sign out','/signout-with-chatgpt?return_to=/');
  }
  return {update,access};
}
