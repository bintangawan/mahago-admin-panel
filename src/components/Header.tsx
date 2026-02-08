import { Button } from "@/components/ui/button";
import { authService } from "@/api/auth.service";
import { LogOut, User } from "lucide-react";

export default function Header() {
  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (_) {
      // Ignore error if logout fails
    }

    localStorage.clear();
    window.location.href = "/inituhpageslogin";
  };

  return (
    <header className="
        sticky top-0 z-20 
        bg-card p-4 
        border-b-4 border-border 
        shadow-[0px_4px_0px_0px_rgba(0,0,0,0.1)]
        flex justify-end md:justify-between items-center
        h-20
    ">
      {/* Spacer for Mobile Menu Button (agar tidak ketimpa judul) */}
      <div className="w-10 md:hidden"></div>

      {/* Title (Hidden on mobile to save space, or visible) */}
      <div className="hidden md:flex items-center gap-2">
        <div className="p-2 bg-primary border-2 border-border rounded-lg shadow-[2px_2px_0px_0px_var(--border)]">
           <User size={20} className="text-border"/>
        </div>
        <div>
            <span className="block font-black text-sm leading-none uppercase text-border">Welcome, Admin</span>
            <span className="text-xs font-mono text-muted-foreground">Super Administrator</span>
        </div>
      </div>

      <Button 
        onClick={handleLogout} 
        variant="destructive"
        className="
            flex items-center gap-2 font-bold border-2 border-border shadow-[4px_4px_0px_0px_var(--border)]
            hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_var(--border)]
            active:translate-y-[4px] active:shadow-none transition-all
        "
      >
        <LogOut size={16} />
        <span>Logout</span>
      </Button>
    </header>
  );
}