import { useState } from "react";
import { ArrowLeft, Eye, EyeOff, User, Mail, Phone, Lock } from "lucide-react";

interface Props {
  onSignUp: () => void;
  onGoToSignIn: () => void;
  onBack: () => void;
}

export function SignUp({ onSignUp, onGoToSignIn, onBack }: Props) {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });

  const input = (icon: React.ReactNode, placeholder: string, key: keyof typeof form, type = "text") => (
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]">{icon}</div>
      <input
        type={key === "password" ? (show ? "text" : "password") : type}
        placeholder={placeholder}
        value={form[key]}
        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
        className="w-full pl-11 pr-4 py-3.5 rounded-xl outline-none transition-all"
        style={{
          background: "#F7F8FA",
          border: "1.5px solid #E5E7EB",
          fontFamily: "'Inter', sans-serif",
          fontSize: 15,
          color: "#111827",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#0A7C6E")}
        onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
      />
      {key === "password" && (
        <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]" onClick={() => setShow(!show)}>
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
    </div>
  );

  return (
    <div className="flex flex-col h-full" style={{ background: "#F7F8FA" }}>
      {/* Header */}
      <div className="px-5 pt-12 pb-6" style={{ background: "linear-gradient(135deg, #0A7C6E, #064E3B)" }}>
        <button onClick={onBack} className="mb-4 w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.15)" }}>
          <ArrowLeft size={20} color="white" />
        </button>
        <h1 className="text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 26, fontWeight: 700 }}>Create Account</h1>
        <p style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'Inter', sans-serif", fontSize: 14, marginTop: 4 }}>Join LocalMart and shop local</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-4">
        {input(<User size={18} />, "Full name", "name")}
        {input(<Mail size={18} />, "Email address", "email", "email")}
        {input(<Phone size={18} />, "Phone number", "phone", "tel")}
        {input(<Lock size={18} />, "Password", "password")}

        {/* Password strength hint */}
        <div className="flex gap-1.5">
          {["bg-red-400", "bg-orange-400", "bg-[#0A7C6E]"].map((c, i) => (
            <div key={i} className={`h-1 flex-1 rounded-full ${form.password.length > i * 3 ? c : "bg-gray-200"} transition-all`} />
          ))}
        </div>
        <p style={{ fontSize: 12, color: "#9CA3AF", fontFamily: "'Inter', sans-serif" }}>Use 8+ characters with letters and numbers</p>

        <button
          onClick={onSignUp}
          className="w-full py-4 rounded-xl text-white transition-all active:scale-95"
          style={{ background: "#0A7C6E", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 16 }}
        >
          Create Account
        </button>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px" style={{ background: "#E5E7EB" }} />
          <span style={{ fontSize: 13, color: "#9CA3AF", fontFamily: "'Inter', sans-serif" }}>or</span>
          <div className="flex-1 h-px" style={{ background: "#E5E7EB" }} />
        </div>

        <button className="w-full py-3.5 rounded-xl flex items-center justify-center gap-3 transition-all" style={{ border: "1.5px solid #E5E7EB", background: "#fff", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 15, color: "#111827" }}>
          <span className="text-xl">G</span> Continue with Google
        </button>

        <p className="text-center" style={{ fontSize: 14, color: "#4B5563", fontFamily: "'Inter', sans-serif" }}>
          Already have an account?{" "}
          <button onClick={onGoToSignIn} style={{ color: "#0A7C6E", fontWeight: 600 }}>Sign in</button>
        </p>
      </div>
    </div>
  );
}
