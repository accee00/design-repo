interface Props {
  onGetStarted: () => void;
}

export function GetStarted({ onGetStarted }: Props) {
  return (
    <div className="flex flex-col h-full relative overflow-hidden" style={{ background: "linear-gradient(160deg, #0A7C6E 0%, #064E3B 60%, #0A7C6E 100%)" }}>
      {/* Decorative circles */}
      <div className="absolute top-[-80px] right-[-60px] w-64 h-64 rounded-full opacity-10" style={{ background: "#FF6B35" }} />
      <div className="absolute bottom-[200px] left-[-40px] w-48 h-48 rounded-full opacity-10" style={{ background: "#ffffff" }} />

      {/* Top pattern */}
      <div className="absolute top-0 left-0 right-0 h-72 opacity-5">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="absolute text-8xl" style={{ top: `${(i % 3) * 80}px`, left: `${(i % 2) * 180}px`, transform: "rotate(-15deg)", opacity: 0.3 }}>🛒</div>
        ))}
      </div>

      {/* Logo area */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 pt-16">
        <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-lg" style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)" }}>
          <span className="text-4xl">🛍️</span>
        </div>
        <h1 className="text-white text-center mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 32, fontWeight: 700 }}>LocalMart</h1>
        <p className="text-center mb-2" style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'Inter', sans-serif", fontSize: 15 }}>Your neighbourhood, delivered</p>

        {/* Feature highlights */}
        <div className="mt-12 w-full space-y-4">
          {[
            { emoji: "🏪", title: "100+ Local Shops", sub: "Fresh produce, groceries & more" },
            { emoji: "⚡", title: "10-Minute Delivery", sub: "From your neighbourhood store" },
            { emoji: "💚", title: "Support Local", sub: "Empower community businesses" },
          ].map((f) => (
            <div key={f.title} className="flex items-center gap-4 px-5 py-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.10)" }}>
              <span className="text-3xl">{f.emoji}</span>
              <div>
                <p className="text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 15 }}>{f.title}</p>
                <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, fontFamily: "'Inter', sans-serif" }}>{f.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="px-6 pb-10 space-y-3">
        <button
          onClick={onGetStarted}
          className="w-full py-4 rounded-xl text-white transition-all active:scale-95"
          style={{ background: "#FF6B35", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 16 }}
        >
          Get Started
        </button>
        <p className="text-center text-xs" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Inter', sans-serif" }}>
          By continuing you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
}
