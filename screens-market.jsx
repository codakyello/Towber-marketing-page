// Marketplace, Chat, Rating, Activity, Profile, Provider screens
const { useState: useStM } = React;

// SERVICES MARKETPLACE
function MarketServices({ dark, setScreen }) {
  const cats = ['All','Mechanic','Detailing','Body','Electrical','Wraps','Tyres'];
  const [cat, setCat] = useStM('All');
  const listings = [
    { id:1, title:'Full engine diagnostic + tune-up', shop:'Axle Garage Lekki', rating:4.9, jobs:204, from:28000, dur:'3-4 hrs', verified:true, pic:'#E8D5B5' },
    { id:2, title:'Premium ceramic coating (9H)', shop:'Mirror Finish Auto', rating:4.8, jobs:142, from:85000, dur:'2 days', verified:true, pic:'#C4C4BC' },
    { id:3, title:'Brake pad + disc replacement', shop:'Speedwerks VI', rating:4.6, jobs:88, from:45000, dur:'2 hrs', verified:false, pic:'#B5C7D4' },
    { id:4, title:'Car wrapping — full body', shop:'Wrap City', rating:4.9, jobs:56, from:280000, dur:'3 days', verified:true, pic:'#D4B5C7' },
  ];
  return (
    <div style={{ minHeight: '100%', background: 'var(--bg)', paddingBottom: 100 }}>
      <div style={{ padding: '54px 16px 12px' }}>
        <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.8 }}>Marketplace</div>
        <div style={{ fontSize: 14, color: 'var(--ink-3)', marginTop: 2 }}>Book mechanics, detailers, body shops</div>
      </div>
      {/* tabs */}
      <div style={{ padding: '0 16px 12px', display: 'flex', gap: 6 }}>
        <button onClick={() => setScreen('market-parts')} style={{
          flex: 1, height: 44, borderRadius: 12, background: 'var(--bg-3)',
          fontSize: 14, fontWeight: 600, color: 'var(--ink-3)',
        }}>Spare parts</button>
        <button style={{
          flex: 1, height: 44, borderRadius: 12, background: 'var(--ink)', color: 'var(--bg-2)',
          fontSize: 14, fontWeight: 600,
        }}>Services</button>
      </div>

      {/* search */}
      <div style={{ padding: '0 16px 12px' }}>
        <div style={{
          height: 48, borderRadius: 14, background: 'var(--bg-2)',
          border: '1px solid var(--line)',
          display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px',
        }}>
          <I.search size={18} color="var(--ink-3)"/>
          <span style={{ fontSize: 14, color: 'var(--ink-3)' }}>Search services…</span>
        </div>
      </div>

      {/* categories */}
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '0 16px 14px' }}>
        {cats.map(c => (
          <button key={c} onClick={() => setCat(c)} style={{
            height: 36, padding: '0 14px', borderRadius: 99, flexShrink: 0,
            background: cat === c ? 'var(--ink)' : 'var(--bg-2)',
            color: cat === c ? 'var(--bg-2)' : 'var(--ink-2)',
            fontSize: 13, fontWeight: 500,
            border: '1px solid var(--line)',
          }}>{c}</button>
        ))}
      </div>

      {/* featured strip */}
      <div style={{ padding: '0 16px 14px' }}>
        <div style={{
          borderRadius: 18, padding: 18, background: '#0A0A0A', color: '#fff',
          position: 'relative', overflow: 'hidden',
        }}>
          <div className="mono" style={{ fontSize: 10, color: '#C4F542', letterSpacing: 0.6 }}>FEATURED THIS WEEK</div>
          <div style={{ fontSize: 18, fontWeight: 700, marginTop: 6, letterSpacing: -0.4, lineHeight: 1.2 }}>
            Pre-rainy season<br/>car check-up
          </div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', marginTop: 8, maxWidth: 220 }}>
            From ₦15,000 · 8 verified workshops
          </div>
          <div style={{
            position: 'absolute', top: 20, right: 18, width: 60, height: 60, borderRadius: 14,
            background: '#C4F542', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <I.sparkle size={28} color="#0A0A0A"/>
          </div>
        </div>
      </div>

      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {listings.map(l => (
          <button key={l.id} onClick={() => setScreen('listing')} className="card" style={{ padding: 12, display: 'flex', gap: 12, textAlign: 'left' }}>
            <div className="placeholder" style={{ width: 80, height: 80, flexShrink: 0, background: l.pic, border: 'none' }}>
              <span>workshop</span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: -0.2, lineHeight: 1.3 }}>{l.title}</div>
              <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
                {l.shop} {l.verified && <I.badge size={12} color="#C4F542"/>}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6, fontSize: 11, color: 'var(--ink-3)' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                  <I.starFill size={11} color="#C4F542"/><b style={{ color: 'var(--ink-2)' }}>{l.rating}</b>
                </span>
                <span>·</span>
                <span>{l.jobs} jobs</span>
                <span>·</span>
                <span>{l.dur}</span>
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, marginTop: 6, letterSpacing: -0.3 }}>
                From ₦{l.from.toLocaleString()}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// SPARE PARTS MARKETPLACE
function MarketParts({ dark, setScreen }) {
  const parts = [
    { id:1, name:'Brake pads — front (OEM)', brand:'Toyota Genuine', price:18500, stock:24, pic:'#D4B5B5' },
    { id:2, name:'Alternator 12V 130A', brand:'Denso', price:92000, stock:3, pic:'#B5C4D4' },
    { id:3, name:'Engine oil 5W-30 · 4L', brand:'Mobil 1', price:14200, stock:58, pic:'#C7D4B5' },
    { id:4, name:'Spark plug set (4)', brand:'NGK Iridium', price:11800, stock:19, pic:'#E4D4B5' },
    { id:5, name:'Wiper blades — pair', brand:'Bosch Aerotwin', price:8500, stock:42, pic:'#D4C7B5' },
    { id:6, name:'Air filter element', brand:'K&N', price:15700, stock:12, pic:'#B5D4C4' },
  ];
  return (
    <div style={{ minHeight: '100%', background: 'var(--bg)', paddingBottom: 100 }}>
      <div style={{ padding: '54px 16px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.8 }}>Spare parts</div>
          <div style={{ fontSize: 14, color: 'var(--ink-3)', marginTop: 2 }}>Fixed prices · delivered or pickup</div>
        </div>
        <button style={{
          width: 44, height: 44, borderRadius: 12, background: 'var(--bg-2)',
          border: '1px solid var(--line)', position: 'relative',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <I.cart size={20}/>
          <div style={{
            position: 'absolute', top: 6, right: 6, minWidth: 16, height: 16, borderRadius: 99,
            background: '#C4F542', color: '#0A0A0A', fontSize: 10, fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px',
          }}>2</div>
        </button>
      </div>

      <div style={{ padding: '0 16px 12px', display: 'flex', gap: 6 }}>
        <button style={{
          flex: 1, height: 44, borderRadius: 12, background: 'var(--ink)', color: 'var(--bg-2)',
          fontSize: 14, fontWeight: 600,
        }}>Spare parts</button>
        <button onClick={() => setScreen('market')} style={{
          flex: 1, height: 44, borderRadius: 12, background: 'var(--bg-3)',
          fontSize: 14, fontWeight: 600, color: 'var(--ink-3)',
        }}>Services</button>
      </div>

      {/* vehicle selector */}
      <div style={{ padding: '0 16px 12px' }}>
        <div style={{
          height: 48, borderRadius: 14, background: 'var(--bg-2)',
          border: '1px solid var(--line)',
          display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px',
        }}>
          <I.car size={18}/>
          <span style={{ fontSize: 13, color: 'var(--ink-3)' }}>Showing parts for</span>
          <span style={{ fontSize: 13, fontWeight: 600 }}>2018 Toyota Corolla</span>
          <div style={{ flex: 1 }}/>
          <I.chevronD size={16} color="var(--ink-3)"/>
        </div>
      </div>

      {/* categories */}
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '0 16px 14px' }}>
        {['All','Brakes','Engine','Electrical','Body','Filters','Fluids','Lights'].map((c, i) => (
          <button key={c} style={{
            height: 36, padding: '0 14px', borderRadius: 99, flexShrink: 0,
            background: i === 0 ? 'var(--ink)' : 'var(--bg-2)',
            color: i === 0 ? 'var(--bg-2)' : 'var(--ink-2)',
            fontSize: 13, fontWeight: 500, border: '1px solid var(--line)',
          }}>{c}</button>
        ))}
      </div>

      {/* grid */}
      <div style={{ padding: '0 16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {parts.map(p => (
          <button key={p.id} onClick={() => setScreen('part')} className="card" style={{
            padding: 10, textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 8,
          }}>
            <div className="placeholder" style={{ aspectRatio: '1', background: p.pic, border: 'none' }}>
              <span>part photo</span>
            </div>
            <div>
              <div style={{ fontSize: 10, color: 'var(--ink-3)', letterSpacing: 0.3 }} className="mono">{p.brand.toUpperCase()}</div>
              <div style={{ fontSize: 13, fontWeight: 600, marginTop: 2, lineHeight: 1.3, minHeight: 34 }}>{p.name}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 }}>
                <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: -0.3 }}>₦{p.price.toLocaleString()}</div>
                <div style={{
                  fontSize: 10, color: p.stock > 10 ? 'var(--ok)' : 'var(--warn)', fontWeight: 500,
                }} className="mono">{p.stock > 10 ? 'IN STOCK' : `${p.stock} LEFT`}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function PartDetail({ dark, setScreen, back }) {
  const [qty, setQty] = useStM(1);
  return (
    <div style={{ minHeight: '100%', background: 'var(--bg)', paddingBottom: 100 }}>
      <div style={{ position: 'absolute', top: 54, left: 16, right: 16, zIndex: 30, display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={back} style={{
          width: 44, height: 44, borderRadius: 14, background: 'var(--bg-2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: 'var(--shadow-sm)', border: '1px solid var(--line)',
        }}><I.chevronL size={20}/></button>
        <button style={{
          width: 44, height: 44, borderRadius: 14, background: 'var(--bg-2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: 'var(--shadow-sm)', border: '1px solid var(--line)',
        }}><I.cart size={20}/></button>
      </div>
      <div className="placeholder" style={{
        height: 320, borderRadius: 0, background: '#D4B5B5', border: 'none',
      }}>
        <span style={{ fontSize: 13 }}>product photo</span>
      </div>
      <div style={{ padding: '20px' }}>
        <div style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: 0.4 }} className="mono">TOYOTA GENUINE · OEM</div>
        <h1 style={{ fontSize: 24, fontWeight: 700, letterSpacing: -0.6, margin: '8px 0 10px', lineHeight: 1.15 }}>
          Brake pads — front axle
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 12, color: 'var(--ink-3)' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <I.starFill size={12} color="#C4F542"/> <b style={{ color: 'var(--ink-2)' }}>4.8</b> (47)
          </span>
          <span>·</span>
          <span>Fits your Corolla '18</span>
        </div>
        <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: -1, marginTop: 16 }}>
          ₦18,500
        </div>

        <div style={{ marginTop: 16 }}>
          <div style={{ fontSize: 12, color: 'var(--ink-3)', letterSpacing: 0.3, marginBottom: 8 }} className="mono">SOLD BY</div>
          <div className="card" style={{ padding: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10, background: '#C4C7D4',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700,
            }}>A</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5 }}>
                Auto Empire Spares <I.badge size={13} color="#C4F542"/>
              </div>
              <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>Ikeja · 4.9 · 1,204 orders</div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 18 }}>
          <div style={{ fontSize: 12, color: 'var(--ink-3)', letterSpacing: 0.3, marginBottom: 8 }} className="mono">DELIVERY</div>
          <div className="card" style={{ padding: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
            <I.truck size={20}/>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Same-day in Lagos</div>
              <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>₦1,500 · 2–4 hours</div>
            </div>
            <I.chevron size={14} color="var(--ink-4)"/>
          </div>
        </div>

        <div style={{ marginTop: 18, fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.55 }}>
          OEM front brake pads engineered for precision fit and reduced dust. Includes wear indicator and hardware kit. 12-month Towber return guarantee.
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '14px 16px 30px', background: 'var(--bg)',
        borderTop: '1px solid var(--line)',
        display: 'flex', gap: 10, alignItems: 'center',
      }}>
        <div style={{
          height: 52, borderRadius: 14, background: 'var(--bg-3)',
          display: 'flex', alignItems: 'center', padding: '0 6px',
        }}>
          <button onClick={() => setQty(Math.max(1, qty-1))} style={{ width: 40, height: 40, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><I.minus size={16}/></button>
          <div style={{ width: 24, textAlign: 'center', fontSize: 15, fontWeight: 600 }}>{qty}</div>
          <button onClick={() => setQty(qty+1)} style={{ width: 40, height: 40, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><I.plus size={16}/></button>
        </div>
        <button className="btn btn-primary" style={{ flex: 1, height: 52 }}>
          Add to cart · ₦{(18500 * qty).toLocaleString()}
        </button>
      </div>
    </div>
  );
}

// LISTING DETAIL
function ListingDetail({ dark, setScreen, back }) {
  return (
    <div style={{ minHeight: '100%', background: 'var(--bg)', paddingBottom: 120 }}>
      <div style={{ position: 'absolute', top: 54, left: 16, zIndex: 30 }}>
        <button onClick={back} style={{
          width: 44, height: 44, borderRadius: 14, background: 'var(--bg-2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: 'var(--shadow-sm)', border: '1px solid var(--line)',
        }}><I.chevronL size={20}/></button>
      </div>
      <div className="placeholder" style={{
        height: 260, borderRadius: 0, background: '#E8D5B5', border: 'none',
      }}><span style={{ fontSize: 13 }}>workshop photo</span></div>

      <div style={{ padding: '18px 16px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div className="chip ok">VERIFIED</div>
          <div className="chip">Mobile + workshop</div>
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 700, letterSpacing: -0.6, margin: '10px 0 8px', lineHeight: 1.15 }}>
          Full engine diagnostic + tune-up
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, color: 'var(--ink-3)' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <I.starFill size={12} color="#C4F542"/> <b style={{ color: 'var(--ink)' }}>4.9</b> (204)
          </span>
          <span>·</span>
          <span>Axle Garage Lekki</span>
        </div>
        <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: -1, marginTop: 14 }}>
          From ₦28,000
        </div>
        <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>Final price quoted after inspection</div>

        <div className="hr" style={{ margin: '20px 0' }}/>
        <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 10 }}>About this service</div>
        <div style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.55 }}>
          Complete OBD-II diagnostic scan, spark plug inspection, throttle body clean, engine oil & filter change. Performed by certified mechanics with 15+ years experience.
        </div>

        <div className="hr" style={{ margin: '20px 0' }}/>
        <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 10 }}>Workshop location</div>
        <div style={{
          height: 140, borderRadius: 14, position: 'relative', overflow: 'hidden',
          background: 'var(--bg-3)',
        }}>
          <MapCanvas dark={dark} showRoute={false}>
            <MapPin x={50} y={55} variant="provider" label="Axle"/>
          </MapCanvas>
        </div>
        <div style={{ fontSize: 13, color: 'var(--ink-2)', marginTop: 8 }}>
          Plot 14, Admiralty Rd, Lekki Phase 1 · 3.2 km away
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '14px 16px 30px', background: 'var(--bg)',
        borderTop: '1px solid var(--line)',
        display: 'flex', gap: 10,
      }}>
        <button onClick={() => setScreen('chat')} style={{
          flex: 1, height: 52, borderRadius: 14, background: 'var(--bg-3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontWeight: 600,
        }}>
          <I.chat size={18}/> Message
        </button>
        <button className="btn btn-primary" style={{ flex: 2, height: 52 }}>
          Request quote
        </button>
      </div>
    </div>
  );
}

// CHAT
function ChatScreen({ dark, back }) {
  const msgs = [
    { me: false, text: "Hi! I'm 6 minutes away from your location.", time: '14:12' },
    { me: true, text: "Great — I'll be waiting by the red Corolla.", time: '14:12' },
    { me: false, text: "Got it. Do you have the spare tyre in the boot?", time: '14:13' },
    { me: true, text: "Yes, fully inflated. Boot is unlocked.", time: '14:13' },
    { me: false, text: "Perfect. See you shortly.", time: '14:14', seen: true },
  ];
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      <div style={{
        padding: '54px 16px 14px', display: 'flex', alignItems: 'center', gap: 12,
        borderBottom: '1px solid var(--line)', background: 'var(--bg-2)',
      }}>
        <button onClick={back} style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--bg-3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <I.chevronL size={18}/>
        </button>
        <div style={{
          width: 40, height: 40, borderRadius: '50%', background: '#E8D5B5',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700,
        }}>M</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
            Musa A. <I.badge size={12} color="#C4F542"/>
          </div>
          <div style={{ fontSize: 11, color: 'var(--ok)' }}>● Online · responds in 2 min</div>
        </div>
        <button style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--bg-3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <I.phone size={18}/>
        </button>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ textAlign: 'center', fontSize: 11, color: 'var(--ink-4)', margin: '4px 0 10px' }} className="mono">
          TODAY · 14:12
        </div>
        {msgs.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.me ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth: '75%',
              padding: '10px 14px', borderRadius: 18,
              background: m.me ? '#0A0A0A' : 'var(--bg-2)',
              color: m.me ? '#fff' : 'var(--ink)',
              border: m.me ? 'none' : '1px solid var(--line)',
              fontSize: 14, lineHeight: 1.4,
              borderBottomRightRadius: m.me ? 6 : 18,
              borderBottomLeftRadius: m.me ? 18 : 6,
            }}>
              {m.text}
              <div style={{
                fontSize: 10, opacity: 0.6, marginTop: 4,
                display: 'flex', justifyContent: 'flex-end', gap: 4,
              }}>
                {m.time} {m.me && m.seen && <I.check size={12}/>}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        padding: '10px 12px 28px', background: 'var(--bg-2)',
        borderTop: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <button style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--bg-3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <I.plus size={18}/>
        </button>
        <div className="input" style={{ flex: 1, display: 'flex', alignItems: 'center', color: 'var(--ink-3)' }}>
          Message…
        </div>
        <button style={{ width: 40, height: 40, borderRadius: 12, background: '#C4F542', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <I.send size={18} color="#0A0A0A"/>
        </button>
      </div>
    </div>
  );
}

// RATING
function RatingScreen({ dark, back, setScreen }) {
  const [stars, setStars] = useStM(5);
  const tags = ['On time', 'Professional', 'Tidy work', 'Great attitude', 'Fair price', 'Well equipped'];
  const [picked, setPicked] = useStM(['On time', 'Professional', 'Fair price']);
  return (
    <div style={{ minHeight: '100%', background: 'var(--bg)', paddingBottom: 120 }}>
      <Header title="Rate Musa" sub="Your rating helps other drivers" back={back}/>
      <div style={{ padding: '0 16px' }}>
        <div style={{
          textAlign: 'center', padding: '24px 0 20px',
          background: 'var(--bg-2)', borderRadius: 20, border: '1px solid var(--line)',
        }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%', background: '#E8D5B5',
            margin: '0 auto 14px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 32, fontWeight: 700,
          }}>M</div>
          <div style={{ fontSize: 18, fontWeight: 700 }}>Musa A.</div>
          <div style={{ fontSize: 13, color: 'var(--ink-3)' }}>Flat tyre change · 32 min</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 18 }}>
            {[1,2,3,4,5].map(i => (
              <button key={i} onClick={() => setStars(i)}>
                {i <= stars
                  ? <I.starFill size={36} color="#C4F542"/>
                  : <I.star size={36} color="var(--ink-4)"/>}
              </button>
            ))}
          </div>
          <div style={{ fontSize: 13, color: 'var(--ink-3)', marginTop: 10 }}>
            {['Terrible','Poor','Okay','Good','Excellent'][stars-1]}
          </div>
        </div>

        <div style={{ fontSize: 12, color: 'var(--ink-3)', margin: '18px 0 10px', letterSpacing: 0.3 }} className="mono">
          WHAT WENT WELL?
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {tags.map(t => (
            <button key={t} onClick={() => setPicked(picked.includes(t) ? picked.filter(x => x !== t) : [...picked, t])} style={{
              padding: '8px 14px', borderRadius: 99, fontSize: 13, fontWeight: 500,
              background: picked.includes(t) ? '#C4F542' : 'var(--bg-3)',
              color: picked.includes(t) ? '#0A0A0A' : 'var(--ink-2)',
            }}>
              {picked.includes(t) && '✓ '}{t}
            </button>
          ))}
        </div>

        <div style={{ fontSize: 12, color: 'var(--ink-3)', margin: '18px 0 10px', letterSpacing: 0.3 }} className="mono">
          LEAVE A REVIEW (OPTIONAL)
        </div>
        <textarea className="input" placeholder="Share the details of your experience" rows="4" style={{
          height: 'auto', paddingTop: 14, minHeight: 100,
        }} defaultValue="Musa was incredibly fast and professional. Arrived exactly when the app said he would and had everything he needed. Will definitely book again."/>
      </div>

      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '14px 16px 30px', background: 'var(--bg)', borderTop: '1px solid var(--line)',
      }}>
        <button className="btn btn-primary" style={{ width: '100%', height: 52 }} onClick={() => setScreen('home')}>
          Submit rating
        </button>
      </div>
    </div>
  );
}

// ACTIVITY
function ActivityScreen({ dark, setScreen }) {
  const jobs = [
    { status: 'active', title: 'Flat tyre change', provider: 'Musa A.', time: 'In progress · arrived', total: '₦6,150', icon: I.tire, accent: 'ok' },
    { status: 'done', title: 'Towing to Axle Garage', provider: 'Tunde O.', time: '2 days ago', total: '₦8,500', icon: I.tow, accent: 'done' },
    { status: 'done', title: 'Brake pads (OEM)', provider: 'Auto Empire Spares', time: 'Apr 12', total: '₦20,000', icon: I.pkg, accent: 'done' },
    { status: 'done', title: 'Full engine diagnostic', provider: 'Axle Garage', time: 'Mar 30', total: '₦32,500', icon: I.wrench, accent: 'done' },
    { status: 'done', title: 'Jump start', provider: 'Samuel K.', time: 'Mar 18', total: '₦2,800', icon: I.battery, accent: 'done' },
  ];
  return (
    <div style={{ minHeight: '100%', background: 'var(--bg)', paddingBottom: 100 }}>
      <div style={{ padding: '54px 16px 12px' }}>
        <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.8 }}>Activity</div>
        <div style={{ fontSize: 14, color: 'var(--ink-3)', marginTop: 2 }}>Jobs, orders and receipts</div>
      </div>
      <div style={{ padding: '0 16px 12px', display: 'flex', gap: 6 }}>
        {['All', 'Active', 'Completed'].map((t, i) => (
          <button key={t} style={{
            height: 36, padding: '0 16px', borderRadius: 99,
            background: i === 0 ? 'var(--ink)' : 'var(--bg-3)',
            color: i === 0 ? 'var(--bg-2)' : 'var(--ink-2)',
            fontSize: 13, fontWeight: 500,
          }}>{t}</button>
        ))}
      </div>
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {jobs.map((j, i) => (
          <button key={i} onClick={() => j.status === 'active' && setScreen('tracking')} className="card" style={{
            padding: 14, display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left',
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: j.status === 'active' ? '#C4F542' : 'var(--bg-3)',
              color: j.status === 'active' ? '#0A0A0A' : 'var(--ink)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <j.icon size={22}/>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{j.title}</div>
              <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>
                {j.provider} · {j.time}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{j.total}</div>
              {j.status === 'active' && (
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 10, color: 'var(--ok)', marginTop: 2 }} className="mono">
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--ok)' }}/> LIVE
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// PROFILE
function ProfileScreen({ dark, setDark }) {
  return (
    <div style={{ minHeight: '100%', background: 'var(--bg)', paddingBottom: 100 }}>
      <div style={{ padding: '54px 16px 20px' }}>
        <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.8 }}>Profile</div>
      </div>
      {/* Profile card */}
      <div style={{ padding: '0 16px 16px' }}>
        <div className="card" style={{ padding: 18, display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 60, height: 60, borderRadius: '50%', background: '#C4D4B5',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 24, fontWeight: 700,
          }}>A</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 17, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
              Adaeze Okafor <I.badge size={14} color="#C4F542"/>
            </div>
            <div style={{ fontSize: 13, color: 'var(--ink-3)' }}>+234 803 112 4590 · 4.9★</div>
          </div>
        </div>
      </div>

      {/* Vehicle */}
      <div style={{ padding: '0 16px' }}>
        <div style={{ fontSize: 12, color: 'var(--ink-3)', margin: '0 4px 10px', letterSpacing: 0.3 }} className="mono">MY VEHICLES</div>
        <div className="card" style={{ padding: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 52, height: 52, borderRadius: 12, background: 'var(--bg-3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <I.car size={24}/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>2018 Toyota Corolla</div>
            <div style={{ fontSize: 12, color: 'var(--ink-3)' }} className="mono">LAG-472-KJA · Pearl white</div>
          </div>
          <div className="chip accent" style={{ fontSize: 10 }}>PRIMARY</div>
        </div>
        <button style={{
          width: '100%', marginTop: 8, padding: '12px 14px', borderRadius: 12,
          background: 'var(--bg-3)', color: 'var(--ink)', fontSize: 14, fontWeight: 500,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        }}>
          <I.plus size={16}/> Add another vehicle
        </button>
      </div>

      {/* Settings list */}
      <div style={{ padding: '20px' }}>
        <div style={{ fontSize: 12, color: 'var(--ink-3)', margin: '0 4px 10px', letterSpacing: 0.3 }} className="mono">SETTINGS</div>
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          {[
            { icon: I.card, label: 'Payment methods', right: 'Visa ·· 4421' },
            { icon: I.location, label: 'Saved addresses', right: '3' },
            { icon: I.bell, label: 'Notifications', right: '' },
            { icon: I.shield, label: 'Privacy & security', right: '' },
            { icon: I.info, label: 'Help centre', right: '' },
          ].map((r, i, arr) => (
            <button key={r.label} style={{
              width: '100%', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12,
              borderBottom: i < arr.length - 1 ? '1px solid var(--line)' : 'none', textAlign: 'left',
            }}>
              <r.icon size={18} color="var(--ink-2)"/>
              <div style={{ flex: 1, fontSize: 14 }}>{r.label}</div>
              {r.right && <div style={{ fontSize: 13, color: 'var(--ink-3)' }}>{r.right}</div>}
              <I.chevron size={14} color="var(--ink-4)"/>
            </button>
          ))}
        </div>

        <div style={{ marginTop: 16 }}>
          <div className="card" style={{ padding: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
            {dark ? <I.moon size={18}/> : <I.sun size={18}/>}
            <div style={{ flex: 1, fontSize: 14 }}>Dark mode</div>
            <button onClick={() => setDark(!dark)} style={{
              width: 48, height: 28, borderRadius: 99, background: dark ? '#C4F542' : 'var(--bg-3)',
              position: 'relative', transition: 'background 0.2s',
            }}>
              <div style={{
                position: 'absolute', top: 3, left: dark ? 23 : 3,
                width: 22, height: 22, borderRadius: '50%', background: '#fff',
                boxShadow: '0 2px 4px rgba(0,0,0,0.15)', transition: 'left 0.2s',
              }}/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { MarketServices, MarketParts, PartDetail, ListingDetail, ChatScreen, RatingScreen, ActivityScreen, ProfileScreen });
