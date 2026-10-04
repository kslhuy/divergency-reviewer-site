local sheet = Image{ fromFile=app.params.source }
assert(sheet.width == 800 and sheet.height == 320, 'Unexpected source sheet dimensions')
local sprite = Sprite(160, 160, ColorMode.RGB)
sprite.layers[1].name = 'Freeze tornado - Deep red + Solei mint'
app.transaction(function()
  for i=0,9 do
    if i>0 then sprite:newEmptyFrame() end
    local image = Image(160,160,ColorMode.RGB)
    image:drawImage(sheet, Point(-(i%5)*160, -math.floor(i/5)*160))
    sprite:newCel(sprite.layers[1],sprite.frames[i+1],image,Point(0,0))
    -- Millisecond timing alternates 83/84 ms to approximate 12 FPS accurately.
    sprite.frames[i+1].duration = (math.floor((i+1)*1000/12+.5)-math.floor(i*1000/12+.5))/1000
  end
  local tag=sprite:newTag(1,10)
  tag.name='Tornado_Loop'
  sprite.data='Original Freeze freeze_ww.png geometry, ten 160x160 frames; palette-only red/mint recolor. Nominal 12 FPS.'
end)
sprite:saveAs(app.params.output)
print('Saved '..app.params.output..' | '..#sprite.frames..' frames | 160x160 | 12 FPS')
sprite:close()
