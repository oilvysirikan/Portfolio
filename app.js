const canvas=document.getElementById('particles');const ctx=canvas.getContext('2d');
function resize(){canvas.width=innerWidth;canvas.height=innerHeight;}resize();addEventListener('resize',resize);
const parts=[...Array(70)].map(()=>({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:Math.random()*2+0.7,vx:Math.random()-0.5,vy:Math.random()-0.5}));
(function anim(){ctx.clearRect(0,0,canvas.width,canvas.height);parts.forEach(p=>{ctx.beginPath();ctx.fillStyle='rgba(255,255,255,0.06)';ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>canvas.width)p.vx*=-1;if(p.y<0||p.y>canvas.height)p.vy*=-1});requestAnimationFrame(anim);})();
const openBtn=document.getElementById('open-chat');const closeBtn=document.getElementById('close-chat');const chat=document.getElementById('ai-section');
openBtn.onclick=()=>chat.classList.remove('hidden');closeBtn.onclick=()=>chat.classList.add('hidden');
const skill=document.querySelector('.skill');const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.querySelector('.skill-fill').style.width=e.target.querySelector('.skill-fill').dataset.width;}));obs.observe(skill);
const messages=document.getElementById('messages');const form=document.getElementById('chat-form');const PROXY_URL='https://YOUR-VERCEL-APP.vercel.app/api/openai';
function addMsg(role,t){const d=document.createElement('div');d.textContent=(role==='user'?'You: ':'AI: ')+t;messages.appendChild(d);messages.scrollTop=messages.scrollHeight;}
form.onsubmit=async e=>{e.preventDefault();const input=document.getElementById('prompt');const q=input.value.trim();if(!q)return;addMsg('user',q);input.value='';addMsg('ai','Thinking…');try{const r=await fetch(PROXY_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({prompt:q})});const j=await r.json();messages.lastChild.textContent='AI: '+j.text;}catch(err){messages.lastChild.textContent='AI: '+err.message;}}
