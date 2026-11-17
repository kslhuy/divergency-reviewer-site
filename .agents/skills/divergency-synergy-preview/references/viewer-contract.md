# Dữ liệu và API của viewer

Khung `assets/viewer` giữ CSS và bố cục của bản Solei × Tulas, nhưng không gắn cứng số nhân vật, tên, clip hoặc số cảnh. Chỉ sửa các thành phần giao diện khi người dùng yêu cầu; viết chuyển động mới trong `choreography.js`.

## preview-data.js

Gán một object vào `window.PREVIEW_DATA` (không fetch JSON):

```js
window.PREVIEW_DATA = {
  title: 'Solei × Tulas', brand: 'DIVERGENCY', subtitle: 'Synergy preview',
  characters: [
    {id:'solei',name:'Solei',color:'#98dace'},
    {id:'tulas',name:'Tulas',color:'#d7787e'}
  ],
  atlases: {main:'assets/packed.png'},
  sprites: { /* actor -> clip -> {ticks, frames} */ },
  scenes: [{
    id:'example',name:'Tên chiêu',kind:'Phối hợp không gian',short:'A + B',
    formula:'Chiêu A + chiêu B → chiêu C',duration:10,
    roles:[{character:'solei',text:'Mở chiêu'},{character:'tulas',text:'Biến đổi chiêu'}],
    beats:[
      {at:0,title:'Chuẩn bị',caption:'Ai đứng đâu và đang làm gì.'},
      {at:2,title:'Giao điểm',caption:'Điều kiện kết hợp đang xảy ra.'},
      {at:4,title:'Cộng hưởng',caption:'Kỹ năng mới khác gì hai chiêu riêng.'},
      {at:7,title:'Kết thúc',caption:'Kết quả và cách thoát khỏi combo.'}
    ],
    miss:{at:3,title:'Hụt nhịp',caption:'Điều kiện nào bị hụt và kết quả thay đổi.'}
  }]
};
```

Mỗi sprite frame: `{r:[x,y,w,h],p:[pivotX,pivotYFromTop],t:tickDuration,u:originalPPU,atlas:'main'}`. Tọa độ atlas gốc ở góc trên trái. `atlas` mặc định `main`; dùng nhiều atlas nếu cần. Blank cel là `{empty:true,t:...}`: giữ thời lượng nhưng không vẽ. Không ép mọi nhân vật/effect cùng pixel-per-unit: đọc kích thước/PPU và chọn `scale` hiển thị phù hợp; giá trị `u` chỉ giữ metadata, runtime dùng `scale` trực tiếp.

Nhóm 3+ người chỉ cần thêm character và role; không sửa HTML. Các `id` ngắn bằng ASCII; tên/miêu tả tiếng Việt. Một character có thể tồn tại trong danh sách toàn cục nhưng chỉ hiện role ở một số scene. Mỗi scene cần >=2 nhân vật phối hợp thật, không tính enemy/dummy.

## choreography.js

```js
window.PREVIEW_SCENES = {
  example(d,t,missed,scene) {
    const x=d.mix(180,300,d.smooth(d.seg(t,0,2)));
    d.shadow(x,292);
    d.sprite('solei','Idle',x,292,t,{scale:1.25,loop:true});
    d.sprite('tulas','Idle',600,292,t,{flip:true,scale:1.25,loop:true});
    d.label('SOLEI',x,314,'#98dace');
    if(!missed && t>3 && t<4) d.event('CỘNG HƯỞNG');
    // Thêm động tác, vật thể, giao điểm, tương tác mục tiêu và kết thúc thật của ý tưởng.
  }
};
```

`draw` luôn nhận thời gian tuyệt đối tính bằng giây. Không thay state tích lũy. Dùng `d.seg(t,start,end)` để tính tiến độ local, `d.smooth(p)` để easing. Các helper:

| API | Công dụng |
|---|---|
| `d.sprite(actor,clip,x,y,time,options)` | Chọn cel theo tick và vẽ theo pivot; `time` giây hoặc 0..1 khi `normalized:true`. |
| `options` | `scale=1.25, flip=false, alpha=1, rotation=0, center=false, normalized=false, loop=false`. |
| `d.frame(actor,clip,time,normalized,loop)` | Lấy frame để dùng riêng. |
| `d.draw(frame,x,y,options)` | Vẽ một frame có sẵn. |
| `d.image(atlas,x,y,{rect,anchor,scale,...})` | Vẽ hình concept mới đã khai trong atlases; `rect` tùy chọn. |
| `d.shadow(x,y,width=32,alpha=.4)` | Bóng nằm trên mặt sân. |
| `d.label(text,x,y,color)` | Nhãn gắn với vị trí. |
| `d.line(points,color,width=2,alpha=1)` | Đường/vệt quỹ đạo đơn giản. |
| `d.ring(x,y,rx,ry,color,width=2,alpha=1,start=0,end=2π)` | Vòng/đường cung. |
| `d.burst(x,y,progress,color,size=80)` | Tia va chạm hữu hạn theo tiến độ. |
| `d.sparks(x,y,time,color,count=16,radius=32)` | Hạt deterministic theo thời gian. |
| `d.event(text)` | Thông báo ngắn trên sân trong frame hiện tại. |
| `d.g`, `d.images`, `d.width`, `d.height`, `d.ground` | Canvas/context và ảnh đã nạp để viết VFX đặc biệt. |

`d.image` dùng ảnh RGBA nguồn trực tiếp. Chroma key, anchor riêng từng pose, mask hoặc hiệu ứng phức tạp có thể bổ sung trong bản output khi cần; khung không tự đoán xử lý cho ảnh mới.

## Lấy sprite từ Unity

1. Viết `Temp/SynergyPreviewExport.json` trong project hiện hành:

```json
{"output":"output/my-synergy-v001/raw","characters":{"solei":"Assets/SOs/SpriteAnimation/Solei/Solei_Sprite.asset","tulas":"Assets/SOs/SpriteAnimation/Tulas_Sprite.asset"}}
```

2. Dùng `unity-cli` chạy `scripts/ExportSynergyPreview.cs`, entry `ExportSynergyPreview.Run`. Script chỉ xuất texture và metadata; không SaveAssets/scene.
3. Có thể viết `selection.json` ánh xạ actor -> danh sách tên clip cần dùng. Chạy:

```powershell
python '<skill-dir>/scripts/pack_sprites.py' --raw '<output>/raw/sprites.json' --out '<output>/assets' --select '<output>/selection.json'
```

4. Đọc `assets/sprites.json`, đưa object vào trường `sprites` của `preview-data.js`; khai `atlases.main='assets/packed.png'`. Giữ selection và design với output để có thể sửa lại.

Nếu clip nguồn có tick 0 hoặc âm, kiểm tra timing trước. Có thể chủ động chọn nhịp cho riêng preview bằng `--zero-tick-duration 6` (6 tick = 0,1 giây); script ghi từng override vào `packing-notes.json`. Không sửa asset nguồn hoặc mô tả nhịp này là timing gameplay gốc. Mẫu API có một số cel enemy Gunn dùng nhịp minh họa như vậy, ghi trong `assets/example/timing-notes.json`.

## Đóng gói

`bundle_preview.py` nhúng JS/CSS local và thay URL ảnh có trong `preview-data.js` bằng data URL; nhận ảnh PNG/JPEG/WebP/GIF. Ảnh phải nằm trong output. Không dùng fetch, CDN hoặc URL bên ngoài nếu muốn file offline tự đủ. Các đường dẫn nêu trong ghi chú không bị thay thành tài nguyên chạy.

`Synergy_Preview.html` là bản xem cuối; `index.html` là bản phát triển. Sửa source rồi bundle lại, không sửa riêng bản đã nhúng và bỏ quên source. Ghi `sources.md` và `design.md` ngắn gọn cho lần chỉnh tiếp.
