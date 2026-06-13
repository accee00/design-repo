import { useState } from "react";
import { ArrowLeft, Star, Clock, MapPin, Search, Plus, Minus, ShoppingCart } from "lucide-react";
import { useCart } from "./CartContext";
import { SHOPS } from "./HomeScreen";

const PRODUCTS_BY_SHOP: Record<string, { id: string; name: string; price: number; unit: string; image: string; category: string; inStock: boolean }[]> = {
  shop1: [
    { id: "p1", name: "Fresh Tomatoes", price: 40, unit: "500g", image: "🍅", category: "Vegetables", inStock: true },
    { id: "p2", name: "Organic Spinach", price: 35, unit: "250g", image: "🥬", category: "Vegetables", inStock: true },
    { id: "p3", name: "Carrots", price: 30, unit: "500g", image: "🥕", category: "Vegetables", inStock: true },
    { id: "p4", name: "Full Cream Milk", price: 68, unit: "1L", image: "🥛", category: "Dairy", inStock: true },
    { id: "p5", name: "Paneer", price: 120, unit: "200g", image: "🧀", category: "Dairy", inStock: false },
    { id: "p6", name: "Green Apples", price: 110, unit: "4 pcs", image: "🍏", category: "Fruits", inStock: true },
    { id: "p7", name: "Bananas", price: 45, unit: "6 pcs", image: "🍌", category: "Fruits", inStock: true },
    { id: "p8", name: "Amul Butter", price: 55, unit: "100g", image: "🧈", category: "Dairy", inStock: true },
  ],
  shop2: [
    { id: "p1", name: "Whole Wheat Bread", price: 45, unit: "1 loaf", image: "🍞", category: "Bread", inStock: true },
    { id: "p2", name: "Croissant", price: 35, unit: "2 pcs", image: "🥐", category: "Pastries", inStock: true },
    { id: "p3", name: "Chocolate Cake", price: 380, unit: "500g", image: "🎂", category: "Cakes", inStock: true },
    { id: "p4", name: "Muffins", price: 60, unit: "4 pcs", image: "🧁", category: "Pastries", inStock: true },
    { id: "p5", name: "Garlic Bread", price: 75, unit: "1 pack", image: "🥖", category: "Bread", inStock: true },
  ],
  shop3: [
    { id: "p1", name: "Dolo 650", price: 28, unit: "15 tabs", image: "💊", category: "Medicines", inStock: true },
    { id: "p2", name: "Vitamin C", price: 180, unit: "60 tabs", image: "🍊", category: "Supplements", inStock: true },
    { id: "p3", name: "Hand Sanitizer", price: 95, unit: "100ml", image: "🧴", category: "Healthcare", inStock: true },
    { id: "p4", name: "Bandages", price: 45, unit: "1 pack", image: "🩹", category: "Healthcare", inStock: false },
  ],
  shop4: [
    { id: "p1", name: "Cumin Seeds", price: 55, unit: "100g", image: "🌾", category: "Spices", inStock: true },
    { id: "p2", name: "Turmeric Powder", price: 40, unit: "100g", image: "🟡", category: "Masalas", inStock: true },
    { id: "p3", name: "Dry Red Chilli", price: 65, unit: "100g", image: "🌶️", category: "Spices", inStock: true },
    { id: "p4", name: "Mixed Dry Fruits", price: 280, unit: "250g", image: "🥜", category: "Dry Fruits", inStock: true },
  ],
  shop5: [
    { id: "p1", name: "Toned Milk", price: 55, unit: "1L", image: "🥛", category: "Milk", inStock: true },
    { id: "p2", name: "Dahi (Curd)", price: 45, unit: "400g", image: "🫙", category: "Dairy", inStock: true },
    { id: "p3", name: "Fresh Paneer", price: 140, unit: "200g", image: "🧀", category: "Dairy", inStock: true },
    { id: "p4", name: "Butter", price: 60, unit: "100g", image: "🧈", category: "Dairy", inStock: true },
  ],
  shop6: [
    { id: "p1", name: "Broccoli", price: 80, unit: "500g", image: "🥦", category: "Vegetables", inStock: true },
    { id: "p2", name: "Cherry Tomatoes", price: 90, unit: "250g", image: "🍅", category: "Vegetables", inStock: true },
    { id: "p3", name: "Kale Leaves", price: 70, unit: "200g", image: "🥬", category: "Organic", inStock: false },
    { id: "p4", name: "Bell Peppers", price: 75, unit: "3 pcs", image: "🫑", category: "Vegetables", inStock: true },
  ],
};

interface Props {
  shopId: string;
  onBack: () => void;
  onGoToCart: () => void;
}

export function ShopDetail({ shopId, onBack, onGoToCart }: Props) {
  const { addItem, items, updateQty, totalItems } = useCart();
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState<string | null>(null);

  const shop = SHOPS.find((s) => s.id === shopId) ?? SHOPS[0];
  const products = PRODUCTS_BY_SHOP[shopId] ?? PRODUCTS_BY_SHOP["shop1"];
  const categories = [...new Set(products.map((p) => p.category))];

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = !selectedCat || p.category === selectedCat;
    return matchSearch && matchCat;
  });

  const getCartQty = (productId: string) => {
    const item = items.find((i) => i.productId === productId && i.shopId === shopId);
    return item?.quantity ?? 0;
  };

  const handleAdd = (p: typeof products[0]) => {
    addItem({ productId: p.id, productName: p.name, price: p.price, quantity: 1, image: p.image, unit: p.unit, shopId, shopName: shop.name, shopEmoji: shop.emoji });
  };

  const handleChange = (productId: string, delta: number) => {
    const item = items.find((i) => i.productId === productId && i.shopId === shopId);
    if (item) updateQty(item.id, item.quantity + delta);
  };

  const cartItemsFromThisShop = items.filter((i) => i.shopId === shopId).reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="flex flex-col h-full" style={{ background: "#F7F8FA" }}>
      {/* Header */}
      <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0A7C6E 0%, #064E3B 100%)" }}>
        <span className="absolute right-0 top-0 opacity-15 leading-none" style={{ fontSize: 120, transform: "rotate(-12deg) translate(20px, -20px)" }}>{shop.emoji}</span>
        <div className="relative px-5 pt-12 pb-5">
          <button onClick={onBack} className="mb-4 w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.15)" }}>
            <ArrowLeft size={20} color="white" />
          </button>
          <p className="text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 22 }}>{shop.name}</p>
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-1">
              <Star size={13} fill="white" color="white" />
              <span className="text-white" style={{ fontSize: 13, fontFamily: "'Inter', sans-serif" }}>{shop.rating}</span>
            </div>
            <span style={{ color: "rgba(255,255,255,0.5)" }}>·</span>
            <div className="flex items-center gap-1">
              <Clock size={13} color="rgba(255,255,255,0.8)" />
              <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, fontFamily: "'Inter', sans-serif" }}>{shop.time}</span>
            </div>
            <span style={{ color: "rgba(255,255,255,0.5)" }}>·</span>
            <div className="flex items-center gap-1">
              <MapPin size={13} color="rgba(255,255,255,0.8)" />
              <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, fontFamily: "'Inter', sans-serif" }}>{shop.distance}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {shop.tags.map((tag) => (
              <span key={tag} className="px-2.5 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.9)", fontSize: 11, fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
                {tag}
              </span>
            ))}
            <span className="px-2.5 py-1 rounded-full" style={{ background: "#D1FAE5", color: "#065F46", fontSize: 11, fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
              {shop.open ? "● Open Now" : "Closed"}
            </span>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="px-5 py-3" style={{ background: "#fff" }}>
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "#9CA3AF" }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl outline-none"
            style={{ background: "#F7F8FA", border: "1.5px solid #E5E7EB", fontFamily: "'Inter', sans-serif", fontSize: 14 }}
            onFocus={(e) => (e.target.style.borderColor = "#0A7C6E")}
            onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
          />
        </div>
        {/* Category filter */}
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          <button
            onClick={() => setSelectedCat(null)}
            className="px-3 py-1.5 rounded-full whitespace-nowrap transition-all"
            style={{ background: !selectedCat ? "#0A7C6E" : "#F7F8FA", color: !selectedCat ? "#fff" : "#4B5563", fontSize: 12, fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(selectedCat === cat ? null : cat)}
              className="px-3 py-1.5 rounded-full whitespace-nowrap transition-all"
              style={{ background: selectedCat === cat ? "#0A7C6E" : "#F7F8FA", color: selectedCat === cat ? "#fff" : "#4B5563", fontSize: 12, fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products */}
      <div className="flex-1 overflow-y-auto px-5 py-3 pb-28">
        <div className="grid grid-cols-2 gap-3">
          {filtered.map((product) => {
            const qty = getCartQty(product.id);
            return (
              <div key={product.id} className="rounded-2xl overflow-hidden" style={{ background: "#fff", border: "1px solid #E5E7EB" }}>
                {/* Product image */}
                <div className="flex items-center justify-center" style={{ height: 90, background: "#F7F8FA" }}>
                  <span style={{ fontSize: 48 }}>{product.image}</span>
                </div>
                <div className="p-3">
                  <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 13, color: "#111827", lineHeight: 1.3 }}>{product.name}</p>
                  <p style={{ fontSize: 12, color: "#9CA3AF", fontFamily: "'Inter', sans-serif", marginTop: 2 }}>{product.unit}</p>
                  <div className="flex items-center justify-between mt-2">
                    <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 15, color: "#111827" }}>₹{product.price}</p>
                    {!product.inStock ? (
                      <span style={{ fontSize: 11, color: "#EF4444", fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>Out of stock</span>
                    ) : qty === 0 ? (
                      <button
                        onClick={() => handleAdd(product)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-all active:scale-90"
                        style={{ background: "#0A7C6E" }}
                      >
                        <Plus size={16} color="white" />
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 rounded-lg" style={{ background: "#0A7C6E" }}>
                        <button onClick={() => handleChange(product.id, -1)} className="w-7 h-7 flex items-center justify-center">
                          <Minus size={13} color="white" />
                        </button>
                        <span className="text-white" style={{ fontSize: 13, fontWeight: 600, fontFamily: "'Inter', sans-serif", minWidth: 12, textAlign: "center" }}>{qty}</span>
                        <button onClick={() => handleChange(product.id, 1)} className="w-7 h-7 flex items-center justify-center">
                          <Plus size={13} color="white" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cart bar */}
      {cartItemsFromThisShop > 0 && (
        <div className="absolute bottom-[72px] left-0 right-0 px-5 py-3">
          <button
            onClick={onGoToCart}
            className="w-full py-3.5 rounded-xl flex items-center justify-between px-5 transition-all active:scale-95 shadow-lg"
            style={{ background: "#FF6B35" }}
          >
            <span className="text-white" style={{ fontSize: 14, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}>
              {cartItemsFromThisShop} item{cartItemsFromThisShop > 1 ? "s" : ""} added
            </span>
            <div className="flex items-center gap-2">
              <span className="text-white" style={{ fontSize: 14, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}>View Cart</span>
              <ShoppingCart size={18} color="white" />
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
