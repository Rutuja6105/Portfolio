import { useState, useEffect, useRef, useCallback } from "react";
import rutujaImg from "./assets/rutuja.jpg"; 

/* ─── Global CSS ─────────────────────────────────────────────────── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  :root{
    --bg:#0b0b1e; --surface:#0f0f28; --card:#13132e; --border:#1e1e40;
    --nav:#080818;
    --accent:#7c6fff; --a2:#ff6b8a; --a3:#3ef0dc;
    --text:#e8e8f8; --muted:#6565a0;
  }
  html{scroll-behavior:smooth}
  body{background:var(--bg);color:var(--text);font-family:'DM Sans',sans-serif;overflow-x:hidden}
  ::-webkit-scrollbar{width:3px}
  ::-webkit-scrollbar-thumb{background:var(--accent);border-radius:2px}

  @keyframes fadeUp   {from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:none}}
  @keyframes fadeIn   {from{opacity:0}to{opacity:1}}
  @keyframes spin     {to{transform:rotate(360deg)}}
  @keyframes twinkle  {0%,100%{opacity:.07}50%{opacity:.9}}
  @keyframes blink    {0%,100%{opacity:1}50%{opacity:.15}}
  @keyframes toastIn  {from{transform:translateX(120%);opacity:0}}
  @keyframes barGrow  {from{width:0%}to{width:var(--w)}}

  @keyframes float    {0%,100%{transform:translateY(0)}50%{transform:translateY(-16px)}}
  @keyframes glowPulse{0%,100%{opacity:.55}50%{opacity:1}}
  @keyframes iconPop  {from{opacity:0;transform:scale(.5) translateY(8px)}to{opacity:1;transform:scale(1) translateY(0)}}
  @keyframes shimmer  {0%{background-position:-300% center}100%{background-position:300% center}}
`;

const uid = () => Date.now() + Math.random();
const G   = "linear-gradient(135deg,var(--accent),var(--a2))";
const G3  = "linear-gradient(135deg,var(--a3),var(--accent))";
const inp = {
  width:"100%",background:"var(--card)",border:"1px solid var(--border)",
  borderRadius:10,padding:"10px 14px",color:"var(--text)",
  fontFamily:"'DM Sans',sans-serif",fontSize:14,outline:"none",
};

/* ─── Default Data ───────────────────────────────────────────────── */
const DEF = {
  name:"Rutuja Jadhav",
  role:"Aspring Software Developer |  QA Engineer",
  bio:"Motivated Web Developer and QA Automation Engineer with hands-on experience in building and testing real-world applications. Successfully automated complete projects using Cypress and worked with Selenium, Python, SQLite, and Git. Strong understanding of testing methodologies, debugging, and delivering production-ready applications. Focused on writing clean code and ensuring software quality.",phone:"+91 7385726593",
  linkedin:"",github:"https://github.com/Rutuja6105",
  skills:[
   
   {id:1, icon:"🌐", name:"HTML5", level:"Intermediate"},
  {id:2, icon:"🟨", name:"JavaScript", level:"Intermediate"},
  {id:3, icon:"🐍", name:"Python", level:"Beginner"},
  {id:4, icon:"🎨", name:"Tailwind CSS", level:"Proficient"},
  {id:5, icon:"💙", name:"jQuery", level:"Beginner"},
  {id:6, icon:"🧪", name:"Cypress", level:"Intermediate"},
  {id:7, icon:"🤖", name:"Selenium (Java)", level:"Intermediate"},
  {id:8, icon:"🗃️", name:"SQLite", level:"Intermediate"},
  {id:9, icon:"📮", name:"Postman", level:"Intermediate"},
  {id:10, icon:"🔀", name:"Git & GitHub", level:"Intermediate"}

  ],
  projects:[
    {id:1,icon:"🚗",title:"Alert system on the curvy road",desc:"Enhance road safety in sharp curve, accident prone areas — gives advance solutions to road safety.",tags:["React","CSS","IoT Sensor model"],github:"https://github.com/Rutuja6105/alert_system",live:""},
    {id:2,icon:"⚖️",title:"BharatLaw",desc:"Your law assistant application which helps users find correct laws and articles relevant to their problem.",tags:["JavaScript","React.js","Node.js"],github:"https://github.com/Rutuja6105/bharat_law",live:""},
    {id:3,icon:"📋",title:"ASHA Worker",desc:"Advanced solution for ASHA workers — converts traditional working methods to online mode. Reduce working load.",tags:["React","Python","SQLite"],github:"https://github.com/Rutuja6105/asha_worker",live:""},
  ],
  education:[
    {id:1,icon:"🎓",degree:"B.Tech",school:"DBATU University From Adarsh Institute of technology and research center, Vita. ",field:"Computer Science and Engineering ",year:"2022 – 2026",gpa:"7.33 / 10",details:"Relevant coursework: Data Structures, Web Development, Machine Learning"},
    {id:2,icon:"📚",degree:"12th Grade",school:"Balwanth College, Vita.",field:"Science Stream",year:"2022",gpa:"58.33%",details:"Strong foundation in Mathematics and Computer Science"},
    {id:3,icon:"📚",degree:"10th Grade",school:"Yashwanthrao Chavan Madhyamik Vidhyalaya, Ghoti BK||.",field:"Marathi Stream",year:"2020",gpa:"85.20%",details:"Strong foundation in Mathematics and Computer Science"},
  ],
  internships:[
    {id:1,icon:"💼",company:"Sowermate Technology Pvt. Lmd., Pune.",role:"QA Engineer Intern",duration:"Jul 2024– Jan 2025",description:"Built React dashboards, REST APIs, and mentored junior developers. Shipped features for 10k+ daily users.",offer:"https://drive.google.com/file/d/15afo-BsusE8-yTCPMSVdY1LXajMIiMVZ/view?usp=sharing",certificate:"https://drive.google.com/file/d/19wNCEL9hrr26yalO1Ty4VNwdezwGTPXk/view?usp=drive_link"},
  ],
  certs:[
    {id:1,title:"UK Utility Design patent",issuer:"UK Geverment",date:"Dec 2024",link:"https://drive.google.com/file/d/1dWn0_YtuP06zwLV8VDInBvXyradz399V/view?usp=sharing"},
    {id:2,title:"DIPEX-2K25 Participant",issuer:"Srijan trust",date:"April 2025",link:"https://drive.google.com/file/d/15zc1vFYE26Wfvdf5SnCRNVyXkwufNqIC/view?usp=drive_link"},
    {id:3,title:"INNOVATION-2K25 Participant",issuer:"COE Phaltan",date:"Oct 2025",link:"https://drive.google.com/file/d/1EgvMXGhKwOoDGNiMIWaC-WRcUq0qc0BH/view?usp=sharing"},
    {id:4,title:"DIPEX-2K25 District Participant",issuer:"Srijan trust",date:" March 2025",link:"https://drive.google.com/file/d/1WET7wXjz29Vbr-452_-8Ljt9iUHkR6EW/view?usp=drive_link"},
  ],
};

/* ─── Stars ─────────────────────────────────────────────────────── */
function Stars(){
  const list = useRef(Array.from({length:70},(_,i)=>({
    id:i, x:Math.random()*100, y:Math.random()*100,
    s:Math.random()*2.2+.4, d:Math.random()*4+2, dl:Math.random()*5,
  })));
  return <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>
    {list.current.map(s=>(
      <div key={s.id} style={{position:"absolute",left:`${s.x}%`,top:`${s.y}%`,
        width:s.s,height:s.s,background:"white",borderRadius:"50%",
        animation:`twinkle ${s.d}s ease-in-out ${s.dl}s infinite`}}/>
    ))}
  </div>;
}

/* ─── Reveal on scroll ───────────────────────────────────────────── */
function Reveal({children,delay=0}){
  const ref=useRef(null);
  const [v,setV]=useState(false);
  useEffect(()=>{
    const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){setV(true);o.disconnect();}},{threshold:.06});
    if(ref.current) o.observe(ref.current);
    return()=>o.disconnect();
  },[]);
  return <div ref={ref} style={{opacity:v?1:0,transform:v?"none":"translateY(30px)",
    transition:`opacity .65s ${delay}s ease,transform .65s ${delay}s ease`}}>{children}</div>;
}

/* ─── Toast ─────────────────────────────────────────────────────── */
function Toast({msg,onDone}){
  useEffect(()=>{const t=setTimeout(onDone,2600);return()=>clearTimeout(t);},[onDone]);
  return <div style={{position:"fixed",bottom:24,right:24,zIndex:9999,background:"var(--card)",
    border:"1px solid var(--accent)",borderRadius:12,padding:"12px 20px",
    fontSize:13,fontWeight:500,boxShadow:"0 8px 28px rgba(0,0,0,.5)",animation:"toastIn .3s ease both"}}>
    {msg}
  </div>;
}

/* ─── Modal ─────────────────────────────────────────────────────── */
function Modal({title,children,onClose}){
  useEffect(()=>{
    const h=e=>{if(e.key==="Escape")onClose();};
    window.addEventListener("keydown",h);return()=>window.removeEventListener("keydown",h);
  },[onClose]);
  return <div onClick={onClose} style={{position:"fixed",inset:0,zIndex:1000,
    background:"rgba(0,0,0,.82)",backdropFilter:"blur(10px)",
    display:"flex",alignItems:"center",justifyContent:"center",padding:16,animation:"fadeIn .2s ease"}}>
    <div onClick={e=>e.stopPropagation()} style={{background:"var(--surface)",
      border:"1px solid var(--border)",borderRadius:20,padding:28,width:"100%",
      maxWidth:460,maxHeight:"90vh",overflowY:"auto",animation:"fadeUp .28s ease both"}}>
      <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:20,marginBottom:18,
        background:G,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{title}</div>
      {children}
    </div>
  </div>;
}

function F({label,children}){return(
  <div style={{marginBottom:12}}>
    <label style={{display:"block",fontSize:11,color:"var(--muted)",marginBottom:5,
      textTransform:"uppercase",letterSpacing:".06em"}}>{label}</label>
    {children}
  </div>
);}

function SecHead({tag,h1,hl,action}){return(
  <div style={{display:"flex",alignItems:"center",justifyContent:"center",flexWrap:"wrap",gap:12,marginBottom:36,textAlign:"center",flexDirection:"column"}}>
    <div>
      <div style={{fontSize:10,color:"var(--accent)",letterSpacing:".15em",textTransform:"uppercase",
        fontWeight:700,marginBottom:6}}>{tag}</div>
      <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(1.7rem,3.5vw,2.4rem)",fontWeight:800,lineHeight:1.1}}>
        {h1} <span style={{background:G,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{hl}</span>
      </h2>
    </div>
    {action}
  </div>
);}

function AddBtn({label,onClick}){
  const [h,setH]=useState(false);
  return <button onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
    style={{display:"flex",alignItems:"center",gap:6,padding:"8px 16px",borderRadius:9,cursor:"pointer",
      background:h?"rgba(124,111,255,.18)":"rgba(124,111,255,.07)",
      border:`1px ${h?"solid":"dashed"} rgba(124,111,255,.45)`,
      color:"var(--accent)",fontSize:13,fontWeight:600,fontFamily:"'DM Sans',sans-serif",transition:"all .2s"}}>+ {label}</button>;
}

/* ─── Nav ────────────────────────────────────────────────────────── */
function Nav({name}){
  const [open,setOpen]=useState(false);
  const [active,setActive]=useState("home");
  const links=["Home","About","Skills","Projects","Education","Internships","Certificates","Contact"];

  useEffect(()=>{
    const handler=()=>{
      const sections=links.map(l=>({id:l.toLowerCase(),el:document.getElementById(l.toLowerCase())})).filter(s=>s.el);
      const scrollY=window.scrollY+80;
      for(let i=sections.length-1;i>=0;i--){
        if(sections[i].el.offsetTop<=scrollY){setActive(sections[i].id);break;}
      }
    };
    window.addEventListener("scroll",handler);return()=>window.removeEventListener("scroll",handler);
  },[]);

  return <>
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:200,
      padding:"0 32px",height:60,display:"flex",alignItems:"center",justifyContent:"space-between",
      background:"rgba(8,8,24,.92)",backdropFilter:"blur(20px)",
      borderBottom:"1px solid var(--border)"}}>
      <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:20,
        background:G,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
        letterSpacing:"-.01em"}}>Portfolio</div>
      <div style={{display:"flex",gap:6,alignItems:"center"}} id="dn">
        {links.map(l=>{
          const isActive=active===l.toLowerCase();
          return <a key={l} href={`#${l.toLowerCase()}`}
            style={{padding:"6px 14px",borderRadius:8,textDecoration:"none",fontSize:13.5,
              fontWeight:isActive?600:400,
              color:isActive?"var(--accent)":"var(--muted)",
              background:isActive?"rgba(124,111,255,.12)":"transparent",
              transition:"all .2s"}}
            onMouseEnter={e=>{if(!isActive)e.currentTarget.style.color="var(--text)"}}
            onMouseLeave={e=>{if(!isActive)e.currentTarget.style.color="var(--muted)"}}>{l}</a>;
        })}
      </div>
      <button onClick={()=>setOpen(o=>!o)} id="hb"
        style={{background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",gap:5,padding:4}}>
        {[0,1,2].map(i=><span key={i} style={{display:"block",width:22,height:2,background:"var(--text)",borderRadius:2,transition:"all .3s",
          transform:open?(i===0?"rotate(45deg) translate(5px,5px)":i===1?"scaleX(0)":"rotate(-45deg) translate(5px,-5px)"):"none",
          opacity:open&&i===1?0:1}}/>)}
      </button>
    </nav>
    {open&&<div style={{position:"fixed",top:60,left:0,right:0,zIndex:199,
      background:"rgba(8,8,24,.97)",backdropFilter:"blur(18px)",
      borderBottom:"1px solid var(--border)",padding:"18px 24px",
      display:"flex",flexDirection:"column",gap:16,animation:"fadeIn .2s ease"}}>
      {links.map(l=><a key={l} href={`#${l.toLowerCase()}`} onClick={()=>setOpen(false)}
        style={{color:"var(--text)",textDecoration:"none",fontSize:17,fontWeight:600}}>{l}</a>)}
    </div>}
    <style>{`
      #dn{display:flex!important}#hb{display:none!important}
      @media(max-width:760px){#dn{display:none!important}#hb{display:flex!important}}
    `}</style>
  </>;
}

/* ─── Hero ───────────────────────────────────────────────────────── */
function Hero({data,onEdit}){
  const [hovResume,setHovResume]=useState(false);

  const SocialIcon=({href,title,children,delay})=>{
    const [h,setH]=useState(false);
    return <a href={href} target="_blank" rel="noreferrer" title={title}
      onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{display:"flex",alignItems:"center",justifyContent:"center",
        width:46,height:46,borderRadius:"50%",
        background:h?"rgba(124,111,255,.18)":"rgba(255,255,255,.06)",
        border:`1px solid ${h?"var(--accent)":"rgba(255,255,255,.12)"}`,
        color:h?"var(--accent)":"var(--muted)",textDecoration:"none",
        fontSize:19,transition:"all .25s",
        animation:`iconPop .5s ${delay}s ease both`}}>
      {children}
    </a>;
  };

  return <section id="home" style={{minHeight:"100vh",display:"flex",alignItems:"center",
    justifyContent:"center",textAlign:"center",position:"relative",overflow:"hidden",
    padding:"80px 24px 40px"}}>
    <div style={{position:"absolute",inset:0,pointerEvents:"none",
      background:"radial-gradient(ellipse 70% 55% at 50% 42%,rgba(100,80,255,.18) 0%,transparent 70%)"}}/>
    <div style={{position:"absolute",inset:0,pointerEvents:"none",
      backgroundImage:"linear-gradient(rgba(124,111,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(124,111,255,.03) 1px,transparent 1px)",
      backgroundSize:"60px 60px"}}/>
    <div style={{position:"relative",zIndex:1,maxWidth:640,width:"100%"}}>
     <div style={{display:"flex",justifyContent:"center",marginBottom:36,animation:"fadeUp .8s .05s ease both"}}>
  <div style={{position:"relative",display:"inline-block"}}>
    <div style={{position:"absolute",inset:-12,borderRadius:"50%",
      background:"radial-gradient(circle,rgba(124,111,255,.5) 0%,rgba(255,107,138,.2) 60%,transparent 80%)",
      animation:"glowPulse 3s ease-in-out infinite",filter:"blur(8px)"}}/>
    <div style={{position:"relative",width:220,height:220,borderRadius:"50%",
      boxShadow:"0 0 50px 15px rgba(124,111,255,.4),0 0 100px 30px rgba(255,107,138,.15)",
      animation:"float 3.5s ease-in-out infinite",overflow:"hidden"}}>
      <img 
        src={rutujaImg}
        alt="Rutuja Jadhav"
        style={{width:"100%",height:"100%",objectFit:"cover",borderRadius:"50%"}}
      />
    </div>       {/* ← closes the 220x220 div */}
  </div>         {/* ← closes display:inline-block div */}
</div>           {/* ← closes justifyContent:center div */}
      <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(2.4rem,7vw,3.8rem)",
        fontWeight:800,lineHeight:1.05,marginBottom:10,marginTop:20,
        animation:"fadeUp .8s .18s ease both",color:"var(--text)",opacity:1,display:"block",textAlign:"center"}}>
        <span contentEditable suppressContentEditableWarning
          onBlur={e=>onEdit("name",e.target.textContent.trim())}
          style={{outline:"none",cursor:"text",color:"var(--text)"}}>{data.name}</span>
      </h1>
      <div style={{fontSize:"clamp(.95rem,2.5vw,1.15rem)",color:"var(--muted)",
        marginBottom:28,fontWeight:400,letterSpacing:".01em",animation:"fadeUp .8s .26s ease both"}}>
        <span contentEditable suppressContentEditableWarning
          onBlur={e=>onEdit("role",e.target.textContent.trim())}
          style={{outline:"none",cursor:"text"}}>{data.role}</span>
      </div>
      <div style={{display:"flex",justifyContent:"center",gap:14,marginBottom:36,animation:"fadeUp .8s .32s ease both"}}>
        <SocialIcon href="https://www.linkedin.com/in/rutuja-jadhav-a9362b277" title="LinkedIn" delay={.38}>
          <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zm2-3a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/>
          </svg>
        </SocialIcon>
        <SocialIcon href="https://github.com/Rutuja6105" title="GitHub" delay={.44}>
          <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
          </svg>
        </SocialIcon>
        <SocialIcon href="mailto:rutujadhav6105@gmail.com" title="Email" delay={.5}>
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
        </SocialIcon>
      </div>
      <div style={{animation:"fadeUp .8s .52s ease both"}}>
        <a href="https://drive.google.com/file/d/1KeiQloaHJCcD-6TmIKfhwjPoOGslmyfE/view?usp=drive_link" download
          onMouseEnter={()=>setHovResume(true)}
          onMouseLeave={()=>setHovResume(false)}
          style={{display:"inline-flex",alignItems:"center",gap:10,
            padding:"14px 36px",borderRadius:50,
            background:hovResume?"linear-gradient(135deg,#9c8fff,#7c6fff,#ff6b8a)":"linear-gradient(135deg,#7c6fff,#c850c0,#ff6b8a)",
            color:"white",textDecoration:"none",fontWeight:700,fontSize:15.5,letterSpacing:".02em",
            boxShadow:hovResume?"0 6px 36px rgba(124,111,255,.65),0 0 0 1px rgba(124,111,255,.4)":"0 4px 24px rgba(124,111,255,.45)",
            transition:"all .3s",transform:hovResume?"translateY(-2px) scale(1.02)":"none"}}>
          <svg width="17" height="17" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Download Resume
        </a>
      </div>
      <div style={{marginTop:52,color:"var(--muted)",fontSize:12,
        display:"flex",flexDirection:"column",alignItems:"center",gap:6,animation:"fadeUp 1s .7s ease both"}}>
        <span style={{letterSpacing:".1em",textTransform:"uppercase"}}>Scroll down</span>
        <svg width="18" height="18" fill="none" stroke="var(--muted)" strokeWidth="2" viewBox="0 0 24 24"
          style={{animation:"float 1.8s ease-in-out infinite"}}>
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      </div>
    </div>
  </section>;
}

/* ─── About ──────────────────────────────────────────────────────── */
function About(){
  const addTL=()=>setTl(p=>[...p,{id:uid(),icon:"📌",meta:"Year",title:"Role",sub:"Details"}]);
  const delTL=id=>setTl(p=>p.filter(i=>i.id!==id));
  const C=(e={})=>({background:"var(--card)",border:"1px solid var(--border)",borderRadius:16,padding:24,...e});
  const traits=[
    {icon:"⚡",col:"var(--a3)",t:"Fast Learner",d:"React, TypeScript & AWS — picked up in months, not years."},
    {icon:"🎯",col:"var(--a2)",t:"Detail-Oriented",d:"Clean code, pixel-perfect UIs, zero tolerance for half-measures."},
    {icon:"🤝",col:"var(--accent)",t:"Team Player",d:"Clear communicator who elevates everyone around them."},
    {icon:"🚀",col:"#f9a825",t:"Self-Starter",d:"Ownership-driven — I ship things that actually matter."},
  ];
  const soft=[{l:"Problem Solving",p:88},{l:"Collaboration",p:93},{l:"Learning Speed",p:96}];

  function TC({t}){
    const [h,setH]=useState(false);
    return <div onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{background:"var(--card)",border:`1px solid ${h?t.col:"var(--border)"}`,borderRadius:14,padding:"20px 16px",
        transition:"all .3s",transform:h?"translateY(-4px)":"none",boxShadow:h?"0 10px 28px rgba(0,0,0,.35)":"none",
        position:"relative",overflow:"hidden"}}>
      {h&&<div style={{position:"absolute",inset:0,background:`radial-gradient(circle at top left,${t.col}1a,transparent 65%)`,pointerEvents:"none"}}/>}
      <div style={{fontSize:26,marginBottom:10}}>{t.icon}</div>
      <div style={{fontWeight:700,fontSize:14,marginBottom:5}}>{t.t}</div>
      <div style={{color:"var(--muted)",fontSize:12.5,lineHeight:1.65}}>{t.d}</div>
    </div>;
  }

  return <section id="about" style={{padding:"6rem 24px 7rem",position:"relative",zIndex:2,
    background:"linear-gradient(180deg,transparent,rgba(124,111,255,.02),transparent)"}}>
    <div style={{maxWidth:"100%",margin:"0",padding:"0 24px"}}>
      <Reveal><SecHead tag="Who I Am" h1="About" hl="Me"/></Reveal>
      <Reveal delay={.05}><div style={{...C(),marginBottom:"1.25rem",display:"flex",gap:20,flexWrap:"wrap",alignItems:"flex-start"}}>
        <div style={{width:52,height:52,borderRadius:"50%",background:G,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>👩‍💻</div>
        <div style={{flex:1,minWidth:200}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:17,marginBottom:3}}>The Story So Far</div>
          <div style={{fontSize:11,color:"var(--muted)",marginBottom:14}}>B.Tech CSE · Class of 2026</div>
          <p contentEditable suppressContentEditableWarning style={{color:"var(--muted)",lineHeight:1.85,fontSize:14,marginBottom:10,outline:"none"}}>Motivated Web Developer and QA Automation Engineer with hands-on experience in building and testing real-world applications.</p>
          <p contentEditable suppressContentEditableWarning style={{color:"var(--muted)",lineHeight:1.85,fontSize:14,outline:"none"}}>Successfully automated complete projects using Cypress and worked with Selenium, Python, SQLite, and Git. Strong understanding of testing methodologies, debugging, and delivering production-ready applications. Focused on writing clean code and ensuring software quality.</p>
        </div>
      </div></Reveal>
      <Reveal delay={.1}><div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"1rem",marginBottom:"1.25rem"}} id="tg">
        {traits.map(t=><TC key={t.t} t={t}/>)}
      </div></Reveal>
      <Reveal delay={.12}><div style={{...C(),marginBottom:"1.25rem"}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:15,marginBottom:20}}>Hard Skills</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px 36px"}} id="sb">
          {soft.map(s=><div key={s.l}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
              <span style={{fontSize:13,fontWeight:500}}>{s.l}</span>
              <span style={{fontSize:12,color:"var(--accent)",fontWeight:700}}>{s.p}%</span>
            </div>
            <div style={{height:5,background:"var(--border)",borderRadius:99,overflow:"hidden"}}>
              <div style={{height:"100%",borderRadius:99,background:G,width:`${s.p}%`,animation:`barGrow .9s .3s ease both`,["--w"]:`${s.p}%`}}/>
            </div>
          </div>)}
        </div>
      </div></Reveal>
      
        </div>
    
  </section>;
}

/* ─── Skills ─────────────────────────────────────────────────────── */
function Skills({skills,onAdd,onDel,name}){
  const [modal,setModal]=useState(false);
  const [form,setForm]=useState({icon:"🔥",name:"",level:"Beginner"});
  const lvls=["Beginner","Intermediate","Proficient","Expert"];
  const lc=l=>l==="Expert"?"var(--a3)":l==="Proficient"?"var(--accent)":l==="Intermediate"?"var(--a2)":"var(--muted)";
  const submit=()=>{if(!form.name.trim())return;onAdd({id:uid(),...form});setModal(false);setForm({icon:"🔥",name:"",level:"Beginner"});};
  function SK({s}){
    const [h,setH]=useState(false);
    return <div onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{background:"var(--card)",border:`1px solid ${h?"rgba(124,111,255,.5)":"var(--border)"}`,borderRadius:12,padding:"16px 18px",display:"flex",alignItems:"center",gap:12,transition:"all .28s",transform:h?"translateY(-3px)":"none",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",bottom:0,left:0,right:0,height:2,background:G,transform:h?"scaleX(1)":"scaleX(0)",transition:"transform .35s",transformOrigin:"left"}}/>
      <div style={{fontSize:22}}>{s.icon}</div>
      <div style={{flex:1}}><div style={{fontWeight:600,fontSize:14}}>{s.name}</div><div style={{fontSize:11,color:lc(s.level),fontWeight:600}}>{s.level}</div></div>
      {h&&<button onClick={()=>onDel(s.id)} style={{background:"rgba(255,107,138,.12)",border:"none",color:"var(--a2)",cursor:"pointer",fontSize:12,padding:"2px 7px",borderRadius:5,fontWeight:700}}>✕</button>}
    </div>;
  }
  return <section id="skills" style={{padding:"6rem 24px",position:"relative",zIndex:2}}>
    <div style={{maxWidth:"100%",margin:"0",padding:"0 24px"}}>
      <Reveal><SecHead tag="What I Know" hl="Skills" action={<AddBtn label="Add Skill" onClick={()=>setModal(true)}/>}/></Reveal>
      <div style={{display:"flex",flexWrap:"wrap",gap:12,justifyContent:"center"}}>
        {skills.map((s,i)=><Reveal key={s.id} delay={i*.04}><SK s={s}/></Reveal>)}
      </div>
    </div>
    {modal&&<Modal title="Add Skill" onClose={()=>setModal(false)}>
      <F label="Emoji"><input style={inp} value={form.icon} onChange={e=>setForm(p=>({...p,icon:e.target.value}))}/></F>
      <F label="Name *"><input style={inp} value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))} placeholder="TypeScript" onKeyDown={e=>e.key==="Enter"&&submit()}/></F>
      <F label="Level"><select style={{...inp,appearance:"none"}} value={form.level} onChange={e=>setForm(p=>({...p,level:e.target.value}))}>{lvls.map(l=><option key={l}>{l}</option>)}</select></F>
      <div style={{display:"flex",gap:8,justifyContent:"flex-end",marginTop:8}}>
        <button onClick={()=>setModal(false)} style={{padding:"9px 18px",borderRadius:9,background:"none",border:"1px solid var(--border)",color:"var(--muted)",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:600}}>Cancel</button>
        <button onClick={submit} style={{padding:"9px 22px",borderRadius:9,background:G,color:"white",border:"none",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:700}}>Add</button>
      </div>
    </Modal>}
  </section>;
}

/* ─── Projects ───────────────────────────────────────────────────── */
function Projects({projects,onAdd,onDel,name}){
  const [modal,setModal]=useState(false);
  const [form,setForm]=useState({icon:"💻",title:"",desc:"",tags:"",github:"",live:""});
  const submit=()=>{
    if(!form.title.trim()||!form.desc.trim())return;
    const tags=form.tags.split(",").map(t=>t.trim()).filter(Boolean);
    onAdd({id:uid(),...form,tags});setModal(false);setForm({icon:"💻",title:"",desc:"",tags:"",github:"",live:""});
  };
  function PC({p}){
    const [h,setH]=useState(false);
    return <div onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{background:"var(--card)",border:`1px solid ${h?"rgba(124,111,255,.45)":"var(--border)"}`,borderRadius:16,padding:22,display:"flex",flexDirection:"column",transition:"all .3s",transform:h?"translateY(-5px)":"none",boxShadow:h?"0 14px 38px rgba(0,0,0,.42)":"none",position:"relative",overflow:"hidden"}}>
      {h&&<div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(124,111,255,.06),transparent)",pointerEvents:"none"}}/>}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12,position:"relative",zIndex:1}}>
        <div style={{width:44,height:44,borderRadius:11,background:G,display:"flex",alignItems:"center",justifyContent:"center",fontSize:19}}>{p.icon}</div>
        {h&&<button onClick={()=>onDel(p.id)} style={{background:"rgba(255,107,138,.12)",border:"none",color:"var(--a2)",cursor:"pointer",fontSize:14,padding:"3px 9px",borderRadius:7,fontWeight:700}}>🗑</button>}
      </div>
      <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:15,marginBottom:6,position:"relative",zIndex:1}}>{p.title}</div>
      <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:8,position:"relative",zIndex:1}}>
        {p.tags.map(t=><span key={t} style={{padding:"2px 8px",borderRadius:100,fontSize:10,fontWeight:700,background:"rgba(124,111,255,.1)",color:"var(--accent)",border:"1px solid rgba(124,111,255,.2)"}}>{t}</span>)}
      </div>
      <p style={{color:"var(--muted)",fontSize:13,lineHeight:1.65,flex:1,position:"relative",zIndex:1}}>{p.desc}</p>
      <div style={{display:"flex",gap:8,marginTop:14,position:"relative",zIndex:1}}>
        {p.github&&<a href={p.github} target="_blank" rel="noreferrer" style={{padding:"5px 12px",borderRadius:7,fontSize:11,fontWeight:600,border:"1px solid var(--border)",color:"var(--muted)",textDecoration:"none",transition:"all .2s"}}
          onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--accent)";e.currentTarget.style.color="var(--accent)"}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.color="var(--muted)"}}>⚙ GitHub</a>}
        {p.live&&<a href={p.live} target="_blank" rel="noreferrer" style={{padding:"5px 12px",borderRadius:7,fontSize:11,fontWeight:600,background:"rgba(124,111,255,.1)",border:"1px solid rgba(124,111,255,.25)",color:"var(--accent)",textDecoration:"none"}}>↗ Live</a>}
      </div>
    </div>;
  }
  return <section id="projects" style={{padding:"6rem 24px",position:"relative",zIndex:2,background:"linear-gradient(180deg,transparent,rgba(124,111,255,.025),transparent)"}}>
    <div style={{maxWidth:"100%",margin:"0",padding:"0 24px"}}>
      <Reveal><SecHead tag="What I've Built"  hl="Projects" action={<AddBtn label="Add Project" onClick={()=>setModal(true)}/>}/></Reveal>
      <div style={{display:"flex",flexWrap:"wrap",gap:"1.25rem",justifyContent:"center"}}>
        {projects.map((p,i)=><Reveal key={p.id} delay={i*.07}><PC p={p}/></Reveal>)}
      </div>
    </div>
    {modal&&<Modal title="Add Project" onClose={()=>setModal(false)}>
      <F label="Icon"><input style={inp} value={form.icon} onChange={e=>setForm(p=>({...p,icon:e.target.value}))}/></F>
      <F label="Title *"><input style={inp} value={form.title} onChange={e=>setForm(p=>({...p,title:e.target.value}))} placeholder="My Awesome App"/></F>
      <F label="Description *"><textarea rows={3} style={{...inp,resize:"vertical"}} value={form.desc} onChange={e=>setForm(p=>({...p,desc:e.target.value}))}/></F>
      <F label="Tags (comma separated)"><input style={inp} value={form.tags} onChange={e=>setForm(p=>({...p,tags:e.target.value}))} placeholder="React, Node.js"/></F>
      <F label="GitHub URL"><input style={inp} value={form.github} onChange={e=>setForm(p=>({...p,github:e.target.value}))}/></F>
      <F label="Live URL"><input style={inp} value={form.live} onChange={e=>setForm(p=>({...p,live:e.target.value}))}/></F>
      <div style={{display:"flex",gap:8,justifyContent:"flex-end",marginTop:8}}>
        <button onClick={()=>setModal(false)} style={{padding:"9px 18px",borderRadius:9,background:"none",border:"1px solid var(--border)",color:"var(--muted)",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:600}}>Cancel</button>
        <button onClick={submit} style={{padding:"9px 22px",borderRadius:9,background:G,color:"white",border:"none",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:700}}>Add</button>
      </div>
    </Modal>}
  </section>;
}

/* ─── Education ──────────────────────────────────────────────────── */
function Education({education,onAdd,onDel}){
  const [modal,setModal]=useState(false);
  const [form,setForm]=useState({icon:"🎓",degree:"",school:"",field:"",year:"",gpa:"",details:""});
  const submit=()=>{
    if(!form.degree.trim()||!form.school.trim())return;
    onAdd({id:uid(),...form});
    setModal(false);
    setForm({icon:"🎓",degree:"",school:"",field:"",year:"",gpa:"",details:""});
  };
  function EC({e}){
    const [h,setH]=useState(false);
    return <div onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{background:"var(--card)",border:`1px solid ${h?"rgba(62,240,220,.4)":"var(--border)"}`,borderRadius:16,padding:24,transition:"all .3s",transform:h?"translateY(-4px)":"none",boxShadow:h?"0 12px 32px rgba(0,0,0,.4)":"none",position:"relative",overflow:"hidden"}}>
      {h&&<div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(62,240,220,.08),transparent)",pointerEvents:"none"}}/>}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14,position:"relative",zIndex:1}}>
        <div style={{width:48,height:48,borderRadius:12,background:G3,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>{e.icon}</div>
        {h&&<button onClick={()=>onDel(e.id)} style={{background:"rgba(255,107,138,.12)",border:"none",color:"var(--a2)",cursor:"pointer",fontSize:12,padding:"4px 9px",borderRadius:6,fontWeight:700}}>🗑</button>}
      </div>
      <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:16,marginBottom:4,color:"var(--text)",position:"relative",zIndex:1}}>{e.degree}</div>
      <div style={{fontSize:12,color:"var(--a3)",fontWeight:700,marginBottom:8,textTransform:"uppercase",letterSpacing:".05em",position:"relative",zIndex:1}}>{e.school}</div>
      {e.field&&<div style={{fontSize:12,color:"var(--muted)",marginBottom:4,position:"relative",zIndex:1}}>📚 {e.field}</div>}
      <div style={{display:"flex",gap:16,marginBottom:12,fontSize:12,color:"var(--muted)",position:"relative",zIndex:1}}>
        {e.year&&<span>📅 {e.year}</span>}
        {e.gpa&&<span>⭐ GPA: {e.gpa}</span>}
      </div>
      {e.details&&<p style={{fontSize:12.5,color:"var(--muted)",lineHeight:1.6,position:"relative",zIndex:1}}>{e.details}</p>}
    </div>;
  }
  return <section id="education" style={{padding:"6rem 24px",position:"relative",zIndex:2,background:"linear-gradient(180deg,transparent,rgba(62,240,220,.015),transparent)"}}>
    <div style={{maxWidth:"100%",margin:"0",padding:"0 24px"}}>
      <Reveal><SecHead tag="My Journey"  hl="Education" action={<AddBtn label="Add Education" onClick={()=>setModal(true)}/>}/></Reveal>
      <div style={{display:"flex",flexWrap:"wrap",gap:"1.25rem",justifyContent:"center"}}>
        {education.map((e,i)=><Reveal key={e.id} delay={i*.07}><EC e={e}/></Reveal>)}
      </div>
    </div>
    {modal&&<Modal title="Add Education" onClose={()=>setModal(false)}>
      <F label="Icon"><input style={inp} value={form.icon} onChange={e=>setForm(p=>({...p,icon:e.target.value}))}/></F>
      <F label="Degree *"><input style={inp} value={form.degree} onChange={e=>setForm(p=>({...p,degree:e.target.value}))} placeholder="B.Tech Computer Science"/></F>
      <F label="School/University *"><input style={inp} value={form.school} onChange={e=>setForm(p=>({...p,school:e.target.value}))} placeholder="University Name"/></F>
      <F label="Field of Study"><input style={inp} value={form.field} onChange={e=>setForm(p=>({...p,field:e.target.value}))} placeholder="Computer Science"/></F>
      <F label="Year"><input style={inp} value={form.year} onChange={e=>setForm(p=>({...p,year:e.target.value}))} placeholder="2020 – 2024"/></F>
      <F label="GPA"><input style={inp} value={form.gpa} onChange={e=>setForm(p=>({...p,gpa:e.target.value}))} placeholder="8.5 / 10"/></F>
      <F label="Details"><textarea rows={3} style={{...inp,resize:"vertical"}} value={form.details} onChange={e=>setForm(p=>({...p,details:e.target.value}))} placeholder="Relevant coursework, achievements, etc."/></F>
      <div style={{display:"flex",gap:8,justifyContent:"flex-end",marginTop:8}}>
        <button onClick={()=>setModal(false)} style={{padding:"9px 18px",borderRadius:9,background:"none",border:"1px solid var(--border)",color:"var(--muted)",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:600}}>Cancel</button>
        <button onClick={submit} style={{padding:"9px 22px",borderRadius:9,background:G3,color:"white",border:"none",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:700}}>Add</button>
      </div>
    </Modal>}
  </section>;
}

/* ─── Internships ────────────────────────────────────────────────── */
function Internships({internships,onAdd,onDel}){
  const [modal,setModal]=useState(false);
  const [form,setForm]=useState({icon:"💼",company:"",role:"",duration:"",description:"",offer:"",certificate:""});
  const submit=()=>{
    if(!form.company.trim()||!form.role.trim())return;
    onAdd({id:uid(),...form});
    setModal(false);
    setForm({icon:"💼",company:"",role:"",duration:"",description:"",offer:"",certificate:""});
  };
  function IC({i}){
    const [h,setH]=useState(false);
    return <div onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{background:"var(--card)",border:`1px solid ${h?"rgba(255,107,138,.4)":"var(--border)"}`,borderRadius:16,padding:24,transition:"all .3s",transform:h?"translateY(-4px)":"none",boxShadow:h?"0 12px 32px rgba(0,0,0,.4)":"none",position:"relative",overflow:"hidden"}}>
      {h&&<div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(255,107,138,.08),transparent)",pointerEvents:"none"}}/>}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14,position:"relative",zIndex:1}}>
        <div style={{width:48,height:48,borderRadius:12,background:G,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>{i.icon}</div>
        {h&&<button onClick={()=>onDel(i.id)} style={{background:"rgba(255,107,138,.12)",border:"none",color:"var(--a2)",cursor:"pointer",fontSize:12,padding:"4px 9px",borderRadius:6,fontWeight:700}}>🗑</button>}
      </div>
      <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:16,marginBottom:4,color:"var(--text)",position:"relative",zIndex:1}}>{i.role}</div>
      <div style={{fontSize:12,color:"var(--accent)",fontWeight:700,marginBottom:8,textTransform:"uppercase",letterSpacing:".05em",position:"relative",zIndex:1}}>{i.company}</div>
      {i.duration&&<div style={{fontSize:12,color:"var(--muted)",marginBottom:4,position:"relative",zIndex:1}}>📅 {i.duration}</div>}
      {i.description&&<p style={{fontSize:12.5,color:"var(--muted)",lineHeight:1.6,marginBottom:12,position:"relative",zIndex:1}}>{i.description}</p>}
      <div style={{display:"flex",gap:8,flexWrap:"wrap",position:"relative",zIndex:1}}>
        {i.offer&&i.offer!=="#"&&<a href={i.offer} target="_blank" rel="noreferrer" style={{fontSize:11,fontWeight:600,color:"var(--a2)",textDecoration:"none",border:"1px solid rgba(255,107,138,.3)",padding:"4px 10px",borderRadius:6}}>📄 Offer Letter</a>}
        {i.certificate&&i.certificate!=="#"&&<a href={i.certificate} target="_blank" rel="noreferrer" style={{fontSize:11,fontWeight:600,color:"var(--a3)",textDecoration:"none",border:"1px solid rgba(62,240,220,.3)",padding:"4px 10px",borderRadius:6}}>🏆 Certificate</a>}
      </div>
    </div>;
  }
  return <section id="internships" style={{padding:"6rem 24px",position:"relative",zIndex:2,background:"linear-gradient(180deg,transparent,rgba(255,107,138,.015),transparent)"}}>
    <div style={{maxWidth:"100%",margin:"0",padding:"0 24px"}}>
      <Reveal><SecHead tag="Work Experience"  hl="Internships" action={<AddBtn label="Add Internship" onClick={()=>setModal(true)}/>}/></Reveal>
      <div style={{display:"flex",flexWrap:"wrap",gap:"1.25rem",justifyContent:"center"}}>
        {internships.map((i,idx)=><Reveal key={i.id} delay={idx*.07}><IC i={i}/></Reveal>)}
      </div>
    </div>
    {modal&&<Modal title="Add Internship" onClose={()=>setModal(false)}>
      <F label="Icon"><input style={inp} value={form.icon} onChange={e=>setForm(p=>({...p,icon:e.target.value}))}/></F>
      <F label="Company *"><input style={inp} value={form.company} onChange={e=>setForm(p=>({...p,company:e.target.value}))} placeholder="Company Name"/></F>
      <F label="Role *"><input style={inp} value={form.role} onChange={e=>setForm(p=>({...p,role:e.target.value}))} placeholder="Software Engineer Intern"/></F>
      <F label="Duration"><input style={inp} value={form.duration} onChange={e=>setForm(p=>({...p,duration:e.target.value}))} placeholder="Jun 2023 – Aug 2023"/></F>
      <F label="Description"><textarea rows={3} style={{...inp,resize:"vertical"}} value={form.description} onChange={e=>setForm(p=>({...p,description:e.target.value}))} placeholder="What you did, learned, and accomplished..."/></F>
      <F label="Offer Letter URL"><input style={inp} value={form.offer} onChange={e=>setForm(p=>({...p,offer:e.target.value}))} placeholder="https://..."/></F>
      <F label="Completion Certificate URL"><input style={inp} value={form.certificate} onChange={e=>setForm(p=>({...p,certificate:e.target.value}))} placeholder="https://..."/></F>
      <div style={{display:"flex",gap:8,justifyContent:"flex-end",marginTop:8}}>
        <button onClick={()=>setModal(false)} style={{padding:"9px 18px",borderRadius:9,background:"none",border:"1px solid var(--border)",color:"var(--muted)",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:600}}>Cancel</button>
        <button onClick={submit} style={{padding:"9px 22px",borderRadius:9,background:G,color:"white",border:"none",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:700}}>Add</button>
      </div>
    </Modal>}
  </section>;
}

/* ─── Certificates ───────────────────────────────────────────────── */
function Certificates({certs,onAdd,onDel}){
  const [modal,setModal]=useState(false);
  const [form,setForm]=useState({title:"",issuer:"",date:"",link:""});
  const submit=()=>{if(!form.title.trim())return;onAdd({id:uid(),...form});setModal(false);setForm({title:"",issuer:"",date:"",link:""});};
  function CC({c}){
    const [h,setH]=useState(false);
    return <div onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{background:"var(--card)",border:`1px solid ${h?"rgba(62,240,220,.4)":"var(--border)"}`,borderRadius:16,padding:22,transition:"all .3s",transform:h?"translateY(-4px)":"none",boxShadow:h?"0 10px 30px rgba(0,0,0,.38)":"none",position:"relative"}}>
      <div style={{position:"absolute",top:18,right:18,width:34,height:34,borderRadius:"50%",background:G3,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>🏆</div>
      {h&&<button onClick={()=>onDel(c.id)} style={{position:"absolute",top:18,right:60,background:"rgba(255,107,138,.12)",border:"none",color:"var(--a2)",cursor:"pointer",fontSize:12,padding:"3px 8px",borderRadius:6,fontWeight:700}}>🗑</button>}
      <div style={{fontSize:10,color:"var(--a3)",textTransform:"uppercase",letterSpacing:".1em",fontWeight:700,marginBottom:5}}>{c.issuer}</div>
      <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:14,marginBottom:5,paddingRight:46}}>{c.title}</div>
      <div style={{fontSize:11,color:"var(--muted)",marginBottom:12}}>📅 {c.date}</div>
      {c.link&&c.link!=="#"&&<a href={c.link} target="_blank" rel="noreferrer" style={{fontSize:11,fontWeight:600,color:"var(--a3)",textDecoration:"none",border:"1px solid rgba(62,240,220,.22)",padding:"4px 10px",borderRadius:6,display:"inline-block"}}>View ↗</a>}
    </div>;
  }
  return <section id="certificates" style={{padding:"6rem 24px",position:"relative",zIndex:2}}>
    <div style={{maxWidth:"100%",margin:"0",padding:"0 24px"}}>
      <Reveal><SecHead tag="What I've Earned" hl="Certificates" action={<AddBtn label="Add Certificate" onClick={()=>setModal(true)}/>}/></Reveal>
      <div style={{display:"flex",flexWrap:"wrap",gap:"1.25rem",justifyContent:"center"}}>
        {certs.map((c,i)=><Reveal key={c.id} delay={i*.07}><CC c={c}/></Reveal>)}
      </div>
    </div>
    {modal&&<Modal title="Add Certificate" onClose={()=>setModal(false)}>
      <F label="Title *"><input style={inp} value={form.title} onChange={e=>setForm(p=>({...p,title:e.target.value}))} placeholder="Google UX Design"/></F>
      <F label="Issuer"><input style={inp} value={form.issuer} onChange={e=>setForm(p=>({...p,issuer:e.target.value}))} placeholder="Google / Coursera"/></F>
      <F label="Date"><input style={inp} value={form.date} onChange={e=>setForm(p=>({...p,date:e.target.value}))} placeholder="May 2024"/></F>
      <F label="Link"><input style={inp} value={form.link} onChange={e=>setForm(p=>({...p,link:e.target.value}))} placeholder="https://..."/></F>
      <div style={{display:"flex",gap:8,justifyContent:"flex-end",marginTop:8}}>
        <button onClick={()=>setModal(false)} style={{padding:"9px 18px",borderRadius:9,background:"none",border:"1px solid var(--border)",color:"var(--muted)",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:600}}>Cancel</button>
        <button onClick={submit} style={{padding:"9px 22px",borderRadius:9,background:G3,color:"white",border:"none",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:700}}>Add</button>
      </div>
    </Modal>}
  </section>;
}

/* ─── Contact ────────────────────────────────────────────────────── */
function Contact({data,onEdit,onToast}){
  const [sent,setSent]=useState(false);
  const [form,setForm]=useState({name:"",email:"",msg:""});
  const submit=e=>{e.preventDefault();setSent(true);setForm({name:"",email:"",msg:""});onToast("Sent! I'll reply soon 💌");setTimeout(()=>setSent(false),3000);};
  const items=[
    {icon:"✉️",key:"email",v:'rutujadhav6105@gmail.com'},
    {icon:"📱",key:"phone",v:'7385726593'},
    {icon:"💼",key:"linkedin",v:'https://www.linkedin.com/in/rutuja-jadhav-a9362b277'},
    {icon:"🐙",key:"github",v:'https://github.com/Rutuja6105'},
  ];
  return <section id="contact" style={{padding:"6rem 24px 8rem",position:"relative",zIndex:2}}>
    <div style={{maxWidth:"100%",margin:"0",padding:"0 24px"}}>
      <Reveal><SecHead tag="Get In Touch" h1="Contact" hl="Me"/></Reveal>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"3rem"}} id="cg">
        <Reveal delay={.08}><div>
          <p style={{color:"var(--muted)",marginBottom:24,lineHeight:1.8,fontSize:14}}>I'm actively looking for my first opportunity. My inbox is always open!</p>
          {items.map(item=>{
            const isLink = item.v.startsWith('http');
            const isEmail = item.v.includes('@');
            const href = isLink ? item.v : isEmail ? `mailto:${item.v}` : null;
            return (
              <div key={item.key} style={{display:"flex",alignItems:"center",gap:13,padding:"13px 16px",borderRadius:11,background:"var(--card)",border:"1px solid var(--border)",marginBottom:9,transition:"all .2s",cursor:"pointer"}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--accent)";e.currentTarget.style.transform="translateX(4px)"}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.transform="none"}}>
                <span style={{fontSize:18}}>{item.icon}</span>
                {href ? (
                  <a href={href} target="_blank" rel="noreferrer"
                    style={{outline:"none",fontSize:13,color:"var(--text)",textDecoration:"none",transition:"color .2s"}}
                    onMouseEnter={e=>e.currentTarget.style.color="var(--accent)"}
                    onMouseLeave={e=>e.currentTarget.style.color="var(--text)"}>
                    {item.v}
                  </a>
                ) : (
                  <span style={{outline:"none",fontSize:13}}>{item.v}</span>
                )}
              </div>
            );
          })}
        </div></Reveal>
        <Reveal delay={.15}><form onSubmit={submit}>
          {[["Name","name","John Doe","text"],["Email","email","john@example.com","email"]].map(([l,k,ph,t])=>(
            <div key={k} style={{marginBottom:13}}>
              <label style={{display:"block",fontSize:11,color:"var(--muted)",marginBottom:5,textTransform:"uppercase",letterSpacing:".06em"}}>{l}</label>
              <input type={t} style={inp} value={form[k]} onChange={e=>setForm(p=>({...p,[k]:e.target.value}))} placeholder={ph} required/>
            </div>
          ))}
          <div style={{marginBottom:18}}>
            <label style={{display:"block",fontSize:11,color:"var(--muted)",marginBottom:5,textTransform:"uppercase",letterSpacing:".06em"}}>Message</label>
            <textarea rows={5} style={{...inp,resize:"vertical"}} value={form.msg} onChange={e=>setForm(p=>({...p,msg:e.target.value}))} placeholder="Tell me about the opportunity..." required/>
          </div>
          <button type="submit" style={{width:"100%",padding:13,borderRadius:11,background:sent?G3:G,color:"white",border:"none",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:15,transition:"all .3s"}}>
            {sent?"✓ Sent!":"Send Message ✈️"}
          </button>
        </form></Reveal>
      </div>
    </div>
    <style>{`#cg{grid-template-columns:1fr 1fr!important}@media(max-width:680px){#cg{grid-template-columns:1fr!important}}`}</style>
  </section>;
}
/* ─── App Root ───────────────────────────────────────────────────── */
export default function App(){
  // ✅ Use React state only — no localStorage (not supported in Claude artifacts)
  const [data, setData] = useState(DEF);
  const [toast, setToast] = useState(null);

  const t_ = msg => setToast(msg);
  const edit = (k, v) => setData(p => ({...p, [k]: v}));

  const addSkill      = s   => { setData(p => ({...p, skills:      [...p.skills,      s  ]})); t_("Skill added ✨");       };
  const delSkill      = id  => { setData(p => ({...p, skills:      p.skills.filter(i=>i.id!==id)     })); t_("Removed"); };
  const addProject    = pr  => { setData(p => ({...p, projects:    [...p.projects,    pr ]})); t_("Project added 🚀");     };
  const delProject    = id  => { setData(p => ({...p, projects:    p.projects.filter(i=>i.id!==id)   })); t_("Removed"); };
  const addEducation  = edu => { setData(p => ({...p, education:   [...p.education,   edu]})); t_("Education added 📚");  };
  const delEducation  = id  => { setData(p => ({...p, education:   p.education.filter(i=>i.id!==id)  })); t_("Removed"); };
  const addIntern     = int => { setData(p => ({...p, internships: [...p.internships, int]})); t_("Internship added 💼"); };
  const delIntern     = id  => { setData(p => ({...p, internships: p.internships.filter(i=>i.id!==id)})); t_("Removed"); };
  const addCert       = c   => { setData(p => ({...p, certs:       [...p.certs,       c  ]})); t_("Certificate added 🏆"); };
  const delCert       = id  => { setData(p => ({...p, certs:       p.certs.filter(i=>i.id!==id)      })); t_("Removed"); };

  return <>
    <style>{CSS}</style>
    <Stars/>
    <Nav name={data.name}/>
    <Hero        data={data}               onEdit={edit}/>
    <About/>
    <Skills      skills={data.skills}      onAdd={addSkill}     onDel={delSkill}      name={data.name}/>
    <Projects    projects={data.projects}  onAdd={addProject}   onDel={delProject}    name={data.name}/>
    <Education   education={data.education} onAdd={addEducation} onDel={delEducation}/>
    <Internships internships={data.internships} onAdd={addIntern} onDel={delIntern}/>
    <Certificates certs={data.certs}       onAdd={addCert}      onDel={delCert}/>
    <Contact     data={data}               onEdit={edit}        onToast={t_}/>
    <footer style={{borderTop:"1px solid var(--border)",padding:"24px",textAlign:"center",
      color:"var(--muted)",fontSize:12,position:"relative",zIndex:2}}>
      © 2026 Rutuja Jadhav. All rights reserved.<strong style={{color:"var(--text)"}}></strong> ·
    </footer>
    {toast&&<Toast msg={toast} onDone={()=>setToast(null)}/>}
  </>;
  }

