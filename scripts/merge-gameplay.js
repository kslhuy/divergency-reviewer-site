// Three-way merge of normalized top-level HTML blocks. Conflicts remain explicit.
function mergeGameplayBlocks(base, mine, theirs) {
  const equal = (a, b) => a.length === b.length && a.every((x, i) => x === b[i]);
  function changes(next) {
    const rows = Array.from({length: base.length + 1}, () => new Uint32Array(next.length + 1));
    for (let i = base.length - 1; i >= 0; i--) for (let j = next.length - 1; j >= 0; j--)
      rows[i][j] = base[i] === next[j] ? 1 + rows[i + 1][j + 1] : Math.max(rows[i + 1][j], rows[i][j + 1]);
    const edits = []; let i = 0, j = 0, edit;
    while (i < base.length || j < next.length) {
      if (i < base.length && j < next.length && base[i] === next[j]) {
        if (edit) { edits.push(edit); edit = null; } i++; j++;
      } else {
        edit ||= {start:i, end:i, blocks:[]};
        if (j < next.length && (i === base.length || rows[i][j + 1] >= rows[i + 1][j])) edit.blocks.push(next[j++]);
        else edit.end = ++i;
      }
    }
    if (edit) edits.push(edit);
    return edits;
  }
  if (equal(mine, theirs)) return [{blocks:mine}];
  if (equal(base, mine)) return [{blocks:theirs}];
  if (equal(base, theirs)) return [{blocks:mine}];
  // Bound memory for unusually large imported documents; show an explicit conflict instead.
  if (base.length * Math.max(mine.length, theirs.length) > 4_000_000) return [{mine, theirs}];
  const edits = [...changes(mine).map(e => ({...e, side:'mine'})), ...changes(theirs).map(e => ({...e, side:'theirs'}))]
    .sort((a,b) => a.start - b.start || a.end - b.end);
  const result = []; let cursor = 0;
  for (let n = 0; n < edits.length;) {
    const group = [edits[n++]]; const start = group[0].start; let end = group[0].end;
    // Include boundary insertions conservatively: no insertion is silently dropped.
    while (n < edits.length && (edits[n].start < end || (edits[n].start === end &&
      (edits[n].end === end || group.some(e => e.start === end && e.end === end))))) {
      group.push(edits[n]); end = Math.max(end, edits[n++].end);
    }
    result.push({blocks:base.slice(cursor, start)});
    const render = side => {
      const output = []; let at = start;
      for (const edit of group.filter(e => e.side === side)) { output.push(...base.slice(at, edit.start), ...edit.blocks); at = edit.end; }
      return [...output, ...base.slice(at, end)];
    };
    const a = render('mine'), b = render('theirs'), original = base.slice(start,end);
    result.push(equal(a,b) || equal(b,original) ? {blocks:a} : equal(a,original) ? {blocks:b} : {mine:a,theirs:b});
    cursor = end;
  }
  result.push({blocks:base.slice(cursor)});
  return result;
}
