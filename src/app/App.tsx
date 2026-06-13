import { useState } from "react";
import { CartProvider } from "./components/CartContext";
import { GetStarted } from "./components/GetStarted";
import { SignIn } from "./components/SignIn";
import { SignUp } from "./components/SignUp";
import { HomeScreen } from "./components/HomeScreen";
import { ShopDetail } from "./components/ShopDetail";
import { CartScreen } from "./components/CartScreen";
import { BottomNav } from "./components/BottomNav";

type Screen = "splash" | "signup" | "signin" | "home" | "shop" | "cart" | "offers" | "profile";

function AppInner() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [selectedShopId, setSelectedShopId] = useState<string>("shop1");
  const [navTab, setNavTab] = useState<"home" | "shops" | "cart" | "offers" | "profile">("home");

  const showNav = ["home", "shop", "cart", "offers", "profile"].includes(screen);

  const handleNavChange = (tab: "home" | "shops" | "cart" | "offers" | "profile") => {
    setNavTab(tab);
    if (tab === "home" || tab === "shops") setScreen("home");
    else if (tab === "cart") setScreen("cart");
    else if (tab === "offers") setScreen("offers");
    else if (tab === "profile") setScreen("profile");
  };

  const renderScreen = () => {
    if (screen === "splash") {
      return <GetStarted onGetStarted={() => setScreen("signin")} />;
    }
    if (screen === "signin") {
      return <SignIn onSignIn={() => { setScreen("home"); setNavTab("home"); }} onGoToSignUp={() => setScreen("signup")} onBack={() => setScreen("splash")} />;
    }
    if (screen === "signup") {
      return <SignUp onSignUp={() => { setScreen("home"); setNavTab("home"); }} onGoToSignIn={() => setScreen("signin")} onBack={() => setScreen("signin")} />;
    }
    if (screen === "home" || screen === "offers" || screen === "profile") {
      if (screen === "offers") return <OffersScreen onBack={() => setScreen("home")} />;
      if (screen === "profile") return <ProfileScreen onSignOut={() => setScreen("splash")} />;
      return <HomeScreen onShopSelect={(id) => { setSelectedShopId(id); setScreen("shop"); }} />;
    }
    if (screen === "shop") {
      return (
        <ShopDetail
          shopId={selectedShopId}
          onBack={() => { setScreen("home"); setNavTab("home"); }}
          onGoToCart={() => { setScreen("cart"); setNavTab("cart"); }}
        />
      );
    }
    if (screen === "cart") {
      return (
        <CartScreen
          onBack={() => { setScreen("home"); setNavTab("home"); }}
          onGoToShop={(id) => { setSelectedShopId(id); setScreen("shop"); }}
        />
      );
    }
    return null;
  };

  return (
    <div
      className="flex items-center justify-center h-full"
      style={{ background: "#1a1a2e" }}
    >
      {/* Phone frame */}
      <div
        className="relative flex flex-col overflow-hidden"
        style={{
          width: 390,
          height: 844,
          borderRadius: 44,
          boxShadow: "0 32px 80px rgba(0,0,0,0.5), inset 0 0 0 2px rgba(255,255,255,0.1)",
          background: "#F7F8FA",
        }}
      >
        {/* Status bar */}
        <div className="flex items-center justify-between px-8 pt-3 pb-1 flex-shrink-0" style={{ background: screen === "splash" ? "#0A7C6E" : screen === "signin" || screen === "signup" ? "#0A7C6E" : "#fff", zIndex: 50 }}>
          <span style={{ fontSize: 13, fontWeight: 600, fontFamily: "'Inter', sans-serif", color: ["splash", "signin", "signup"].includes(screen) ? "white" : "#111827" }}>9:41</span>
          <div className="flex items-center gap-1.5">
            <div className="flex items-end gap-0.5">
              {[40, 60, 80, 100].map((h, i) => (
                <div key={i} className="w-1 rounded-sm" style={{ height: h * 0.12, background: ["splash", "signin", "signup"].includes(screen) ? "rgba(255,255,255,0.8)" : "#111827" }} />
              ))}
            </div>
            <span style={{ fontSize: 11, color: ["splash", "signin", "signup"].includes(screen) ? "rgba(255,255,255,0.8)" : "#111827" }}>wifi</span>
            <span style={{ fontSize: 11, color: ["splash", "signin", "signup"].includes(screen) ? "rgba(255,255,255,0.8)" : "#111827" }}>87%</span>
          </div>
        </div>

        {/* Screen content */}
        <div className="flex-1 overflow-hidden relative">
          {renderScreen()}
        </div>

        {/* Bottom nav */}
        {showNav && (
          <div className="flex-shrink-0">
            <BottomNav active={navTab} onChange={handleNavChange} />
          </div>
        )}

        {/* Home indicator */}
        <div className="flex justify-center pb-2 pt-1 flex-shrink-0" style={{ background: "#fff" }}>
          <div className="w-32 h-1 rounded-full" style={{ background: "#D1D5DB" }} />
        </div>
      </div>
    </div>
  );
}

function OffersScreen({ onBack }: { onBack: () => void }) {
  const offers = [
    { emoji: "🥬", title: "20% off Fresh Greens", sub: "Use FRESHOFF20", expires: "Today only", color: "#0A7C6E" },
    { emoji: "🍞", title: "Buy 2 Get 1 Free", sub: "Star Bakery — all bread", expires: "Ends Sun", color: "#F59E0B" },
    { emoji: "💊", title: "Free delivery on ₹200+", sub: "City Pharma", expires: "Ongoing", color: "#22C55E" },
    { emoji: "⚡", title: "Flash: 30% off groceries", sub: "All grocery shops", expires: "3 hrs left", color: "#FF6B35" },
  ];
  return (
    <div className="flex flex-col h-full" style={{ background: "#F7F8FA" }}>
      <div className="px-5 pt-12 pb-4" style={{ background: "#fff" }}>
        <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 22, color: "#111827" }}>Offers & Deals 🎉</h1>
        <p style={{ fontSize: 13, color: "#9CA3AF", fontFamily: "'Inter', sans-serif", marginTop: 2 }}>Exclusive deals from your neighbourhood</p>
      </div>
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
        {offers.map((o) => (
          <div key={o.title} className="rounded-2xl overflow-hidden" style={{ background: "#fff", border: "1px solid #E5E7EB" }}>
            <div className="px-4 py-3 flex items-center gap-3" style={{ background: `${o.color}15` }}>
              <span className="text-3xl">{o.emoji}</span>
              <div>
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 15, color: o.color }}>{o.title}</p>
                <p style={{ fontSize: 13, color: "#4B5563", fontFamily: "'Inter', sans-serif" }}>{o.sub}</p>
              </div>
            </div>
            <div className="px-4 py-2 flex items-center justify-between">
              <span style={{ fontSize: 12, color: "#9CA3AF", fontFamily: "'Inter', sans-serif" }}>🕐 {o.expires}</span>
              <button className="px-4 py-1.5 rounded-lg text-white" style={{ background: o.color, fontSize: 13, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}>Claim</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfileScreen({ onSignOut }: { onSignOut: () => void }) {
  return (
    <div className="flex flex-col h-full" style={{ background: "#F7F8FA" }}>
      <div className="px-5 pt-12 pb-6 flex flex-col items-center" style={{ background: "linear-gradient(135deg, #0A7C6E, #064E3B)" }}>
        <div className="w-20 h-20 rounded-full flex items-center justify-center mb-3" style={{ background: "rgba(255,255,255,0.2)" }}>
          <span className="text-4xl">👤</span>
        </div>
        <p className="text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 18 }}>Rahul Sharma</p>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, fontFamily: "'Inter', sans-serif" }}>rahul@example.com</p>
      </div>
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
        {["📦 My Orders", "📍 Saved Addresses", "💳 Payment Methods", "🔔 Notifications", "❓ Help & Support", "⚙️ Settings"].map((item) => (
          <button key={item} className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl" style={{ background: "#fff", border: "1px solid #E5E7EB" }}>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500, fontSize: 15, color: "#111827" }}>{item}</span>
            <span style={{ color: "#9CA3AF" }}>›</span>
          </button>
        ))}
        <button onClick={onSignOut} className="w-full py-3.5 rounded-xl mt-2" style={{ background: "#FEE2E2", color: "#EF4444", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 15 }}>
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppInner />
    </CartProvider>
  );
}
