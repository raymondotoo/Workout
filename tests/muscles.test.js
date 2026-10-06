import test from 'node:test';
import assert from 'node:assert/strict';
import {plans} from '../routines.js';
import {targetsFor,muscleDiagram} from '../muscles.js';
import {anatomy} from '../muscle-anatomy.js';
import {readFileSync} from 'node:fs';
test('every plan exercise and easier variant has real body polygons and valid targets',()=>{
 const regions=new Set(Object.values(anatomy).flatMap(groups=>groups.map(g=>g.muscle)));
 for(const p of Object.values(plans))for(const r of p.routines)for(const e of r.exercises)for(const exercise of [e,...(e.easier?[e.easier]:[])]){
  const t=targetsFor(exercise);assert.ok(t.primary.length,exercise.name);
  for(const m of [...t.primary,...t.secondary])assert.ok(regions.has(m),`${exercise.name}: ${m}`);
  assert.ok(t.primary.every(m=>!t.secondary.includes(m)));
  const html=muscleDiagram(exercise,true);assert.equal((html.match(/<svg /g)||[]).length,1);assert.match(html,/muscle-primary/);assert.match(html,/role="img"/);
 }
});
test('presses highlight chest, leg curl highlights hamstrings, mobility and cardio are not labeled growth',()=>{
 assert.deepEqual(targetsFor({name:'Dumbbell floor press'}).primary,['chest']);
 assert.deepEqual(targetsFor({name:'Seated leg curl'}).primary,['hamstring']);
 assert.match(muscleDiagram({name:'Standing chest opener'}),/Areas stretched/);
 assert.match(muscleDiagram({name:'Optional easy walk'}),/Muscles used/);
 assert.match(muscleDiagram({name:'Knee push-ups'}),/Supporting:/);
});
test('muscle sources ship offline and in Pages with retained licensing',()=>{
 const sw=readFileSync('sw.js','utf8'),workflow=readFileSync('.github/workflows/pages.yml','utf8');
 for(const file of ['muscles.js','muscle-anatomy.js']){assert.ok(sw.includes(file));assert.ok(workflow.includes(file));}
 assert.match(readFileSync('assets/muscle-diagrams-NOTICE.txt','utf8'),/MIT License/);
 assert.ok(sw.includes('muscle-diagrams-NOTICE.txt'));
});
