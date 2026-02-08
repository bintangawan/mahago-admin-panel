import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { cn } from "@/lib/utils";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    // 1. Ubah 'min-h-screen' jadi 'h-screen' dan tambah 'overflow-hidden'
    // Ini mengunci body agar tidak bisa di-scroll (scrollbar pindah ke dalam main)
    <div className="h-screen bg-background overflow-hidden">
      
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      <div 
        className={cn(
          // 2. Tambahkan 'h-full' agar wrapper mengikuti tinggi layar
          "flex flex-col h-full transition-all duration-300 ease-in-out",
          "ml-0", 
          isCollapsed ? "md:ml-20" : "md:ml-72" 
        )}
      >
        {/* Header tetap diam di atas (tidak ikut scroll) */}
        <Header />
        
        {/* 3. Pindahkan scroll ke sini (overflow-y-auto) */}
        {/* 4. Tambahkan 'pr-6' atau 'pr-8' agar konten bergeser menjauh dari scrollbar */}
        <main className="flex-1 overflow-y-auto p-6 pr-8">
          {children}
        </main>
      </div>
    </div>
  );
}