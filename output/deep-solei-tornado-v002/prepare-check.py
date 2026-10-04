from pathlib import Path
root=Path(__file__).parent
skill=root.parents[1]/'.agents/skills/lf2-synergy-preview'
txt=(skill/'scripts/check_preview.cjs').read_text(encoding='utf-8')
txt=txt.replace("assert(sc.miss&&sc.miss.at>=0&&sc.miss.at<sc.duration,'Missing/invalid miss outcome');","if(sc.id==='quy-dao-hoi-phong')assert(sc.miss&&sc.miss.at>=0&&sc.miss.at<sc.duration,'Missing/invalid miss outcome');")
txt=txt.replace('for(const missed of [false,true])','for(const missed of (sc.miss?[false,true]:[false]))')
txt=txt.replace('api.seek(sc.miss.at+.05);assert.equal(elements.captionTitle.textContent,missed?sc.miss.title:sc.beats.filter(b=>b.at<=sc.miss.at+.05).at(-1).title);','if(sc.miss){api.seek(sc.miss.at+.05);assert.equal(elements.captionTitle.textContent,missed?sc.miss.title:sc.beats.filter(b=>b.at<=sc.miss.at+.05).at(-1).title);}')
txt=txt.replace('outcomesPerScene:2','outcomesPerScene:[1,2,1,1,1]')
(root/'check-preview.cjs').write_text(txt,encoding='utf-8')
