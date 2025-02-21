import { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

export default function ShowHireForm({ isOpen, onClose }) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.formContainer}>
        <div style={styles.formHeader}>
          <h2>Hire Me</h2>
          <button onClick={onClose} style={styles.closeBtn}>
            <AiOutlineClose size={24} />
          </button>
        </div>
        <form>
          <input type="text" placeholder="Your Name" required style={styles.input} />
          <input type="email" placeholder="Your Email" required style={styles.input} />
          <textarea placeholder="Your Message" rows="4" required style={styles.textarea}></textarea>
          <button type="submit" style={styles.submitBtn}>Send</button>
        </form>
      </div>
    </div>
  );
}

// Inline CSS styles
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000
  },
  formContainer: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    width: "90%",
    paddingRight: "40px",
    maxWidth: "400px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    position: "relative"
  },
  formHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  closeBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "20px",
    color: "black"
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "5px"
  },
  textarea: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "5px"
  },
  submitBtn: {
    width: "100%",
    padding: "10px",
    background: "#007bff",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    marginTop: "10px"
  }
};
