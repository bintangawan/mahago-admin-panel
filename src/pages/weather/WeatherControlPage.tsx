import { useState } from "react";
import { 
    CloudRain, 
    Sun, 
    ThermometerSun, 
    CloudLightning,
    MapPin 
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

// import api from "@/api/api";

const USE_DUMMY = true;

/* ============================
   DUMMY WEATHER DATA
============================ */
const dummyWeather = [
  {
    id: "cmp-1",
    campus_name: "Kampus UINSU 1 (Sutomo)",
    is_raining: false,
    last_updated: "2024-02-08T10:00:00Z"
  },
  {
    id: "cmp-2",
    campus_name: "Kampus UINSU 4 (Tuntungan)",
    is_raining: true,
    last_updated: "2024-02-08T10:05:00Z"
  },
  {
    id: "cmp-3",
    campus_name: "Kampus UINSU 2 (Pancing)",
    is_raining: false,
    last_updated: "2024-02-08T09:45:00Z"
  },
];

export default function WeatherControlPage() {
  const [weather, setWeather] = useState(
    USE_DUMMY ? dummyWeather : []
  );

  /* ================= API MODE =================
  useEffect(() => {
    const fetchWeather = async () => {
        try {
            const res = await api.get("/admin/weather");
            setWeather(res.data.data);
        } catch(err) { console.error(err) }
    }
    fetchWeather();
  }, []);
  ============================================== */

  const toggleRain = (id: string) => {
    if (USE_DUMMY) {
      setWeather((prev) =>
        prev.map((w) =>
          w.id === id ? { ...w, is_raining: !w.is_raining } : w
        )
      );
      return;
    }

    /* ================= API MODE =================
    api.post(`/admin/weather/${id}/rain/toggle`)
       .then(() => {
          // Optional: Refresh data
       });
    ============================================== */
  };

  return (
    <div className="space-y-8 pb-10">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black uppercase text-[#0F1720] tracking-tight drop-shadow-[2px_2px_0px_rgba(0,0,0,0.2)]">
            Weather Control
          </h1>
          <p className="text-[#0F1720] font-medium opacity-80 mt-1">
            Atur status cuaca hujan di setiap area kampus (Rain Mode).
          </p>
        </div>
        
        {/* Summary Widget */}
        <div className="flex gap-3">
             <div className="bg-[#E0F2FE] px-4 py-2 border-2 border-[#0F1720] shadow-[4px_4px_0px_0px_#0F1720] rounded-lg flex items-center gap-2">
                <Sun size={20} className="text-[#0F1720]"/>
                <div>
                    <span className="text-[10px] font-bold uppercase text-[#0F1720] block leading-none">Cerah</span>
                    <span className="text-xl font-black text-[#0F1720]">{weather.filter(w => !w.is_raining).length}</span>
                </div>
            </div>
            <div className="bg-[#E11D48] px-4 py-2 border-2 border-[#0F1720] shadow-[4px_4px_0px_0px_#0F1720] rounded-lg flex items-center gap-2 text-white">
                <CloudRain size={20} className="text-white"/>
                <div>
                    <span className="text-[10px] font-bold uppercase text-white block leading-none">Hujan</span>
                    <span className="text-xl font-black text-white">{weather.filter(w => w.is_raining).length}</span>
                </div>
            </div>
        </div>
      </div>

      {/* WEATHER GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {weather.map((w) => (
          <Card 
            key={w.id} 
            className={`
                group relative overflow-hidden border-4 border-[#0F1720] shadow-[6px_6px_0px_0px_#0F1720] 
                hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0px_0px_#0F1720] 
                transition-all duration-200
                ${w.is_raining ? "bg-[#E11D48]" : "bg-[#FEF9C3]"}
            `}
          >
            <CardHeader className="p-5 flex flex-row items-start justify-between space-y-0 border-b-4 border-[#0F1720] bg-white">
                <div className="flex items-start gap-3">
                    <div className={`p-2 border-2 border-[#0F1720] rounded-md shadow-[2px_2px_0px_0px_#0F1720] ${w.is_raining ? "bg-[#E11D48] text-white" : "bg-[#FFD166] text-[#0F1720]"}`}>
                        {w.is_raining ? <CloudLightning size={24} /> : <ThermometerSun size={24} />}
                    </div>
                    <div>
                        <CardTitle className="text-lg font-black uppercase text-[#0F1720] leading-tight max-w-[150px]">
                            {w.campus_name}
                        </CardTitle>
                        <div className="flex items-center gap-1 text-xs font-bold text-[#0F1720]/60 mt-1">
                            <MapPin size={10} /> Area Kampus
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-1">
                    <Switch
                        checked={w.is_raining}
                        onCheckedChange={() => toggleRain(w.id)}
                        className="data-[state=checked]:bg-[#0F1720] border-2 border-[#0F1720]"
                    />
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#0F1720]">
                        {w.is_raining ? "ON" : "OFF"}
                    </span>
                </div>
            </CardHeader>

            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-2">
                 <p className={`text-sm font-bold ${w.is_raining ? "text-white" : "text-[#0F1720]"}`}>Status Saat Ini:</p>
                 <Badge 
                    className={`border-2 border-[#0F1720] shadow-[2px_2px_0px_0px_#0F1720] text-sm px-3 py-1 font-black uppercase ${
                        w.is_raining ? "bg-white text-[#E11D48]" : "bg-[#0F8C3C] text-white"
                    }`}
                 >
                    {w.is_raining ? "HUJAN DERAS ⛈️" : "CERAH BERAWAN 🌤️"}
                 </Badge>
              </div>
              
              <p className={`text-xs font-bold opacity-80 mt-4 ${w.is_raining ? "text-white" : "text-[#0F1720]"}`}>
                 *Mengaktifkan mode hujan akan menaikkan tarif layanan di area ini.
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}