"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut, Download, Send, Search, RefreshCw, X, CheckSquare,
  Square, Mail, FileText, ChevronDown, Users, Clock, TrendingUp,
  CheckCircle2, XCircle, AlertCircle,
} from "lucide-react";
import { supabase, type Booking, type BookingStatus } from "@/lib/supabase";
import { signOut } from "@/lib/auth";

// ── Status config ─────────────────────────────────────────────────────────────
const STATUS_CONFIG: Record<BookingStatus, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  new:       { label: "New",       color: "#1976D2", bg: "rgba(25,118,210,0.1)",  icon: <Clock size={12} />       },
  contacted: { label: "Contacted", color: "#f59e0b", bg: "rgba(245,158,11,0.1)", icon: <Mail size={12} />        },
  converted: { label: "Converted", color: "#10b981", bg: "rgba(16,185,129,0.1)", icon: <CheckCircle2 size={12} /> },
  closed:    { label: "Closed",    color: "#6b7280", bg: "rgba(107,114,128,0.1)", icon: <XCircle size={12} />    },
};

const ALL_STATUSES: BookingStatus[] = ["new", "contacted", "converted", "closed"];

export default function AdminDashboardPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filtered, setFiltered] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<BookingStatus | "all">("all");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailResult, setEmailResult] = useState<{ success: boolean; message: string } | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) console.error("Error fetching bookings:", error);
    else setBookings(data || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchBookings();
    const channel = supabase
      .channel("bookings-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "bookings" }, (payload) => {
        if (payload.eventType === "INSERT") setBookings((prev) => [payload.new as Booking, ...prev]);
        else if (payload.eventType === "UPDATE") setBookings((prev) => prev.map((b) => (b.id === (payload.new as Booking).id ? (payload.new as Booking) : b)));
        else if (payload.eventType === "DELETE") setBookings((prev) => prev.filter((b) => b.id !== (payload.old as Booking).id));
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [fetchBookings]);

  useEffect(() => {
    let result = [...bookings];
    if (statusFilter !== "all") result = result.filter((b) => b.status === statusFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((b) => b.name.toLowerCase().includes(q) || b.email.toLowerCase().includes(q) || b.company.toLowerCase().includes(q));
    }
    setFiltered(result);
  }, [bookings, search, statusFilter]);

  const toggleSelect = (id: string) => {
    setSelected((prev) => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next; });
  };
  const toggleSelectAll = () => {
    setSelected(selected.size === filtered.length ? new Set() : new Set(filtered.map((b) => b.id)));
  };

  const updateStatus = async (id: string, status: BookingStatus) => {
    setUpdatingStatus(id);
    const { error } = await supabase.from("bookings").update({ status }).eq("id", id);
    if (!error) setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
    setUpdatingStatus(null);
  };

  const handleSendEmail = async () => {
    if (!emailSubject.trim() || !emailBody.trim()) return;
    setSendingEmail(true);
    setEmailResult(null);
    const recipients = bookings.filter((b) => selected.has(b.id)).map((b) => b.email);
    try {
      const res = await fetch("/api/admin/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: recipients, subject: emailSubject, body: emailBody }),
      });
      const data = await res.json();
      setEmailResult({ success: res.ok, message: res.ok ? `Email sent to ${recipients.length} recipient(s)!` : data.error });
      if (res.ok) setTimeout(() => { setShowEmailModal(false); setEmailSubject(""); setEmailBody(""); setEmailResult(null); }, 2000);
    } catch {
      setEmailResult({ success: false, message: "Network error. Please try again." });
    }
    setSendingEmail(false);
  };

  const handleExport = (format: "csv" | "excel") => {
    const ids = selected.size > 0 ? Array.from(selected) : undefined;
    window.open(`/api/admin/export?format=${format}${ids ? `&ids=${ids.join(",")}` : ""}`, "_blank");
  };

  const handleSignOut = async () => { await signOut(); router.push("/admin"); };

  const stats = {
    total: bookings.length,
    new: bookings.filter((b) => b.status === "new").length,
    contacted: bookings.filter((b) => b.status === "contacted").length,
    converted: bookings.filter((b) => b.status === "converted").length,
  };

  const formatDate = (iso: string) => new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

  return (
    <div style={{ minHeight: "100vh", background: "#f4f7fb", fontFamily: "'Inter', sans-serif" }}>

      {/* ── Topbar ── */}
      <div style={{
        background: "#0a0a0a", padding: "0 2rem", height: "60px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 100,
        boxShadow: "0 2px 20px rgba(0,0,0,0.3)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {/* Fixed logo — constrained height and width, no overflow */}
          <div style={{ height: "36px", width: "80px", overflow: "hidden", display: "flex", alignItems: "center" }}>
            <img
              src="/zth%20logo.png"
              alt="ZTH"
              style={{ height: "36px", width: "auto", maxWidth: "80px", objectFit: "contain", display: "block" }}
            />
          </div>
          <div style={{ width: "1px", height: "24px", background: "rgba(255,255,255,0.12)" }} />
          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" }}>
            Admin Panel
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#10b981", animation: "pulse 2s infinite" }} />
            <span style={{ color: "#10b981", fontSize: "0.72rem", fontWeight: 600 }}>LIVE</span>
          </div>
        </div>
        <button onClick={handleSignOut} style={{
          display: "flex", alignItems: "center", gap: "0.4rem",
          background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
          color: "rgba(255,255,255,0.7)", padding: "0.4rem 0.9rem",
          borderRadius: "0.4rem", cursor: "pointer", fontSize: "0.82rem", fontWeight: 600,
          transition: "all 0.2s",
        }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
        >
          <LogOut size={14} /> Sign Out
        </button>
      </div>

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "2rem" }}>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginBottom: "1.75rem" }}>
          {[
            { label: "Total Leads", value: stats.total,     icon: <Users size={20} />,     color: "#1976D2" },
            { label: "New",         value: stats.new,        icon: <Clock size={20} />,      color: "#1976D2" },
            { label: "Contacted",   value: stats.contacted,  icon: <Mail size={20} />,       color: "#f59e0b" },
            { label: "Converted",   value: stats.converted,  icon: <TrendingUp size={20} />, color: "#10b981" },
          ].map((s) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              style={{ background: "#fff", borderRadius: "1rem", padding: "1.25rem 1.5rem", boxShadow: "0 2px 12px rgba(0,0,0,0.05)", border: "1px solid #e5e7eb" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <p style={{ margin: 0, fontSize: "0.78rem", color: "#888", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</p>
                  <p style={{ margin: "0.4rem 0 0", fontSize: "2rem", fontWeight: 800, color: "#1A1A1A", lineHeight: 1 }}>{s.value}</p>
                </div>
                <div style={{ color: s.color, background: `${s.color}15`, padding: "0.6rem", borderRadius: "0.6rem" }}>{s.icon}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Toolbar */}
        <div style={{ background: "#fff", borderRadius: "1rem", padding: "1rem 1.5rem", boxShadow: "0 2px 12px rgba(0,0,0,0.05)", border: "1px solid #e5e7eb", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
          <div style={{ position: "relative", flex: "1", minWidth: "200px" }}>
            <Search size={15} style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", color: "#888" }} />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, email, company..."
              style={{ width: "100%", padding: "0.6rem 1rem 0.6rem 2.4rem", borderRadius: "0.5rem", border: "1px solid #e5e7eb", outline: "none", fontSize: "0.9rem", fontFamily: "'Inter', sans-serif", boxSizing: "border-box" }} />
            {search && <button onClick={() => setSearch("")} style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#888", padding: 0 }}><X size={14} /></button>}
          </div>
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
            {(["all", ...ALL_STATUSES] as const).map((s) => (
              <button key={s} onClick={() => setStatusFilter(s)}
                style={{ padding: "0.45rem 0.9rem", borderRadius: "100px", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer", border: "1.5px solid", borderColor: statusFilter === s ? "#1976D2" : "#e5e7eb", background: statusFilter === s ? "#1976D2" : "transparent", color: statusFilter === s ? "#fff" : "#555", transition: "all 0.2s" }}>
                {s === "all" ? "All" : STATUS_CONFIG[s].label}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: "0.5rem", marginLeft: "auto" }}>
            <button onClick={fetchBookings} title="Refresh" style={{ padding: "0.5rem", borderRadius: "0.5rem", border: "1px solid #e5e7eb", background: "transparent", cursor: "pointer", color: "#555", display: "flex", alignItems: "center" }}><RefreshCw size={15} /></button>
            {selected.size > 0 && (
              <>
                <button onClick={() => setShowEmailModal(true)} style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.5rem 1rem", borderRadius: "0.5rem", background: "#1976D2", border: "none", color: "#fff", fontSize: "0.82rem", fontWeight: 700, cursor: "pointer" }}>
                  <Send size={13} /> Email ({selected.size})
                </button>
                <button onClick={() => handleExport("csv")} style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.5rem 1rem", borderRadius: "0.5rem", background: "#10b981", border: "none", color: "#fff", fontSize: "0.82rem", fontWeight: 700, cursor: "pointer" }}>
                  <Download size={13} /> CSV
                </button>
              </>
            )}
            <button onClick={() => handleExport("excel")} style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.5rem 1rem", borderRadius: "0.5rem", background: "#f0f7ff", border: "1px solid #1976D2", color: "#1976D2", fontSize: "0.82rem", fontWeight: 700, cursor: "pointer" }}>
              <FileText size={13} /> Export All
            </button>
          </div>
        </div>

        {/* Table */}
        <div style={{ background: "#fff", borderRadius: "1rem", boxShadow: "0 2px 12px rgba(0,0,0,0.05)", border: "1px solid #e5e7eb", overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "48px 1fr 1fr 1fr 160px 140px 40px", padding: "0.75rem 1.25rem", borderBottom: "1px solid #f0f0f0", background: "#f8fafc" }}>
            <div onClick={toggleSelectAll} style={{ cursor: "pointer", color: "#888", display: "flex", alignItems: "center" }}>
              {selected.size === filtered.length && filtered.length > 0 ? <CheckSquare size={16} color="#1976D2" /> : <Square size={16} />}
            </div>
            {["Name / Company", "Email", "Services", "Status", "Date"].map((h) => (
              <div key={h} style={{ fontSize: "0.75rem", fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: "0.08em" }}>{h}</div>
            ))}
            <div />
          </div>

          {loading ? (
            <div style={{ padding: "4rem", textAlign: "center", color: "#888" }}>
              <RefreshCw size={24} style={{ animation: "spin 1s linear infinite", display: "inline-block", marginBottom: "0.75rem" }} />
              <p style={{ margin: 0 }}>Loading bookings...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: "4rem", textAlign: "center", color: "#aaa" }}>
              <Users size={36} style={{ marginBottom: "0.75rem", opacity: 0.4 }} />
              <p style={{ margin: 0, fontWeight: 600 }}>No bookings found</p>
              <p style={{ margin: "0.4rem 0 0", fontSize: "0.85rem" }}>{search || statusFilter !== "all" ? "Try adjusting your filters" : "New bookings will appear here automatically"}</p>
            </div>
          ) : (
            <AnimatePresence>
              {filtered.map((booking, idx) => (
                <motion.div key={booking.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.03 }} style={{ borderBottom: "1px solid #f5f5f5" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "48px 1fr 1fr 1fr 160px 140px 40px", padding: "0.9rem 1.25rem", alignItems: "center", background: selected.has(booking.id) ? "rgba(25,118,210,0.03)" : "#fff", transition: "background 0.15s", cursor: "pointer" }}
                    onMouseEnter={(e) => { if (!selected.has(booking.id)) e.currentTarget.style.background = "#fafafa"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = selected.has(booking.id) ? "rgba(25,118,210,0.03)" : "#fff"; }}>
                    <div onClick={() => toggleSelect(booking.id)} style={{ cursor: "pointer", color: "#888", display: "flex", alignItems: "center" }}>
                      {selected.has(booking.id) ? <CheckSquare size={16} color="#1976D2" /> : <Square size={16} />}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#1A1A1A" }}>{booking.name}</div>
                      <div style={{ fontSize: "0.78rem", color: "#888" }}>{booking.company}</div>
                    </div>
                    <div style={{ fontSize: "0.85rem", color: "#555" }}>
                      <a href={`mailto:${booking.email}`} style={{ color: "#1976D2", textDecoration: "none" }}>{booking.email}</a>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                      {booking.services.map((s) => (
                        <span key={s} style={{ fontSize: "0.7rem", padding: "0.2rem 0.5rem", background: "rgba(25,118,210,0.07)", color: "#1976D2", borderRadius: "100px", fontWeight: 600, whiteSpace: "nowrap" }}>{s}</span>
                      ))}
                    </div>
                    <div style={{ position: "relative" }}>
                      <select value={booking.status} onChange={(e) => updateStatus(booking.id, e.target.value as BookingStatus)} disabled={updatingStatus === booking.id} onClick={(e) => e.stopPropagation()}
                        style={{ appearance: "none", padding: "0.3rem 1.6rem 0.3rem 0.6rem", borderRadius: "100px", border: "none", background: STATUS_CONFIG[booking.status].bg, color: STATUS_CONFIG[booking.status].color, fontWeight: 700, fontSize: "0.75rem", cursor: "pointer", outline: "none", fontFamily: "'Inter', sans-serif" }}>
                        {ALL_STATUSES.map((s) => <option key={s} value={s}>{STATUS_CONFIG[s].label}</option>)}
                      </select>
                      <ChevronDown size={11} style={{ position: "absolute", right: "0.5rem", top: "50%", transform: "translateY(-50%)", color: STATUS_CONFIG[booking.status].color, pointerEvents: "none" }} />
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "#aaa" }}>{formatDate(booking.created_at)}</div>
                    <button onClick={() => setExpandedRow(expandedRow === booking.id ? null : booking.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#888", padding: 0, display: "flex", alignItems: "center" }}>
                      <ChevronDown size={16} style={{ transform: expandedRow === booking.id ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
                    </button>
                  </div>
                  <AnimatePresence>
                    {expandedRow === booking.id && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} style={{ overflow: "hidden" }}>
                        <div style={{ padding: "0.75rem 1.25rem 1rem calc(48px + 1.25rem)", background: "#f8fafc", borderTop: "1px solid #f0f0f0" }}>
                          <p style={{ margin: "0 0 0.4rem", fontSize: "0.75rem", fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: "0.05em" }}>Project Information</p>
                          <p style={{ margin: 0, fontSize: "0.88rem", color: "#555", lineHeight: 1.7 }}>{booking.message}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          )}

          {filtered.length > 0 && (
            <div style={{ padding: "0.75rem 1.25rem", borderTop: "1px solid #f0f0f0", background: "#f8fafc", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.8rem", color: "#888" }}>{selected.size > 0 ? `${selected.size} selected · ` : ""}{filtered.length} of {bookings.length} leads</span>
              <button onClick={() => setSelected(new Set())} style={{ fontSize: "0.78rem", color: "#1976D2", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>Clear selection</button>
            </div>
          )}
        </div>
      </div>

      {/* Email Modal */}
      <AnimatePresence>
        {showEmailModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              style={{ background: "#fff", borderRadius: "1.25rem", padding: "2rem", width: "100%", maxWidth: "520px", boxShadow: "0 25px 60px rgba(0,0,0,0.15)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 800, color: "#1A1A1A" }}>Send Email</h3>
                  <p style={{ margin: "0.25rem 0 0", fontSize: "0.82rem", color: "#888" }}>{selected.size} recipient(s) selected</p>
                </div>
                <button onClick={() => setShowEmailModal(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#888", padding: "0.25rem" }}><X size={20} /></button>
              </div>
              <div style={{ background: "#f8fafc", borderRadius: "0.75rem", padding: "0.75rem 1rem", marginBottom: "1.25rem", maxHeight: "80px", overflowY: "auto" }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                  {bookings.filter((b) => selected.has(b.id)).map((b) => (
                    <span key={b.id} style={{ fontSize: "0.75rem", background: "#e0ebf5", color: "#1976D2", padding: "0.2rem 0.6rem", borderRadius: "100px", fontWeight: 600 }}>{b.email}</span>
                  ))}
                </div>
              </div>
              <input value={emailSubject} onChange={(e) => setEmailSubject(e.target.value)} placeholder="Email Subject"
                style={{ width: "100%", padding: "0.7rem 1rem", borderRadius: "0.5rem", border: "1px solid #e5e7eb", outline: "none", fontSize: "0.9rem", fontFamily: "'Inter', sans-serif", boxSizing: "border-box", marginBottom: "0.75rem" }} />
              <textarea value={emailBody} onChange={(e) => setEmailBody(e.target.value)} placeholder="Write your email message here..." rows={6}
                style={{ width: "100%", padding: "0.7rem 1rem", borderRadius: "0.5rem", border: "1px solid #e5e7eb", outline: "none", fontSize: "0.9rem", fontFamily: "'Inter', sans-serif", boxSizing: "border-box", resize: "vertical", lineHeight: 1.6 }} />
              {emailResult && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.65rem 1rem", borderRadius: "0.5rem", marginTop: "0.75rem", background: emailResult.success ? "#f0fdf4" : "#fff5f5", border: `1px solid ${emailResult.success ? "#86efac" : "#fca5a5"}`, color: emailResult.success ? "#16a34a" : "#dc2626", fontSize: "0.82rem" }}>
                  {emailResult.success ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                  {emailResult.message}
                </div>
              )}
              <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.25rem" }}>
                <button onClick={() => setShowEmailModal(false)} style={{ flex: 1, padding: "0.7rem", borderRadius: "0.5rem", border: "1px solid #e5e7eb", background: "#fff", color: "#555", fontSize: "0.9rem", fontWeight: 600, cursor: "pointer" }}>Cancel</button>
                <button onClick={handleSendEmail} disabled={sendingEmail || !emailSubject || !emailBody}
                  style={{ flex: 2, padding: "0.7rem", borderRadius: "0.5rem", border: "none", background: sendingEmail ? "#aaa" : "#1976D2", color: "#fff", fontSize: "0.9rem", fontWeight: 700, cursor: sendingEmail ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem" }}>
                  <Send size={14} /> {sendingEmail ? "Sending..." : "Send Email"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        select option { font-family: 'Inter', sans-serif; }
      `}</style>
    </div>
  );
}
