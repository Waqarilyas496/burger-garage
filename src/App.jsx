import { useState, useEffect, useRef } from "react";

const WHATSAPP = "923060663072";

function openWhatsApp(item, qty = 1) {
  const msg = encodeURIComponent(
    `Hello Burger Garage! 🍔\n\nI want to order:\n\n- ${item}\n- Quantity: ${qty}\n\nPlease confirm my order. Thank you!`
  );
  window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, "_blank");
}

const menuData = {
  Burgers: [
    { name: "Hilux Fillet", desc: "Huge chicken piece & finger-licking sauces", price: "440 (M) / 700 (L)", emoji: "🍔", trending: true },
    { name: "Corolla Zinger", desc: "Crispy fried chicken with magical & juicy ingredients", price: "440 (M) / 680 (L)", emoji: "🍔", trending: true },
    { name: "Civic Grilled", desc: "Grilled chicken with veggies & finest sauces", price: "440 (M) / 710 (L)", emoji: "🍔" },
    { name: "Picanto Chapli", desc: "Light in weight, heavy in taste — crispy chicken patty", price: "600 (M) / 580 (L)", emoji: "🍔" },
    { name: "Alto Patty", desc: "Crispy chicken patty with classy sauces", price: "320 (M)", emoji: "🍔" },
  ],
  Wraps: [
    { name: "28-Wheeler", desc: "Heavy & creamy fillet chicken wrap with lots of appetizing sauces", price: "500 (M) / 820 (L)", emoji: "🌯", trending: true },
    { name: "24-Wheeler", desc: "Super crispy zinger chicken wrap with appetizing sauces", price: "500 (M) / 770 (L)", emoji: "🌯" },
    { name: "22-Wheeler", desc: "Premium grilled chicken wrap with veggies & juicy sauces", price: "500 (M) / 780 (L)", emoji: "🌯" },
  ],
  "Loaded Fries": [
    { name: "Loaded Fries Mini", desc: "Crispy fries loaded with toppings", price: "700", emoji: "🍟" },
    { name: "Loaded Fries Small", desc: "Crispy fries loaded with toppings", price: "1050", emoji: "🍟", trending: true },
    { name: "Loaded Fries Medium", desc: "Crispy fries loaded with toppings", price: "1450", emoji: "🍟" },
    { name: "Loaded Fries Large", desc: "Crispy fries loaded with toppings", price: "1850", emoji: "🍟" },
  ],
  "French Fries": [
    { name: "French Fries Small", desc: "Golden crispy fries", price: "320", emoji: "🍟" },
    { name: "French Fries Medium", desc: "Golden crispy fries", price: "420", emoji: "🍟" },
    { name: "French Fries Large", desc: "Golden crispy fries", price: "520", emoji: "🍟" },
  ],
  Pizza: [
    { name: "Tikka Pizza", desc: "Classic tikka flavor on crispy base", price: "590 / 990 / 1590", emoji: "🍕" },
    { name: "Fajita Pizza", desc: "Tangy fajita toppings on golden crust", price: "590 / 990 / 1590", emoji: "🍕" },
    { name: "Fajita Sicilian", desc: "Sicilian-style fajita pizza", price: "590 / 990 / 1590", emoji: "🍕" },
    { name: "Pepperoni Pizza", desc: "Classic pepperoni delight", price: "590 / 990 / 1590", emoji: "🍕", trending: true },
    { name: "Veggie Pizza", desc: "Fresh veggie loaded pizza", price: "590 / 990 / 1590", emoji: "🍕" },
    { name: "Garage Special Pizza", desc: "Our signature premium pizza", price: "660 / 1090 / 1790", emoji: "🍕", trending: true },
    { name: "Chef Special Pizza", desc: "Chef's own premium creation", price: "660 / 1090 / 1790", emoji: "🍕" },
    { name: "Mughlai Pizza", desc: "Rich Mughlai flavors on pizza", price: "660 / 1090 / 1790", emoji: "🍕" },
    { name: "BBQ Pizza", desc: "Smoky BBQ toppings", price: "660 / 1090 / 1790", emoji: "🍕" },
    { name: "Malai Boti Pizza", desc: "Creamy malai boti topping", price: "660 / 1090 / 1790", emoji: "🍕" },
  ],
  Nuggets: [
    { name: "Crispy Nuggets (4 pcs)", desc: "Crunchy & crispy nuggets", price: "199", emoji: "🍗", trending: true },
    { name: "Crispy Nuggets (8 pcs)", desc: "Crunchy & crispy nuggets", price: "399", emoji: "🍗" },
    { name: "Hotshots (4 pcs)", desc: "Spicy hot shots", price: "250", emoji: "🍗" },
    { name: "Hotshots (8 pcs)", desc: "Spicy hot shots", price: "450", emoji: "🍗" },
  ],
  Drinks: [
    { name: "Peach Ice Tea", desc: "Special summer refresher", price: "199", emoji: "🍑", trending: true },
    { name: "Soft Drink NR", desc: "Regular cold drink", price: "Market price", emoji: "🥤" },
    { name: "Soft Drink 1 Liter", desc: "Family size", price: "Market price", emoji: "🥤" },
    { name: "Water 500ml", desc: "Still water", price: "Market price", emoji: "💧" },
  ],
};

const deals = [
  { name: "Punjab Deal", desc: "2 Small Pizzas", price: "1049", color: "#f59e0b", icon: "🍕" },
  { name: "Punjab Deal", desc: "2 Medium Pizzas", price: "1888", color: "#ef4444", icon: "🍕" },
  { name: "Punjab Deal", desc: "2 Large Pizzas", price: "2999", color: "#dc2626", icon: "🍕" },
  { name: "Winter Deal", desc: "6/7 inch Pizza + Drink", price: "560", originalPrice: "750", color: "#f97316", icon: "🌨️" },
  { name: "Lockdown Deal", desc: "Garage Special Pizza", price: "1349", color: "#7c3aed", icon: "🔥" },
];

const reviews = [
  { name: "Ali Hassan", city: "Gujranwala", stars: 5, text: "Best burgers in town! The Corolla Zinger is absolutely fire. Fresh ingredients, amazing sauces. Will order again!" },
  { name: "Sara Khan", city: "Kamoke", stars: 5, text: "28-Wheeler wrap is unreal! So filling and tasty. Fast delivery too. Burger Garage is on another level." },
  { name: "Usman Malik", city: "Wazirabad", stars: 5, text: "Loaded fries are addictive. The Peach Ice Tea is the perfect combo. Premium quality at great prices." },
  { name: "Fatima Noor", city: "Daska", stars: 5, text: "Love the Garage Special Pizza! The flavors are authentic and the crust is perfect. Highly recommend!" },
  { name: "Bilal Ahmed", city: "GRW Bus Stop", stars: 5, text: "Crispy nuggets with chipotle sauce — absolute perfection. Family loves it every time we order." },
];

const galleryItems = [
  { emoji: "🍔", label: "Corolla Zinger", color: "#ef4444" },
  { emoji: "🍟", label: "Loaded Fries", color: "#f59e0b" },
  { emoji: "🌯", label: "28-Wheeler", color: "#f97316" },
  { emoji: "🍕", label: "Garage Special", color: "#dc2626" },
  { emoji: "🍗", label: "Crispy Nuggets", color: "#b45309" },
  { emoji: "🍑", label: "Peach Ice Tea", color: "#ea580c" },
  { emoji: "🍔", label: "Hilux Fillet", color: "#7c2d12" },
  { emoji: "🍕", label: "BBQ Pizza", color: "#9a3412" },
  { emoji: "🌯", label: "24-Wheeler", color: "#b45309" },
];

function StarRating({ n }) {
  return <span style={{ color: "#f59e0b", fontSize: 16 }}>{"★".repeat(n)}</span>;
}

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["Home", "Menu", "Deals", "About", "Gallery", "Reviews", "Contact"];

  const scrollTo = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 999,
      background: scrolled ? "rgba(10,10,10,0.85)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(239,68,68,0.2)" : "none",
      transition: "all 0.4s ease",
      padding: "0 5%",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      height: 72,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => scrollTo("home")}>
        <span style={{ fontSize: 34 }}>🍔</span>
        <div>
          <div style={{ fontFamily: "'Anton', sans-serif", fontSize: 22, color: "#ef4444", letterSpacing: 1, lineHeight: 1 }}>BURGER</div>
          <div style={{ fontFamily: "'Anton', sans-serif", fontSize: 14, color: "#f59e0b", letterSpacing: 3, lineHeight: 1 }}>GARAGE</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 32, alignItems: "center" }} className="nav-links-desktop">
        {links.map(l => (
          <span key={l} onClick={() => scrollTo(l)} style={{
            color: "rgba(255,255,255,0.85)", fontSize: 13, fontWeight: 600,
            letterSpacing: 1, cursor: "pointer", textTransform: "uppercase",
            transition: "color 0.2s",
          }}
            onMouseEnter={e => e.target.style.color = "#ef4444"}
            onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.85)"}
          >{l}</span>
        ))}
        <button onClick={() => openWhatsApp("Custom Order")} style={{
          background: "linear-gradient(135deg,#ef4444,#f97316)",
          border: "none", borderRadius: 999, padding: "8px 20px",
          color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer",
          letterSpacing: 0.5, boxShadow: "0 0 20px rgba(239,68,68,0.4)",
        }}>Order Now</button>
      </div>

      <button onClick={() => setMenuOpen(!menuOpen)} style={{
        display: "none", background: "none", border: "none",
        color: "#fff", fontSize: 28, cursor: "pointer",
      }} className="hamburger">☰</button>

      {menuOpen && (
        <div style={{
          position: "fixed", top: 72, left: 0, right: 0,
          background: "rgba(10,10,10,0.97)", backdropFilter: "blur(20px)",
          padding: "24px 5%", display: "flex", flexDirection: "column", gap: 16,
          borderBottom: "1px solid rgba(239,68,68,0.2)",
        }}>
          {links.map(l => (
            <span key={l} onClick={() => scrollTo(l)} style={{
              color: "#fff", fontSize: 18, fontWeight: 600, cursor: "pointer", letterSpacing: 1,
              padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.05)"
            }}>{l}</span>
          ))}
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Barlow:wght@400;600;700&display=swap');
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .hamburger { display: block !important; }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0a0a0a; color: #fff; font-family: 'Barlow', sans-serif; scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #111; }
        ::-webkit-scrollbar-thumb { background: #ef4444; border-radius: 2px; }
        @keyframes float { 0%,100%{transform:translateY(0) rotate(-2deg)} 50%{transform:translateY(-18px) rotate(2deg)} }
        @keyframes floatAlt { 0%,100%{transform:translateY(0) rotate(2deg)} 50%{transform:translateY(-14px) rotate(-2deg)} }
        @keyframes pulse-glow { 0%,100%{box-shadow:0 0 20px rgba(239,68,68,0.4)} 50%{box-shadow:0 0 50px rgba(239,68,68,0.8),0 0 80px rgba(245,158,11,0.3)} }
        @keyframes counter-up { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes gradient-shift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
        @keyframes scroll-indicator { 0%{transform:scaleX(0);transform-origin:left} }
        .menu-card:hover { transform: translateY(-8px) scale(1.02); border-color: rgba(239,68,68,0.6) !important; box-shadow: 0 20px 60px rgba(239,68,68,0.2), 0 0 30px rgba(245,158,11,0.1) !important; }
        .deal-card:hover { transform: translateY(-6px) scale(1.03); }
        .gallery-item:hover .gallery-overlay { opacity: 1 !important; }
        .gallery-item:hover .gallery-emoji { transform: scale(1.3) !important; }
        .whatsapp-btn:hover { transform: scale(1.1) !important; box-shadow: 0 0 30px rgba(37,211,102,0.6) !important; }
        .review-card:hover { transform: translateY(-4px); border-color: rgba(239,68,68,0.4) !important; }
        .cta-btn:hover { box-shadow: 0 0 40px rgba(239,68,68,0.7), 0 0 80px rgba(245,158,11,0.3) !important; transform: scale(1.05) !important; }
        .nav-order:hover { box-shadow: 0 0 30px rgba(239,68,68,0.7) !important; transform: scale(1.05); }
        .tab-btn:hover { background: rgba(239,68,68,0.15) !important; }
      `}</style>
    </nav>
  );
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const fn = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      setProgress((window.scrollY / total) * 100);
    };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, height: 3, zIndex: 1001,
      width: `${progress}%`,
      background: "linear-gradient(90deg,#ef4444,#f97316,#f59e0b)",
      transition: "width 0.1s",
      boxShadow: "0 0 10px rgba(239,68,68,0.8)",
    }} />
  );
}

function FloatingWhatsApp() {
  return (
    <button className="whatsapp-btn" onClick={() => openWhatsApp("General Inquiry")} style={{
      position: "fixed", bottom: 28, right: 28, zIndex: 998,
      width: 62, height: 62, borderRadius: "50%",
      background: "linear-gradient(135deg,#25D366,#128C7E)",
      border: "none", cursor: "pointer", fontSize: 30,
      display: "flex", alignItems: "center", justifyContent: "center",
      boxShadow: "0 8px 30px rgba(37,211,102,0.4)",
      transition: "all 0.3s ease",
    }}>💬</button>
  );
}

function HeroSection() {
  return (
    <section id="home" style={{
      minHeight: "100vh", position: "relative",
      display: "flex", alignItems: "center",
      background: "radial-gradient(ellipse at 60% 50%, rgba(239,68,68,0.15) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(245,158,11,0.1) 0%, transparent 50%), #0a0a0a",
      overflow: "hidden",
    }}>
      {/* Animated bg circles */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(239,68,68,0.08) 0%, transparent 70%)", top: "10%", right: "-10%", animation: "spin-slow 20s linear infinite" }} />
        <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)", bottom: "5%", left: "-5%", animation: "spin-slow 30s linear infinite reverse" }} />
        {[...Array(20)].map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            width: Math.random() * 4 + 1,
            height: Math.random() * 4 + 1,
            borderRadius: "50%",
            background: i % 2 === 0 ? "#ef4444" : "#f59e0b",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.6 + 0.2,
            animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 3}s`,
          }} />
        ))}
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 5% 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center", width: "100%" }}>
        <div style={{ animation: "fadeInUp 0.8s ease forwards" }}>
          <div style={{
            display: "inline-block", background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.4)",
            borderRadius: 999, padding: "6px 18px", marginBottom: 20, fontSize: 13, fontWeight: 700, color: "#ef4444", letterSpacing: 2
          }}>🔥 NOW OPEN — Multiple Locations</div>

          <h1 style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: "clamp(48px,7vw,90px)",
            lineHeight: 0.95,
            marginBottom: 24,
            background: "linear-gradient(135deg,#fff 0%,#ffd700 50%,#ef4444 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundSize: "200% 200%", animation: "gradient-shift 4s ease infinite",
          }}>
            FUEL YOUR<br />HUNGER AT<br />
            <span style={{ color: "#ef4444", WebkitTextFillColor: "#ef4444" }}>BURGER GARAGE</span>
          </h1>

          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 16, marginBottom: 36, lineHeight: 1.7, maxWidth: 420 }}>
            Fresh Burgers • Loaded Fries • Crispy Wraps • Signature Pizzas • Fast Delivery
          </p>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <button className="cta-btn" onClick={() => openWhatsApp("Custom Order")} style={{
              background: "linear-gradient(135deg,#ef4444,#f97316)",
              border: "none", borderRadius: 999, padding: "14px 36px",
              color: "#fff", fontWeight: 800, fontSize: 15, cursor: "pointer",
              boxShadow: "0 0 30px rgba(239,68,68,0.5)", letterSpacing: 1,
              transition: "all 0.3s ease",
            }}>🚀 Order Now</button>
            <button className="cta-btn" onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })} style={{
              background: "transparent",
              border: "2px solid rgba(245,158,11,0.6)", borderRadius: 999, padding: "13px 36px",
              color: "#f59e0b", fontWeight: 700, fontSize: 15, cursor: "pointer",
              letterSpacing: 1, transition: "all 0.3s ease",
            }}>📋 View Menu</button>
          </div>

          <div style={{ display: "flex", gap: 32, marginTop: 48 }}>
            {[["6+", "Locations"], ["50K+", "Orders"], ["4.9★", "Rating"]].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontFamily: "'Anton', sans-serif", fontSize: 28, color: "#ef4444" }}>{n}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", letterSpacing: 1 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
          <div style={{
            width: "clamp(280px,40vw,480px)", height: "clamp(280px,40vw,480px)",
            background: "radial-gradient(circle, rgba(239,68,68,0.2) 0%, transparent 70%)",
            borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
            position: "relative",
          }}>
            <div style={{ fontSize: "clamp(140px,20vw,220px)", animation: "float 3.5s ease-in-out infinite", lineHeight: 1 }}>🍔</div>
            <div style={{ position: "absolute", top: "10%", right: "5%", fontSize: 60, animation: "floatAlt 4s ease-in-out infinite" }}>🍟</div>
            <div style={{ position: "absolute", bottom: "15%", left: "5%", fontSize: 50, animation: "float 5s ease-in-out infinite", animationDelay: "1s" }}>🌯</div>
            <div style={{ position: "absolute", top: "25%", left: "0%", fontSize: 40, animation: "floatAlt 6s ease-in-out infinite", animationDelay: "0.5s" }}>🍕</div>
            {/* Glow ring */}
            <div style={{
              position: "absolute", inset: -2, borderRadius: "50%",
              border: "2px solid rgba(239,68,68,0.3)",
              animation: "pulse-glow 2s ease-in-out infinite",
            }} />
          </div>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 120, background: "linear-gradient(to top, #0a0a0a, transparent)" }} />
    </section>
  );
}

function MenuCard({ item }) {
  return (
    <div className="menu-card" style={{
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 20, overflow: "hidden",
      transition: "all 0.35s ease",
      position: "relative",
      backdropFilter: "blur(10px)",
    }}>
      {item.trending && (
        <div style={{
          position: "absolute", top: 14, right: 14, zIndex: 2,
          background: "linear-gradient(135deg,#ef4444,#f97316)",
          borderRadius: 999, padding: "4px 12px", fontSize: 11, fontWeight: 800,
          color: "#fff", letterSpacing: 1, boxShadow: "0 0 15px rgba(239,68,68,0.5)",
        }}>🔥 TRENDING</div>
      )}

      <div style={{
        height: 140, display: "flex", alignItems: "center", justifyContent: "center",
        background: "radial-gradient(circle, rgba(239,68,68,0.1) 0%, transparent 70%)",
        fontSize: 80,
      }}>{item.emoji}</div>

      <div style={{ padding: "16px 20px 20px" }}>
        <h3 style={{ fontFamily: "'Anton', sans-serif", fontSize: 20, color: "#fff", marginBottom: 6, letterSpacing: 0.5 }}>{item.name}</h3>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, lineHeight: 1.5, marginBottom: 14, minHeight: 38 }}>{item.desc}</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <span style={{ fontFamily: "'Anton', sans-serif", fontSize: 22, color: "#f59e0b" }}>
            Rs. {item.price}
          </span>
          <button onClick={() => openWhatsApp(item.name)} style={{
            background: "linear-gradient(135deg,#25D366,#128C7E)",
            border: "none", borderRadius: 999, padding: "8px 16px",
            color: "#fff", fontWeight: 700, fontSize: 12, cursor: "pointer",
            display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap",
            boxShadow: "0 0 15px rgba(37,211,102,0.3)",
          }}>💬 Order</button>
        </div>
      </div>
    </div>
  );
}

function MenuSection() {
  const cats = Object.keys(menuData);
  const [active, setActive] = useState(cats[0]);

  return (
    <section id="menu" style={{ padding: "100px 5%", background: "#0a0a0a" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{ color: "#ef4444", fontWeight: 700, fontSize: 13, letterSpacing: 3, marginBottom: 12 }}>OUR MENU</div>
          <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: "clamp(40px,5vw,70px)", color: "#fff", lineHeight: 1 }}>
            WHAT'S IN THE<br /><span style={{ color: "#f59e0b" }}>GARAGE</span>
          </h2>
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginBottom: 48 }}>
          {cats.map(c => (
            <button key={c} className="tab-btn" onClick={() => setActive(c)} style={{
              background: active === c ? "linear-gradient(135deg,#ef4444,#f97316)" : "rgba(255,255,255,0.05)",
              border: active === c ? "none" : "1px solid rgba(255,255,255,0.1)",
              borderRadius: 999, padding: "8px 20px",
              color: active === c ? "#fff" : "rgba(255,255,255,0.6)",
              fontWeight: 700, fontSize: 13, cursor: "pointer",
              boxShadow: active === c ? "0 0 20px rgba(239,68,68,0.4)" : "none",
              transition: "all 0.25s ease", letterSpacing: 0.5,
            }}>{c}</button>
          ))}
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 24,
        }}>
          {menuData[active].map(item => <MenuCard key={item.name} item={item} />)}
        </div>
      </div>
    </section>
  );
}

function DealsSection() {
  return (
    <section id="deals" style={{
      padding: "100px 5%",
      background: "linear-gradient(180deg,#0a0a0a 0%,#0f0500 50%,#0a0a0a 100%)",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{ color: "#f59e0b", fontWeight: 700, fontSize: 13, letterSpacing: 3, marginBottom: 12 }}>🔥 HOT DEALS</div>
          <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: "clamp(40px,5vw,70px)", color: "#fff", lineHeight: 1 }}>
            LIMITED TIME<br /><span style={{ color: "#ef4444" }}>OFFERS</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 24 }}>
          {deals.map((d, i) => (
            <div key={i} className="deal-card" style={{
              background: `linear-gradient(135deg, rgba(${hexToRgb(d.color)},0.15) 0%, rgba(${hexToRgb(d.color)},0.05) 100%)`,
              border: `1px solid rgba(${hexToRgb(d.color)},0.3)`,
              borderRadius: 24, padding: 28, position: "relative", overflow: "hidden",
              transition: "all 0.35s ease", cursor: "pointer",
              boxShadow: `0 10px 40px rgba(${hexToRgb(d.color)},0.1)`,
            }}>
              <div style={{ position: "absolute", top: -20, right: -20, fontSize: 100, opacity: 0.08 }}>{d.icon}</div>
              <div style={{ fontSize: 48, marginBottom: 16 }}>{d.icon}</div>
              <div style={{ fontFamily: "'Anton', sans-serif", fontSize: 22, color: "#fff", marginBottom: 4 }}>{d.name}</div>
              <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, marginBottom: 16 }}>{d.desc}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 20 }}>
                <span style={{ fontFamily: "'Anton', sans-serif", fontSize: 32, color: d.color }}>Rs. {d.price}</span>
                {d.originalPrice && <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 16, textDecoration: "line-through" }}>Rs. {d.originalPrice}</span>}
              </div>
              <button onClick={() => openWhatsApp(`${d.name} - ${d.desc}`)} style={{
                width: "100%", background: `linear-gradient(135deg,${d.color},rgba(${hexToRgb(d.color)},0.7))`,
                border: "none", borderRadius: 999, padding: "10px 0",
                color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer",
                boxShadow: `0 0 20px rgba(${hexToRgb(d.color)},0.4)`,
              }}>💬 Order on WhatsApp</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

function AboutSection() {
  const stats = [
    { num: "6+", label: "Garage Locations" },
    { num: "50K+", label: "Happy Customers" },
    { num: "99%", label: "Satisfaction Rate" },
    { num: "5+", label: "Years of Flavor" },
  ];

  return (
    <section id="about" style={{ padding: "100px 5%", background: "#0a0a0a" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
        <div>
          <div style={{ color: "#ef4444", fontWeight: 700, fontSize: 13, letterSpacing: 3, marginBottom: 16 }}>OUR STORY</div>
          <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: "clamp(36px,4vw,60px)", color: "#fff", lineHeight: 1.05, marginBottom: 28 }}>
            BURGER GARAGE<br />IS NOT JUST FOOD —<br /><span style={{ color: "#f59e0b" }}>IT'S A FLAVOR EXPERIENCE</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 16, lineHeight: 1.8, marginBottom: 40 }}>
            From the streets of Gujranwala to multiple cities across Punjab, Burger Garage has been serving fire-crafted burgers, loaded fries, and legendary wraps. Every item is built with passion, quality ingredients, and secret sauces that keep our customers coming back for more.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {["🌶️ Bold Flavors", "🥬 Fresh Daily", "⚡ Fast Delivery", "💯 Quality Guaranteed"].map(t => (
              <span key={t} style={{
                background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)",
                borderRadius: 999, padding: "6px 16px", fontSize: 13, color: "rgba(255,255,255,0.8)", fontWeight: 600,
              }}>{t}</span>
            ))}
          </div>
        </div>

        <div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 40 }}>
            {stats.map(s => (
              <div key={s.label} style={{
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 20, padding: 28, textAlign: "center",
              }}>
                <div style={{ fontFamily: "'Anton', sans-serif", fontSize: 48, color: "#ef4444", lineHeight: 1 }}>{s.num}</div>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, marginTop: 8, letterSpacing: 0.5 }}>{s.label}</div>
              </div>
            ))}
          </div>
          <div style={{
            background: "linear-gradient(135deg,rgba(239,68,68,0.15),rgba(245,158,11,0.1))",
            border: "1px solid rgba(239,68,68,0.2)", borderRadius: 20, padding: 28,
            textAlign: "center",
          }}>
            <div style={{ fontSize: 48, marginBottom: 10 }}>🍔</div>
            <p style={{ fontFamily: "'Anton', sans-serif", fontSize: 22, color: "#f59e0b", marginBottom: 6 }}>عشق نالوں برگر چنگا!</p>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14 }}>Nothing beats a Burger Garage meal</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  return (
    <section id="gallery" style={{ padding: "100px 5%", background: "#080808" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{ color: "#f97316", fontWeight: 700, fontSize: 13, letterSpacing: 3, marginBottom: 12 }}>FOOD PORN</div>
          <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: "clamp(40px,5vw,70px)", color: "#fff", lineHeight: 1 }}>
            FEAST YOUR<br /><span style={{ color: "#ef4444" }}>EYES</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {galleryItems.map((g, i) => (
            <div key={i} className="gallery-item" style={{
              borderRadius: 20, overflow: "hidden", position: "relative",
              height: i === 0 || i === 4 ? 280 : 200,
              background: `radial-gradient(circle at center, rgba(${hexToRgb(g.color)},0.3) 0%, #111 100%)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", border: "1px solid rgba(255,255,255,0.06)",
            }}>
              <span className="gallery-emoji" style={{ fontSize: 80, transition: "transform 0.4s ease" }}>{g.emoji}</span>
              <div className="gallery-overlay" style={{
                position: "absolute", inset: 0, background: `rgba(${hexToRgb(g.color)},0.85)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                opacity: 0, transition: "opacity 0.3s ease", borderRadius: 20,
              }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'Anton', sans-serif", fontSize: 22, color: "#fff" }}>{g.label}</div>
                  <button onClick={() => openWhatsApp(g.label)} style={{
                    marginTop: 12, background: "rgba(255,255,255,0.2)",
                    border: "1px solid rgba(255,255,255,0.5)", borderRadius: 999,
                    padding: "8px 20px", color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer",
                  }}>Order Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewsSection() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % reviews.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="reviews" style={{ padding: "100px 5%", background: "#0a0a0a" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{ color: "#f59e0b", fontWeight: 700, fontSize: 13, letterSpacing: 3, marginBottom: 12 }}>TESTIMONIALS</div>
          <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: "clamp(40px,5vw,70px)", color: "#fff", lineHeight: 1 }}>
            WHAT OUR<br /><span style={{ color: "#ef4444" }}>CUSTOMERS SAY</span>
          </h2>
        </div>

        <div style={{ position: "relative", minHeight: 280 }}>
          {reviews.map((r, i) => (
            <div key={i} className="review-card" style={{
              position: "absolute", width: "100%",
              opacity: i === idx ? 1 : 0,
              transform: i === idx ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.5s ease",
              pointerEvents: i === idx ? "auto" : "none",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 24, padding: "40px 48px",
            }}>
              <div style={{ fontSize: 48, marginBottom: 20, color: "rgba(239,68,68,0.3)" }}>"</div>
              <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 18, lineHeight: 1.7, marginBottom: 28, fontStyle: "italic" }}>{r.text}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: "50%",
                  background: "linear-gradient(135deg,#ef4444,#f97316)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Anton', sans-serif", fontSize: 18, color: "#fff",
                }}>{r.name[0]}</div>
                <div>
                  <div style={{ fontWeight: 700, color: "#fff", fontSize: 15 }}>{r.name}</div>
                  <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>{r.city}</div>
                </div>
                <div style={{ marginLeft: "auto" }}><StarRating n={r.stars} /></div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 300 }}>
          {reviews.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} style={{
              width: i === idx ? 32 : 8, height: 8, borderRadius: 999,
              background: i === idx ? "#ef4444" : "rgba(255,255,255,0.2)",
              border: "none", cursor: "pointer",
              transition: "all 0.3s ease",
            }} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const locations = [
    { city: "Ramwali GRW", phone: "0306 6663072 / 055 8173072" },
    { city: "Bus Stop GRW", phone: "0305 6663072" },
    { city: "Daska", phone: "0370 6663072" },
    { city: "Kamoke", phone: "0328 6663072" },
    { city: "Wazirabad", phone: "0328 6663072" },
    { city: "Sialkot Road GRW", phone: "03200 6663072" },
  ];

  return (
    <section id="contact" style={{ padding: "100px 5%", background: "#080808" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{ color: "#ef4444", fontWeight: 700, fontSize: 13, letterSpacing: 3, marginBottom: 12 }}>GET IN TOUCH</div>
          <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: "clamp(40px,5vw,70px)", color: "#fff", lineHeight: 1 }}>
            FIND YOUR<br /><span style={{ color: "#f59e0b" }}>GARAGE</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20, marginBottom: 60 }}>
          {locations.map(l => (
            <div key={l.city} style={{
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 20, padding: 28,
              transition: "all 0.3s",
            }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>📍</div>
              <div style={{ fontFamily: "'Anton', sans-serif", fontSize: 20, color: "#fff", marginBottom: 8 }}>{l.city}</div>
              <div style={{ color: "#ef4444", fontSize: 14, fontWeight: 600 }}>{l.phone}</div>
              <button onClick={() => openWhatsApp(`Order from ${l.city} branch`)} style={{
                marginTop: 16, width: "100%",
                background: "linear-gradient(135deg,#25D366,#128C7E)",
                border: "none", borderRadius: 999, padding: "9px 0",
                color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer",
              }}>💬 WhatsApp Order</button>
            </div>
          ))}
        </div>

        <div style={{
          background: "linear-gradient(135deg,rgba(239,68,68,0.1),rgba(245,158,11,0.05))",
          border: "1px solid rgba(239,68,68,0.2)",
          borderRadius: 24, padding: "48px 5%", textAlign: "center",
        }}>
          <div style={{ fontSize: 56, marginBottom: 20 }}>⏰</div>
          <h3 style={{ fontFamily: "'Anton', sans-serif", fontSize: 32, color: "#fff", marginBottom: 16 }}>OPENING HOURS</h3>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 16, marginBottom: 8 }}>Monday – Sunday</p>
          <p style={{ fontFamily: "'Anton', sans-serif", fontSize: 28, color: "#f59e0b" }}>12:00 PM – 2:00 AM</p>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, marginTop: 8 }}>Late night delivery available</p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{
      background: "#040404", borderTop: "1px solid rgba(239,68,68,0.15)",
      padding: "60px 5% 30px",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 60, marginBottom: 48 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <span style={{ fontSize: 40 }}>🍔</span>
              <div>
                <div style={{ fontFamily: "'Anton', sans-serif", fontSize: 28, color: "#ef4444" }}>BURGER</div>
                <div style={{ fontFamily: "'Anton', sans-serif", fontSize: 16, color: "#f59e0b", letterSpacing: 4 }}>GARAGE</div>
              </div>
            </div>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, lineHeight: 1.7, maxWidth: 300 }}>
              Pakistan's boldest burger brand. Fresh ingredients, fired-up flavors, delivered fast.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
              {["📘", "📷", "🎵"].map(icon => (
                <div key={icon} style={{
                  width: 40, height: 40, borderRadius: "50%",
                  background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", fontSize: 20, transition: "all 0.2s",
                }}>{icon}</div>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontFamily: "'Anton', sans-serif", fontSize: 18, color: "#fff", marginBottom: 20, letterSpacing: 1 }}>QUICK LINKS</h4>
            {["Home", "Menu", "Deals", "About", "Gallery", "Reviews"].map(l => (
              <div key={l} style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, marginBottom: 10, cursor: "pointer" }}
                onClick={() => document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: "smooth" })}
              >{l}</div>
            ))}
          </div>

          <div>
            <h4 style={{ fontFamily: "'Anton', sans-serif", fontSize: 18, color: "#fff", marginBottom: 20, letterSpacing: 1 }}>CONTACT</h4>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, marginBottom: 10 }}>📞 0306 6663072</div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, marginBottom: 10 }}>💬 WhatsApp Orders</div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, marginBottom: 10 }}>📍 Multiple Punjab Locations</div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>⏰ 12PM – 2AM Daily</div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
          <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 13 }}>© 2024 Burger Garage. All rights reserved.</p>
          <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 13 }}>عشق نالوں برگر چنگا! 🍔</p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh" }}>
      <ScrollProgress />
      <NavBar />
      <HeroSection />
      <MenuSection />
      <DealsSection />
      <AboutSection />
      <GallerySection />
      <ReviewsSection />
      <ContactSection />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}