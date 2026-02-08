import { useState } from "react";
import {
  Bike,
  MapPin,
  Phone,
  Mail,
  CreditCard,
  Calendar, // ✅ Sekarang DIPAKAI
  CheckCircle2,
  XCircle,
  Eye,
  FileText,
} from "lucide-react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; // ✅ CardHeader DIPAKAI
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Import Data Dummy
import { dummyDrivers, dummyDriverDetail } from "@/lib/dummyData";

// Tipe Data
type Driver = typeof dummyDriverDetail;

export default function DriverVerificationPage() {
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Format Tanggal Helper
  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleDriverClick = (driverId: string) => {
    console.log("Fetching detail for:", driverId);
    setSelectedDriver(dummyDriverDetail);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8 pb-10">
      {/* HEADER PAGE */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black uppercase text-[#0F1720] tracking-tight drop-shadow-[2px_2px_0px_rgba(0,0,0,0.2)]">
            Driver Verification
          </h1>
          <p className="text-[#0F1720] font-medium opacity-80 mt-1">
            Daftar driver baru yang menunggu persetujuan dokumen.
          </p>
        </div>
        <Badge className="bg-[#FFD166] text-[#0F1720] border-2 border-[#0F1720] text-sm px-3 py-1 shadow-[4px_4px_0px_0px_#0F1720]">
          {dummyDrivers.length} PENDING
        </Badge>
      </div>

      {/* DRIVER LIST GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyDrivers.map((driver) => (
          <Card
            key={driver.id}
            onClick={() => handleDriverClick(driver.id)}
            className="
              group cursor-pointer relative overflow-hidden
              bg-white border-4 border-[#0F1720] 
              shadow-[6px_6px_0px_0px_#0F1720] 
              hover:translate-x-[-2px] hover:translate-y-[-2px] 
              hover:shadow-[10px_10px_0px_0px_#0F1720]
              transition-all duration-200
            "
          >
            {/* ✅ HEADER CARD DIPAKAI DI SINI */}
            <CardHeader className="bg-[#EBFFDE] p-4 border-b-4 border-[#0F1720] flex flex-row justify-between items-start space-y-0">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full border-2 border-[#0F1720] overflow-hidden bg-gray-200">
                  <img
                    src={driver.profile_photo}
                    alt={driver.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <CardTitle className="text-lg font-black uppercase text-[#0F1720]">
                    {driver.name}
                  </CardTitle>
                  <span className="text-xs font-bold text-[#0F1720]/60">
                    ID: {driver.id}
                  </span>
                </div>
              </div>
              <Badge
                variant="outline"
                className="bg-[#FFD166] text-[#0F1720] border-2 border-[#0F1720] font-bold shadow-[2px_2px_0px_0px_#0F1720]"
              >
                {driver.status}
              </Badge>
            </CardHeader>

            {/* Body Card */}
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-[#0F1720]">
                <Mail size={18} className="text-[#00B3A6]" />
                <span className="truncate">{driver.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-[#0F1720]">
                <Phone size={18} className="text-[#00B3A6]" />
                <span>{driver.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-[#0F1720]">
                <Bike size={18} className="text-[#00B3A6]" />
                <span>
                  {driver.vehicle_type} - {driver.plate_number}
                </span>
              </div>

              <div className="pt-2">
                <Button className="w-full bg-[#0F1720] text-white border-2 border-[#0F1720] font-bold hover:bg-[#0F1720]/90 group-hover:bg-[#00B3A6] transition-colors">
                  <Eye className="mr-2 h-4 w-4" /> Review Data
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* =======================
          MODAL DETAIL DRIVER
      ======================= */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-[#EBFFDE] border-4 border-[#0F1720] shadow-[12px_12px_0px_0px_#0F1720] p-0 gap-0">
          {/* Modal Header */}
          <DialogHeader className="p-6 bg-[#00B3A6] border-b-4 border-[#0F1720]">
            <div className="flex items-center justify-between pr-8">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full border-4 border-[#0F1720] bg-white overflow-hidden shadow-[4px_4px_0px_0px_#0F1720]">
                  <img
                    src={selectedDriver?.profile_photo}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <DialogTitle className="text-2xl font-black uppercase text-white drop-shadow-[2px_2px_0px_#0F1720]">
                    {selectedDriver?.name}
                  </DialogTitle>
                  <DialogDescription className="text-white font-bold opacity-90 flex items-center gap-2">
                    <MapPin size={16} />{" "}
                    {selectedDriver?.address || "Alamat tidak tersedia"}
                  </DialogDescription>
                </div>
              </div>
              <Badge className="text-lg bg-[#FFD166] text-[#0F1720] border-4 border-[#0F1720] px-4 py-1 shadow-[4px_4px_0px_0px_#0F1720]">
                VERIFIKASI
              </Badge>
            </div>
          </DialogHeader>

          {/* Modal Content */}
          <div className="p-6 space-y-8">
            {/* GRID DATA DIRI & KENDARAAN */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Info Box */}
              <div className="bg-white p-5 border-4 border-[#0F1720] shadow-[6px_6px_0px_0px_#0F1720] rounded-xl">
                <h3 className="text-lg font-black text-[#0F1720] uppercase border-b-4 border-[#0F1720] pb-2 mb-4 flex items-center gap-2">
                  <FileText /> Data Diri
                </h3>
                <div className="space-y-3 text-sm font-bold text-[#0F1720]">
                  <InfoRow label="Email" value={selectedDriver?.email} />
                  <InfoRow label="No. HP" value={selectedDriver?.phone} />
                  <InfoRow
                    label="Darurat"
                    value={`${selectedDriver?.emergency_contact_name} (${selectedDriver?.emergency_contact_phone})`}
                  />
                  <InfoRow
                    label="Gol. Darah"
                    value={selectedDriver?.blood_type}
                  />

                  {/* ✅ CALENDAR DIPAKAI DI SINI */}
                  <div className="flex justify-between border-b border-dashed border-gray-300 pb-2 last:border-0 last:pb-0">
                    <span className="opacity-70 font-medium flex items-center gap-2">
                      <Calendar size={14} /> Tgl Daftar
                    </span>
                    <span className="text-right">
                      {formatDate(selectedDriver?.created_at)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Vehicle Info Box */}
              <div className="bg-white p-5 border-4 border-[#0F1720] shadow-[6px_6px_0px_0px_#0F1720] rounded-xl">
                <h3 className="text-lg font-black text-[#0F1720] uppercase border-b-4 border-[#0F1720] pb-2 mb-4 flex items-center gap-2">
                  <Bike /> Data Kendaraan
                </h3>
                <div className="space-y-3 text-sm font-bold text-[#0F1720]">
                  <InfoRow label="Jenis" value={selectedDriver?.vehicle_type} />
                  <InfoRow
                    label="Kendaraan"
                    value={`${selectedDriver?.vehicle_brand} - ${selectedDriver?.vehicle_model}`}
                  />
                  <InfoRow
                    label="Plat Nomor"
                    value={selectedDriver?.plate_number}
                  />
                  <InfoRow
                    label="Detail"
                    value={`${selectedDriver?.vehicle_year} (${selectedDriver?.vehicle_color})`}
                  />
                </div>
              </div>
            </div>

            {/* DOKUMEN & FOTO */}
            <div>
              <h3 className="text-xl font-black uppercase mb-4 text-[#0F1720] flex items-center gap-2">
                <CreditCard /> Bukti Dokumen
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <ImagePreview
                  label="Foto Profil"
                  src={selectedDriver?.profile_photo}
                />
                <ImagePreview
                  label="KTP/SIM/KTM"
                  src={selectedDriver?.sim_or_ktm_photo}
                />
                <ImagePreview label="STNK" src={selectedDriver?.stnk_photo} />
                <ImagePreview
                  label="Kendaraan"
                  src={selectedDriver?.vehicle_photo}
                />
              </div>
            </div>
          </div>

          {/* Modal Footer (Actions) */}
          <div className="p-6 bg-white border-t-4 border-[#0F1720] flex justify-end gap-4 sticky bottom-0 z-10">
            <Button
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              className="border-2 border-[#0F1720] font-bold hover:bg-gray-100"
            >
              Batal
            </Button>

            <Button className="bg-[#E11D48] text-white border-2 border-[#0F1720] font-bold shadow-[4px_4px_0px_0px_#0F1720] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#0F1720] active:translate-y-[4px] active:shadow-none transition-all">
              <XCircle className="mr-2 h-5 w-5" /> Tolak
            </Button>

            <Button className="bg-[#0F8C3C] text-white border-2 border-[#0F1720] font-bold shadow-[4px_4px_0px_0px_#0F1720] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#0F1720] active:translate-y-[4px] active:shadow-none transition-all">
              <CheckCircle2 className="mr-2 h-5 w-5" /> Verifikasi
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// --- SUB COMPONENTS UTILITIES ---

function InfoRow({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="flex justify-between border-b border-dashed border-gray-300 pb-2 last:border-0 last:pb-0">
      <span className="opacity-70 font-medium">{label}</span>
      <span className="text-right">{value || "-"}</span>
    </div>
  );
}

function ImagePreview({ label, src }: { label: string; src?: string }) {
  return (
    <div className="space-y-2">
      <div className="aspect-square bg-gray-100 border-4 border-[#0F1720] rounded-lg overflow-hidden relative group shadow-[4px_4px_0px_0px_#0F1720]">
        {src ? (
          <img
            src={src}
            alt={label}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 font-bold text-xs">
            No Image
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all cursor-pointer" />
      </div>
      <p className="text-center text-xs font-black uppercase text-[#0F1720]">
        {label}
      </p>
    </div>
  );
}
