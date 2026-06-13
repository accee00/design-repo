import { useState } from "react";
import { ArrowLeft, Eye, EyeOff, Mail, Lock } from "lucide-react";

interface Props {
  onSignIn: () => void;
  onGoToSignUp: () => void;
  onBack: () => void;
}

export function SignIn({ onSignIn, onGoToSignUp, onBack }: Props) {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const inputField = (icon: React.ReactNode, placeholder: string, key: keyof typeof form, type = "text") => (
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]">{icon}</div>
      <input
        type={key === "password" ? (show ? "text" : "password") : type}
        placeholder={placeholder}
        value={form[key]}
        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
        className="w-full pl-11 pr-11 py-3.5 rounded-xl outline-none transition-all"
        style={{ background: "#F7F8FA", border: "1.5px solid #E5E7EB", fontFamily: "'Inter', sans-serif", fontSize: 15, color: "#111827" }}
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
      <div className="px-5 pt-12 pb-8" style={{ background: "linear-gradient(135deg, #0A7C6E, #064E3B)" }}>
        <button onClick={onBack} className="mb-5 w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.15)" }}>
          <ArrowLeft size={20} color="white" />
        </button>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.15)" }}>
            <span className="text-2xl">🛍️</span>
          </div>
          <span className="text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 20, fontWeight: 700 }}>LocalMart</span>
        </div>
        <h1 className="text-white mt-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 26, fontWeight: 700 }}>Welcome back! 👋</h1>
        <p style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'Inter', sans-serif", fontSize: 14, marginTop: 4 }}>Sign in to continue shopping</p>
      </div>

      <div className="flex-1 px-5 py-6 space-y-4">
        {inputField(<Mail size={18} />, "Email address", "email", "email")}
        {inputField(<Lock size={18} />, "Password", "password")}

        <div className="flex justify-end">
          <button style={{ color: "#0A7C6E", fontSize: 14, fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>Forgot password?</button>
        </div>

        <button
          onClick={onSignIn}
          className="w-full py-4 rounded-xl text-white transition-all active:scale-95"
          style={{ background: "#0A7C6E", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 16 }}
        >
          Sign In
        </button>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px" style={{ background: "#E5E7EB" }} />
          <span style={{ fontSize: 13, color: "#9CA3AF", fontFamily: "'Inter', sans-serif" }}>or</span>
          <div className="flex-1 h-px" style={{ background: "#E5E7EB" }} />
        </div>

        <button className="w-full py-3.5 rounded-xl flex items-center justify-center gap-3" style={{ border: "1.5px solid #E5E7EB", background: "#fff", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 15, color: "#111827" }}>
          <span className="text-xl">G</span> Continue with Google
        </button>

        <p className="text-center" style={{ fontSize: 14, color: "#4B5563", fontFamily: "'Inter', sans-serif" }}>
          Don't have an account?{" "}
          <button onClick={onGoToSignUp} style={{ color: "#0A7C6E", fontWeight: 600 }}>Sign up</button>
        </p>
      </div>
    </div>
  );
}
