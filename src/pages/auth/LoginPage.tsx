import { useState } from "react";
import { useNavigate } from "react-router-dom";

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { neoToast } from "@/components/ui/neo-toast";

/* =================================================
   🔴 API AUTH (UNCOMMENT SAAT API HIDUP)
================================================= */
// import { authService } from "@/api/auth.service";

/* =================================================
   🟢 LOCAL MOCK ADMIN (SEMENTARA)
================================================= */
const MOCK_ADMIN = {
  email: "admin@mahago.id",
  password: "admin123",
  access_token: "local-admin-access-token",
  refresh_token: "local-admin-refresh-token",
};

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      neoToast.info("Email dan password wajib diisi dulu ya!");
      return;
    }

    try {
      setLoading(true);

      /* ============================================
         🔴 API MODE (UNCOMMENT SAAT BACKEND SIAP)
      ============================================ */
      /*
      const res = await authService.login({
        email,
        password,
      });

      localStorage.setItem("access_token", res.access_token);
      localStorage.setItem("refresh_token", res.refresh_token);

      neoToast.success("Login berhasil");
      navigate("/", { replace: true });
      return;
      */

      /* ============================================
         🟢 LOCAL MODE (SEKARANG DIPAKAI)
      ============================================ */
      if (
        email === MOCK_ADMIN.email &&
        password === MOCK_ADMIN.password
      ) {
        localStorage.setItem(
          "access_token",
          MOCK_ADMIN.access_token
        );
        localStorage.setItem(
          "refresh_token",
          MOCK_ADMIN.refresh_token
        );

        neoToast.success("Mantap! Login berhasil (LOCAL MODE)");
        navigate("/", { replace: true });
      } else {
        neoToast.error("Email atau password salah!");
      }
    } catch (err) {
      console.error(err);
      neoToast.error("Login gagal, coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">

      {/* =============================
         DEKORASI BACKGROUND
      ============================== */}
      <div
        className="absolute top-10 left-10 w-24 h-24 bg-primary rounded-full 
        border-4 border-border shadow-[4px_4px_0px_0px_var(--border)] 
        hidden md:block animate-bounce"
        style={{ animationDuration: "3s" }}
      />
      <div
        className="absolute bottom-10 right-10 w-16 h-16 bg-destructive 
        rotate-12 border-4 border-border 
        shadow-[4px_4px_0px_0px_var(--border)] 
        hidden md:block"
      />

      {/* =============================
         LOGIN CARD
      ============================== */}
      <form
        onSubmit={handleSubmit}
        className="
          relative w-full max-w-md space-y-6 p-8
          bg-card text-card-foreground
          border-4 border-border rounded-xl
          shadow-[8px_8px_0px_0px_var(--border)]
        "
      >
        {/* HEADER & LOGO */}
        <div className="text-center flex flex-col items-center space-y-4">
          <div className="inline-block px-4 py-1 bg-secondary text-white 
            border-2 border-border font-bold rounded-full
            shadow-[2px_2px_0px_0px_var(--border)]">
            ADMIN ACCESS
          </div>

          <div className="w-48 h-auto mx-auto">
            <img 
              src="/images/mahagologo.png" 
              alt="Mahago Logo" 
              className="w-full h-full object-contain 
              drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]"
            />
          </div>

          <p className="text-sm font-medium opacity-80 text-border">
            Masukkan kredensial untuk masuk ke dashboard admin.
          </p>
        </div>

        {/* =============================
            INPUTS
        ============================== */}
        <div className="space-y-5 pt-2">
          <div className="space-y-2">
            <Label className="text-base font-bold text-border">
              Email
            </Label>
            <Input
              type="email"
              placeholder="admin@mahago.id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="bg-white text-lg py-6 px-4 
              border-2 border-border rounded-lg placeholder:text-[#0F1720]"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-base font-bold text-border">
              Password
            </Label>
            <Input
              type="password"
              placeholder="******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="bg-white text-lg py-6 px-4 
              border-2 border-border rounded-lg placeholder:text-[#0F1720]"
            />
          </div>
        </div>

        {/* =============================
            BUTTON
        ============================== */}
        <Button
          type="submit"
          disabled={loading}
          className="
            w-full py-6 text-lg font-black uppercase tracking-wider
            bg-primary text-primary-foreground
            border-2 border-border rounded-lg
            shadow-[4px_4px_0px_0px_var(--border)]
            hover:translate-x-[1px] hover:translate-y-[1px]
            hover:shadow-[3px_3px_0px_0px_var(--border)]
            active:translate-x-[4px] active:translate-y-[4px]
            active:shadow-none
            disabled:opacity-70 disabled:shadow-none
            transition-all duration-150
          "
        >
          {loading ? "Sabar..." : "Gass Masuk! 🚀"}
        </Button>

        <p className="text-xs text-center opacity-60 font-mono">
          MODE: LOCAL AUTH
        </p>
      </form>
    </div>
  );
}
