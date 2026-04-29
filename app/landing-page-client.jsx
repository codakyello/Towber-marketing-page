'use client';

import { useEffect, useState } from 'react';

// ─── SHARED SVG ICONS ──────────────────────────────────────────────
const Ic = ({ d, s=22, c='currentColor', sw=1.75, fill='none' }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill={fill} stroke={c}
    strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    {Array.isArray(d) ? d.map((p,i)=><path key={i} d={p}/>) : <path d={d}/>}
  </svg>
);
const ico = {
  bolt: 'M13 2L3 14h7l-1 8 10-12h-7z',
  shield: ['M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5z','M9 12l2 2 4-4'],
  pin: ['M12 22s8-7 8-13a8 8 0 00-16 0c0 6 8 13 8 13z','M12 9a3 3 0 100-6 3 3 0 000 6z'],
  check: ['M9 12l2 2 4-4','M12 3a9 9 0 100 18 9 9 0 000-18z'],
  arrow: ['M5 12h14','M13 5l7 7-7 7'],
  arrowD: ['M5 12h14','M12 5l7 7-7 7'],
  trend: ['M3 17l6-6 4 4 8-8','M14 7h7v7'],
  wallet: ['M3 7h16a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2z','M3 7V5a2 2 0 012-2h12'],
  clock: ['M12 3a9 9 0 100 18 9 9 0 000-18z','M12 7v5l3 2'],
  lock: ['M8 11V7a4 4 0 018 0v4','M5 11h14a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2z'],
  chat: 'M21 12c0 4.4-4 8-9 8-1.5 0-3-.3-4.3-.9L3 21l1.2-4.3C3.4 15.3 3 13.7 3 12c0-4.4 4-8 9-8s9 3.6 9 8z',
  nav: 'M12 3l9 18-9-4-9 4z',
  tow: ['M2 17h3v-4h7V8h4l3 5h3v4','M7 17a1.5 1.5 0 100 3 1.5 1.5 0 000-3z','M18 17a1.5 1.5 0 100 3 1.5 1.5 0 000-3z'],
  wrench: 'M14 6a4 4 0 00-4 4c0 .5.1 1 .3 1.5L3 19l2 2 7.5-7.3c.5.2 1 .3 1.5.3a4 4 0 004-4c0-.8-.3-1.6-.8-2.2l-2 2-2-2 2-2A4 4 0 0014 6z',
  tire: ['M12 3a9 9 0 100 18 9 9 0 000-18z','M12 8a4 4 0 100 8 4 4 0 000-8z'],
  battery: ['M2 7h18a2 2 0 012 2v6a2 2 0 01-2 2H2a2 2 0 01-2-2V9a2 2 0 012-2z','M22 10v4','M6 10v4','M10 10v4','M14 10v4'],
  fuel: ['M4 22V4a2 2 0 012-2h7a2 2 0 012 2v18M4 22h11','M15 10h2a2 2 0 012 2v4a2 2 0 002 2 2 2 0 002-2V8l-3-3'],
  key: ['M8 14a4 4 0 100-8 4 4 0 000 8z','M11 12l10-10M16 7l2 2'],
  users: ['M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2','M23 21v-2a4 4 0 00-3-3.87','M16 3.13a4 4 0 010 7.75','M9 3a4 4 0 100 8 4 4 0 000-8z'],
  menu: ['M3 12h18','M3 6h18','M3 18h18'],
  close: ['M6 6l12 12','M18 6L6 18'],
  star: 'M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z',
  pkg: ['M21 16V8l-9-5-9 5v8l9 5z','M3.3 7L12 12l8.7-5','M12 22V12'],
  phone: 'M22 17v3a2 2 0 01-2 2A18 18 0 012 4a2 2 0 012-2h3a2 2 0 012 2c0 1.3.2 2.5.6 3.6a2 2 0 01-.4 2.1L8 11a16 16 0 006 6l1.3-1.3a2 2 0 012-.4c1.2.4 2.4.6 3.6.6a2 2 0 012 2z',
  car: ['M5 17h14M5 17l-2-6h18l-2 6M5 17v3h2v-3M19 17v3h-2v-3','M7 11l2-5h6l2 5'],
  spark: 'M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2z',
  mail: ['M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z','M22 6l-10 7L2 6'],
  check2: 'M5 12l5 5L20 7',
};

// ─── PHONE MOCKUP ──────────────────────────────────────────────────
function Phone({ type='owner' }) {
  const isOwner = type === 'owner';
  return (
    <div style={{
      width:272, height:570, borderRadius:44, background:'#0A0A0A',
      border:'7px solid #1C1C1C',
      boxShadow:'0 60px 120px rgba(0,0,0,0.55),0 0 0 1px rgba(255,255,255,0.05),inset 0 0 0 1px rgba(255,255,255,0.04)',
      position:'relative', overflow:'hidden',
    }}>
      {/* Dynamic island */}
      <div style={{position:'absolute',top:9,left:'50%',transform:'translateX(-50%)',width:112,height:32,borderRadius:22,background:'#000',zIndex:10}}/>
      {/* Status bar */}
      <div style={{position:'absolute',top:0,left:0,right:0,height:48,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'16px 24px 0',zIndex:9}}>
        <span style={{fontSize:13,fontWeight:600,color:'#fff',fontFamily:'Inter,sans-serif'}}>9:41</span>
        <div style={{display:'flex',gap:4,alignItems:'center'}}>
          <svg viewBox="0 0 22 14" width="22" height="14"><rect x="0" y="6" width="3" height="8" rx=".5" fill="#fff" opacity=".9"/><rect x="4.5" y="4" width="3" height="10" rx=".5" fill="#fff" opacity=".9"/><rect x="9" y="1.5" width="3" height="12.5" rx=".5" fill="#fff" opacity=".9"/><rect x="13.5" y="0" width="3" height="14" rx=".5" fill="#fff" opacity=".9"/><rect x="19" y="2" width="3" height="9" rx="1.5" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1.2"/><rect x="19.6" y="4" width="1.8" height="5" rx=".5" fill="rgba(255,255,255,0.45)"/></svg>
        </div>
      </div>

      {isOwner ? (
        <>
          {/* Map background */}
          <svg width="272" height="570" style={{position:'absolute',inset:0}}>
            <rect width="272" height="570" fill="#111"/>
            <rect x="195" y="30" width="80" height="80" fill="#131a13" rx="4"/>
            <rect x="0" y="350" width="90" height="100" fill="#131a13" rx="4"/>
            <rect x="0" y="200" width="272" height="18" fill="#1a1a1a"/>
            <rect x="0" y="105" width="272" height="5" fill="#1a1a1a"/>
            <rect x="0" y="300" width="272" height="5" fill="#1a1a1a"/>
            <rect x="122" y="0" width="16" height="570" fill="#1a1a1a"/>
            <rect x="36" y="0" width="5" height="570" fill="#1a1a1a"/>
            <rect x="218" y="0" width="5" height="570" fill="#1a1a1a"/>
            <line x1="0" y1="209" x2="272" y2="209" stroke="#2a2a2a" strokeWidth="1" strokeDasharray="7 5"/>
            <line x1="130" y1="0" x2="130" y2="570" stroke="#2a2a2a" strokeWidth="1" strokeDasharray="7 5"/>
            <rect x="48" y="115" width="68" height="75" fill="#161616" rx="2"/>
            <rect x="48" y="215" width="68" height="75" fill="#161616" rx="2"/>
            <rect x="145" y="40" width="65" height="55" fill="#161616" rx="2"/>
            <rect x="145" y="115" width="65" height="75" fill="#161616" rx="2"/>
            <rect x="145" y="215" width="65" height="75" fill="#161616" rx="2"/>
            <rect x="0" y="115" width="28" height="75" fill="#161616" rx="2"/>
            <path d="M36 460 L36 209 L130 209 L130 105 L218 105" stroke="#C4F542" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            <circle cx="218" cy="100" r="5" fill="#C4F542"/>
            <circle cx="36" cy="458" r="5" fill="#fff" stroke="#C4F542" strokeWidth="2"/>
          </svg>
          {/* Provider pin label */}
          <div style={{position:'absolute',top:65,right:16,zIndex:5}}>
            <div style={{background:'#0A0A0A',color:'#C4F542',borderRadius:99,padding:'4px 10px 4px 5px',display:'flex',alignItems:'center',gap:5,fontSize:9,fontWeight:700,fontFamily:'Inter,sans-serif',boxShadow:'0 4px 14px rgba(0,0,0,0.6)'}}>
              <div style={{width:14,height:14,borderRadius:'50%',background:'#C4F542',display:'flex',alignItems:'center',justifyContent:'center'}}>
                <svg width="8" height="8" viewBox="0 0 24 24" fill="#0A0A0A"><path d="M2 17h3v-4h7V8h4l3 5h3v4"/></svg>
              </div>
              Tow · 6 min
            </div>
          </div>
          {/* Floating search bar */}
          <div style={{position:'absolute',top:52,left:12,right:12,zIndex:5}}>
            <div style={{background:'rgba(30,30,30,0.95)',borderRadius:13,padding:'9px 12px',display:'flex',alignItems:'center',gap:7,backdropFilter:'blur(8px)',border:'1px solid rgba(255,255,255,0.07)'}}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>
              <span style={{fontSize:11,color:'rgba(255,255,255,0.35)',fontFamily:'Inter,sans-serif'}}>Where should we tow your car?</span>
            </div>
          </div>
          {/* Bottom sheet */}
          <div style={{position:'absolute',bottom:0,left:0,right:0,zIndex:8,background:'#141414',borderTopLeftRadius:26,borderTopRightRadius:26,padding:'12px 14px 28px',boxShadow:'0 -10px 40px rgba(0,0,0,0.6)',border:'1px solid rgba(255,255,255,0.07)',borderBottom:'none'}}>
            <div style={{width:32,height:3,background:'rgba(255,255,255,0.2)',borderRadius:99,margin:'0 auto 12px'}}/>
            <div style={{display:'flex',alignItems:'center',gap:5,marginBottom:2}}>
              <div style={{width:6,height:6,borderRadius:'50%',background:'#2DD47A'}}/>
              <span style={{fontSize:8,color:'rgba(255,255,255,0.45)',fontFamily:'Inter,sans-serif',letterSpacing:.5}}>4 PROVIDERS NEARBY · AVG 8 MIN</span>
            </div>
            <div style={{fontSize:14,fontWeight:700,color:'#fff',fontFamily:'Manrope,sans-serif',marginBottom:10}}>What's going on, Adaeze?</div>
            <div style={{background:'#0A0A0A',borderRadius:13,padding:'9px 12px',display:'flex',alignItems:'center',gap:9,marginBottom:10,border:'1px solid rgba(255,255,255,0.06)'}}>
              <div style={{width:34,height:34,borderRadius:10,background:'#C4F542',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#0A0A0A"><path d="M13 2L3 14h7l-1 8 10-12h-7z"/></svg>
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:10,fontWeight:600,color:'#fff',fontFamily:'Inter,sans-serif'}}>Emergency dispatch</div>
                <div style={{fontSize:8,color:'rgba(255,255,255,0.45)',fontFamily:'Inter,sans-serif'}}>Tap to request help now</div>
              </div>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2"><path d="M9 6l6 6-6 6"/></svg>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:5}}>
              {['Tow to destination','Move to safety'].map(s=>(
                <div key={s} style={{background:'#1C1C1E',borderRadius:9,padding:'7px 4px',textAlign:'center'}}>
                  <div style={{fontSize:7,color:'rgba(255,255,255,0.65)',fontFamily:'Inter,sans-serif',fontWeight:500}}>{s}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        /* Provider earnings screen */
        <div style={{position:'absolute',inset:0,padding:'52px 14px 14px',background:'#0A0A0A',overflowY:'hidden'}}>
          <div style={{fontSize:13,fontWeight:700,color:'#fff',fontFamily:'Manrope,sans-serif',marginBottom:12}}>Earnings</div>
          <div style={{background:'#141414',borderRadius:18,padding:'16px 14px',marginBottom:10,border:'1px solid rgba(255,255,255,0.07)'}}>
            <div style={{fontSize:8,color:'rgba(255,255,255,0.4)',fontFamily:'Geist Mono,monospace',letterSpacing:.4,marginBottom:3}}>WEEK 16 · BALANCE</div>
            <div style={{fontSize:26,fontWeight:800,color:'#fff',fontFamily:'Manrope,sans-serif',letterSpacing:-1,marginBottom:3}}>₦142,500</div>
            <div style={{fontSize:8,color:'#2DD47A',fontFamily:'Inter,sans-serif',display:'flex',alignItems:'center',gap:3,marginBottom:12}}>
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#2DD47A" strokeWidth="2"><path d="M3 17l6-6 4 4 8-8M14 7h7v7"/></svg>
              +18% vs last week
            </div>
            <div style={{display:'flex',alignItems:'flex-end',gap:3,height:46,marginBottom:5}}>
              {[40,65,48,72,58,85,100].map((h,i)=>(
                <div key={i} style={{flex:1,height:`${h}%`,borderRadius:3,background:i===6?'#C4F542':'rgba(255,255,255,0.12)'}}/>
              ))}
            </div>
            <div style={{display:'flex',justifyContent:'space-between'}}>
              {['M','T','W','T','F','S','S'].map((d,i)=>(
                <div key={i} style={{fontSize:7,color:i===6?'#C4F542':'rgba(255,255,255,0.3)',fontFamily:'Inter,sans-serif',flex:1,textAlign:'center'}}>{d}</div>
              ))}
            </div>
            <div style={{marginTop:10,background:'#C4F542',borderRadius:9,padding:'7px 10px',textAlign:'center'}}>
              <div style={{fontSize:9,fontWeight:700,color:'#0A0A0A',fontFamily:'Inter,sans-serif'}}>Withdraw to bank</div>
            </div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6}}>
            {[['JOBS','28'],['AVG/JOB','₦5,089'],['RATING','4.9'],['ACCEPT.','98%']].map(([k,v])=>(
              <div key={k} style={{background:'#141414',borderRadius:12,padding:'10px',border:'1px solid rgba(255,255,255,0.07)'}}>
                <div style={{fontSize:7,color:'rgba(255,255,255,0.4)',fontFamily:'Geist Mono,monospace',letterSpacing:.4,marginBottom:3}}>{k}</div>
                <div style={{fontSize:13,fontWeight:700,color:'#fff',fontFamily:'Manrope,sans-serif'}}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Home indicator */}
      <div style={{position:'absolute',bottom:7,left:0,right:0,display:'flex',justifyContent:'center',zIndex:20,pointerEvents:'none'}}>
        <div style={{width:120,height:4,borderRadius:99,background:'rgba(255,255,255,0.3)'}}/>
      </div>
    </div>
  );
}

// ─── NAV ──────────────────────────────────────────────────────────
function Nav({ mode, setMode }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);
  const ownerLinks = [
    { label:'How it works', href:'#how-it-works', desc:'From pin to completed tow', icon:ico.clock },
    { label:'Services', href:'#services', desc:'Roadside and marketplace', icon:ico.tow },
    { label:'Safety', href:'#safety', desc:'Verified towers and escrow', icon:ico.shield },
  ];
  const providerLinks = [
    { label:'How it works', href:'#how-it-works', desc:'Apply, go online, get jobs', icon:ico.clock },
    { label:'Earnings', href:'#earnings', desc:'Payouts, fees, weekly view', icon:ico.wallet },
    { label:'Plans', href:'#plans', desc:'Individual and workshop tiers', icon:ico.pkg },
  ];
  const links = mode === 'owner' ? ownerLinks : providerLinks;
  const mobileCta = mode === 'owner'
    ? { label:'Join waitlist', href:'#waitlist', sub:'Get launch access in Lagos' }
    : { label:'Apply as provider', href:'#provider-waitlist', sub:'Founding towers get priority' };
  const closeMenu = () => setMenuOpen(false);
  return (
    <>
      <nav style={{
        position:'fixed',top:0,left:0,right:0,zIndex:1000,
        background: (scrolled || menuOpen) ? 'rgba(8,8,8,0.97)' : 'transparent',
        backdropFilter: (scrolled || menuOpen) ? 'blur(24px) saturate(180%)' : 'none',
        borderBottom: (scrolled || menuOpen) ? '1px solid rgba(255,255,255,0.08)' : 'none',
        transition:'background .3s ease, backdrop-filter .3s ease, border-color .3s ease',
      }}>
        <div className="c" style={{display:'flex',alignItems:'center',height:72,gap:24}}>
          {/* Logo */}
          <a href="#" onClick={closeMenu} style={{display:'flex',alignItems:'center',gap:9,flexShrink:0}}>
            <div style={{width:32,height:32,borderRadius:9,background:'#C4F542',display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,fontWeight:800,color:'#0A0A0A',fontFamily:'Manrope,sans-serif',letterSpacing:-1}}>T</div>
            <span style={{fontSize:17,fontWeight:700,color:'#fff',letterSpacing:-0.5,fontFamily:'Manrope,sans-serif'}}>towber</span>
          </a>

          {/* Mode toggle — hidden on mobile (in drawer instead) */}
          <div className="tab-pill hide-mobile">
            <button className={`tab-option ${mode==='owner'?'active':''}`} onClick={()=>setMode('owner')}>For owners</button>
            <button className={`tab-option ${mode==='provider'?'active':''}`} onClick={()=>setMode('provider')}>For providers</button>
          </div>

          {/* Desktop nav links */}
          <div style={{display:'flex',gap:24,marginLeft:4}} className="hide-mobile">
            {links.map(l=>(
              <a key={l.label} href={l.href} style={{color:'rgba(255,255,255,0.65)',fontSize:14,fontWeight:500,fontFamily:'Inter,sans-serif',transition:'color .15s'}}
                onMouseEnter={e=>e.target.style.color='#fff'} onMouseLeave={e=>e.target.style.color='rgba(255,255,255,0.65)'}>{l.label}</a>
            ))}
          </div>

          {/* Right actions */}
          <div style={{marginLeft:'auto',display:'flex',gap:10,alignItems:'center'}}>
            <a href="#" style={{color:'rgba(255,255,255,0.7)',fontSize:14,fontWeight:500,fontFamily:'Inter,sans-serif'}} className="hide-mobile">Sign in</a>
            <a href={mobileCta.href} className="btn btn-lime nav-cta-desktop" style={{textDecoration:'none'}} onClick={closeMenu}>{mobileCta.label}</a>
            {/* Hamburger — mobile only */}
            <button
              onClick={()=>setMenuOpen(o=>!o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              className="nav-hamburger"
            >
              <span className="nav-hamburger-lines" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {menuOpen && (
          <div className="mobile-nav-panel">
            <div className="c">
              <div className="mobile-nav-card">
                <div className="mobile-nav-status">
                  <div>
                    <span className="mobile-nav-kicker">Lagos launch network</span>
                    <strong>{mode === 'owner' ? 'Roadside help, on the way' : 'Provider jobs, on your terms'}</strong>
                  </div>
                  <span className="mobile-nav-live"><span />Online</span>
                </div>

                <div className="mobile-mode-switch">
                  <button className={mode==='owner'?'active':''} onClick={()=>setMode('owner')}>
                    <span>Owners</span>
                    <small>Need help now</small>
                  </button>
                  <button className={mode==='provider'?'active':''} onClick={()=>setMode('provider')}>
                    <span>Providers</span>
                    <small>Earn per job</small>
                  </button>
                </div>

                <div className="mobile-nav-links">
                  {links.map((l)=>(
                    <a key={l.label} href={l.href} onClick={closeMenu}>
                      <span className="mobile-nav-icon"><Ic d={l.icon} s={18} c="currentColor" /></span>
                      <span>
                        <strong>{l.label}</strong>
                        <small>{l.desc}</small>
                      </span>
                      <Ic d={ico.arrow} s={15} c="rgba(255,255,255,0.38)" />
                    </a>
                  ))}
                </div>

                <div className="mobile-nav-cta">
                  <div>
                    <span>{mobileCta.sub}</span>
                    <strong>{mobileCta.label}</strong>
                  </div>
                  <a href={mobileCta.href} onClick={closeMenu} aria-label={mobileCta.label}>
                    <Ic d={ico.arrow} s={17} c="currentColor" />
                  </a>
                </div>

                <a href="#" onClick={closeMenu} className="mobile-nav-signin">Sign in</a>
              </div>
            </div>
          </div>
        )}
      </nav>
      {menuOpen && <button className="mobile-nav-scrim" aria-label="Close menu" onClick={closeMenu} />}
    </>
  );
}

// ─── OWNER HERO ───────────────────────────────────────────────────
function OwnerHero({ setMode }) {
  return (
    <section style={{background:'#0A0A0A',minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',paddingTop:84,position:'relative',overflow:'hidden'}}>
      {/* Subtle grid */}
      <div style={{position:'absolute',inset:0,backgroundImage:'linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)',backgroundSize:'72px 72px',pointerEvents:'none'}}/>
      {/* Lime radial */}
      <div style={{position:'absolute',top:'10%',left:'50%',transform:'translateX(-50%)',width:900,height:500,borderRadius:'50%',background:'radial-gradient(ellipse,rgba(196,245,66,.07) 0%,transparent 60%)',pointerEvents:'none'}}/>
      <div style={{position:'relative',zIndex:1,width:'100%',paddingBottom:80}}>
        {/* Centered text block */}
        <div className="c" style={{textAlign:'center',paddingTop:72}}>
          <div style={{marginBottom:28,display:'flex',justifyContent:'center'}}>
            <span className="badge badge-outline-d" style={{gap:8}}>
              <div style={{width:6,height:6,borderRadius:'50%',background:'#C4F542',animation:'pulse2 2s ease-in-out infinite'}}/>
              Now building in Lagos
            </span>
          </div>
          <h1 style={{fontFamily:'Manrope,sans-serif',fontWeight:800,fontSize:'clamp(52px,8vw,108px)',lineHeight:.93,letterSpacing:'-0.05em',color:'#fff',marginBottom:28}}>
            Towed in minutes.<br/>
            <span style={{color:'#C4F542'}}>Earned by the trip.</span>
          </h1>
          <p style={{fontSize:'clamp(16px,1.3vw,19px)',lineHeight:1.7,color:'rgba(255,255,255,0.52)',marginBottom:40,maxWidth:520,margin:'0 auto 40px',fontFamily:'Inter,sans-serif'}}>
            Car broken down? A verified tower is dispatched to your pin. Own a truck? Accept tow jobs nearby and get paid same day.
          </p>
          <div className="hero-btns" style={{display:'flex',gap:10,justifyContent:'center',flexWrap:'wrap',marginBottom:72}}>
            <a href="#waitlist" className="btn btn-lime btn-lg" style={{textDecoration:'none'}}>
              Get the app
              <Ic d={ico.arrow} s={16} c='currentColor'/>
            </a>
            <a href="#how-it-works" className="btn btn-ghost-w btn-lg" style={{textDecoration:'none'}}>How it works</a>
            <button className="btn btn-ghost-w btn-lg" onClick={()=>setMode('provider')}>Join as a tower</button>
          </div>

          {/* Stats strip */}
          <div className="hero-stats" style={{display:'inline-flex',gap:0,borderRadius:16,overflow:'hidden',border:'1px solid rgba(255,255,255,0.08)',background:'rgba(255,255,255,0.03)',marginBottom:64}}>
            {[['2.5M+','vehicles in Lagos'],['< 10 min','target ETA'],['100%','verified towers'],['₦0','hidden fees']].map(([n,l],i)=>(
              <div key={n} className="hero-stat-item" style={{padding:'18px 32px',borderRight:i<3?'1px solid rgba(255,255,255,0.08)':'none',textAlign:'center'}}>
                <div style={{fontSize:'clamp(18px,1.8vw,26px)',fontWeight:800,color:'#fff',fontFamily:'Manrope,sans-serif',letterSpacing:-0.5,lineHeight:1}}>{n}</div>
                <div style={{fontSize:12,color:'rgba(255,255,255,0.38)',fontFamily:'Inter,sans-serif',marginTop:5}}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Wide dispatch preview panel */}
        <div className="c">
          <div style={{borderRadius:24,overflow:'hidden',border:'1px solid rgba(255,255,255,0.08)',background:'#111',position:'relative'}}>
            {/* Top bar */}
            <div className="preview-toolbar" style={{padding:'14px 20px',borderBottom:'1px solid rgba(255,255,255,0.07)',display:'flex',alignItems:'center',gap:10,background:'rgba(255,255,255,0.02)'}}>
              <div style={{display:'flex',gap:6}}>
                {['#FF5F56','#FFBD2E','#27C93F'].map(c=><div key={c} style={{width:11,height:11,borderRadius:'50%',background:c}}/>)}
              </div>
              <div className="preview-toolbar-label" style={{flex:1,background:'rgba(255,255,255,0.06)',borderRadius:6,height:26,display:'flex',alignItems:'center',paddingLeft:12,maxWidth:320,margin:'0 auto'}}>
                <span style={{fontSize:11,color:'rgba(255,255,255,0.3)',fontFamily:'Geist Mono,monospace'}}>towber.app — Live dispatch</span>
              </div>
              <div className="preview-toolbar-status" style={{display:'flex',gap:6,alignItems:'center'}}>
                <div style={{width:6,height:6,borderRadius:'50%',background:'#2DD47A'}}/>
                <span style={{fontSize:11,color:'rgba(255,255,255,0.35)',fontFamily:'Inter,sans-serif'}}>4 towers nearby</span>
              </div>
            </div>
            {/* Map + cards area */}
            <div className="owner-preview-grid" style={{display:'grid',minHeight:340}}>
              {/* Map area */}
              <div style={{position:'relative',overflow:'hidden',background:'#0d1117'}}>
                <svg width="100%" height="340" viewBox="0 0 800 340" preserveAspectRatio="xMidYMid slice">
                  <rect width="800" height="340" fill="#0d1117"/>
                  {/* Road grid */}
                  {[60,130,200,270,340,410,480,550,620,690].map(x=><line key={x} x1={x} y1="0" x2={x} y2="340" stroke="#161b22" strokeWidth="1"/>)}
                  {[50,110,170,230,290].map(y=><line key={y} x1="0" y1={y} x2="800" y2={y} stroke="#161b22" strokeWidth="1"/>)}
                  {/* Main roads */}
                  <rect x="0" y="155" width="800" height="14" fill="#1a1f2a" rx="0"/>
                  <rect x="320" y="0" width="14" height="340" fill="#1a1f2a" rx="0"/>
                  <rect x="0" y="280" width="800" height="8" fill="#161b22" rx="0"/>
                  <rect x="130" y="0" width="8" height="340" fill="#161b22" rx="0"/>
                  <rect x="550" y="0" width="8" height="340" fill="#161b22" rx="0"/>
                  {/* Blocks */}
                  {[[20,20,100,130],[150,20,160,130],[330,20,210,130],[20,175,100,100],[150,175,160,100],[330,175,130,100],[480,175,60,100],[560,175,180,100],[20,295,270,35],[330,295,410,35]].map(([x,y,w,h],i)=>(
                    <rect key={i} x={x} y={y} width={w} height={h} fill="#0f1419" rx="3"/>
                  ))}
                  {/* Route line */}
                  <path d="M 130 162 L 320 162 L 320 80 L 460 80" stroke="#C4F542" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" strokeDasharray="6 3"/>
                  {/* Pickup pin */}
                  <circle cx="130" cy="162" r="7" fill="#fff" stroke="#C4F542" strokeWidth="2.5"/>
                  {/* Tower pin */}
                  <g transform="translate(455,70)">
                    <circle r="13" fill="#C4F542"/>
                    <path d="M-5 2 L-5 -1 L0 -5 L3 0 L5 0 L5 2" fill="#0A0A0A" stroke="none"/>
                    <circle cx="5" cy="4" r="1.5" fill="#0A0A0A"/>
                    <circle cx="-2" cy="4" r="1.5" fill="#0A0A0A"/>
                  </g>
                  {/* Second tower marker */}
                  <circle cx="560" cy="240" r="9" fill="rgba(196,245,66,0.25)" stroke="#C4F542" strokeWidth="1.5"/>
                  <circle cx="560" cy="240" r="4" fill="#C4F542"/>
                  {/* Third tower */}
                  <circle cx="200" cy="300" r="9" fill="rgba(196,245,66,0.25)" stroke="#C4F542" strokeWidth="1.5"/>
                  <circle cx="200" cy="300" r="4" fill="#C4F542"/>
                </svg>
                {/* ETA chip */}
                <div style={{position:'absolute',top:16,left:16,background:'rgba(10,10,10,0.9)',backdropFilter:'blur(12px)',borderRadius:10,padding:'10px 14px',border:'1px solid rgba(255,255,255,0.1)'}}>
                  <div style={{fontSize:9,color:'rgba(255,255,255,0.4)',fontFamily:'Geist Mono,monospace',letterSpacing:.5,marginBottom:3}}>TOWER ETA</div>
                  <div style={{fontSize:22,fontWeight:800,color:'#C4F542',fontFamily:'Manrope,sans-serif',letterSpacing:-1,lineHeight:1}}>6 <span style={{fontSize:12,fontWeight:500,color:'rgba(255,255,255,0.5)'}}>min</span></div>
                </div>
              </div>
              {/* Right panel: active job card */}
              <div style={{borderLeft:'1px solid rgba(255,255,255,0.07)',padding:20,display:'flex',flexDirection:'column',gap:16}}>
                <div>
                  <div style={{fontSize:10,color:'rgba(255,255,255,0.35)',fontFamily:'Geist Mono,monospace',letterSpacing:.5,marginBottom:10}}>ACTIVE REQUEST</div>
                  <div style={{background:'rgba(196,245,66,0.07)',border:'1px solid rgba(196,245,66,0.18)',borderRadius:14,padding:'14px 16px'}}>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:8}}>
                      <div>
                        <div style={{fontSize:13,fontWeight:600,color:'#fff',fontFamily:'Inter,sans-serif'}}>Tow to destination</div>
                        <div style={{fontSize:11,color:'rgba(255,255,255,0.4)',fontFamily:'Inter,sans-serif',marginTop:2}}>Lekki → Victoria Island</div>
                      </div>
                      <span style={{fontSize:9,background:'#C4F542',color:'#0A0A0A',padding:'3px 8px',borderRadius:99,fontWeight:700,fontFamily:'Geist Mono,monospace'}}>LIVE</span>
                    </div>
                    <div style={{display:'flex',gap:8}}>
                      <div style={{flex:1,background:'rgba(255,255,255,0.05)',borderRadius:8,padding:'8px 10px'}}>
                        <div style={{fontSize:9,color:'rgba(255,255,255,0.35)',fontFamily:'Geist Mono,monospace',marginBottom:3}}>PAYOUT</div>
                        <div style={{fontSize:16,fontWeight:700,color:'#C4F542',fontFamily:'Manrope,sans-serif',letterSpacing:-0.5}}>₦8,400</div>
                      </div>
                      <div style={{flex:1,background:'rgba(255,255,255,0.05)',borderRadius:8,padding:'8px 10px'}}>
                        <div style={{fontSize:9,color:'rgba(255,255,255,0.35)',fontFamily:'Geist Mono,monospace',marginBottom:3}}>DISTANCE</div>
                        <div style={{fontSize:16,fontWeight:700,color:'#fff',fontFamily:'Manrope,sans-serif',letterSpacing:-0.5}}>12 km</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div style={{fontSize:10,color:'rgba(255,255,255,0.35)',fontFamily:'Geist Mono,monospace',letterSpacing:.5,marginBottom:10}}>NEARBY TOWERS</div>
                  {[{name:'Tunde O.',rating:4.9,dist:'1.8 km',t:'6 min'},{name:'Musa A.',rating:4.7,dist:'2.4 km',t:'9 min'},{name:'Chika E.',rating:4.8,dist:'3.1 km',t:'12 min'}].map((p,i)=>(
                    <div key={p.name} style={{display:'flex',alignItems:'center',gap:10,padding:'9px 0',borderBottom:i<2?'1px solid rgba(255,255,255,0.05)':'none'}}>
                      <div style={{width:28,height:28,borderRadius:8,background:`hsl(${i*70+80},30%,55%)`,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,color:'#0A0A0A',fontSize:11,flexShrink:0}}>{p.name[0]}</div>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontSize:12,fontWeight:600,color:'#fff',fontFamily:'Inter,sans-serif'}}>{p.name}</div>
                        <div style={{fontSize:10,color:'rgba(255,255,255,0.35)',fontFamily:'Inter,sans-serif'}}>★ {p.rating} · {p.dist}</div>
                      </div>
                      <div style={{fontSize:11,fontWeight:600,color:'rgba(255,255,255,0.5)',fontFamily:'Geist Mono,monospace'}}>{p.t}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes pulse2 {0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(0.8)}}
      `}</style>
    </section>
  );
}

// ─── TRUST BAR ────────────────────────────────────────────────────
function TrustBar() {
  const items = [
    { n:'4 min', l:'Average response time', icon: ico.clock },
    { n:'₦0', l:'Hidden fees ever', icon: ico.lock },
    { n:'100%', l:'Verified providers only', icon: ico.shield },
    { n:'24/7', l:'Available across Lagos', icon: ico.star },
  ];
  return (
    <section style={{background:'#fff',borderBottom:'1px solid rgba(10,10,10,0.08)'}}>
      <div className="trust-grid" style={{borderRadius:0,border:'none'}}>
        {items.map((it,i)=>(
          <div key={it.n} className="trust-item" style={{borderRight:i<3?'1px solid rgba(10,10,10,0.07)':'none',padding:'32px 24px'}}>
            <div style={{fontSize:'clamp(28px,2.5vw,40px)',fontWeight:800,fontFamily:'Manrope,sans-serif',letterSpacing:-1,color:'#0A0A0A',lineHeight:1}}>{it.n}</div>
            <div style={{fontSize:13,color:'rgba(10,10,10,0.5)',fontFamily:'Inter,sans-serif',marginTop:6}}>{it.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── HOW IT WORKS (OWNER) ─────────────────────────────────────────
function HowItWorks() {
  const steps = [
    { n:1, title:'Choose your tow type', body:'Tow to a destination (workshop, home) or move to safety (off a busy road). Tell us which car you are driving.' },
    { n:2, title:'See verified towers nearby', body:'Browse available tow providers with real ratings, job counts, distance, and transparent pricing.' },
    { n:3, title:'Confirm and get a price', body:'See the full cost upfront — callout fee, distance rate, and vehicle class. No hidden charges after you confirm.' },
    { n:4, title:'Track and confirm completion', body:'Watch your tower navigate in real time on the map. Payment releases from escrow when the tow is done.' },
  ];
  return (
    <section id="how-it-works" className="section" style={{background:'#F5F5F0'}}>
      <div className="c">
        <div style={{textAlign:'center',marginBottom:72}}>
          <div className="label" style={{color:'rgba(10,10,10,0.4)',marginBottom:16}}>Process</div>
          <h2 className="h-lg" style={{maxWidth:620,margin:'0 auto'}}>Help in four simple steps</h2>
        </div>
        <div className="steps-grid">
          {steps.map(s=>(
            <div key={s.n} className="card card-hover" style={{padding:32}}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'center',width:52,height:52,borderRadius:'50%',background:'#0A0A0A',color:'#C4F542',fontFamily:'Manrope,sans-serif',fontWeight:800,fontSize:22,marginBottom:24,letterSpacing:-1}}>{s.n}</div>
              <h3 className="h-sm" style={{marginBottom:12}}>{s.title}</h3>
              <p className="body-md" style={{color:'rgba(10,10,10,0.55)',lineHeight:1.65}}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── NEGOTIATE FEATURE ────────────────────────────────────────────
function NegotiateFeature() {
  return (
    <section style={{background:'#0A0A0A',padding:'128px 0',overflow:'hidden',position:'relative'}}>
      <div className="dot-grid" style={{position:'absolute',inset:0,opacity:.4}}/>
      <div style={{position:'absolute',right:-150,top:-100,width:600,height:600,borderRadius:'50%',background:'radial-gradient(circle,rgba(196,245,66,.08) 0%,transparent 65%)',pointerEvents:'none'}}/>
      <div className="c" style={{position:'relative',zIndex:1}}>
        <div className="hero-grid" style={{display:'grid',gap:80,alignItems:'center'}}>
          {/* Left - visual */}
          <div className="hide-mobile">
            <div className="card-dark" style={{padding:28,maxWidth:460}}>
              <div style={{fontSize:11,fontFamily:'Geist Mono,monospace',letterSpacing:.4,color:'rgba(255,255,255,0.4)',marginBottom:18,textTransform:'uppercase'}}>Price Negotiation</div>
              {/* Provider list */}
              {[
                {name:'Tunde O.', rating:4.9, dist:'1.8 km', service:3500, transport:2200, label:'Fastest · 6 min', best:true},
                {name:'Musa A.', rating:4.7, dist:'2.4 km', service:3500, transport:2500, label:'', best:false},
                {name:'Chika E.', rating:4.8, dist:'3.1 km', service:3200, transport:1800, label:'Cheapest', best:false},
              ].map((p,i)=>(
                <div key={p.name} style={{background:p.best?'rgba(196,245,66,0.07)':'rgba(255,255,255,0.04)',borderRadius:14,padding:'14px 16px',marginBottom:10,border:`1px solid ${p.best?'rgba(196,245,66,0.25)':'rgba(255,255,255,0.07)'}`,display:'flex',alignItems:'center',gap:12}}>
                  <div style={{width:36,height:36,borderRadius:10,background:`hsl(${i*70+80},30%,60%)`,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,color:'#0A0A0A',fontSize:14,flexShrink:0}}>{p.name[0]}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:'flex',alignItems:'center',gap:7}}>
                      <span style={{fontSize:13,fontWeight:600,color:'#fff',fontFamily:'Inter,sans-serif'}}>{p.name}</span>
                      {p.label && <span style={{fontSize:9,background:'#C4F542',color:'#0A0A0A',padding:'2px 7px',borderRadius:99,fontWeight:700,fontFamily:'Geist Mono,monospace',letterSpacing:.3}}>{p.label.toUpperCase()}</span>}
                    </div>
                    <div style={{fontSize:11,color:'rgba(255,255,255,0.4)',fontFamily:'Inter,sans-serif',marginTop:2}}>★ {p.rating} · {p.dist}</div>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <div style={{fontSize:9,color:'rgba(255,255,255,0.35)',fontFamily:'Geist Mono,monospace',letterSpacing:.3,marginBottom:2}}>TOTAL</div>
                    <div style={{fontSize:17,fontWeight:700,color:p.best?'#C4F542':'#fff',fontFamily:'Manrope,sans-serif',letterSpacing:-0.5}}>₦{(p.service+p.transport).toLocaleString()}</div>
                  </div>
                </div>
              ))}
              {/* Price cap indicator */}
              <div style={{padding:'14px 16px',background:'rgba(196,245,66,0.08)',borderRadius:12,border:'1px solid rgba(196,245,66,0.2)',display:'flex',gap:10,alignItems:'center',marginTop:6}}>
                <div style={{width:20,height:20,flexShrink:0}}>
                  <Ic d={ico.shield} s={18} c='#C4F542'/>
                </div>
                <div style={{fontSize:12,color:'rgba(255,255,255,0.7)',fontFamily:'Inter,sans-serif',lineHeight:1.4}}>
                  <b style={{color:'#C4F542'}}>Transport capped at ₦2,500.</b> Providers cannot exceed the platform limit. Negotiate freely within it.
                </div>
              </div>
            </div>
          </div>
          {/* Right - copy */}
          <div>
            <div className="label" style={{color:'rgba(255,255,255,0.4)',marginBottom:16}}>Unique to Towber</div>
            <h2 className="h-lg" style={{color:'#fff',marginBottom:24}}>
              The only roadside app where you negotiate.
            </h2>
            <p style={{fontSize:18,lineHeight:1.7,color:'rgba(255,255,255,0.6)',marginBottom:40,fontFamily:'Inter,sans-serif'}}>
              Every provider sets their own pricing. You see the full breakdown upfront, service fee and transport separate. Counter-offer the transport cost. The platform enforces a cap so no one gets overcharged.
            </p>
            <div style={{display:'flex',flexDirection:'column',gap:16}}>
              {['See multiple providers and compare on your terms','Negotiate transport fees within a platform-set cap','Service price is transparent before you commit','Pay via in-app escrow, released only on completion'].map(f=>(
                <div key={f} style={{display:'flex',alignItems:'flex-start',gap:12}}>
                  <div style={{width:22,height:22,borderRadius:'50%',background:'rgba(196,245,66,0.15)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:1}}>
                    <Ic d={ico.check2} s={12} c='#C4F542' sw={2.5}/>
                  </div>
                  <span style={{fontSize:15,color:'rgba(255,255,255,0.7)',fontFamily:'Inter,sans-serif',lineHeight:1.5}}>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SERVICES ─────────────────────────────────────────────────────
function ServicesSection() {
  const modes = [
    {
      icon: ico.tow,
      name: 'Tow to destination',
      desc: 'Need your car taken to a workshop or home? Set the destination and a verified tower will flatbed it there. Track the truck the whole way.',
      details: ['Flatbed tow for all vehicle types','Set any destination in-app','Live GPS tracking to the drop-off'],
    },
    {
      icon: ico.bolt,
      name: 'Move car to safety',
      desc: 'Broken down on a busy road or expressway? No destination needed. A tower will pull your car off to a safe spot nearby.',
      details: ['No destination required','Fast dispatch to your exact pin','Ideal for expressway and highway breakdowns'],
    },
  ];
  return (
    <section id="services" className="section" style={{background:'#fff'}}>
      <div className="c">
        <div style={{textAlign:'center',marginBottom:64}}>
          <div className="label" style={{color:'rgba(10,10,10,0.4)',marginBottom:16}}>What we do</div>
          <h2 className="h-lg" style={{maxWidth:560,margin:'0 auto'}}>Two tow types. One app.</h2>
          <p className="body-md" style={{color:'rgba(10,10,10,0.55)',lineHeight:1.7,maxWidth:480,margin:'16px auto 0'}}>
            Whether you know where you need to go or just need to get off a dangerous road — Towber has you covered.
          </p>
        </div>
        <div className="grid-2" style={{gap:24}}>
          {modes.map(m=>(
            <div key={m.name} className="card card-hover" style={{padding:32}}>
              <div style={{width:52,height:52,borderRadius:14,background:'#0A0A0A',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:22}}>
                <Ic d={m.icon} s={24} c='#C4F542'/>
              </div>
              <h3 style={{fontSize:20,fontWeight:700,fontFamily:'Manrope,sans-serif',marginBottom:10,letterSpacing:-0.3}}>{m.name}</h3>
              <p style={{fontSize:15,color:'rgba(10,10,10,0.55)',lineHeight:1.65,fontFamily:'Inter,sans-serif',marginBottom:24}}>{m.desc}</p>
              <div style={{display:'flex',flexDirection:'column',gap:10}}>
                {m.details.map(d=>(
                  <div key={d} style={{display:'flex',gap:10,alignItems:'flex-start'}}>
                    <div style={{width:18,height:18,borderRadius:'50%',background:'#F0F0EB',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:1}}>
                      <Ic d={ico.check2} s={10} c='#0A0A0A' sw={2.5}/>
                    </div>
                    <span style={{fontSize:14,color:'rgba(10,10,10,0.65)',fontFamily:'Inter,sans-serif',lineHeight:1.45}}>{d}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{marginTop:24,textAlign:'center'}}>
          <div className="badge badge-lime-soft" style={{display:'inline-flex'}}>
            <div style={{width:6,height:6,borderRadius:'50%',background:'var(--ok)'}}/>
            Both tow types live in Lagos
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SAFETY ───────────────────────────────────────────────────────
function SafetySection() {
  const pillars = [
    { icon:ico.shield, title:'Identity verified', body:'Every provider submits government ID and relevant vehicle documents before going live. Our team reviews each application manually.' },
    { icon:ico.lock, title:'In-app escrow', body:'Payment is held securely before the provider moves. Released only when you confirm the job is complete. Neither party touches it in between.' },
    { icon:ico.chat, title:'No number sharing', body:'All communication happens inside the app. Voice calls and messages are routed through Towber. Your phone number stays private.' },
    { icon:ico.nav, title:'GPS-verified milestones', body:'Departure, arrival, and completion are logged as immutable GPS events. Cancellation fees are calculated from these facts, not claims.' },
  ];
  return (
    <section id="safety" className="section" style={{background:'#F5F5F0'}}>
      <div className="c">
        <div style={{textAlign:'center',marginBottom:72}}>
          <div className="label" style={{color:'rgba(10,10,10,0.4)',marginBottom:16}}>Trust and safety</div>
          <h2 className="h-lg" style={{maxWidth:560,margin:'0 auto'}}>Built for a market that demands trust</h2>
          <p style={{fontSize:18,color:'rgba(10,10,10,0.55)',maxWidth:520,margin:'20px auto 0',fontFamily:'Inter,sans-serif',lineHeight:1.7}}>Handing your car to a stranger is a big ask. We built every feature around that reality.</p>
        </div>
        <div className="grid-4">
          {pillars.map(p=>(
            <div key={p.title} className="card card-hover" style={{padding:28}}>
              <div style={{width:48,height:48,borderRadius:14,background:'#0A0A0A',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:22}}>
                <Ic d={p.icon} s={22} c='#C4F542'/>
              </div>
              <h3 style={{fontSize:18,fontWeight:700,fontFamily:'Manrope,sans-serif',marginBottom:10,letterSpacing:-0.3}}>{p.title}</h3>
              <p style={{fontSize:14,color:'rgba(10,10,10,0.55)',lineHeight:1.65,fontFamily:'Inter,sans-serif'}}>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────
function Testimonials({ type='owner' }) {
  const ownerTestimonials = [
    { name:'Adaeze O.', role:'Lekki Phase 1', stars:5, quote:'I had a flat at 10 PM on the highway. Towber found a provider in less than 2 minutes. He arrived before I even calmed down. Worth every naira.' },
    { name:'Emeka N.', role:'Victoria Island', stars:5, quote:'I liked that I could see who was coming, their rating, and the price all at once. No surprises when the bill arrived.' },
    { name:'Funmilayo A.', role:'Ajah', stars:5, quote:'My car broke down on a bridge in the rain. I pressed Move to Safety and a tower was there in under 15 minutes. Price was shown before I even confirmed.' },
  ];
  const providerTestimonials = [
    { name:'Tunde O.', role:'Tow truck operator, Surulere', stars:5, quote:'Before Towber I spent half my day driving around looking for jobs. Now jobs come to me. I made more in my first week than I expected for the month.' },
    { name:'Musa A.', role:'Roadside technician, Ikeja', stars:5, quote:'The earnings dashboard shows me everything. I know exactly what I made, what Towber took, and when I get paid. No arguments, no confusion.' },
    { name:'Chika E.', role:'Auto services, Lekki', stars:5, quote:'I set my own service radius and my own hours. My family sees me more now. I earn more per job than I ever did going direct.' },
  ];
  const testimonials = type === 'owner' ? ownerTestimonials : providerTestimonials;
  return (
    <section style={{background:'#0A0A0A',padding:'128px 0'}}>
      <div className="c">
        <div style={{marginBottom:64}}>
          <div className="label" style={{color:'rgba(255,255,255,0.35)',marginBottom:16}}>Testimonials</div>
          <h2 className="h-lg" style={{color:'#fff',maxWidth:500}}>What people are saying</h2>
        </div>
        <div className="grid-3">
          {testimonials.map(t=>(
            <div key={t.name} className="card-dark card-hover" style={{padding:32}}>
              <div style={{display:'flex',marginBottom:18}}>
                {[1,2,3,4,5].map(i=><span key={i} className="star" style={{fontSize:16}}>★</span>)}
              </div>
              <p style={{fontSize:16,color:'rgba(255,255,255,0.75)',lineHeight:1.7,marginBottom:28,fontFamily:'Inter,sans-serif'}}>"{t.quote}"</p>
              <div style={{display:'flex',alignItems:'center',gap:12,paddingTop:24,borderTop:'1px solid rgba(255,255,255,0.08)'}}>
                <div style={{width:40,height:40,borderRadius:'50%',background:'#C4F542',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:16,color:'#0A0A0A',fontFamily:'Manrope,sans-serif'}}>{t.name[0]}</div>
                <div>
                  <div style={{fontSize:14,fontWeight:600,color:'#fff',fontFamily:'Manrope,sans-serif'}}>{t.name}</div>
                  <div style={{fontSize:12,color:'rgba(255,255,255,0.4)',fontFamily:'Inter,sans-serif',marginTop:2}}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PROVIDER HERO ────────────────────────────────────────────────
function ProviderHero({ setMode }) {
  return (
    <section style={{background:'#0A0A0A',minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',paddingTop:84,position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',inset:0,backgroundImage:'linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)',backgroundSize:'72px 72px',pointerEvents:'none'}}/>
      <div style={{position:'absolute',top:'10%',left:'50%',transform:'translateX(-50%)',width:900,height:500,borderRadius:'50%',background:'radial-gradient(ellipse,rgba(196,245,66,.06) 0%,transparent 60%)',pointerEvents:'none'}}/>
      <div style={{position:'relative',zIndex:1,width:'100%',paddingBottom:80}}>
        <div className="c" style={{textAlign:'center',paddingTop:72}}>
          <div style={{marginBottom:28,display:'flex',justifyContent:'center'}}>
            <span className="badge badge-outline-d" style={{gap:8}}>
              <div style={{width:6,height:6,borderRadius:'50%',background:'#C4F542'}}/>
              Tower applications open
            </span>
          </div>
          <h1 style={{fontFamily:'Manrope,sans-serif',fontWeight:800,fontSize:'clamp(52px,8vw,108px)',lineHeight:.93,letterSpacing:'-0.05em',color:'#fff',marginBottom:28}}>
            Own a truck?<br/>
            <span style={{color:'#C4F542'}}>Start earning today.</span>
          </h1>
          <p style={{fontSize:'clamp(16px,1.3vw,19px)',lineHeight:1.7,color:'rgba(255,255,255,0.52)',marginBottom:40,maxWidth:520,margin:'0 auto 40px',fontFamily:'Inter,sans-serif'}}>
            Download the app, register your truck, go online. Tow jobs in your area come straight to you — with payout shown before you accept.
          </p>
          <div className="hero-btns" style={{display:'flex',gap:10,justifyContent:'center',flexWrap:'wrap',marginBottom:72}}>
            <a href="#provider-waitlist" className="btn btn-lime btn-lg" style={{textDecoration:'none'}}>
              Register as a tower
              <Ic d={ico.arrow} s={16} c='currentColor'/>
            </a>
            <button className="btn btn-ghost-w btn-lg" onClick={()=>setMode('owner')}>I need a tow</button>
          </div>

          <div className="hero-stats" style={{display:'inline-flex',gap:0,borderRadius:16,overflow:'hidden',border:'1px solid rgba(255,255,255,0.08)',background:'rgba(255,255,255,0.03)',marginBottom:64}}>
            {[['₦142K','top weekly earnings'],['10%','flat platform fee'],['24h','payout turnaround'],['0','hidden deductions']].map(([n,l],i)=>(
              <div key={n} className="hero-stat-item" style={{padding:'18px 32px',borderRight:i<3?'1px solid rgba(255,255,255,0.08)':'none',textAlign:'center'}}>
                <div style={{fontSize:'clamp(18px,1.8vw,26px)',fontWeight:800,color:'#fff',fontFamily:'Manrope,sans-serif',letterSpacing:-0.5,lineHeight:1}}>{n}</div>
                <div style={{fontSize:12,color:'rgba(255,255,255,0.38)',fontFamily:'Inter,sans-serif',marginTop:5}}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Earnings dashboard preview */}
        <div className="c">
          <div style={{borderRadius:24,overflow:'hidden',border:'1px solid rgba(255,255,255,0.08)',background:'#111',position:'relative'}}>
            <div className="preview-toolbar" style={{padding:'14px 20px',borderBottom:'1px solid rgba(255,255,255,0.07)',display:'flex',alignItems:'center',gap:10,background:'rgba(255,255,255,0.02)'}}>
              <div style={{display:'flex',gap:6}}>
                {['#FF5F56','#FFBD2E','#27C93F'].map(c=><div key={c} style={{width:11,height:11,borderRadius:'50%',background:c}}/>)}
              </div>
              <div className="preview-toolbar-label" style={{flex:1,background:'rgba(255,255,255,0.06)',borderRadius:6,height:26,display:'flex',alignItems:'center',paddingLeft:12,maxWidth:320,margin:'0 auto'}}>
                <span style={{fontSize:11,color:'rgba(255,255,255,0.3)',fontFamily:'Geist Mono,monospace'}}>towber.app — Provider dashboard</span>
              </div>
              <div className="preview-toolbar-status" style={{display:'flex',alignItems:'center',gap:6}}>
                <div style={{width:6,height:6,borderRadius:'50%',background:'#2DD47A'}}/>
                <span style={{fontSize:11,color:'rgba(255,255,255,0.35)',fontFamily:'Inter,sans-serif'}}>Online · accepting jobs</span>
              </div>
            </div>
            <div className="provider-preview-grid" style={{display:'grid',minHeight:340}}>
              {/* Earnings chart */}
              <div style={{padding:28,borderRight:'1px solid rgba(255,255,255,0.07)'}}>
                <div style={{fontSize:10,color:'rgba(255,255,255,0.35)',fontFamily:'Geist Mono,monospace',letterSpacing:.5,marginBottom:6}}>THIS WEEK · BALANCE</div>
                <div style={{fontSize:40,fontWeight:800,color:'#fff',fontFamily:'Manrope,sans-serif',letterSpacing:-1.5,lineHeight:1,marginBottom:4}}>₦142,500</div>
                <div style={{fontSize:12,color:'#2DD47A',fontFamily:'Inter,sans-serif',display:'flex',alignItems:'center',gap:4,marginBottom:24}}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#2DD47A" strokeWidth="2.5"><path d="M3 17l6-6 4 4 8-8M14 7h7v7"/></svg>
                  +18% vs last week
                </div>
                <div style={{display:'flex',alignItems:'flex-end',gap:5,height:64,marginBottom:8}}>
                  {[38,62,45,70,55,82,100].map((h,i)=>(
                    <div key={i} style={{flex:1,height:`${h}%`,borderRadius:4,background:i===6?'#C4F542':'rgba(255,255,255,0.1)',transition:'height .3s'}}/>
                  ))}
                </div>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                  {['M','T','W','T','F','S','S'].map((d,i)=>(
                    <div key={i} style={{fontSize:10,color:i===6?'#C4F542':'rgba(255,255,255,0.25)',fontFamily:'Inter,sans-serif',flex:1,textAlign:'center'}}>{d}</div>
                  ))}
                </div>
              </div>
              {/* Job stats */}
              <div style={{padding:28,borderRight:'1px solid rgba(255,255,255,0.07)'}}>
                <div style={{fontSize:10,color:'rgba(255,255,255,0.35)',fontFamily:'Geist Mono,monospace',letterSpacing:.5,marginBottom:18}}>JOB BREAKDOWN</div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:20}}>
                  {[['JOBS','28'],['AVG/JOB','₦5,089'],['RATING','4.9 ★'],['ACCEPT.','98%']].map(([k,v])=>(
                    <div key={k} style={{background:'rgba(255,255,255,0.04)',borderRadius:12,padding:'12px 14px',border:'1px solid rgba(255,255,255,0.06)'}}>
                      <div style={{fontSize:9,color:'rgba(255,255,255,0.35)',fontFamily:'Geist Mono,monospace',letterSpacing:.4,marginBottom:4}}>{k}</div>
                      <div style={{fontSize:18,fontWeight:700,color:'#fff',fontFamily:'Manrope,sans-serif',letterSpacing:-0.5}}>{v}</div>
                    </div>
                  ))}
                </div>
                <div style={{background:'rgba(196,245,66,0.08)',borderRadius:12,padding:'12px 14px',border:'1px solid rgba(196,245,66,0.18)'}}>
                  <div style={{fontSize:11,color:'rgba(255,255,255,0.6)',fontFamily:'Inter,sans-serif',lineHeight:1.5}}>
                    <span style={{color:'#C4F542',fontWeight:600}}>Flat 10% fee</span> — callout + distance + vehicle class. No surprises.
                  </div>
                </div>
              </div>
              {/* Incoming job card */}
              <div style={{padding:24}}>
                <div style={{fontSize:10,color:'rgba(255,255,255,0.35)',fontFamily:'Geist Mono,monospace',letterSpacing:.5,marginBottom:12}}>NEW JOB REQUEST</div>
                <div style={{background:'rgba(196,245,66,0.06)',border:'1px solid rgba(196,245,66,0.2)',borderRadius:16,padding:'16px',marginBottom:12}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
                    <span style={{fontSize:13,fontWeight:600,color:'#fff',fontFamily:'Inter,sans-serif'}}>Tow to destination</span>
                    <span style={{fontSize:9,background:'#C4F542',color:'#0A0A0A',padding:'2px 8px',borderRadius:99,fontWeight:700,fontFamily:'Geist Mono,monospace'}}>NEW</span>
                  </div>
                  <div style={{fontSize:11,color:'rgba(255,255,255,0.4)',fontFamily:'Inter,sans-serif',marginBottom:12}}>Ikeja → Oshodi · 4.2 km</div>
                  <div style={{display:'flex',gap:8,marginBottom:14}}>
                    {[['Callout','₦2,000'],['Distance','₦3,360'],['Platform','-₦536']].map(([k,v])=>(
                      <div key={k} style={{flex:1,background:'rgba(255,255,255,0.05)',borderRadius:8,padding:'7px 8px'}}>
                        <div style={{fontSize:8,color:'rgba(255,255,255,0.3)',fontFamily:'Geist Mono,monospace',marginBottom:2}}>{k.toUpperCase()}</div>
                        <div style={{fontSize:12,fontWeight:600,color:k==='Platform'?'rgba(255,255,255,0.4)':'#fff',fontFamily:'Manrope,sans-serif'}}>{v}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',paddingTop:10,borderTop:'1px solid rgba(255,255,255,0.08)'}}>
                    <span style={{fontSize:11,color:'rgba(255,255,255,0.45)',fontFamily:'Inter,sans-serif'}}>You earn</span>
                    <span style={{fontSize:22,fontWeight:800,color:'#C4F542',fontFamily:'Manrope,sans-serif',letterSpacing:-0.8}}>₦4,824</span>
                  </div>
                </div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
                  <div style={{background:'#C4F542',borderRadius:10,padding:'10px',textAlign:'center',cursor:'pointer',fontSize:12,fontWeight:700,color:'#0A0A0A',fontFamily:'Inter,sans-serif'}}>Accept</div>
                  <div style={{background:'rgba(255,255,255,0.07)',borderRadius:10,padding:'10px',textAlign:'center',cursor:'pointer',fontSize:12,fontWeight:600,color:'rgba(255,255,255,0.45)',fontFamily:'Inter,sans-serif'}}>Decline</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── EARNINGS SECTION ─────────────────────────────────────────────
function EarningsSection() {
  return (
    <section id="earnings" className="section" style={{background:'#fff'}}>
      <div className="c">
        <div style={{textAlign:'center',marginBottom:72}}>
          <div className="label" style={{color:'rgba(10,10,10,0.4)',marginBottom:16}}>Earnings</div>
          <h2 className="h-lg" style={{maxWidth:560,margin:'0 auto'}}>Real income, real transparency</h2>
          <p style={{fontSize:18,color:'rgba(10,10,10,0.55)',maxWidth:520,margin:'20px auto 0',fontFamily:'Inter,sans-serif',lineHeight:1.7}}>You see exactly how much you earn per job, what the platform takes, and when funds hit your account.</p>
        </div>
        <div className="hero-grid" style={{display:'grid',gap:40,alignItems:'start'}}>
          {/* Earnings visual */}
          <div className="card-dark" style={{padding:32}}>
            <div className="label" style={{color:'rgba(255,255,255,0.35)',marginBottom:8,fontSize:10}}>Example: ₦8,400 tow job (Ikeja → Oshodi, 8 km)</div>
            <div style={{display:'flex',flexDirection:'column',gap:12,marginTop:16}}>
              {[
                {k:'Callout fee',v:'₦3,000',color:'rgba(255,255,255,0.75)'},
                {k:'Distance (8 km × ₦450)',v:'₦3,600',color:'rgba(255,255,255,0.75)'},
                {k:'Vehicle surcharge (car)',v:'₦0',color:'rgba(255,255,255,0.75)'},
              ].map(r=>(
                <div key={r.k} style={{display:'flex',justifyContent:'space-between',fontSize:15,color:r.color,fontFamily:'Inter,sans-serif'}}>
                  <span>{r.k}</span><span style={{fontWeight:600}}>{r.v}</span>
                </div>
              ))}
              <div className="hr-d"/>
              <div style={{display:'flex',justifyContent:'space-between',fontSize:15,color:'rgba(255,255,255,0.75)',fontFamily:'Inter,sans-serif'}}>
                <span>Platform fee (10%)</span>
                <span style={{fontWeight:600,color:'#FF3B30'}}>- ₦660</span>
              </div>
              <div className="hr-d"/>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline'}}>
                <span style={{fontSize:15,fontWeight:600,color:'rgba(255,255,255,0.75)',fontFamily:'Inter,sans-serif'}}>You keep</span>
                <span style={{fontSize:34,fontWeight:800,color:'#C4F542',fontFamily:'Manrope,sans-serif',letterSpacing:-1}}>₦5,940</span>
              </div>
            </div>
            <div style={{marginTop:24,padding:14,background:'rgba(45,212,122,0.08)',borderRadius:12,border:'1px solid rgba(45,212,122,0.2)',fontSize:13,color:'rgba(255,255,255,0.65)',fontFamily:'Inter,sans-serif',lineHeight:1.5}}>
              Flat 10% platform fee on every job. No tiers, no hidden deductions — ever.
            </div>
          </div>
          {/* Benefits */}
          <div style={{display:'flex',flexDirection:'column',gap:28}}>
            {[
              { icon:ico.trend, title:'Flat 10% fee, nothing more', body:'Towber takes a flat 10% on every job. No tiers, no surprise deductions. The price shown in the job card is what hits your account minus 10%.' },
              { icon:ico.wallet, title:'Paid within 24 hours', body:'Earnings are released automatically once a job is confirmed complete. No waiting weeks. No chasing payments. Straight to your bank account.' },
              { icon:ico.clock, title:'You control your schedule', body:'Go online when you want, set a radius, set your hours. There are no quotas or minimums. This works around your life, not instead of it.' },
              { icon:ico.users, title:'Business account available', body:'Register your entire workshop under one account. Staff slot assignments, centralised payouts, and a single subscription for your whole team.' },
            ].map(b=>(
              <div key={b.title} style={{display:'flex',gap:18,alignItems:'flex-start'}}>
                <div style={{width:44,height:44,borderRadius:12,background:'#F0F0EB',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                  <Ic d={b.icon} s={20} c='#0A0A0A'/>
                </div>
                <div>
                  <div style={{fontSize:16,fontWeight:700,fontFamily:'Manrope,sans-serif',marginBottom:6,letterSpacing:-0.2}}>{b.title}</div>
                  <p style={{fontSize:14,color:'rgba(10,10,10,0.55)',lineHeight:1.65,fontFamily:'Inter,sans-serif'}}>{b.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── HOW PROVIDER WORKS ───────────────────────────────────────────
function HowProviderWorks() {
  const steps = [
    { n:1, title:'Apply and get verified', body:'Submit your ID, service vehicle details, and relevant documents. We review every application within 48 hours.' },
    { n:2, title:'Set up your tow vehicle', body:'Add your truck details and vehicle type. Pricing is calculated automatically — callout fee, per-km rate, and vehicle surcharge. No manual rate-setting needed.' },
    { n:3, title:'Go online when ready', body:'Toggle your availability from the dispatch screen. Jobs come to you based on your location, rating, and acceptance rate.' },
    { n:4, title:'Complete jobs and get paid', body:'Navigate to the customer, do the work, and mark it complete. Payment is released to your bank account within 24 hours.' },
  ];
  return (
    <section id="how-it-works" className="section" style={{background:'#F5F5F0'}}>
      <div className="c">
        <div style={{textAlign:'center',marginBottom:72}}>
          <div className="label" style={{color:'rgba(10,10,10,0.4)',marginBottom:16}}>Getting started</div>
          <h2 className="h-lg" style={{maxWidth:520,margin:'0 auto'}}>From application to first job in 48 hours</h2>
        </div>
        <div className="steps-grid">
          {steps.map(s=>(
            <div key={s.n} className="card card-hover" style={{padding:32}}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'center',width:52,height:52,borderRadius:'50%',background:'#0A0A0A',color:'#C4F542',fontFamily:'Manrope,sans-serif',fontWeight:800,fontSize:22,marginBottom:24,letterSpacing:-1}}>{s.n}</div>
              <h3 className="h-sm" style={{marginBottom:12}}>{s.title}</h3>
              <p className="body-md" style={{color:'rgba(10,10,10,0.55)',lineHeight:1.65}}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PLANS ────────────────────────────────────────────────────────
function PlansSection() {
  const plans = [
    {
      id:'individual', label:'Individual provider', price:'Free to join', sub:'Flat 10% per job, nothing else',
      features:['Tow dispatch jobs in your area','See payout before you accept','GPS tracking and navigation','In-app customer communication','24h payouts to your bank'],
      cta:'Apply as individual', highlight:false,
    },
    {
      id:'business', label:'Business / workshop', price:'From ₦25,000/mo', sub:'One subscription, whole team',
      features:['Up to unlimited staff/driver slots','Centralised payouts to business account','All team jobs and ratings in one view','Business verification badge','Priority placement and dedicated account manager'],
      cta:'Apply as business', highlight:true,
    },
  ];
  return (
    <section id="plans" className="section" style={{background:'#fff'}}>
      <div className="c">
        <div style={{textAlign:'center',marginBottom:72}}>
          <div className="label" style={{color:'rgba(10,10,10,0.4)',marginBottom:16}}>Provider plans</div>
          <h2 className="h-lg" style={{maxWidth:560,margin:'0 auto'}}>A model that works for every provider type</h2>
        </div>
        <div className="grid-2" style={{maxWidth:860,margin:'0 auto'}}>
          {plans.map(p=>(
            <div key={p.id} className="card card-hover" style={{padding:32,background:p.highlight?'#0A0A0A':'#fff',border:p.highlight?'none':'1px solid var(--border)',position:'relative',overflow:'hidden'}}>
              {p.highlight && <div style={{position:'absolute',top:0,left:0,right:0,height:3,background:'#C4F542'}}/>}
              <div style={{marginBottom:24}}>
                <div className="label" style={{color:p.highlight?'rgba(255,255,255,0.4)':'rgba(10,10,10,0.4)',marginBottom:12,fontSize:10}}>{p.label.toUpperCase()}</div>
                <div style={{fontSize:'clamp(24px,2.5vw,34px)',fontWeight:800,fontFamily:'Manrope,sans-serif',letterSpacing:-0.8,color:p.highlight?'#fff':'#0A0A0A',lineHeight:1}}>{p.price}</div>
                <div style={{fontSize:13,color:p.highlight?'rgba(255,255,255,0.4)':'rgba(10,10,10,0.4)',marginTop:6,fontFamily:'Inter,sans-serif'}}>{p.sub}</div>
              </div>
              <div className="hr-d" style={{borderBottom:`1px solid ${p.highlight?'rgba(255,255,255,0.1)':'rgba(10,10,10,0.08)'}`,marginBottom:24}}/>
              <div style={{display:'flex',flexDirection:'column',gap:12,marginBottom:32}}>
                {p.features.map(f=>(
                  <div key={f} style={{display:'flex',gap:10,alignItems:'flex-start'}}>
                    <div style={{width:18,height:18,borderRadius:'50%',background:p.highlight?'rgba(196,245,66,0.15)':'#F0F0EB',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:1}}>
                      <Ic d={ico.check2} s={10} c={p.highlight?'#C4F542':'#0A0A0A'} sw={2.5}/>
                    </div>
                    <span style={{fontSize:14,color:p.highlight?'rgba(255,255,255,0.7)':'rgba(10,10,10,0.65)',fontFamily:'Inter,sans-serif',lineHeight:1.45}}>{f}</span>
                  </div>
                ))}
              </div>
              <a href="#provider-waitlist" className={`btn ${p.highlight?'btn-lime':'btn-dark'}`} style={{width:'100%',justifyContent:'center',textDecoration:'none'}}>
                {p.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── WAITLIST ─────────────────────────────────────────────────────
function WaitlistCTA({ type='owner' }) {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  const id = type === 'owner' ? 'waitlist' : 'provider-waitlist';
  return (
    <section id={id} style={{background:'#C4F542',padding:'128px 0'}}>
      <div className="c" style={{textAlign:'center'}}>
        <div className="label" style={{color:'rgba(10,10,10,0.5)',marginBottom:16}}>
          {type === 'owner' ? 'Early access' : 'Provider applications'}
        </div>
        <h2 className="h-lg" style={{maxWidth:640,margin:'0 auto 20px',color:'#0A0A0A'}}>
          {type === 'owner'
            ? 'Be among the first in Lagos when we launch.'
            : 'Join the founding provider network today.'}
        </h2>
        <p style={{fontSize:18,color:'rgba(10,10,10,0.6)',maxWidth:480,margin:'0 auto 48px',fontFamily:'Inter,sans-serif',lineHeight:1.65}}>
          {type === 'owner'
            ? 'Leave your email and we will notify you the moment Towber is live in your area.'
            : 'Early providers lock in reduced commission rates and get priority placement when we launch.'}
        </p>
        {done ? (
          <div className="card" style={{display:'inline-flex',alignItems:'center',gap:12,padding:'16px 28px',borderRadius:99}}>
            <div style={{width:28,height:28,borderRadius:'50%',background:'#C4F542',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <Ic d={ico.check2} s={14} c='#0A0A0A' sw={2.5}/>
            </div>
            <span style={{fontSize:15,fontWeight:600,fontFamily:'Inter,sans-serif'}}>You are on the list. We will be in touch.</span>
          </div>
        ) : (
          <form onSubmit={e=>{e.preventDefault();if(email)setDone(true)}} style={{display:'flex',gap:8,maxWidth:460,margin:'0 auto',flexWrap:'wrap',justifyContent:'center'}}>
            <input
              type="email" value={email} onChange={e=>setEmail(e.target.value)}
              required placeholder="Enter your email address"
              className="input-field"
              style={{flex:1,minWidth:240,background:'rgba(255,255,255,0.8)',border:'1.5px solid rgba(10,10,10,0.15)',borderRadius:99,height:56,padding:'0 22px',fontSize:15}}
            />
            <button type="submit" className="btn btn-dark btn-lg">
              {type === 'owner' ? 'Notify me' : 'Apply now'}
              <Ic d={ico.arrow} s={17} c='currentColor'/>
            </button>
          </form>
        )}
        <p style={{fontSize:13,color:'rgba(10,10,10,0.4)',marginTop:20,fontFamily:'Inter,sans-serif'}}>
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────
function Footer({ setMode }) {
  const links = {
    Product: ['How it works','Tow to destination','Move to safety','Safety','Pricing'],
    Providers: ['Apply as provider','Business accounts','Earnings','Help centre'],
    Company: ['About Towber','Careers','Blog','Press kit','Contact'],
    Legal: ['Terms of service','Privacy policy','Cookie policy','Data protection'],
  };
  return (
    <footer style={{background:'#0A0A0A',padding:'80px 0 40px'}}>
      <div className="c">
        <div className="footer-grid" style={{display:'grid',gap:48,paddingBottom:64,borderBottom:'1px solid rgba(255,255,255,0.08)'}}>
          {/* Brand */}
          <div>
            <div style={{display:'flex',alignItems:'center',gap:9,marginBottom:20}}>
              <div style={{width:36,height:36,borderRadius:10,background:'#C4F542',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,fontWeight:800,color:'#0A0A0A',fontFamily:'Manrope,sans-serif'}}>T</div>
              <span style={{fontSize:20,fontWeight:700,color:'#fff',letterSpacing:-0.5,fontFamily:'Manrope,sans-serif'}}>towber</span>
            </div>
            <p style={{fontSize:14,color:'rgba(255,255,255,0.45)',lineHeight:1.7,maxWidth:280,fontFamily:'Inter,sans-serif',marginBottom:28}}>
              On-demand towing for Lagos. Tow to a workshop or move to safety — verified towers, transparent pricing, live tracking.
            </p>
            <div style={{display:'flex',gap:10}}>
              {['twitter','linkedin','instagram'].map(s=>(
                <a key={s} href="#" style={{width:38,height:38,borderRadius:'50%',background:'rgba(255,255,255,0.07)',display:'flex',alignItems:'center',justifyContent:'center',border:'1px solid rgba(255,255,255,0.1)',transition:'background .15s'}}
                  onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.12)'}
                  onMouseLeave={e=>e.currentTarget.style.background='rgba(255,255,255,0.07)'}>
                  <span style={{fontSize:11,color:'rgba(255,255,255,0.5)',fontFamily:'Geist Mono,monospace'}}>{s[0].toUpperCase()}</span>
                </a>
              ))}
            </div>
          </div>
          {Object.entries(links).map(([section,items])=>(
            <div key={section}>
              <div className="label" style={{color:'rgba(255,255,255,0.3)',marginBottom:20,fontSize:10}}>{section.toUpperCase()}</div>
              <div style={{display:'flex',flexDirection:'column',gap:12}}>
                {items.map(l=>(
                  <a key={l} href="#" style={{fontSize:14,color:'rgba(255,255,255,0.5)',fontFamily:'Inter,sans-serif',transition:'color .15s'}}
                    onMouseEnter={e=>e.target.style.color='#fff'}
                    onMouseLeave={e=>e.target.style.color='rgba(255,255,255,0.5)'}>{l}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="footer-bottom-row" style={{paddingTop:32,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:16}}>
          <span style={{fontSize:13,color:'rgba(255,255,255,0.3)',fontFamily:'Inter,sans-serif'}}>2026 Towber Technologies Limited. All rights reserved. Lagos, Nigeria.</span>
          <div style={{display:'flex',gap:6}}>
            <button onClick={()=>setMode('owner')} style={{fontSize:12,color:'rgba(255,255,255,0.35)',fontFamily:'Inter,sans-serif',background:'none',border:'none',cursor:'pointer',padding:0}}>For owners</button>
            <span style={{color:'rgba(255,255,255,0.2)'}}>·</span>
            <button onClick={()=>setMode('provider')} style={{fontSize:12,color:'rgba(255,255,255,0.35)',fontFamily:'Inter,sans-serif',background:'none',border:'none',cursor:'pointer',padding:0}}>For providers</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── APP ──────────────────────────────────────────────────────────
function App() {
  const [mode, setMode] = useState('owner');
  useEffect(()=>{
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
    },{ threshold:0.1 });
    document.querySelectorAll('.fade-up').forEach(el=>obs.observe(el));
    return ()=>obs.disconnect();
  },[mode]);
  useEffect(()=>{ window.scrollTo({ top: 0, behavior: 'instant' }); },[mode]);

  return (
    <div>
      <Nav mode={mode} setMode={setMode}/>
      {mode === 'owner' ? (
        <>
          <OwnerHero setMode={setMode}/>
          <TrustBar/>
          <HowItWorks/>
          <NegotiateFeature/>
          <ServicesSection/>
          <SafetySection/>
          <Testimonials type="owner"/>
          <WaitlistCTA type="owner"/>
        </>
      ) : (
        <>
          <ProviderHero setMode={setMode}/>
          <EarningsSection/>
          <HowProviderWorks/>
          <PlansSection/>
          <Testimonials type="provider"/>
          <WaitlistCTA type="provider"/>
        </>
      )}
      <Footer setMode={setMode}/>
    </div>
  );
}

export default function LandingPageClient() {
  return <App />;
}
