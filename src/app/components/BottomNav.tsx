import { Home, Store, ShoppingCart, Tag, User } from "lucide-react";
import { useCart } from "./CartContext";

type Tab = "home" | "shops" | "cart" | "offers" | "profile";

interface Props {
  active: Tab;
  onChange: (tab: Tab) => void;
}

const TABS: { id: Tab; icon: React.ReactNode; label: string }[] = [
  { id: "home", icon: <Home size={22} />, label: "Home" },
  { id: "shops", icon: <Store size={22} />, label: "Shops" },
  { id: "cart", icon: <ShoppingCart size={22} />, label: "Cart" },
  { id: "offers", icon: <Tag size={22} />, label: "Offers" },
  { id: "profile", icon: <User size={22} />, label: "Profile" },
];

export function BottomNav({ active, onChange }: Props) {
  const { totalItems } = useCart();

  return (
    <div
      className="flex items-center justify-around px-2"
      style={{
        background: "#fff",
        borderTop: "1px solid #E5E7EB",
        height: 64,
        boxShadow: "0 -2px 12px rgba(0,0,0,0.06)",
      }}
    >
      {TABS.map((tab) => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className="flex flex-col items-center justify-center gap-0.5 relative transition-all"
            style={{ flex: 1, paddingTop: 8, paddingBottom: 8 }}
          >
            {/* Active pill background */}
            {isActive && (
              <div
                className="absolute top-1 left-1/2 -translate-x-1/2 rounded-full"
                style={{ width: 42, height: 32, background: "#E6F4F2" }}
              />
            )}
            {/* Cart badge */}
            {tab.id === "cart" && totalItems > 0 && (
              <div
                className="absolute flex items-center justify-center"
                style={{
                  top: 4,
                  right: "calc(50% - 18px)",
                  width: 18,
                  height: 18,
                  borderRadius: 9,
                  background: "#FF6B35",
                  zIndex: 10,
                }}
              >
                <span style={{ color: "#fff", fontSize: 10, fontWeight: 700, fontFamily: "'Inter', sans-serif" }}>
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              </div>
            )}
            <div className="relative z-10" style={{ color: isActive ? "#0A7C6E" : "#9CA3AF" }}>
              {tab.icon}
            </div>
            <span
              className="relative z-10"
              style={{
                fontSize: 10,
                fontFamily: "'Inter', sans-serif",
                fontWeight: isActive ? 600 : 400,
                color: isActive ? "#0A7C6E" : "#9CA3AF",
              }}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
