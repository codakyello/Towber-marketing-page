// Shared primitives for Towber
const { useState, useEffect, useRef, useMemo } = React;

// Phone wrapper — iOS with our content
function Phone({ dark, children, label }) {
  return (
    <div data-screen-label={label} style={{
      width: 390, height: 844, borderRadius: 54, padding: 8,
      background: dark ? '#0A0A0A' : '#F0F0EC',
      boxShadow: dark
        ? '0 40px 80px rgba(0,0,0,0.4), 0 0 0 10px #1a1a1a, 0 0 0 11px #2a2a2a'
        : '0 40px 80px rgba(10,10,10,0.12), 0 0 0 10px #1a1a1a, 0 0 0 11px #2a2a2a',
      position: 'relative', overflow: 'hidden',
      fontFamily: "'Geist', -apple-system, system-ui, sans-serif",
    }} className={dark ? 'dark' : ''}>
      <div style={{
        width: '100%', height: '100%',
        borderRadius: 46, overflow: 'hidden', position: 'relative',
        background: 'var(--bg)', color: 'var(--ink)',
      }} className="screen-root">
        {/* dynamic island */}
        <div style={{
          position: 'absolute', top: 9, left: '50%', transform: 'translateX(-50%)',
          width: 120, height: 34, borderRadius: 22, background: '#000', zIndex: 100,
        }} />
        {/* Status bar */}
        <StatusBar dark={dark} />
        {/* Content */}
        <div className="screen" style={{
          position: 'absolute', inset: 0, top: 0,
          overflowY: 'auto', overflowX: 'hidden',
        }}>
          {children}
        </div>
        {/* Home indicator */}
        <div style={{
          position: 'absolute', bottom: 8, left: 0, right: 0, zIndex: 200,
          display: 'flex', justifyContent: 'center', pointerEvents: 'none',
        }}>
          <div style={{
            width: 134, height: 5, borderRadius: 99,
            background: dark ? 'rgba(255,255,255,0.7)' : 'rgba(10,10,10,0.3)',
          }} />
        </div>
      </div>
    </div>
  );
}

function StatusBar({ dark, time = '9:41' }) {
  const c = dark ? '#fff' : '#000';
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, zIndex: 60,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '16px 30px 0', height: 50,
      color: c, pointerEvents: 'none',
    }}>
      <span style={{ fontSize: 16, fontWeight: 600, letterSpacing: -0.3 }}>{time}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <svg width="18" height="11" viewBox="0 0 18 11">
          {[0,1,2,3].map(i => (
            <rect key={i} x={i*4.5} y={11-(i+1)*2.5} width="3" height={(i+1)*2.5} rx="0.5" fill={c}/>
          ))}
        </svg>
        <svg width="16" height="11" viewBox="0 0 16 11" fill={c}>
          <path d="M8 2C10 2 11.8 2.7 13.2 4l1-1A8 8 0 008 1a8 8 0 00-6.2 2l1 1A6 6 0 018 2zM8 5.5a4 4 0 012.8 1.2l1-1a5.5 5.5 0 00-7.6 0l1 1A4 4 0 018 5.5z"/>
          <circle cx="8" cy="9" r="1.2"/>
        </svg>
        <svg width="26" height="11" viewBox="0 0 26 11">
          <rect x="0.5" y="0.5" width="22" height="10" rx="3" fill="none" stroke={c} strokeOpacity="0.4"/>
          <rect x="2" y="2" width="18" height="7" rx="1.5" fill={c}/>
          <path d="M23.5 3.5v4c.8-.2 1.3-.9 1.3-2s-.5-1.8-1.3-2z" fill={c} fillOpacity="0.5"/>
        </svg>
      </div>
    </div>
  );
}

// Stylized map (CSS/SVG)
function MapCanvas({ dark, children, showRoute = true }) {
  const bg = dark ? '#0F0F0F' : '#E8E8E2';
  const road = dark ? '#1E1E1E' : '#D2D2CC';
  const roadMajor = dark ? '#2A2A2A' : '#C4C4BC';
  const park = dark ? '#141C14' : '#DDE4D2';
  const water = dark ? '#0E1418' : '#D0DCE2';
  return (
    <div style={{ position: 'absolute', inset: 0, background: bg, overflow: 'hidden' }}>
      <svg viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        {/* park */}
        <rect x="240" y="60" width="140" height="100" fill={park} rx="8"/>
        <rect x="20" y="420" width="130" height="130" fill={park} rx="8"/>
        {/* water */}
        <path d="M-20 520 C 80 540, 180 500, 280 540 L 280 640 L -20 640 Z" fill={water}/>
        {/* roads */}
        <rect x="0" y="270" width="400" height="28" fill={roadMajor}/>
        <rect x="180" y="0" width="22" height="600" fill={roadMajor}/>
        <rect x="0" y="130" width="400" height="8" fill={road}/>
        <rect x="0" y="380" width="400" height="8" fill={road}/>
        <rect x="60" y="0" width="6" height="600" fill={road}/>
        <rect x="320" y="0" width="6" height="600" fill={road}/>
        {/* road lines */}
        <line x1="0" y1="284" x2="400" y2="284" stroke={dark ? '#444' : '#fff'} strokeWidth="1" strokeDasharray="10 8" opacity="0.5"/>
        <line x1="191" y1="0" x2="191" y2="600" stroke={dark ? '#444' : '#fff'} strokeWidth="1" strokeDasharray="10 8" opacity="0.5"/>
        {/* buildings */}
        {[
          [80, 150, 80, 100], [170, 150, 8, 100], // holes in grid
          [90, 170, 60, 60], [100, 310, 50, 50], [230, 180, 80, 60],
          [230, 310, 70, 50], [330, 310, 50, 70], [330, 180, 50, 40],
          [230, 430, 60, 50], [330, 430, 50, 60], [90, 300, 70, 50],
        ].map((b, i) => (
          <rect key={i} x={b[0]} y={b[1]} width={b[2]} height={b[3]}
            fill={dark ? '#181818' : '#E0E0DA'} rx="2"/>
        ))}
        {/* route */}
        {showRoute && (
          <path d="M 60 540 L 60 298 L 191 298 L 191 130 L 320 130"
            fill="none" stroke="#C4F542" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray="0" />
        )}
      </svg>
      {children}
    </div>
  );
}

// Map pin (user or provider)
function MapPin({ x, y, variant = 'user', pulse, label }) {
  const isProv = variant === 'provider';
  return (
    <div style={{
      position: 'absolute', left: `${x}%`, top: `${y}%`,
      transform: 'translate(-50%, -100%)', zIndex: 10,
    }}>
      {pulse && !isProv && (
        <div style={{
          position: 'absolute', left: '50%', bottom: -4,
          width: 40, height: 40, marginLeft: -20, marginBottom: -20,
          borderRadius: '50%', background: '#C4F542',
        }} className="pulse-ring"/>
      )}
      {isProv ? (
        <div style={{
          background: '#0A0A0A', color: '#C4F542',
          padding: '6px 10px 6px 6px', borderRadius: 99,
          display: 'flex', alignItems: 'center', gap: 6,
          boxShadow: '0 6px 18px rgba(0,0,0,0.25)',
          fontSize: 11, fontWeight: 600,
        }}>
          <div style={{
            width: 20, height: 20, borderRadius: '50%', background: '#C4F542',
            color: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5 17h14l-2-6h-3l-2-5H9L7 11H5z"/>
            </svg>
          </div>
          {label || 'Tow'}
        </div>
      ) : (
        <div style={{
          width: 28, height: 28, borderRadius: '50%',
          background: '#0A0A0A', border: '3px solid #C4F542',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute', left: '50%', top: '100%',
            width: 0, height: 0, transform: 'translateX(-50%)',
            borderLeft: '5px solid transparent', borderRight: '5px solid transparent',
            borderTop: '8px solid #C4F542',
          }}/>
        </div>
      )}
    </div>
  );
}

// Tab bar
function TabBar({ active, onTab, dark }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: I.home },
    { id: 'market', label: 'Market', icon: I.grid },
    { id: 'activity', label: 'Activity', icon: I.list },
    { id: 'profile', label: 'Profile', icon: I.user },
  ];
  return (
    <div className="tabbar" style={{ position: 'relative', zIndex: 40 }}>
      {tabs.map(t => (
        <button key={t.id} className={`tab ${active === t.id ? 'active' : ''}`}
          onClick={() => onTab && onTab(t.id)}>
          <t.icon size={22} color="currentColor"/>
          <span>{t.label}</span>
        </button>
      ))}
    </div>
  );
}

// Provider tab bar
function ProviderTabBar({ active, onTab }) {
  const tabs = [
    { id: 'home', label: 'Dispatch', icon: I.bolt },
    { id: 'jobs', label: 'Jobs', icon: I.list },
    { id: 'earn', label: 'Earnings', icon: I.wallet },
    { id: 'profile', label: 'Profile', icon: I.user },
  ];
  return (
    <div className="tabbar" style={{ position: 'relative', zIndex: 40 }}>
      {tabs.map(t => (
        <button key={t.id} className={`tab ${active === t.id ? 'active' : ''}`}
          onClick={() => onTab && onTab(t.id)}>
          <t.icon size={22} color="currentColor"/>
          <span>{t.label}</span>
        </button>
      ))}
    </div>
  );
}

// Simple header
function Header({ title, back, right, dark, sub }) {
  return (
    <div className="screen-header" style={{
      paddingTop: 58, position: 'relative', zIndex: 30,
    }}>
      {back && (
        <button onClick={back} className="back-btn">
          <I.chevronL size={18}/>
        </button>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && <div className="title">{title}</div>}
        {sub && <div className="sub">{sub}</div>}
      </div>
      {right}
    </div>
  );
}

// Brand logo
function Logo({ size = 28, dark }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{
        width: size, height: size, borderRadius: size * 0.28,
        background: '#C4F542', color: '#0A0A0A',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: 800, fontSize: size * 0.55, letterSpacing: -0.5,
      }}>T</div>
      <span style={{
        fontSize: size * 0.62, fontWeight: 700, letterSpacing: -0.8,
        color: 'var(--ink)',
      }}>towber</span>
    </div>
  );
}

Object.assign(window, { Phone, MapCanvas, MapPin, TabBar, ProviderTabBar, Header, Logo, StatusBar });
