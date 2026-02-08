import { useState } from "react";
import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  CreditCard, 
  UserCheck, 
  MapPin, 
  Store, 
  CloudRain, 
  Activity, 
  Menu, 
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/topup", label: "Topup Requests", icon: CreditCard },
  { to: "/drivers", label: "Driver Verification", icon: UserCheck },
  { to: "/campus", label: "Campus Locations", icon: MapPin },
  { to: "/merchants", label: "Merchants", icon: Store },
  { to: "/weather", label: "Weather Control", icon: CloudRain },
  { to: "/system/health", label: "System Health", icon: Activity },
];

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

export default function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Styling Nav Item
  const getNavItemClass = ({ isActive }: { isActive: boolean }) => cn(
    "flex items-center gap-3 p-3 rounded-lg border-2 border-transparent transition-all duration-200 font-bold mb-2 text-[#0F1720]", // Default text color: Black
    isActive 
      ? "bg-[#FFD166] text-[#0F1720] border-[#0F1720] shadow-[4px_4px_0px_0px_#0F1720] translate-x-[-2px] translate-y-[-2px]" // Active: Yellow Background + Black Text + Hard Shadow
      : "hover:bg-[#00B3A6] hover:text-white hover:border-[#0F1720] hover:shadow-[2px_2px_0px_0px_#0F1720]" // Hover: Teal Background + White Text
  );

  return (
    <>
      {/* === MOBILE TOGGLE BUTTON === */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-4 left-4 z-50 p-2 md:hidden bg-[#FFD166] border-2 border-[#0F1720] shadow-[3px_3px_0px_0px_#0F1720] rounded-md active:translate-y-[2px] active:shadow-none transition-all text-[#0F1720]"
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* === OVERLAY (Mobile) === */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* === SIDEBAR ASIDE === */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 bg-[#EBFFDE] border-r-4 border-[#0F1720] transition-all duration-300 ease-in-out flex flex-col shadow-[4px_0px_0px_0px_rgba(0,0,0,0.1)]", // Menggunakan bg-[#EBFFDE] (Krem Terang) agar kontras
          // Mobile logic
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          // Desktop logic
          isCollapsed ? "md:w-20" : "md:w-72",
          "w-72" 
        )}
      >
        {/* Header Sidebar */}
        <div className="p-6 border-b-4 border-[#0F1720] flex items-center justify-between bg-[#00B3A6] relative"> {/* Header Teal */}
          {!isCollapsed && (
             <h2 className="font-black text-xl tracking-tighter uppercase truncate text-white drop-shadow-[2px_2px_0px_#0F1720]">
               Mahago Admin
             </h2>
          )}
          {isCollapsed && (
             <span className="mx-auto font-black text-xl text-white drop-shadow-[2px_2px_0px_#0F1720]">MHG</span>
          )}
          
          {/* Desktop Collapse Button */}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 bg-[#FFD166] text-[#0F1720] border-2 border-[#0F1720] rounded-full w-8 h-8 p-0 shadow-[2px_2px_0px_0px_#0F1720] hover:bg-[#ffc107] z-50 hover:scale-110 transition-transform"
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto space-y-2 bg-[#EBFFDE]"> {/* Pastikan bg konten sidebar terang */}
          {NAV_ITEMS.map((item) => (
            <NavLink 
              key={item.to} 
              to={item.to} 
              className={getNavItemClass}
              onClick={() => setIsMobileOpen(false)}
              title={isCollapsed ? item.label : ""}
            >
              <item.icon size={24} className="shrink-0" strokeWidth={2.5} />
              <span className={cn(
                "whitespace-nowrap transition-opacity duration-200 font-bold",
                isCollapsed ? "hidden opacity-0" : "block opacity-100"
              )}>
                {item.label}
              </span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        {!isCollapsed && (
           <div className="p-4 text-xs font-mono text-center border-t-2 border-[#0F1720] bg-[#EBFFDE] text-[#0F1720] opacity-80 font-bold">
             v1.0.0 (Local Dev)
           </div>
        )}
      </aside>
    </>
  );
}