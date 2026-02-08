import { useState } from "react";
import { 
  Wallet, 
  CreditCard, 
  Banknote, 
  Calendar, 
  User, 
  ArrowUpRight, 
  CheckCircle2, 
  XCircle, 
  FileImage,
  Hash,
  Maximize2,
  X
} from "lucide-react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

// import api from "@/api/api"; 
import { dummyTopups, dummyTopupDetail } from "@/lib/dummyData";

// Tipe Data
type TopupDetail = typeof dummyTopupDetail;

export default function TopupListPage() {
  const [topups] = useState(dummyTopups); 
  
  const [selectedTopup, setSelectedTopup] = useState<TopupDetail | null>(null);
  
  // State Modal Detail Utama
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // State Modal Zoom Gambar
  const [isImageZoomOpen, setIsImageZoomOpen] = useState(false);

  /* ================= API FETCH (Pending) ================= */
  // ... (Kode API sama seperti sebelumnya)

  // Format Currency
  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Format Date
  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const handleTopupClick = async (id: string) => {
    console.log("Fetching ID:", id);
    setSelectedTopup(dummyTopupDetail);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8 pb-10">
      
      {/* HEADER PAGE */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black uppercase text-[#0F1720] tracking-tight drop-shadow-[2px_2px_0px_rgba(0,0,0,0.2)]">
            Topup Requests
          </h1>
          <p className="text-[#0F1720] font-medium opacity-80 mt-1">
            Permintaan isi ulang saldo driver.
          </p>
        </div>
        <div className="bg-[#EBFFDE] px-4 py-2 border-2 border-[#0F1720] shadow-[4px_4px_0px_0px_#0F1720] rounded-lg">
            <span className="text-xs font-bold uppercase text-[#0F1720]">Total Pending</span>
            <p className="text-2xl font-black text-[#0F1720]">{topups.length}</p>
        </div>
      </div>

      {/* LIST CARD */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topups.map((item) => (
          <Card
            key={item.id}
            onClick={() => handleTopupClick(item.id)}
            className="group cursor-pointer relative overflow-hidden bg-white border-4 border-[#0F1720] shadow-[6px_6px_0px_0px_#0F1720] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0px_0px_#0F1720] transition-all duration-200"
          >
            <CardHeader className="bg-[#E0F2FE] p-4 border-b-4 border-[#0F1720] flex flex-row justify-between items-center border-dashed space-y-0">
               <div className="flex items-center gap-3">
                  <div className="bg-[#00B3A6] p-2 border-2 border-[#0F1720] text-white rounded-md">
                    <Wallet size={20} />
                  </div>
                  <CardTitle className="text-lg font-black text-[#0F1720]">
                    {formatRupiah(item.amount)}
                  </CardTitle>
               </div>
               <Badge className="bg-[#FFD166] text-[#0F1720] border-2 border-[#0F1720] shadow-[2px_2px_0px_0px_#0F1720]">
                  {item.status}
               </Badge>
            </CardHeader>

            <CardContent className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <User size={16} className="text-[#00B3A6]" />
                        <span className="font-bold text-[#0F1720]">{item.driver_name}</span>
                    </div>
                    <span className="text-xs font-mono bg-gray-100 px-2 py-1 border border-[#0F1720] rounded">
                        {item.payment_method}
                    </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#0F1720]/60 border-t-2 border-dashed border-[#0F1720]/20 pt-3">
                    <Calendar size={14} />
                    {formatDate(item.created_at)}
                </div>
                <Button className="w-full bg-[#0F1720] text-white border-2 border-[#0F1720] font-bold hover:bg-[#0F1720]/90 group-hover:bg-[#00B3A6] transition-colors mt-2">
                  <ArrowUpRight className="mr-2 h-4 w-4" /> Proses Request
                </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* =================================================================
          1. MODAL DETAIL UTAMA (Scrollable Content + Sticky Footer)
      ================================================================= */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="w-[95vw] max-w-5xl max-h-[90vh] p-0 gap-0 bg-[#EBFFDE] border-4 border-[#0F1720] shadow-[12px_12px_0px_0px_#0F1720] flex flex-col">
          
          {/* A. HEADER (Sticky Top) */}
          <DialogHeader className="p-6 bg-[#FFD166] border-b-4 border-[#0F1720] shrink-0">
             <div className="flex items-center justify-between pr-8">
                <div className="flex items-center gap-4">
                    <div className="bg-white p-3 border-2 border-[#0F1720] shadow-[4px_4px_0px_0px_#0F1720] rounded-lg hidden sm:block">
                        <Banknote size={32} className="text-[#0F1720]"/>
                    </div>
                    <div>
                        <DialogTitle className="text-2xl md:text-3xl font-black text-[#0F1720]">
                            {selectedTopup ? formatRupiah(selectedTopup.amount) : "Rp 0"}
                        </DialogTitle>
                        <DialogDescription className="text-[#0F1720] font-bold opacity-80 text-xs md:text-sm">
                            Request ID: <span className="font-mono">{selectedTopup?.id}</span>
                        </DialogDescription>
                    </div>
                </div>
                <div className="text-right">
                     <p className="text-xs font-bold text-[#0F1720]">Driver</p>
                     <p className="text-lg md:text-xl font-black uppercase text-[#0F1720]">{selectedTopup?.driver_name}</p>
                </div>
             </div>
          </DialogHeader>

          {/* B. CONTENT (Scrollable Middle) */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                
                {/* Kolom Kiri: Detail Teks (Lebih Lebar di Desktop) */}
                <div className="md:col-span-3 space-y-6">
                    <div className="bg-white p-5 border-4 border-[#0F1720] shadow-[6px_6px_0px_0px_#0F1720] rounded-xl">
                        <h3 className="text-lg font-black text-[#0F1720] uppercase border-b-4 border-[#0F1720] pb-2 mb-4 flex items-center gap-2">
                            <CreditCard /> Detail Transaksi
                        </h3>
                        
                        <div className="space-y-4">
                            <InfoRow label="Metode Bayar" value={selectedTopup?.payment_method} icon={<Wallet size={16}/>} />
                            {selectedTopup?.payment_method !== 'cash' && (
                                <>
                                    <InfoRow label="Nama Pengirim" value={selectedTopup?.payment_account_name} icon={<User size={16}/>} />
                                    <InfoRow label="Nomor Akun" value={selectedTopup?.payment_account_number} icon={<Hash size={16}/>} />
                                </>
                            )}
                            <InfoRow label="Waktu Request" value={formatDate(selectedTopup?.created_at)} icon={<Calendar size={16}/>} />
                        </div>
                    </div>

                    <div className="bg-[#00B3A6] p-4 border-4 border-[#0F1720] shadow-[4px_4px_0px_0px_#0F1720] rounded-xl">
                        <p className="text-white font-bold text-sm mb-1">⚠️ Catatan Admin:</p>
                        <p className="text-white text-xs opacity-90">
                            Mohon periksa mutasi rekening sebelum menyetujui. Aksi ini tidak dapat dibatalkan.
                        </p>
                    </div>
                </div>

                {/* Kolom Kanan: Bukti Transfer (Thumbnail) */}
                <div className="md:col-span-2 space-y-2">
                    <h3 className="text-lg font-black text-[#0F1720] uppercase flex items-center gap-2">
                        <FileImage /> Bukti Transfer
                    </h3>
                    
                    {/* Klik area ini untuk buka modal zoom */}
                    <div 
                        onClick={() => selectedTopup?.payment_proof && setIsImageZoomOpen(true)}
                        className="
                            w-full h-48 md:h-full min-h-[200px] 
                            bg-gray-200 border-4 border-[#0F1720] shadow-[6px_6px_0px_0px_#0F1720] 
                            rounded-xl overflow-hidden relative group cursor-zoom-in
                        "
                    >
                        {selectedTopup?.payment_proof ? (
                            <>
                                <img 
                                    src={selectedTopup.payment_proof} 
                                    alt="Bukti Transfer" 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    <Maximize2 className="text-white w-8 h-8 mb-2" />
                                    <span className="bg-[#0F1720] text-white px-3 py-1 rounded font-bold text-xs">
                                        Klik untuk melihat foto
                                    </span>
                                </div>
                            </>
                        ) : (
                            <div className="flex h-full items-center justify-center text-gray-500 font-bold flex-col">
                                <XCircle className="mb-2" />
                                Tidak ada bukti
                            </div>
                        )}
                    </div>
                </div>

            </div>
          </div>

          {/* C. FOOTER (Sticky Bottom) */}
          <div className="p-4 md:p-6 bg-white border-t-4 border-[#0F1720] flex flex-col-reverse md:flex-row justify-end gap-3 shrink-0">
            <Button 
                variant="outline" 
                onClick={() => setIsModalOpen(false)}
                className="border-2 border-[#0F1720] font-bold hover:bg-gray-100 w-full md:w-auto"
            >
                Batal
            </Button>
            
            <div className="flex gap-3 w-full md:w-auto">
                <Button className="flex-1 md:flex-none bg-[#E11D48] text-white border-2 border-[#0F1720] font-bold shadow-[4px_4px_0px_0px_#0F1720] active:translate-y-[2px] active:shadow-none transition-all">
                    <XCircle className="mr-2 h-5 w-5" /> Reject
                </Button>

                <Button className="flex-1 md:flex-none bg-[#0F8C3C] text-white border-2 border-[#0F1720] font-bold shadow-[4px_4px_0px_0px_#0F1720] active:translate-y-[2px] active:shadow-none transition-all">
                    <CheckCircle2 className="mr-2 h-5 w-5" /> Approve
                </Button>
            </div>
          </div>

        </DialogContent>
      </Dialog>

      {/* =================================================================
          2. MODAL ZOOM GAMBAR (Lightbox)
      ================================================================= */}
      <Dialog open={isImageZoomOpen} onOpenChange={setIsImageZoomOpen}>
        <DialogContent className="max-w-screen-lg w-auto h-auto max-h-[95vh] p-0 bg-transparent border-none shadow-none flex justify-center items-center outline-none">
            <div className="relative">
                {/* Tombol Close Floating */}
                <button 
                    onClick={() => setIsImageZoomOpen(false)}
                    className="absolute -top-4 -right-4 z-50 bg-[#E11D48] text-white p-2 rounded-full border-2 border-white shadow-lg hover:scale-110 transition-transform"
                >
                    <X size={24} />
                </button>

                {/* Gambar Full */}
                <div className="border-8 border-[#0F1720] rounded-lg overflow-hidden bg-black shadow-[20px_20px_0px_0px_rgba(0,0,0,0.5)]">
                    <img 
                        src={selectedTopup?.payment_proof} 
                        alt="Full Bukti" 
                        className="max-w-full max-h-[85vh] object-contain"
                    />
                </div>
            </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}

// --- SUB COMPONENT ---
function InfoRow({ label, value, icon }: { label: string; value?: string | null, icon: React.ReactNode }) {
    return (
        <div className="flex items-center justify-between border-b border-dashed border-[#0F1720]/20 pb-3 last:border-0 last:pb-0">
            <div className="flex items-center gap-2 text-[#0F1720]/70 font-bold text-sm">
                {icon}
                <span>{label}</span>
            </div>
            <span className="text-[#0F1720] font-black text-right truncate max-w-[150px] md:max-w-[250px]">
                {value || "-"}
            </span>
        </div>
    );
}