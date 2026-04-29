// Extra screens: Splash, Notifications, Notification settings, Payment,
// Withdraw/Bank/Commission (provider), Help/Support.

const { useState: useStateEX, useEffect: useEffectEX } = React;

// ------------------------------------------------------------------
// Splash
// ------------------------------------------------------------------
function SplashScreen({ dark, onDone, autoAdvance = true }) {
  const [phase, setPhase] = useStateEX(0);
  useEffectEX(() => {
    const t1 = setTimeout(() => setPhase(1), 250);
    if (!autoAdvance) return () => clearTimeout(t1);
    const t2 = setTimeout(() => setPhase(2), 1800);
    const t3 = setTimeout(() => onDone && onDone(), 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const markSize = 96;
  return (
    <div style={{
      position: 'absolute', inset: 0, background: '#C4F542', color: '#0A0A0A',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      gap: 18,
      opacity: phase === 2 ? 0 : 1, transition: 'opacity 0.4s ease',
    }}>
      {/* Logo mark — matches Logo() in shell.jsx; inverted so it reads on lime */}
      <div style={{
        width: markSize, height: markSize, borderRadius: markSize * 0.28,
        background: '#0A0A0A', color: '#C4F542',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: 800, fontSize: markSize * 0.55, letterSpacing: -2,
        transform: phase >= 0 ? 'scale(1)' : 'scale(0.85)',
        opacity: phase >= 0 ? 1 : 0,
        transition: 'all 0.6s cubic-bezier(0.2, 0.9, 0.3, 1.2)',
      }}>T</div>

      {/* Wordmark — matches Logo() style: lowercase, 700 weight */}
      <div style={{
        fontSize: 26, fontWeight: 700, letterSpacing: -0.8, color: '#0A0A0A',
        opacity: phase >= 1 ? 1 : 0,
        transform: phase >= 1 ? 'translateY(0)' : 'translateY(6px)',
        transition: 'all 0.5s ease',
      }}>towber</div>
    </div>
  );
}

// ------------------------------------------------------------------
// Notifications feed
// ------------------------------------------------------------------
function NotificationsScreen({ dark, mode, setScreen, back }) {
  const notificationsOwner = [
    {
      id: 1, group: 'Today', type: 'job',
      icon: 'check', tint: '#C4F542',
      title: 'Service complete',
      body: 'Tunde O. marked your tow job complete. Rate your experience.',
      time: '2 min ago', unread: true, action: 'rate',
    },
    {
      id: 2, group: 'Today', type: 'eta',
      icon: 'truck', tint: '#C4F542',
      title: 'Tunde is 3 minutes away',
      body: 'Your tow provider has entered Lekki Phase 1.',
      time: '18 min ago', unread: true, action: 'tracking',
    },
    {
      id: 3, group: 'Today', type: 'chat',
      icon: 'chat', tint: null,
      title: 'New message from Tunde O.',
      body: '"On my way — traffic on Admiralty, 5 min out."',
      time: '22 min ago', unread: true, action: 'chat',
    },
    {
      id: 4, group: 'Yesterday', type: 'payment',
      icon: 'receipt', tint: null,
      title: 'Receipt · ₦5,700',
      body: 'Tow job with Tunde O. — paid via Card · 4242.',
      time: '1d ago', unread: false, action: 'payment',
    },
    {
      id: 5, group: 'Yesterday', type: 'promo',
      icon: 'sparkle', tint: null,
      title: 'New in the marketplace',
      body: '14 verified mechanics near you. Book ahead — save 10%.',
      time: '1d ago', unread: false, action: 'market',
    },
    {
      id: 6, group: 'This week', type: 'system',
      icon: 'shield', tint: null,
      title: 'Verify your insurance',
      body: 'Upload roadworthiness cert to unlock priority dispatch.',
      time: '3d ago', unread: false,
    },
  ];

  const notificationsProvider = [
    {
      id: 1, group: 'Today', type: 'job',
      icon: 'bell', tint: '#C4F542',
      title: 'New tow request · 1.8 km',
      body: 'Adaeze O. in Lekki Phase 1 · flat tyre · ₦3,500 offered.',
      time: '3 min ago', unread: true, action: 'incoming',
    },
    {
      id: 2, group: 'Today', type: 'payment',
      icon: 'wallet', tint: '#C4F542',
      title: 'Withdrawal processed · ₦42,500',
      body: 'Sent to GTBank ****1234. Expect in 1-2 business days.',
      time: '1h ago', unread: true, action: 'earn',
    },
    {
      id: 3, group: 'Today', type: 'review',
      icon: 'star', tint: null,
      title: 'New 5-star review',
      body: 'Chika E.: "Very professional, arrived on time."',
      time: '4h ago', unread: false,
    },
    {
      id: 4, group: 'Yesterday', type: 'system',
      icon: 'trendUp', tint: null,
      title: 'Weekly earnings up 18%',
      body: '28 jobs · ₦142,500 earned. Great week!',
      time: '1d ago', unread: false, action: 'earn',
    },
    {
      id: 5, group: 'This week', type: 'system',
      icon: 'info', tint: null,
      title: 'Commission changing',
      body: 'Platform fee drops to 12% for weekend jobs starting Dec 1.',
      time: '4d ago', unread: false, action: 'commission',
    },
  ];

  const list = mode === 'owner' ? notificationsOwner : notificationsProvider;
  const grouped = {};
  list.forEach(n => { (grouped[n.group] = grouped[n.group] || []).push(n); });
  const unreadCount = list.filter(n => n.unread).length;

  return (
    <div style={{ minHeight: '100%', background: 'var(--bg)', paddingBottom: 24 }}>
      <Header
        title="Notifications"
        sub={unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'}
        back={back}
        right={
          <button onClick={() => setScreen('notif-settings')} style={{
            padding: 8, borderRadius: 10, background: 'var(--bg-3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <I.settings size={16} color="var(--ink-2)"/>
          </button>
        }
      />

      <div style={{ padding: '0 16px' }}>
        {Object.entries(grouped).map(([group, items]) => (
          <div key={group} style={{ marginBottom: 18 }}>
            <div className="mono" style={{
              fontSize: 10, color: 'var(--ink-3)', letterSpacing: 0.5,
              fontWeight: 700, marginBottom: 8, padding: '0 4px',
            }}>{group.toUpperCase()}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {items.map(n => (
                <button key={n.id} onClick={() => n.action && setScreen(n.action)} style={{
                  width: '100%', padding: 14, borderRadius: 14,
                  background: n.unread ? 'var(--bg-2)' : 'transparent',
                  border: '1px solid ' + (n.unread ? 'var(--line)' : 'transparent'),
                  display: 'flex', gap: 12, alignItems: 'flex-start', textAlign: 'left',
                  position: 'relative',
                }}>
                  {n.unread && (
                    <div style={{
                      position: 'absolute', top: 18, right: 14,
                      width: 7, height: 7, borderRadius: 99, background: '#C4F542',
                    }}/>
                  )}
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: n.tint || 'var(--bg-3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    {I[n.icon]({ size: 17, color: n.tint ? '#0A0A0A' : 'var(--ink-2)' })}
                  </div>
                  <div style={{ flex: 1, minWidth: 0, paddingRight: n.unread ? 14 : 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{n.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--ink-3)', lineHeight: 1.4 }}>{n.body}</div>
                    <div className="mono" style={{ fontSize: 10, color: 'var(--ink-3)', marginTop: 6, letterSpacing: 0.3 }}>
                      {n.time.toUpperCase()}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// Notification settings
// ------------------------------------------------------------------
function NotificationSettingsScreen({ dark, mode, back }) {
  const [prefs, setPrefs] = useStateEX({
    jobUpdates: true,
    arrivalAlerts: true,
    chatMessages: true,
    promotions: false,
    receipts: true,
    newReviews: mode === 'provider',
    earningsSummary: mode === 'provider',
    sound: true,
    vibration: true,
  });

  const Toggle = ({ on, onChange }) => (
    <button onClick={() => onChange(!on)} style={{
      width: 42, height: 25, borderRadius: 99,
      background: on ? '#C4F542' : 'var(--line-2)',
      position: 'relative', transition: 'background 0.2s',
      flexShrink: 0,
    }}>
      <div style={{
        position: 'absolute', top: 2, left: on ? 19 : 2,
        width: 21, height: 21, borderRadius: 99, background: '#fff',
        transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
      }}/>
    </button>
  );

  const rows = mode === 'owner' ? [
    { k: 'jobUpdates', label: 'Job updates', sub: 'Accepted, cancelled, completed' },
    { k: 'arrivalAlerts', label: 'Arrival alerts', sub: 'When provider is near you' },
    { k: 'chatMessages', label: 'Messages', sub: 'In-app chat notifications' },
    { k: 'receipts', label: 'Receipts', sub: 'Payment confirmations' },
    { k: 'promotions', label: 'Marketplace & promos', sub: 'New services, discounts' },
  ] : [
    { k: 'jobUpdates', label: 'New job requests', sub: 'Pings for incoming jobs' },
    { k: 'chatMessages', label: 'Messages from owners', sub: 'In-app chat notifications' },
    { k: 'newReviews', label: 'New reviews', sub: 'When owners rate you' },
    { k: 'earningsSummary', label: 'Weekly earnings', sub: 'Friday summary & payout' },
    { k: 'receipts', label: 'Withdrawal updates', sub: 'Bank transfer status' },
  ];

  return (
    <div style={{ minHeight: '100%', background: 'var(--bg)', paddingBottom: 24 }}>
      <Header title="Notifications" sub="What you want to hear about" back={back}/>

      <div style={{ padding: '0 16px' }}>
        <div className="mono" style={{
          fontSize: 10, color: 'var(--ink-3)', letterSpacing: 0.5,
          fontWeight: 700, marginBottom: 8, padding: '0 4px',
        }}>PUSH NOTIFICATIONS</div>
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          {rows.map((r, i) => (
            <div key={r.k} style={{
              padding: '14px 14px', display: 'flex', alignItems: 'center', gap: 12,
              borderBottom: i < rows.length - 1 ? '1px solid var(--line)' : 'none',
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{r.label}</div>
                <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 2 }}>{r.sub}</div>
              </div>
              <Toggle on={prefs[r.k]} onChange={(v) => setPrefs({ ...prefs, [r.k]: v })}/>
            </div>
          ))}
        </div>

        <div className="mono" style={{
          fontSize: 10, color: 'var(--ink-3)', letterSpacing: 0.5,
          fontWeight: 700, margin: '22px 4px 8px',
        }}>DELIVERY</div>
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          {[
            { k: 'sound', label: 'Sound', sub: 'Play tone on alert' },
            { k: 'vibration', label: 'Vibration', sub: 'Haptic feedback' },
          ].map((r, i, arr) => (
            <div key={r.k} style={{
              padding: '14px 14px', display: 'flex', alignItems: 'center', gap: 12,
              borderBottom: i < arr.length - 1 ? '1px solid var(--line)' : 'none',
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{r.label}</div>
                <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 2 }}>{r.sub}</div>
              </div>
              <Toggle on={prefs[r.k]} onChange={(v) => setPrefs({ ...prefs, [r.k]: v })}/>
            </div>
          ))}
        </div>

        <div style={{
          padding: 12, background: 'var(--bg-3)', borderRadius: 12,
          marginTop: 16, fontSize: 11, color: 'var(--ink-3)', lineHeight: 1.5,
          display: 'flex', gap: 10,
        }}>
          <I.info size={15} color="var(--ink-3)" style={{ flexShrink: 0, marginTop: 1 }}/>
          <span>Critical safety notifications (emergency dispatch updates) cannot be disabled.</span>
        </div>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// Payment / Receipt
// ------------------------------------------------------------------
function PaymentScreen({ dark, setScreen, back, variant = 'pay' }) {
  // variant: 'pay' (before payment) or 'receipt' (after)
  const [method, setMethod] = useStateEX('card');
  const [paid, setPaid] = useStateEX(variant === 'receipt');

  const breakdown = [
    { k: 'Service fee', v: 3500 },
    { k: 'Transport', v: 2200 },
    { k: 'Platform fee', v: 0, note: 'Waived for new users' },
  ];
  const total = breakdown.reduce((s, b) => s + b.v, 0);

  if (paid) {
    // Receipt view
    return (
      <div style={{ minHeight: '100%', background: 'var(--bg)', paddingBottom: 24 }}>
        <Header title="Receipt" back={back}/>
        <div style={{ padding: '0 16px' }}>

          {/* Success header */}
          <div style={{
            textAlign: 'center', padding: '20px 0 24px',
          }}>
            <div style={{
              width: 56, height: 56, borderRadius: 99, background: '#C4F542',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 14,
            }}>
              <I.check size={30} color="#0A0A0A"/>
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: -0.5 }}>
              Payment complete
            </div>
            <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 4 }}>
              ₦{total.toLocaleString()} paid to Tunde O.
            </div>
          </div>

          {/* Receipt card */}
          <div className="card" style={{ padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: 'hsl(150, 30%, 80%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: 16, color: '#0A0A0A',
              }}>T</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>Tunde O.</div>
                <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>Isuzu flatbed · Tow service</div>
              </div>
            </div>

            <div style={{
              borderTop: '1px solid var(--line)', paddingTop: 14,
              display: 'flex', flexDirection: 'column', gap: 8,
            }}>
              {breakdown.map(b => (
                <div key={b.k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                  <span style={{ color: 'var(--ink-2)' }}>{b.k}</span>
                  <span style={{ fontWeight: 500 }}>
                    {b.v === 0 ? 'Free' : `₦${b.v.toLocaleString()}`}
                  </span>
                </div>
              ))}
            </div>

            <div style={{
              borderTop: '1px solid var(--line)', marginTop: 12, paddingTop: 12,
              display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
            }}>
              <span style={{ fontSize: 13, fontWeight: 600 }}>Total paid</span>
              <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.5 }}>
                ₦{total.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Meta */}
          <div className="card" style={{ padding: 14, marginTop: 10 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div>
                <div className="mono" style={{ fontSize: 9, color: 'var(--ink-3)', letterSpacing: 0.4 }}>PAID WITH</div>
                <div style={{ fontSize: 13, fontWeight: 500, marginTop: 3, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <I.card size={14}/> Card · 4242
                </div>
              </div>
              <div>
                <div className="mono" style={{ fontSize: 9, color: 'var(--ink-3)', letterSpacing: 0.4 }}>TRANSACTION</div>
                <div className="mono" style={{ fontSize: 12, fontWeight: 500, marginTop: 3 }}>
                  TWB-4A91-B72C
                </div>
              </div>
              <div>
                <div className="mono" style={{ fontSize: 9, color: 'var(--ink-3)', letterSpacing: 0.4 }}>DATE</div>
                <div style={{ fontSize: 13, fontWeight: 500, marginTop: 3 }}>Today · 9:41 AM</div>
              </div>
              <div>
                <div className="mono" style={{ fontSize: 9, color: 'var(--ink-3)', letterSpacing: 0.4 }}>DURATION</div>
                <div style={{ fontSize: 13, fontWeight: 500, marginTop: 3 }}>24 min</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
            <button className="btn btn-ghost" style={{ flex: 1, height: 46 }}>
              <I.receipt size={15}/> Email receipt
            </button>
            <button
              onClick={() => setScreen('rate')}
              className="btn btn-primary" style={{ flex: 1, height: 46 }}
            >
              Rate provider
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Pay view
  return (
    <div style={{ minHeight: '100%', background: 'var(--bg)', paddingBottom: 100, position: 'relative' }}>
      <Header title="Pay for service" sub="Tunde O. · Tow complete" back={back}/>

      <div style={{ padding: '0 16px' }}>
        <div className="card" style={{ padding: 16 }}>
          {breakdown.map(b => (
            <div key={b.k} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              fontSize: 13, marginBottom: 10,
            }}>
              <div>
                <div style={{ color: 'var(--ink-2)' }}>{b.k}</div>
                {b.note && <div style={{ fontSize: 10, color: 'var(--ink-3)', marginTop: 1 }}>{b.note}</div>}
              </div>
              <span style={{ fontWeight: 500 }}>
                {b.v === 0 ? 'Free' : `₦${b.v.toLocaleString()}`}
              </span>
            </div>
          ))}
          <div style={{
            borderTop: '1px solid var(--line)', paddingTop: 12, marginTop: 4,
            display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          }}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>Total</span>
            <span style={{ fontSize: 24, fontWeight: 700, letterSpacing: -0.6 }}>
              ₦{total.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="mono" style={{
          fontSize: 10, color: 'var(--ink-3)', letterSpacing: 0.5,
          fontWeight: 700, margin: '20px 4px 8px',
        }}>PAYMENT METHOD</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { k: 'card', icon: 'card', label: 'Card · 4242', sub: 'Visa · expires 08/27' },
            { k: 'transfer', icon: 'wallet', label: 'Bank transfer', sub: 'GTBank, Access, Zenith' },
            { k: 'cash', icon: 'receipt', label: 'Cash on delivery', sub: 'Pay provider directly' },
          ].map(m => (
            <button key={m.k} onClick={() => setMethod(m.k)} className="card" style={{
              padding: 14, display: 'flex', alignItems: 'center', gap: 12,
              border: method === m.k ? '1.5px solid var(--ink)' : '1px solid var(--line)',
              textAlign: 'left',
            }}>
              {I[m.icon]({ size: 20, color: 'var(--ink-2)' })}
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{m.label}</div>
                <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 1 }}>{m.sub}</div>
              </div>
              <div style={{
                width: 20, height: 20, borderRadius: 99,
                border: '1.5px solid ' + (method === m.k ? 'var(--ink)' : 'var(--line-2)'),
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {method === m.k && <div style={{ width: 10, height: 10, borderRadius: 99, background: 'var(--ink)' }}/>}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Sticky CTA */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '14px 16px 30px', background: 'var(--bg)',
        borderTop: '1px solid var(--line)',
      }}>
        <button
          onClick={() => setPaid(true)}
          className="btn btn-primary" style={{ width: '100%', height: 52, fontSize: 15 }}
        >
          Pay ₦{total.toLocaleString()}
        </button>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// Withdraw / Bank / Commission (provider)
// ------------------------------------------------------------------
function WithdrawScreen({ dark, setScreen, back }) {
  const available = 42500;
  const pending = 8200;
  const commissionRate = 15;
  const [amount, setAmount] = useStateEX(available);

  const recentWithdrawals = [
    { id: 1, amount: 38400, date: 'Nov 18', status: 'paid', bank: 'GTBank ****1234' },
    { id: 2, amount: 26100, date: 'Nov 11', status: 'paid', bank: 'GTBank ****1234' },
    { id: 3, amount: 41800, date: 'Nov 4', status: 'paid', bank: 'GTBank ****1234' },
  ];

  return (
    <div style={{ minHeight: '100%', background: 'var(--bg)', paddingBottom: 24 }}>
      <Header title="Withdraw earnings" back={back}/>

      <div style={{ padding: '0 16px' }}>
        {/* Balance hero */}
        <div style={{
          padding: 20, borderRadius: 18, background: '#0A0A0A', color: '#fff',
        }}>
          <div className="mono" style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', letterSpacing: 0.5 }}>
            AVAILABLE TO WITHDRAW
          </div>
          <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: -1.2, marginTop: 4 }}>
            ₦{available.toLocaleString()}
          </div>
          <div style={{
            marginTop: 12, paddingTop: 12,
            borderTop: '1px solid rgba(255,255,255,0.1)',
            display: 'flex', justifyContent: 'space-between', fontSize: 12,
            color: 'rgba(255,255,255,0.7)',
          }}>
            <span>Pending clearance</span>
            <span>₦{pending.toLocaleString()}</span>
          </div>
        </div>

        {/* Bank */}
        <div className="mono" style={{
          fontSize: 10, color: 'var(--ink-3)', letterSpacing: 0.5,
          fontWeight: 700, margin: '22px 4px 8px',
        }}>PAYOUT ACCOUNT</div>
        <button onClick={() => setScreen('bank')} className="card" style={{
          width: '100%', padding: 14, display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left',
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10, background: 'var(--bg-3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <I.wallet size={18} color="var(--ink-2)"/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>GTBank ****1234</div>
            <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 1 }}>Musa Abubakar · 1-2 business days</div>
          </div>
          <I.chevron size={16} color="var(--ink-3)"/>
        </button>

        {/* Amount */}
        <div className="mono" style={{
          fontSize: 10, color: 'var(--ink-3)', letterSpacing: 0.5,
          fontWeight: 700, margin: '22px 4px 8px',
        }}>AMOUNT</div>
        <div className="card" style={{ padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
            <span style={{ fontSize: 20, color: 'var(--ink-3)' }}>₦</span>
            <input
              value={amount.toLocaleString()}
              onChange={(e) => setAmount(parseInt(e.target.value.replace(/[^0-9]/g, '')) || 0)}
              style={{
                flex: 1, fontSize: 28, fontWeight: 700, letterSpacing: -0.8,
                border: 'none', outline: 'none', background: 'transparent',
                color: 'var(--ink)', fontFamily: 'inherit',
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
            {[25, 50, 100].map(pct => (
              <button
                key={pct}
                onClick={() => setAmount(Math.round(available * pct / 100))}
                style={{
                  flex: 1, height: 32, borderRadius: 8, fontSize: 11, fontWeight: 600,
                  background: 'var(--bg-3)', color: 'var(--ink-2)',
                }}
              >{pct === 100 ? 'All' : `${pct}%`}</button>
            ))}
          </div>
        </div>

        <button
          className="btn btn-primary"
          style={{ width: '100%', height: 52, marginTop: 16 }}
          disabled={amount === 0 || amount > available}
        >
          Withdraw ₦{amount.toLocaleString()}
        </button>

        {/* Commission row */}
        <button onClick={() => setScreen('commission')} style={{
          width: '100%', padding: '14px 4px', marginTop: 8,
          display: 'flex', alignItems: 'center', gap: 10, textAlign: 'left',
        }}>
          <I.info size={15} color="var(--ink-3)"/>
          <div style={{ flex: 1, fontSize: 12, color: 'var(--ink-3)' }}>
            Platform commission: <b style={{ color: 'var(--ink-2)' }}>{commissionRate}%</b> per job
          </div>
          <span style={{ fontSize: 11, color: 'var(--ink-3)', fontWeight: 600 }}>How it works ›</span>
        </button>

        {/* Recent withdrawals */}
        <div className="mono" style={{
          fontSize: 10, color: 'var(--ink-3)', letterSpacing: 0.5,
          fontWeight: 700, margin: '22px 4px 8px',
        }}>RECENT WITHDRAWALS</div>
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          {recentWithdrawals.map((w, i, arr) => (
            <div key={w.id} style={{
              padding: '14px 14px', display: 'flex', alignItems: 'center', gap: 10,
              borderBottom: i < arr.length - 1 ? '1px solid var(--line)' : 'none',
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: 10, background: 'var(--bg-3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <I.arrowUp size={15} color="var(--ink-2)"/>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500 }}>₦{w.amount.toLocaleString()}</div>
                <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 1 }}>
                  {w.bank} · {w.date}
                </div>
              </div>
              <div className="chip ok" style={{ fontSize: 9 }}>PAID</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BankAccountScreen({ dark, back }) {
  const [bank, setBank] = useStateEX('GTBank');
  const [acct, setAcct] = useStateEX('0112344567');

  return (
    <div style={{ minHeight: '100%', background: 'var(--bg)', paddingBottom: 100, position: 'relative' }}>
      <Header title="Payout account" sub="Where your earnings go" back={back}/>

      <div style={{ padding: '0 16px' }}>
        <Field label="BANK">
          <button className="input" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            textAlign: 'left', cursor: 'pointer',
          }}>
            <span>{bank}</span>
            <I.chevronD size={16} color="var(--ink-3)"/>
          </button>
        </Field>
        <Field label="ACCOUNT NUMBER">
          <input className="input mono" value={acct} onChange={(e) => setAcct(e.target.value)}/>
        </Field>

        <div className="card" style={{ padding: 14, marginTop: 6, display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10, background: '#C4F542',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <I.check size={18} color="#0A0A0A"/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Musa Abubakar</div>
            <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 1 }}>Account verified · NUBAN</div>
          </div>
        </div>

        <div style={{
          marginTop: 20, padding: 14, background: 'var(--bg-3)', borderRadius: 12,
          display: 'flex', gap: 10, fontSize: 11, color: 'var(--ink-3)', lineHeight: 1.5,
        }}>
          <I.shield size={16} color="var(--ink-3)" style={{ flexShrink: 0, marginTop: 1 }}/>
          <span>Bank details are encrypted. Towber never stores your full account info — we use your bank's verification API.</span>
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '14px 16px 30px', background: 'var(--bg)',
        borderTop: '1px solid var(--line)',
      }}>
        <button className="btn btn-primary" style={{ width: '100%', height: 52 }} onClick={back}>
          Save account
        </button>
      </div>
    </div>
  );
}

function CommissionInfoScreen({ dark, back }) {
  const tiers = [
    { jobs: '0-20 jobs', rate: 15, color: 'var(--bg-3)', current: true },
    { jobs: '21-50 jobs', rate: 13, color: 'var(--bg-3)' },
    { jobs: '51+ jobs', rate: 10, color: '#C4F542' },
  ];

  return (
    <div style={{ minHeight: '100%', background: 'var(--bg)', paddingBottom: 24 }}>
      <Header title="How commission works" back={back}/>

      <div style={{ padding: '0 16px' }}>
        {/* Hero */}
        <div className="card" style={{
          padding: 20, textAlign: 'center',
          background: '#0A0A0A', color: '#fff', border: 'none',
        }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', letterSpacing: 0.3 }} className="mono">
            YOUR CURRENT RATE
          </div>
          <div style={{ fontSize: 56, fontWeight: 700, letterSpacing: -2, marginTop: 6, lineHeight: 1 }}>
            15<span style={{ fontSize: 30, opacity: 0.7 }}>%</span>
          </div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 6 }}>
            per completed job
          </div>
        </div>

        {/* Example */}
        <div className="mono" style={{
          fontSize: 10, color: 'var(--ink-3)', letterSpacing: 0.5,
          fontWeight: 700, margin: '22px 4px 8px',
        }}>EXAMPLE · ₦5,700 JOB</div>
        <div className="card" style={{ padding: 16 }}>
          {[
            { k: 'Service fee (you set)', v: '₦3,500' },
            { k: 'Transport (capped)', v: '₦2,200' },
          ].map(r => (
            <div key={r.k} style={{
              display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 8,
            }}>
              <span style={{ color: 'var(--ink-2)' }}>{r.k}</span>
              <span style={{ fontWeight: 500 }}>{r.v}</span>
            </div>
          ))}
          <div style={{
            borderTop: '1px solid var(--line)', paddingTop: 10, marginTop: 2,
            display: 'flex', justifyContent: 'space-between', fontSize: 13,
          }}>
            <span style={{ color: 'var(--ink-2)' }}>Subtotal</span>
            <span style={{ fontWeight: 600 }}>₦5,700</span>
          </div>
          <div style={{
            display: 'flex', justifyContent: 'space-between', fontSize: 13, marginTop: 6,
            color: 'var(--danger)',
          }}>
            <span>− Platform commission (15%)</span>
            <span style={{ fontWeight: 500 }}>−₦855</span>
          </div>
          <div style={{
            borderTop: '1px solid var(--line)', paddingTop: 10, marginTop: 10,
            display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          }}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>You keep</span>
            <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.5 }}>₦4,845</span>
          </div>
        </div>

        {/* Tiers */}
        <div className="mono" style={{
          fontSize: 10, color: 'var(--ink-3)', letterSpacing: 0.5,
          fontWeight: 700, margin: '22px 4px 8px',
        }}>EARN LESS COMMISSION AS YOU GROW</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {tiers.map(t => (
            <div key={t.jobs} className="card" style={{
              padding: 14, display: 'flex', alignItems: 'center', gap: 12,
              background: t.current ? 'var(--bg-2)' : 'var(--bg-2)',
              border: t.current ? '1.5px solid var(--ink)' : '1px solid var(--line)',
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10, background: t.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 700, color: '#0A0A0A',
              }} className="mono">{t.rate}%</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{t.jobs}</div>
                <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 1 }}>
                  {t.rate}% commission per job
                </div>
              </div>
              {t.current && (
                <div className="chip accent" style={{ fontSize: 9 }}>CURRENT</div>
              )}
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mono" style={{
          fontSize: 10, color: 'var(--ink-3)', letterSpacing: 0.5,
          fontWeight: 700, margin: '22px 4px 8px',
        }}>WHAT'S INCLUDED</div>
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          {[
            'Payment processing & payouts',
            'Owner verification & fraud protection',
            'In-app chat, navigation, and dispatch',
            'Customer support — both sides',
            '₦5m liability coverage per job',
          ].map((item, i, arr) => (
            <div key={item} style={{
              padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10,
              borderBottom: i < arr.length - 1 ? '1px solid var(--line)' : 'none',
              fontSize: 13,
            }}>
              <I.check size={15} color="#88A828"/>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// Help / Support
// ------------------------------------------------------------------
function HelpScreen({ dark, mode, setScreen, back }) {
  const topicsOwner = [
    { icon: 'truck', label: 'My tow was cancelled', sub: 'Getting a new provider' },
    { icon: 'card', label: 'Payment issue', sub: 'Refunds, wrong charges, failed payments' },
    { icon: 'star', label: 'Dispute a rating', sub: 'Rating under 3 stars by mistake' },
    { icon: 'shield', label: 'Safety concern', sub: 'Report unsafe behaviour' },
    { icon: 'user', label: 'Account & profile', sub: 'Change phone, delete account' },
    { icon: 'car', label: 'Vehicle documents', sub: 'Upload, verify, or update' },
  ];
  const topicsProvider = [
    { icon: 'wallet', label: 'Withdrawal problem', sub: 'Money not received, delayed payout' },
    { icon: 'truck', label: 'Trouble getting jobs', sub: 'Dispatch not assigning work' },
    { icon: 'star', label: 'Review dispute', sub: 'Unfair rating, owner no-show' },
    { icon: 'shield', label: 'Safety incident', sub: 'Report owner, vehicle damage' },
    { icon: 'info', label: 'Commission & fees', sub: 'Deductions, tax documents' },
    { icon: 'badge', label: 'Verification help', sub: 'Document rejected or expired' },
  ];
  const topics = mode === 'owner' ? topicsOwner : topicsProvider;

  return (
    <div style={{ minHeight: '100%', background: 'var(--bg)', paddingBottom: 24 }}>
      <Header title="Help & support" back={back}/>

      <div style={{ padding: '0 16px' }}>
        {/* Emergency */}
        <button style={{
          width: '100%', padding: 16, borderRadius: 14,
          background: 'var(--danger)', color: '#fff',
          display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left',
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10, background: 'rgba(255,255,255,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <I.phone size={18} color="#fff"/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>24/7 emergency line</div>
            <div style={{ fontSize: 11, opacity: 0.85, marginTop: 1 }}>Accidents, theft, active safety threat</div>
          </div>
          <I.chevron size={16} color="#fff"/>
        </button>

        {/* Search */}
        <div style={{
          marginTop: 16,
          height: 44, borderRadius: 12, background: 'var(--bg-2)',
          border: '1px solid var(--line)',
          display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px',
        }}>
          <I.search size={16} color="var(--ink-3)"/>
          <span style={{ fontSize: 13, color: 'var(--ink-3)' }}>Search help articles...</span>
        </div>

        {/* Topics */}
        <div className="mono" style={{
          fontSize: 10, color: 'var(--ink-3)', letterSpacing: 0.5,
          fontWeight: 700, margin: '22px 4px 8px',
        }}>COMMON ISSUES</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {topics.map(t => (
            <button key={t.label} className="card" style={{
              padding: 14, display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left',
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10, background: 'var(--bg-3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {I[t.icon]({ size: 16, color: 'var(--ink-2)' })}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{t.label}</div>
                <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 1, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{t.sub}</div>
              </div>
              <I.chevron size={15} color="var(--ink-3)"/>
            </button>
          ))}
        </div>

        {/* Contact */}
        <div className="mono" style={{
          fontSize: 10, color: 'var(--ink-3)', letterSpacing: 0.5,
          fontWeight: 700, margin: '22px 4px 8px',
        }}>STILL STUCK?</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="card" style={{
            flex: 1, padding: '14px 10px', display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: 8, textAlign: 'center',
          }}>
            <I.chat size={20} color="var(--ink-2)"/>
            <div style={{ fontSize: 12, fontWeight: 600 }}>Live chat</div>
            <div style={{ fontSize: 10, color: 'var(--ink-3)' }}>~2 min wait</div>
          </button>
          <button className="card" style={{
            flex: 1, padding: '14px 10px', display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: 8, textAlign: 'center',
          }}>
            <I.phone size={20} color="var(--ink-2)"/>
            <div style={{ fontSize: 12, fontWeight: 600 }}>Call us</div>
            <div style={{ fontSize: 10, color: 'var(--ink-3)' }}>8am — 8pm</div>
          </button>
          <button className="card" style={{
            flex: 1, padding: '14px 10px', display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: 8, textAlign: 'center',
          }}>
            <I.message size={20} color="var(--ink-2)"/>
            <div style={{ fontSize: 12, fontWeight: 600 }}>Email</div>
            <div style={{ fontSize: 10, color: 'var(--ink-3)' }}>help@towber.ng</div>
          </button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  SplashScreen,
  NotificationsScreen,
  NotificationSettingsScreen,
  PaymentScreen,
  WithdrawScreen,
  BankAccountScreen,
  CommissionInfoScreen,
  HelpScreen,
});
