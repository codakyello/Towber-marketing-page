// Owner flow (reworked): home, request (service+vehicle together),
// providers list, negotiate (transport + optional service counter),
// confirm, tracking, cancel sheet, add-vehicle screen
const { useState: useStO } = React;

// ---------- HOME ----------
function OwnerHome({ dark, setScreen }) {
  return (
    <div style={{ position: 'relative', height: '100%', background: 'var(--bg)' }}>
      <MapCanvas dark={dark} showRoute={false}>
        <MapPin x={50} y={65} variant="user" pulse/>
        <MapPin x={28} y={45} variant="provider" label="Tow"/>
        <MapPin x={72} y={55} variant="provider" label="Tyre"/>
        <MapPin x={42} y={25} variant="provider" label="Fuel"/>
      </MapCanvas>

      <div style={{
        position: 'absolute', top: 60, left: 16, right: 16, zIndex: 30,
        display: 'flex', gap: 8,
      }}>
        <button style={{
          flex: 1, height: 46, borderRadius: 13, background: 'var(--bg-2)',
          display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px',
          boxShadow: 'var(--shadow-md)', color: 'var(--ink-3)',
          border: '1px solid var(--line)',
        }}>
          <I.search size={17}/>
          <span style={{ fontSize: 14 }}>Search services, parts, shops…</span>
        </button>
        <button style={{
          width: 46, height: 46, borderRadius: 13, background: 'var(--bg-2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: 'var(--shadow-md)', border: '1px solid var(--line)',
        }}>
          <I.bell size={18} color="var(--ink)"/>
        </button>
      </div>

      <div className="sheet" style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 35, paddingBottom: 8,
      }}>
        <div style={{ padding: '12px 16px 8px' }}>
          <div style={{ width: 36, height: 4, background: 'var(--line-2)', borderRadius: 99, margin: '0 auto 12px' }}/>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--ok)' }}/>
            <span className="mono" style={{ fontSize: 10, color: 'var(--ink-3)', letterSpacing: 0.5 }}>
              4 PROVIDERS NEARBY · AVG 8 MIN
            </span>
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 700, letterSpacing: -0.6, margin: '2px 0 0' }}>
            Hey Adaeze — what's going on?
          </h1>
        </div>

        <div style={{ padding: '10px 16px 0' }}>
          <button onClick={() => setScreen('request')} style={{
            width: '100%', height: 64, borderRadius: 16,
            background: '#0A0A0A', color: '#fff',
            display: 'flex', alignItems: 'center', padding: '0 16px',
            boxShadow: '0 8px 20px rgba(10,10,10,0.18)',
          }}>
            <div style={{
              width: 42, height: 42, borderRadius: 12, background: '#C4F542',
              display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 12,
            }}>
              <I.bolt size={22} color="#0A0A0A"/>
            </div>
            <div style={{ textAlign: 'left', flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: -0.3 }}>Emergency dispatch</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>Tap to request help now</div>
            </div>
            <I.chevron size={18} color="rgba(255,255,255,0.7)"/>
          </button>
        </div>

        <div style={{ padding: '14px 16px 10px' }}>
          <div style={{ fontSize: 11, color: 'var(--ink-3)', marginBottom: 10, letterSpacing: 0.3 }} className="mono">
            QUICK REQUEST
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
            {[
              { icon: I.tow, label: 'Tow' },
              { icon: I.tire, label: 'Flat tyre' },
              { icon: I.battery, label: 'Jump' },
              { icon: I.fuel, label: 'Fuel' },
            ].map(s => (
              <button key={s.label} onClick={() => setScreen('request')} style={{
                aspectRatio: '1', borderRadius: 14,
                background: 'var(--bg-3)', color: 'var(--ink)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6,
              }}>
                <s.icon size={20}/>
                <span style={{ fontSize: 11, fontWeight: 500 }}>{s.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- REQUEST (service + vehicle together) ----------
function OwnerRequest({ dark, setScreen, back, vehicles, activeVehicleId, setActiveVehicleId }) {
  const [service, setService] = useStO('tire');
  const services = [
    { id: 'tow', icon: I.tow, name: 'Towing', eta: '6 min', desc: 'Flatbed to workshop' },
    { id: 'tire', icon: I.tire, name: 'Flat tyre', eta: '8 min', desc: 'Fix or swap' },
    { id: 'jump', icon: I.battery, name: 'Jump start', eta: '9 min', desc: 'Dead battery' },
    { id: 'fuel', icon: I.fuel, name: 'Fuel delivery', eta: '12 min', desc: 'Petrol or diesel' },
    { id: 'key', icon: I.key, name: 'Key lockout', eta: '15 min', desc: 'Locksmith' },
  ];
  const v = vehicles.find(x => x.id === activeVehicleId) || vehicles[0];

  return (
    <div style={{ position: 'relative', minHeight: '100%', background: 'var(--bg)', paddingBottom: 120, display: 'flex', flexDirection: 'column' }}>
      <Header title="Request help" sub="Find providers nearby" back={back}/>

      <div style={{ padding: '4px 16px 0' }}>
        {/* Vehicle selector (two selectors side-by-side w/ service) */}
        <div style={{ fontSize: 11, color: 'var(--ink-3)', marginBottom: 8, letterSpacing: 0.3 }} className="mono">
          YOUR VEHICLE
        </div>
        <button onClick={() => setScreen('request-vehicle-pick')} className="card" style={{
          width: '100%', padding: 12, display: 'flex', alignItems: 'center', gap: 10, textAlign: 'left',
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10, background: 'var(--bg-3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <I.car size={19}/>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>
              {v.year} {v.make} {v.model}
            </div>
            <div style={{ fontSize: 11, color: 'var(--ink-3)' }} className="mono">
              {v.plate} · {v.type}
            </div>
          </div>
          <span style={{ fontSize: 12, color: 'var(--ink-3)', fontWeight: 600 }}>Change</span>
        </button>

        {/* Location */}
        <div style={{ fontSize: 11, color: 'var(--ink-3)', margin: '14px 0 8px', letterSpacing: 0.3 }} className="mono">
          YOUR LOCATION
        </div>
        <div className="card" style={{ padding: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10, background: 'var(--bg-3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <I.location size={18} color="var(--ink)"/>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              14B Admiralty Way
            </div>
            <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>Lekki Phase 1, Lagos</div>
          </div>
          <span style={{ fontSize: 12, color: 'var(--ink-3)', fontWeight: 600 }}>Change</span>
        </div>
      </div>

      <div style={{ padding: '14px 16px 0', flex: 1 }}>
        <div style={{ fontSize: 11, color: 'var(--ink-3)', marginBottom: 8, letterSpacing: 0.3 }} className="mono">
          WHAT DO YOU NEED?
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {services.map(s => (
            <button key={s.id} onClick={() => setService(s.id)} className="card" style={{
              padding: 12, display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left',
              border: service === s.id ? '2px solid var(--ink)' : '1px solid var(--line)',
              padding: service === s.id ? 11 : 12,
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 11,
                background: service === s.id ? '#C4F542' : 'var(--bg-3)',
                color: service === s.id ? '#0A0A0A' : 'var(--ink)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <s.icon size={20}/>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: -0.2 }}>{s.name}</div>
                <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 1 }}>{s.desc}</div>
              </div>
              <div style={{ fontSize: 11, color: 'var(--ink-3)' }} className="mono">~{s.eta}</div>
            </button>
          ))}
        </div>

        <div style={{ fontSize: 11, color: 'var(--ink-3)', margin: '14px 0 8px', letterSpacing: 0.3 }} className="mono">
          NOTE TO PROVIDER (OPTIONAL)
        </div>
        <textarea className="input" placeholder="e.g. Front-left tyre, car on shoulder" rows="2" style={{
          height: 'auto', paddingTop: 12, paddingBottom: 12, minHeight: 68,
        }}/>
      </div>

      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '14px 16px 26px', background: 'var(--bg)',
        borderTop: '1px solid var(--line)',
      }}>
        <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => setScreen('providers')}>
          Find providers <I.arrowRight size={18}/>
        </button>
      </div>
    </div>
  );
}

// ---------- REQUEST > VEHICLE PICK ----------
function RequestVehiclePick({ dark, back, vehicles, activeVehicleId, setActiveVehicleId, setScreen }) {
  return (
    <div style={{ minHeight: '100%', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      <Header title="Select vehicle" back={back}/>
      <div style={{ padding: '4px 16px 0', display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
        {vehicles.map(v => (
          <button key={v.id} onClick={() => { setActiveVehicleId(v.id); back(); }} className="card" style={{
            padding: 14, display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left',
            border: v.id === activeVehicleId ? '2px solid var(--ink)' : '1px solid var(--line)',
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 11, background: 'var(--bg-3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <I.car size={22}/>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{v.year} {v.make} {v.model}</div>
              <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 2 }} className="mono">
                {v.plate} · {v.colour} · {v.type}
              </div>
            </div>
            {v.id === activeVehicleId && <I.check size={16} color="var(--ink)"/>}
          </button>
        ))}
        <button onClick={() => setScreen('add-vehicle')} className="card" style={{
          padding: 14, display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left',
          border: '1px dashed var(--line-2)', background: 'transparent',
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: 11, background: 'var(--bg-3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <I.plus size={20}/>
          </div>
          <div style={{ flex: 1, fontSize: 14, fontWeight: 600 }}>Add another vehicle</div>
          <I.chevron size={14} color="var(--ink-4)"/>
        </button>
      </div>
    </div>
  );
}

// ---------- PROVIDERS LIST ----------
function OwnerProviders({ dark, setScreen, back, setSelectedProvider }) {
  const providers = [
    { id: 1, name: 'Tunde O.', rating: 4.9, jobs: 312, dist: 1.8, eta: 6, service: 3500, transport: 2200, truck: 'Isuzu flatbed', verified: true },
    { id: 2, name: 'Musa A.', rating: 4.7, jobs: 198, dist: 2.4, eta: 8, service: 3500, transport: 2500, truck: 'Toyota wrecker', verified: true },
    { id: 3, name: 'Chika E.', rating: 4.8, jobs: 456, dist: 3.1, eta: 11, service: 3200, transport: 1800, truck: 'Mitsubishi tow', verified: true },
  ];

  // One smart sort: weighted rating + distance + price.
  const sorted = [...providers].sort((a, b) => {
    const score = p => (p.rating * 0.4) + ((10 - p.dist) * 0.3) + ((6000 - (p.service + p.transport)) / 1000 * 0.3);
    return score(b) - score(a);
  });

  // Earned labels per card
  const fastest = [...providers].sort((a,b) => a.eta - b.eta)[0].id;
  const cheapest = [...providers].sort((a,b) => (a.service+a.transport) - (b.service+b.transport))[0].id;
  const topRated = [...providers].sort((a,b) => b.rating - a.rating)[0].id;
  const labelFor = (p) => {
    if (p.id === fastest) return { text: `Fastest · ${p.eta} min`, accent: true };
    if (p.id === cheapest) return { text: `Cheapest · saves ₦${((providers[0].service+providers[0].transport) - (p.service+p.transport)).toLocaleString()}`, accent: false };
    if (p.id === topRated) return { text: `Top rated · ${p.rating}★`, accent: false };
    return null;
  };

  const accept = (p) => {
    setSelectedProvider(p);
    setScreen('negotiate');
  };

  return (
    <div style={{ minHeight: '100%', background: 'var(--bg)', paddingBottom: 24 }}>
      <Header title="Providers nearby" sub="3 available · Lekki" back={back}/>

      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {sorted.map((p, i) => {
          const lbl = labelFor(p);
          return (
          <div key={p.id} className="card" style={{ padding: 14 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12, background: `hsl(${p.id * 70 + 80}, 30%, 80%)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, color: '#0A0A0A', flexShrink: 0,
              }}>{p.name[0]}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 15, fontWeight: 600 }}>{p.name}</span>
                  {p.verified && <I.badge size={13} color="#C4F542"/>}
                  {lbl && (
                    <span style={{
                      fontSize: 10, fontWeight: 600, padding: '2px 7px', borderRadius: 99,
                      background: lbl.accent ? '#C4F542' : 'var(--bg-3)',
                      color: lbl.accent ? '#0A0A0A' : 'var(--ink-2)',
                    }}>{lbl.text}</span>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2, fontSize: 11, color: 'var(--ink-3)' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                    <I.starFill size={10} color="#C4F542"/><b style={{ color: 'var(--ink-2)' }}>{p.rating}</b>
                  </span>
                  <span>·</span><span>{p.jobs} jobs</span>
                  <span>·</span><span>{p.truck}</span>
                </div>
              </div>
            </div>

            {/* Price/ETA strip */}
            <div style={{
              marginTop: 12, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8,
              padding: 10, background: 'var(--bg-3)', borderRadius: 12,
            }}>
              <Stat label="DISTANCE" value={`${p.dist} km`}/>
              <Stat label="ETA" value={`${p.eta} min`}/>
              <Stat label="TOTAL" value={`₦${(p.service + p.transport).toLocaleString()}`} accent/>
            </div>

            <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
              <button className="btn btn-ghost" style={{ flex: 1, height: 42, fontSize: 13 }}>
                <I.chat size={15}/> Message
              </button>
              <button onClick={() => accept(p)} className="btn btn-primary" style={{ flex: 1.6, height: 42, fontSize: 13 }}>
                Select provider
              </button>
            </div>
          </div>
        );
        })}
      </div>
    </div>
  );
}

function Stat({ label, value, accent }) {
  return (
    <div>
      <div className="mono" style={{ fontSize: 9, color: 'var(--ink-3)', letterSpacing: 0.4 }}>{label}</div>
      <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: -0.3, marginTop: 2, color: accent ? 'var(--ink)' : 'var(--ink)' }}>
        {value}
      </div>
    </div>
  );
}

// ---------- NEGOTIATE (after provider picked) ----------
function OwnerNegotiate({ dark, back, setScreen, selectedProvider }) {
  const p = selectedProvider;
  const [transport, setTransport] = useStO(p.transport);
  const [service, setService] = useStO(p.service);
  const [mode, setMode] = useStO('view'); // view | transport | service
  const cap = 2500; // transport cap
  const origTransport = p.transport;
  const origService = p.service;
  const total = transport + service;
  const counterPending = transport !== origTransport || service !== origService;

  return (
    <div style={{ minHeight: '100%', background: 'var(--bg)', paddingBottom: 160, display: 'flex', flexDirection: 'column' }}>
      <Header title="Review & negotiate" back={back}/>

      <div style={{ padding: '4px 16px 0' }}>
        {/* Provider mini-card */}
        <div className="card" style={{ padding: 14, display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12, background: '#E8D5B5',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, color: '#0A0A0A',
          }}>{p.name[0]}</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 14, fontWeight: 600 }}>
              {p.name} {p.verified && <I.badge size={13} color="#C4F542"/>}
            </div>
            <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>
              {p.truck} · {p.eta} min away · ★ {p.rating}
            </div>
          </div>
          <button className="btn btn-ghost" style={{ width: 40, height: 40, padding: 0 }}>
            <I.chat size={18}/>
          </button>
        </div>

        {/* Price breakdown (editable) */}
        <div style={{ fontSize: 11, color: 'var(--ink-3)', margin: '14px 0 8px', letterSpacing: 0.3 }} className="mono">
          PRICE BREAKDOWN
        </div>

        <div className="card" style={{ padding: 14 }}>
          {/* Service */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0' }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>Service fee</div>
              <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>
                {service !== origService ? (
                  <><span style={{ textDecoration: 'line-through' }}>₦{origService.toLocaleString()}</span> → <b style={{ color: 'var(--ink)' }}>your offer</b></>
                ) : (
                  'Suggested by provider'
                )}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 15, fontWeight: 700 }}>₦{service.toLocaleString()}</span>
              <button onClick={() => setMode(mode === 'service' ? 'view' : 'service')} className="chip" style={{
                fontSize: 10, padding: '3px 8px',
                background: mode === 'service' ? 'var(--ink)' : 'var(--bg-3)',
                color: mode === 'service' ? 'var(--bg-2)' : 'var(--ink-2)',
              }}>Counter</button>
            </div>
          </div>

          {mode === 'service' && (
            <Stepper
              value={service} setValue={setService}
              min={Math.round(origService * 0.6)} max={origService}
              step={100} hint="You can only counter lower. Provider can reject."
              presets={[Math.round(origService*0.7), Math.round(origService*0.8), Math.round(origService*0.9), origService]}
              accent="#C4F542"
            />
          )}

          <div className="hr" style={{ margin: '4px 0' }}/>

          {/* Transport */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0' }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>Transport (logistics)</div>
              <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>
                {transport !== origTransport ? (
                  <><span style={{ textDecoration: 'line-through' }}>₦{origTransport.toLocaleString()}</span> → your offer</>
                ) : (
                  `Cap ₦${cap.toLocaleString()}`
                )}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 15, fontWeight: 700 }}>₦{transport.toLocaleString()}</span>
              <button onClick={() => setMode(mode === 'transport' ? 'view' : 'transport')} className="chip" style={{
                fontSize: 10, padding: '3px 8px',
                background: mode === 'transport' ? 'var(--ink)' : 'var(--bg-3)',
                color: mode === 'transport' ? 'var(--bg-2)' : 'var(--ink-2)',
              }}>Counter</button>
            </div>
          </div>

          {mode === 'transport' && (
            <Stepper
              value={transport} setValue={setTransport}
              min={500} max={cap} step={100}
              hint="Platform cap ₦2,500. Provider can accept or decline."
              presets={[1500, 1800, 2000, 2200]}
              accent="#C4F542"
            />
          )}

          <div className="hr" style={{ margin: '4px 0 8px' }}/>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--ink-3)', padding: '4px 0' }}>
            <span>Platform fee</span>
            <span>₦150</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0 2px', alignItems: 'baseline' }}>
            <span style={{ fontSize: 13, fontWeight: 700 }}>Total</span>
            <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.5 }}>₦{(total + 150).toLocaleString()}</span>
          </div>
        </div>

        <div style={{ fontSize: 11, color: 'var(--ink-3)', margin: '14px 0 8px', letterSpacing: 0.3 }} className="mono">
          PAY WITH
        </div>
        <div className="card" style={{ padding: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 40, height: 28, borderRadius: 5,
            background: 'linear-gradient(135deg, #0A0A0A, #3A3A38)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: 9, fontWeight: 700, letterSpacing: 0.5,
          }}>VISA</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Visa ·· 4421</div>
            <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>Held in escrow until complete</div>
          </div>
          <I.chevron size={14} color="var(--ink-4)"/>
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '14px 16px 26px', background: 'var(--bg)',
        borderTop: '1px solid var(--line)',
      }}>
        <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => setScreen('tracking')}>
          {counterPending ? `Send counter-offer · ₦${(total+150).toLocaleString()}` : `Accept & pay ₦${(total+150).toLocaleString()}`}
        </button>
        {counterPending && (
          <div style={{ fontSize: 11, color: 'var(--ink-3)', textAlign: 'center', marginTop: 6 }}>
            Payment only charged after provider accepts
          </div>
        )}
      </div>
    </div>
  );
}

function Stepper({ value, setValue, min, max, step, hint, presets, accent }) {
  return (
    <div className="fade-up" style={{ padding: '8px 0 4px' }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
        background: 'var(--bg-3)', borderRadius: 12, padding: 10,
      }}>
        <button onClick={() => setValue(Math.max(min, value - step))} style={{
          width: 36, height: 36, borderRadius: 10, background: 'var(--bg-2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}><I.minus size={16}/></button>
        <div style={{ textAlign: 'center', flex: 1 }}>
          <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.5 }}>
            ₦{value.toLocaleString()}
          </div>
          <div className="mono" style={{ fontSize: 9, color: 'var(--ink-3)', letterSpacing: 0.4, marginTop: 2 }}>
            ₦{min.toLocaleString()} – ₦{max.toLocaleString()}
          </div>
        </div>
        <button onClick={() => setValue(Math.min(max, value + step))} style={{
          width: 36, height: 36, borderRadius: 10, background: 'var(--bg-2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}><I.plus size={16}/></button>
      </div>
      {presets && (
        <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
          {presets.map(v => (
            <button key={v} onClick={() => setValue(v)} style={{
              flex: 1, height: 32, borderRadius: 9,
              background: value === v ? 'var(--ink)' : 'var(--bg-3)',
              color: value === v ? 'var(--bg-2)' : 'var(--ink-2)',
              fontSize: 11, fontWeight: 600,
            }}>₦{(v/1000).toFixed(v >= 1000 ? 1 : 2)}k</button>
          ))}
        </div>
      )}
      {hint && (
        <div style={{ fontSize: 10, color: 'var(--ink-3)', marginTop: 8, textAlign: 'center', lineHeight: 1.4 }}>
          {hint}
        </div>
      )}
    </div>
  );
}

// ---------- TRACKING ----------
function OwnerTracking({ dark, setScreen, back }) {
  const [stage, setStage] = useStO(1);
  const [cancelOpen, setCancelOpen] = useStO(false);
  const stages = [
    { key: 'find', label: 'Finding provider', desc: 'Pinging 4 providers nearby', icon: I.search },
    { key: 'enroute', label: 'Musa is on the way', desc: 'Toyota wrecker · ETA 6 min', icon: I.nav },
    { key: 'arrived', label: 'Musa has arrived', desc: 'White Toyota wrecker', icon: I.location },
    { key: 'service', label: 'Service in progress', desc: 'Flat tyre replacement', icon: I.wrench },
    { key: 'done', label: 'Job complete', desc: 'Please rate Musa', icon: I.check },
  ];
  const s = stages[stage];

  return (
    <div style={{ position: 'relative', height: '100%', background: 'var(--bg)' }}>
      <MapCanvas dark={dark} showRoute={stage >= 1 && stage < 3}>
        <MapPin x={50} y={70} variant="user" pulse={stage === 0}/>
        <MapPin x={stage === 0 ? 20 : stage === 1 ? 35 : stage === 2 ? 48 : 50} y={stage === 0 ? 25 : stage === 1 ? 45 : stage === 2 ? 65 : 70} variant="provider" label="Musa"/>
      </MapCanvas>

      <button onClick={back} style={{
        position: 'absolute', top: 58, left: 16, zIndex: 30,
        width: 42, height: 42, borderRadius: 12,
        background: 'var(--bg-2)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: 'var(--shadow-sm)', border: '1px solid var(--line)',
      }}><I.chevronL size={18}/></button>

      <div style={{
        position: 'absolute', top: 64, left: '50%', transform: 'translateX(-50%)', zIndex: 30,
        background: '#0A0A0A', color: '#fff',
        padding: '8px 14px 8px 10px', borderRadius: 99,
        display: 'flex', alignItems: 'center', gap: 8,
        boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
      }}>
        <div style={{
          width: 22, height: 22, borderRadius: '50%', background: '#C4F542',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <I.nav size={12} color="#0A0A0A"/>
        </div>
        <span style={{ fontSize: 12, fontWeight: 600 }}>
          {stage < 2 ? 'Arriving in 6 min' : stage === 2 ? 'Arrived' : stage === 3 ? '12 min remaining' : 'Completed'}
        </span>
      </div>

      {/* Sheet */}
      <div className="sheet" style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 35,
        paddingBottom: 22,
      }}>
        <div style={{ padding: '12px 16px 0' }}>
          <div style={{ width: 36, height: 4, background: 'var(--line-2)', borderRadius: 99, margin: '0 auto 12px' }}/>

          {/* Progress bar (no numbers) */}
          <div style={{ display: 'flex', gap: 3, marginBottom: 14 }}>
            {stages.map((_, i) => (
              <div key={i} style={{
                flex: 1, height: 3, borderRadius: 99,
                background: i <= stage ? '#C4F542' : 'var(--bg-3)',
                transition: 'background 0.3s',
              }}/>
            ))}
          </div>

          {/* Stage icon + label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 42, height: 42, borderRadius: 12,
              background: stage === 4 ? '#C4F542' : 'var(--bg-3)',
              color: stage === 4 ? '#0A0A0A' : 'var(--ink)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <s.icon size={20}/>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: -0.3 }}>{s.label}</div>
              <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 1 }}>{s.desc}</div>
            </div>
          </div>

          {/* Provider card */}
          <div style={{
            marginTop: 12, padding: 12, background: 'var(--bg-3)', borderRadius: 14,
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: '50%', background: '#E8D5B5',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, color: '#0A0A0A',
            }}>M</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                Musa A. <I.badge size={12} color="#C4F542"/>
              </div>
              <div style={{ fontSize: 11, color: 'var(--ink-3)' }} className="mono">
                TR-392-KJA · ★ 4.7
              </div>
            </div>
            <button onClick={() => setScreen('chat')} style={{
              width: 38, height: 38, borderRadius: 11, background: 'var(--bg-2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}><I.chat size={16}/></button>
            <button style={{
              width: 38, height: 38, borderRadius: 11, background: '#0A0A0A', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}><I.phone size={16}/></button>
          </div>

          {/* Simulation dots (small, unobtrusive) */}
          <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginTop: 12 }}>
            {stages.map((_, i) => (
              <button key={i} onClick={() => setStage(i)} style={{
                width: 8, height: 8, borderRadius: '50%',
                background: stage === i ? 'var(--ink)' : 'var(--bg-3)',
              }} aria-label={`Go to stage ${i+1}`}/>
            ))}
          </div>

          {stage === 4 ? (
            <button onClick={() => setScreen('rate')} className="btn btn-primary" style={{ width: '100%', marginTop: 12 }}>
              Rate Musa
            </button>
          ) : (
            <button onClick={() => setCancelOpen(true)} style={{
              width: '100%', height: 40, marginTop: 10,
              background: 'transparent', color: 'var(--danger)',
              fontSize: 13, fontWeight: 600, textAlign: 'center',
            }}>
              Cancel request
            </button>
          )}
        </div>
      </div>

      {/* Cancel sheet */}
      {cancelOpen && (
        <>
          <div onClick={() => setCancelOpen(false)} style={{
            position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 50,
          }}/>
          <div className="fade-up" style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 60,
            background: 'var(--bg-2)', borderTopLeftRadius: 26, borderTopRightRadius: 26,
            padding: '16px 16px 26px',
          }}>
            <div style={{ width: 36, height: 4, background: 'var(--line-2)', borderRadius: 99, margin: '0 auto 12px' }}/>
            <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: -0.3 }}>Cancel this request?</div>
            <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 4 }}>
              If Musa has already started driving, a ₦500 fee applies.
            </div>
            <div style={{ margin: '14px 0 4px' }}>
              {['Provider is taking too long','Service no longer needed','Wrong vehicle/address','Other'].map(r => (
                <button key={r} className="card" style={{
                  width: '100%', padding: 12, display: 'flex', alignItems: 'center', gap: 8,
                  textAlign: 'left', marginBottom: 6,
                }}>
                  <div style={{ width: 16, height: 16, borderRadius: '50%', border: '2px solid var(--line-2)' }}/>
                  <span style={{ fontSize: 13 }}>{r}</span>
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <button onClick={() => setCancelOpen(false)} className="btn btn-ghost" style={{ flex: 1 }}>Keep request</button>
              <button onClick={() => { setCancelOpen(false); setScreen('home'); }} className="btn btn-danger" style={{ flex: 1 }}>
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ---------- ADD-VEHICLE (own page, for later additions) ----------
function AddVehicleScreen({ dark, back, onSaved }) {
  const [type, setType] = useStO('SUV');
  return (
    <div style={{ minHeight: '100%', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      <Header title="Add vehicle" back={back}/>
      <div style={{ padding: '4px 16px', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <Field label="MAKE"><input className="input" placeholder="e.g. Honda"/></Field>
          <Field label="MODEL"><input className="input" placeholder="e.g. CR-V"/></Field>
          <Field label="YEAR"><input className="input" placeholder="2020"/></Field>
          <Field label="COLOUR"><input className="input" placeholder="Silver"/></Field>
        </div>
        <Field label="LICENCE PLATE">
          <input className="input mono" placeholder="LAG-000-XYZ" style={{ textTransform: 'uppercase' }}/>
        </Field>
        <Field label="VEHICLE TYPE">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {['Sedan','SUV','Truck','Bus','Motorcycle','Other'].map(t => (
              <button key={t} onClick={() => setType(t)} style={{
                height: 42, borderRadius: 12,
                background: type === t ? 'var(--ink)' : 'var(--bg-3)',
                color: type === t ? 'var(--bg-2)' : 'var(--ink-2)',
                fontSize: 13, fontWeight: 500,
              }}>{t}</button>
            ))}
          </div>
        </Field>
      </div>
      <div style={{ padding: '16px' }}>
        <button className="btn btn-primary" style={{ width: '100%' }} onClick={onSaved}>
          Save vehicle
        </button>
      </div>
    </div>
  );
}

// ---------- CONFIRM (kept as fallback, but merged into negotiate) ----------
function OwnerConfirm({ dark, setScreen, back }) {
  return OwnerNegotiate({ dark, back, setScreen, selectedProvider: { id: 1, name: 'Musa A.', rating: 4.7, truck: 'Toyota wrecker', eta: 8, verified: true, service: 3500, transport: 2500 }});
}

Object.assign(window, { OwnerHome, OwnerRequest, RequestVehiclePick, OwnerProviders, OwnerNegotiate, OwnerTracking, AddVehicleScreen, OwnerConfirm });
// Back-compat: keep old name aliases
window.OwnerLogistics = OwnerProviders;
