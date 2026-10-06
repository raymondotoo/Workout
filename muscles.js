import {anatomy} from './muscle-anatomy.js';
const group=(primary,secondary=[],mode='strength',note='')=>({primary,secondary,mode,note});
const chest=group(['chest'],['triceps','front-deltoids']);
const row=group(['upper-back'],['biceps','back-deltoids']);
const squat=group(['quadriceps','gluteal'],['hamstring']);
const hinge=group(['hamstring','gluteal'],['lower-back']);
const shoulders=group(['front-deltoids'],['triceps']);
const calves=group(['calves','left-soleus','right-soleus']);
const walk=group(['quadriceps','gluteal','hamstring','calves'],[],'cardio','Walking trains aerobic fitness; the highlighted leg muscles help move you.');
export const muscleTargets={
 'Dumbbell bench press':chest,'Barbell bench press':chest,'Incline dumbbell press':chest,'Dumbbell floor press':chest,
 'Push-ups':group(['chest'],['triceps','front-deltoids','abs']), 'Knee push-ups':chest,
 'Pec deck chest fly':group(['chest'],['front-deltoids']),
 'Seated cable row':row,'Single-arm dumbbell row':row,'Chest-supported machine row':row,'Dumbbell bent-over row':row,
 'Lat pulldown':group(['upper-back'],['biceps']),
 'Dumbbell shoulder press':shoulders,'Machine shoulder press':shoulders,
 'Dumbbell lateral raise':group(['front-deltoids','back-deltoids'],[],'strength','Targets the side deltoids; this drawing shows the shoulder region.'),
 'Dumbbell curl':group(['biceps'],['forearm']),'Cable biceps curl':group(['biceps'],['forearm']),
 'Dumbbell hammer curl':group(['biceps','forearm']),
 'Cable triceps pushdown':group(['triceps']),'Rope triceps pushdown':group(['triceps']),
 'Goblet squat':squat,'Bodyweight squat':squat,'Smith machine squat':squat,'45° leg press':squat,
 'Reverse lunge':group(['quadriceps','gluteal'],['hamstring']),
 'Dumbbell Romanian deadlift':hinge,'Seated leg curl':group(['hamstring']),
 'Leg extension':group(['quadriceps']),
 'Standing calf raise':calves,'Standing calf raise machine':calves,
 'Glute bridge':group(['gluteal'],['hamstring']),
 'Hip abduction machine':group(['gluteal'],[],'strength','Targets the outer glutes; the drawing shows the broader glute region.'),
 'Forearm plank':group(['abs','obliques'],['front-deltoids','gluteal']),
 'Dead bug':group(['abs','obliques']), 'Cable Pallof press':group(['abs','obliques']),
 'Brisk treadmill walk':walk,'Brisk outdoor or treadmill walk':walk,'Optional easy walk':walk,
 'Standing hip flexor stretch':group(['quadriceps'],[],'mobility','Stretches the front of the hip. Deep hip flexors are not visible; the highlighted area is approximate.'),
 'Standing chest opener':group(['chest','front-deltoids'],[],'mobility','A gentle stretch for the chest and front of the shoulders.'),
 'Gentle standing side stretch':group(['obliques'],[],'mobility','A gentle stretch along the side of your torso.')
};
const labels={'chest':'Chest','upper-back':'Back / lats','lower-back':'Lower back','front-deltoids':'Shoulders','back-deltoids':'Rear shoulders',biceps:'Biceps',triceps:'Triceps',forearm:'Forearms',quadriceps:'Quads',hamstring:'Hamstrings',gluteal:'Glutes',calves:'Calves','left-soleus':'Soleus','right-soleus':'Soleus',abs:'Abs',obliques:'Obliques'};
const label=muscles=>[...new Set(muscles.map(m=>labels[m]))].join(' · ');
const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function targetsFor(exercise){const target=muscleTargets[exercise.name];if(!target)throw new Error(`Missing muscle diagram: ${exercise.name}`);return target;}
export function muscleDiagram(exercise,compact=false){
 const t=targetsFor(exercise),main=label(t.primary),support=label(t.secondary);
 const title=t.mode==='mobility'?'Areas stretched':t.mode==='cardio'?'Muscles used':'Muscles trained';
 const bodies=Object.entries(anatomy).map(([side,groups])=>`<figure><svg viewBox="0 0 1000 2000" role="img" aria-label="${side==='anterior'?'Front':'Back'} muscle diagram for ${escape(exercise.name)}: ${escape(main)}${support?', supporting '+escape(support):''}">${groups.map(g=>g.points.map(points=>`<polygon points="${points}" data-muscle="${g.muscle}" class="${t.primary.includes(g.muscle)?'muscle-primary':t.secondary.includes(g.muscle)?'muscle-secondary':'muscle-neutral'}"/>`).join('')).join('')}</svg><figcaption>${side==='anterior'?'FRONT':'BACK'}</figcaption></figure>`).join('');
 return `<section class="muscle-map ${compact?'muscle-map-compact':''}" aria-label="${title} for ${escape(exercise.name)}"><div class="muscle-bodies">${bodies}</div><div class="muscle-description"><h4>${title}</h4><p><span class="muscle-key primary" aria-hidden="true"></span><b>${t.mode==='strength'?'Main':t.mode==='mobility'?'Stretch':'Movement'}:</b> ${main}</p>${support?`<p><span class="muscle-key secondary" aria-hidden="true"></span><b>Supporting:</b> ${support}</p>`:''}${t.note?`<p class="muscle-note">${t.note}</p>`:''}${!compact?'<p class="muscle-note">Simplified muscle groups, not a measure of growth or activation.</p><a class="muscle-credit" href="https://github.com/giavinh79/react-body-highlighter" target="_blank" rel="noopener noreferrer">Body drawings: GV79 / Hicham ELABBASSI · MIT ↗</a>':''}</div></section>`;
}
