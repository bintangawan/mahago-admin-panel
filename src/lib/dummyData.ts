/* ======================================================
   DUMMY DATA – ADMIN PANEL MAHAGO
   Switch ke API tinggal stop import file ini
====================================================== */

// Path dummy image (pastikan file ada di public/images/forall.jpg)
const DUMMY_IMG = "/images/forall.jpg";

/* ===========================
   DRIVER (ADMIN VERIFICATION)
=========================== */
export const dummyDrivers = Array.from({ length: 10 }).map((_, i) => ({
  id: `drv-${i + 1}`,
  name: `Driver ${i + 1}`,
  email: `driver${i + 1}@gmail.com`,
  phone: `08123${i}56789`,
  vehicle_type: "motor",
  plate_number: `BK ${1000 + i} XY`,
  status: "pending", // pending, approved, rejected
  profile_photo: DUMMY_IMG, 
  created_at: new Date().toISOString(),
}));

export const dummyDriverDetail = {
  // --- Data dari Register ---
  id: "drv-1",
  name: "Driver 1",
  email: "driver1@gmail.com",
  phone: "08123456789",
  vehicle_type: "motor", // atau 'car'
  plate_number: "BK 1234 XY",
  sim_or_ktm_number: "198273123", // Sesuai API Register
  sim_or_ktm_photo: DUMMY_IMG,    // Sesuai API Register

  // --- Data dari Complete Profile ---
  vehicle_brand: "Honda",
  vehicle_model: "Vario",
  vehicle_year: "2012",
  vehicle_color: "Red",
  
  stnk_number: "STNK-98765",
  stnk_photo: DUMMY_IMG,
  
  vehicle_photo: DUMMY_IMG,
  profile_photo: DUMMY_IMG,
  
  emergency_contact_name: "Ali (Saudara)",
  emergency_contact_phone: "08957152376123",
  blood_type: "A",

  // --- Meta Data System ---
  status: "pending",
  address: "Jl. Mahago No. 1", // Tambahan umum
  created_at: "2026-02-08T10:00:00Z",
};

/* ===========================
   TOPUP (ADMIN)
=========================== */
export const dummyTopups = Array.from({ length: 10 }).map((_, i) => ({
  id: `tp-${i + 1}`,
  driver_name: `Driver ${i + 1}`,
  amount: (i + 1) * 10000,
  payment_method: i % 2 === 0 ? "bank_transfer" : "e-wallet",
  payment_proof: DUMMY_IMG,
  status: "pending",
  created_at: new Date().toISOString(),
}));

export const dummyTopupDetail = {
  id: "tp-1",
  driver_id: "drv-1",
  driver_name: "Driver 1",
  
  // Sesuai API Topup Request
  amount: 50000,
  payment_method: "e-wallet", // cash, bank_transfer, e-wallet
  payment_proof: DUMMY_IMG,
  payment_account_name: "Driver 1",   // Jika non-cash
  payment_account_number: "08123456", // Jika non-cash

  status: "pending",
  created_at: "2026-02-08T12:00:00Z",
};

/* ===========================
   DASHBOARD SUMMARY
=========================== */
export const dummyDashboardStats = {
  totalDriversPending: 15,
  totalTopupsPending: 8,
  totalMerchants: 5,
  apiStatus: "DOWN",
  authMode: "LOCAL_MOCK",
};