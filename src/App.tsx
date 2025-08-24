import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DeskripsiMataKuliah from "./pages/DeskripsiMataKuliah";
import CapaianPembelajaran from "./pages/CapaianPembelajaran";
import CPMK from "./pages/CPMK";
import SubCPMK from "./pages/SubCPMK";
import RencanaKegiatanPembelajaran from "./pages/RencanaKegiatanPembelajaran";
import MetodeEvaluasi from "./pages/MetodeEvaluasi";
import Referensi from "./pages/Referensi";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/deskripsi-mata-kuliah" element={<DeskripsiMataKuliah />} />
          <Route path="/capaian-pembelajaran" element={<CapaianPembelajaran />} />
          <Route path="/cpmk" element={<CPMK />} />
          <Route path="/sub-cpmk" element={<SubCPMK />} />
          <Route path="/rencana-kegiatan-pembelajaran" element={<RencanaKegiatanPembelajaran />} />
          <Route path="/metode-evaluasi" element={<MetodeEvaluasi />} />
          <Route path="/referensi" element={<Referensi />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
