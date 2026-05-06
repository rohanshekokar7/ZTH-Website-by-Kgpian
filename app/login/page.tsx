"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/");
  };

  const SocialButtons = () => (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <motion.button type="button" whileHover={{ opacity: 0.9 }} whileTap={{ scale: 0.98 }} style={{ padding: "0.65rem", borderRadius: "100px", border: "none", background: "#1877F2", color: "white", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", cursor: "pointer", width: "100%" }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07z"/></svg>
        <span style={{ fontSize: "0.95rem", fontWeight: 600 }}>Continue with Facebook</span>
      </motion.button>
      <motion.button type="button" whileHover={{ backgroundColor: "#F5F7FA" }} whileTap={{ scale: 0.98 }} style={{ padding: "0.65rem", borderRadius: "100px", border: "1px solid #d1d5db", background: "#ffffff", color: "#333333", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", cursor: "pointer", width: "100%" }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
        <span style={{ fontSize: "0.95rem", fontWeight: 600 }}>Continue with Google</span>
      </motion.button>
    </div>
  );

  return (
    <>
      <div className="desktop-view" style={{ 
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", backgroundColor: "#ffffff", 
        fontFamily: "'Inter', sans-serif", padding: "2rem"
      }}>
        <motion.div layout initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} style={{ marginBottom: "1.25rem" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <div style={{
              width: "56px", height: "56px", borderRadius: "50%", backgroundColor: "#1976D2",
              display: "flex", alignItems: "center", justifyContent: "center", color: "white", boxShadow: "0 10px 30px rgba(25,118,210,0.3)"
            }}>
              <span style={{ fontSize: "2rem", fontWeight: 900, lineHeight: 1, letterSpacing: "-1.5px", position: "relative", left: "-4px" }}>
                Z<span style={{ fontSize: "0.9rem", position: "absolute", top: "3px", right: "-16px", fontWeight: 800 }}>th</span>
              </span>
            </div>
          </Link>
        </motion.div>

        <motion.div layout initial={{ opacity: 0, y: 30, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          style={{
            display: "flex", flexDirection: isLogin ? "row" : "row-reverse", width: "100%", maxWidth: "850px", height: "580px",
            backgroundColor: "#ffffff", borderRadius: "1.25rem", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.06)", border: "2px solid #e0ebf5", position: "relative"
          }}
        >
          <motion.div layout transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }} 
            style={{
              flex: "1", backgroundColor: "#f2f8fc", padding: "2.5rem 3.5rem", display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", position: "relative"
            }}
          >
            <AnimatePresence mode="wait">
              {isLogin ? (
                <motion.div key="login-form-desktop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: "easeOut" }} style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#1c1c1c", marginBottom: "1.25rem", textAlign: "center" }}>Login</h1>
                  <form onSubmit={handleSubmit} style={{ width: "100%", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                    <input type="email" placeholder="Email" required style={{ width: "100%", padding: "0.6rem 1rem", borderRadius: "0.5rem", border: "1px solid #d1d5db", outline: "none", fontSize: "0.95rem", fontFamily: "'Inter', sans-serif" }} />
                    <input type="password" placeholder="Password" required style={{ width: "100%", padding: "0.6rem 1rem", borderRadius: "0.5rem", border: "1px solid #d1d5db", outline: "none", fontSize: "0.95rem", fontFamily: "'Inter', sans-serif" }} />
                    <div style={{ textAlign: "center", marginTop: "0.5rem" }}><a href="#" style={{ fontSize: "0.85rem", color: "#4b5563", textDecoration: "none", fontWeight: 500 }}>Forgot password?</a></div>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" style={{ width: "100%", padding: "0.6rem", borderRadius: "0.5rem", marginTop: "0.5rem", background: "#1c1c1c", color: "white", fontSize: "1rem", fontWeight: 700, border: "none", cursor: "pointer" }}>Login</motion.button>
                  </form>
                  <div style={{ display: "flex", alignItems: "center", width: "100%", margin: "1.25rem 0" }}>
                    <div style={{ flex: 1, height: "1px", backgroundColor: "#d1d5db" }} />
                    <span style={{ padding: "0 0.75rem", fontSize: "0.85rem", color: "#555555", fontWeight: 600 }}>Or</span>
                    <div style={{ flex: 1, height: "1px", backgroundColor: "#d1d5db" }} />
                  </div>
                  <SocialButtons />
                </motion.div>
              ) : (
                <motion.div key="signup-form-desktop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: "easeOut" }} style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#1c1c1c", marginBottom: "1.25rem", textAlign: "center" }}>Create Account</h1>
                  <form onSubmit={handleSubmit} style={{ width: "100%", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                    <input type="email" placeholder="Email" required style={{ width: "100%", padding: "0.6rem 1rem", borderRadius: "0.5rem", border: "1px solid #d1d5db", outline: "none", fontSize: "0.95rem", fontFamily: "'Inter', sans-serif" }} />
                    <input type="tel" placeholder="Mobile number" required style={{ width: "100%", padding: "0.6rem 1rem", borderRadius: "0.5rem", border: "1px solid #d1d5db", outline: "none", fontSize: "0.95rem", fontFamily: "'Inter', sans-serif" }} />
                    <input type="password" placeholder="Create password" required style={{ width: "100%", padding: "0.6rem 1rem", borderRadius: "0.5rem", border: "1px solid #d1d5db", outline: "none", fontSize: "0.95rem", fontFamily: "'Inter', sans-serif" }} />
                    <input type="password" placeholder="Confirm password" required style={{ width: "100%", padding: "0.6rem 1rem", borderRadius: "0.5rem", border: "1px solid #d1d5db", outline: "none", fontSize: "0.95rem", fontFamily: "'Inter', sans-serif" }} />
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" style={{ width: "100%", padding: "0.6rem", borderRadius: "0.5rem", marginTop: "1rem", background: "#1c1c1c", color: "white", fontSize: "1rem", fontWeight: 700, border: "none", cursor: "pointer" }}>Sign Up</motion.button>
                  </form>
                  <div style={{ display: "flex", alignItems: "center", width: "100%", margin: "1.25rem 0" }}>
                    <div style={{ flex: 1, height: "1px", backgroundColor: "#d1d5db" }} />
                    <span style={{ padding: "0 0.75rem", fontSize: "0.85rem", color: "#555555", fontWeight: 600 }}>Or</span>
                    <div style={{ flex: 1, height: "1px", backgroundColor: "#d1d5db" }} />
                  </div>
                  <SocialButtons />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          <motion.div layout transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }} 
            style={{ flex: "1", backgroundColor: "#ffffff", padding: "2.5rem 3.5rem", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
            <AnimatePresence mode="wait">
              {isLogin ? (
                <motion.div key="login-prompt-desktop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: "easeOut" }} style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#1c1c1c", marginBottom: "1rem", letterSpacing: "-0.02em" }}>Join the Institutional Network</h2>
                  <p style={{ color: "#4b5563", fontSize: "1rem", lineHeight: 1.6, marginBottom: "3rem", padding: "0 1rem" }}>Register to access elite investor networks, govern your strategic narrative, and engage with leading corporate executives globally.</p>
                  <motion.button onClick={() => setIsLogin(false)} whileHover={{ scale: 1.05, backgroundColor: "#F5F7FA" }} whileTap={{ scale: 0.95 }} style={{ padding: "0.65rem 2.5rem", borderRadius: "2rem", border: "2px solid #1c1c1c", background: "transparent", color: "#1c1c1c", fontSize: "1.05rem", fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}>Sign Up</motion.button>
                </motion.div>
              ) : (
                <motion.div key="signup-prompt-desktop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: "easeOut" }} style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <h2 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#1c1c1c", marginBottom: "1rem", letterSpacing: "-0.02em" }}>Existing Corporate Member?</h2>
                  <p style={{ color: "#4b5563", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "2.5rem", padding: "0 0.5rem" }}>Authenticate to access your active presentations, capital metrics, and interact with the institutional network.</p>
                  <motion.button onClick={() => setIsLogin(true)} whileHover={{ scale: 1.05, backgroundColor: "#F5F7FA" }} whileTap={{ scale: 0.95 }} style={{ padding: "0.65rem 2.5rem", borderRadius: "2rem", border: "2px solid #1c1c1c", background: "transparent", color: "#1c1c1c", fontSize: "1.05rem", fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}>Login</motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>

      <div className="mobile-view" style={{ 
        minHeight: "100vh", position: "relative", fontFamily: "'Inter', sans-serif", overflow: "hidden", backgroundColor: "#0f172a",
        backgroundImage: "url('https://images.pexels.com/photos/6340631/pexels-photo-6340631.jpeg?cs=srgb&dl=pexels-pavel-danilyuk-6340631.jpg&fm=jpg')",
        backgroundSize: "cover", backgroundPosition: "center",
      }}>
        <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(15, 23, 42, 0.45)" }} />
        
        <div style={{ position: "absolute", top: "10%", width: "100%", display: "flex", justifyContent: "center", zIndex: 10 }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <div style={{
              width: "68px", height: "68px", borderRadius: "50%", background: "linear-gradient(135deg, #1976D2, #90CAF9)",
              display: "flex", alignItems: "center", justifyContent: "center", color: "white", boxShadow: "0 10px 40px rgba(0,0,0,0.5)"
            }}>
              <span style={{ fontSize: "2.2rem", fontWeight: 900, lineHeight: 1, letterSpacing: "-1.5px", position: "relative", left: "-4px" }}>
                Z<span style={{ fontSize: "1rem", position: "absolute", top: "3px", right: "-18px", fontWeight: 800 }}>th</span>
              </span>
            </div>
          </Link>
        </div>

        <motion.div 
          initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ type: "spring", damping: 22, stiffness: 180, delay: 0.1 }}
          style={{
            position: "absolute", bottom: 0, width: "100%", padding: "clamp(1.5rem, 5vw, 2rem)", paddingTop: "clamp(2rem, 6vw, 2.5rem)",
            background: "rgba(255, 255, 255, 0.88)", backdropFilter: "blur(25px)", WebkitBackdropFilter: "blur(25px)",
            borderTopLeftRadius: "2rem", borderTopRightRadius: "2rem", boxShadow: "0 -10px 40px rgba(0,0,0,0.15)",
            display: "flex", flexDirection: "column", maxHeight: "85vh", overflowY: "auto"
          }}
        >
          <div style={{ display: "flex", background: "rgba(0,0,0,0.06)", borderRadius: "100px", padding: "0.3rem", marginBottom: "1.75rem" }}>
            <button onClick={() => setIsLogin(true)} style={{ flex: 1, padding: "0.6rem", borderRadius: "100px", background: isLogin ? "#ffffff" : "transparent", color: isLogin ? "#1A1A1A" : "#555555", border: "none", fontSize: "0.95rem", fontWeight: 700, pointerEvents: "auto", boxShadow: isLogin ? "0 2px 10px rgba(0,0,0,0.05)" : "none", transition: "all 0.3s ease", cursor: "pointer" }}>Login</button>
            <button onClick={() => setIsLogin(false)} style={{ flex: 1, padding: "0.6rem", borderRadius: "100px", background: !isLogin ? "#ffffff" : "transparent", color: !isLogin ? "#1A1A1A" : "#555555", border: "none", fontSize: "0.95rem", fontWeight: 700, pointerEvents: "auto", boxShadow: !isLogin ? "0 2px 10px rgba(0,0,0,0.05)" : "none", transition: "all 0.3s ease", cursor: "pointer" }}>Sign Up</button>
          </div>

          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#1A1A1A", marginBottom: "1.25rem", letterSpacing: "-0.02em" }}>
            {isLogin ? "Secure Authentication" : "Create Account"}
          </h1>

          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.form key="mobile-login" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.2 }} onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                <input type="email" placeholder="Email address" required style={{ width: "100%", padding: "1rem 1.25rem", borderRadius: "1rem", border: "1px solid rgba(0,0,0,0.08)", background: "rgba(255,255,255,0.8)", outline: "none", fontSize: "1rem", fontFamily: "'Inter', sans-serif" }} />
                <input type="password" placeholder="Password" required style={{ width: "100%", padding: "1rem 1.25rem", borderRadius: "1rem", border: "1px solid rgba(0,0,0,0.08)", background: "rgba(255,255,255,0.8)", outline: "none", fontSize: "1rem", fontFamily: "'Inter', sans-serif" }} />
                <div style={{ textAlign: "right" }}><a href="#" style={{ fontSize: "0.85rem", color: "#1976D2", textDecoration: "none", fontWeight: 600 }}>Forgot?</a></div>
                <button type="submit" style={{ width: "100%", padding: "1rem", borderRadius: "100px", marginTop: "0.5rem", background: "#1976D2", color: "white", fontSize: "1.05rem", fontWeight: 700, border: "none", boxShadow: "0 4px 15px rgba(25,118,210,0.3)", cursor: "pointer" }}>Authenticate</button>
              </motion.form>
            ) : (
              <motion.form key="mobile-signup" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2 }} onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                <input type="email" placeholder="Email address" required style={{ width: "100%", padding: "1rem 1.25rem", borderRadius: "1rem", border: "1px solid rgba(0,0,0,0.08)", background: "rgba(255,255,255,0.8)", outline: "none", fontSize: "1rem", fontFamily: "'Inter', sans-serif" }} />
                <input type="tel" placeholder="Mobile number" required style={{ width: "100%", padding: "1rem 1.25rem", borderRadius: "1rem", border: "1px solid rgba(0,0,0,0.08)", background: "rgba(255,255,255,0.8)", outline: "none", fontSize: "1rem", fontFamily: "'Inter', sans-serif" }} />
                <input type="password" placeholder="Create password" required style={{ width: "100%", padding: "1rem 1.25rem", borderRadius: "1rem", border: "1px solid rgba(0,0,0,0.08)", background: "rgba(255,255,255,0.8)", outline: "none", fontSize: "1rem", fontFamily: "'Inter', sans-serif" }} />
                <button type="submit" style={{ width: "100%", padding: "1rem", borderRadius: "100px", marginTop: "0.5rem", background: "#1976D2", color: "white", fontSize: "1.05rem", fontWeight: 700, border: "none", boxShadow: "0 4px 15px rgba(25,118,210,0.3)", cursor: "pointer" }}>Register</button>
              </motion.form>
            )}
          </AnimatePresence>

          <div style={{ display: "flex", alignItems: "center", margin: "1.5rem 0" }}>
            <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(0,0,0,0.08)" }} />
            <span style={{ padding: "0 0.75rem", fontSize: "0.85rem", color: "#555555", fontWeight: 600 }}>Or</span>
            <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(0,0,0,0.08)" }} />
          </div>

          <SocialButtons />
          
        </motion.div>
      </div>

      <style jsx>{`
        .mobile-view { display: none; }
        .desktop-view { display: flex; }
        
        @media (max-width: 768px) {
          .desktop-view { display: none !important; }
          .mobile-view { display: block !important; }
        }
      `}</style>
    </>
  );
}
