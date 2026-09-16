'use client';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, Command, Github, Linkedin, Mail, Menu, X, TerminalSquare, ChevronDown, Phone, MessageCircle, MapPin } from 'lucide-react';
import { FormEvent, useEffect, useRef, useState } from 'react';

const git = 'https://github.com/aashi615', linkedin = 'https://www.linkedin.com/in/aashi4169/';
const nav = ['ABOUT','STACK','WORK','PROJECTS','SYSTEMS','CONTACT ME'];
const stacks = [
 ['01','BACKEND','Python · Java · Go · FastAPI · Spring Boot · Node.js'],
 ['02','AI','LLMs · RAG · LangChain · LangGraph · MCP · AI Agents · TensorFlow · OpenCV'],
 ['03','DATA','PostgreSQL · MySQL · Redis · MongoDB · pgvector · Supabase · Firebase'],
 ['04','CLOUD & INFRA','AWS · Docker · Kubernetes · CI/CD · Linux'],
 ['05','FRONTEND & MOBILE','React · Angular · Next.js · TypeScript · Flutter · Dart'],
 ['06','ENGINEERING','Distributed Systems · Async Processing · Concurrency · API Design · Caching · RBAC · OAuth2/OIDC · Fault Tolerance · Testing']
];
const metrics = [['8.85','CGPA','YMCA-BTECH Computer Science'],['500+','DEVELOPERS','USING MY AI TEST GENERATOR'],['60%','LESS MANUAL EFFORT','REPORTED IN SAMSUNG TOOL FEEDBACK'],['12+','HACKATHONS','BUILT UNDER REAL TIME CONSTRAINTS'],['1+ YOE','EXPERIENCE','3 INTERNSHIPS ACROSS PRODUCT TEAMS'],['600+','DSA PROBLEMS','SOLVED ACROSS CORE TOPICS']];
const diagrams: [string, string[], string[]][] = [
 ['ASYNC JOB PROCESSING',['API','QUEUE','WORKER POOL','RETRY / BACKOFF','DATABASE','METRICS'],['Receives a validated request.','Buffers work and decouples response time.','Scales independent processing.','Makes transient failure explicit.','Persists durable state.','Closes the feedback loop.']],
 ['AI AGENT PIPELINE',['QUERY','PLANNER','TOOLS','RETRIEVAL','MODEL','VALIDATION','RESPONSE'],['Defines the task.','Breaks intent into useful steps.','Executes bounded capabilities.','Brings relevant context forward.','Synthesizes an answer.','Checks grounding and structure.','Returns an inspectable result.']],
 ['PRODUCTION API',['CLIENT','AUTH','API','SERVICE','CACHE','DATABASE'],['Initiates a typed request.','Verifies identity and access.','Applies contracts and rate limits.','Owns domain behaviour.','Protects read latency.','Stores source-of-truth data.']],
 ['CLOUD DEPLOYMENT',['GIT','CI','BUILD','CONTAINER','DEPLOY','OBSERVE'],['Change is reviewed.','Validates correctness.','Produces a reproducible artifact.','Packages runtime dependencies.','Releases with control.','Measures real behaviour.']]
];
const featuredProjects = [
 {name:'FinSight AI',tag:'MULTI-AGENT AI FINANCIAL RESEARCH PLATFORM',description:'Production-deployed financial research platform built around a query planner, specialised research agents, evidence retrieval, and structured synthesis instead of unsupported LLM generation.',highlights:['Created a concurrent multi-agent backend workflow with bounded parallel execution.','Designed structured agent outputs with Pydantic validation and evidence validation.','Built modular backend layers with repositories, services, API integrations, Docker, Vercel, and Render.'],stack:['FastAPI','Python','PostgreSQL','RAG','LLM orchestration','Multi-agent architecture','Pydantic validation'],source:'https://github.com/aashi615/finsight_ai',live:'https://finsight-ai-rust.vercel.app/',featured:true},
 {name:'AI Log Detector / LogLens AI',tag:'AI-POWERED LOG INTELLIGENCE',description:'AI-powered log-analysis platform that turns raw application logs into structured errors, anomaly signals, summaries, and actionable insights.',highlights:['Built an upload → processing → analysis workflow for .log and .txt files.','Designed a FastAPI backend for file processing, log parsing, API orchestration, and LLM integration.','Built a React interface for investigating failures and suspicious patterns from unstructured logs.'],stack:['React','FastAPI','Python','AI / LLMs','Log analysis'],source:'https://github.com/aashi615/AI_Log_Detector'},
 {name:'Campus Connect',tag:'STUDENT COLLABORATION PLATFORM',description:'Student collaboration platform for project-team formation, resource discovery, and communication rather than a static resource portal.',highlights:['Built Project Buddy for teammate discovery and team formation.','Developed Student Corner for academic-resource sharing and access.','Implemented chat, cloud media storage, and event-driven backend interactions.'],stack:['Flutter','Dart','Backend','Event-driven','Chat','Cloud'],source:'https://github.com/aashi615/campus-connect'},
 {name:'Habitue',tag:'HABIT & PROGRESS TRACKING',description:'Personalised habit-tracking platform focused on consistent routines and long-term progress visibility.',highlights:['Built daily habit creation, tracking, persistent updates, and completion history.','Designed streaks and visual progress indicators to make progress measurable.','Won 3rd Prize at Zenith Hackathon.'],stack:['Flutter','Dart','Backend','Data tracking','Visualisation'],source:'https://github.com/aashi615/Habit_tracker'},
 {name:'MedLink',tag:'HEALTHCARE ACCESS PLATFORM',description:'Healthcare-resource platform connecting users with relevant medical support and accessible health resources.',highlights:['Built user-facing workflows for discovering and accessing healthcare assistance.','Implemented backend services for user data, resource management, and application workflows.','Used cloud-backed storage and service-oriented architecture for scalable functionality.'],stack:['Flutter','Dart','Backend','Cloud','Healthcare'],source:'https://github.com/aashi615/MedLink'}
];
const engineeringPillars = [
 {id:'backend',number:'01',label:'Backend',title:'Backend Engineering',intro:'Scalable, secure, production-ready backend systems across APIs, data platforms, distributed workflows, and AI-powered services.',highlights:[['Samsung R&D','Enterprise backend systems','Built Java and Spring Boot services for internal engineering workflows. Delivered secure RBAC and SSO access, test-execution orchestration, analytics, PostgreSQL-backed data flows, and Redis caching for latency-sensitive operations.'],['Sequalize','Backend + AI infrastructure','Designed REST APIs with Node.js and FastAPI across PostgreSQL, MongoDB, and Firebase. Connected backend services to AI retrieval workflows, improved data access and asynchronous processing, and reduced response latency by ~45%.'],['What The Food','Production backend architecture','Built backend APIs and business workflows for meal planning, subscriptions, health features, vendors, and local operations. Maintained clear domain boundaries across services and databases for reliable product flows.'],['FinSight AI','Multi-tenant SaaS backend','Designed tenant-aware APIs, data models, and service boundaries for isolated user data and workflows. Focused on authentication, authorisation, tenant isolation, and scalable access patterns.'],['Independent projects','Event-driven product systems','Built Campus Connect, Habitue, and MedLink with authentication, real-time communication, notifications, cloud file storage, and SQL/NoSQL-backed application workflows using Firebase and Supabase.'],['CityBreak Manager','Java / Spring Boot project','Built a standalone backend application with REST APIs, database persistence, validation, dependency injection, and controller–service–repository layers for maintainable business logic.']],skills:['Java','Python','Go','Spring Boot','Python','FastAPI','Node.js','REST APIs','PostgreSQL','MongoDB','Redis','Firebase','Supabase','JWT','SSO','RBAC','Authentication','Authorization','API Security','Caching','Asynchronous Processing','Concurrency','Message Queues','Retries','Event-Driven Architecture','Real-Time Systems','WebSockets','Notifications','Amazon S3','Cloudinary','Object Storage','Data Modeling','Multi-Tenancy','Tenant Isolation','Performance Optimization','Observability','Logging','Monitoring','CI/CD','Cloud Services']},
 {id:'ai',number:'02',label:'AI Engineering',title:'AI Engineering',intro:'Production-oriented AI systems across LLMs, generative AI, agentic workflows, retrieval, machine learning, and AI-powered automation.',highlights:[['Samsung R&D','Agentic test automation · 500+ engineers','Built an LLM-powered platform for test generation and execution using RAG, MCP, LangChain, LangGraph, tool calling, AST-based code analysis, prompt engineering, and Java/Python integrations; adopted internally by 500+ engineers.'],['FinSight AI','Multi-agent research','Designed a multi-agent research workflow with query planning, specialised agents, orchestration, tool execution, retrieval, synthesis, structured outputs, Pydantic validation, and evidence-backed generation.'],['Sequalize','Intelligent retrieval','Built an AI support workflow using LLMs, LangChain, embeddings, semantic search, vector retrieval, context engineering, and grounded responses.'],['LogLens AI','Log intelligence','Built an AI-driven log-intelligence system for log classification, anomaly detection, error-pattern identification, root-cause analysis, and incident insights using ML/NLP and LLM analysis.'],['VoiceNote','Voice-first knowledge workspace · Ongoing','Building a voice-first knowledge system that turns spoken notes into structured, searchable knowledge with speech-to-text, LLMs, embeddings, retrieval, summarisation, and contextual linking.']],skills:['LLMs','Generative AI','Agentic AI','AI Agents','Multi-Agent Systems','RAG','GraphRAG','LangChain','LangGraph','MCP','Agent Orchestration','Tool Calling','Function Calling','Agent Memory','Retrieval','Embeddings','Vector Search','Semantic Search','Hybrid Search','Reranking','Context Engineering','Prompt Engineering','Structured Outputs','Pydantic','LLM Evaluation','AI Evaluation','Hallucination Mitigation','AI Observability','Responsible AI','NumPy','Pandas','Hugging Face Transformers','PyTorch','TensorFlow','OpenAI','Gemini','Open-Source LLMs','FastAPI','Python','REST APIs','MLOps','LLMOps','MLflow','Experiment Tracking','Model Deployment','Model Monitoring','Model Versioning','Evaluation Pipelines','AI Pipelines','Inference Services','CI/CD','Docker','AWS','GCP','Azure','Vertex AI','AWS Bedrock','Azure OpenAI','Production AI','AI Reliability','Scalability','AI Security','Data Pipelines','Experimentation','AI Governance']},
 {id:'systems',number:'03',label:'Systems Engineering',title:'Systems Engineering',intro:'I think about backend systems in terms of scale, failure, latency, and recovery—how work moves through a system, what happens when components fail, and how to keep pipelines reliable as load grows.',highlights:[['Samsung R&D','Reliable asynchronous execution','Engineered production workflows with asynchronous processing, parallel execution, controlled batching, prioritised workloads, retries, exponential backoff, and failure handling. Added analytics and observability for an internal platform used by 500+ developers.'],['FinSight AI','Concurrent workflow orchestration','Designed a multi-agent orchestration backend with bounded concurrency and parallel task execution. Added evidence validation, failure isolation, controlled retries, and workflow-level coordination for predictable execution.'],['Sequalize','Performance & latency engineering','Reworked asynchronous backend workflows and contextual retrieval paths, reducing retrieval latency by approximately 45% through improved service integration and execution flow.']],skills:['Distributed Systems','Concurrency','Asynchronous Processing','Parallel Execution','Workflow Orchestration','Message Queues','Event-Driven Architecture','Dead-Letter Queues','Controlled Batching','Retry Strategies','Exponential Backoff','Failure Isolation','Fault Tolerance','Caching','Rate Limiting','Load Management','Observability','Logging','Monitoring','CI/CD','Latency Optimisation','Performance Engineering']},
 {id:'devops',number:'04',label:'DevOps & Cloud',title:'DevOps & Cloud',intro:'Building and deploying production systems with reliability, scalability, automation, and operational visibility—from cloud-backed services to deployment pipelines and production iteration. Build → Automate → Observe → Improve.',highlights:[['Samsung R&D','Cloud-backed engineering','Worked on cloud-backed backend infrastructure and distributed workflows, integrating caching, asynchronous processing, service coordination, and observability for an internal engineering platform.'],['FinSight AI','Containerisation & deployment','Containerised backend services with Docker and deployed full-stack workloads across Vercel and Render, working through environment configuration, service integration, and production deployment.'],['What The Food','Production engineering','Worked across deployment and production iteration for a live consumer-facing platform, taking features from development through deployment and adapting systems based on real-world behaviour.']],skills:['AWS','AWS Lambda','Amazon S3','SQS','DynamoDB','CloudWatch','Azure','Azure Functions','Azure Storage','Azure Monitor','Docker','Kubernetes','CI/CD','Linux / Unix','Git','Vercel','Render','Environment Configuration','Deployment Pipelines','Cloud Services','Production Operations']},
 {id:'frontend',number:'05',label:'Frontend',title:'Frontend & Mobile Engineering',intro:'Building responsive web and mobile applications with clean interfaces, reusable components, API integration, and reliable product workflows.',highlights:[['What The Food','Software Engineer','Built and iterated on web and mobile product experiences using React and Flutter across meal planning, health tracking, subscriptions, and consultation workflows. Integrated frontend experiences with backend services and application APIs.'],['Sequalize','Software Developer Intern','Developed responsive frontend screens, integrated REST APIs, handled application state and data flows, and refined user workflows across the product.'],['Other Projects','Campus Connect · Habitue · MedLink','Built and shipped mobile-first product interfaces using Flutter / Dart, connecting user-facing workflows with backend APIs, authentication, data, and application services.']],skills:['Angular','React','Next.js','TypeScript','JavaScript','Flutter','Dart','Vite','REST APIs','API Integration','State Management','Responsive Design','Reusable Components','Cross-Platform Development','Web Applications','Mobile Applications','Git']}
];
const particles = Array.from({ length: 46 }, (_, index) => ({ id: index, x: (index * 37 + 11) % 100, y: (index * 61 + 7) % 100, size: index % 9 === 0 ? 5 : index % 4 === 0 ? 3 : 2, delay: (index % 8) * .55, duration: 7 + (index % 7) * 1.25 }));

function EngineeringShowcase(){ const [active,setActive]=useState(0); const pillar=engineeringPillars[active]; return <section id="systems" className="engineering-showcase" aria-labelledby="engineering-showcase-title"><Label>ENGINEERING FOCUS</Label><h2 id="engineering-showcase-title">BACKEND · AI · SYSTEMS · DEVOPS</h2><p className="showcase-lead">Five engineering pillars, ordered by depth. Each is backed by production work, not coursework. <strong>I believe the more hands-on we are, the more we learn and grow as engineers.</strong></p><div className="showcase-tabs" role="tablist" aria-label="Engineering pillars">{engineeringPillars.map((item,index)=><button key={item.id} role="tab" aria-selected={active===index} className={active===index?'active':''} onClick={()=>setActive(index)}><small>{item.number}</small>{item.label}</button>)}</div><AnimatePresence mode="wait"><motion.div key={pillar.id} className="showcase-panel" role="tabpanel" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:.2}}><div className="showcase-panel-head"><span>{pillar.number} / 05</span><h3>{pillar.title}</h3><p>{pillar.intro}</p></div><div className="showcase-cards">{pillar.highlights.map(([company,role,detail])=><article key={company}><h4>{company}</h4><b>{role}</b><p>{detail}</p></article>)}</div><div className="showcase-skills">{pillar.skills.map((skill,index)=><span key={`${skill}-${index}`}>{skill}</span>)}</div></motion.div></AnimatePresence></section>}

function jump(id:string) { document.getElementById(id==='contact me'?'contact':id)?.scrollIntoView({behavior:'smooth'}); }
function useMounted(){ const [mounted,setMounted]=useState(false); useEffect(()=>setMounted(true),[]); return mounted; }
function Label({children}:{children:string}) { return <div className="label">// {children}</div> }
function LinkButton({href,children,solid=false}:{href:string,children:React.ReactNode,solid?:boolean}) { return <a className={'button '+(solid?'solid':'')} href={href} target={href.startsWith('http')?'_blank':undefined} rel="noreferrer">{children}<ArrowUpRight size={15}/></a> }
function ContactForm(){const [status,setStatus]=useState('');const send=(event:FormEvent<HTMLFormElement>)=>{event.preventDefault();const form=new FormData(event.currentTarget);const name=String(form.get('name')||'');const email=String(form.get('email')||'');const subject=String(form.get('subject')||'Portfolio enquiry');const message=String(form.get('message')||'');window.location.href=`mailto:aashigarg975@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;setStatus('Your email app is opening with the message prefilled.');};return <form className="contact-form" onSubmit={send}><h3>Send me a message</h3><div className="contact-form-row"><label>Your name<input name="name" required placeholder="John Doe"/></label><label>Your email<input name="email" type="email" required placeholder="john@example.com"/></label></div><label>Subject<input name="subject" required placeholder="Project inquiry"/></label><label>Your message<textarea name="message" required placeholder="Hello, I’d like to talk about…" rows={6}/></label><button type="submit"><Mail size={17}/> SEND MESSAGE <ArrowUpRight size={15}/></button>{status&&<p className="contact-form-status">{status}</p>}</form>}
function Reveal({children}:{children:React.ReactNode}) { const mounted=useMounted(),reduce=useReducedMotion(); return <motion.div initial={!mounted||reduce?false:{opacity:0,y:22}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.16}} transition={{duration:.55}}>{children}</motion.div> }
function Architecture({title,nodes,descriptions,compact=false}:{title:string,nodes:string[],descriptions:string[],compact?:boolean}) { const [active,setActive]=useState(0); return <div className={'architecture '+(compact?'compact':'')}><div className="diagram-title"><span className="pulse"/> {title}</div><div className="nodes">{nodes.map((node,i)=><div className="node-wrap" key={node}><button onClick={()=>setActive(i)} className={'node '+(active===i?'active':'')} aria-label={`Explain ${node}`}>{node}</button>{i<nodes.length-1&&<span className="connector">↓</span>}</div>)}</div><p className="node-detail">{descriptions[active]}</p></div> }
function HeroSystem() { const nodes=['REQUEST','API','SERVICE','QUEUE','WORKERS','CACHE / DB','AI PROCESSING','OBSERVABILITY','RESPONSE']; return <div className="hero-system"><div className="sys-caption"><span className="pulse"/> LIVE SYSTEM MODEL <span>01 / 01</span></div><div className="hero-flow">{nodes.map((n,i)=><div key={n} className="hero-node-wrap"><div className={'hero-node n'+i}>{n}</div>{i<nodes.length-1&&<i>↓</i>}</div>)}</div><div className="system-foot"><span>LATENCY: OBSERVED</span><span>FAILURE: DESIGNED FOR</span></div></div> }
function ParticleField(){ const mounted=useMounted(),reduce=useReducedMotion(); return <><div className="particle-field" aria-hidden="true">{particles.map(p=><motion.i key={p.id} className="particle" style={{left:`${p.x}%`,top:`${p.y}%`,width:p.size,height:p.size}} animate={mounted&&!reduce?{y:[0,-14,0],opacity:[.15,.62,.15],scale:[1,1.35,1]}:undefined} transition={{duration:p.duration,delay:p.delay,repeat:Infinity,ease:'easeInOut'}}/>)}</div><SideRail/><HeroMotif/></> }
function SystemAtlas(){ return <aside className="system-atlas" aria-label="Conceptual engineering system map"><div className="atlas-head"><span><i/> SYSTEMS ATLAS</span><b>LIVE / 01</b></div><div className="atlas-stage"><svg viewBox="0 0 420 420" aria-hidden="true"><circle cx="210" cy="210" r="153"/><circle cx="210" cy="210" r="108"/><circle cx="210" cy="210" r="61"/><path d="M73 134 210 210 337 104M95 298 210 210 350 281M210 57V363"/><path className="active-path" d="M73 134 210 210 350 281"/></svg><div className="atlas-core"><small>BUILD</small><b>01</b><small>ITERATE</small></div><span className="atlas-node node-api">API<br/><i>01</i></span><span className="atlas-node node-data">DATA<br/><i>02</i></span><span className="atlas-node node-ai">AI FLOW<br/><i>03</i></span><span className="atlas-node node-cloud">CLOUD<br/><i>04</i></span></div><div className="atlas-foot"><span><i/> OBSERVABLE</span><span>LATENCY <b>LOW</b></span></div></aside> }
function RotatingPromise(){ const words=['people.','the world.','you.','me.']; const [wordIndex,setWordIndex]=useState(0); const [count,setCount]=useState(0); const [removing,setRemoving]=useState(false); const mounted=useMounted(),reduce=useReducedMotion(); useEffect(()=>{if(!mounted)return;if(reduce){setCount(words[wordIndex].length);return} const word=words[wordIndex]; const delay=removing?42:count===word.length?1050:78; const timer=setTimeout(()=>{if(!removing&&count===word.length)setRemoving(true);else if(removing&&count===0){setRemoving(false);setWordIndex(i=>(i+1)%words.length)}else setCount(c=>c+(removing?-1:1))},delay);return()=>clearTimeout(timer)},[count,removing,wordIndex,reduce,mounted]); return <p className="rotating-promise"><span>Turning real-world problems into solutions for</span><span className="typed-wrap"><em>{words[wordIndex].slice(0,count)}</em></span></p> }
function HeroMotif(){ return <aside className="hero-motif" aria-label="Engineering approach"><div className="motif-number">01</div><svg viewBox="0 0 480 480" aria-hidden="true"><path d="M46 366C107 250 175 226 250 263S386 342 448 120"/><circle cx="46" cy="366" r="5"/><circle cx="250" cy="263" r="7"/><circle cx="448" cy="120" r="5"/></svg><div className="motif-label top"><span>01</span><b>CLARIFY</b></div><div className="motif-label mid"><span>02</span><b>BUILD</b></div><div className="motif-label end"><span>03</span><b>MEASURE</b></div><div className="motif-note"><span>ENGINEERING, IN PRACTICE</span><p>Find the signal.<br/>Make it reliable.</p></div></aside> }
function SideRail(){ return <aside className="side-rail" aria-label="Profile links"><a className="rail-brand" href="#top">AASHI <b>GARG</b><i>.</i></a><div className="rail-line rail-line-top"/><span className="rail-orbit orbit-one"/><span className="rail-orbit orbit-two"/><div className="rail-links"><a href={git} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={25}/></a><a href={linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={25}/></a><a href="mailto:aashigarg975@gmail.com" aria-label="Email Aashi Garg"><Mail size={27}/></a></div><div className="rail-line rail-line-bottom"/><span className="rail-orbit orbit-bottom"/></aside> }
function Terminal() { const [lines,setLines]=useState<string[]>(['Type “help” to inspect this portfolio.']); const [value,setValue]=useState(''); const input=useRef<HTMLInputElement>(null); const run=(e:FormEvent)=>{e.preventDefault(); const cmd=value.trim().toLowerCase(); const map:Record<string,string>={help:'about · stack · work · projects · systems · github · contact · clear',about:'Backend + AI Engineer\nBuilding scalable systems, agentic workflows,\nand reliable infrastructure.',stack:'Python · Java · FastAPI · Spring Boot · Node.js · Angular\nPostgreSQL · Redis · Docker · Kubernetes · AWS\nLLMs · RAG',work:'Samsung R&D → Sequalize → What The Food',projects:'FinSight AI · LogLens AI · Campus Connect · MedLink · Habitue',systems:'Async jobs · Agent pipelines · Production APIs · Cloud delivery',github:git,contact:'LinkedIn: '+linkedin}; if(cmd==='clear') setLines([]); else setLines(l=>[...l,`aashi@portfolio:~$ ${value}`,map[cmd]??`command not found: ${cmd}`]); setValue('');}; return <div className="terminal" onClick={()=>input.current?.focus()}><div className="terminal-bar"><span/><span/><span/><b>terminal — aashi@portfolio</b></div><div className="terminal-content">{lines.map((l,i)=><pre key={i}>{l}</pre>)}<form onSubmit={run}><span>aashi@portfolio:~$</span><input ref={input} value={value} onChange={e=>setValue(e.target.value)} aria-label="Terminal command" autoCapitalize="none" autoComplete="off"/><i/></form></div></div> }
function CommandPalette({open,close}:{open:boolean,close:()=>void}) { const choices=[...nav.map(x=>[`Go to ${x[0]+x.slice(1).toLowerCase()}`,()=>jump(x.toLowerCase())]),['Open GitHub',()=>window.open(git,'_blank')],['Open LinkedIn',()=>window.open(linkedin,'_blank')],['Contact Aashi',()=>jump('contact')]]; return <AnimatePresence>{open&&<motion.div className="palette-back" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onMouseDown={close}><motion.div className="palette" initial={{scale:.96,y:-10}} animate={{scale:1,y:0}} exit={{scale:.96,y:-10}} onMouseDown={e=>e.stopPropagation()}><div className="palette-head"><Command size={17}/> COMMAND CENTER <kbd>ESC</kbd></div>{choices.map(([label,action])=><button key={label as string} onClick={()=>{(action as ()=>void)();close()}}>{label as string}<span>↵</span></button>)}</motion.div></motion.div>}</AnimatePresence> }
export default function Page(){ const [menu,setMenu]=useState(false),[palette,setPalette]=useState(false); useEffect(()=>{const h=(e:KeyboardEvent)=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();setPalette(true)}if(e.key==='Escape'){setPalette(false);setMenu(false)}};addEventListener('keydown',h);return()=>removeEventListener('keydown',h)},[]); return <>
<style>{`:root{--accent:#c2ad8c;--paper:#f4f2ee;--line:#3b352d}`}</style>
<header><a className="brand" href="#top">PORTFOLIO<span> / 2026</span></a><nav>{nav.map(n=><button key={n} onClick={()=>jump(n.toLowerCase())}>{n}</button>)}</nav><div className="header-actions"><a className="header-resume" href="https://drive.google.com/file/d/1K3BE7YP9tG9YnKmUBEPqwLQyUcEy59BA/view?usp=sharing" target="_blank" rel="noreferrer">VIEW RESUME <ArrowUpRight size={14}/></a><button className="command-key" onClick={()=>setPalette(true)} aria-label="Open command palette"><Command size={16}/><span>K</span></button></div><button className="menu-btn" onClick={()=>setMenu(!menu)} aria-label="Toggle menu">{menu?<X/>:<Menu/>}</button></header>
<AnimatePresence>{menu&&<motion.div className="mobile-menu" initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}}>{nav.map(n=><button key={n} onClick={()=>{jump(n.toLowerCase());setMenu(false)}}>{n}</button>)}<a href={git}>GITHUB ↗</a><a href={linkedin}>LINKEDIN ↗</a></motion.div>}</AnimatePresence>
<main id="top"><section className="hero hero-human"><ParticleField/><div className="hero-copy"><div className="availability"><span/> AVAILABLE FOR ENGINEERING OPPORTUNITIES · 2026</div><p className="intro-line">HELLO, I’M</p><h1 className="name-lockup">Aashi Garg<span>.</span></h1><RotatingPromise/><p className="hero-statement">I don’t wait for a roadmap to start. I turn ambiguous problems into dependable software by breaking complex work into smaller systems, finding the real bottleneck, building the simplest useful solution, measuring it, and iterating.</p><div className="domains"><span>Backend engineering</span><span>AI systems</span><span>Cloud infrastructure</span></div><div className="actions"><LinkButton solid href="#work">EXPLORE MY WORK</LinkButton><LinkButton href={git}>VIEW GITHUB</LinkButton></div></div></section>
<section id="about" className="about"><Label>ABOUT</Label><Reveal><div className="about-grid"><h2>ENGINEERED FOR<br/><em>HARD PROBLEMS.</em></h2><div><p className="lead">I build backend systems and AI workflows where correctness, latency, and failure handling matter.</p><p>My work spans APIs, data systems, agentic AI, distributed execution, and cloud infrastructure. I enjoy getting close to the operational details: tracing bottlenecks, designing for retries, and turning ambiguous requirements into systems that can be understood and maintained.</p><div className="about-sign"><span>BASED IN</span> INDIA <span>FOCUS</span> BACKEND × AI</div></div></div></Reveal></section>
<section className="metrics">{metrics.map(m=><Reveal key={m[1]}><div className="metric"><strong>{m[0]}</strong><b>{m[1]}</b><small>{m[2]}</small></div></Reveal>)}</section>
<section id="work" className="work">
  <Label>EXPERIENCE</Label>

  <Reveal>
    <h2>
      WHERE I’VE <em>BUILT.</em>
    </h2>
  </Reveal>

  <div className="timeline">

    <Experience
      num="01"
      company="SAMSUNG R&D"
      role="Software Engineer Intern"
      date="JAN 2026 → JUL 2026"
      location="NOIDA, INDIA"
      featured
      text="Engineered production systems across agentic AI, backend services, distributed execution, security, and high-throughput processing for enterprise engineering workflows."
      chips={[
        'AGENTIC AI',
        'JAVA',
        'SPRING BOOT',
        'DISTRIBUTED SYSTEMS',
        'POSTGRESQL',
        'REDIS',
        'RBAC',
        'JWT',
        'DOCKER',
        'KUBERNETES'
      ]}
      bullets={[
        'Architected an LLM-powered agentic test-automation platform combining RAG, MCP, AST-based code analysis, code-diff analysis, and automated test generation.',
        'Scaled the platform to 500+ engineers, reducing test-authoring effort by ~60% and test setup time by ~81%.',
        'Engineered fault-tolerant, distributed workflows for automated test validation using asynchronous and parallel execution, controlled batching, retries, and exponential backoff; reduced processing time for 160+ files from 20 minutes to 7–8 minutes, achieving 60–65% lower latency and 2.5× higher throughput while ensuring reliability.',
        'Architected the VXT platform backend for CMS services using Spring Boot, Redis, PostgreSQL, Docker, and Kubernetes; optimized data access and caching strategies to improve API performance by 40%.',
        'Worked across containerised and distributed workloads using Docker and Kubernetes, with emphasis on reliability, scalability, observability, and deployment.'
      ]}
    />

    <Experience
      num="02"
      company="SEQUALIZE"
      role="Software Developer Intern"
      date="JAN 2025 → MAY 2025"
      location="REMOTE"
      text="Built backend services and AI-powered workflows for an event-management platform, spanning APIs, data systems, integrations, and intelligent automation."
      chips={[
        'NODE.JS',
        'FASTAPI',
        'PYTHON',
        'POSTGRESQL',
        'MONGODB',
        'REST APIs',
        'FIREBASE',
        'LLMs',
        'EMBEDDINGS'
      ]}
      bullets={[
        'Delivered 15+ production features across backend services, REST APIs, event workflows, integrations, and data-driven product functionality.',
        'Designed backend services using Node.js and FastAPI with PostgreSQL, MongoDB, and Firebase across transactional and application workflows.',
        'Engineered a Python-based automated support system using LLMs, embeddings, and semantic retrieval, reducing response latency by ~45%.',
        'Integrated AI workflows with backend services, connecting retrieval, application logic, APIs, and data layers into an end-to-end automation pipeline.'
      ]}
    />

    <Experience
      num="03"
      company="WHAT THE FOOD"
      role="Software Developer Intern"
      date="NOV 2024 → FEB 2025"
      location="IIT-BHU INCUBATED STARTUP"
      liveLink="https://www.whatthefood.in/"
      text="Engineered backend and product workflows for a live AI-powered food-tech platform, taking features from architecture and implementation through deployment and real-world usage."
      chips={[
        'BACKEND ENGINEERING',
        'REST APIs',
        'PYTHON',
        'POSTGRESQL',
        'AI',
        'CLOUD',
        'DEPLOYMENT'
      ]}
      bullets={[
        'Engineered backend workflows supporting meal planning, subscriptions, vendor operations, health features, and user-facing product journeys.',
        'Designed data architecture with separate workflows and databases for vendor operations and local-user experiences, maintaining clear domain boundaries.',
        'Built and integrated REST APIs, AI-powered functionality, and backend services across the product stack.',
        'Worked across architecture, implementation, cloud deployment, and production rollout, translating evolving product requirements into reliable software.',
        'Contributed to a live consumer-facing product, iterating across engineering, product requirements, deployment, and real-world usage.'
      ]}
    />

  </div>
</section>
<EngineeringShowcase/>
<section id="stack" className="stack"><Label>STACK</Label><Reveal><h2>THE TECH I<br/><em>WORK WITH.</em></h2></Reveal><div className="stack-list">{stacks.map(([n,title,items])=><Reveal key={title}><article><span>{n}</span><h3>{title}</h3><p>{items}</p><ArrowUpRight size={18}/></article></Reveal>)}</div></section>
<section id="projects" className="projects"><Label>PROJECTS</Label><Reveal><h2>MY <em>PROJECTS.</em></h2><p className="projects-lead">Hands-on work across AI systems, backend services, and mobile product engineering.</p></Reveal><div className="strong-project-grid">{featuredProjects.map((project,index)=><StrongProject key={project.name} project={project} index={index}/>)}</div></section>
<section className="education"><Label>EDUCATION</Label><Reveal><h2>JC Bose University of Science and Technology, YMCA</h2><article><h3>B.Tech, Computer Science and Engineering</h3><span>2022 — 2026 · CGPA 8.85</span><b>RELEVANT COURSEWORK</b><div>{['Object-Oriented Programming','Data Structures','Algorithms','Operating Systems','Software Engineering','Database Management Systems','Computer Networks'].map(course=><i key={course}>{course}</i>)}</div></article></Reveal></section>
<section className="recognition"><Label>ACHIEVEMENTS</Label><Reveal><h2>Recognition &amp; problem solving</h2></Reveal><div className="recognition-grid">{[['FLIPKART GRiD','National Semifinalist','500K+ participants'],['MYNTRA HACKERRAMP','National Semifinalist','100K+ participants'],['ZENITH HACKATHON','3rd Prize','800+ participants'],['PROBLEM SOLVING','600+ DSA problems solved','Consistent practice']].map(x=><article key={x[0]}><b>{x[0]}</b><span>{x[1]}</span><small>{x[2]}</small></article>)}</div><div className="leetcode-card"><div><b>PROBLEM SOLVING</b><p>600+ data structures and algorithms problems solved, with consistent practice in problem decomposition and complexity analysis.</p></div><a href="https://leetcode.com/u/Aashigarg4169/" target="_blank" rel="noreferrer">VIEW LEETCODE <ArrowUpRight size={15}/></a></div></section>
<section className="notes"><div className="notes-copy"><Label>ENGINEERING NOTES</Label><h2>HOW I THINK<br/>ABOUT <em>BUILDING.</em></h2><p>Principles that guide the systems, workflows, and products I choose to build.</p><div className="notes-visual" aria-hidden="true"><span>INPUT</span><i/><span>BUILD</span><i/><span>OBSERVE</span><i/><span>IMPROVE</span><b>01</b></div></div><div className="notes-list">{[['BUILD FOR FAILURE.','Reliable systems anticipate retries, recovery, and imperfect inputs.'],['MEASURE BEFORE OPTIMIZING.','Find the bottleneck, establish a baseline, then improve what matters.'],['AI IS A SYSTEM, NOT JUST A MODEL.','Useful AI needs context, validation, observability, and clear boundaries.'],['CONCURRENCY IS A DESIGN DECISION.','Parallel work needs coordination, limits, and predictable failure handling.'],['PRODUCTION CHANGES “WORKING.”','Real users turn a demo into an operational responsibility.']].map(([title,detail],i)=><Reveal key={title}><article><span>0{i+1}</span><div><h3>{title}</h3><p>{detail}</p></div></article></Reveal>)}</div></section>
<section id="contact" className="contact"><Label>CONTACT</Label><Reveal><h2>LET’S BUILD SOMETHING<br/><em>THAT SHIPS.</em></h2><p>Open to software, backend, AI, systems, and platform engineering opportunities. Happy to talk through architecture, production systems, or a specific problem you’re solving.</p><div className="contact-links"><a href="mailto:aashigarg975@gmail.com"><Mail size={18}/><span>EMAIL</span><b>aashigarg975@gmail.com</b><ArrowUpRight size={15}/></a><a href={linkedin} target="_blank" rel="noreferrer"><Linkedin size={18}/><span>LINKEDIN</span><b>/in/aashi4169</b><ArrowUpRight size={15}/></a><a href={git} target="_blank" rel="noreferrer"><Github size={18}/><span>GITHUB</span><b>aashi615</b><ArrowUpRight size={15}/></a><a href="https://leetcode.com/u/Aashigarg4169/" target="_blank" rel="noreferrer"><TerminalSquare size={18}/><span>LEETCODE</span><b>Aashigarg4169</b><ArrowUpRight size={15}/></a><a href="https://drive.google.com/file/d/1K3BE7YP9tG9YnKmUBEPqwLQyUcEy59BA/view?usp=sharing" target="_blank" rel="noreferrer"><ArrowDownRight size={18}/><span>RESUME</span><b>VIEW RESUME</b><ArrowUpRight size={15}/></a></div><div className="contact-me"><div className="contact-info"><span>CONTACT ME</span><h3>Let’s start a conversation.</h3><a href="tel:+918708108658"><Phone size={18}/><div><small>PHONE</small><b>+91 87081 08658</b></div><ArrowUpRight size={15}/></a><a href="https://wa.me/918708108658" target="_blank" rel="noreferrer"><MessageCircle size={18}/><div><small>WHATSAPP</small><b>+91 87081 08658</b></div><ArrowUpRight size={15}/></a><a href="https://maps.google.com/?q=Noida,India" target="_blank" rel="noreferrer"><MapPin size={18}/><div><small>LOCATION</small><b>Noida, India</b></div><ArrowUpRight size={15}/></a></div><ContactForm/></div></Reveal></section></main><footer><span>© 2026 AASHI GARG</span><span>BACKEND × AI × SYSTEMS</span><button onClick={()=>jump('top')}>BACK TO TOP ↑</button></footer><CommandPalette open={palette} close={()=>setPalette(false)}/></> }
function Experience({
  num,
  company,
  role,
  date,
  location,
  text,
  chips,
  bullets,
  featured = false,
  liveLink
}: {
  num: string
  company: string
  role: string
  date: string
  location: string
  text: string
  chips: string[]
  bullets: string[]
  featured?: boolean
  liveLink?: string
}) {
  return (
    <Reveal>
      <article className={'experience ' + (featured ? 'featured' : '')}>

        <div className="exp-meta">
          <span>{num}</span>
          <span>{date}</span>
          <span>{location}</span>
        </div>

        <div className="exp-main">

          <h3>{company}</h3>
          <h4>{role}</h4>

          <p>{text}</p>

          {liveLink && (
            <a
              className="experience-live-link"
              href={liveLink}
              target="_blank"
              rel="noreferrer"
            >
              VIEW LIVE PRODUCT <ArrowUpRight size={14} />
            </a>
          )}

          <div className="chips">
            {chips.map(chip => (
              <span key={chip}>{chip}</span>
            ))}
          </div>

          <ul>
            {bullets.map(bullet => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>

        </div>
      </article>
    </Reveal>
  )
}
function ProjectFeature({number,tag,name,description,nodes,source,reverse=false}:{number:string,tag:string,name:string,description:string,nodes:string[],source:string,reverse?:boolean}){return <Reveal><article className={'project-feature '+(reverse?'reverse':'')}><div className="project-copy"><span>{number} · {tag}</span><h3>{name}</h3><p>{description}</p><div className="actions"><LinkButton href={source}>VIEW SOURCE</LinkButton><LinkButton href="#systems">CASE STUDY</LinkButton></div></div><Architecture title={name.toUpperCase()+' · FLOW'} nodes={nodes} descriptions={nodes.map(n=>`${n}: an intentionally high-level stage in this system view.`)}/></article></Reveal>}
function StrongProject({project,index}:{project:typeof featuredProjects[number],index:number}){if(project.featured)return <Reveal><article className="strong-project featured-project"><span>0{index+1} · {project.tag}</span><h3>{project.name}</h3><p>{project.description}</p><div className="strong-project-links"><a className="live" href={project.live} target="_blank" rel="noreferrer">LIVE DEMO <ArrowUpRight size={15}/></a><a href={project.source} target="_blank" rel="noreferrer">SOURCE CODE <Github size={14}/></a></div><div className="finsight-architecture"><span>MULTI-AGENT ARCHITECTURE</span><div className="finsight-flow">{['QUERY','PLANNER','RESEARCH AGENTS','SYNTHESIZER','EVIDENCE-BACKED REPORT'].map((node,i)=><div key={node}><b>{node}</b>{i<4&&<i>→</i>}</div>)}</div><div className="finsight-agents"><b>MARKET RESEARCH AGENT</b><b>NEWS RESEARCH AGENT</b><b>DOCUMENT RESEARCH AGENT</b></div></div><div className="finsight-detail"><div><span>ENGINEERING HIGHLIGHTS</span><ul>{project.highlights.map(highlight=><li key={highlight}>{highlight}</li>)}</ul></div><div><span>STACK</span><div className="strong-project-stack">{project.stack.map(item=><i key={item}>{item}</i>)}</div></div></div></article></Reveal>;return <Reveal><article className="strong-project"><span>0{index+1} · {project.tag}</span><h3>{project.name}</h3><p>{project.description}</p><ul>{project.highlights.map(highlight=><li key={highlight}>{highlight}</li>)}</ul><div className="strong-project-stack">{project.stack.map(item=><i key={item}>{item}</i>)}</div><div className="strong-project-links"><a href={project.source} target="_blank" rel="noreferrer">SOURCE CODE <Github size={14}/></a></div></article></Reveal>}
