import test from 'node:test';
import assert from 'node:assert/strict';
import {routines,weekKey,sessionKey} from '../routines.js';
import {figure} from '../illustrations.js';
import {readFileSync,existsSync} from 'node:fs';
test('calendar starts Monday and distinguishes new weeks',()=>{assert.equal(weekKey(new Date(2026,9,6)),'2026-10-05');assert.equal(weekKey(new Date(2026,9,11)),'2026-10-05');assert.equal(weekKey(new Date(2026,9,12)),'2026-10-12');assert.equal(weekKey(new Date(2026,0,1)),'2025-12-29');assert.notEqual(sessionKey(0,new Date(2026,9,5)),sessionKey(0,new Date(2026,9,12)));});
test('all seven days contain usable prescriptions and movement guides',()=>{assert.equal(routines.length,7);for(const r of routines){assert.ok(r.exercises.length>=2);for(const e of r.exercises){assert.ok(e.sets>=1&&e.sets<=4);assert.ok(e.reps);assert.ok(e.rest>=0);assert.equal(e.cues.length,3);assert.match(figure(e.type),/<svg/);assert.match(figure(e.type,true),/<svg/);}}});
test('PWA assets resolve locally and use portable paths',()=>{const manifest=JSON.parse(readFileSync('manifest.webmanifest','utf8'));assert.equal(manifest.start_url,'./');assert.equal(manifest.display,'standalone');for(const icon of manifest.icons)assert.ok(existsSync(icon.src));const sw=readFileSync('sw.js','utf8');for(const path of sw.match(/const FILES=\[(.*?)\]/s)[1].matchAll(/'([^']+)'/g)){assert.ok(existsSync(path[1]),path[1]);}});
