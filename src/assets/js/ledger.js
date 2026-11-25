/* 首页 hero 的账本点阵（Ledger Field）。由 sections/ledger.njk 引入，需要先加载 three.js r128（cdnjs）。
   从交接包 width-hero/ledger-hero/index.html 移植，逻辑基本不变；改动只有：
   - 元素在 [data-ledger] 容器里找，页面没有这个容器就什么都不做；
   - 品牌蓝换成 WIDTH 蓝 #0D4FD3（地面着色器的 uCol 也一样），光晕用它的一个更亮的色调；
   - 画布上的字体换成 Gotham（中文回落到苹方），等宽字仍是 Geist Mono；
   - 画布上和按钮上的文字按页面语言显示（模板里的 data-i18n）；
   - 字体加载完后重画一次静止帧（「减少动态效果」时）。
   - 风险旗标（11-22 v3）：蓝色扫描波峰到达才触发，先是蓝色「锁定」点和收拢的椭圆环，再转红/琥珀，之后声呐扩散、标签从细线和小圆点展开。
   画面上的一切都是模拟演示，并标明「模拟演示 / SIMULATED」。 */

/* Ledger Field, from the concept board (direction F): CPU-projected ledger grid drawn as three.js points,
   pins and labels on a 2D canvas on top. Framing: full width, horizon under the copy, address centred.
   v2 (2026-11-22): bigger, darker dots; no horizon rule (the far rows draw the horizon); the screening pulse
   is a brand-blue scan with no drawn line: a wide band of light on the ground, blooming dots on the crest
   and a long "scanned" afterglow behind it that fades back to grey. */
(function(){
'use strict';
const root=document.querySelector('[data-ledger]');if(!root)return;
const field=root.querySelector('.ledger-field'),glc=root.querySelector('.ledger-gl'),ov=root.querySelector('.ledger-ov'),hudEl=root.querySelector('.ledger-hud'),btn=root.querySelector('.ledger-motion');
if(!field||!glc||!ov)return;   /* the status line (.ledger-hud) and the Play/Pause button (.ledger-motion) were removed from the template on 2026-11-22 (Eunice); both are used only if present */
const ctx=ov.getContext('2d');
/* visible strings, from the template (page language). English fallbacks if the attribute is missing. */
let T={play:'Play motion',pause:'Pause motion',sim:'SIMULATED',pulse:'pulse {n}',flagged1:'{n} risky transfer flagged',flaggedN:'{n} risky transfers flagged',hop1:'{n} hop',hopN:'{n} hops',cat:{}};
try{T=Object.assign(T,JSON.parse(root.getAttribute('data-i18n')||'{}'));}catch(e){}
const fmt=(s,n)=>String(s).replace('{n}',n),catName=c=>(T.cat&&T.cat[c])||c;
const TAU=Math.PI*2,clamp=(x,a,b)=>x<a?a:x>b?b:x,lerp=(a,b,t)=>a+(b-a)*t,pick=a=>a[(Math.random()*a.length)|0];
/* easing for the flag timeline: ease = cubic ease-out, sm = smoothstep, win = 0→1 progress of age a through [t0, t0+dur] */
const ease=k=>1-Math.pow(1-k,3),sm=k=>k*k*(3-2*k),win=(a,t0,dur)=>clamp((a-t0)/dur,0,1);
const col=(c,a)=>'rgba('+c[0]+','+c[1]+','+c[2]+','+(+a).toFixed(3)+')';
const MONO='"Geist Mono", ui-monospace, Menlo, monospace';
const reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
/* accent = WIDTH blue (#0D4FD3); glow = a lighter tint of it for bloom, which reads as light on white */
const PAL={bg:'#FFFFFF',bgc:[255,255,255],fg:[12,20,48],dim:[98,113,158],accent:[13,79,211],glow:[40,112,255],risk:[214,52,38],amber:[214,134,8],riskText:[184,38,28],amberText:[160,88,4],riskPill:[200,46,34],amberPill:[186,104,6]};

/* point buffer → three.js. aGlow = 1 turns a point from a crisp dot into a soft bloom sprite. */
const MAXP=24000,PB={n:0,pos:new Float32Array(MAXP*3),col:new Float32Array(MAXP*4),size:new Float32Array(MAXP),glow:new Float32Array(MAXP)};
function pt(x,y,s,c,a,g){if(PB.n>=MAXP||a<=0.004)return;const i=PB.n++;PB.pos[i*3]=x;PB.pos[i*3+1]=y;PB.pos[i*3+2]=0;PB.col[i*4]=c[0]/255;PB.col[i*4+1]=c[1]/255;PB.col[i*4+2]=c[2]/255;PB.col[i*4+3]=a>1?1:a;PB.size[i]=s;PB.glow[i]=g||0;}
const MIX=[0,0,0];function blend(a,b,t){MIX[0]=a[0]+(b[0]-a[0])*t;MIX[1]=a[1]+(b[1]-a[1])*t;MIX[2]=a[2]+(b[2]-a[2])*t;return MIX;}
const VS='attribute vec4 aColor;attribute float aSize;attribute float aGlow;uniform float uDpr;uniform float uScale;varying vec4 vC;varying float vG;void main(){vC=aColor;vG=aGlow;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);gl_PointSize=max(1.0,aSize*uScale*uDpr);}';
const FS='uniform float uCore;uniform float uHalo;varying vec4 vC;varying float vG;void main(){float d=length(gl_PointCoord-vec2(0.5))*2.0;float core=1.0-smoothstep(uCore-0.22,uCore,d);float h=clamp(1.0-d,0.0,1.0);float a=mix(max(core,h*h*uHalo),exp(-d*d*4.0)*h,vG);if(a<0.01)discard;gl_FragColor=vec4(vC.rgb,vC.a*a);}';
/* Ground: a faint blue pool under the address, plus the scan light. Each pixel is mapped back onto the ledger
   plane (z = F/s, X = (x-vx)/s), so the light is perspective-correct. No drawn line: a soft band of light
   rides with the crest and a dimmer afterglow trails it. uLift raises it to sit under the lifted crest. */
const GVS='varying vec2 vP;void main(){vec4 wp=modelMatrix*vec4(position,1.0);vP=wp.xy;gl_Position=projectionMatrix*viewMatrix*wp;}';
const GFS='uniform vec2 uC;uniform float uR;uniform vec3 uCol;uniform float uA;uniform float uHy;uniform float uF;uniform float uVx;uniform float uOZ;uniform float uRing;uniform float uAmp;uniform float uLift;uniform float uZf;uniform vec4 uRp[8];uniform vec3 uRc[8];varying vec2 vP;'
  +'void main(){float a=uA*(1.0-smoothstep(0.0,1.0,distance(vP,uC)/uR));'
  +'float s0=max(vP.y-uHy,0.5);float g=clamp(uF/s0/5.0,0.44,1.0);float s=s0/(1.0-uLift*g);float z=uF/s;float X=(vP.x-uVx)/s;'
  +'float e=length(vec2(X,z-uOZ))-uRing;'
  +'float on=step(uHy+0.5,vP.y)*uAmp*(1.0-smoothstep(uZf*0.5,uZf,z));'
  +'float band=exp(-e*e/(1.6*g*g));float wake=e<0.0?exp(e/(2.8*g)):exp(-e*e/(0.5*g*g));'
  +'a+=(band*0.09+wake*0.022)*on;'
  /* sonar: up to 8 soft rings of red/amber light on the ground, one set per flag (uRp = X, z, radius, strength) */
  +'float up=step(uHy+0.5,vP.y)*(1.0-smoothstep(uZf,uZf*1.15,z));vec3 rc=vec3(0.0);float ra=0.0;'
  +'for(int i=0;i<8;i++){vec4 p=uRp[i];if(p.w>0.0){float f=length(vec2(X-p.x,z-p.y))-p.z;float fw=clamp(fwidth(f),0.0001,0.2);'
  +'float g=(exp(-f*f/0.025)*0.06+exp(-f*f/(fw*fw*2.9))*0.42*p.w)*p.w*up;rc+=uRc[i]*g;ra+=g;}}'
  +'float m=smoothstep(0.0,0.03,ra);vec3 C=mix(uCol,rc/max(ra,0.0001),m);float A=mix(a,a*0.4,m)+ra;gl_FragColor=vec4(C,min(A,0.7));}';
let GL=null,bctx=null;
if(window.THREE){try{
  const r=new THREE.WebGLRenderer({canvas:glc,antialias:true,alpha:false,powerPreference:'high-performance'});r.setClearColor(new THREE.Color(PAL.bg),1);
  const scene=new THREE.Scene(),cam=new THREE.OrthographicCamera(0,1,0,1,-10,10);
  const mat=new THREE.ShaderMaterial({uniforms:{uDpr:{value:1},uScale:{value:1.9},uCore:{value:0.78},uHalo:{value:0.18}},vertexShader:VS,fragmentShader:FS,transparent:true,depthTest:false,depthWrite:false,blending:THREE.NormalBlending});
  const geo=new THREE.BufferGeometry(),at=(arr,n)=>{const a=new THREE.BufferAttribute(arr,n);a.setUsage(THREE.DynamicDrawUsage);return a;},aPos=at(PB.pos,3),aCol=at(PB.col,4),aSize=at(PB.size,1),aGlow=at(PB.glow,1);
  geo.setAttribute('position',aPos);geo.setAttribute('aColor',aCol);geo.setAttribute('aSize',aSize);geo.setAttribute('aGlow',aGlow);
  const pts=new THREE.Points(geo,mat);pts.frustumCulled=false;pts.renderOrder=1;scene.add(pts);
  const u1=v=>({value:v});
  const gmat=new THREE.ShaderMaterial({uniforms:{uC:u1(new THREE.Vector2()),uR:u1(400),uCol:u1(new THREE.Vector3(13/255,79/255,211/255)),uA:u1(0.06),uHy:u1(0),uF:u1(1),uVx:u1(0),uOZ:u1(1),uRing:u1(0),uAmp:u1(0),uLift:u1(0),uZf:u1(1),uRp:u1(new Float32Array(32)),uRc:u1(new Float32Array(24))},vertexShader:GVS,fragmentShader:GFS,extensions:{derivatives:true},transparent:true,depthTest:false,depthWrite:false,side:THREE.DoubleSide});
  const plane=new THREE.Mesh(new THREE.PlaneGeometry(1,1),gmat);plane.frustumCulled=false;plane.renderOrder=0;scene.add(plane);
  GL={r,scene,cam,mat,gmat,plane,geo,aPos,aCol,aSize,aGlow};
}catch(e){GL=null;}}
if(!GL){bctx=glc.getContext('2d');}

const S={w:1,h:1,dpr:1,pal:PAL,focus:{x:0,y:0,w:1,h:1},narrow:false};
function layout(){
  const rc=field.getBoundingClientRect();S.w=Math.max(1,rc.width);S.h=Math.max(1,rc.height);S.dpr=Math.min(2,window.devicePixelRatio||1);S.narrow=S.w<720;S.focus={x:0,y:0,w:S.w,h:S.h};
  ov.width=Math.round(S.w*S.dpr);ov.height=Math.round(S.h*S.dpr);ctx.setTransform(S.dpr,0,0,S.dpr,0,0);
  if(GL){GL.r.setPixelRatio(S.dpr);GL.r.setSize(S.w,S.h,false);GL.cam.left=0;GL.cam.right=S.w;GL.cam.top=0;GL.cam.bottom=S.h;GL.cam.updateProjectionMatrix();GL.mat.uniforms.uDpr.value=S.dpr;GL.plane.scale.set(S.w,S.h,1);GL.plane.position.set(S.w/2,S.h/2,-1);}
  else{glc.width=Math.round(S.w*S.dpr);glc.height=Math.round(S.h*S.dpr);bctx.setTransform(S.dpr,0,0,S.dpr,0,0);}
}
function flush(){
  const cx=S.w*0.5,cy=S.h*0.58,R=Math.max(S.w*0.5,S.h)*0.8;
  if(GL){const u=GL.gmat.uniforms;u.uC.value.set(cx,cy);u.uR.value=R;
    u.uHy.value=ledger.hy;u.uF.value=ledger.F;u.uVx.value=ledger.vx;u.uOZ.value=ledger.oZ;u.uZf.value=ledger.zf;u.uRing.value=ledger.r;u.uAmp.value=ledger.amp;u.uLift.value=ledger.lift*ledger.amp;
    const rp=u.uRp.value,rcv=u.uRc.value,rs=ledger.rip;rp.fill(0);for(let m=0;m<rs.length&&m<8;m++){const g=rs[m];rp[m*4]=g.x;rp[m*4+1]=g.z;rp[m*4+2]=g.r;rp[m*4+3]=g.a;rcv[m*3]=g.c[0]/255;rcv[m*3+1]=g.c[1]/255;rcv[m*3+2]=g.c[2]/255;}
    for(const a of [GL.aPos,GL.aCol,GL.aSize,GL.aGlow]){a.updateRange.count=PB.n*a.itemSize;a.needsUpdate=true;}GL.geo.setDrawRange(0,PB.n);GL.r.render(GL.scene,GL.cam);}
  else{bctx.fillStyle=PAL.bg;bctx.fillRect(0,0,S.w,S.h);const g=bctx.createRadialGradient(cx,cy,0,cx,cy,R);g.addColorStop(0,col(PAL.accent,0.07));g.addColorStop(1,col(PAL.accent,0));bctx.fillStyle=g;bctx.fillRect(0,0,S.w,S.h);
    for(let i=0;i<PB.n;i++){if(PB.glow[i])continue;const s=PB.size[i]*1.5;bctx.fillStyle='rgba('+((PB.col[i*4]*255)|0)+','+((PB.col[i*4+1]*255)|0)+','+((PB.col[i*4+2]*255)|0)+','+PB.col[i*4+3].toFixed(3)+')';bctx.beginPath();bctx.arc(PB.pos[i*3],PB.pos[i*3+1],s/2,0,TAU);bctx.fill();}}
}

/* Flags stay visible for FLAG_LIFE seconds after the scan reaches them. */
const FLAG_LIFE=4;
/* sonar: three rings per flag, 0.28 s apart, starting RIP_DELAY s after the hit (once the dot has turned), each
   growing to RIP_R ledger units over RIP_T s (ease-out) while it fades. Each ring is a thin soft line on the
   ground (gaussian, ~1.2 px sigma on screen, so no hard edge) with a little glow, plus a tint on the dots it passes. */
const RIP_T=1.4,RIP_GAP=0.28,RIP_R=0.5,RIP_DELAY=0.2,RIP_END=RIP_DELAY+RIP_T+2*RIP_GAP;
/* risk chips (2D overlay): solid pills in the flag colour with white text. Full chip = score · category · hops;
   mini chip = score only, for far flags and when the full slots are taken. */
const CHIP_H=22,MINI_H=16,SANS='"Gotham", -apple-system, "PingFang SC", "Helvetica Neue", Arial, sans-serif';
function chipBox(ctx,L,S,mini){const sc='+'+L.fg.pts;ctx.font=(mini?'600 10px ':'600 11px ')+MONO;const w1=ctx.measureText(sc).width;
  if(mini){const w=w1+12,lead=clamp(L.s*0.06,10,30);return {mini,x:clamp(L.sx-w/2,8,S.w-8-w),y:L.sy-lead-MINI_H,w,h:MINI_H,w1,sc};}
  const cat=catName(L.fg.cat),hop=' · '+fmt(L.fg.hop===1?T.hop1:T.hopN,L.fg.hop);
  ctx.font='500 12px '+SANS;const w2=ctx.measureText(cat).width;ctx.font='400 12px '+SANS;const w3=ctx.measureText(hop).width;
  const w=19+w1+7+w2+w3+11,lead=clamp(L.s*0.08,18,44),x=clamp(L.sx-w/2,8,S.w-8-w),y=L.sy-lead-CHIP_H;return {mini,x,y,w,h:CHIP_H,w1,w2,sc,cat,hop};}
function rrect(ctx,x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath();}
function drawChip(ctx,L,b,P){const red=L.fg.fl===2,c=red?P.risk:P.amber,pc=red?P.riskPill:P.amberPill,age=(1-L.fg.lit)*FLAG_LIFE,a=S.still?Math.max(age,1.2):age;
  /* entrance, by age since the scan hit (on the wave's leading edge, ~0.2 s before its peak, so the whole
     entrance plays while the crest and its afterglow are still on the dot): the stem grows up from the dot
     (0.2–0.42 s), a bead forms at its tip (~0.32 s) and stretches sideways into the pill (0.36–0.62 s), then the
     text fades in (0.5–0.72 s); the chip settles up 6px meanwhile. The exit runs backwards: text out from 2.9 s, pill back to a bead by 3.3 s,
     stem gone by 3.6 s. The still frame shows it fully open. */
  const stem=ease(win(a,0.2,0.22))*(1-ease(win(a,3.3,0.3))),bead=sm(win(a,0.32,0.1))*(1-sm(win(a,3.3,0.12))),
    open=ease(win(a,0.36,0.26))*(1-sm(win(a,3.0,0.3))),txt=sm(win(a,0.5,0.22))*(1-sm(win(a,2.9,0.2)));
  if(stem<0.005&&bead<0.005)return;
  const h=b.h,y=b.y+6*(1-ease(win(a,0.2,0.52))),cy=y+h/2,ty=cy+0.5,y0=L.sy-L.ds-3;
  ctx.save();
  /* stem: brightest at its tip, fading out toward the dot, so there is no hard line */
  const yt=lerp(y0,y+h,stem);if(y0-yt>1){const gr=ctx.createLinearGradient(0,y0,0,yt);gr.addColorStop(0,col(c,0));gr.addColorStop(1,col(c,0.35));
    ctx.strokeStyle=gr;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(L.sx,y0);ctx.lineTo(L.sx,yt);ctx.stroke();}
  if(bead<0.005){ctx.restore();return;}
  /* bead → pill: the span opens from the stem out to the final box; shadow only once it is mostly open */
  const r0=h/2*(0.35+0.65*bead),bx=clamp(L.sx,b.x+h/2,b.x+b.w-h/2),xl=lerp(bx-r0,b.x,open),xr=lerp(bx+r0,b.x+b.w,open),sh=sm(win(open,0.7,0.3));
  ctx.globalAlpha=bead;if(sh>0.01){ctx.shadowColor=col(pc,0.3*sh);ctx.shadowBlur=b.mini?8:14;ctx.shadowOffsetY=b.mini?2:4;}
  rrect(ctx,xl,cy-r0,xr-xl,2*r0,r0);ctx.fillStyle=col(pc,1);ctx.fill();ctx.shadowColor='transparent';
  if(txt<0.01){ctx.restore();return;}
  /* text is clipped to the pill as it opens or closes */
  ctx.clip();ctx.globalAlpha=txt;ctx.textAlign='left';ctx.textBaseline='middle';ctx.fillStyle='#fff';
  if(b.mini){ctx.font='600 10px '+MONO;ctx.fillText(b.sc,b.x+6,ty);ctx.restore();return;}
  ctx.fillStyle='rgba(255,255,255,.9)';ctx.beginPath();ctx.arc(b.x+11,cy,2.5,0,TAU);ctx.fill();
  let x=b.x+19;ctx.fillStyle='#fff';ctx.font='600 11px '+MONO;ctx.fillText(b.sc,x,ty);x+=b.w1+7;
  ctx.font='500 12px '+SANS;ctx.fillText(b.cat,x,ty);x+=b.w2;
  ctx.fillStyle='rgba(255,255,255,.74)';ctx.font='400 12px '+SANS;ctx.fillText(b.hop,x,ty);ctx.restore();}

/* F · Ledger Field — same renderer as the concept board */
const ledger={
  init(S){const f=S.focus;this.hy=S.h*(S.narrow?0.16:0.2);this.vx=f.x+f.w*0.5;
    this.cols=S.narrow?72:Math.round(clamp(128*S.w/1208,128,190));this.rows=S.narrow?34:44;this.z0=2.2;this.dz=0.25;this.zf=this.z0+this.rows*this.dz;
    this.F=(S.h*1.05-this.hy)*this.z0;this.half=(S.w*0.62)*this.zf/this.F;this.oj=4;this.oZ=this.z0+this.oj*this.dz;
    /* flagged transfers. pts = score impact shown on the chip: a base per category, less for each hop further
       out. Scaled (2026-11-22) so a random sanctions flag at 2 hops is +30, in line with the home example.
       Category keys stay in English here; catName() turns them into the page language when drawn. */
    this.flags=new Map();const c2=['Sanctions','Ransomware','Stolen funds','Darknet market'],c3=['Mixer','Gambling','High-risk exchange'];
    const BASE={'Sanctions':30,'Ransomware':26,'Stolen funds':22,'Darknet market':21,'Mixer':9,'Gambling':6,'High-risk exchange':8};
    const nf=Math.round(10*this.cols/128);
    for(let k=0;k<nf;k++){const i=(Math.random()*this.cols)|0,j=12+((Math.random()*(this.rows-15))|0),fl=Math.random()<0.5?2:3,cat=pick(fl===2?c2:c3),hop=1+((Math.random()*5)|0);
      this.flags.set(j*this.cols+i,{fl,lit:0,hot:false,chip:false,cat,hop,pts:Math.round(BASE[cat]*(1.25-0.125*hop))});}
    this.period=7;this.pulseN=0;this.prevPh=0;this.maxD=Math.hypot(this.half,this.zf-this.oZ)*0.85;this.litN=0;this.lift=0.09;this.r=0;this.amp=0;this.rip=[];
    /* two fixed flags so the still frame always shows the story: the same example as the console demo below
       (score 36, Review): sanctions at 2 hops = +30 and mixer at 1 hop = +6 (Eunice chose it 2026-11-22; it
       replaced width.info's +64 / +18 example). They sit a little behind the address (rows 13 and 16, xf = fraction of
       the half-width on screen), not in the front rows. putAt returns when the scan peak reaches the flag (the
       trigger); the still frame is caught 0.9 s after the later one, chips open and sonar mid-spread. */
    const fixed=[],putAt=(j,xf,fl,cat,hop,pts)=>{const z=this.z0+j*this.dz,X0=xf*(S.w/2)*z/this.F,i=Math.round((X0+this.half)/(2*this.half)*(this.cols-1)),X=lerp(-this.half,this.half,i/(this.cols-1));
      fixed.push([X,z]);this.flags.set(j*this.cols+i,{fl,lit:0,hot:false,chip:false,pri:true,cat,hop,pts});return Math.hypot(X,z-this.oZ)*this.period/this.maxD;};
    this.tStill=Math.max(putAt(16,-0.42,2,'Sanctions',2,30),putAt(13,0.5,3,'Mixer',1,6))+0.9;
    /* keep random flags clear of the two fixed ones so their sonar and chips have room */
    for(const [key,fg] of this.flags){if(fg.pri)continue;const X=lerp(-this.half,this.half,(key%this.cols)/(this.cols-1)),z=this.z0+((key/this.cols)|0)*this.dz;
      if(fixed.some(f=>Math.hypot(X-f[0],z-f[1])<1.6))this.flags.delete(key);}},
  frame(ctx,S,dt,t){
    const P=S.pal,cols=this.cols,rows=this.rows,ph=(t%this.period)/this.period;if(ph<this.prevPh)this.pulseN++;this.prevPh=ph;
    /* scan ring radius r (ledger units); amp fades it out over the last 14% so the next pulse starts clean */
    const r=ph*this.maxD,amp=(1-ph*0.55)*clamp((1-ph)/0.14,0,1),lift=this.lift;this.r=r;this.amp=amp;
    /* depth: dot size follows q = s / s(front row) on a curve a little steeper than linear (q^1.13): ~13px in the front row, ~8.5px at the address,
       ~1.7px in the last row. The biggest, nearest dots are a touch lighter so the front doesn't weigh */
    /* sonar rings from flags hit in the last RIP_END s (state from the previous frame), newest ring first */
    const rip=this.rip;rip.length=0;
    for(const [key,fg] of this.flags){if(fg.lit<=0)continue;const age=(1-fg.lit)*FLAG_LIFE;if(age>=RIP_END)continue;
      const fi=key%cols,fj=(key/cols)|0,fx=lerp(-this.half,this.half,fi/(cols-1)),fz=this.z0+fj*this.dz,c=fg.fl===2?P.risk:P.amber;
      for(let n=0;n<3;n++){const k=(age-RIP_DELAY-n*RIP_GAP)/RIP_T;if(k<=0||k>=1)continue;rip.push({x:fx,z:fz,r:RIP_R*(1-Math.pow(1-k,3)),a:Math.pow(1-k,1.4)*(1-n*0.22),c});}}
    rip.sort((a,b)=>b.a-a.a);
    const sF=this.F/this.z0,lit=[];
    for(let j=rows-1;j>=0;j--){const z=this.z0+j*this.dz,s=this.F/z,q=s/sF,fog=clamp(1.12-0.94*j/rows,0.16,1)*(1-0.15*clamp((q-0.6)/0.4,0,1)),base=Math.max(0.7,6.8*Math.pow(q,1.13)),bloom=clamp(s/300,0.2,1),gz=clamp(z/5,0.44,1),cw=0.9*gz*gz,ww=2.2*gz;
      for(let i=0;i<cols;i++){const X=lerp(-this.half,this.half,i/(cols-1)),sx=this.vx+X*s;if(sx<-16||sx>S.w+16)continue;
        /* e: distance past the scan front. crest = on the front, wake = already scanned, fading back to grey */
        const d=Math.hypot(X,z-this.oZ),e=d-r,crest=Math.exp(-(e*e)/cw)*amp,wake=e<0?Math.exp(e/ww)*amp*0.35:0;
        const Y=0.05*Math.sin(i*0.21+t*0.9)*Math.cos(j*0.33+t*0.6)+crest*lift*gz,sy=this.hy+(1-Y)*s;if(sy>S.h+16)continue;
        const fg=this.flags.get(j*cols+i);
        /* a flag fires once per pulse, when the wave's leading edge reaches it (e<=0.35, ~0.2 s before the peak, so it turns red under the crest, not after it) while the pulse is live; it re-arms
           only when the next pulse restarts from the address (e>0.6). The chip slot is freed at age 3.68 s,
           after its exit (3.6 s). */
        if(fg){if(e<=0.35&&amp>0.25&&!fg.hot){fg.hot=true;fg.lit=1;}else if(e>0.6)fg.hot=false;fg.lit=Math.max(0,fg.lit-dt/FLAG_LIFE);if(fg.lit<=0.08)fg.chip=false;if(fg.lit>0){lit.push({fg,sx,sy,s,z,base});continue;}}
        const k=Math.min(0.85,Math.max(crest*1.05,wake));
        /* sonar: the strongest ring passing this dot warms it toward the flag colour */
        let kr=0,rc=null;for(let m=0;m<rip.length;m++){const g=rip[m],ex=X-g.x,ez=z-g.z;if(ex>RIP_R+0.4||ex<-RIP_R-0.4||ez>RIP_R+0.4||ez<-RIP_R-0.4)continue;
          const f=Math.sqrt(ex*ex+ez*ez)-g.r,w=Math.exp(-(f*f)/0.02)*g.a;if(w>kr){kr=w;rc=g.c;}}
        kr*=0.6*(1-0.6*crest);
        if(crest>0.1)pt(sx,sy,Math.min(base*4.2,30),P.glow,0.2*crest*bloom,1);
        if(kr>0.1)pt(sx,sy,Math.min(base*3.6,26),rc,0.16*kr*bloom,1);
        let dc=k>0.01?blend(P.dim,P.accent,k):P.dim;if(kr>0.01)dc=blend(dc,rc,clamp((kr-0.02)/0.25,0,0.92));
        pt(sx,sy,base*(1+0.55*crest+0.3*kr),dc,fog*(0.62+0.38*Math.max(k,kr)));}}
    /* flagged transfer: looks like any other dot until the scan peak reaches it. Then, by age (s since the hit):
       catch 0–0.35 = a bright blue scanned dot under a strong blue bloom, while a lock-on ring (same aspect as the
       address ring) contracts onto it; turn 0.12–0.42 = core blue → red/amber, its halo growing in with a gentle
       swell (peak ~0.4 s, core ~1.35× then settling to ~1.15×); sonar from 0.2 s; hold; back to grey 2.8–4.0.
       The still frame shows the settled state (no catch, no ring). */
    lit.forEach(L=>{const c=L.fg.fl===2?P.risk:P.amber,age=(1-L.fg.lit)*FLAG_LIFE,a=S.still?Math.max(age,1.2):age,
        cb=1-sm(win(a,0.05,0.3)),tn=sm(win(a,0.12,0.3)),back=sm(win(a,2.8,1.2)),sw=Math.exp(-((a-0.4)*(a-0.4))/0.035);
      L.ds=Math.max(3,L.base*(1+0.15*(1-back)+0.2*sw+0.15*cb*(1-tn)));
      if(cb>0.01)pt(L.sx,L.sy,Math.min(L.base*5.2,40),P.glow,0.4*cb*clamp(L.s/300,0.3,1),1);
      if(tn>0.01)pt(L.sx,L.sy,L.ds*4.5*(0.55+0.45*ease(tn)),c,(0.12+0.12*sw)*tn*(1-back),1);
      pt(L.sx,L.sy,L.ds,back>0?blend(c,P.dim,back):blend(P.accent,c,tn),0.6+0.32*(1-back));
      /* lock-on ring: eases in from 2.4× to its final size over the catch, accent → flag colour 0.15–0.35 s, out by 0.75 s */
      if(!S.still&&a<0.8){const rf=Math.max(7,Math.max(3,L.base*1.15)*1.1),rx=rf*lerp(2.4,1,ease(win(a,0,0.3))),ra=win(a,0,0.06)*(1-sm(win(a,0.4,0.35)));
        if(ra>0.01){ctx.strokeStyle=col(blend(P.accent,c,sm(win(a,0.15,0.2))),0.7*ra);ctx.lineWidth=1.25;ctx.beginPath();ctx.ellipse(L.sx,L.sy,rx,rx*0.36,0,0,TAU);ctx.stroke();}}});
    /* chips: a flag keeps its chip (full or mini) until it fades, and new ones only take a free slot, so chips
       never jump between flags. Full chips (2; 1 on phones, red flags only) go to near flags; far flags and
       the overflow get a mini score-only chip (2; 1 on phones). During the still warm-up only the two fixed
       flags may take full chips. */
    const ax=this.vx,ay=this.hy+this.F/this.oZ,maxFull=S.narrow?1:2,maxMini=S.narrow?1:2,boxes=[[ax-48,ay-12,96,48]];
    const kept=lit.filter(L=>L.fg.chip),fresh=lit.filter(L=>!L.fg.chip&&L.fg.lit>0.6).sort((a,b)=>b.fg.lit-a.fg.lit);
    let nF=0,nM=0;
    for(const L of kept.concat(fresh)){const fg=L.fg;let kind=fg.chip;
      if(!kind){const canFull=L.s>sF*0.25&&(!S.narrow||fg.fl===2)&&(!S.stillRun||fg.pri);kind=canFull&&nF<maxFull?'full':nM<maxMini?'mini':null;if(!kind)continue;}
      else if(kind==='full'?nF>=maxFull:nM>=maxMini){fg.chip=false;continue;}
      const b=chipBox(ctx,L,S,kind==='mini');
      if(!fg.chip&&(b.y<S.h*0.18||boxes.some(o=>b.x<o[0]+o[2]+16&&o[0]<b.x+b.w+16&&b.y<o[1]+o[3]+16&&o[1]<b.y+b.h+16)))continue;
      boxes.push([b.x,b.y,b.w,b.h]);fg.chip=kind;if(kind==='full')nF++;else nM++;drawChip(ctx,L,b,P);}
    /* the screened address: the scan's source, with a blue bloom that flares as each pulse leaves it */
    const flare=Math.max(0,1-ph*4);
    pt(ax,ay,40+26*flare,P.glow,0.16+0.2*flare,1);pt(ax,ay,9.5,P.fg,1);
    ctx.strokeStyle=col(P.accent,0.6);ctx.lineWidth=1.25;ctx.beginPath();ctx.ellipse(ax,ay,18,6.5,0,0,TAU);ctx.stroke();
    ctx.font="500 11px "+MONO;ctx.textAlign="center";ctx.lineJoin="round";ctx.lineWidth=3;ctx.strokeStyle="rgba(255,255,255,.9)";ctx.strokeText("0x8a…c21e",ax,ay+26);ctx.fillStyle=col(P.fg,0.8);ctx.fillText("0x8a…c21e",ax,ay+26);this.litN=lit.length;
  },
  hud(){return fmt(T.pulse,this.pulseN+1)+' · '+fmt(this.litN===1?T.flagged1:T.flaggedN,this.litN);}
};

let t=0,last=0,hudT=0,visible=true;
function draw(dt){PB.n=0;ctx.clearRect(0,0,S.w,S.h);t+=dt;ledger.frame(ctx,S,dt,t);flush();}
function setHud(){if(hudEl)hudEl.textContent=T.sim+' · '+ledger.hud();}
/* Motion respects the system "Reduce motion" setting (still frame). The Play/Pause button is gone from the
   template, so a choice saved earlier in this browser is ignored; if a button is ever put back, it works again
   and its choice is remembered. */
let playing=!reduce;if(btn)try{const v=localStorage.getItem('ledger-hero-motion');if(v==='on')playing=true;else if(v==='off')playing=false;}catch(e){}
const syncBtn=()=>{if(!btn)return;btn.textContent=playing?T.pause:T.play;btn.setAttribute('aria-pressed',String(playing));};
if(btn)btn.addEventListener('click',()=>{playing=!playing;last=0;try{localStorage.setItem('ledger-hero-motion',playing?'on':'off');}catch(e){}syncBtn();});
function loop(now){requestAnimationFrame(loop);if(!playing||!visible||document.hidden){last=now;return;}const dt=Math.min(0.05,last?(now-last)/1000:1/60);last=now;draw(dt);hudT+=dt;if(hudT>0.25){hudT=0;setHud();}}
/* still frame: the scan caught just after it reaches the two fixed flags (ledger.tStill), mid-sonar; during
   the warm-up only those two may take chips */
function still(){t=0;ledger.prevPh=0;S.stillRun=true;const n=Math.round(ledger.tStill*60);for(let i=0;i<n;i++){S.still=i===n-1;draw(1/60);}S.still=false;S.stillRun=false;setHud();}
layout();ledger.init(S);syncBtn();
if(playing){draw(1/60);setHud();}else still();
/* the chips are drawn with Gotham; if it was still loading when the still frame was drawn, draw it again */
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>{if(!playing){ledger.init(S);still();}});
requestAnimationFrame(loop);
let rt=0;if('ResizeObserver' in window)new ResizeObserver(()=>{clearTimeout(rt);rt=setTimeout(()=>{layout();ledger.init(S);if(!playing)still();},140);}).observe(field);
if('IntersectionObserver' in window)new IntersectionObserver(e=>{visible=e[0].isIntersecting;},{threshold:0.01}).observe(field);
})();
