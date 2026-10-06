// Original schematic exercise diagrams. Each pair shows start and finish positions.
export function figure(type,end=false){
const head=(x,y)=>`<circle cx="${x}" cy="${y}" r="7" fill="#244c3a" stroke="none"/>`;
const line=(points)=>`<polyline points="${points}"/>`;
const weight=(x,y)=>`<path d="M${x-7} ${y}h14m-12 -4v8m10 -8v8" stroke="#79944c" stroke-width="4"/>`;
let body='';let equip='';
if(['bench','incline','bridge','deadbug'].includes(type)){
equip=type==='bench'||type==='incline'?'<path d="M25 61h60M32 61v20M77 61v20" stroke="#b8c4a8"/>':'';
if(type==='incline'){body=head(43,38)+line('48,47 70,65 85,65 92,80')+line(end?'53,46 46,24 45,16':'53,46 62,33 72,35')+weight(end?45:72,end?16:35);}
else if(type==='bench'){body=head(31,50)+line('40,55 70,55 83,65 83,80')+line(end?'46,55 47,23 47,18':'46,55 55,40 65,43')+weight(end?47:65,end?18:43);}
else if(type==='bridge'){body=head(25,72)+line(end?'34,73 65,52 83,58 92,77':'34,73 63,73 79,55 92,77')+line('35,76 56,78');}
else {body=head(26,73)+line('35,75 60,75')+line(end?'40,74 22,53':'40,74 40,45')+line(end?'60,75 78,73 97,76':'60,75 67,49 86,49');}
}else if(type==='plank'){body=head(27,46)+line('35,51 74,59 98,69')+line('40,52 35,72 20,72');}
else if(type==='row'){equip='<path d="M40 65h35M44 65v17M70 65v17M13 35v40" stroke="#b8c4a8"/>';body=head(58,25)+line('57,34 53,60 72,66 83,80')+line(end?'56,39 71,48 61,51':'56,39 34,47 19,45')+weight(end?61:19,end?51:45);}
else if(type==='onerow'||type==='hinge'){equip=type==='onerow'?'<path d="M18 62h33M23 62v18" stroke="#b8c4a8"/>':'';body=head(end&&type==='hinge'?59:36,end&&type==='hinge'?20:36)+line(end&&type==='hinge'?'59,30 59,57 50,78 42,82':'42,42 67,51 64,66 74,81')+line(end&&type==='hinge'?'59,34 62,56':end?'45,43 61,39 63,49':'45,43 43,60 40,66')+weight(end&&type==='hinge'?62:end?63:40,end&&type==='hinge'?56:end?49:66);}
else if(type==='lunge'){body=head(53,end?30:19)+line(end?'53,40 54,59 34,61 29,81':'53,29 53,56 39,79')+line(end?'54,59 73,78 88,78':'53,56 70,79')+line(end?'53,43 44,57':'53,34 43,51');}
else if(type==='squat'){body=head(end?44:57,end?33:19)+line(end?'47,43 61,60 39,64 36,82':'57,29 57,55 45,81')+line(end?'61,60 77,67 73,82':'57,55 70,81')+line(end?'47,44 35,49 39,39':'57,34 43,42 44,34')+weight(end?39:44,end?39:34);}
else if(type==='walk'){body=head(58,17)+line('58,27 56,55')+line(end?'56,55 39,66 31,81':'56,55 68,69 85,79')+line(end?'56,55 72,74 77,81':'56,55 43,72 33,82')+line(end?'58,34 74,47 80,36':'58,34 41,47 35,35')+line(end?'58,34 43,46':'58,34 71,47');}
else {body=head(59,type==='calf'&&end?12:19)+line(type==='calf'&&end?'59,22 59,50 48,75 43,82':'59,29 59,55 48,81')+line(type==='calf'&&end?'59,50 70,75 75,82':'59,55 71,81');
let arms;
if(type==='press'||type==='pull') {arms=end?(type==='press'?'59,35 40,19 36,8 59,35 78,19 82,8':'59,35 39,39 28,27 59,35 79,39 90,27'):(type==='press'?'59,35 39,43 29,29 59,35 79,43 89,29':'59,35 40,18 32,8 59,35 78,18 86,8');body+=line(arms);body+=weight(end?(type==='press'?36:28):(type==='press'?29:32),end?(type==='press'?8:27):(type==='press'?29:8));body+=weight(end?(type==='press'?82:90):(type==='press'?89:86),end?(type==='press'?8:27):(type==='press'?29:8));if(type==='pull')equip='<path d="M12 82V5h95v77" stroke="#c1cbb5"/>';}
else if(type==='raise'){body+=line(end?'59,35 30,38 17,37 59,35 86,38 100,37':'59,35 44,52 43,62 59,35 74,52 75,62')+weight(end?17:43,end?37:62)+weight(end?100:75,end?37:62);}
else if(type==='curl'){body+=line(end?'59,35 44,52 34,34 59,35 73,52 84,34':'59,35 44,52 42,65 59,35 73,52 75,65')+weight(end?34:42,end?34:65)+weight(end?84:75,end?34:65);}
else if(type==='pushdown'){body+=line(end?'59,35 45,50 44,66':'59,35 45,50 30,43')+weight(end?44:30,end?66:43);equip='<path d="M18 82V5h35M35 5v30" stroke="#c1cbb5"/>';}
else if(type==='stretch'){body+=line(end?'59,35 44,19 50,5 59,35 75,49':'59,35 42,50 33,53 59,35 76,50 85,53');}
else body+=line('59,35 43,52 40,62 59,35 75,52 78,62');}
return `<svg viewBox="0 0 120 94" fill="none" role="img" aria-label="${end?'Finish':'Start'} position"><path d="M12 85h96" stroke="#d7dfcd" stroke-width="2"/><g stroke="#244c3a" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">${equip}${body}</g></svg>`;
}
export function heroArt(){return `<svg class="hero-art" viewBox="0 0 260 230" fill="none" aria-hidden="true"><circle cx="145" cy="120" r="92" stroke="#cbd6be"/><circle cx="145" cy="120" r="66" stroke="#cbd6be"/><path d="M57 184L217 50" stroke="#ced8c4"/><g transform="rotate(-32 135 119)"><rect x="82" y="106" width="107" height="26" rx="8" fill="#789265"/><rect x="76" y="78" width="21" height="83" rx="7" fill="#244c3a"/><rect x="60" y="86" width="20" height="68" rx="6" fill="#426244"/><rect x="176" y="78" width="21" height="83" rx="7" fill="#244c3a"/><rect x="193" y="86" width="20" height="68" rx="6" fill="#426244"/><path d="M84 85v68M184 85v68" stroke="#6d8d57" stroke-width="2"/></g><path d="M55 47v16m-8 -8h16M221 176v14m-7 -7h14" stroke="#9bb584" stroke-width="2"/><circle cx="222" cy="59" r="4" fill="#a7bd8c"/></svg>`;}
