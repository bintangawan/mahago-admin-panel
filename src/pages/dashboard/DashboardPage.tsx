import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  // Server, 
  Database, 
  Activity, 
  AlertTriangle, 
  WifiOff, 
  HardDrive,
  Info
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8 pb-10">
      
      {/* =============================
          1. HEADER SECTION
      ============================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#EBFFDE] p-6 border-4 border-[#0F1720] shadow-[6px_6px_0px_0px_#0F1720] rounded-xl">
        <div>
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-[#0F1720]">
                Dashboard Overview
            </h1>
            <p className="text-[#0F1720] font-bold mt-1 text-lg opacity-80">
                Pantau performa sistem secara real-time.
            </p>
        </div>
        <div className="flex items-center gap-3">
             <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse border border-black"></div>
             <span className="font-mono font-bold text-[#0F1720] bg-white px-3 py-1 border-2 border-[#0F1720] rounded-md shadow-[2px_2px_0px_0px_#0F1720]">
                MODE: LOCAL DEV
             </span>
        </div>
      </div>

      {/* =============================
          2. SUMMARY CARDS (GRID)
      ============================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* CARD 1: API STATUS (Theme: Danger/Red) */}
        <Card className="bg-[#FFE4E6] border-4 border-[#0F1720] shadow-[8px_8px_0px_0px_#0F1720] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_#0F1720] transition-all duration-200">
          <CardHeader className="border-b-4 border-[#0F1720] border-dashed pb-4">
            <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-black uppercase text-[#0F1720]">API Backend</CardTitle>
                <div className="p-2 bg-[#E11D48] border-2 border-[#0F1720] text-white rounded-md">
                    <WifiOff size={24} strokeWidth={3} />
                </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
                <span className="text-4xl font-black text-[#E11D48]">DOWN</span>
            </div>
            <Badge variant="destructive" className="bg-[#E11D48] text-white hover:bg-[#be123c] border-2 border-[#0F1720] text-sm py-1 px-3 shadow-[2px_2px_0px_0px_#0F1720]">
               <AlertTriangle size={14} className="mr-2" strokeWidth={3} /> Local Mode
            </Badge>
            <p className="text-sm font-bold text-[#0F1720] mt-4 opacity-75 leading-tight">
                Koneksi server terputus. Data menggunakan mock static.
            </p>
          </CardContent>
        </Card>

        {/* CARD 2: AUTH MODE (Theme: Info/Blue) */}
        <Card className="bg-[#E0F2FE] border-4 border-[#0F1720] shadow-[8px_8px_0px_0px_#0F1720] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_#0F1720] transition-all duration-200">
          <CardHeader className="border-b-4 border-[#0F1720] border-dashed pb-4">
             <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-black uppercase text-[#0F1720]">Auth Provider</CardTitle>
                <div className="p-2 bg-[#4F46E5] border-2 border-[#0F1720] text-white rounded-md">
                    <Database size={24} strokeWidth={3} />
                </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
             <div className="flex items-center gap-2 mb-2">
                <span className="text-3xl font-black text-[#4F46E5] break-words">LOCAL STORAGE</span>
            </div>
            <Badge className="bg-[#4F46E5] text-white hover:bg-[#4338ca] border-2 border-[#0F1720] text-sm py-1 px-3 shadow-[2px_2px_0px_0px_#0F1720]">
               <HardDrive size={14} className="mr-2" strokeWidth={3} /> Mock Data
            </Badge>
            <p className="text-sm font-bold text-[#0F1720] mt-4 opacity-75 leading-tight">
                Session login disimpan sementara di browser client-side.
            </p>
          </CardContent>
        </Card>

        {/* CARD 3: SYSTEM HEALTH (Theme: Success/Yellow-Green) */}
        <Card className="bg-[#FEF9C3] border-4 border-[#0F1720] shadow-[8px_8px_0px_0px_#0F1720] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_#0F1720] transition-all duration-200">
          <CardHeader className="border-b-4 border-[#0F1720] border-dashed pb-4">
            <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-black uppercase text-[#0F1720]">Frontend UI</CardTitle>
                <div className="p-2 bg-[#0F8C3C] border-2 border-[#0F1720] text-white rounded-md">
                    <Activity size={24} strokeWidth={3} />
                </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
             <div className="flex items-center gap-2 mb-2">
                <span className="text-4xl font-black text-[#0F8C3C]">READY</span>
            </div>
            <Badge className="bg-[#0F8C3C] text-white hover:bg-[#15803d] border-2 border-[#0F1720] text-sm py-1 px-3 shadow-[2px_2px_0px_0px_#0F1720]">
               Stable v1.0
            </Badge>
            <p className="text-sm font-bold text-[#0F1720] mt-4 opacity-75 leading-tight">
                Interface admin berjalan normal tanpa error blocking.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* =============================
          3. DEVELOPER NOTICE (Full Width)
      ============================= */}
      <div className="relative mt-8">
        <div className="bg-[#00B3A6] border-4 border-[#0F1720] p-6 md:p-8 rounded-xl shadow-[8px_8px_0px_0px_#0F1720] flex flex-col md:flex-row items-start gap-6">
            
            {/* Icon Box */}
            <div className="bg-[#EBFFDE] p-4 border-4 border-[#0F1720] shadow-[4px_4px_0px_0px_#0F1720] rounded-lg shrink-0">
                <Info size={40} className="text-[#0F1720]" strokeWidth={2.5} />
            </div>

            {/* Text Content */}
            <div className="space-y-3">
                <h3 className="text-2xl font-black uppercase text-white drop-shadow-[2px_2px_0px_#0F1720]">
                    Developer System Notice
                </h3>
                <p className="text-[#EBFFDE] font-bold text-lg leading-relaxed">
                    Dashboard ini sedang berjalan dalam mode <span className="bg-[#FFD166] text-[#0F1720] px-2 py-0.5 border-2 border-[#0F1720] rounded-sm mx-1">LOCAL MOCK</span>. 
                    Semua data yang tampil adalah data statis (dummy) dan tidak terhubung ke database produksi. 
                    Deploy API Backendnya dong Om Ali WKWKWK by bintangin.com
                </p>
            </div>
        </div>
      </div>

    </div>
  );
}