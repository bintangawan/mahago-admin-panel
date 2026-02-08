import toast from "react-hot-toast";

// Style dasar: Border tebal, Shadow hitam keras, Rounded corners
const baseStyle = {
  border: "3px solid #0F1720", // Border Outline Color
  boxShadow: "5px 5px 0px #0F1720",
  borderRadius: "8px",
  fontWeight: "600",
  padding: "16px",
  color: "#FFFFFF", // Default text white
};

export const neoToast = {
  // Hijau (Success Alert)
  success(message: string) {
    toast.success(message, {
      iconTheme: {
        primary: "#FFFFFF",
        secondary: "#0F8C3C",
      },
      style: {
        ...baseStyle,
        background: "#0F8C3C", // Foreground Green
        color: "#FFFFFF",
      },
    });
  },

  // Merah (Danger/Field Alert)
  error(message: string) {
    toast.error(message, {
      iconTheme: {
        primary: "#FFFFFF",
        secondary: "#E11D48",
      },
      style: {
        ...baseStyle,
        background: "#E11D48", // Danger Border Color
        color: "#FFFFFF",
      },
    });
  },

  // Biru (Info Alert)
  info(message: string) {
    toast(message, {
      icon: "ℹ️",
      style: {
        ...baseStyle,
        background: "#4F46E5", // Secondary Border (Purple/Blue)
        color: "#FFFFFF",
      },
    });
  },

  // Kuning (Warning Alert) - Text harus gelap agar terbaca
  warning(message: string) {
    toast(message, {
      icon: "⚠️",
      style: {
        ...baseStyle,
        background: "#FFD166", // Promo Border (Yellow)
        color: "#0F1720", // Text gelap khusus background kuning
      },
    });
  },
};