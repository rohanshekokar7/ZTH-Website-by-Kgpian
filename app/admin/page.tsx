"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Eye, EyeOff, Lock, Mail, KeyRound } from "lucide-react";
import { signInAdmin } from "@/lib/auth";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secretCode, setSecretCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (!email.trim() || !password.trim() || !secretCode.trim()) {
      setError("All fields are required.");
      return;
    }
    setLoading(true);
    const result = await signInAdmin(email.trim(), password, secretCode.trim());
    setLoading(false);
    if (result.success) {
      router.push("/admin/dashboard");
    } else {
      setError(result.error || "Authentication failed.");
    }
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      background: "#0a0a0a",
      fontFamily: "'Inter', sans-serif",
      position: "relative", overflow: "hidden",
    }}>
      {/* Background grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)",
        backgroundSize: "40px 40px",
      }} />
      {/* Blue glow */}
      <div style={{
        position: "absolute", width: "600px", height: "600px",
        borderRadius: "50%", top: "-200px", left: "50%", transform: "translateX(-50%)",
        background: "radial-gradient(circle, rgba(25,118,210,0.12) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "relative", zIndex: 1,
          width: "100%", maxWidth: "420px",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "1.5rem",
          padding: "2.5rem",
          backdropFilter: "blur(20px)",
          boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <div style={{ height: "40px", overflow: "hidden", display: "flex", alignItems: "center" }}>
              <img src="/zth%20logo.png" alt="ZTH" style={{ height: "40px", width: "auto", objectFit: "contain" }} />
            </div>
          </Link>
        </div>

        {/* Heading */}
        <div style={{ marginBottom: "1.75rem", textAlign: "center" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: "48px", height: "48px", borderRadius: "50%",
            background: "rgba(25,118,210,0.15)", marginBottom: "1rem",
          }}>
            <Lock size={22} color="#1976D2" />
          </div>
          <h1 style={{ margin: 0, fontSize: "1.5rem", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.02em" }}>
            Admin Access
          </h1>
          <p style={{ margin: "0.4rem 0 0", fontSize: "0.85rem", color: "rgba(255,255,255,0.45)" }}>
            Enter your credentials to continue
          </p>
        </div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              style={{
                display: "flex", alignItems: "center", gap: "0.5rem",
                background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.3)",
                borderRadius: "0.6rem", padding: "0.65rem 1rem",
                marginBottom: "1.25rem", color: "#f87171", fontSize: "0.82rem",
              }}
            >
              <AlertCircle size={14} />
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>

          {/* Email */}
          <div style={{ position: "relative" }}>
            <Mail size={15} style={{ position: "absolute", left: "0.9rem", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.3)", zIndex: 1 }} />
            <input
              type="email" placeholder="Admin Email" required
              value={email} onChange={(e) => { setEmail(e.target.value); setError(null); }}
              style={{
                width: "100%", padding: "0.75rem 1rem 0.75rem 2.5rem",
                borderRadius: "0.65rem",
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.05)",
                color: "#ffffff", outline: "none",
                fontSize: "0.9rem", fontFamily: "'Inter', sans-serif",
                boxSizing: "border-box",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = "rgba(25,118,210,0.6)"}
              onBlur={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"}
            />
          </div>

          {/* Password */}
          <div style={{ position: "relative" }}>
            <Lock size={15} style={{ position: "absolute", left: "0.9rem", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.3)" }} />
            <input
              type={showPassword ? "text" : "password"} placeholder="Password" required
              value={password} onChange={(e) => { setPassword(e.target.value); setError(null); }}
              style={{
                width: "100%", padding: "0.75rem 2.5rem",
                borderRadius: "0.65rem",
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.05)",
                color: "#ffffff", outline: "none",
                fontSize: "0.9rem", fontFamily: "'Inter', sans-serif",
                boxSizing: "border-box",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = "rgba(25,118,210,0.6)"}
              onBlur={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"}
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)}
              style={{ position: "absolute", right: "0.9rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.3)", padding: 0 }}>
              {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>

          {/* Secret Code */}
          <div style={{ position: "relative" }}>
            <KeyRound size={15} style={{ position: "absolute", left: "0.9rem", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.3)" }} />
            <input
              type={showSecret ? "text" : "password"} placeholder="Secret Access Code" required
              value={secretCode} onChange={(e) => { setSecretCode(e.target.value); setError(null); }}
              style={{
                width: "100%", padding: "0.75rem 2.5rem",
                borderRadius: "0.65rem",
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.05)",
                color: "#ffffff", outline: "none",
                fontSize: "0.9rem", fontFamily: "'Inter', sans-serif",
                boxSizing: "border-box",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = "rgba(25,118,210,0.6)"}
              onBlur={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"}
            />
            <button type="button" onClick={() => setShowSecret(!showSecret)}
              style={{ position: "absolute", right: "0.9rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.3)", padding: 0 }}>
              {showSecret ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>

          {/* Submit */}
          <motion.button
            whileHover={!loading ? { scale: 1.02 } : {}}
            whileTap={!loading ? { scale: 0.98 } : {}}
            type="submit"
            disabled={loading}
            style={{
              marginTop: "0.5rem",
              width: "100%", padding: "0.8rem",
              borderRadius: "0.65rem",
              border: "none",
              background: loading ? "rgba(25,118,210,0.4)" : "linear-gradient(135deg, #1976D2 0%, #1565C0 100%)",
              color: "#ffffff",
              fontSize: "0.95rem", fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: loading ? "none" : "0 4px 20px rgba(25,118,210,0.35)",
              transition: "all 0.2s",
              letterSpacing: "0.01em",
            }}
          >
            {loading ? "Authenticating..." : "Access Admin Panel"}
          </motion.button>
        </form>

        {/* Back link */}
        <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
          <Link href="/" style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.3)", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
          >
            ← Back to website
          </Link>
        </div>
      </motion.div>

      <style jsx>{`
        input::placeholder { color: rgba(255,255,255,0.2); }
        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 1000px #111 inset !important;
          -webkit-text-fill-color: #fff !important;
        }
      `}</style>
    </div>
  );
}
