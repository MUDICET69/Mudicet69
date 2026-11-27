(function(){
'use strict';
const w=window,d=document;
if(w.__nixUI||!d.body||d.body.dataset.nix==='off')return;
w.__nixUI=1;

const KEY='nix_v1',TIPKEY='nix_tip';
const esInicio=d.body.dataset.menu==='inicio';
const pagina=(decodeURIComponent(location.pathname.split('/').pop()||'')||'index.html').toLowerCase();
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const finoPuntero=matchMedia('(pointer: fine)').matches;
const mobile=()=>matchMedia('(max-width:640px)').matches;
const el=(t,c,x)=>{const e=d.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e};
const dormir=ms=>new Promise(r=>setTimeout(r,ms));

const SVG={
 send:'<path fill="currentColor" d="M3.4 20.4 21 12 3.4 3.6 3.3 10l12.6 2-12.6 2z"/>',
 x:'<path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
 reset:'<path d="M4 12a8 8 0 1 0 2.6-5.9M4 4v5h5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
 arrow:'<path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
 ext:'<path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
 mic:'<path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zM6 11.5a6 6 0 0 0 12 0M12 17.5V21" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
 vol:'<path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5zM15.5 9a4 4 0 0 1 0 6M18 6.5a8 8 0 0 1 0 11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
 volx:'<path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5zM16 9.5l5 5M21 9.5l-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
};
const icono=(n,s)=>{const e=el('span','nix-i');e.innerHTML='<svg viewBox="0 0 24 24" width="'+(s||18)+'" height="'+(s||18)+'" aria-hidden="true" focusable="false">'+SVG[n]+'</svg>';return e};

let E={open:false,log:[],ctx:null};
try{const g=JSON.parse(sessionStorage.getItem(KEY)||'null');if(g&&Array.isArray(g.log))E=Object.assign(E,g)}catch(e){}
const guardar=()=>{try{E.log=E.log.slice(-40);sessionStorage.setItem(KEY,JSON.stringify(E))}catch(e){}};

let INI='index.html',cerebro=null,IA=null,iaActiva=false,btn,tip,panel,log,input,navT=0,ocupado=false,gen=0,mic=null,bV=null,rec=null,escuchando=false;
const SR=w.SpeechRecognition||w.webkitSpeechRecognition;
const TTS='speechSynthesis' in w&&'SpeechSynthesisUtterance' in w;
const PLACEHOLDER='Pregunta sobre el museo…';

const destino=u=>{
 if(!u)return '#';
 if(u.charAt(0)==='#')return esInicio?u:INI+u;
 if(esInicio&&u.indexOf(INI+'#')===0)return u.slice(INI.length);
 return u;
};
const seguro=u=>{try{const x=new URL(u,location.href);return /^https?:$/.test(x.protocol)?u:'#'}catch(e){return '#'}};
const mismaPagina=u=>{try{const x=new URL(u,location.href);return x.pathname===location.pathname}catch(e){return false}};

function texto(cont,t){
 String(t).split('\n').forEach(l=>{
  const p=el('p');
  if(/^•\s/.test(l)){p.className='nix-li';l=l.replace(/^•\s*/,'')}
  l.split(/\*\*(.+?)\*\*/g).forEach((seg,i)=>{
   if(!seg)return;
   if(i%2)p.appendChild(el('strong',null,seg));else p.appendChild(d.createTextNode(seg));
  });
  cont.appendChild(p);
 });
}
function tarjeta(c){
 const a=el('a','nix-card');
 const u=seguro(destino(c.u));
 a.href=u;
 if(c.ext){a.target='_blank';a.rel='noopener noreferrer'}
 const b=el('span','nix-card-b');
 if(c.k)b.appendChild(el('small','nix-k',c.k));
 b.appendChild(el('b','nix-t',c.t));
 if(c.x)b.appendChild(el('span','nix-x',c.x));
 a.append(b,icono(c.ext?'ext':'arrow',16));
 a.addEventListener('click',()=>{
  if(c.ext||!mobile())return;
  if(mismaPagina(u)){cerrar(false)}
  else{E.open=false;guardar()}
 });
 return a;
}
function quitarChips(){const c=log.querySelector('.nix-chips');if(c)c.remove()}
function chips(lista){
 quitarChips();
 if(!lista||!lista.length)return;
 const ch=el('div','nix-chips');
 ch.setAttribute('role','group');ch.setAttribute('aria-label','Sugerencias');
 lista.slice(0,4).forEach(t=>{
  const b=el('button','nix-chip',t);b.type='button';
  b.addEventListener('click',()=>enviar(t));
  ch.appendChild(b);
 });
 log.appendChild(ch);
}
function pintar(m){
 const wrap=el('div','nix-m '+(m.r==='u'?'yo':'nix'));
 const cuerpo=el('div','nix-mb');
 texto(cuerpo,m.t);
 wrap.appendChild(cuerpo);
 if(m.ia)wrap.appendChild(el('p','nix-ia','Respuesta redactada con IA a partir de la información del museo. Puede contener errores.'));
 if(m.cards&&m.cards.length){
  const cs=el('div','nix-cards');
  m.cards.forEach(c=>cs.appendChild(tarjeta(c)));
  wrap.appendChild(cs);
 }
 log.appendChild(wrap);
 return wrap;
}
function alFinal(wrap){
 const fin=()=>{
  if(wrap&&wrap.offsetHeight>log.clientHeight-30)log.scrollTop=wrap.offsetTop-12;
  else log.scrollTop=log.scrollHeight;
 };
 requestAnimationFrame(fin);
}
function agregar(m){
 E.log.push(m);
 const wrap=pintar(m);
 if(m.r==='n')chips(m.chips);else quitarChips();
 alFinal(wrap);
 guardar();
}
function escribiendo(){
 const e=el('div','nix-pt');
 e.setAttribute('aria-hidden','true');
 e.append(el('span'),el('span'),el('span'));
 log.appendChild(e);log.scrollTop=log.scrollHeight;
 return e;
}

/* ---------- voz: leer respuestas y dictar preguntas ---------- */
const vozOn=()=>{try{return sessionStorage.getItem('nix_voz')==='1'}catch(e){return false}};
function cancelarVoz(){if(TTS)try{speechSynthesis.cancel()}catch(e){}}
function hablar(t){
 if(!TTS||!vozOn())return;
 cancelarVoz();
 const limpio=String(t).replace(/\*\*/g,'').replace(/^•\s*/gm,'').replace(/\n+/g,'. ').slice(0,700);
 if(!limpio)return;
 const u=new SpeechSynthesisUtterance(limpio);
 u.lang='es-MX';u.rate=1;
 try{
  const vs=speechSynthesis.getVoices()||[];
  const v=vs.find(x=>/^es[-_]MX/i.test(x.lang))||vs.find(x=>/^es/i.test(x.lang));
  if(v)u.voice=v;
  speechSynthesis.speak(u);
 }catch(e){}
}
function pintarVoz(){
 if(!bV)return;
 const on=vozOn();
 bV.setAttribute('aria-pressed',String(on));
 bV.setAttribute('aria-label',on?'Dejar de leer las respuestas en voz alta':'Leer las respuestas en voz alta');
 bV.title=on?'Voz activada':'Leer en voz alta';
 bV.textContent='';bV.appendChild(icono(on?'vol':'volx',20));
}
function alternarVoz(){
 const on=!vozOn();
 try{sessionStorage.setItem('nix_voz',on?'1':'0')}catch(e){}
 pintarVoz();
 if(on)hablar('Leeré mis respuestas en voz alta.');else cancelarVoz();
}
function dictar(){
 if(!SR)return;
 if(escuchando){try{rec.stop()}catch(e){}return}
 if(ocupado)return;
 cancelarVoz();
 let avisado=false;try{avisado=sessionStorage.getItem('nix_vozaviso')==='1'}catch(e){}
 if(!avisado){
  try{sessionStorage.setItem('nix_vozaviso','1')}catch(e){}
  agregar({r:'n',t:'Para dictar, tu navegador envía el audio a su propio servicio de voz. Si prefieres no usarlo, escribe tu pregunta.',cards:[],chips:[]});
 }
 let final='';
 try{
  rec=new SR();
  rec.lang='es-MX';rec.interimResults=true;rec.continuous=false;rec.maxAlternatives=1;
  rec.onstart=()=>{escuchando=true;mic.classList.add('on');mic.setAttribute('aria-pressed','true');input.placeholder='Te escucho…'};
  rec.onresult=e=>{let t='';for(let i=0;i<e.results.length;i++){t+=e.results[i][0].transcript;if(e.results[i].isFinal)final=t}input.value=t};
  rec.onerror=e=>{
   if(e.error==='not-allowed'||e.error==='service-not-allowed')agregar({r:'n',t:'No tengo permiso para usar el micrófono. Actívalo en el navegador o escribe tu pregunta.',cards:[],chips:[]});
   else if(e.error==='network')agregar({r:'n',t:'No pude usar el dictado en este momento. Escribe tu pregunta, por favor.',cards:[],chips:[]});
  };
  rec.onend=()=>{
   escuchando=false;mic.classList.remove('on');mic.setAttribute('aria-pressed','false');input.placeholder=PLACEHOLDER;
   const v=(final||input.value).trim();
   input.value='';
   if(v)enviar(v);
  };
  rec.start();
 }catch(e){escuchando=false;mic.classList.remove('on')}
}

async function enviar(txt){
 txt=String(txt||'').replace(/\s+/g,' ').trim().slice(0,200);
 if(!txt||ocupado)return;
 clearTimeout(navT);
 cancelarVoz();
 ocupado=true;
 const g=gen;
 agregar({r:'u',t:txt});
 const pt=escribiendo();
 let r;
 try{r=cerebro.responder(txt,E.ctx)}
 catch(e){r={t:'Tuve un problema al buscar eso. Prueba de nuevo con otras palabras.',cards:[],chips:[],ctx:E.ctx}}
 let ia=null;
 if(r.ia&&IA&&IA.disponible()){
  try{ia=await IA.responder({pregunta:txt,docs:r.docs,historial:E.log.slice(0,-1)})}catch(e){ia=null}
 }
 if(!ia)await dormir(reduce?0:Math.min(900,260+r.t.length*3));
 pt.remove();
 if(g!==gen)return;
 E.ctx=r.ctx||null;
 agregar({r:'n',t:ia||r.t,cards:r.cards||[],chips:r.chips||[],ia:!!ia});
 hablar(ia||r.t);
 ocupado=false;
 if(r.ir)navT=setTimeout(()=>ir(r.ir.u),1100);
}
function ir(u){
 const dst=seguro(destino(u));
 if(mismaPagina(dst)){
  const h=new URL(dst,location.href).hash;
  if(h)location.hash=h;else scrollTo({top:0,behavior:reduce?'auto':'smooth'});
  if(mobile())cerrar(false);
 }else{
  if(mobile())E.open=false;
  guardar();
  location.href=dst;
 }
}
function bienvenida(){
 const b=cerebro.bienvenida(pagina);
 agregar({r:'n',t:b.t,cards:[],chips:b.chips||[]});
}
function repintar(){
 log.textContent='';
 E.log.forEach(m=>pintar(m));
 const u=E.log[E.log.length-1];
 if(u&&u.r==='n')chips(u.chips);
 log.scrollTop=log.scrollHeight;
}
function reiniciar(){
 clearTimeout(navT);
 cancelarVoz();
 gen++;
 E.log=[];E.ctx=null;ocupado=false;
 log.textContent='';
 bienvenida();
 if(finoPuntero)input.focus({preventScroll:true});
}

function ocultarTip(){if(tip)tip.classList.remove('on');try{sessionStorage.setItem(TIPKEY,'1')}catch(e){}}
function ajustarVisor(){
 const vv=w.visualViewport;
 if(!E.open||!mobile()||!vv){panel.style.height='';panel.style.top='';return}
 panel.style.height=vv.height+'px';panel.style.top=vv.offsetTop+'px';
}
function abrir(){
 E.open=true;
 panel.classList.add('on');
 d.body.classList.add('nix-abierto');
 btn.setAttribute('aria-expanded','true');
 panel.setAttribute('aria-modal',mobile()?'true':'false');
 if(!E.log.length)bienvenida();
 ajustarVisor();
 ocultarTip();
 guardar();
 setTimeout(()=>{(finoPuntero?input:panel).focus({preventScroll:true});log.scrollTop=log.scrollHeight},60);
}
function cerrar(devolver){
 cancelarVoz();
 if(escuchando)try{rec.stop()}catch(e){}
 E.open=false;
 panel.classList.remove('on');
 d.body.classList.remove('nix-abierto');
 btn.setAttribute('aria-expanded','false');
 ajustarVisor();
 guardar();
 if(devolver!==false)btn.focus({preventScroll:true});
}

function montar(){
 btn=el('button');btn.id='nix-btn';btn.type='button';
 btn.setAttribute('aria-label','Abrir NIX AI, el asistente del museo');
 btn.setAttribute('aria-expanded','false');btn.setAttribute('aria-controls','nix-panel');
 const im=el('img');im.src='nix-avatar-sm.png';im.alt='';im.width=160;im.height=160;im.decoding='async';
 btn.append(im,el('span','nix-dot'));
 btn.querySelector('.nix-dot').setAttribute('aria-hidden','true');

 tip=el('div','nix-tip','Pregúntale a NIX');
 tip.setAttribute('aria-hidden','true');

 panel=el('div');panel.id='nix-panel';panel.tabIndex=-1;
 panel.setAttribute('role','dialog');panel.setAttribute('aria-label','NIX AI, asistente del museo');

 const h=el('div','nix-h');
 const av=el('span','nix-av');const im2=el('img');im2.src='nix-avatar-sm.png';im2.alt='';av.appendChild(im2);
 const ht=el('div','nix-ht');ht.append(el('b',null,'NIX AI'),el('small',null,'El guardián del conocimiento de MUDICET69'));
 const bR=el('button','nix-ib');bR.type='button';bR.setAttribute('aria-label','Empezar una conversación nueva');bR.title='Conversación nueva';bR.appendChild(icono('reset'));
 const bX=el('button','nix-ib');bX.type='button';bX.setAttribute('aria-label','Cerrar NIX AI');bX.title='Cerrar';bX.appendChild(icono('x',20));
 if(TTS){bV=el('button','nix-ib');bV.type='button';bV.addEventListener('click',alternarVoz)}
 h.append(av,ht,...(bV?[bV]:[]),bR,bX);

 log=el('div','nix-log');log.setAttribute('role','log');log.setAttribute('aria-live','polite');log.setAttribute('aria-label','Conversación con NIX');

 const f=el('div','nix-f');
 const form=el('form','nix-form');form.setAttribute('autocomplete','off');
 input=el('input','nix-in');input.type='text';input.maxLength=200;input.placeholder=PLACEHOLDER;
 input.setAttribute('aria-label','Escribe tu pregunta');input.setAttribute('enterkeyhint','send');
 const env=el('button','nix-send');env.type='submit';env.setAttribute('aria-label','Enviar pregunta');env.appendChild(icono('send',20));
 if(SR){
  mic=el('button','nix-send nix-mic');mic.type='button';
  mic.setAttribute('aria-label','Dictar tu pregunta con el micrófono');mic.setAttribute('aria-pressed','false');mic.title='Dictar pregunta';
  mic.appendChild(icono('mic',20));
  mic.addEventListener('click',dictar);
 }
 form.append(input,...(mic?[mic]:[]),env);
 f.append(form,el('p','nix-nota',iaActiva?'NIX usa IA para redactar con la información del museo. No escribas datos personales.':'NIX responde con la información publicada en el museo.'));

 panel.append(h,log,f);
 d.body.append(tip,btn,panel);

 try{if(d.documentElement.classList.contains('kiosco')&&w.__nixLeerKiosco&&sessionStorage.getItem('nix_voz')===null)sessionStorage.setItem('nix_voz','1')}catch(e){}
 pintarVoz();
 addEventListener('pagehide',cancelarVoz);
 btn.addEventListener('click',()=>E.open?cerrar():abrir());
 tip.addEventListener('click',abrir);
 bX.addEventListener('click',()=>cerrar());
 bR.addEventListener('click',reiniciar);
 form.addEventListener('submit',e=>{e.preventDefault();const v=input.value;input.value='';enviar(v)});

 d.addEventListener('keydown',e=>{
  if(!E.open)return;
  if(e.key==='Escape'&&!d.querySelector('.modal.on,.bq.on')){e.preventDefault();cerrar()}
  if(e.key==='Tab'&&mobile()){
   const fs=[...panel.querySelectorAll('button,a[href],input')].filter(x=>!x.disabled&&x.offsetParent!==null);
   if(!fs.length)return;
   const a=fs[0],z=fs[fs.length-1];
   if(e.shiftKey&&(d.activeElement===a||d.activeElement===panel)){e.preventDefault();z.focus()}
   else if(!e.shiftKey&&d.activeElement===z){e.preventDefault();a.focus()}
  }
 });
 if(w.visualViewport){
  w.visualViewport.addEventListener('resize',()=>{ajustarVisor();log.scrollTop=log.scrollHeight});
  w.visualViewport.addEventListener('scroll',ajustarVisor);
 }
 addEventListener('resize',()=>{panel.setAttribute('aria-modal',mobile()&&E.open?'true':'false');ajustarVisor()});

 if(E.log.length)repintar();
 if(E.open&&!mobile())abrir();else E.open=false;

 let visto=false;try{visto=sessionStorage.getItem(TIPKEY)==='1'}catch(e){}
 if(!visto&&!E.open){
  setTimeout(()=>{if(!E.open)tip.classList.add('on')},4200);
  setTimeout(ocultarTip,12000);
 }

 const kiosco=d.documentElement.classList.contains('kiosco');
 if(kiosco){
  const seg=((w.__nixAjustes&&w.__nixAjustes.segundosInactividad)||90)*1000;
  let ultimo=Date.now();
  const tocar=()=>{ultimo=Date.now()};
  ['pointerdown','pointermove','keydown','wheel','touchstart'].forEach(n=>addEventListener(n,tocar,{passive:true,capture:true}));
  setInterval(()=>{
   if(Date.now()-ultimo<seg)return;
   ultimo=Date.now();
   if(E.open||E.log.length){
    clearTimeout(navT);
    if(E.open)cerrar(false);
    cancelarVoz();gen++;ocupado=false;E.log=[];E.ctx=null;log.textContent='';guardar();
   }
  },1000);
 }
}

function cargarIA(D,i){
 const nombres=['nix-ai.js','nix-ia.js'];
 i=i||0;
 const s=d.createElement('script');s.src=nombres[i];s.async=true;
 s.onload=()=>{if(w.NixIA&&w.NixIA.iniciar(D))IA=w.NixIA};
 s.onerror=()=>{s.remove();if(i+1<nombres.length)cargarIA(D,i+1)};
 d.body.appendChild(s);
}

const datos=w.DATOS||fetch('datos.json',{cache:'no-cache'}).then(r=>{if(!r.ok)throw new Error(r.status);return r.json()});
datos.then(D=>D,()=>null).then(D=>{
 if(D&&D.sitio&&D.sitio.inicio)INI=D.sitio.inicio;
 if(D&&D.ajustes&&D.ajustes.kiosco)w.__nixAjustes=D.ajustes.kiosco;
 if(D&&D.ajustes&&D.ajustes.nixLeerEnKiosco===true)w.__nixLeerKiosco=true;
 if(D&&w.NixCerebro)cerebro=w.NixCerebro.crear(D,{});
 else cerebro={
  responder:()=>({t:'Ahora mismo no puedo leer la información del museo. Recarga la página en un momento e inténtalo de nuevo.',cards:[],chips:[],ctx:null}),
  bienvenida:()=>({t:'Soy **NIX**. Ahora mismo no puedo leer la información del museo; recarga la página en un momento.',chips:[]})
 };
 const cfgIA=D&&D.ajustes&&D.ajustes.nix&&D.ajustes.nix.ia;
 iaActiva=!!(cfgIA&&cfgIA.activa===true&&cfgIA.siteKey&&w.NixCerebro&&D);
 montar();
 if(iaActiva)cargarIA(D);
});
})();
