import test from 'node:test';
import assert from 'node:assert/strict';
import {routines,foundationRoutines,plans,weekKey,sessionKey,isSessionKey,routineForSession,planForSession} from '../routines.js';
import {figure} from '../illustrations.js';
import {readFileSync,existsSync} from 'node:fs';
test('calendar starts Monday and distinguishes new weeks',()=>{assert.equal(weekKey(new Date(2026,9,6)),'2026-10-05');assert.equal(weekKey(new Date(2026,9,11)),'2026-10-05');assert.equal(weekKey(new Date(2026,9,12)),'2026-10-12');assert.equal(weekKey(new Date(2026,0,1)),'2025-12-29');assert.notEqual(sessionKey(0,new Date(2026,9,5)),sessionKey(0,new Date(2026,9,12)));});
test('all seven days contain usable prescriptions and movement guides',()=>{assert.equal(routines.length,7);for(const r of routines){assert.ok(r.exercises.length>=2);for(const e of r.exercises){assert.ok(e.sets>=1&&e.sets<=4);assert.ok(e.reps);assert.ok(e.rest>=0);assert.equal(e.cues.length,3);assert.match(figure(e.type),/<svg/);assert.match(figure(e.type,true),/<svg/);}}});
test('PWA assets resolve locally and use portable paths',()=>{const manifest=JSON.parse(readFileSync('manifest.webmanifest','utf8'));assert.equal(manifest.start_url,'./');assert.equal(manifest.display,'standalone');for(const icon of manifest.icons)assert.ok(existsSync(icon.src));const sw=readFileSync('sw.js','utf8');for(const path of sw.match(/const FILES=\[(.*?)\]/s)[1].matchAll(/'([^']+)'/g)){assert.ok(existsSync(path[1]),path[1]);}});

test('original histories and gym sets remain separate while old backups stay compatible',()=>{
 const date=new Date(2026,9,6),original=sessionKey(0,date,'foundation'),gym=sessionKey(0,date,'gym');
 assert.equal(original,'2026-10-05:0');assert.equal(gym,'2026-10-05:0:gym-v1');
 assert.notEqual(original,gym);assert.ok(isSessionKey(original));assert.ok(isSessionKey(gym));assert.ok(!isSessionKey('2026-10-05:7:gym-v1'));assert.ok(!isSessionKey('2026-10-05:0:other'));
 assert.equal(planForSession(original),'foundation');assert.equal(routineForSession(original).exercises[0].name,'Dumbbell bench press');assert.equal(routineForSession(gym).exercises[0].name,'Barbell bench press');
});
test('full gym covers barbell, cable, upper machines and lower machines with setup/load cues',()=>{
 const exercises=routines.flatMap(r=>r.exercises);
 for(const name of ['Barbell bench press','Machine shoulder press','Cable biceps curl','Rope triceps pushdown','45° leg press','Seated leg curl','Leg extension','Standing calf raise machine','Chest-supported machine row','Pec deck chest fly','Smith machine squat','Hip abduction machine','Cable Pallof press']){
  const e=exercises.find(e=>e.name===name);assert.ok(e,name);assert.ok(e.setup);assert.ok(e.equipment);assert.ok(e.loadHint);assert.equal(e.weighted,true);
 }
 assert.match(exercises.find(e=>e.name==='Barbell bench press').setup,/safety|spotter/);
 assert.match(exercises.find(e=>e.name==='Smith machine squat').setup,/safety stops/);
 assert.equal(plans.gym.routines.length,7);assert.equal(plans.foundation.routines.length,7);
 for(const index of [2,5,6])assert.equal(routines[index],foundationRoutines[index]);
 assert.equal(foundationRoutines[2].exercises[1].weighted,false);
});
