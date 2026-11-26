
(function(root){
'use strict';

const norm=s=>String(s==null?'':s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9\s]/g,' ').replace(/\s+/g,' ').trim();
const STOP=new Set(('a al algo algun alguna alguno algunos algunas ante con contra cual cuales cuando cuanto cuantos cuantas de del desde donde '+
 'el ella ellas ellos en entre era eres es esa ese eso esta estan estas este esto estos fue ha han hay la las le les lo los me mi mis '+
 'mucho muy no nos o para pero por porque que quien quienes se ser si sin sobre son su sus te tiene tienen tu tus un una uno unos y ya yo '+
 'quiero quisiera puedo puedes podrias podria dime cuentame hablame dame saber conocer informacion info acerca cosas tambien '+
 'hacer hace hizo fue fueron habia hubo estoy esta estamos como cual cuales alla aqui ahi muestrame mostrar '+
 'ver ir ve vamos abre abrir llevame lleva ensename navega redirige veo').split(' '));
const stem=t=>{
 if(t.length<=3||/^\d+$/.test(t))return t;
 if(t.endsWith('ces'))return t.slice(0,-3)+'z';
 if(t.endsWith('es')&&t.length>5&&'lrndzj'.includes(t[t.length-3]))return t.slice(0,-2);
 if(t.endsWith('s')&&!t.endsWith('ss'))return t.slice(0,-1);
 return t;
};
const GRUPOS={
 docente:['docente','maestro','maestra','profesor','profesora','profe','catedratico','instructor'],
 exalumno:['exalumno','exalumna','egresado','egresada','graduado','graduada'],
 especialidad:['especialidad','carrera','bachillerato','tecnico','tecnica','modulo'],
 premio:['premio','trofeo','medalla','reconocimiento','campeonato','torneo','copa','galardon','logro','salon','fama'],
 foto:['foto','fotografia','imagen','album','galeria','video','recuerdo','archivo'],
 historia:['historia','pasado','origen','fundacion','fundo','antecedente','cronologia'],
 evento:['evento','actividad','festival','ceremonia','celebracion'],
 mapa:['mapa','plano','croquis','360'],
 zona:['zona','area','lugar','espacio','instalacion'],
 ciencia:['ciencia','cientifico','investigacion'],
 proyecto:['proyecto','prototipo','invento'],
 dejar:['dejar','dejo','deja','dejan','dejamos','escribir','escribo','firmar','firmo'],
 compartir:['compartir','comparto','comparte','enviar','envio','envia','mandar','mando','subir','subo']
};
const CANON={};
Object.keys(GRUPOS).forEach(k=>GRUPOS[k].forEach(p=>{CANON[stem(norm(p))]=k}));
const KIND={mapa:'Mapa 360°',exalumno:'Exalumnos',docente:'Docentes',premio:'Salón de la fama',evento:'Eventos',proyecto:'Proyectos de estudiantes',foto:'Archivo fotográfico',zona:'Mapa 360°',especialidad:'Oferta educativa',ciencia:'Ciencia',historia:'Línea del tiempo'};
const KIND_PLURAL={'Exalumnos':'exalumnos','Docentes':'docentes','Salón de la fama':'reconocimientos','Eventos':'eventos','Proyectos de estudiantes':'proyectos de estudiantes','Archivo fotográfico':'recuerdos del archivo','Mapa 360°':'zonas del plantel','Oferta educativa':'especialidades','Ciencia':'proyectos de ciencia','Línea del tiempo':'etapas de la línea del tiempo'};
const TAGS={'Salón de la fama':'premio salon fama deporte cultural','Exalumnos':'exalumno egresado','Docentes':'docente maestro','Eventos':'evento','Proyectos de estudiantes':'proyecto estudiante','Archivo fotográfico':'foto archivo recuerdo','Mapa 360°':'zona mapa lugar area','Oferta educativa':'especialidad carrera','Ciencia':'ciencia proyecto','Línea del tiempo':'historia etapa epoca','Créditos':'creditos equipo','Página':'pagina seccion','Ayuda':'ayuda como'};
const GEN=new Set(['plantel','escuela','cetis','museo','mudicet69','mudicet','digital'].map(w=>stem(norm(w))));
const toks=s=>[...new Set(norm(s).split(' ').filter(w=>w&&!STOP.has(w)).map(w=>{const t=stem(w);return CANON[t]||t}))];
const PH=/describe aqu[ií]|nombre del |nombre de la |texto sobre|descripci[oó]n breve|autores y especialidad|^materia$|lorem ipsum|por definir/i;
const NAVAUTO=/\b(llevame|lleva me|abre|abrir|ir (?:a|al)|ve (?:a|al)|vamos (?:a|al)|navega|redirige)\b/;
const pick=a=>a[Math.floor(Math.random()*a.length)];
const corta=(s,n)=>{s=String(s||'');return s.length>n?s.slice(0,n-1).replace(/\s+\S*$/,'')+'…':s};
const lev=(a,b,max)=>{
 if(Math.abs(a.length-b.length)>max)return max+1;
 let prev=Array.from({length:b.length+1},(_,i)=>i);
 for(let i=1;i<=a.length;i++){
  const cur=[i];let min=i;
  for(let j=1;j<=b.length;j++){
   const v=Math.min(prev[j]+1,cur[j-1]+1,prev[j-1]+(a[i-1]===b[j-1]?0:1));
   cur.push(v);if(v<min)min=v;
  }
  if(min>max)return max+1;
  prev=cur;
 }
 return prev[b.length];
};

function crear(D,opc){
 D=D||{};opc=opc||{};
 const S=D.sitio||{},ini=S.inicio||'index.html',AJ=D.ajustes||{},PIE=S.pie||{};
 const hitos=(D.hitos||[]).slice().sort((a,b)=>(+a.y)-(+b.y));
 const docs=[];
 const add=(k,t,x,u,ex)=>{
  if(!t)return;
  t=String(t);x=x==null?'':String(x);
  const tph=PH.test(t),ph=tph||PH.test(x);
  docs.push(Object.assign({id:docs.length,k,t,x:ph?'':x,u,ph,tph},ex||{}));
 };
 (S.paginas||[]).forEach(p=>add('Página',p.t,p.x,p.u));
 (S.menuInicio||[]).forEach(m=>add('Página',m.t,'Sección «'+m.t+'» de la página de inicio.',ini+m.u,{seccion:true}));
 const esp=new Map();
 hitos.forEach(h=>{
  add('Línea del tiempo',h.y+' · '+h.t,h.d,ini+'#linea',{year:+h.y,era:h});
  (h.s||[]).forEach(s=>{const n=s[1];if(!esp.has(n))esp.set(n,[]);esp.get(n).push(h.y)});
  (h.docentes||[]).forEach(o=>add('Docentes',o.n,(o.m||'')+' · Generación '+h.y,ini+'#docentes',{year:+h.y}));
 });
 esp.forEach((ys,n)=>add('Oferta educativa',n,'Especialidad que aparece en las etapas: '+ys.join(', ')+'.',ini+'#oferta'));
 (D.eventos||[]).forEach(e=>add('Eventos',e.n,(e.m&&e.d?e.m+' '+e.d+'. ':'')+(e.t||''),ini+'#eventos'));
 (D.proyectos||[]).forEach(p=>add('Proyectos de estudiantes',p.n,p.t,ini+'#eventos'));
 (D.exalumnos||[]).forEach(e=>add('Exalumnos',e.n,(e.r||'')+'. '+(e.d||''),ini+'#exalumnos'));
 (D.ciencia||[]).forEach(c=>add('Ciencia',c.n,(c.r||'')+'. '+(c.d||''),ini+'#ciencia'));
 (D.premios||[]).forEach(p=>add('Salón de la fama',p.n,[p.l,p.y,p.p].filter(Boolean).join(' · ')+'. '+(p.d||''),'salon-fama.html',{cat:p.c,tags:p.c==='d'?'deporte deportivo':'cultural cultura'}));
 (D.zonas||[]).forEach(z=>{
  const etq=(z.etiquetas||[]).join(', ');
  const dd=PH.test(z.d||'')?'':(z.d||'');
  add('Mapa 360°',z.n,[etq&&'Incluye: '+etq,dd].filter(Boolean).join('. '),'mapa-360.html?zona='+z.id,{pend:!dd,etq:z.etiquetas||[]});
 });
 (D.archivo||[]).forEach(a=>add('Archivo fotográfico',a.c,'Década de los '+a.d+'0s','archivo-fotografico.html',{dec:+(a.d+'0')}));
 const C=D.creditos||{};
 (C.equipo||[]).forEach(p=>add('Créditos',p.nombre,p.rol+(p.detalle?' · '+p.detalle:''),'creditos.html',{rol:p.rol}));
 (C.fuentes||[]).forEach(f=>add('Créditos',f.tipo,f.fuente,'creditos.html'));
 if(C.agradecimientos)add('Créditos','Agradecimientos',C.agradecimientos,'creditos.html');
 const CONOCIDAS=new Set(['sitio','ajustes','hitos','hitoImagenes','eventos','proyectos','exalumnos','ciencia','premios','archivo','zonas','creditos','offline']);
 Object.keys(D).filter(k=>!CONOCIDAS.has(k)).forEach(k=>{
  const v=D[k],et=k.charAt(0).toUpperCase()+k.slice(1).replace(/([A-Z])/g,' $1').toLowerCase();
  const textos=o=>Object.values(o).filter(x=>typeof x==='string');
  const tit=o=>['n','nombre','titulo','title','t','name'].map(c=>o[c]).find(x=>typeof x==='string')||textos(o)[0];
  if(Array.isArray(v))v.forEach(o=>{
   if(typeof o==='string')add(et,o,'',ini);
   else if(o&&typeof o==='object'){const t=tit(o);add(et,t,textos(o).filter(x=>x!==t).join('. '),o.u||ini)}
  });
  else if(v&&typeof v==='object'&&!Array.isArray(v)){const t=tit(v);add(et,t||et,textos(v).filter(x=>x!==t).join('. '),ini)}
 });
 const pag=u=>(S.paginas||[]).find(p=>p.u===u)||{};
 const aviso=(c,t)=>c?'':t;
 [
  ['Qué es el Museo Digital CETIS 69 (MUDICET69)',PIE.descripcion||'Museo digital del CETIS 69 en Ciudad Obregón.',ini],
  ['Buscar en todo el museo','Pulsa la tecla / o el ícono de la lupa del menú para buscar personas, años, eventos y páginas.',ini],
  ['Dejar un mensaje en el libro de visitas','Escribe tu nombre, elige si eres exalumno, alumno, docente o visitante y deja tu mensaje.'+aviso(AJ.libroEndpoint,' Por ahora los mensajes se guardan solo en este dispositivo.'),'libro-visitas.html'],
  ['Compartir una foto o un video','En el archivo fotográfico llena el formulario con tu nombre, el año aproximado, una descripción y el archivo (hasta 100 MB), y autoriza que se publique con tu nombre.'+aviso(AJ.archivoEndpoint,' Por ahora el envío todavía no llega al equipo del museo; mientras tanto puedes compartir tu recuerdo en las redes del CETIS 69.'),'archivo-fotografico.html#envia'],
  ['Recorrido virtual en 3D',pag('Museo-3D.html').x||'Camina por el museo en primera persona.','Museo-3D.html'],
  ['Mapa interactivo 360°',pag('mapa-360.html').x||'Recorrido virtual por el plantel.','mapa-360.html'],
  ['Instalar el museo como app','En el menú de tu navegador elige Instalar app o Agregar a pantalla de inicio. Lo básico sigue funcionando sin internet.',ini],
  ['Modo kiosco','En pantallas públicas el museo vuelve solo al inicio cuando nadie lo toca durante un rato.',ini]
 ].forEach(a=>add('Ayuda',a[0],a[1],a[2]));

 const df=new Map();
 docs.forEach(d=>{
  d.tt=new Set(toks(d.t));
  d.tx=new Set(toks(d.x));
  d.tk=new Set(toks(d.k+' '+(TAGS[d.k]||'')+' '+(d.tags||'')));
  new Set([...d.tt,...d.tx,...d.tk]).forEach(t=>df.set(t,(df.get(t)||0)+1));
 });
 const N=docs.length||1;
 const idf=t=>Math.log(1+N/(df.get(t)||.5));
 const hayPrefijo=(set,t)=>{if(t.length<3)return false;for(const x of set)if(x.startsWith(t))return true;return false};
 const corregir=ts=>{
  const cambios=[];
  const out=ts.map(t=>{
   if(df.has(t)||t.length<4||/^\d+$/.test(t))return t;
   const max=t.length<=5?1:2;let mejor=null,md=max+1;
   df.forEach((n,v)=>{if(v.length<3)return;const dd=lev(t,v,max);if(dd<md||(dd===md&&mejor&&n>df.get(mejor))){md=dd;mejor=v}});
   if(mejor&&md<=max){cambios.push([t,mejor]);return mejor}
   return t;
  });
  return {ts:out,cambios};
 };
 const kindDe=ts=>{for(const t of ts)if(KIND[t])return KIND[t];return null};
 const buscar=(ts,imp)=>{
  const out=[];
  docs.forEach(d=>{
   if(d.tph)return;
   let s=0,hit=0;
   ts.forEach(t=>{
    let p=0;
    if(d.tt.has(t))p=6;else if(hayPrefijo(d.tt,t))p=4;else if(d.tk.has(t))p=3;else if(d.tx.has(t))p=2;else if(hayPrefijo(d.tx,t))p=1;
    if(p){hit++;s+=p*idf(t)}
   });
   if(!hit)return;
   const cov=hit/ts.length;
   s*=cov*cov;
   if(d.ph)s*=.6;
   if(imp&&imp(d))s*=imp.f||1.5;
   out.push({d,s});
  });
  return out.sort((a,b)=>b.s-a.s);
 };

 const SUG_BASE=['¿Qué es el museo?','Línea del tiempo','Especialidades','Salón de la fama','Contacto','Sorpréndeme'];
 const SUG_PAG={
  'index.html':['Línea del tiempo','Especialidades','Exalumnos','Contacto'],
  '':['Línea del tiempo','Especialidades','Exalumnos','Contacto'],
  'salon-fama.html':['¿Qué reconocimientos hay?','Reconocimientos deportivos','Reconocimientos culturales'],
  'libro-visitas.html':['¿Cómo dejo un mensaje?','Contacto','Sorpréndeme'],
  'archivo-fotografico.html':['¿Cómo envío mi foto?','Fotos de los 90s','Fotos de los 2000s'],
  'museo-3d.html':['¿Cómo funciona el recorrido?','Mapa 360°','Línea del tiempo'],
  'mapa-360.html':['¿Qué zonas tiene el plantel?','Talleres','Recorrido 3D'],
  'creditos.html':['¿Quién hizo el museo?','Línea del tiempo','Contacto']
 };
 const sugerencias=pagina=>(SUG_PAG[(pagina||'').toLowerCase()]||SUG_BASE).slice();
 const card=(d,conTexto)=>({k:d.k,t:d.t,x:conTexto===false?'':(d.ph?'Los detalles de este espacio están en preparación.':corta(d.x,150)),u:d.u});
 const cardUrl=(k,t,u,x)=>({k,t,u,x:x||''});
 const R=(t,o)=>Object.assign({t,cards:[],chips:[]},o||{});
 const reales=l=>l.filter(d=>!d.ph);

 function bienvenida(pagina){
  const p=(pagina||'').toLowerCase();
  const ctx={'salon-fama.html':'Estás en el Salón de la fama.','libro-visitas.html':'Estás en el libro de visitas.','archivo-fotografico.html':'Estás en el archivo fotográfico.','museo-3d.html':'Estás en el recorrido 3D.','mapa-360.html':'Estás en el mapa 360°.','creditos.html':'Estás en los créditos.'}[p];
  return R('Soy **NIX**, el guardián del conocimiento de MUDICET69. '+(ctx?ctx+' ':'')+'Pregúntame por la historia del plantel, sus especialidades, personas, años o cualquier rincón del museo, o pídeme que te lleve a una sección.',{chips:sugerencias(p)});
 }

 const listaCon=(items)=>items.length<2?items.join(''):items.slice(0,-1).join(', ')+' y '+items[items.length-1];

 function porKind(kind,ctx,intro){
  const todos=docs.filter(d=>d.k===kind&&!d.seccion);
  if(!todos.length)return null;
  const rs=reales(todos),pend=todos.length-rs.length;
  const nombre=KIND_PLURAL[kind]||kind.toLowerCase();
  if(!rs.length){
   const nom=todos.filter(d=>!d.tph).map(d=>d.t);
   const t=nom.length?'En **'+nombre+'** el museo ya lista: '+listaCon(nom.slice(0,6))+(nom.length>6?' y más':'')+'. Sus detalles todavía se están completando.':'El museo ya reserva un espacio para **'+nombre+'** ('+todos.length+' '+(todos.length===1?'registro':'registros')+'), pero su información todavía se está completando.';
   return R(t,{cards:[cardUrl(kind,'Ir a '+(KIND_PLURAL[kind]||kind),todos[0].u)],chips:kind==='Salón de la fama'?['Reconocimientos deportivos','Reconocimientos culturales','Sorpréndeme']:['Línea del tiempo','Sorpréndeme'],ctx:Object.assign({},ctx,{ult:null})});
  }
  const mostrar=rs.slice(0,3);
  const resto=rs.length-mostrar.length;
  return R((intro||'Esto hay en **'+nombre+'**:')+(pend?' (Hay '+pend+' más que aún se están completando.)':''),{cards:mostrar.map(d=>card(d)),chips:resto>0?['Ver más']:['Sorpréndeme'],ctx:Object.assign({},ctx,{ult:{ids:rs.map(d=>d.id),pos:mostrar.length}})});
 }

 function resumenAnio(anio,ctx){
  const dec=Math.floor(anio/10)*10;
  const primero=hitos[0];
  let era=null;hitos.forEach(h=>{if(+h.y<=anio)era=h});
  const lineas=[],cards=[];
  if(!era){
   return R('La línea del tiempo del museo empieza en **'+(primero?primero.y:'—')+'**, así que de **'+anio+'** todavía no tengo registros.',{cards:primero?[cardUrl('Línea del tiempo',primero.y+' · '+primero.t,ini+'#linea')]:[],chips:['Línea del tiempo','Sorpréndeme'],ctx:Object.assign({},ctx,{ult:null})});
  }
  const exacto=+era.y===anio;
  lineas.push(exacto?'En **'+era.y+'** la línea del tiempo marca la etapa **'+era.t+'**.':'El año **'+anio+'** cae en la etapa **'+era.y+' · '+era.t+'** de la línea del tiempo.');
  if(era.d&&!PH.test(era.d))lineas.push(era.d);else lineas.push('El texto de esa etapa todavía se está completando.');
  const es=(era.s||[]).map(s=>s[1]);
  if(es.length)lineas.push('Especialidades de esa etapa: '+listaCon(es)+'.');
  const doc=reales(docs.filter(d=>d.k==='Docentes'&&d.year===+era.y));
  if(doc.length)lineas.push('Docentes registrados: '+listaCon(doc.slice(0,5).map(d=>d.t))+(doc.length>5?' y más.':'.'));
  const arch=docs.filter(d=>d.k==='Archivo fotográfico'&&d.dec===dec);
  if(arch.length)lineas.push('En el archivo hay '+arch.length+' '+(arch.length===1?'recuerdo':'recuerdos')+' de los '+dec+'s: '+listaCon(arch.slice(0,4).map(d=>d.t))+(arch.length>4?' y más.':'.'));
  const pr=reales(docs.filter(d=>d.k==='Salón de la fama'&&new RegExp('\\b'+anio+'\\b').test(d.x)));
  if(pr.length)lineas.push('Reconocimientos de ese año: '+listaCon(pr.map(d=>d.t))+'.');
  cards.push(cardUrl('Línea del tiempo',era.y+' · '+era.t,ini+'#linea'));
  if(arch.length)cards.push(cardUrl('Archivo fotográfico','Recuerdos de los '+dec+'s','archivo-fotografico.html'));
  return R(lineas.join('\n'),{cards,chips:['Línea del tiempo','Especialidades','Sorpréndeme'],ctx:Object.assign({},ctx,{ult:null})});
 }

 function contacto(ctx){
  const c=PIE.contacto||[],redes=PIE.redes||[];
  const rotulo=i=>/location|map/.test(i)?'Ubicación':/phone/.test(i)?'Teléfono':/envelope|mail/.test(i)?'Correo':'Dato';
  const ls=c.map(x=>'• **'+rotulo(x.i||'')+':** '+x.t);
  if(!ls.length&&!redes.length)return R('No tengo datos de contacto publicados en el museo todavía.',{chips:SUG_BASE.slice(0,3),ctx:Object.assign({},ctx,{ult:null})});
  return R('Estos son los datos de contacto que publica el museo:\n'+ls.join('\n')+(redes.length?'\nTambién puedes escribirles por sus redes:':''),{cards:redes.map(r=>({k:'Red social',t:r.t,u:r.u,x:'',ext:true})),chips:['Libro de visitas','Sorpréndeme'],ctx:Object.assign({},ctx,{ult:null})});
 }

 function creditos(ctx){
  const eq=docs.filter(d=>d.k==='Créditos'&&d.rol);
  if(!eq.length)return R('Los créditos del museo todavía no tienen equipo registrado.',{cards:[cardUrl('Página','Créditos del museo','creditos.html')],ctx:Object.assign({},ctx,{ult:null})});
  return R('El museo lo hizo este equipo:\n'+eq.map(d=>'• **'+d.t+'** — '+d.x).join('\n'),{cards:[cardUrl('Página','Créditos del museo','creditos.html','Equipo, agradecimientos, fuentes y herramientas.')],chips:['Contacto','Sorpréndeme'],ctx:Object.assign({},ctx,{ult:null})});
 }

 function especialidades(ctx){
  if(!hitos.length||!esp.size)return R('Todavía no hay especialidades registradas en el museo.',{ctx:Object.assign({},ctx,{ult:null})});
  const ult=hitos[hitos.length-1];
  const act=(ult.s||[]).map(s=>s[1]);
  const todas=[...esp.keys()];
  const extra=todas.filter(n=>!act.includes(n));
  let t='En la etapa más reciente de la línea del tiempo ('+ult.y+') aparecen: '+listaCon(act)+'.';
  if(extra.length)t+='\nA lo largo de la historia también figuran: '+listaCon(extra)+'.';
  return R(t,{cards:[cardUrl('Oferta educativa','Oferta educativa',ini+'#oferta')],chips:hitos.slice(0,3).map(h=>'¿Qué había en '+h.y+'?').concat(['Sorpréndeme']).slice(0,4),ctx:Object.assign({},ctx,{ult:null})});
 }

 function linea(ctx){
  if(!hitos.length)return R('La línea del tiempo todavía no tiene etapas registradas.',{ctx:Object.assign({},ctx,{ult:null})});
  const ls=hitos.map(h=>'• **'+h.y+'** · '+h.t+(PH.test(h.d||'')?' (texto en preparación)':''));
  const listas=hitos.filter(h=>h.d&&!PH.test(h.d));
  return R('La línea del tiempo del museo tiene '+hitos.length+' etapas:\n'+ls.join('\n')+(listas.length?'':'\nLos textos de cada etapa se están completando.'),{cards:[cardUrl('Página','Línea del tiempo',ini+'#linea')],chips:hitos.slice(0,2).map(h=>'¿Qué había en '+h.y+'?').concat(['Especialidades','Sorpréndeme']),ctx:Object.assign({},ctx,{ult:null})});
 }

 function quEs(ctx){
  const e=hitos.map(h=>h.y+' · '+h.t);
  let t=(PIE.descripcion||'MUDICET69 es el Museo Digital del CETIS 69, en Ciudad Obregón, Sonora.');
  if(e.length)t+='\nSu línea del tiempo recorre '+e.length+' etapas: '+listaCon(e)+'.';
  t+='\nPuedes recorrerlo en 3D, explorar el plano en 360°, ver el archivo fotográfico, el Salón de la fama y dejar tu mensaje en el libro de visitas.';
  return R(t,{cards:[cardUrl('Página','Línea del tiempo',ini+'#linea'),cardUrl('Página','Recorrido virtual 3D','Museo-3D.html')],chips:['Especialidades','Salón de la fama','Sorpréndeme'],ctx:Object.assign({},ctx,{ult:null})});
 }

 function aleatorio(ctx){
  const buenos=reales(docs).filter(d=>d.x&&d.k!=='Página'&&d.k!=='Ayuda');
  const base=buenos.length?buenos:docs.filter(d=>d.k==='Oferta educativa'||d.k==='Mapa 360°'||d.k==='Línea del tiempo');
  if(!base.length)return R('Todavía no tengo datos curiosos; el museo se está llenando de contenido.',{ctx});
  const d=pick(base);
  return R(pick(['Mira esto: **'+d.t+'**.','Te cuento algo de **'+d.t+'**.','Un rincón del museo: **'+d.t+'**.'])+(d.x?'\n'+corta(d.x,260):''),{cards:[card(d,false)],chips:['Otro dato','Línea del tiempo'],ctx:Object.assign({},ctx,{ult:null})});
 }

 const DESTINOS=[
  {t:'Inicio',u:ini,kw:'inicio principal home portada'},
  {t:'Recorrido virtual 3D',u:'Museo-3D.html',kw:'recorrido 3d virtual caminar'},
  {t:'Salón de la fama',u:'salon-fama.html',kw:'salon fama premio trofeo reconocimiento medalla'},
  {t:'Libro de visitas',u:'libro-visitas.html',kw:'libro visita mensaje firmar'},
  {t:'Mapa interactivo 360°',u:'mapa-360.html',kw:'mapa 360 plano plantel'},
  {t:'Archivo fotográfico',u:'archivo-fotografico.html',kw:'archivo fotografico foto video galeria album recuerdo'},
  {t:'Créditos del museo',u:'creditos.html',kw:'creditos equipo agradecimiento'},
  {t:'Códigos QR por zona',u:'qr-zonas.html',kw:'qr codigo zona'},
  {t:'Historia',u:ini+'#historia',kw:'historia'},
  {t:'Línea del tiempo',u:ini+'#linea',kw:'linea tiempo cronologia'},
  {t:'Oferta educativa',u:ini+'#oferta',kw:'oferta educativa especialidad carrera'},
  {t:'Docentes',u:ini+'#docentes',kw:'docente maestro profesor'},
  {t:'Eventos',u:ini+'#eventos',kw:'evento actividad'},
  {t:'Exalumnos',u:ini+'#exalumnos',kw:'exalumno egresado'},
  {t:'Ciencia',u:ini+'#ciencia',kw:'ciencia proyecto robotica'}
 ].map(x=>Object.assign(x,{k:new Set(toks(x.kw+' '+x.t))}));
 const destino=ts=>{
  let mejor=null,ms=0;
  DESTINOS.forEach(x=>{let s=0;ts.forEach(t=>{if(x.k.has(t))s+=norm(x.t).split(' ').some(w=>stem(w)===t)?2:1});if(s>ms){ms=s;mejor=x}});
  return ms>=1?mejor:null;
 };
 (D.zonas||[]).forEach(z=>DESTINOS.push({t:z.n+' (mapa 360°)',u:'mapa-360.html?zona='+z.id,k:new Set(toks(z.n+' '+(z.etiquetas||[]).join(' ')))}));

 function responder(texto,ctx){
  ctx=ctx||{};
  const crudo=String(texto||'').trim().slice(0,200);
  const q=norm(crudo);
  if(!q)return R('Escribe tu pregunta y la busco en el museo.',{chips:SUG_BASE.slice(0,4),ctx});
  const palabras=q.split(' ');
  const corto=palabras.length<=4;

  if(/^(mas|ver mas|otro|otra|otros|otras|siguiente|sigue|continua|y que mas|dame mas)$/.test(q)){
   if(q==='otro'||q==='otra'){if(ctx.rand)return aleatorio(ctx)}
   const u=ctx.ult;
   if(u&&u.ids&&u.pos<u.ids.length){
    const sig=u.ids.slice(u.pos,u.pos+3).map(i=>docs[i]);
    const pos=u.pos+sig.length;
    return R('Sigamos:',{cards:sig.map(d=>card(d)),chips:pos<u.ids.length?['Ver más']:['Sorpréndeme'],ctx:Object.assign({},ctx,{ult:{ids:u.ids,pos}})});
   }
   return aleatorio(Object.assign({},ctx,{rand:1}));
  }
  if(/^otro dato$/.test(q))return aleatorio(Object.assign({},ctx,{rand:1}));
  if(corto&&/^(hola|holi|buenas|buenos dias|buen dia|buenas tardes|buenas noches|hey|que onda|saludos|hello|hi)\b/.test(q))
   return R(pick(['¡Hola! Soy NIX. ¿Qué te gustaría descubrir del museo?','¡Bienvenido al museo! Soy NIX, dime qué buscas.','Hola, aquí NIX. Pregúntame lo que quieras sobre el CETIS 69.']),{chips:SUG_BASE.slice(0,4),ctx});
  if(corto&&/\b(gracias|te agradezco|muy amable)\b/.test(q))
   return R(pick(['Con gusto. Si quieres seguir explorando, aquí estaré.','Para eso estoy. ¿Buscamos algo más?']),{chips:['Sorpréndeme','Línea del tiempo'],ctx});
  if(corto&&/\b(adios|hasta luego|nos vemos|bye|chao|me voy)\b/.test(q))
   return R('Hasta pronto. El museo seguirá aquí cuando quieras volver.',{ctx});
  if(/\b(quien eres|que eres|como te llamas|tu nombre|quien es nix|que es nix|que significa nix|eres (una )?(ia|robot|bot|persona|humano|real)|quien te (creo|hizo|programo))\b/.test(q))
   return R('Soy **NIX AI**, el guardián del conocimiento de MUDICET69, el Museo Digital del CETIS 69. Soy un asistente virtual, no una persona: por ahora respondo buscando directamente en la información publicada en este museo y, si algo todavía no está, te lo digo en lugar de inventarlo.',{chips:['¿Qué puedes hacer?','¿Qué es el museo?','Sorpréndeme'],ctx});
  if(/\b(que (puedes|sabes|haces)|como funcionas|para que sirves|ayuda|ayudame|opciones)\b/.test(q))
   return R('Puedo:\n• Contarte la historia y las etapas del plantel.\n• Decirte qué especialidades hubo y qué había en un año o década.\n• Buscar personas, eventos, proyectos, reconocimientos y fotos.\n• Llevarte a cualquier sección ("llévame al Salón de la fama").\n• Explicarte cómo dejar un mensaje o compartir un recuerdo.',{chips:['Línea del tiempo','¿Qué había en los 90s?','Sorpréndeme'],ctx});
  if(/\b(contacto|contactar|telefono|llamar|numero de|correo|email|mail|direccion|horario|redes|facebook|instagram|tiktok)\b/.test(q)||/\b(donde (esta|queda|se ubica)|ubicacion|como llegar)\b.*\b(cetis|escuela|plantel|museo)\b/.test(q)){
   if(/\bhorario\b/.test(q)&&!/\b(telefono|correo|contacto)\b/.test(q))return R('El museo no publica horarios de atención. Si necesitas confirmarlos, puedes usar los datos de contacto del plantel.',{chips:['Contacto'],ctx});
   return contacto(ctx);
  }
  if(!NAVAUTO.test(q)&&(/\b(quien(es)? (hizo|hicieron|creo|crearon|desarrollo|disenio|diseno|programo|esta detras|coordina)|creditos|desarrollador|agradecimientos)\b/.test(q)||/\bequipo (del|de) (museo|proyecto|desarrollo|trabajo)\b/.test(q)))return creditos(ctx);

  let ts0=toks(crudo);
  const anios=(q.match(/\b(19[89]\d|20[0-3]\d)\b/g)||[]).map(Number);
  let dec=null;
  const md=q.match(/\b(?:decada|decadas|anos|los)\s+(?:de\s+los\s+)?(\d{2,4})s?\b/);
  if(md){let n=+md[1];if(n<100)n+=n<=26&&n>=0&&n%10===0&&n<30?2000:1900;if(n>=1980&&n<=2029)dec=Math.floor(n/10)*10}
  const kind=kindDe(ts0);
  if(dec&&kind)ts0=ts0.filter(t=>!/^\d{2}s?$/.test(t)).concat(String(dec));

  if(/\bcuant[oa]s?\b/.test(q)&&kind){
   const todos=docs.filter(d=>d.k===kind&&!d.seccion),rs=reales(todos);
   const n=KIND_PLURAL[kind]||kind.toLowerCase();
   if(!todos.length)return R('No encuentro registros de '+n+' en el museo.',{ctx});
   return R(rs.length?'Hay **'+rs.length+'** '+n+' con información completa'+(todos.length>rs.length?' y '+(todos.length-rs.length)+' espacios más que todavía se están completando.':'.'):'Hay '+todos.length+' espacios reservados para '+n+', pero ninguno tiene su información completa todavía.',{chips:['Ver '+n,'Sorpréndeme'],ctx});
  }
  if((!kind||kind==='Línea del tiempo')&&(anios.length||dec)){
   const a=anios.length?anios[0]:dec;
   return resumenAnio(a,ctx);
  }
  if(!anios.length&&!dec&&/\b(linea del tiempo|cronologia|etapas|epocas)\b/.test(q))return linea(ctx);
  if(/\b(especialidad|especialidades|carrera|carreras|que (se )?(estudia|ensena|puedo estudiar)|oferta educativa|que ofrece)\b/.test(q)&&!anios.length)return especialidades(ctx);
  if(/\b(que es|que fue|hablame|cuentame|explicame|sobre|acerca de)\b.*\b(cetis|museo|plantel|escuela|mudicet)/.test(q)||/^(que es el museo|el museo|el cetis|cetis 69)$/.test(q))return quEs(ctx);
  if(/\b(sorprend\w*|aleatori\w*|dato curioso|curiosidad|algo interesante|recomiend\w*|cuentame algo)\b/.test(q))return aleatorio(Object.assign({},ctx,{rand:1}));

  
  const verboNav=/\b(llevame|lleva me|abre|abrir|ir (?:a|al)|ve (?:a|al)|vamos (?:a|al)|navega|redirige|quiero ver|ensename|donde (veo|encuentro|esta)|como (llego|entro|accedo))\b/.test(q);
  if(verboNav){
   const dest=destino(ts0);
   if(dest){
    const auto=NAVAUTO.test(q);
    const NAVW=new Set(['ver','ir','abre','abrir','llevame','lleva','me','ensename','vamos','navega','redirige','veo','encuentro','llego','entro','accedo','ve','esta']);
    const sobra=ts0.filter(t=>!dest.k.has(t)&&!NAVW.has(t));
    if(auto||!sobra.length)
     return R(auto?'Te llevo a **'+dest.t+'**.':'Lo encuentras en **'+dest.t+'**.',{cards:[cardUrl('Ir a',dest.t,dest.u)],ir:auto?{u:dest.u}:null,chips:['Sorpréndeme'],ctx:Object.assign({},ctx,{ult:null})});
   }
  }

  const corr=corregir(ts0);
  const ts=corr.ts;
  const nota=corr.cambios.length?'Entendí «'+corr.cambios.map(c=>c[1]).join(', ')+'».\n':'';
  const kindC=kindDe(ts);
  const resto=ts.filter(t=>!KIND[t]&&t!=='historia'&&!GEN.has(t));
  if(kindC==='Línea del tiempo'&&!resto.length)return linea(ctx);
  if(kindC&&!resto.length){
   const r=porKind(kindC,ctx);
   if(r)return Object.assign(r,{t:nota+r.t});
  }
  if(!ts.length)return R('No logré entender qué buscas. Prueba con un nombre, un año o una sección del museo.',{chips:SUG_BASE.slice(0,4),ctx:Object.assign({},ctx,{ult:null})});
  const como=/\b(como|donde se|puedo|se puede|manera de|pasos)\b/.test(q);
  const imp=como?Object.assign(d=>d.k==='Ayuda',{f:1.7}):(kindC?Object.assign(d=>d.k===kindC,{f:1.4}):null);
  let res=buscar(resto.length?resto:ts,imp);
  if(kindC&&!como)res=res.filter(r=>r.d.k===kindC);
  if(!res.length&&kindC){
   const r=porKind(kindC,ctx);
   if(r)return Object.assign(r,{t:nota+'No encontré nada con ese dato en **'+(KIND_PLURAL[kindC]||kindC)+'**, pero esto hay:'+(r.cards.length>1||!/lista:/.test(r.t)?'\n':'\n')+r.t});
  }
  if(!res.length){
   return R(nota+pick(['No encuentro eso en el museo todavía.','Eso aún no está en el museo.','No tengo registros sobre eso por ahora.'])+' Puedes probar con otras palabras, o dejar tu recuerdo en el libro de visitas si crees que debería estar.',{cards:[cardUrl('Ir a','Libro de visitas','libro-visitas.html')],chips:SUG_BASE.slice(0,4),ctx:Object.assign({},ctx,{ult:null})});
  }
  const top=res[0],seg=res[1];
  const dominante=!seg||top.s>=seg.s*1.6;
  if(dominante&&!top.d.ph&&top.d.x&&top.s>=3){
   const d=top.d;
   return R(nota+'**'+d.t+'**'+(d.k!=='Página'&&d.k!=='Ayuda'?' ('+d.k.toLowerCase()+')':'')+'\n'+corta(d.x,340),{cards:[card(d,false)],chips:['Sorpréndeme','Línea del tiempo'],ctx:Object.assign({},ctx,{ult:null})});
  }
  const lista=res.filter(r=>r.s>=Math.max(1.5,top.s*.35)).slice(0,12).map(r=>r.d);
  const rs=reales(lista);
  const mostrar=(rs.length?rs:lista).slice(0,3);
  const pos=mostrar.length;
  const pendientes=!rs.length;
  return R(nota+(pendientes?'Encontré '+(mostrar.length===1?'un espacio':'estos espacios')+' relacionado'+(mostrar.length===1?'':'s')+', pero su información todavía se está completando:':'Esto encontré en el museo:'),{cards:mostrar.map(d=>card(d)),chips:(rs.length?rs:lista).length>pos?['Ver más']:['Sorpréndeme'],ctx:Object.assign({},ctx,{ult:{ids:(rs.length?rs:lista).map(d=>d.id),pos}})});
 }

 return {responder,bienvenida,sugerencias,total:docs.length,reales:reales(docs).length};
}

root.NixCerebro={crear,norm};
if(typeof module!=='undefined'&&module.exports)module.exports=root.NixCerebro;
})(typeof window!=='undefined'?window:globalThis);