import { useState } from "react";
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import {
  LayoutDashboard, FileText, Users, Tag, MessageSquare, Mail,
  Bell, Search, Eye, Plus, ArrowUpRight, ArrowDownRight,
  Edit2, Trash2, LogOut, CheckCircle, Clock, Shield,
  ChevronRight, Flame, TrendingUp, PenLine, UserCheck,
  BarChart2, Menu, Star,
} from "lucide-react";

// ── DESIGN TOKENS ──────────────────────────────────────────────────────────
const R   = "#E8000D";   // JESTV Red
const BK  = "#0A0A0A";   // Black
const SB  = "#0D0D0D";   // Sidebar
const W   = "#FFFFFF";
const GR  = "#F4F4F4";   // Page bg
const MG  = "#888888";   // Muted
const BD  = "#E4E4E4";   // Border
const FD  = '"Bebas Neue", Impact, sans-serif';   // Display / headlines
const FB  = '"Barlow", "Helvetica Neue", sans-serif'; // Body / UI

// ── MOCK DATA ───────────────────────────────────────────────────────────────
const viewsData = [
  { day:"Mon", views:1240 }, { day:"Tue", views:1890 },
  { day:"Wed", views:1560 }, { day:"Thu", views:2340 },
  { day:"Fri", views:2890 }, { day:"Sat", views:3240 },
  { day:"Sun", views:2780 },
];
const myViewsData = [
  { day:"Mon", views:340 }, { day:"Tue", views:520 },
  { day:"Wed", views:410 }, { day:"Thu", views:680 },
  { day:"Fri", views:890 }, { day:"Sat", views:760 },
  { day:"Sun", views:921 },
];
const categoryData = [
  { name:"Match Rep.",  views:4200 },
  { name:"Transfers",   views:3100 },
  { name:"Opinion",     views:1800 },
  { name:"Interviews",  views:2400 },
  { name:"Fixtures",    views:900  },
];
const myCategoryData = [
  { name:"Match Rep.",  views:3200 },
  { name:"Interviews",  views:2341 },
  { name:"Opinion",     views:1321 },
];
const ARTICLES = [
  { id:1, title:"Gor Mahia Clinch Title With Stunning 3-0 Win Over AFC Leopards", category:"Match Reports", author:"James Ochieng",  status:"published", views:4521, date:"19 Mar 2026", bg:"#0f1b36" },
  { id:2, title:"Victor Wanyama Returns to KPL — Official Confirmation",            category:"Transfers",    author:"Amina Said",    status:"published", views:8932, date:"18 Mar 2026", bg:"#1a0a2e" },
  { id:3, title:"Why Kenya WILL Qualify for AFCON 2027",                            category:"Opinion",      author:"Kevin Mwangi",  status:"draft",     views:0,    date:"17 Mar 2026", bg:"#2d0000" },
  { id:4, title:"AFC Leopards New Signing: Full Press Conference Transcript",        category:"Interviews",   author:"James Ochieng",  status:"published", views:2341, date:"16 Mar 2026", bg:"#0a2d0a" },
  { id:5, title:"Premier League GW29: Full Results & Highlights",                   category:"Match Reports", author:"Amina Said",    status:"published", views:6102, date:"15 Mar 2026", bg:"#0f1b36" },
];
const WRITERS = [
  { id:1, name:"James Ochieng", email:"james@jestvsports.com", articles:24, status:"active",  joined:"Jan 2026", ini:"JO" },
  { id:2, name:"Amina Said",    email:"amina@jestvsports.com", articles:18, status:"active",  joined:"Feb 2026", ini:"AS" },
  { id:3, name:"Kevin Mwangi",  email:"kevin@jestvsports.com", articles:9,  status:"active",  joined:"Mar 2026", ini:"KM" },
  { id:4, name:"Fatuma Hassan", email:"fatuma@jestvsports.com",articles:5,  status:"revoked", joined:"Feb 2026", ini:"FH" },
];
const TICKER = "Gor Mahia clinch KPL title with 3-0 win  •  Victor Wanyama confirmed for KPL return  •  Harambee Stars AFCON 2027 qualifying squad named  •  Man City vs Arsenal match preview  •  Chelsea agree €45M deal for Michael Otieno  •  ";
const CAT_COLORS = { "Match Reports":"#E8000D", Transfers:"#FF6B00", Opinion:"#7B2FBE", Interviews:"#0066CC", Fixtures:"#00875A" };

// ── ATOMS ──────────────────────────────────────────────────────────────────
const CatBadge = ({ cat }) => (
  <span style={{ background: CAT_COLORS[cat]||R, color:W, fontFamily:FB, fontSize:"10px", fontWeight:"700", letterSpacing:"0.1em", textTransform:"uppercase", padding:"3px 8px", borderRadius:"2px" }}>
    {cat}
  </span>
);

const StatusPill = ({ s }) => (
  <span style={{
    background: s==="published"?"#ECFDF5": s==="draft"?"#FFF7ED":"#FEF2F2",
    color:      s==="published"?"#065F46": s==="draft"?"#9A3412":"#991B1B",
    fontFamily:FB, fontSize:"11px", fontWeight:"600", padding:"3px 10px", borderRadius:"20px",
    display:"inline-flex", alignItems:"center", gap:"4px",
  }}>
    {s==="published"?<CheckCircle size={10}/>:<Clock size={10}/>} {s}
  </span>
);

const KPI = ({ icon, label, value, change, up=true, accent=R }) => (
  <div style={{ background:W, borderRadius:"8px", padding:"20px", border:`1px solid ${BD}`, flex:1, minWidth:0 }}>
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
      <div style={{ width:"40px",height:"40px",borderRadius:"8px",background:`${accent}18`,display:"flex",alignItems:"center",justifyContent:"center" }}>
        {icon}
      </div>
      <span style={{ display:"flex",alignItems:"center",gap:"3px",fontFamily:FB,fontSize:"12px",fontWeight:"600",color:up?"#065F46":"#991B1B",background:up?"#ECFDF5":"#FEF2F2",padding:"3px 8px",borderRadius:"20px" }}>
        {up?<ArrowUpRight size={12}/>:<ArrowDownRight size={12}/>} {change}
      </span>
    </div>
    <p style={{ fontFamily:FB,fontSize:"12px",color:MG,margin:"16px 0 4px" }}>{label}</p>
    <p style={{ fontFamily:FD,fontSize:"34px",color:BK,margin:0,letterSpacing:"0.02em",lineHeight:1 }}>{value}</p>
  </div>
);

// Gradient placeholder card "image"
const ImgCard = ({ bg, children, h="100%" }) => (
  <div style={{ background:bg, width:"100%", height:h, position:"relative", overflow:"hidden", display:"flex", flexDirection:"column", justifyContent:"flex-end", padding:"14px" }}>
    {/* grid texture */}
    <div style={{ position:"absolute",inset:0,backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 44px,rgba(255,255,255,0.04) 44px,rgba(255,255,255,0.04) 45px),repeating-linear-gradient(90deg,transparent,transparent 44px,rgba(255,255,255,0.04) 44px,rgba(255,255,255,0.04) 45px)" }}/>
    {/* bottom fade */}
    <div style={{ position:"absolute",inset:0,background:"linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.25) 55%, transparent 100%)" }}/>
    <div style={{ position:"relative",zIndex:1 }}>{children}</div>
  </div>
);

// ── SIDEBAR ─────────────────────────────────────────────────────────────────
function Sidebar({ items, active, set, user, sub }) {
  return (
    <div style={{ background:SB, width:"220px", minHeight:"100vh", flexShrink:0, display:"flex", flexDirection:"column", borderRight:"1px solid rgba(255,255,255,0.06)" }}>
      {/* Logo */}
      <div style={{ padding:"22px 20px", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
          <div style={{ background:R, width:"5px", height:"30px", borderRadius:"1px", flexShrink:0 }}/>
          <div>
            <div style={{ fontFamily:FD, fontSize:"20px", color:W, letterSpacing:"0.05em", lineHeight:1 }}>JESTV <span style={{ color:R }}>SPORTS</span></div>
            <div style={{ fontFamily:FB, fontSize:"10px", color:MG, marginTop:"3px", letterSpacing:"0.12em", textTransform:"uppercase" }}>{sub}</div>
          </div>
        </div>
      </div>
      {/* Nav */}
      <div style={{ flex:1, padding:"14px 10px" }}>
        {items.map(it=>(
          <button key={it.k} onClick={()=>set(it.k)} style={{
            width:"100%", display:"flex", alignItems:"center", gap:"10px",
            padding:"10px 12px", borderRadius:"6px", border:"none", cursor:"pointer",
            marginBottom:"2px",
            background: active===it.k ? `${R}22` : "transparent",
            color:       active===it.k ? R : "#AAAAAA",
            fontFamily:FB, fontWeight: active===it.k?"600":"400",
            fontSize:"14px", textAlign:"left",
          }}>
            {it.icon} {it.label}
            {it.badge && <span style={{ marginLeft:"auto", background:R, color:W, fontSize:"10px", fontWeight:"700", padding:"2px 7px", borderRadius:"10px" }}>{it.badge}</span>}
          </button>
        ))}
      </div>
      {/* User */}
      <div style={{ padding:"16px 20px", borderTop:"1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"12px" }}>
          <div style={{ width:"36px",height:"36px",borderRadius:"50%",background:R,display:"flex",alignItems:"center",justifyContent:"center",color:W,fontWeight:"700",fontSize:"13px",fontFamily:FB }}>{user.ini}</div>
          <div>
            <p style={{ fontFamily:FB,fontWeight:"600",fontSize:"13px",color:W,margin:0 }}>{user.name}</p>
            <p style={{ fontFamily:FB,fontSize:"11px",color:MG,margin:0 }}>{user.role}</p>
          </div>
        </div>
        <button style={{ display:"flex",alignItems:"center",gap:"8px",color:MG,fontFamily:FB,fontSize:"13px",border:"none",background:"none",cursor:"pointer",padding:0 }}>
          <LogOut size={14}/> Sign out
        </button>
      </div>
    </div>
  );
}

// ── PUBLIC SITE ─────────────────────────────────────────────────────────────
function PublicSite() {
  const [activeCat, setActiveCat] = useState("KPL");
  const cats = ["KPL","Premier League","Champions League","La Liga","Transfers","Opinion","Interviews"];
  const hero = ARTICLES[0];
  const sec  = ARTICLES.slice(1,3);
  const small= ARTICLES.slice(0,4);

  return (
    <div style={{ background:GR, fontFamily:FB, minHeight:"100vh" }}>
      {/* Top Nav */}
      <nav style={{ background:BK, borderBottom:`3px solid ${R}` }}>
        <div style={{ maxWidth:"1180px", margin:"0 auto", padding:"0 20px" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", height:"58px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
              <div style={{ background:R, width:"7px", height:"38px", borderRadius:"1px" }}/>
              <span style={{ fontFamily:FD, fontSize:"26px", color:W, letterSpacing:"0.06em" }}>JESTV <span style={{ color:R }}>SPORTS</span></span>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:"18px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"8px", background:"rgba(255,255,255,0.08)", borderRadius:"4px", padding:"6px 12px" }}>
                <Search size={14} color={MG}/>
                <span style={{ fontFamily:FB, fontSize:"13px", color:MG }}>Search articles…</span>
              </div>
              <button style={{ background:R, color:W, fontFamily:FB, fontWeight:"700", fontSize:"12px", letterSpacing:"0.08em", padding:"9px 22px", border:"none", cursor:"pointer", textTransform:"uppercase" }}>SUBSCRIBE</button>
            </div>
          </div>
          {/* Category nav */}
          <div style={{ display:"flex", overflowX:"auto", paddingBottom:"0" }}>
            {cats.map((c,i)=>(
              <button key={c} onClick={()=>setActiveCat(c)} style={{
                color: activeCat===c ? R : "#CCCCCC",
                fontFamily:FB, fontWeight:"600", fontSize:"13px", letterSpacing:"0.05em",
                textTransform:"uppercase", padding:"11px 18px", border:"none",
                background:"transparent", cursor:"pointer", whiteSpace:"nowrap",
                borderBottom: activeCat===c ? `2px solid ${R}` : "2px solid transparent",
              }}>{c}</button>
            ))}
          </div>
        </div>
      </nav>

      {/* Breaking ticker */}
      <div style={{ background:R, display:"flex", alignItems:"center", height:"34px", overflow:"hidden" }}>
        <div style={{ background:"#980009", color:W, fontFamily:FB, fontWeight:"800", fontSize:"10px", letterSpacing:"0.15em", textTransform:"uppercase", padding:"0 16px", height:"100%", display:"flex", alignItems:"center", flexShrink:0 }}>
          🔴 LIVE
        </div>
        <div style={{ overflow:"hidden", flex:1 }}>
          <div style={{ display:"inline-block", whiteSpace:"nowrap", animation:"ticker 30s linear infinite", color:W, fontFamily:FB, fontWeight:"600", fontSize:"12px", letterSpacing:"0.03em", padding:"0 20px" }}>
            {TICKER+TICKER}
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth:"1180px", margin:"0 auto", padding:"20px 20px 40px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 288px", gap:"20px" }}>

          {/* LEFT: hero + secondary */}
          <div>
            {/* Hero */}
            <div style={{ height:"400px", borderRadius:"4px", overflow:"hidden", cursor:"pointer", marginBottom:"12px" }}>
              <ImgCard bg={hero.bg} h="400px">
                <CatBadge cat={hero.category}/>
                <h1 style={{ fontFamily:FD, fontSize:"38px", color:W, margin:"8px 0 10px", lineHeight:"1.05", letterSpacing:"0.02em" }}>
                  {hero.title.toUpperCase()}
                </h1>
                <div style={{ display:"flex", alignItems:"center", gap:"14px" }}>
                  <div style={{ width:"28px", height:"28px", borderRadius:"50%", background:R, display:"flex", alignItems:"center", justifyContent:"center", color:W, fontSize:"10px", fontWeight:"700", fontFamily:FB }}>JO</div>
                  <span style={{ color:"rgba(255,255,255,0.8)", fontSize:"13px" }}>{hero.author}</span>
                  <span style={{ color:"rgba(255,255,255,0.5)", fontSize:"13px" }}>2 hours ago</span>
                  <span style={{ color:"rgba(255,255,255,0.5)", fontSize:"13px", display:"flex", alignItems:"center", gap:"4px" }}><Eye size={13}/>{hero.views.toLocaleString()}</span>
                </div>
              </ImgCard>
            </div>

            {/* 2 secondary */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px", marginBottom:"28px" }}>
              {sec.map(a=>(
                <div key={a.id} style={{ height:"200px", borderRadius:"4px", overflow:"hidden", cursor:"pointer" }}>
                  <ImgCard bg={a.bg} h="200px">
                    <CatBadge cat={a.category}/>
                    <h3 style={{ fontFamily:FD, fontSize:"22px", color:W, margin:"6px 0 6px", lineHeight:"1.1", letterSpacing:"0.02em" }}>{a.title.toUpperCase()}</h3>
                    <div style={{ display:"flex", gap:"12px" }}>
                      <span style={{ color:"rgba(255,255,255,0.7)", fontSize:"12px" }}>{a.author}</span>
                      <span style={{ color:"rgba(255,255,255,0.5)", fontSize:"12px", display:"flex", alignItems:"center", gap:"3px" }}><Eye size={11}/>{a.views.toLocaleString()}</span>
                    </div>
                  </ImgCard>
                </div>
              ))}
            </div>

            {/* Latest header */}
            <div style={{ display:"flex", alignItems:"center", gap:"12px", borderBottom:`2px solid ${BK}`, paddingBottom:"10px", marginBottom:"16px" }}>
              <span style={{ fontFamily:FD, fontSize:"22px", color:BK, letterSpacing:"0.02em" }}>LATEST NEWS</span>
              <div style={{ flex:1, height:"1px", background:BD }}/>
              <button style={{ fontFamily:FB, fontSize:"12px", fontWeight:"700", color:R, border:"none", background:"none", cursor:"pointer", letterSpacing:"0.05em", display:"flex", alignItems:"center", gap:"4px" }}>
                VIEW ALL <ChevronRight size={13}/>
              </button>
            </div>

            {/* 4 small cards */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"14px" }}>
              {small.map(a=>(
                <div key={a.id} style={{ background:W, borderRadius:"4px", overflow:"hidden", cursor:"pointer" }}>
                  <div style={{ height:"110px" }}>
                    <ImgCard bg={a.bg} h="110px">
                      <CatBadge cat={a.category}/>
                    </ImgCard>
                  </div>
                  <div style={{ padding:"12px" }}>
                    <p style={{ fontFamily:FB, fontWeight:"700", fontSize:"13px", lineHeight:"1.4", color:BK, margin:"0 0 8px" }}>{a.title}</p>
                    <div style={{ display:"flex", justifyContent:"space-between" }}>
                      <span style={{ fontSize:"11px", color:MG }}>{a.author}</span>
                      <span style={{ fontSize:"11px", color:MG, display:"flex", alignItems:"center", gap:"3px" }}><Eye size={10}/>{a.views > 0 ? a.views.toLocaleString() : "Draft"}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: sidebar */}
          <div>
            {/* Trending */}
            <div style={{ background:W, borderRadius:"4px", overflow:"hidden", marginBottom:"16px" }}>
              <div style={{ background:BK, padding:"12px 16px", display:"flex", alignItems:"center", gap:"8px" }}>
                <Flame size={15} color={R}/>
                <span style={{ fontFamily:FB, fontWeight:"700", color:W, fontSize:"12px", letterSpacing:"0.1em", textTransform:"uppercase" }}>Trending Now</span>
              </div>
              {ARTICLES.map((a,i)=>(
                <div key={a.id} style={{ padding:"12px 16px", borderBottom:i<4?`1px solid ${BD}`:"none", display:"flex", gap:"12px", cursor:"pointer" }}>
                  <span style={{ fontFamily:FD, fontSize:"26px", color:i===0?R:"#DDDDDD", lineHeight:"1", flexShrink:0, width:"22px" }}>{i+1}</span>
                  <div>
                    <p style={{ fontFamily:FB, fontWeight:"600", fontSize:"13px", color:BK, lineHeight:"1.4", margin:"0 0 4px" }}>{a.title}</p>
                    <span style={{ fontSize:"11px", color:MG, display:"flex", alignItems:"center", gap:"4px" }}><Eye size={10}/>{a.views>0?a.views.toLocaleString():"Draft"}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Newsletter CTA */}
            <div style={{ background:BK, borderRadius:"4px", padding:"20px", marginBottom:"16px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"10px" }}>
                <Mail size={16} color={R}/>
                <span style={{ fontFamily:FD, fontSize:"18px", color:W, letterSpacing:"0.05em" }}>DAILY DIGEST</span>
              </div>
              <p style={{ fontFamily:FB, fontSize:"13px", color:"#AAAAAA", lineHeight:"1.5", margin:"0 0 14px" }}>Get the top Kenyan football stories every morning.</p>
              <div style={{ background:"rgba(255,255,255,0.08)", borderRadius:"3px", padding:"10px 14px", fontFamily:FB, fontSize:"13px", color:MG, marginBottom:"10px" }}>your@email.com</div>
              <button style={{ width:"100%", background:R, color:W, fontFamily:FB, fontWeight:"700", fontSize:"12px", letterSpacing:"0.08em", padding:"10px", border:"none", cursor:"pointer", textTransform:"uppercase", borderRadius:"3px" }}>
                SUBSCRIBE FREE
              </button>
            </div>

            {/* Ad */}
            <div style={{ background:"#EEEEEE", borderRadius:"4px", height:"250px", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", border:"1px dashed #CCCCCC" }}>
              <span style={{ fontSize:"10px", color:MG, letterSpacing:"0.12em", textTransform:"uppercase" }}>Advertisement</span>
              <span style={{ fontSize:"10px", color:"#CCCCCC", marginTop:"4px" }}>300 × 250</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── ADMIN DASHBOARD ─────────────────────────────────────────────────────────
function AdminDashboard() {
  const [active, setActive] = useState("dashboard");
  const nav = [
    { k:"dashboard", label:"Dashboard",   icon:<LayoutDashboard size={15}/> },
    { k:"articles",  label:"Articles",    icon:<FileText size={15}/>,    badge:"51" },
    { k:"writers",   label:"Writers",     icon:<Users size={15}/> },
    { k:"categories",label:"Categories",  icon:<Tag size={15}/> },
    { k:"comments",  label:"Comments",    icon:<MessageSquare size={15}/>, badge:"12" },
    { k:"subs",      label:"Subscribers", icon:<Mail size={15}/> },
    { k:"settings",  label:"Settings",    icon:<Shield size={15}/> },
  ];

  return (
    <div style={{ display:"flex", minHeight:"100vh", background:GR, fontFamily:FB }}>
      <Sidebar items={nav} active={active} set={setActive}
        user={{ name:"Admin", role:"Platform Admin", ini:"AD" }} sub="Admin Portal"/>

      <div style={{ flex:1, overflow:"auto" }}>
        {/* Topbar */}
        <div style={{ background:W, padding:"0 28px", height:"64px", display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:`1px solid ${BD}`, position:"sticky", top:0, zIndex:10 }}>
          <div>
            <h1 style={{ fontFamily:FD, fontSize:"22px", color:BK, margin:0, letterSpacing:"0.04em" }}>PLATFORM DASHBOARD</h1>
            <p style={{ fontFamily:FB, fontSize:"12px", color:MG, margin:0 }}>Thursday, 19 March 2026</p>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:"14px" }}>
            <button style={{ background:R, color:W, fontFamily:FB, fontWeight:"700", fontSize:"12px", letterSpacing:"0.06em", padding:"8px 18px", border:"none", cursor:"pointer", borderRadius:"4px", display:"flex", alignItems:"center", gap:"6px", textTransform:"uppercase" }}>
              <Plus size={13}/> Invite Writer
            </button>
            <div style={{ position:"relative", cursor:"pointer" }}>
              <Bell size={19} color={BK}/>
              <div style={{ position:"absolute", top:"-4px", right:"-4px", width:"8px", height:"8px", background:R, borderRadius:"50%"}}/>
            </div>
          </div>
        </div>

        <div style={{ padding:"28px" }}>
          {/* KPIs */}
          <div style={{ display:"flex", gap:"16px", marginBottom:"24px" }}>
            <KPI icon={<Eye size={17} color={R}/>}          label="Total Views (7d)"    value="15,924" change="12%" up={true}  accent={R}/>
            <KPI icon={<FileText size={17} color="#0066CC"/>} label="Articles Published"  value="51"     change="8%"  up={true}  accent="#0066CC"/>
            <KPI icon={<Users size={17} color="#7B2FBE"/>}   label="Active Writers"      value="3"      change="—"   up={true}  accent="#7B2FBE"/>
            <KPI icon={<Mail size={17} color="#00875A"/>}    label="Subscribers"         value="892"    change="24%" up={true}  accent="#00875A"/>
          </div>

          {/* Charts row */}
          <div style={{ display:"grid", gridTemplateColumns:"1.65fr 1fr", gap:"20px", marginBottom:"24px" }}>
            {/* Area chart */}
            <div style={{ background:W, borderRadius:"8px", padding:"20px", border:`1px solid ${BD}` }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"20px" }}>
                <div>
                  <h3 style={{ fontFamily:FB, fontWeight:"700", fontSize:"14px", color:BK, margin:"0 0 3px" }}>Platform Views</h3>
                  <p style={{ fontFamily:FB, fontSize:"12px", color:MG, margin:0 }}>Last 7 days</p>
                </div>
                <div style={{ display:"flex", gap:"6px" }}>
                  {["7d","30d","90d"].map((t,i)=>(
                    <button key={t} style={{ fontFamily:FB, fontSize:"11px", fontWeight:"600", padding:"4px 10px", borderRadius:"4px", cursor:"pointer", border:`1px solid ${i===0?R:BD}`, background:i===0?`${R}12`:"transparent", color:i===0?R:MG }}>{t}</button>
                  ))}
                </div>
              </div>
              <ResponsiveContainer width="100%" height={195}>
                <AreaChart data={viewsData}>
                  <defs>
                    <linearGradient id="aGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor={R} stopOpacity={0.18}/>
                      <stop offset="95%" stopColor={R} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0"/>
                  <XAxis dataKey="day" tick={{ fontFamily:FB, fontSize:11, fill:MG }} axisLine={false} tickLine={false}/>
                  <YAxis tick={{ fontFamily:FB, fontSize:11, fill:MG }} axisLine={false} tickLine={false}/>
                  <Tooltip contentStyle={{ fontFamily:FB, fontSize:12, border:`1px solid ${BD}`, borderRadius:"6px" }}/>
                  <Area type="monotone" dataKey="views" stroke={R} strokeWidth={2.5} fill="url(#aGrad)" dot={false} activeDot={{ r:5, fill:R }}/>
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Bar chart */}
            <div style={{ background:W, borderRadius:"8px", padding:"20px", border:`1px solid ${BD}` }}>
              <h3 style={{ fontFamily:FB, fontWeight:"700", fontSize:"14px", color:BK, margin:"0 0 3px" }}>Traffic by Category</h3>
              <p style={{ fontFamily:FB, fontSize:"12px", color:MG, margin:"0 0 20px" }}>All time</p>
              <ResponsiveContainer width="100%" height={195}>
                <BarChart data={categoryData} layout="vertical" barSize={11}>
                  <XAxis type="number" tick={{ fontFamily:FB, fontSize:10, fill:MG }} axisLine={false} tickLine={false}/>
                  <YAxis dataKey="name" type="category" tick={{ fontFamily:FB, fontSize:11, fill:MG }} axisLine={false} tickLine={false} width={75}/>
                  <Tooltip contentStyle={{ fontFamily:FB, fontSize:12, border:`1px solid ${BD}`, borderRadius:"6px" }}/>
                  <Bar dataKey="views" fill={R} radius={[0,4,4,0]}/>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Writers table */}
          <div style={{ background:W, borderRadius:"8px", border:`1px solid ${BD}`, overflow:"hidden" }}>
            <div style={{ padding:"16px 20px", borderBottom:`1px solid ${BD}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <h3 style={{ fontFamily:FB, fontWeight:"700", fontSize:"14px", color:BK, margin:0 }}>Writers</h3>
              <button style={{ background:BK, color:W, fontFamily:FB, fontWeight:"600", fontSize:"12px", padding:"6px 14px", border:"none", cursor:"pointer", borderRadius:"4px", display:"flex", alignItems:"center", gap:"6px" }}>
                <Plus size={12}/> Invite Writer
              </button>
            </div>
            <table style={{ width:"100%", borderCollapse:"collapse" }}>
              <thead>
                <tr style={{ background:"#FAFAFA" }}>
                  {["Writer","Email","Articles","Joined","Status","Action"].map(h=>(
                    <th key={h} style={{ padding:"10px 20px", textAlign:"left", fontFamily:FB, fontSize:"10px", fontWeight:"700", color:MG, letterSpacing:"0.1em", textTransform:"uppercase", borderBottom:`1px solid ${BD}` }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {WRITERS.map((w,i)=>(
                  <tr key={w.id} style={{ borderBottom:i<WRITERS.length-1?`1px solid ${BD}`:"none" }}>
                    <td style={{ padding:"14px 20px" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                        <div style={{ width:"34px",height:"34px",borderRadius:"50%",background:w.status==="active"?`${R}20`:"#F0F0F0",display:"flex",alignItems:"center",justifyContent:"center",color:w.status==="active"?R:MG,fontFamily:FB,fontWeight:"700",fontSize:"12px" }}>{w.ini}</div>
                        <span style={{ fontFamily:FB, fontWeight:"600", fontSize:"14px", color:BK }}>{w.name}</span>
                      </div>
                    </td>
                    <td style={{ padding:"14px 20px", fontFamily:FB, fontSize:"13px", color:MG }}>{w.email}</td>
                    <td style={{ padding:"14px 20px", fontFamily:FD, fontSize:"22px", color:BK, lineHeight:1 }}>{w.articles}</td>
                    <td style={{ padding:"14px 20px", fontFamily:FB, fontSize:"13px", color:MG }}>{w.joined}</td>
                    <td style={{ padding:"14px 20px" }}><StatusPill s={w.status}/></td>
                    <td style={{ padding:"14px 20px" }}>
                      <button style={{ padding:"5px 14px", background:w.status==="active"?"#FEF2F2":"#ECFDF5", color:w.status==="active"?"#991B1B":"#065F46", border:"none", cursor:"pointer", borderRadius:"4px", fontFamily:FB, fontSize:"12px", fontWeight:"600" }}>
                        {w.status==="active"?"Revoke":"Restore"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* All articles table */}
          <div style={{ background:W, borderRadius:"8px", border:`1px solid ${BD}`, overflow:"hidden", marginTop:"20px" }}>
            <div style={{ padding:"16px 20px", borderBottom:`1px solid ${BD}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <h3 style={{ fontFamily:FB, fontWeight:"700", fontSize:"14px", color:BK, margin:0 }}>All Articles</h3>
              <button style={{ background:R, color:W, fontFamily:FB, fontWeight:"600", fontSize:"12px", padding:"6px 14px", border:"none", cursor:"pointer", borderRadius:"4px", display:"flex", alignItems:"center", gap:"6px" }}>
                <Plus size={12}/> New Article
              </button>
            </div>
            <table style={{ width:"100%", borderCollapse:"collapse" }}>
              <thead>
                <tr style={{ background:"#FAFAFA" }}>
                  {["Title","Category","Author","Status","Views","Date","Actions"].map(h=>(
                    <th key={h} style={{ padding:"10px 20px", textAlign:"left", fontFamily:FB, fontSize:"10px", fontWeight:"700", color:MG, letterSpacing:"0.1em", textTransform:"uppercase", borderBottom:`1px solid ${BD}` }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ARTICLES.map((a,i)=>(
                  <tr key={a.id} style={{ borderBottom:i<ARTICLES.length-1?`1px solid ${BD}`:"none" }}>
                    <td style={{ padding:"13px 20px", maxWidth:"260px" }}>
                      <p style={{ fontFamily:FB, fontWeight:"600", fontSize:"13px", color:BK, margin:0, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{a.title}</p>
                    </td>
                    <td style={{ padding:"13px 20px" }}><CatBadge cat={a.category}/></td>
                    <td style={{ padding:"13px 20px", fontFamily:FB, fontSize:"13px", color:MG }}>{a.author}</td>
                    <td style={{ padding:"13px 20px" }}><StatusPill s={a.status}/></td>
                    <td style={{ padding:"13px 20px", fontFamily:FD, fontSize:"20px", color:BK, lineHeight:1 }}>{a.views>0?a.views.toLocaleString():"—"}</td>
                    <td style={{ padding:"13px 20px", fontFamily:FB, fontSize:"13px", color:MG }}>{a.date}</td>
                    <td style={{ padding:"13px 20px" }}>
                      <div style={{ display:"flex", gap:"6px" }}>
                        <button style={{ padding:"5px 10px", background:"#EFF6FF", color:"#1D4ED8", border:"none", cursor:"pointer", borderRadius:"4px", display:"flex", alignItems:"center", gap:"4px", fontSize:"12px", fontFamily:FB, fontWeight:"600" }}><Edit2 size={10}/>Edit</button>
                        <button style={{ padding:"5px 8px", background:"#FEF2F2", color:"#991B1B", border:"none", cursor:"pointer", borderRadius:"4px" }}><Trash2 size={11}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── WRITER DASHBOARD ────────────────────────────────────────────────────────
function WriterDashboard() {
  const [active, setActive] = useState("dashboard");
  const [tab, setTab]       = useState("all");
  const myArts = ARTICLES.filter(a=>a.author==="James Ochieng");
  const nav = [
    { k:"dashboard", label:"Dashboard",   icon:<LayoutDashboard size={15}/> },
    { k:"articles",  label:"My Articles", icon:<FileText size={15}/>,       badge:"24" },
    { k:"new",       label:"New Article", icon:<PenLine size={15}/> },
    { k:"comments",  label:"Comments",    icon:<MessageSquare size={15}/>,  badge:"7" },
    { k:"analytics", label:"Analytics",   icon:<BarChart2 size={15}/> },
    { k:"profile",   label:"My Profile",  icon:<UserCheck size={15}/> },
  ];

  return (
    <div style={{ display:"flex", minHeight:"100vh", background:GR, fontFamily:FB }}>
      <Sidebar items={nav} active={active} set={setActive}
        user={{ name:"James Ochieng", role:"Sports Writer", ini:"JO" }} sub="Writer Portal"/>

      <div style={{ flex:1, overflow:"auto" }}>
        {/* Topbar */}
        <div style={{ background:W, padding:"0 28px", height:"64px", display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:`1px solid ${BD}`, position:"sticky", top:0, zIndex:10 }}>
          <div>
            <h1 style={{ fontFamily:FB, fontWeight:"700", fontSize:"18px", color:BK, margin:0 }}>Good morning, James 👋</h1>
            <p style={{ fontFamily:FB, fontSize:"12px", color:MG, margin:0 }}>Thursday, 19 March 2026</p>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:"14px" }}>
            <button style={{ background:R, color:W, fontFamily:FB, fontWeight:"700", fontSize:"12px", letterSpacing:"0.06em", padding:"8px 18px", border:"none", cursor:"pointer", borderRadius:"4px", display:"flex", alignItems:"center", gap:"6px", textTransform:"uppercase" }}>
              <Plus size={13}/> New Article
            </button>
            <div style={{ position:"relative", cursor:"pointer" }}>
              <Bell size={19} color={BK}/>
              <div style={{ position:"absolute", top:"-4px", right:"-4px", width:"8px", height:"8px", background:R, borderRadius:"50%" }}/>
            </div>
          </div>
        </div>

        <div style={{ padding:"28px" }}>
          {/* KPIs */}
          <div style={{ display:"flex", gap:"16px", marginBottom:"24px" }}>
            <KPI icon={<Eye size={17} color={R}/>}             label="My Total Views"  value="6,862" change="8%"      up={true}  accent={R}/>
            <KPI icon={<FileText size={17} color="#0066CC"/>}  label="My Articles"     value="24"    change="4 new"   up={true}  accent="#0066CC"/>
            <KPI icon={<MessageSquare size={17} color="#7B2FBE"/>} label="Comments"    value="47"    change="12%"     up={true}  accent="#7B2FBE"/>
            <KPI icon={<TrendingUp size={17} color="#00875A"/>} label="Views This Week" value="921"  change="↑ vs last" up={true} accent="#00875A"/>
          </div>

          {/* Charts */}
          <div style={{ display:"grid", gridTemplateColumns:"1.65fr 1fr", gap:"20px", marginBottom:"24px" }}>
            <div style={{ background:W, borderRadius:"8px", padding:"20px", border:`1px solid ${BD}` }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"20px" }}>
                <div>
                  <h3 style={{ fontFamily:FB, fontWeight:"700", fontSize:"14px", color:BK, margin:"0 0 3px" }}>My Views</h3>
                  <p style={{ fontFamily:FB, fontSize:"12px", color:MG, margin:0 }}>Last 7 days</p>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:"8px", background:`${R}10`, padding:"4px 12px", borderRadius:"20px" }}>
                  <ArrowUpRight size={13} color={R}/>
                  <span style={{ fontFamily:FB, fontWeight:"700", fontSize:"12px", color:R }}>+8% vs last week</span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={195}>
                <AreaChart data={myViewsData}>
                  <defs>
                    <linearGradient id="wGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor={R} stopOpacity={0.18}/>
                      <stop offset="95%" stopColor={R} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0"/>
                  <XAxis dataKey="day" tick={{ fontFamily:FB, fontSize:11, fill:MG }} axisLine={false} tickLine={false}/>
                  <YAxis tick={{ fontFamily:FB, fontSize:11, fill:MG }} axisLine={false} tickLine={false}/>
                  <Tooltip contentStyle={{ fontFamily:FB, fontSize:12, border:`1px solid ${BD}`, borderRadius:"6px" }}/>
                  <Area type="monotone" dataKey="views" stroke={R} strokeWidth={2.5} fill="url(#wGrad)" dot={false} activeDot={{ r:5, fill:R }}/>
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div style={{ background:W, borderRadius:"8px", padding:"20px", border:`1px solid ${BD}` }}>
              <h3 style={{ fontFamily:FB, fontWeight:"700", fontSize:"14px", color:BK, margin:"0 0 3px" }}>My Traffic by Category</h3>
              <p style={{ fontFamily:FB, fontSize:"12px", color:MG, margin:"0 0 20px" }}>All time</p>
              <ResponsiveContainer width="100%" height={195}>
                <BarChart data={myCategoryData} layout="vertical" barSize={13}>
                  <XAxis type="number" tick={{ fontFamily:FB, fontSize:10, fill:MG }} axisLine={false} tickLine={false}/>
                  <YAxis dataKey="name" type="category" tick={{ fontFamily:FB, fontSize:11, fill:MG }} axisLine={false} tickLine={false} width={75}/>
                  <Tooltip contentStyle={{ fontFamily:FB, fontSize:12, border:`1px solid ${BD}`, borderRadius:"6px" }}/>
                  <Bar dataKey="views" fill={R} radius={[0,4,4,0]}/>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Article feed (all platform) */}
          <div style={{ background:W, borderRadius:"8px", border:`1px solid ${BD}`, overflow:"hidden", marginBottom:"20px" }}>
            <div style={{ padding:"16px 20px", borderBottom:`1px solid ${BD}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div style={{ display:"flex", gap:"0" }}>
                {["all","mine"].map(t=>(
                  <button key={t} onClick={()=>setTab(t)} style={{ fontFamily:FB, fontWeight:"600", fontSize:"13px", padding:"6px 16px", border:"none", cursor:"pointer", background:"transparent", color:tab===t?R:MG, borderBottom:tab===t?`2px solid ${R}`:"2px solid transparent" }}>
                    {t==="all"?"All Articles":"My Articles"}
                  </button>
                ))}
              </div>
              <button style={{ background:R, color:W, fontFamily:FB, fontWeight:"600", fontSize:"12px", padding:"6px 14px", border:"none", cursor:"pointer", borderRadius:"4px", display:"flex", alignItems:"center", gap:"6px" }}>
                <Plus size={12}/> New Article
              </button>
            </div>
            <table style={{ width:"100%", borderCollapse:"collapse" }}>
              <thead>
                <tr style={{ background:"#FAFAFA" }}>
                  {["Title","Category","Author","Status","Views","Date","Actions"].map(h=>(
                    <th key={h} style={{ padding:"10px 20px", textAlign:"left", fontFamily:FB, fontSize:"10px", fontWeight:"700", color:MG, letterSpacing:"0.1em", textTransform:"uppercase", borderBottom:`1px solid ${BD}` }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(tab==="mine"?myArts:ARTICLES).map((a,i)=>(
                  <tr key={a.id} style={{ borderBottom:i<(tab==="mine"?myArts:ARTICLES).length-1?`1px solid ${BD}`:"none" }}>
                    <td style={{ padding:"13px 20px", maxWidth:"250px" }}>
                      <p style={{ fontFamily:FB, fontWeight:"600", fontSize:"13px", color:BK, margin:0, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{a.title}</p>
                    </td>
                    <td style={{ padding:"13px 20px" }}><CatBadge cat={a.category}/></td>
                    <td style={{ padding:"13px 20px", fontFamily:FB, fontSize:"13px", color:MG }}>{a.author}</td>
                    <td style={{ padding:"13px 20px" }}><StatusPill s={a.status}/></td>
                    <td style={{ padding:"13px 20px", fontFamily:FD, fontSize:"20px", color:BK, lineHeight:1 }}>{a.views>0?a.views.toLocaleString():"—"}</td>
                    <td style={{ padding:"13px 20px", fontFamily:FB, fontSize:"13px", color:MG }}>{a.date}</td>
                    <td style={{ padding:"13px 20px" }}>
                      <div style={{ display:"flex", gap:"6px" }}>
                        <button style={{ padding:"5px 10px", background:"#EFF6FF", color:"#1D4ED8", border:"none", cursor:"pointer", borderRadius:"4px", display:"flex", alignItems:"center", gap:"4px", fontSize:"12px", fontFamily:FB, fontWeight:"600" }}><Edit2 size={10}/>Edit</button>
                        {a.author==="James Ochieng" && (
                          <button style={{ padding:"5px 8px", background:"#FEF2F2", color:"#991B1B", border:"none", cursor:"pointer", borderRadius:"4px" }}><Trash2 size={11}/></button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Recent comments on my articles */}
          <div style={{ background:W, borderRadius:"8px", border:`1px solid ${BD}`, overflow:"hidden" }}>
            <div style={{ padding:"16px 20px", borderBottom:`1px solid ${BD}` }}>
              <h3 style={{ fontFamily:FB, fontWeight:"700", fontSize:"14px", color:BK, margin:0 }}>Recent Comments on My Articles</h3>
            </div>
            {[
              { name:"Peter Kamau",  comment:"Great match analysis! Gor Mahia was absolutely dominant.",          article:"Gor Mahia Clinch Title…", time:"1h ago" },
              { name:"Sarah Njoki",  comment:"The Wanyama return is huge for Kenyan football. Well written!",     article:"Victor Wanyama Returns…", time:"3h ago" },
              { name:"Denis Otieno", comment:"I agree with most points but think the midfield was underrated.",   article:"Gor Mahia Clinch Title…", time:"5h ago" },
            ].map((c,i,arr)=>(
              <div key={i} style={{ padding:"14px 20px", borderBottom:i<arr.length-1?`1px solid ${BD}`:"none", display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                <div style={{ display:"flex", gap:"12px" }}>
                  <div style={{ width:"34px",height:"34px",borderRadius:"50%",background:"#F0F0F0",display:"flex",alignItems:"center",justifyContent:"center",color:MG,fontWeight:"700",fontSize:"12px",fontFamily:FB,flexShrink:0 }}>
                    {c.name.split(" ").map(n=>n[0]).join("")}
                  </div>
                  <div>
                    <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"4px" }}>
                      <span style={{ fontFamily:FB,fontWeight:"600",fontSize:"13px",color:BK }}>{c.name}</span>
                      <span style={{ fontFamily:FB,fontSize:"11px",color:MG }}>on <span style={{ color:R }}>{c.article}</span></span>
                    </div>
                    <p style={{ fontFamily:FB,fontSize:"13px",color:"#444",margin:0,lineHeight:"1.4" }}>{c.comment}</p>
                  </div>
                </div>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:"8px", flexShrink:0, marginLeft:"16px" }}>
                  <span style={{ fontFamily:FB,fontSize:"11px",color:MG }}>{c.time}</span>
                  <button style={{ padding:"4px 10px", background:"#FEF2F2", color:"#991B1B", border:"none", cursor:"pointer", borderRadius:"4px", fontFamily:FB, fontSize:"11px", fontWeight:"600" }}>Hide</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── ROOT ────────────────────────────────────────────────────────────────────
const CSS = `
  @keyframes ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
  *{box-sizing:border-box;margin:0;padding:0}
  body{margin:0}
  ::-webkit-scrollbar{width:6px;height:6px}
  ::-webkit-scrollbar-track{background:#F0F0F0}
  ::-webkit-scrollbar-thumb{background:#CCCCCC;border-radius:3px}
  table{border-collapse:collapse}
`;

export default function App() {
  const [view, setView] = useState("site");
  const tabs = [
    { k:"site",   label:"🌐  Public Site" },
    { k:"admin",  label:"🛡  Admin Dashboard" },
    { k:"writer", label:"✍  Writer Dashboard" },
  ];
  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;500;600;700&display=swap" rel="stylesheet"/>
      <style dangerouslySetInnerHTML={{ __html: CSS }}/>

      {/* Switcher bar */}
      <div style={{ background:"#181818", display:"flex", alignItems:"center", gap:"6px", padding:"8px 14px", position:"sticky", top:0, zIndex:999, borderBottom:`2px solid ${R}` }}>
        <span style={{ fontFamily:FB, fontSize:"10px", color:"#555", letterSpacing:"0.12em", textTransform:"uppercase", marginRight:"6px" }}>PREVIEW:</span>
        {tabs.map(t=>(
          <button key={t.k} onClick={()=>setView(t.k)} style={{
            background:  view===t.k ? R : "transparent",
            color:       view===t.k ? W : "#888",
            fontFamily:FB, fontWeight:"600", fontSize:"12px",
            padding:"6px 18px", border: view===t.k?"none":"1px solid #333",
            cursor:"pointer", borderRadius:"4px",
          }}>{t.label}</button>
        ))}
      </div>

      {view==="site"   && <PublicSite/>}
      {view==="admin"  && <AdminDashboard/>}
      {view==="writer" && <WriterDashboard/>}
    </>
  );
}
