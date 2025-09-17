export const layout = {
    container: { maxWidth: "1280px", margin: "0 auto", padding: "0 12px" },
    pagerWrap: { maxWidth: "1280px", margin: "80px auto 20px", padding: "0 12px" },
};

export const text = {
    msg: { color: "#6b7280", fontSize: "clamp(12px, 2.8vw, 13px)" },
    ellipsis: { padding: "0 4px", color: "#9ca3af", fontSize: "clamp(12px, 2.8vw, 14px)" },
    summary: { textAlign: "center", marginTop: 8, color: "#6b7280", fontSize: "clamp(11px, 2.6vw, 12px)" },
};

export const pagerRow = (isMobile) => ({
    display: "flex",
    gap: isMobile ? 6 : 8,
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
});

export const btnStyle = (active = false, disabled = false) => ({
    minWidth: "clamp(30px, 6vw, 36px)",
    height: "clamp(28px, 4.2vw, 32px)",
    padding: "0 clamp(6px, 2vw, 10px)",
    borderRadius: 8,
    border: "1px solid",
    borderColor: active ? "#111827" : "#e5e7eb",
    background: disabled ? "#f3f4f6" : active ? "#111827" : "#fff",
    color: active ? "#fff" : "#111827",
    fontSize: "clamp(12px, 2.8vw, 14px)",
    fontWeight: active ? 700 : 500,
    cursor: disabled ? "not-allowed" : active ? "default" : "pointer",
});
