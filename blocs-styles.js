/* Arkade : choix du style des Blocs. À charger APRÈS le script principal de index.html. */
(function(){
  if(typeof bk==='undefined'||typeof bkDraw!=='function')return;
  var KEY='arki_bk_theme';
  var neonCell=bkCell;
  var NAME={'#6af2ff':'I','#ffe14d':'O','#b36bff':'T','#5dffa0':'S','#ff5d8f':'Z','#5b8cff':'J','#ff9f4d':'L'};
  function path(c,x,y,w,h,r){c.beginPath();c.moveTo(x+r,y);c.lineTo(x+w-r,y);c.quadraticCurveTo(x+w,y,x+w,y+r);c.lineTo(x+w,y+h-r);c.quadraticCurveTo(x+w,y+h,x+w-r,y+h);c.lineTo(x+r,y+h);c.quadraticCurveTo(x,y+h,x,y+h-r);c.lineTo(x,y+r);c.quadraticCurveTo(x,y,x+r,y);c.closePath()}
  var CELL={
    neon:neonCell,
    bevel:function(c,x,y,s,col,a){
      c.globalAlpha=a==null?1:a;c.fillStyle=col;c.fillRect(x,y,s,s);
      c.fillStyle='rgba(255,255,255,.55)';c.fillRect(x,y,s,3);c.fillRect(x,y,3,s);
      c.fillStyle='rgba(0,0,0,.45)';c.fillRect(x,y+s-3,s,3);c.fillRect(x+s-3,y,3,s);
      c.strokeStyle='rgba(0,0,0,.55)';c.lineWidth=1;c.strokeRect(x+.5,y+.5,s-1,s-1);c.globalAlpha=1;
    },
    gb:function(c,x,y,s,col,a){
      c.globalAlpha=a==null?1:a;c.fillStyle='#0f380f';c.fillRect(x+1,y+1,s-2,s-2);
      c.fillStyle='#9bbc0f';c.fillRect(x+3,y+3,s-6,s-6);
      c.fillStyle=col;c.fillRect(x+5,y+5,s-10,s-10);c.globalAlpha=1;
    },
    candy:function(c,x,y,s,col,a){
      c.globalAlpha=a==null?1:a;
      c.fillStyle='rgba(0,0,0,.18)';path(c,x+2,y+3,s-3,s-3,7);c.fill();
      c.fillStyle=col;path(c,x+1,y+1,s-3,s-3,7);c.fill();
      c.fillStyle='rgba(255,255,255,.65)';c.beginPath();c.ellipse(x+s*.34,y+s*.3,s*.16,s*.1,-.5,0,7);c.fill();
      c.globalAlpha=1;
    },
    glass:function(c,x,y,s,col,a){
      c.globalAlpha=a==null?1:a;
      c.fillStyle=col;c.globalAlpha*=.28;c.fillRect(x+1,y+1,s-2,s-2);c.globalAlpha=a==null?1:a;
      c.strokeStyle=col;c.lineWidth=2;c.strokeRect(x+2,y+2,s-4,s-4);
      c.strokeStyle='rgba(255,255,255,.7)';c.lineWidth=1.5;c.beginPath();c.moveTo(x+5,y+s-6);c.lineTo(x+5,y+5);c.lineTo(x+s-6,y+5);c.stroke();
      c.globalAlpha=1;
    }
  };
  var TH={
    neon:{n:'Néon',bg:'#0c0224',grid:'rgba(255,79,216,.14)',flash:'rgba(255,255,255,.85)',ink:'#3df5ff',sub:'#ffb8f0',veil:'rgba(12,2,36,.86)',cell:'neon',pal:null},
    classic:{n:'Classique',bg:'#000',grid:'rgba(255,255,255,.07)',flash:'rgba(255,255,255,.85)',ink:'#fff',sub:'#cfcfcf',veil:'rgba(0,0,0,.82)',cell:'bevel',pal:{I:'#00d8f0',O:'#f8d800',T:'#a000f0',S:'#00d800',Z:'#f00000',J:'#2030f0',L:'#f09000'}},
    gameboy:{n:'Game Boy',bg:'#9bbc0f',grid:'rgba(15,56,15,.12)',flash:'rgba(15,56,15,.55)',ink:'#0f380f',sub:'#306230',veil:'rgba(155,188,15,.9)',cell:'gb',pal:{I:'#0f380f',O:'#306230',T:'#0f380f',S:'#306230',Z:'#0f380f',J:'#306230',L:'#0f380f'}},
    candy:{n:'Bonbons',bg:'#fff3e0',grid:'rgba(255,150,180,.28)',flash:'rgba(255,255,255,.9)',ink:'#d6346f',sub:'#9a5b7a',veil:'rgba(255,243,224,.9)',cell:'candy',pal:{I:'#7fdcff',O:'#ffd86b',T:'#c59bff',S:'#8ff0b5',Z:'#ff8fb3',J:'#8fa8ff',L:'#ffb37a'}},
    glass:{n:'Verre',bg:'#061423',grid:'rgba(120,200,255,.08)',flash:'rgba(200,240,255,.7)',ink:'#bfeaff',sub:'#7fb8d8',veil:'rgba(6,20,35,.86)',cell:'glass',pal:{I:'#6af2ff',O:'#ffe14d',T:'#b36bff',S:'#5dffa0',Z:'#ff5d8f',J:'#5b8cff',L:'#ff9f4d'}}
  };
  var cur='neon';
  try{var s=localStorage.getItem(KEY);if(s&&TH[s])cur=s}catch(e){}
  function tc(col){var T=TH[cur];return T.pal&&NAME[col]?T.pal[NAME[col]]:col}

  window.bkDraw=function(){
    var T=TH[cur],W=BKW*BKS,H=BKH*BKS,cell=CELL[T.cell];
    bx.fillStyle=T.bg;bx.fillRect(0,0,W,H);
    bx.strokeStyle=T.grid;bx.lineWidth=1;
    for(var i=1;i<BKW;i++){bx.beginPath();bx.moveTo(i*BKS+.5,0);bx.lineTo(i*BKS+.5,H);bx.stroke()}
    for(i=1;i<BKH;i++){bx.beginPath();bx.moveTo(0,i*BKS+.5);bx.lineTo(W,i*BKS+.5);bx.stroke()}
    bk.grid.forEach(function(row,r){row.forEach(function(col,c){if(col)cell(bx,c*BKS,r*BKS,BKS,tc(col))})});
    if(bk.clearing){bx.fillStyle=T.flash;bk.clearing.forEach(function(r){bx.fillRect(0,r*BKS,W,BKS)})}
    if(bk.cur&&!bk.paused){
      var m=bk.cur.m,x=bk.cur.x,y=bk.cur.y,k=bk.cur.k,gy=bkGhostY(),col=tc(BKP[k].c);
      for(var r=0;r<m.length;r++)for(var c=0;c<m[r].length;c++)if(m[r][c]&&gy+r>=0)cell(bx,(x+c)*BKS,(gy+r)*BKS,BKS,col,.22);
      for(r=0;r<m.length;r++)for(c=0;c<m[r].length;c++)if(m[r][c]&&y+r>=0)cell(bx,(x+c)*BKS,(y+r)*BKS,BKS,col);
    }
    var msg=bk.over?['PERDU',bk.score+' pts · touche pour rejouer']:bk.paused?['PAUSE','touche pour reprendre']:!bk.run?['BLOCS','touche pour commencer']:null;
    if(msg){
      bx.fillStyle=T.veil;bx.fillRect(0,H/2-46,W,92);
      bx.fillStyle=T.ink;bx.textAlign='center';
      bx.font="800 24px Orbitron,'Inter Tight',system-ui,sans-serif";bx.fillText(msg[0],W/2,H/2-6);
      bx.fillStyle=T.sub;bx.font="12px 'Inter Tight',system-ui,sans-serif";bx.fillText(msg[1],W/2,H/2+22);
    }
    nx.clearRect(0,0,bkNx.width,bkNx.height);
    bk.queue.forEach(function(k,i){
      var mm=BKP[k].m,s=17,w=mm[0].length*s,ox=(bkNx.width-w)/2,oy=i*58+12,cc=tc(BKP[k].c);
      mm.forEach(function(row,r){row.forEach(function(v,c){if(v)cell(nx,ox+c*s,oy+r*s,s,cc)})});
    });
  };

  var css=document.createElement('style');
  css.textContent=
  '.bkthemes{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin:2px 0 10px}'+
  '.bkthemes button{border:1.5px solid rgba(255,255,255,.35);background:rgba(0,0,0,.35);color:#fff;border-radius:999px;padding:6px 12px;font:600 12px "Inter Tight",system-ui,sans-serif;cursor:pointer;touch-action:manipulation}'+
  '.bkthemes button[aria-pressed=true]{background:#fff;color:#0d0c08;border-color:#fff}'+
  'section#blk[data-bkt]:not([data-bkt=neon]).on::before,section#blk[data-bkt]:not([data-bkt=neon]).on::after{display:none}'+
  /* Classique */
  'section#blk[data-bkt=classic].on{background:#14161c;border-color:#8a8f9c;box-shadow:0 24px 60px -28px #000;font-family:"Inter Tight",system-ui,sans-serif}'+
  '[data-bkt=classic] #bk{border:4px solid #8a8f9c;border-radius:2px;box-shadow:none}'+
  '[data-bkt=classic] .bkbox{background:#000;border:2px solid #8a8f9c;border-radius:2px;box-shadow:none}'+
  '[data-bkt=classic] .bkbox span{color:#cfd3dc;font-family:"Inter Tight",sans-serif}[data-bkt=classic] .bkbox b{color:#fff;text-shadow:none;font-family:"Inter Tight",sans-serif}'+
  '[data-bkt=classic] .bkpad button{background:#2a2e38;border:2px solid #8a8f9c;color:#fff;box-shadow:none}[data-bkt=classic] .bkpad button:active{background:#fff;color:#000}'+
  '[data-bkt=classic] .info{color:#cfd3dc;text-shadow:none}[data-bkt=classic] .btn.primary{background:#fff;color:#000;box-shadow:none;border-radius:2px;letter-spacing:.06em}'+
  /* Game Boy */
  'section#blk[data-bkt=gameboy].on{background:#8bac0f;border:6px solid #306230;border-radius:18px 18px 46px 18px;box-shadow:inset 0 0 0 4px #9bbc0f,0 24px 60px -28px #000;font-family:"VT323",ui-monospace,monospace}'+
  '[data-bkt=gameboy] #bk{border:4px solid #0f380f;border-radius:2px;box-shadow:none}'+
  '[data-bkt=gameboy] .bkbox{background:#9bbc0f;border:3px solid #0f380f;border-radius:2px;box-shadow:none}'+
  '[data-bkt=gameboy] .bkbox span,[data-bkt=gameboy] .bkbox b{color:#0f380f;text-shadow:none;font-family:"VT323",ui-monospace,monospace;font-weight:400;letter-spacing:.08em}[data-bkt=gameboy] .bkbox b{font-size:22px}'+
  '[data-bkt=gameboy] .bkpad button{background:#306230;border:3px solid #0f380f;color:#9bbc0f;border-radius:50%;box-shadow:0 4px 0 #0f380f}[data-bkt=gameboy] .bkpad button:active{background:#0f380f}'+
  '[data-bkt=gameboy] .info{color:#0f380f;text-shadow:none;font:20px "VT323",ui-monospace,monospace}'+
  '[data-bkt=gameboy] .btn.primary{background:#0f380f;color:#9bbc0f;border:0;border-radius:4px;box-shadow:none;font:22px "VT323",ui-monospace,monospace;letter-spacing:.1em}'+
  '[data-bkt=gameboy] .bkthemes button{border-color:#0f380f;background:transparent;color:#0f380f}[data-bkt=gameboy] .bkthemes button[aria-pressed=true]{background:#0f380f;color:#9bbc0f}'+
  /* Bonbons */
  'section#blk[data-bkt=candy].on{background:radial-gradient(rgba(255,255,255,.7) 3px,transparent 4px) 0 0/30px 30px,linear-gradient(160deg,#ffd9ec,#ffe9c9 55%,#d5f5e6);border:4px solid #fff;box-shadow:0 0 0 5px #ff9ec4,0 24px 50px -24px rgba(122,47,143,.6);border-radius:34px;font-family:"Fredoka","Trebuchet MS",sans-serif}'+
  '[data-bkt=candy] #bk{border:4px solid #fff;border-radius:18px;box-shadow:0 0 0 4px #ff9ec4,0 12px 24px -10px rgba(122,47,143,.5)}'+
  '[data-bkt=candy] .bkbox{background:#fff;border:3px solid #ff9ec4;border-radius:16px;box-shadow:0 4px 0 #ff9ec4}'+
  '[data-bkt=candy] .bkbox span{color:#c2348b;font-family:"Fredoka",sans-serif}[data-bkt=candy] .bkbox b{color:#7a2f8f;text-shadow:none;font-family:"Fredoka",sans-serif}'+
  '[data-bkt=candy] .bkpad button{background:#ff9ec4;border:3px solid #fff;color:#fff;border-radius:50%;box-shadow:0 4px 0 #c2348b}[data-bkt=candy] .bkpad button:active{background:#c2348b}'+
  '[data-bkt=candy] .info{color:#7a2f8f;text-shadow:none}[data-bkt=candy] .btn.primary{background:#ff6fae;color:#fff;border:3px solid #fff;border-radius:999px;box-shadow:0 5px 0 #c2348b,0 0 0 3px #ff9ec4;font-family:"Fredoka",sans-serif;letter-spacing:0;text-transform:none;font-size:16px}'+
  '[data-bkt=candy] .bkthemes button{border-color:#ff9ec4;background:#fff;color:#c2348b}[data-bkt=candy] .bkthemes button[aria-pressed=true]{background:#ff6fae;color:#fff;border-color:#ff6fae}'+
  /* Verre */
  'section#blk[data-bkt=glass].on{background:radial-gradient(1.5px 1.5px at 20% 30%,#fff,transparent),radial-gradient(1px 1px at 70% 20%,#fff,transparent),radial-gradient(1px 1px at 55% 75%,#fff,transparent),linear-gradient(180deg,#040c1c,#0a2a4a);border:2px solid rgba(190,235,255,.5);box-shadow:0 0 30px rgba(120,200,255,.25),0 24px 60px -28px #000;font-family:"Inter Tight",system-ui,sans-serif}'+
  '[data-bkt=glass] #bk{border:1.5px solid rgba(190,235,255,.6);border-radius:12px;box-shadow:0 0 28px rgba(120,200,255,.3)}'+
  '[data-bkt=glass] .bkbox{background:rgba(255,255,255,.08);border:1.5px solid rgba(190,235,255,.45);border-radius:12px;box-shadow:none;backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px)}'+
  '[data-bkt=glass] .bkbox span{color:#9fd4ee;font-family:"Inter Tight",sans-serif}[data-bkt=glass] .bkbox b{color:#e6f8ff;text-shadow:none;font-family:"Inter Tight",sans-serif}'+
  '[data-bkt=glass] .bkpad button{background:rgba(255,255,255,.1);border:1.5px solid rgba(190,235,255,.5);color:#d8f3ff;border-radius:14px;box-shadow:none}[data-bkt=glass] .bkpad button:active{background:rgba(120,200,255,.45)}'+
  '[data-bkt=glass] .info{color:#bfeaff;text-shadow:none}[data-bkt=glass] .btn.primary{background:linear-gradient(135deg,#2fd3c0,#5b8cff);color:#04263a;border:0;border-radius:999px;box-shadow:none;font-family:"Inter Tight",sans-serif;letter-spacing:.04em}';
  document.head.appendChild(css);

  var sec=document.getElementById('blk'),wrap=sec&&sec.querySelector('.bkwrap');
  if(!sec||!wrap)return;
  var bar=document.createElement('div');bar.className='bkthemes';bar.setAttribute('role','group');bar.setAttribute('aria-label','Style des Blocs');
  Object.keys(TH).forEach(function(id){
    var b=document.createElement('button');b.type='button';b.textContent=TH[id].n;b.dataset.t=id;
    b.onclick=function(){set(id)};bar.appendChild(b);
  });
  sec.insertBefore(bar,wrap);
  function set(id){
    cur=id;sec.dataset.bkt=id;
    try{localStorage.setItem(KEY,id)}catch(e){}
    bar.querySelectorAll('button').forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.t===id))});
    bkDraw();
  }
  set(cur);
})();
