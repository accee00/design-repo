import { useState } from "react";
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag, ChevronDown, ChevronUp, AlertCircle, CheckCircle2 } from "lucide-react";
import { useCart } from "./CartContext";

interface Props {
  onBack: () => void;
  onGoToShop: (shopId: string) => void;
}

export function CartScreen({ onBack, onGoToShop }: Props) {
  const { items, updateQty, removeItem, clearCart, totalPrice, getShopGroups } = useCart();
  const [collapsedShops, setCollapsedShops] = useState<Record<string, boolean>>({});
  const [ordered, setOrdered] = useState(false);

  const shopGroups = getShopGroups();
  const shopIds = Object.keys(shopGroups);
  const deliveryFee = shopIds.length > 1 ? shopIds.length * 15 : 20;
  const platformFee = 5;
  const grandTotal = totalPrice + deliveryFee + platformFee;

  const toggleCollapse = (shopId: string) => {
    setCollapsedShops((prev) => ({ ...prev, [shopId]: !prev[shopId] }));
  };

  if (ordered) {
    return (
      <div className="flex flex-col h-full items-center justify-center px-8" style={{ background: "#F7F8FA" }}>
        <div className="w-20 h-20 rounded-full flex items-center justify-center mb-5" style={{ background: "#D1FAE5" }}>
          <CheckCircle2 size={40} style={{ color: "#0A7C6E" }} />
        </div>
        <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 22, color: "#111827", textAlign: "center" }}>Order Placed! 🎉</h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#4B5563", textAlign: "center", marginTop: 8 }}>
          Your order from {shopIds.length} shop{shopIds.length > 1 ? "s" : ""} is confirmed. Expected delivery: ~20 min.
        </p>
        <button
          onClick={() => { setOrdered(false); clearCart(); onBack(); }}
          className="mt-8 w-full py-4 rounded-xl text-white"
          style={{ background: "#0A7C6E", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 16 }}
        >
          Back to Home
        </button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col h-full" style={{ background: "#F7F8FA" }}>
        <div className="px-5 pt-12 pb-4 flex items-center gap-3" style={{ background: "#fff" }}>
          <button onClick={onBack} className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#F7F8FA" }}>
            <ArrowLeft size={20} style={{ color: "#111827" }} />
          </button>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 20, color: "#111827" }}>Your Cart</h1>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-8">
          <ShoppingBag size={64} style={{ color: "#D1D5DB" }} />
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 18, color: "#111827", marginTop: 16 }}>Your cart is empty</p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#9CA3AF", textAlign: "center", marginTop: 8 }}>Add items from nearby shops to get started</p>
          <button onClick={onBack} className="mt-6 px-8 py-3 rounded-xl text-white" style={{ background: "#0A7C6E", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 15 }}>
            Browse Shops
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full" style={{ background: "#F7F8FA" }}>
      {/* Header */}
      <div className="px-5 pt-12 pb-4 flex items-center justify-between" style={{ background: "#fff", borderBottom: "1px solid #E5E7EB" }}>
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#F7F8FA" }}>
            <ArrowLeft size={20} style={{ color: "#111827" }} />
          </button>
          <div>
            <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 20, color: "#111827" }}>Your Cart</h1>
            <p style={{ fontSize: 12, color: "#9CA3AF", fontFamily: "'Inter', sans-serif" }}>{shopIds.length} shop{shopIds.length > 1 ? "s" : ""} · {items.reduce((s, i) => s + i.quantity, 0)} items</p>
          </div>
        </div>
        <button onClick={clearCart} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg" style={{ background: "#FEE2E2" }}>
          <Trash2 size={14} style={{ color: "#EF4444" }} />
          <span style={{ fontSize: 12, color: "#EF4444", fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>Clear</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pb-4">
        {/* Multi-shop notice */}
        {shopIds.length > 1 && (
          <div className="mx-5 mt-4 p-3 rounded-xl flex items-start gap-2.5" style={{ background: "#FEF3C7", border: "1px solid #F59E0B" }}>
            <AlertCircle size={16} style={{ color: "#92400E", marginTop: 1, flexShrink: 0 }} />
            <div>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 13, color: "#92400E" }}>Items from {shopIds.length} shops</p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#92400E", marginTop: 2 }}>
                Multiple delivery orders will be placed. Each shop will deliver separately.
              </p>
            </div>
          </div>
        )}

        {/* Shop groups */}
        {shopIds.map((shopId) => {
          const shopItems = shopGroups[shopId];
          const first = shopItems[0];
          const shopTotal = shopItems.reduce((s, i) => s + i.price * i.quantity, 0);
          const collapsed = collapsedShops[shopId];

          return (
            <div key={shopId} className="mx-5 mt-4 rounded-2xl overflow-hidden" style={{ background: "#fff", border: "1px solid #E5E7EB" }}>
              {/* Shop header */}
              <div className="flex items-center justify-between px-4 py-3" style={{ background: "linear-gradient(135deg, #0A7C6E, #064E3B)" }}>
                <div className="flex items-center gap-2">
                  <span className="text-xl">{first.shopEmoji}</span>
                  <div>
                    <p className="text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 14 }}>{first.shopName}</p>
                    <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontFamily: "'Inter', sans-serif" }}>{shopItems.length} item{shopItems.length > 1 ? "s" : ""} · ₹{shopTotal}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onGoToShop(shopId)}
                    className="px-2.5 py-1 rounded-full"
                    style={{ background: "rgba(255,255,255,0.2)", color: "white", fontSize: 11, fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
                  >
                    + Add more
                  </button>
                  <button onClick={() => toggleCollapse(shopId)} className="text-white">
                    {collapsed ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
                  </button>
                </div>
              </div>

              {/* Items */}
              {!collapsed && (
                <div className="divide-y" style={{ borderColor: "#F3F4F6" }}>
                  {shopItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 px-4 py-3">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#F7F8FA" }}>
                        <span style={{ fontSize: 28 }}>{item.image}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 14, color: "#111827" }}>{item.productName}</p>
                        <p style={{ fontSize: 12, color: "#9CA3AF", fontFamily: "'Inter', sans-serif" }}>{item.unit} · ₹{item.price} each</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <div className="flex items-center rounded-lg overflow-hidden" style={{ border: "1.5px solid #E5E7EB" }}>
                          <button onClick={() => updateQty(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center" style={{ background: item.quantity === 1 ? "#FEE2E2" : "#F7F8FA" }}>
                            {item.quantity === 1 ? <Trash2 size={13} style={{ color: "#EF4444" }} /> : <Minus size={13} style={{ color: "#4B5563" }} />}
                          </button>
                          <span style={{ width: 28, textAlign: "center", fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 14, color: "#111827" }}>{item.quantity}</span>
                          <button onClick={() => updateQty(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center" style={{ background: "#F7F8FA" }}>
                            <Plus size={13} style={{ color: "#0A7C6E" }} />
                          </button>
                        </div>
                        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 14, color: "#111827", minWidth: 48, textAlign: "right" }}>₹{item.price * item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Delivery type note */}
        <div className="mx-5 mt-3 p-3 rounded-xl flex items-center gap-2" style={{ background: "#E6F4F2" }}>
          <span className="text-lg">⚡</span>
          <p style={{ fontSize: 13, color: "#0A7C6E", fontFamily: "'Inter', sans-serif', fontWeight: 500" }}>
            Estimated delivery: <strong>15–25 min</strong> per shop
          </p>
        </div>

        {/* Bill summary */}
        <div className="mx-5 mt-4 rounded-2xl p-4" style={{ background: "#fff", border: "1px solid #E5E7EB" }}>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 16, color: "#111827", marginBottom: 12 }}>Bill Summary</p>
          {[
            { label: "Item total", value: `₹${totalPrice}` },
            { label: `Delivery fee (${shopIds.length} shop${shopIds.length > 1 ? "s" : ""})`, value: `₹${deliveryFee}` },
            { label: "Platform fee", value: `₹${platformFee}` },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between mb-2.5">
              <span style={{ fontSize: 14, color: "#4B5563", fontFamily: "'Inter', sans-serif" }}>{label}</span>
              <span style={{ fontSize: 14, color: "#111827", fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>{value}</span>
            </div>
          ))}
          <div className="pt-3" style={{ borderTop: "1px solid #E5E7EB" }}>
            <div className="flex justify-between">
              <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 16, color: "#111827" }}>Grand Total</span>
              <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 16, color: "#0A7C6E" }}>₹{grandTotal}</span>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="mx-5 mt-3 rounded-2xl p-4 flex items-start gap-3" style={{ background: "#fff", border: "1px solid #E5E7EB" }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#E6F4F2" }}>
            <span style={{ fontSize: 16 }}>📍</span>
          </div>
          <div>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 14, color: "#111827" }}>Delivering to</p>
            <p style={{ fontSize: 13, color: "#4B5563", fontFamily: "'Inter', sans-serif", marginTop: 2 }}>42, 3rd Cross, Koramangala 5th Block, Bengaluru 560095</p>
          </div>
        </div>
      </div>

      {/* Place order */}
      <div className="px-5 py-4" style={{ background: "#fff", borderTop: "1px solid #E5E7EB" }}>
        <button
          onClick={() => setOrdered(true)}
          className="w-full py-4 rounded-xl text-white flex items-center justify-between px-6 transition-all active:scale-95"
          style={{ background: "#FF6B35", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 16 }}
        >
          <span>Place Order</span>
          <span>₹{grandTotal}</span>
        </button>
      </div>
    </div>
  );
}
