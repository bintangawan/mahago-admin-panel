import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="neo bg-card p-6 text-center space-y-4">
        <h1 className="text-2xl font-bold">404</h1>
        <p>Halaman tidak ditemukan</p>

        <Button className="neo-press" onClick={() => navigate("/")}>
          Kembali ke Dashboard
        </Button>
      </div>
    </div>
  );
}
