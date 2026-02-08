import { useState } from "react";
import { MapPin, Globe, Map as MapIcon, Layers } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// Fix icon marker leaflet yang hilang di production
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Marker Icon secara manual (karena kadang bug di React+Vite)
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// import api from "@/api/api"; 

const USE_DUMMY = true;

/* ============================
   REAL DATA UINSU
============================ */
const dummyCampusLocations = [
  {
    id: "cmp-1",
    name: "Kampus UINSU 4 (Tuntungan)",
    latitude: 3.493881,
    longitude: 98.58809,
    address: "Jl. Lap. Golf No.120, Kp. Tengah, Kec. Pancur Batu, Kabupaten Deli Serdang, Sumatera Utara 20353",
    allow_outside_radius: true,
    is_active: true,
  },
  {
    id: "cmp-2",
    name: "Kampus UINSU 2 (Pancing)",
    latitude: 3.617639, // Koordinat Pancing
    longitude: 98.711667,
    address: "JP3C+XGH, Gg. Belimbing, Sei Kera Hilir II, Kec. Medan Perjuangan, Kota Medan, Sumatera Utara 20222",
    allow_outside_radius: false,
    is_active: true,
  },
  {
    id: "cmp-3",
    name: "Kampus UINSU 1 (Sutomo)",
    latitude: 3.600456, // Koordinat Sutomo
    longitude: 98.685412,
    address: "Jl. IAIN No.1, Gaharu, Kec. Medan Tim., Kota Medan, Sumatera Utara 20235",
    allow_outside_radius: false,
    is_active: false,
  },
];

export default function CampusLocationPage() {
  const [campuses, setCampuses] = useState(
    USE_DUMMY ? dummyCampusLocations : []
  );

  /* ================= API MODE =================
  useEffect(() => {
    const fetchCampuses = async () => {
       try {
         const res = await api.get("/admin/campus-locations");
         setCampuses(res.data.data);
       } catch (err) {
         console.error(err);
       }
    };
    fetchCampuses();
  }, []);
  ============================================== */

  const toggleStatus = (id: string) => {
    if (USE_DUMMY) {
      setCampuses((prev) =>
        prev.map((c) =>
          c.id === id ? { ...c, is_active: !c.is_active } : c
        )
      );
      return;
    }
  };

  return (
    <div className="space-y-8 pb-10">
      
      {/* HEADER PAGE */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black uppercase text-[#0F1720] tracking-tight drop-shadow-[2px_2px_0px_rgba(0,0,0,0.2)]">
            Campus Locations
          </h1>
          <p className="text-[#0F1720] font-medium opacity-80 mt-1">
            Kelola titik lokasi kampus UINSU dan radius operasional.
          </p>
        </div>
        <div className="bg-[#EBFFDE] px-4 py-2 border-2 border-[#0F1720] shadow-[4px_4px_0px_0px_#0F1720] rounded-lg">
            <span className="text-xs font-bold uppercase text-[#0F1720]">Total Lokasi</span>
            <p className="text-2xl font-black text-[#0F1720]">{campuses.length}</p>
        </div>
      </div>

      {/* CARD LIST */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {campuses.map((campus) => (
          <Card 
            key={campus.id} 
            className="group relative overflow-hidden bg-white border-4 border-[#0F1720] shadow-[8px_8px_0px_0px_#0F1720] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[12px_12px_0px_0px_#0F1720] transition-all duration-200"
          >
            {/* Header */}
            <CardHeader className="bg-[#FFD166] p-4 border-b-4 border-[#0F1720] flex flex-row justify-between items-center space-y-0">
              <div className="flex items-center gap-3">
                 <div className="bg-white p-2 border-2 border-[#0F1720] shadow-[2px_2px_0px_0px_#0F1720] rounded-md">
                   <MapPin size={24} className="text-[#0F1720]" />
                 </div>
                 <div>
                    <CardTitle className="text-lg font-black uppercase text-[#0F1720] leading-tight">
                        {campus.name}
                    </CardTitle>
                    <span className="text-xs font-bold text-[#0F1720]/70 flex items-center gap-1">
                        <MapIcon size={12}/> {campus.latitude.toFixed(4)}, {campus.longitude.toFixed(4)}
                    </span>
                 </div>
              </div>
              
              <div className="flex flex-col items-end gap-1">
                 <Badge 
                    className={`border-2 border-[#0F1720] text-[#0F1720] font-bold shadow-[2px_2px_0px_0px_#0F1720] ${campus.is_active ? 'bg-[#0F8C3C] text-white' : 'bg-[#E11D48] text-white'}`}
                 >
                    {campus.is_active ? "ACTIVE" : "INACTIVE"}
                 </Badge>
                 <Switch
                    checked={campus.is_active}
                    onCheckedChange={() => toggleStatus(campus.id)}
                    className="data-[state=checked]:bg-[#0F1720] data-[state=unchecked]:bg-gray-300 border-2 border-[#0F1720]"
                 />
              </div>
            </CardHeader>

            <CardContent className="p-0">
               {/* MAP SECTION */}
               <div className="h-72 w-full relative z-0">
                  <MapContainer
                    center={[campus.latitude, campus.longitude]}
                    zoom={16} // Zoom lebih dekat biar kelihatan detail
                    scrollWheelZoom={true} // ✅ AKTIFKAN SCROLL
                    dragging={true} // ✅ AKTIFKAN DRAG
                    className="h-full w-full z-0"
                    style={{ height: "100%", width: "100%" }}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[campus.latitude, campus.longitude]}>
                      <Popup>
                        <div className="text-center">
                            <span className="font-bold text-sm block mb-1">{campus.name}</span>
                            <span className="text-xs">Titik Jemput Utama</span>
                        </div>
                      </Popup>
                    </Marker>
                  </MapContainer>
                  
                  {/* Overlay Address */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm p-3 border-2 border-[#0F1720] rounded-lg shadow-lg z-[400]">
                      <p className="text-xs font-bold text-[#0F1720] flex items-start gap-2 leading-snug">
                         <Globe size={14} className="mt-0.5 shrink-0 text-[#00B3A6]" />
                         {campus.address}
                      </p>
                  </div>
               </div>

               {/* Footer Info */}
               <div className="bg-[#E0F2FE] p-3 border-t-4 border-[#0F1720] flex items-center justify-between text-xs font-bold text-[#0F1720]">
                  <div className="flex items-center gap-2">
                     <Layers size={14} />
                     <span>Radius Luar:</span>
                  </div>
                  <Badge variant="outline" className="bg-white border-2 border-[#0F1720]">
                     {campus.allow_outside_radius ? "DIIZINKAN ✅" : "DILARANG 🚫"}
                  </Badge>
               </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}