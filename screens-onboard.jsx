// Onboarding + Auth screens for Towber
const { useState: useStateOB } = React;

function OnboardWelcome({ dark, onPick }) {
  return (
    <div style={{ padding: '72px 16px 24px', minHeight: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button style={{ fontSize: 14, color: 'var(--ink-3)', fontWeight: 500 }}>Skip</button>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: 20 }}>
        <Logo size={38}/>
        <h1 style={{
          fontSize: 38, fontWeight: 700, letterSpacing: -1.6,
          lineHeight: 1.04, margin: '28px 0 14px',
        }}>
          Car trouble?<br/>
          <span style={{ color: 'var(--ink-3)' }}>We're on the way.</span>
        </h1>
        <p style={{ fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.4, margin: 0, maxWidth: 300 }}>
          Tow trucks, mechanics, tyres and parts — all in one app.
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button className="btn btn-accent" onClick={() => onPick('owner')} style={{ height: 54 }}>
          I need help with my car
          <I.arrowRight size={18}/>
        </button>
        <button className="btn btn-ghost" onClick={() => onPick('provider')} style={{ height: 54 }}>
          I offer automotive services
        </button>
        <div style={{ textAlign: 'center', marginTop: 10, fontSize: 13, color: 'var(--ink-3)' }}>
          Already have an account? <span style={{ color: 'var(--ink)', fontWeight: 600 }}>Sign in</span>
        </div>
      </div>
    </div>
  );
}

function OnboardProviderKind({ dark, onPick, back }) {
  const kinds = [
    { id: 'roadside', title: 'Roadside services', desc: 'Tow, flat tyres, jump starts, fuel.', icon: I.tow },
    { id: 'market', title: 'Marketplace specialist', desc: 'Mechanic, detailing, body work.', icon: I.wrench },
    { id: 'parts', title: 'Spare parts seller', desc: 'List parts, in-app checkout.', icon: I.pkg },
    { id: 'biz', title: 'Business / workshop', desc: 'Multi-staff team dashboard.', icon: I.shield },
  ];
  return (
    <div style={{ padding: '0 0 24px', minHeight: '100%', background: 'var(--bg)' }}>
      <Header title="What do you offer?" sub="Pick one — add more later" back={back}/>
      <div style={{ padding: '4px 16px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {kinds.map(k => (
          <button key={k.id} className="card" onClick={() => onPick(k.id)} style={{
            padding: 16, display: 'flex', gap: 12, alignItems: 'center', textAlign: 'left',
          }}>
            <div style={{
              width: 42, height: 42, borderRadius: 12, background: 'var(--bg-3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--ink)', flexShrink: 0,
            }}>
              <k.icon size={20}/>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: -0.2 }}>{k.title}</div>
              <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>{k.desc}</div>
            </div>
            <I.chevron size={16} color="var(--ink-4)"/>
          </button>
        ))}
      </div>
    </div>
  );
}

function OnboardAuth({ dark, onNext, back, role }) {
  return (
    <div style={{ padding: '0 0 24px', minHeight: '100%', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      <Header title="Create account" sub={role === 'owner' ? 'Under 2 minutes' : 'Verified providers only'} back={back}/>
      <div style={{ padding: '4px 16px', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
        <Field label="FULL NAME"><input className="input" defaultValue="Adaeze Okafor"/></Field>
        <Field label="PHONE NUMBER">
          <div className="input" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 0 }}>
            <div style={{ padding: '0 14px', borderRight: '1px solid var(--line)', height: 52, display: 'flex', alignItems: 'center', fontWeight: 600 }}>🇳🇬 +234</div>
            <input defaultValue="803 112 4590" style={{ flex: 1, background: 'none', border: 'none', fontSize: 16, color: 'var(--ink)' }}/>
          </div>
        </Field>
        <Field label="EMAIL"><input className="input" defaultValue="adaeze@email.com"/></Field>
        <Field label="PASSWORD"><input className="input" type="password" defaultValue="••••••••••"/></Field>
        <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 4, lineHeight: 1.4 }}>
          By continuing, you agree to our <b style={{ color: 'var(--ink)' }}>Terms</b> and <b style={{ color: 'var(--ink)' }}>Privacy</b>.
        </div>
      </div>
      <div style={{ padding: '16px' }}>
        <button className="btn btn-primary" style={{ width: '100%' }} onClick={onNext}>
          Send code
        </button>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label style={{ fontSize: 11, color: 'var(--ink-3)', marginLeft: 4, letterSpacing: 0.4 }} className="mono">{label}</label>
      <div style={{ marginTop: 6 }}>{children}</div>
    </div>
  );
}

function OnboardOTP({ dark, onNext, back }) {
  const [code] = useStateOB(['3', '9', '2', '', '', '']);
  return (
    <div style={{ padding: '0 0 24px', minHeight: '100%', background: 'var(--bg)' }}>
      <Header title="Verify phone" sub="Code sent to +234 803 112 4590" back={back}/>
      <div style={{ padding: '16px' }}>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'space-between' }}>
          {code.map((d, i) => (
            <div key={i} style={{
              flex: 1, maxWidth: 52, height: 60, borderRadius: 14,
              background: d ? 'var(--bg-2)' : 'var(--bg-3)',
              border: d ? '2px solid var(--ink)' : '2px solid transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 26, fontWeight: 600, color: 'var(--ink)',
            }}>
              {d}
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 24, fontSize: 13, color: 'var(--ink-3)' }}>
          Didn't get it? <span style={{ color: 'var(--ink)', fontWeight: 600 }}>Resend in 0:42</span>
        </div>
      </div>
      <div style={{ padding: '16px' }}>
        <button className="btn btn-primary" style={{ width: '100%' }} onClick={onNext}>Continue</button>
      </div>
    </div>
  );
}

function OnboardVehicle({ dark, onNext, back, title = 'Add your vehicle', sub = 'Helps providers come prepared', ctaLabel = 'Save vehicle' }) {
  const [type, setType] = useStateOB('Sedan');
  return (
    <div style={{ padding: '0 0 24px', minHeight: '100%', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      <Header title={title} sub={sub} back={back}/>
      <div style={{ padding: '4px 16px', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <Field label="MAKE"><input className="input" defaultValue="Toyota"/></Field>
          <Field label="MODEL"><input className="input" defaultValue="Corolla"/></Field>
          <Field label="YEAR"><input className="input" defaultValue="2018"/></Field>
          <Field label="COLOUR"><input className="input" defaultValue="Pearl white"/></Field>
        </div>
        <Field label="LICENCE PLATE">
          <input className="input mono" defaultValue="LAG-472-KJA" style={{ textTransform: 'uppercase' }}/>
        </Field>
        <Field label="VEHICLE TYPE">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {['Sedan','SUV','Truck','Bus','Motorcycle','Other'].map(t => (
              <button key={t} onClick={() => setType(t)} style={{
                height: 44, justifyContent: 'center', borderRadius: 12,
                background: type === t ? 'var(--ink)' : 'var(--bg-3)',
                color: type === t ? 'var(--bg-2)' : 'var(--ink-2)',
                fontSize: 14, fontWeight: 500,
              }}>{t}</button>
            ))}
          </div>
        </Field>
      </div>
      <div style={{ padding: '16px' }}>
        <button className="btn btn-primary" style={{ width: '100%' }} onClick={onNext}>
          {ctaLabel}
        </button>
      </div>
    </div>
  );
}

// Provider onboarding — service vehicle registration (during onboarding only, not editable)
function OnboardProviderVehicle({ dark, onNext, back }) {
  const [type, setType] = useStateOB('Flatbed tow');
  return (
    <div style={{ padding: '0 0 24px', minHeight: '100%', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      <Header title="Register service vehicle" sub="Used for verification" back={back}/>

      <div style={{ padding: '4px 16px 0' }}>
        <div style={{
          padding: 12, background: 'var(--bg-3)', borderRadius: 12,
          display: 'flex', gap: 10, fontSize: 12, color: 'var(--ink-2)', lineHeight: 1.4, marginBottom: 14,
        }}>
          <I.info size={15} color="var(--ink-2)" style={{ flexShrink: 0, marginTop: 1 }}/>
          <span>Vehicle details are locked after onboarding. Contact support to change.</span>
        </div>
      </div>

      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
        <Field label="VEHICLE TYPE">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
            {['Flatbed tow','Wrecker','Service van','Motorcycle','Pickup truck','Other'].map(t => (
              <button key={t} onClick={() => setType(t)} style={{
                height: 44, justifyContent: 'center', borderRadius: 12,
                background: type === t ? 'var(--ink)' : 'var(--bg-3)',
                color: type === t ? 'var(--bg-2)' : 'var(--ink-2)',
                fontSize: 13, fontWeight: 500,
              }}>{t}</button>
            ))}
          </div>
        </Field>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <Field label="MAKE"><input className="input" defaultValue="Isuzu"/></Field>
          <Field label="MODEL"><input className="input" defaultValue="NPR"/></Field>
          <Field label="YEAR"><input className="input" defaultValue="2015"/></Field>
          <Field label="CAPACITY"><input className="input" defaultValue="3.5T"/></Field>
        </div>

        <Field label="PLATE NUMBER">
          <input className="input mono" defaultValue="TR-392-KJA" style={{ textTransform: 'uppercase' }}/>
        </Field>

        <Field label="VEHICLE PHOTO">
          <div className="placeholder" style={{ height: 120, border: '1px dashed var(--line-2)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <I.camera size={22} color="var(--ink-3)"/>
              <span>Tap to upload · clear plate visible</span>
            </div>
          </div>
        </Field>

        <Field label="VEHICLE DOCUMENTS">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {['Registration papers','Roadworthiness','Insurance'].map(d => (
              <div key={d} style={{
                padding: 12, background: 'var(--bg-3)', borderRadius: 12,
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <I.pkg size={16} color="var(--ink-2)"/>
                <span style={{ fontSize: 13, flex: 1 }}>{d}</span>
                <span style={{ fontSize: 11, color: 'var(--ink-3)', fontWeight: 600 }} className="mono">UPLOAD</span>
              </div>
            ))}
          </div>
        </Field>
      </div>
      <div style={{ padding: '16px' }}>
        <button className="btn btn-primary" style={{ width: '100%' }} onClick={onNext}>
          Submit for verification
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { OnboardWelcome, OnboardProviderKind, OnboardAuth, OnboardOTP, OnboardVehicle, OnboardProviderVehicle, Field });
