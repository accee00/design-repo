import { useState } from "react";
import { MapPin, Search, Bell, Star, Clock, Map, List, ChevronRight, Zap } from "lucide-react";

const SHOPS = [
  { id: "shop1", name: "Fresh Greens Grocery", emoji: "🥬", category: "Grocery", rating: 4.8, time: "8 min", distance: "0.3 km", open: true, tags: ["Vegetables", "Fruits", "Dairy"], lat: 38, lng: 42 },
  { id: "shop2", name: "Star Bakery", emoji: "🍞", category: "Bakery", rating: 4.6, time: "12 min", distance: "0.6 km", open: true, tags: ["Bread", "Cakes", "Pastries"], lat: 55, lng: 28 },
  { id: "shop3", name: "City Pharma", emoji: "💊", category: "Pharmacy", rating: 4.5, time: "10 min", distance: "0.5 km", open: true, tags: ["Medicines", "Healthcare"], lat: 30, lng: 60 },
  { id: "shop4", name: "Spice Garden", emoji: "🌶️", category: "Grocery", rating: 4.7, time: "15 min", distance: "0.8 km", open: false, tags: ["Spices", "Masalas", "Dry Fruits"], lat: 65, lng: 50 },
  { id: "shop5", name: "Morning Dairy", emoji: "🥛", category: "Dairy", rating: 4.9, time: "7 min", distance: "0.2 km", open: true, tags: ["Milk", "Paneer", "Butter"], lat: 45, lng: 72 },
  { id: "shop6", name: "Veggie Hub", emoji: "🥦", category: "Grocery", rating: 4.4, time: "20 min", distance: "1.1 km", open: true, tags: ["Organic", "Fresh Produce"], lat: 72, lng: 35 },
];

const CATEGORIES = [
  { emoji: "🥬", label: "Grocery" },
  { emoji: "🍞", label: "Bakery" },
  { emoji: "💊", label: "Pharma" },
  { emoji: "🥛", label: "Dairy" },
  { emoji: "🥩", label: "Meat" },
  { emoji: "🌶️", label: "Spices" },
];

const PIN_COLORS = ["#0A7C6E", "#FF6B35", "#F59E0B", "#22C55E", "#8B5CF6", "#EF4444"];

const CATEGORY_BG: Record<string, string> = {
  Grocery: "#D1FAE5",
  Bakery: "#FEF3C7",
  Pharmacy: "#DBEAFE",
  Dairy: "#EDE9FE",
  Spices: "#FEE2E2",
};

interface Props {
  onShopSelect: (shopId: string) => void;
}

export function HomeScreen({ onShopSelect }: Props) {
  const [view, setView] = useState<"map" | "list">("map");
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState<string | null>(null);

  const filtered = SHOPS.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = !selectedCat || s.category === selectedCat;
    return matchSearch && matchCat;
  });

  return (
    <div className="h-full overflow-y-auto" style={{ background: "#F7F8FA", scrollbarWidth: "none" }}>
      {/* Sticky header */}
      <div className="sticky top-0 z-30 px-5 pt-3 pb-3" style={{ background: "#fff", boxShadow: "0 1px 0 #E5E7EB" }}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="flex items-center gap-1">
              <MapPin size={13} style={{ color: "#0A7C6E" }} />
              <span style={{ fontSize: 11, color: "#0A7C6E", fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>Delivering to</span>
            </div>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 14, color: "#111827" }}>
              Koramangala, Bengaluru ▾
            </p>
          </div>
          <button className="relative w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#F7F8FA" }}>
            <Bell size={20} style={{ color: "#4B5563" }} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: "#FF6B35" }} />
          </button>
        </div>
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "#9CA3AF" }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search shops or products..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl outline-none"
            style={{ background: "#F7F8FA", border: "1.5px solid #E5E7EB", fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#111827" }}
            onFocus={(e) => (e.target.style.borderColor = "#0A7C6E")}
            onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
          />
        </div>
      </div>

      {/* Promo banner */}
      <div className="mx-4 mt-4 px-4 py-3 rounded-2xl flex items-center gap-3" style={{ background: "linear-gradient(135deg, #FF6B35, #e8500a)" }}>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.2)" }}>
          <Zap size={18} color="white" />
        </div>
        <div className="flex-1">
          <p className="text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 13 }}>
            Get 20% off your first order!
          </p>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 11, fontFamily: "'Inter', sans-serif" }}>
            Use code LOCALFIRST at checkout
          </p>
        </div>
        <span className="text-white" style={{ fontSize: 18 }}>›</span>
      </div>

      {/* Categories */}
      <div className="mt-5 px-4">
        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 15, color: "#111827", marginBottom: 10 }}>
          Shop by Category
        </p>
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          <button
            onClick={() => setSelectedCat(null)}
            className="flex flex-col items-center gap-1.5 flex-shrink-0 transition-all"
            style={{ width: 58 }}
          >
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: !selectedCat ? "#0A7C6E" : "#fff", border: "1.5px solid", borderColor: !selectedCat ? "#0A7C6E" : "#E5E7EB" }}>
              <span style={{ fontSize: 20 }}>🏪</span>
            </div>
            <span style={{ fontSize: 10, fontFamily: "'Inter', sans-serif", fontWeight: 500, color: !selectedCat ? "#0A7C6E" : "#4B5563" }}>All</span>
          </button>
          {CATEGORIES.map((cat) => {
            const active = selectedCat === cat.label;
            return (
              <button
                key={cat.label}
                onClick={() => setSelectedCat(active ? null : cat.label)}
                className="flex flex-col items-center gap-1.5 flex-shrink-0 transition-all"
                style={{ width: 58 }}
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: active ? "#0A7C6E" : "#fff", border: "1.5px solid", borderColor: active ? "#0A7C6E" : "#E5E7EB" }}>
                  <span style={{ fontSize: 22 }}>{cat.emoji}</span>
                </div>
                <span style={{ fontSize: 10, fontFamily: "'Inter', sans-serif", fontWeight: 500, color: active ? "#0A7C6E" : "#4B5563" }}>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* View toggle + count */}
      <div className="flex items-center justify-between px-4 mt-5">
        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 15, color: "#111827" }}>
          Nearby Shops
          <span style={{ color: "#9CA3AF", fontWeight: 400, fontSize: 12, marginLeft: 6 }}>({filtered.length})</span>
        </p>
        <div className="flex rounded-xl overflow-hidden" style={{ border: "1.5px solid #E5E7EB" }}>
          {(["map", "list"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className="px-3 py-1.5 flex items-center gap-1 transition-all"
              style={{
                background: view === v ? "#0A7C6E" : "#fff",
                color: view === v ? "#fff" : "#4B5563",
                fontFamily: "'Inter', sans-serif",
                fontSize: 12,
                fontWeight: 500,
              }}
            >
              {v === "map" ? <Map size={13} /> : <List size={13} />}
              {v === "map" ? "Map" : "List"}
            </button>
          ))}
        </div>
      </div>

      {/* Map or List */}
      <div className="mt-3 px-4 pb-6">
        {view === "map" ? (
          <MapView shops={filtered} onShopSelect={onShopSelect} />
        ) : (
          <ListView shops={filtered} onShopSelect={onShopSelect} />
        )}
      </div>
    </div>
  );
}

/* ── Map View ─────────────────────────────────────────────── */
function MapView({ shops, onShopSelect }: { shops: typeof SHOPS; onShopSelect: (id: string) => void }) {
  const [activePin, setActivePin] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-4">
      {/* Map */}
      <div className="relative rounded-2xl overflow-hidden" style={{ height: 240, background: "#E8F0E9", border: "1.5px solid #D1D5DB" }}>
        {[...Array(5)].map((_, i) => (
          <div key={`h${i}`} className="absolute left-0 right-0" style={{ top: `${i * 25}%`, height: 1, background: "rgba(0,0,0,0.05)" }} />
        ))}
        {[...Array(5)].map((_, i) => (
          <div key={`v${i}`} className="absolute top-0 bottom-0" style={{ left: `${i * 25}%`, width: 1, background: "rgba(0,0,0,0.05)" }} />
        ))}
        <div className="absolute" style={{ top: "45%", left: 0, right: 0, height: 7, background: "rgba(255,255,255,0.7)", borderRadius: 4 }} />
        <div className="absolute" style={{ left: "35%", top: 0, bottom: 0, width: 7, background: "rgba(255,255,255,0.7)", borderRadius: 4 }} />
        <div className="absolute" style={{ left: "68%", top: 0, bottom: 0, width: 5, background: "rgba(255,255,255,0.5)", borderRadius: 4 }} />
        {/* My location */}
        <div className="absolute" style={{ top: "50%", left: "40%", transform: "translate(-50%, -50%)" }}>
          <div className="w-5 h-5 rounded-full border-4 border-white shadow-lg relative" style={{ background: "#0A7C6E" }}>
            <div className="absolute inset-0 rounded-full animate-ping opacity-40" style={{ background: "#0A7C6E" }} />
          </div>
        </div>
        {shops.map((shop, i) => (
          <button
            key={shop.id}
            onClick={() => setActivePin(activePin === shop.id ? null : shop.id)}
            className="absolute transition-all"
            style={{ top: `${shop.lat}%`, left: `${shop.lng}%`, transform: "translate(-50%, -100%)", zIndex: activePin === shop.id ? 20 : 10 }}
          >
            <div className="flex flex-col items-center">
              <div className="px-2 py-1 rounded-full shadow-md flex items-center gap-1 transition-all"
                style={{ background: PIN_COLORS[i % PIN_COLORS.length], transform: activePin === shop.id ? "scale(1.15)" : "scale(1)" }}>
                <span style={{ fontSize: 12 }}>{shop.emoji}</span>
                {activePin === shop.id && (
                  <span className="text-white" style={{ fontSize: 11, fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>{shop.name.split(" ")[0]}</span>
                )}
              </div>
              <div className="w-0.5 h-2" style={{ background: PIN_COLORS[i % PIN_COLORS.length] }} />
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: PIN_COLORS[i % PIN_COLORS.length] }} />
            </div>
          </button>
        ))}
        {activePin && (() => {
          const s = shops.find((s) => s.id === activePin);
          if (!s) return null;
          return (
            <div className="absolute bottom-3 left-3 right-3 p-3 rounded-2xl shadow-lg" style={{ background: "#fff" }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: CATEGORY_BG[s.category] ?? "#F3F4F6" }}>
                    <span style={{ fontSize: 20 }}>{s.emoji}</span>
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 13, color: "#111827" }}>{s.name}</p>
                    <div className="flex items-center gap-1.5">
                      <Star size={10} fill="#FF6B35" color="#FF6B35" />
                      <span style={{ fontSize: 11, color: "#4B5563", fontFamily: "'Inter', sans-serif" }}>{s.rating} · {s.time}</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => onShopSelect(s.id)} className="px-3 py-1.5 rounded-xl text-white" style={{ background: "#0A7C6E", fontSize: 12, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}>
                  View →
                </button>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Cards below map */}
      <div className="space-y-3">
        {shops.map((shop) => <ShopCard key={shop.id} shop={shop} onSelect={onShopSelect} />)}
      </div>
    </div>
  );
}

/* ── List View ────────────────────────────────────────────── */
function ListView({ shops, onShopSelect }: { shops: typeof SHOPS; onShopSelect: (id: string) => void }) {
  return (
    <div className="space-y-3">
      {shops.map((shop) => <ShopCard key={shop.id} shop={shop} onSelect={onShopSelect} />)}
    </div>
  );
}

/* ── Redesigned Shop Card ─────────────────────────────────── */
function ShopCard({ shop, onSelect }: { shop: typeof SHOPS[0]; onSelect: (id: string) => void }) {
  const bg = CATEGORY_BG[shop.category] ?? "#F3F4F6";

  return (
    <button
      onClick={() => onSelect(shop.id)}
      className="w-full text-left flex items-stretch rounded-2xl overflow-hidden transition-all active:scale-[0.98]"
      style={{ background: "#fff", border: "1px solid #E5E7EB", boxShadow: "0 2px 8px rgba(10,124,110,0.06)" }}
    >
      {/* Left emoji slab */}
      <div
        className="flex-shrink-0 flex flex-col items-center justify-center"
        style={{ width: 80, background: bg, position: "relative", overflow: "hidden" }}
      >
        <span style={{ fontSize: 38, lineHeight: 1 }}>{shop.emoji}</span>
        <span
          style={{
            position: "absolute",
            fontSize: 70,
            opacity: 0.08,
            bottom: -10,
            right: -10,
            lineHeight: 1,
            pointerEvents: "none",
          }}
        >
          {shop.emoji}
        </span>
      </div>

      {/* Main content */}
      <div className="flex-1 px-3 py-3 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p
              className="truncate"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 14, color: "#111827" }}
            >
              {shop.name}
            </p>
            <p style={{ fontSize: 12, color: "#9CA3AF", fontFamily: "'Inter', sans-serif", marginTop: 1 }}>
              {shop.category}
            </p>
          </div>
          <span
            className="flex-shrink-0 px-2 py-0.5 rounded-full"
            style={{
              background: shop.open ? "#D1FAE5" : "#F3F4F6",
              color: shop.open ? "#065F46" : "#6B7280",
              fontSize: 10,
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              whiteSpace: "nowrap",
            }}
          >
            {shop.open ? "● Open" : "Closed"}
          </span>
        </div>

        {/* Tags */}
        <div className="flex gap-1.5 mt-2 flex-wrap">
          {shop.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: 10,
                color: "#4B5563",
                background: "#F3F4F6",
                borderRadius: 6,
                padding: "2px 7px",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Bottom row */}
        <div className="flex items-center justify-between mt-2.5">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Star size={11} fill="#FF6B35" color="#FF6B35" />
              <span style={{ fontSize: 12, fontFamily: "'Inter', sans-serif", fontWeight: 600, color: "#111827" }}>{shop.rating}</span>
            </div>
            <div className="flex items-center gap-1" style={{ color: "#9CA3AF" }}>
              <Clock size={11} />
              <span style={{ fontSize: 12, fontFamily: "'Inter', sans-serif" }}>{shop.time}</span>
            </div>
            <div className="flex items-center gap-1" style={{ color: "#9CA3AF" }}>
              <MapPin size={11} />
              <span style={{ fontSize: 12, fontFamily: "'Inter', sans-serif" }}>{shop.distance}</span>
            </div>
          </div>
          <ChevronRight size={15} style={{ color: "#D1D5DB" }} />
        </div>
      </div>
    </button>
  );
}

export { SHOPS };
