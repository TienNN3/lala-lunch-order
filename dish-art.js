/* Ảnh minh hoạ món ăn (SVG, nhìn từ trên xuống) — vẽ theo nguyên liệu từng món.
   Muốn dùng ảnh thật: thả file images/dishes/<slug>.jpg (xem PROMPTS.md), web ưu tiên ảnh thật nếu có. */
(function(){
const hash=s=>{let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619)}return h>>>0};
const mk=seed=>{let a=seed||1;return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}};
const f=n=>+n.toFixed(1);

/* ---------- nền món (lấp đầy lòng tô) ---------- */
const BASES={
 rice:(R,r,c)=>{let s=`<circle r="${R}" fill="${c[0]}"/>`;for(let i=0;i<160;i++){const a=r()*6.283,d=Math.sqrt(r())*(R-4);s+=`<ellipse cx="${f(Math.cos(a)*d)}" cy="${f(Math.sin(a)*d)}" rx="4.2" ry="2" transform="rotate(${f(r()*180)} ${f(Math.cos(a)*d)} ${f(Math.sin(a)*d)})" fill="${c[1+(r()>.5?1:0)]}"/>`}return s},
 noodle:(R,r,c)=>{let s=`<circle r="${R}" fill="${c[0]}"/>`;for(let i=0;i<20;i++){const a=r()*6.28,d=r()*(R-20),x=Math.cos(a)*d,y=Math.sin(a)*d,l=26+r()*26,k=(r()-.5)*40;s+=`<path d="M${f(x-l)} ${f(y)} q${f(l/2)} ${f(-k-8)} ${f(l)} 0 t${f(l)} 0" fill="none" stroke="${c[1+(i%2)]}" stroke-width="${c[3]||3.2}" stroke-linecap="round" transform="rotate(${f(r()*180)} ${f(x)} ${f(y)})"/>`}return s},
 soup:(R,r,c)=>{let s=`<circle r="${R}" fill="${c[0]}"/><circle r="${R-10}" fill="none" stroke="${c[1]}" stroke-width="2" opacity=".6"/>`;for(let i=0;i<22;i++){const a=r()*6.28,d=r()*(R-10);s+=`<circle cx="${f(Math.cos(a)*d)}" cy="${f(Math.sin(a)*d)}" r="${f(2+r()*3)}" fill="${c[2]}" opacity=".55"/>`}return s},
 greens:(R,r,c)=>{let s=`<circle r="${R}" fill="${c[0]}"/>`;for(let i=0;i<46;i++){const a=r()*6.28,d=Math.sqrt(r())*(R-12),x=Math.cos(a)*d,y=Math.sin(a)*d;s+=`<path d="M0 0 q10 -16 24 -4 q-8 16 -24 4z" transform="translate(${f(x)} ${f(y)}) rotate(${f(r()*360)})" fill="${c[1+(i%3)]}" opacity=".95"/>`}return s}
};
/* ---------- topping ---------- */
const T={
 egg:(r)=>`<ellipse rx="19" ry="14" fill="#fffdf6" stroke="#e9dcc0"/><circle r="7.5" fill="#f4b41a"/>`,
 quail:()=>`<ellipse rx="10" ry="8" fill="#fffdf6" stroke="#e5d8bb"/><circle r="4" fill="#f4b41a"/><circle cx="-5" cy="-4" r="1.3" fill="#9b7a4a"/>`,
 mushroom:()=>`<path d="M-17 2 a17 15 0 0 1 34 0z" fill="#b98657" stroke="#8a5d36"/><rect x="-5" y="2" width="10" height="13" rx="4" fill="#f1e6d2" stroke="#d6c4a2"/><circle cx="-6" cy="-5" r="2" fill="#e2bd93"/>`,
 enoki:()=>`${[-8,-3,2,7].map(x=>`<path d="M${x} 14 v-22" stroke="#f5efdf" stroke-width="2.4" stroke-linecap="round"/><circle cx="${x}" cy="-9" r="3" fill="#fbf7ea"/>`).join('')}`,
 tofu:()=>`<rect x="-13" y="-13" width="26" height="26" rx="5" fill="#f8e7b4" stroke="#dcc27a"/><rect x="-9" y="-9" width="18" height="18" rx="3" fill="#fbf0cc"/>`,
 beanskin:()=>`<path d="M-22 -4 q8 -14 16 -2 t16 0 t12 -2 M-20 8 q8 -12 16 -2 t16 0 t10 -2" fill="none" stroke="#d9a441" stroke-width="7" stroke-linecap="round"/>`,
 bean:()=>`${[[-12,-4,20],[0,8,-30],[10,-6,60]].map(([x,y,a])=>`<rect x="${x-9}" y="${y-3.5}" width="18" height="7" rx="3.5" fill="#6fb544" transform="rotate(${a} ${x} ${y})"/>`).join('')}`,
 chili:()=>`<path d="M-14 4 q14 -22 28 -4" fill="none" stroke="#d92d20" stroke-width="5" stroke-linecap="round"/><circle cx="-14" cy="4" r="2.4" fill="#4a8a2a"/>`,
 chilislice:()=>`${[[-9,0],[2,-7],[9,5],[-2,8]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="3.6" fill="#e5392b"/><circle cx="${x}" cy="${y}" r="1.4" fill="#ffd0c8"/>`).join('')}`,
 beef:()=>`${[[-12,-6,-15],[8,-8,10],[-2,8,-5]].map(([x,y,a])=>`<ellipse cx="${x}" cy="${y}" rx="15" ry="8" fill="#7a3f27" stroke="#4e2616" transform="rotate(${a} ${x} ${y})"/><ellipse cx="${x}" cy="${y}" rx="9" ry="3.5" fill="#a15a3a" transform="rotate(${a} ${x} ${y})"/>`).join('')}`,
 pork:()=>`${[[-12,-6,-15],[8,-8,10],[-2,8,-5]].map(([x,y,a])=>`<ellipse cx="${x}" cy="${y}" rx="15" ry="8" fill="#b9714a" stroke="#8c4c2d" transform="rotate(${a} ${x} ${y})"/><ellipse cx="${x}" cy="${y}" rx="9" ry="3.5" fill="#e0a77d" transform="rotate(${a} ${x} ${y})"/>`).join('')}`,
 chicken:()=>`${[[-10,-6,-20],[10,2,15]].map(([x,y,a])=>`<ellipse cx="${x}" cy="${y}" rx="22" ry="11" fill="#d9944a" stroke="#a8641f" transform="rotate(${a} ${x} ${y})"/><path d="M${x-14} ${y-4} l8 8 M${x-4} ${y-6} l8 8 M${x+6} ${y-7} l8 8" stroke="#8a4d12" stroke-width="2" stroke-linecap="round" transform="rotate(${a} ${x} ${y})"/>`).join('')}`,
 teriyaki:()=>`${[[-10,-6,-20],[10,2,15]].map(([x,y,a])=>`<ellipse cx="${x}" cy="${y}" rx="22" ry="11" fill="#7b3f1a" stroke="#4b230c" transform="rotate(${a} ${x} ${y})"/><ellipse cx="${x}" cy="${y-2}" rx="14" ry="4" fill="#b8692f" transform="rotate(${a} ${x} ${y})"/>`).join('')}<circle cx="-6" cy="-8" r="1.2" fill="#fff"/><circle cx="4" cy="-3" r="1.2" fill="#fff"/><circle cx="12" cy="3" r="1.2" fill="#fff"/><circle cx="-14" cy="3" r="1.2" fill="#fff"/>`,
 thigh:()=>`<path d="M-24 4 q2 -22 26 -18 q22 6 16 24 q-14 14 -36 4z" fill="#d6893a" stroke="#9b5617" stroke-width="2"/><path d="M-12 2 q10 -12 24 -6" fill="none" stroke="#f3b86b" stroke-width="4" stroke-linecap="round"/>`,
 tempeh:()=>`${[[-12,-8],[8,-10],[-6,8],[12,6]].map(([x,y])=>`<rect x="${x-9}" y="${y-8}" width="18" height="16" rx="3" fill="#c79d5b" stroke="#8d6a34"/>${[[-4,-2],[3,3],[2,-4]].map(([a,b])=>`<circle cx="${x+a}" cy="${y+b}" r="1.6" fill="#f4e4bd"/>`).join('')}`).join('')}`,
 tomato:()=>`${[[-10,-4],[10,4]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="10" fill="#e8402e" stroke="#b3281a"/><circle cx="${x-3}" cy="${y-3}" r="3" fill="#ff8f7d" opacity=".7"/>`).join('')}`,
 cucumber:()=>`${[[-12,-6],[2,6],[14,-6]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="9" fill="#7ec850" stroke="#4c9a2a"/><circle cx="${x}" cy="${y}" r="6" fill="#d8f0b0"/>`).join('')}`,
 corn:()=>`${Array.from({length:9},(_,i)=>`<circle cx="${(i%3)*8-8}" cy="${Math.floor(i/3)*8-8}" r="3.6" fill="#f6c518"/>`).join('')}`,
 tuna:()=>`${[[-12,-4],[6,-8],[0,8],[14,4]].map(([x,y])=>`<path d="M${x-9} ${y} q4 -10 12 -6 q8 4 4 12 q-10 6 -16 -6z" fill="#c9b8a6" stroke="#9d8a76"/>`).join('')}`,
 carrot:()=>`${[[-12,-4],[0,8],[12,-2],[2,-12]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="6" fill="#f08a24"/><circle cx="${x}" cy="${y}" r="2.4" fill="#f9b865"/>`).join('')}`,
 peas:()=>`${[[-8,-6],[4,-8],[10,2],[-2,6],[-12,4]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="4.4" fill="#78c043" stroke="#4f8f2a"/>`).join('')}`,
 peanut:()=>`${[[-10,-4],[2,-8],[10,2],[-4,6],[12,-8]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="4.5" ry="3.3" fill="#d3a15d" stroke="#a87a35"/>`).join('')}`,
 herb:()=>`${[[-12,0,-30],[0,-4,20],[10,6,70]].map(([x,y,a])=>`<path d="M0 0 q9 -16 22 -4 q-8 16 -22 4z" transform="translate(${x} ${y}) rotate(${a})" fill="#3f9b3a" stroke="#2c7229"/>`).join('')}`,
 scallion:()=>`${[[-12,-4],[0,6],[10,-6],[4,-10],[-6,8]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="3.6" fill="none" stroke="#4aa83a" stroke-width="2.2"/>`).join('')}`,
 broccoli:()=>`${[[-8,-4],[8,4]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="9" fill="#3b8f3a"/><circle cx="${x-4}" cy="${y-3}" r="5" fill="#52ad4c"/><circle cx="${x+4}" cy="${y+2}" r="5" fill="#46a043"/>`).join('')}`,
 sweetpotato:()=>`${[[-14,-6,10],[4,-10,-15],[-2,8,25],[16,4,0]].map(([x,y,a])=>`<rect x="${x-10}" y="${y-8}" width="20" height="16" rx="5" fill="#e0782c" stroke="#a9501a" transform="rotate(${a} ${x} ${y})"/><rect x="${x-6}" y="${y-4}" width="12" height="8" rx="3" fill="#f6a65a" transform="rotate(${a} ${x} ${y})"/>`).join('')}`,
 fish:()=>`<path d="M-34 0 q18 -22 44 -12 l14 -6 v36 l-14 -6 q-26 10 -44 -12z" fill="#d7a266" stroke="#9a6224" stroke-width="2"/><path d="M-18 -8 l8 14 M-6 -10 l8 16 M6 -10 l8 14" stroke="#8a4f17" stroke-width="2.4" stroke-linecap="round"/><circle cx="-26" cy="-2" r="2" fill="#2a1a0c"/><path d="M-4 -6 q10 8 22 2" fill="none" stroke="#c62d1b" stroke-width="4" stroke-linecap="round" opacity=".8"/>`,
 sate:()=>`<path d="M-16 4 q16 -14 32 0 q-16 10 -32 0z" fill="#c4361e" opacity=".9"/><circle cx="-4" cy="2" r="2" fill="#7a1a0c"/><circle cx="6" cy="3" r="2" fill="#7a1a0c"/>`,
 sauce:()=>`<path d="M-20 4 q6 -16 20 -10 q16 -2 20 10 q-12 12 -40 0z" fill="#fff3d6" stroke="#ecd9a8"/>`,
 thaisauce:()=>`<path d="M-20 4 q6 -16 20 -10 q16 -2 20 10 q-12 12 -40 0z" fill="#d14a1f" opacity=".85"/><circle cx="-6" cy="0" r="2.4" fill="#ffd34d"/><circle cx="8" cy="2" r="2.4" fill="#ffd34d"/>`,
 sesame:()=>`${Array.from({length:10},(_,i)=>`<ellipse cx="${(i*7)%26-13}" cy="${(i*11)%20-10}" rx="2" ry="1.2" fill="#fbf3dd" transform="rotate(${i*40} 0 0)"/>`).join('')}`,
 fishcake:()=>`${[[-12,-4,-10],[10,4,15]].map(([x,y,a])=>`<ellipse cx="${x}" cy="${y}" rx="20" ry="9" fill="#a8602d" stroke="#6f3a14" transform="rotate(${a} ${x} ${y})"/><ellipse cx="${x}" cy="${y-1}" rx="12" ry="4" fill="#cf8a50" transform="rotate(${a} ${x} ${y})"/>`).join('')}`,
 lime:()=>`<circle r="9" fill="#9bd23c" stroke="#5f9b1a"/><path d="M0 0 L0 -7 M0 0 L6 -3 M0 0 L6 4 M0 0 L0 7 M0 0 L-6 4 M0 0 L-6 -3" stroke="#d9f0a0" stroke-width="2"/>`,
 rolled:()=>`${[[-14,-6],[2,-8],[14,4],[-2,8]].map(([x,y])=>`<rect x="${x-12}" y="${y-6}" width="24" height="12" rx="6" fill="#f2e3b8" stroke="#d0b878"/><path d="M${x-8} ${y-2} q8 4 16 0" stroke="#7bbf4a" stroke-width="3" fill="none"/>`).join('')}`,
 banhhoi:()=>`${[[-16,-8],[8,-10],[-6,10],[16,6]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="10" fill="#fdfbf4" stroke="#e6dfcb"/><path d="M${x-7} ${y-3} h14 M${x-8} ${y+1} h16 M${x-6} ${y+5} h12" stroke="#e4dcc6" stroke-width="1.4"/>`).join('')}`,
 yolkegg:()=>`<ellipse rx="22" ry="16" fill="#fff8e6" stroke="#f0dfae"/><path d="M-12 -4 q12 -10 24 0" fill="none" stroke="#f3c75a" stroke-width="4" stroke-linecap="round"/>`
};
/* ---------- đặc tả từng món (khớp theo tên) ---------- */
const BR=['#b98a55','#9a6a38','#d3a56d'],WR=['#fbf8ef','#efe7d2','#ffffff'];
const SPEC=[
 [/nui/,{b:'noodle',c:['#fbe3a3','#f2c35c','#f7d684',5],t:['carrot','peas','tomato','broccoli','corn'],bg:'v'}],
 [/phù trúc/,{b:'rice',c:BR,t:['beanskin','bean','chilislice','herb'],bg:'v'}],
 [/miến.*bò/,{b:'noodle',c:['#e9eef0','#cfd9dd','#f7fafb',2.4],t:['beef','scallion','chilislice','herb'],bg:'m'}],
 [/chả rim/,{b:'rice',c:BR,t:['fishcake','quail','cucumber','herb'],bg:'m'}],
 [/nấm đậu xào/,{b:'rice',c:BR,t:['mushroom','bean','enoki','chilislice'],bg:'v'}],
 [/bánh canh nấm/,{b:'soup',c:['#f1dfa8','#e0c47a','#fbf1cf'],t:['mushroom','enoki','carrot','scallion','tofu'],bg:'v'}],
 [/ghim nước dừa/,{b:'rice',c:BR,t:['pork','egg','scallion','cucumber'],bg:'m'}],
 [/khoai ngọt/,{b:'greens',c:['#e9f3d6','#5fae4a','#7cc35a','#3f9b3a'],t:['sweetpotato','thigh','tomato','herb'],bg:'m'}],
 [/mì quảng/,{b:'noodle',c:['#fbdf7a','#f0c23a','#f7d25a',6],t:['peanut','herb','tofu','tomato','lime'],bg:'v'}],
 [/tempeh/,{b:'rice',c:BR,t:['tempeh','broccoli','chilislice','cucumber'],bg:'v'}],
 [/cá ngừ/,{b:'greens',c:['#eaf5dc','#4fa43d','#7ec65a','#2f8a35'],t:['tuna','tomato','cucumber','corn','yolkegg'],bg:'m'}],
 [/heo xào/,{b:'rice',c:BR,t:['pork','chili','scallion','cucumber'],bg:'m'}],
 [/dương châu/,{b:'rice',c:['#f6df8c','#e9c04a','#fbefb8'],t:['carrot','peas','corn','egg','scallion'],bg:'v'}],
 [/bánh hỏi/,{b:'greens',c:['#fbf7ea','#fffdf5','#f1ead6','#e5dcc2'],t:['banhhoi','mushroom','scallion','chilislice'],bg:'v'}],
 [/sapa/,{b:'rice',c:['#d9e6a8','#bcd37a','#eef5cf'],t:['fish','sate','cucumber','tomato'],bg:'m'}],
 [/mì ý/,{b:'noodle',c:['#fdeed2','#f4d89a','#f9e3b5',3.4],t:['sauce','chicken','mushroom','herb'],bg:'m'}],
 [/bẩu|bầu/,{b:'greens',c:['#eaf5dc','#5db14a','#86cb62','#3b9a3d'],t:['rolled','tofu','carrot','peanut','chilislice'],bg:'v'}],
 [/gỏi nấm/,{b:'rice',c:BR,t:['enoki','mushroom','carrot','herb','cucumber'],bg:'v'}],
 [/teriyaki/,{b:'noodle',c:['#efe3cf','#d5bf9c','#e5d3b6',3.6],t:['teriyaki','broccoli','sesame','carrot'],bg:'m'}],
 [/sốt thái/,{b:'rice',c:BR,t:['pork','thaisauce','cucumber','lime'],bg:'m'}],
 [/./,{b:'greens',c:['#eaf5dc','#4fa43d','#7ec65a','#2f8a35'],t:['tomato','cucumber','carrot'],bg:'v'}]
];
const BG={v:['#e9f7d4','#c7e8a0'],m:['#fde9d2','#f6c99a']};
function art(name){
  const n=(name||'').toLowerCase(),sp=SPEC.find(s=>s[0].test(n))[1],r=mk(hash(n)),R=96;
  const bg=BG[sp.bg];
  let s=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${bg[0]}"/><stop offset="1" stop-color="${bg[1]}"/></linearGradient><radialGradient id="p" cx=".4" cy=".35"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#e9ece8"/></radialGradient></defs><rect width="400" height="300" fill="url(#g)"/>`;
  s+=`<g opacity=".35" fill="#fff"><circle cx="40" cy="40" r="26"/><circle cx="360" cy="262" r="34"/><circle cx="352" cy="52" r="12"/></g>`;
  s+=`<ellipse cx="206" cy="166" rx="132" ry="124" fill="#000" opacity=".12"/>`;
  s+=`<g transform="translate(200 150)"><circle r="122" fill="url(#p)" stroke="#d6dbd4" stroke-width="2"/><circle r="104" fill="#f4f6f2" stroke="#dde2da"/>`;
  s+=BASES[sp.b](R,r,sp.c);
  const k=sp.t.length;
  sp.t.forEach((t,i)=>{
    const a=(i/k)*6.283+r()*.5-1.2,d=k===1?0:(i%2?58:48)+r()*8;
    const x=Math.cos(a)*d,y=Math.sin(a)*d,sc=(t==='fish'||t==='thigh'||t==='sauce'||t==='thaisauce')?1:1.12;
    s+=`<g transform="translate(${f(x)} ${f(y)}) rotate(${f(r()*40-20)}) scale(${sc})"><g filter="">${T[t](r)}</g></g>`;
  });
  s+=`</g></svg>`;
  return s;
}
window.dishArt=name=>'data:image/svg+xml,'+encodeURIComponent(art(name));
})();
