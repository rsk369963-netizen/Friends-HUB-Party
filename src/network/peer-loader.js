/* PeerJS loader with fallbacks */
window.loadPeerLib=function(){
  return new Promise(function(res){
    if(window.Peer) return res(true);
    var urls=['https://unpkg.com/peerjs@1.5.4/dist/peerjs.min.js','https://cdn.jsdelivr.net/npm/peerjs@1.5.4/dist/peerjs.min.js','https://cdnjs.cloudflare.com/ajax/libs/peerjs/1.5.4/peerjs.min.js'];
    var i=0;
    (function next(){
      if(window.Peer) return res(true);
      if(i>=urls.length) return res(false);
      var s=document.createElement('script'); s.src=urls[i++];
      s.onload=function(){ res(!!window.Peer); };
      s.onerror=next;
      document.head.appendChild(s);
    })();
  });
};

/* HLS.js loader with fallbacks */
window.loadHlsLib=function(){
  return new Promise(function(res){
    if(window.Hls) return res(true);
    var urls=['https://cdn.jsdelivr.net/npm/hls.js@1.5.8/dist/hls.min.js','https://unpkg.com/hls.js@1.5.8/dist/hls.min.js','https://cdnjs.cloudflare.com/ajax/libs/hls.js/1.5.8/hls.min.js'];
    var i=0;
    (function next(){
      if(window.Hls) return res(true);
      if(i>=urls.length) return res(false);
      var s=document.createElement('script'); s.src=urls[i++];
      s.onload=function(){ res(!!window.Hls); };
      s.onerror=next;
      document.head.appendChild(s);
    })();
  });
};

/* Dash.js loader with fallbacks */
window.loadDashLib=function(){
  return new Promise(function(res){
    if(window.dashjs) return res(true);
    var urls=['https://cdn.jsdelivr.net/npm/dashjs@4.7.4/dist/dash.all.min.js','https://unpkg.com/dashjs@4.7.4/dist/dash.all.min.js','https://cdnjs.cloudflare.com/ajax/libs/dashjs/4.7.4/dash.all.min.js'];
    var i=0;
    (function next(){
      if(window.dashjs) return res(true);
      if(i>=urls.length) return res(false);
      var s=document.createElement('script'); s.src=urls[i++];
      s.onload=function(){ res(!!window.dashjs); };
      s.onerror=next;
      document.head.appendChild(s);
    })();
  });
};