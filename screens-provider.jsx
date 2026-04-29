// Provider flow: dispatch, incoming job, earnings
const { useState: useStP } = React;

function ProviderHome({ dark, setScreen }) {
  const [online, setOnline] = useStP(true);
  return (
    <div style={{ position: 'relative', minHeight: '100%', background: 'var(--bg)' }}>
      <MapCanvas dark={dark} showRoute={false}>
        <MapPin x={50} y={55} variant="user" pulse={false}/>
      </MapCanvas>

      {/* Top overlay */}
      <div style={{ position: 'absolute', top: 54, left: 16, right: 16, zIndex: 30, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{
          background: 'var(--bg-2)', border: '1px solid var(--line)',
          borderRadius: 99, padding: '6px 12px 6px 6px',
          display: 'flex', alignItems: 'center', gap: 8,
          boxShadow: 'var(--shadow-sm)',
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%', background: '#C4C7D4',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontSize: 13,
          }}>T</div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, lineHeight: 1 }}>Tunde O.</div>
            <div className="mono" style={{ fontSize: 10, color: 'var(--ok)', marginTop: 2 }}>● ONLINE</div>
          </div>
        </div>
        <button style={{
          width: 44, height: 44, borderRadius: 14, background: 'var(--bg-2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: 'var(--shadow-sm)', border: '1px solid var(--line)',
        }}><I.bell size={20}/></button>
      </div>

      {/* Online toggle */}
      <div style={{ position: 'absolute', top: 120, left: '50%', transform: 'translateX(-50%)', zIndex: 30 }}>
        <button onClick={() => setOnline(!online)} style={{
          padding: '10px 22px', borderRadius: 99,
          background: online ? '#0A0A0A' : 'var(--bg-2)',
          color: online ? '#fff' : 'var(--ink)',
          fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8,
          boxShadow: 'var(--shadow-md)', border: '1px solid var(--line)',
        }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: online ? '#C4F542' : 'var(--ink-4)' }}/>
          {online ? 'You are online · accepting jobs' : 'Go online'}
        </button>
      </div>

      {/* Stats panel */}
      <div className="sheet" style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 35, paddingBottom: 8,
      }}>
        <div style={{ padding: '14px 16px 0' }}>
          <div style={{ width: 36, height: 4, background: 'var(--line-2)', borderRadius: 99, margin: '0 auto 14px' }}/>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            {[
              { k: 'TODAY', v: '₦24,500', sub: '6 jobs' },
              { k: 'RATING', v: '4.9', sub: '312 jobs' },
              { k: 'ACCEPTANCE', v: '98%', sub: 'Last 30d' },
            ].map(s => (
              <div key={s.k} style={{ padding: 14, background: 'var(--bg-3)', borderRadius: 14 }}>
                <div className="mono" style={{ fontSize: 10, color: 'var(--ink-3)', letterSpacing: 0.4 }}>{s.k}</div>
                <div style={{ fontSize: 20, fontWeight: 700, marginTop: 4, letterSpacing: -0.5 }}>{s.v}</div>
                <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Services status */}
          <div style={{ marginTop: 14 }}>
            <div style={{ fontSize: 12, color: 'var(--ink-3)', marginBottom: 10, letterSpacing: 0.3 }} className="mono">
              SERVICES YOU OFFER
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { icon: I.tow, name: 'Towing', price: '₦5,000 base', on: true },
                { icon: I.tire, name: 'Flat tyre', price: '₦3,500', on: true },
                { icon: I.battery, name: 'Jump start', price: '₦2,500', on: false },
              ].map(s => (
                <div key={s.name} className="card" style={{ padding: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--bg-3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <s.icon size={18}/>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{s.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>{s.price}</div>
                  </div>
                  <div style={{
                    width: 40, height: 24, borderRadius: 99, background: s.on ? '#C4F542' : 'var(--bg-3)',
                    position: 'relative',
                  }}>
                    <div style={{
                      position: 'absolute', top: 2, left: s.on ? 18 : 2,
                      width: 20, height: 20, borderRadius: '50%', background: '#fff',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
                    }}/>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {online && (
            <div style={{
              marginTop: 14, padding: 14, background: 'var(--bg-3)', borderRadius: 14,
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: '#C4F542', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <I.bolt size={18} color="#0A0A0A"/>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>Listening for jobs…</div>
                <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>Last heartbeat · just now</div>
              </div>
              <button onClick={() => setScreen('incoming')} style={{
                padding: '8px 12px', fontSize: 11, fontWeight: 600,
                background: 'var(--ink)', color: 'var(--bg-2)', borderRadius: 10,
              }} className="mono">DEMO INCOMING</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProviderIncoming({ dark, setScreen }) {
  const [counterOpen, setCounterOpen] = useStP(false);
  const [sec, setSec] = useStP(78);
  React.useEffect(() => {
    const t = setInterval(() => setSec(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ position: 'relative', minHeight: '100%', background: 'var(--bg)' }}>
      <MapCanvas dark={dark} showRoute>
        <MapPin x={50} y={70} variant="user"/>
        <MapPin x={30} y={40} variant="provider" label="You"/>
      </MapCanvas>

      {/* Incoming card */}
      <div className="sheet" style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 40, paddingBottom: 24,
      }}>
        <div style={{ padding: '14px 16px 0' }}>
          <div style={{ width: 36, height: 4, background: 'var(--line-2)', borderRadius: 99, margin: '0 auto 14px' }}/>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <div className="chip accent" style={{ fontSize: 10 }}>NEW JOB</div>
            <div className="mono" style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: 0.4 }}>
              EXPIRES IN 0:{String(sec).padStart(2, '0')}
            </div>
            <div style={{ flex: 1 }}/>
            <div className="mono" style={{ fontSize: 11, color: 'var(--ink-3)' }}>2.4 km · 8 min</div>
          </div>

          {/* Countdown bar */}
          <div style={{ height: 3, background: 'var(--bg-3)', borderRadius: 99, overflow: 'hidden', marginBottom: 14 }}>
            <div style={{ height: '100%', width: `${(sec/90)*100}%`, background: sec < 20 ? 'var(--danger)' : '#C4F542', transition: 'width 1s linear' }}/>
          </div>

          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{
              width: 52, height: 52, borderRadius: 14, background: '#C4F542',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <I.tire size={26} color="#0A0A0A"/>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: -0.3 }}>Flat tyre change</div>
              <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>
                2018 Toyota Corolla · Pearl white
              </div>
            </div>
          </div>

          <div style={{ marginTop: 14, padding: 14, background: 'var(--bg-3)', borderRadius: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
            <I.location size={16}/>
            <div style={{ flex: 1, fontSize: 13 }}>
              14B Admiralty Way, Lekki Phase 1
            </div>
          </div>

          {/* Earnings breakdown */}
          <div style={{ marginTop: 12 }}>
            <div className="card" style={{ padding: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                <span style={{ color: 'var(--ink-3)' }}>Service fee</span>
                <span style={{ fontWeight: 500 }}>₦3,500</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                <span style={{ color: 'var(--ink-3)' }}>Transport (customer offered)</span>
                <span style={{ fontWeight: 500 }}>₦1,800</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 8 }}>
                <span style={{ color: 'var(--ink-3)' }}>Platform commission (15%)</span>
                <span style={{ fontWeight: 500, color: 'var(--danger)' }}>−₦795</span>
              </div>
              <div className="hr" style={{ margin: '8px 0' }}/>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>YOU EARN</span>
                <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.5 }}>₦4,505</span>
              </div>
            </div>
          </div>

          {!counterOpen ? (
            <div style={{ marginTop: 14, display: 'flex', gap: 10 }}>
              <button onClick={() => setScreen('home')} style={{
                flex: 1, height: 52, borderRadius: 14, background: 'var(--bg-3)',
                color: 'var(--ink)', fontSize: 15, fontWeight: 600,
              }}>Decline</button>
              <button onClick={() => setCounterOpen(true)} style={{
                flex: 1, height: 52, borderRadius: 14, background: 'var(--bg-3)',
                color: 'var(--ink)', fontSize: 15, fontWeight: 600,
              }}>Counter</button>
              <button onClick={() => setScreen('activejob')} style={{
                flex: 1.4, height: 52, borderRadius: 14, background: '#C4F542',
                color: '#0A0A0A', fontSize: 15, fontWeight: 700,
              }}>Accept</button>
            </div>
          ) : (
            <div style={{ marginTop: 14 }} className="fade-up">
              <div style={{ fontSize: 12, color: 'var(--ink-3)', marginBottom: 8 }} className="mono">
                PROPOSE TRANSPORT (CAP ₦2,500)
              </div>
              <div style={{
                padding: 14, background: 'var(--bg-3)', borderRadius: 14,
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <div style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.8 }}>₦2,200</div>
                  <div style={{ fontSize: 11, color: 'var(--ink-3)' }} className="mono">YOUR COUNTER</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                <button onClick={() => setCounterOpen(false)} style={{ flex: 1, height: 46, borderRadius: 12, background: 'var(--bg-3)', fontWeight: 600, fontSize: 14 }}>Cancel</button>
                <button className="btn btn-primary" style={{ flex: 2 }}>Send counter-offer</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProviderActive({ dark, setScreen, back }) {
  const [stage, setStage] = useStP(0);
  const stages = ['Start trip', 'I have arrived', 'Start service', 'Complete job'];
  return (
    <div style={{ position: 'relative', height: '100%', background: 'var(--bg)' }}>
      <MapCanvas dark={dark} showRoute>
        <MapPin x={50} y={70} variant="user"/>
        <MapPin x={stage === 0 ? 30 : stage === 1 ? 45 : 50} y={stage === 0 ? 40 : stage === 1 ? 60 : 70} variant="provider" label="You"/>
      </MapCanvas>

      <button onClick={back} style={{
        position: 'absolute', top: 54, left: 16, zIndex: 30,
        width: 44, height: 44, borderRadius: 14, background: 'var(--bg-2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: 'var(--shadow-sm)', border: '1px solid var(--line)',
      }}><I.chevronL size={20}/></button>

      <div style={{
        position: 'absolute', top: 60, left: '50%', transform: 'translateX(-50%)', zIndex: 30,
        background: '#0A0A0A', color: '#fff',
        padding: '8px 14px 8px 10px', borderRadius: 99,
        display: 'flex', alignItems: 'center', gap: 8,
        boxShadow: 'var(--shadow-md)',
      }}>
        <I.nav size={16} color="#C4F542"/>
        <span style={{ fontSize: 13, fontWeight: 600 }}>
          {stage === 0 ? 'Navigate · 2.4 km' : stage === 1 ? 'Customer notified' : stage === 2 ? 'In progress' : 'Wrap-up'}
        </span>
      </div>

      <div className="sheet" style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 35, paddingBottom: 24,
      }}>
        <div style={{ padding: '14px 16px 0' }}>
          <div style={{ width: 36, height: 4, background: 'var(--line-2)', borderRadius: 99, margin: '0 auto 12px' }}/>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 44, height: 44, borderRadius: '50%', background: '#C4D4B5',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700,
            }}>A</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 600 }}>Adaeze Okafor</div>
              <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>Flat tyre · Corolla · LAG-472-KJA</div>
            </div>
            <button style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--bg-3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <I.chat size={18}/>
            </button>
            <button style={{ width: 40, height: 40, borderRadius: 12, background: '#0A0A0A', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <I.phone size={18}/>
            </button>
          </div>

          <div style={{ marginTop: 14, padding: 14, background: 'var(--bg-3)', borderRadius: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
            <I.location size={16} color="var(--ink-2)"/>
            <div style={{ flex: 1, fontSize: 13 }}>14B Admiralty Way, Lekki Phase 1</div>
            <button style={{ padding: '6px 10px', borderRadius: 8, background: 'var(--bg-2)', fontSize: 11, fontWeight: 600 }}>Open maps</button>
          </div>

          {/* Step progress */}
          <div style={{ marginTop: 14 }}>
            <div style={{ display: 'flex', gap: 4, marginBottom: 10 }}>
              {[0,1,2,3].map(i => (
                <div key={i} style={{
                  flex: 1, height: 3, borderRadius: 99,
                  background: i <= stage ? '#C4F542' : 'var(--bg-3)',
                }}/>
              ))}
            </div>
            <div style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: 0.3 }} className="mono">
              STEP {stage+1} OF 4 · EARNING ₦4,505
            </div>
          </div>

          <button onClick={() => stage < 3 ? setStage(stage+1) : setScreen('home')} className="btn btn-primary"
            style={{ width: '100%', height: 56, marginTop: 14 }}>
            {stages[stage]} <I.arrowRight size={18}/>
          </button>
        </div>
      </div>
    </div>
  );
}

function ProviderEarnings({ dark, setScreen }) {
  const days = [40, 65, 48, 72, 58, 85, 92];
  const labels = ['M','T','W','T','F','S','S'];
  return (
    <div style={{ minHeight: '100%', background: 'var(--bg)', paddingBottom: 100 }}>
      <div style={{ padding: '54px 16px 12px' }}>
        <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.8 }}>Earnings</div>
        <div style={{ fontSize: 14, color: 'var(--ink-3)' }}>This week</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{
          padding: 20, borderRadius: 20, background: '#0A0A0A', color: '#fff',
        }}>
          <div className="mono" style={{ fontSize: 10, color: '#C4F542', letterSpacing: 0.5 }}>WEEK 16 · AVAILABLE BALANCE</div>
          <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: -1.4, marginTop: 6 }}>₦142,500</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
            <I.trendUp size={14} color="#C4F542"/>
            <span>+18% vs last week</span>
          </div>

          {/* Chart */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 90, marginTop: 20 }}>
            {days.map((h, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{ flex: 1, width: '100%', display: 'flex', alignItems: 'flex-end' }}>
                  <div style={{
                    width: '100%', height: `${h}%`, borderRadius: 6,
                    background: i === 6 ? '#C4F542' : 'rgba(255,255,255,0.2)',
                  }}/>
                </div>
                <div style={{ fontSize: 10, color: i === 6 ? '#C4F542' : 'rgba(255,255,255,0.5)', fontWeight: 500 }}>{labels[i]}</div>
              </div>
            ))}
          </div>

          <button style={{
            width: '100%', marginTop: 18, height: 48, borderRadius: 14,
            background: '#C4F542', color: '#0A0A0A', fontSize: 15, fontWeight: 700,
          }} onClick={() => setScreen && setScreen('withdraw')}>
            Withdraw to bank
          </button>
        </div>
      </div>

      <div style={{ padding: '20px 16px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {[
          { k: 'JOBS', v: '28', sub: 'This week' },
          { k: 'AVG/JOB', v: '₦5,089', sub: 'After commission' },
          { k: 'ONLINE', v: '42h 18m', sub: 'Logged' },
          { k: 'ACCEPTANCE', v: '98%', sub: 'Last 30d' },
        ].map(s => (
          <div key={s.k} className="card" style={{ padding: 14 }}>
            <div className="mono" style={{ fontSize: 10, color: 'var(--ink-3)', letterSpacing: 0.4 }}>{s.k}</div>
            <div style={{ fontSize: 20, fontWeight: 700, marginTop: 4, letterSpacing: -0.5 }}>{s.v}</div>
            <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: '20px' }}>
        <div style={{ fontSize: 12, color: 'var(--ink-3)', marginBottom: 10, letterSpacing: 0.3 }} className="mono">
          RECENT PAYOUTS
        </div>
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          {[
            { t: 'Flat tyre · Adaeze O.', sub: 'Today · 14:32', amt: '+₦4,505' },
            { t: 'Towing · Kemi A.', sub: 'Today · 11:04', amt: '+₦6,800' },
            { t: 'Jump start · Femi L.', sub: 'Yesterday', amt: '+₦2,125' },
            { t: 'Withdrawal to GTB', sub: 'Apr 14', amt: '−₦80,000' },
          ].map((r, i, arr) => (
            <div key={i} style={{
              padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10,
              borderBottom: i < arr.length - 1 ? '1px solid var(--line)' : 'none',
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10, background: 'var(--bg-3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {r.amt.startsWith('+') ? <I.arrowUp size={16} color="var(--ok)"/> : <I.wallet size={16}/>}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{r.t}</div>
                <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>{r.sub}</div>
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: r.amt.startsWith('+') ? 'var(--ok)' : 'var(--ink)' }}>{r.amt}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ProviderHome, ProviderIncoming, ProviderActive, ProviderEarnings });
