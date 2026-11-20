(function(){
 'use strict';
 var $=function(s){return document.querySelector(s)};
 var tEl=document.createElement('div');tEl.id='p4-toast';tEl.setAttribute('role','status');tEl.setAttribute('aria-live','polite');
 var tt;function toast(m,w){tEl.textContent=m;tEl.className='show'+(w?' warn':'');clearTimeout(tt);tt=setTimeout(function(){tEl.className=''},w?5000:2500)}
 window.p4toast=toast;
 var bar=document.createElement('div');bar.id='p4-bar';
 function btn(label,title,fn){var b=document.createElement('button');b.type='button';b.textContent=label;b.title=title;b.setAttribute('aria-label',title);b.addEventListener('click',function(){try{fn(b)}catch(e){toast('Not supported on this device',1)}});bar.appendChild(b);return b}
 // Share / copy link
 btn('Share','Share this page',function(){
  var d={title:document.title,text:'Join my Friends HUB Party!',url:location.href};
  if(navigator.share)return navigator.share(d).catch(function(){});
  navigator.clipboard.writeText(location.href).then(function(){toast('Link copied')},function(){toast('Copy failed',1)})});
 // Fullscreen
 btn('Fullscreen','Toggle fullscreen',function(){
  if(document.fullscreenElement)document.exitFullscreen();else document.documentElement.requestFullscreen()});
 // Keep screen awake
 var lock=null;
 btn('Keep awake','Keep screen awake during the party',function(b){
  if(!('wakeLock' in navigator)){toast('Wake lock not supported',1);return}
  if(lock){lock.release();lock=null;b.classList.remove('on');toast('Screen sleep allowed');return}
  navigator.wakeLock.request('screen').then(function(l){lock=l;b.classList.add('on');toast('Screen will stay on');l.addEventListener('release',function(){lock=null;b.classList.remove('on')})},function(){toast('Could not keep screen on',1)})});
 document.addEventListener('visibilitychange',function(){if(document.visibilityState==='visible'&&lock===null){/* user toggles manually */}});
 // Install (PWA)
 var dip=null;var ib=btn('Install','Install as app',function(){if(dip){dip.prompt();dip=null;ib.style.display='none'}});ib.style.display='none';
 window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();dip=e;ib.style.display=''});
 // Online / offline notice
 window.addEventListener('offline',function(){toast('You are offline. Live party features need internet.',1)});
 window.addEventListener('online',function(){toast('Back online')});
 // Error safety net: avoid silent failures
 var errCount=0;
 window.addEventListener('error',function(e){if(++errCount<=3)console.warn('[Phase4] caught',e.message)});
 window.addEventListener('unhandledrejection',function(e){if(++errCount<=3)console.warn('[Phase4] promise',e.reason)});
 // Performance: lazy-load iframes, safe external links
 function tidy(root){
  (root||document).querySelectorAll('iframe:not([loading])').forEach(function(f){f.setAttribute('loading','lazy')});
  (root||document).querySelectorAll('a[target=_blank]').forEach(function(a){var r=(a.getAttribute('rel')||'');if(r.indexOf('noopener')<0)a.setAttribute('rel',(r+' noopener noreferrer').trim())});
  (root||document).querySelectorAll('button:not([type])').forEach(function(b){b.type='button'});
 }
 // Keyboard shortcut: F = fullscreen (not while typing)
 document.addEventListener('keydown',function(e){
  var t=e.target&&e.target.tagName;if(/INPUT|TEXTAREA|SELECT/.test(t)||e.ctrlKey||e.metaKey||e.altKey)return;
  if(e.key==='f'||e.key==='F'){if(document.fullscreenElement)document.exitFullscreen();else document.documentElement.requestFullscreen().catch(function(){})}
 });
 function init(){document.body.appendChild(tEl);document.body.appendChild(bar);tidy();
  var n=0,tm;new MutationObserver(function(){clearTimeout(tm);tm=setTimeout(tidy,300)}).observe(document.body,{childList:true,subtree:true})}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();