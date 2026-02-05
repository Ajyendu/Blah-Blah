function CallingUI({ name, avatar, onCancel }) {
  return (
    <div style={overlay}>
      <div style={card}>
        <img src={avatar || "/avatar.png"} style={avatarstyle} />
        <h2 style={namestyle}>{name}</h2>
        <p style={subtitle}>Calling…</p>

        <div style={actions}>
          <button style={rejectBtn} onClick={onCancel}>
            End
          </button>
        </div>
      </div>
    </div>
  );
}

export default CallingUI;

/* styles */
const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.45)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
};

const card = {
  background: "#0f172a",
  color: "#fff",
  width: "320px",
  padding: "28px 24px",
  borderRadius: "16px",
  textAlign: "center",
  boxShadow: "0 30px 60px rgba(0,0,0,0.4)",
};

const avatarstyle = {
  width: "96px",
  height: "96px",
  borderRadius: "50%",
  objectFit: "cover",
  display: "block",
  margin: "0 auto 16px auto", // 🔥 CENTERED
};

const namestyle = {
  fontSize: "20px",
  fontWeight: 600,
  margin: 0,
};

const subtitle = {
  fontSize: "14px",
  opacity: 0.7,
  marginTop: "6px",
};

const actions = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "24px",
  gap: "12px",
};

const rejectBtn = {
  flex: 1,
  background: "#ef4444",
  border: "none",
  borderRadius: "10px",
  padding: "12px",
  color: "#fff",
  fontWeight: 600,
  cursor: "pointer",
};
