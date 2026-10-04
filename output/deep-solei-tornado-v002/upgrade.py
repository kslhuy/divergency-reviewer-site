from pathlib import Path
import json
root=Path(__file__).parent
p=root/'preview-data.js'
data=json.loads(p.read_text(encoding='utf-8-sig').split('=',1)[1].strip().rstrip(';'))
data['atlases']['tornado']='assets/tornado-cyan-crimson.png'
data['defaultScene']='quy-dao-hoi-phong'
s=next(s for s in data['scenes'] if s['id']==data['defaultScene'])
s.update(kind='Lốc cộng hưởng · cuốn lên không · đa hit',short='Xoáy kiếm + Tâm Bão',formula='Xoáy kiếm + Tâm Bão → lốc xanh–đỏ cuốn địch lên trời',roles=[{'character':'deep','text':'Lao Xoáy kiếm vào Tâm Bão, dẫn lưỡi kiếm chạy quanh cột lốc rồi chém hồi phong kết thúc.'},{'character':'solei','text':'Giữ Tâm Bão, truyền gió vào giao điểm và duy trì lực hút nâng địch lên cao.'}],beats=[{'at':0,'title':'Dựng Tâm Bão','caption':'Solei giữ tâm xoáy. Deep lao Xoáy kiếm vào mép gió; hai luồng năng lượng xanh và đỏ bắt đầu quấn nhau.'},{'at':2.8,'title':'Hợp thành cột lốc','caption':'Hai chiêu giao nhau tạo cơn lốc hình phễu xanh–đỏ. Chân lốc kéo hai địch từ mặt đất vào lõi.'},{'at':3.6,'title':'Cuốn lên · liên hoàn hit','caption':'Địch xoắn lên cao theo cột gió, nhận 11 hit liên tiếp mỗi mục tiêu. Deep chạy vòng ngoài, Solei giữ nguồn gió.'},{'at':8,'title':'Hồi phong · hất tung','caption':'Deep chém quay về, kích hit thứ 12 mỗi mục tiêu. Lốc bung đỉnh hất địch lên rồi văng ra hai phía, tan dần và kết thúc khống chế.'}],miss={'at':2.8,'title':'Lỡ giao điểm · không thành lốc','caption':'Deep vào muộn sau khi Tâm Bão ngắt. Hai chiêu tách rời: Deep lao ngang đánh một mục tiêu, không hút, không cuốn lên và không có chuỗi đa hit.'},condition='Swift đi vào mép Tâm Bão đang hoạt động trong cửa sổ đề xuất 0,2 giây; Solei duy trì tâm đến cú kết.',tradeoff='Lốc có vùng hút cố định và thời hạn hữu hạn. 11 hit cuốn + 1 hit hất mỗi mục tiêu; không tái bắt mục tiêu sau cú kết. Solei bị khóa giữ thế, Deep phải hoàn tất vòng hồi phong.')
p.write_text('window.PREVIEW_DATA = '+json.dumps(data,ensure_ascii=False,separators=(',',':'))+';\n',encoding='utf-8')
p=root/'choreography.js'
txt=p.read_text(encoding='utf-8')
start=txt.index(" 'quy-dao-hoi-phong'")
end=txt.index(" 'thang-kiem-phong'",start)
txt=txt[:start]+(root/'tornado-scene.js').read_text(encoding='utf-8')+txt[end:]
p.write_text(txt,encoding='utf-8')
p=root/'viewer.js';txt=p.read_text(encoding='utf-8')
txt=txt.replace('index:0,t:0,playing','index:0,t:0,missed:false,playing')
txt=txt.replace('routine(d,state.t,sc);','routine(d,state.t,sc,state.missed);')
txt=txt.replace('const b=sc.beats[phase];','const b=state.missed&&sc.miss&&state.t>=sc.miss.at?sc.miss:sc.beats[phase];')
txt=txt.replace("state.index=index;state.t=0;","state.index=index;state.t=0;state.missed=false;$('outcome').value='hit';")
txt=txt.replace("const sc=data.scenes[index];$('title')","const sc=data.scenes[index];$('outcome').hidden=!sc.miss;$('title')")
txt=txt.replace("function seek(t)","function outcome(missed){state.missed=!!missed&&!!data.scenes[state.index].miss;$('outcome').value=state.missed?'miss':'hit';render();}\n$('outcome').onchange=()=>outcome($('outcome').value==='miss');\nfunction seek(t)")
txt=txt.replace(')),seek,choose:', ')),seek,outcome,choose:')
txt=txt.replace("location.hash.slice(1)","(location.hash.slice(1)||data.defaultScene)")
p.write_text(txt,encoding='utf-8')
p=root/'index.html';txt=p.read_text(encoding='utf-8')
txt=txt.replace('<select id="speed"','<select id="outcome" aria-label="Kết quả phối hợp"><option value="hit">Đúng nhịp</option><option value="miss">Lỡ nhịp</option></select><select id="speed"')
txt=txt.replace('</style>','#eventBadge{top:18%;font-size:clamp(12px,1.4vw,19px)}@media(max-width:570px){.playbar{flex-wrap:wrap}#timeline{min-width:100px}}\n</style>')
p.write_text(txt,encoding='utf-8')
p=root/'design.md';txt=p.read_text(encoding='utf-8');a=txt.index('## Quỹ Đạo Hồi Phong');b=txt.index('## Thăng Kiếm Phong',a)
section='## Quỹ Đạo Hồi Phong — Lốc xanh–đỏ (cập nhật 2026-10-02)\n\n**Nguồn hiện có:** '+s['source']+'\n\n**Phần mới:** '+s['formula']+'.\n\n**Kích hoạt:** '+s['condition']+'\n\n**Đánh đổi:** '+s['tradeoff']+'\n\n'
section+='\n'.join(f"- {b['at']}s — **{b['title']}**: {b['caption']}" for b in s['beats'])+'\n\n**Lỡ nhịp:** '+s['miss']['caption']+'\n\n**Nhịp hit minh họa:** 3,60 + n × 0,36 giây, n=0…10; cú kết tại 8,00 giây. 12 hit/mục tiêu (24 tiếp xúc tổng cộng với hai địch), không phải thông số damage hay timing gameplay đã chốt. Hai địch chạm đất ở 9,55 và 9,80 giây.\n\n'
p.write_text((txt[:a]+section+txt[b:]).replace('Mỗi cảnh trình bày diễn biến phối hợp thành công.','Quỹ Đạo Hồi Phong có hai nhánh Đúng nhịp / Lỡ nhịp; bốn cảnh còn lại giữ bản gốc thành công.'),encoding='utf-8')
p=root/'sources.md';txt=p.read_text(encoding='utf-8').replace('là concept mới duy nhất','là concept mới của bản đầu')
txt+='\n\n## VFX lốc xanh–đỏ — 2026-10-02\n\n`assets/tornado-cyan-crimson.png`: concept VFX mới tạo bằng công cụ imagegen tích hợp, nền alpha trong suốt; dùng trực tiếp, không sửa sprite nhân vật. Preview co giãn từng dải ảnh theo thời gian tuyệt đối, thêm các vòng xoắn trước/sau, hạt hút, hit spark và chuyển động địch bằng Canvas. Prompt đầy đủ ở `tornado-prompt.txt`. Đây là một ảnh VFX được diễn hoạt trong canvas, chưa phải sprite sheet animation cho Unity.\n\nBản cập nhật thêm nhánh hụt riêng cho Quỹ Đạo Hồi Phong; giữ bốn cảnh khác. Kiểm tra bổ sung ghi trong validation.json.\n'
p.write_text(txt,encoding='utf-8')
