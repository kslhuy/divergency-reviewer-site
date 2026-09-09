const stagePlans = (() => {
  const plans = {
    'Sewer2.png': { points:[[5,57],[30,52],[47,58],[91,32],[97,60]], route:[[5,66],[30,66],[30,79],[86,79],[91,60],[97,60]], choice:[[30,52],[47,58]] },
    'RuinedTrainStation_2_Laundel.png': { points:[[5,52],[33,46],[46,57],[62,57],[78,57],[92,57]], route:[[5,73],[46,73],[62,73],[78,73],[92,73]], choice:[[25,67],[33,46],[41,29],[78,29]] },
    'Sewer4.png': { points:[[9,52],[40,83],[61,42],[93,53]], route:[[9,52],[22,60],[40,83],[46,66],[61,42],[73,31],[86,39],[93,53]], choice:[[40,83],[61,83],[61,42]] },
    'Harbor_Sunset_Battle_Map.png': { points:[[5,52],[74,52],[59,48],[48,47],[80,21],[43,79]], route:[[5,67],[27,68],[43,64],[74,60],[59,55],[48,47]], danger:[[80,21],[43,79]] },
    'submarine_backup_generator_b_engine_heat_room.png': { points:[[7,62],[28,78],[53,65],[94,67]], route:[[7,85],[28,85],[53,82],[94,82]], danger:[[35,88],[44,88]] },
    'submarine_shemal_containment_chamber.png': { points:[[7,71],[30,66],[50,86],[71,66],[94,71]], route:[[7,85],[18,85]], choice:[[30,66],[30,80],[71,80],[71,66]], danger:[[37,91],[63,91]] },
  };
  let serial = 0;
  const ns = 'http://www.w3.org/2000/svg';
  function svgNode(tag, attrs) {
    const node = document.createElementNS(ns, tag);
    for (const [key,value] of Object.entries(attrs)) node.setAttribute(key, value);
    return node;
  }
  function enhance(root = document) {
    for (const img of root.querySelectorAll('figure img')) {
      if (!img.alt.startsWith('Phác thảo ') || img.closest('.stage-map')) continue;
      const plan = plans[decodeURIComponent(new URL(img.src, document.baseURI).pathname.split('/').pop())];
      if (!plan) continue;
      if (!img.naturalWidth) {
        if (!img.dataset.stageWaiting) {
          img.dataset.stageWaiting = 'true';
          img.addEventListener('load', () => { delete img.dataset.stageWaiting; if (!img.closest('[contenteditable="true"]')) enhance(root); }, {once:true});
        }
        continue;
      }
      const figure = img.closest('figure'); figure.classList.add('stage-plan');
      const scroll = document.createElement('div'); scroll.className = 'stage-plan-scroll';
      const map = document.createElement('div'); map.className = 'stage-map';
      img.replaceWith(scroll); scroll.append(map); map.append(img);
      const w = img.naturalWidth, h = img.naturalHeight;
      const svg = svgNode('svg', {class:'stage-map-overlay',viewBox:`0 0 ${w} ${h}`,'aria-hidden':'true'});
      const defs = svgNode('defs', {}); svg.append(defs);
      const key = document.createElement('div'); key.className = 'stage-plan-key stage-map-overlay'; key.setAttribute('aria-hidden','true');
      for (const [type,color,label] of [['route','#5fe5ce','Lối đi chính'],['choice','#ffd36c','Thao tác / nhánh lựa chọn'],['danger','#ff887e','Vị trí nguy hiểm']]) {
        if (!plan[type]) continue;
        const id = `stage-arrow-${++serial}`;
        const marker = svgNode('marker', {id,viewBox:'0 0 10 10',refX:8,refY:5,markerWidth:4,markerHeight:4,orient:'auto'});
        marker.append(svgNode('path',{d:'M 0 0 L 10 5 L 0 10 z',fill:color})); defs.append(marker);
        const line = svgNode('polyline', {points:plan[type].map(([x,y])=>`${x*w/100},${y*h/100}`).join(' '),fill:'none',stroke:color,'stroke-width':w/260,'stroke-linejoin':'round','stroke-linecap':'round','marker-end':`url(#${id})`});
        if (type !== 'route') line.setAttribute('stroke-dasharray',`${w/130} ${w/200}`);
        svg.append(line);
        const labelNode = document.createElement('span'); labelNode.className = `stage-key-${type}`; labelNode.textContent = label; key.append(labelNode);
      }
      map.append(svg);
      plan.points.forEach(([x,y],i) => {
        const marker = document.createElement('span'); marker.className = 'stage-marker stage-map-overlay';
        marker.textContent = i+1; marker.style.left = x+'%'; marker.style.top = y+'%'; marker.setAttribute('aria-hidden','true'); map.append(marker);
      });
      scroll.after(key);
    }
  }
  function clear(root) {
    root.querySelectorAll('.stage-map-overlay').forEach(node => node.remove());
    root.querySelectorAll('.stage-plan-scroll').forEach(node => { const img = node.querySelector('img'); if (img) node.replaceWith(img); });
    root.querySelectorAll('.stage-plan').forEach(node => node.classList.remove('stage-plan'));
    root.querySelectorAll('[data-stage-waiting]').forEach(node => node.removeAttribute('data-stage-waiting'));
  }
  return { enhance, clear };
})();
