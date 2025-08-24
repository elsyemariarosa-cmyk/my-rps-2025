import Layout from "@/components/Layout";
import { TrendingUp, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const SubCPMK = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link 
            to="/" 
            className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-secondary rounded-lg">
              <TrendingUp className="h-6 w-6 text-secondary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Sub-Capaian Pembelajaran Mata Kuliah</h1>
          </div>
        </div>

        <div className="card-academic max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground mb-6">
              Sub-CPMK adalah penjabaran lebih detail dari CPMK yang menggambarkan kemampuan 
              spesifik yang harus dicapai mahasiswa pada setiap tahapan pembelajaran dalam 
              satu semester.
            </p>

            <div className="space-y-6">
              <div className="bg-secondary/5 p-6 rounded-lg border border-secondary/20">
                <h3 className="text-lg font-semibold mb-4 text-secondary">Hierarki Sub-CPMK</h3>
                <div className="space-y-4">
                  <div className="bg-card p-4 rounded border">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">1</div>
                      <h4 className="font-medium">CPMK 1: Memahami Konsep Dasar</h4>
                    </div>
                    <div className="ml-11 space-y-2">
                      <div className="bg-primary/5 p-3 rounded text-sm">
                        <strong>Sub-CPMK 1.1:</strong> Menjelaskan definisi dan ruang lingkup
                      </div>
                      <div className="bg-primary/5 p-3 rounded text-sm">
                        <strong>Sub-CPMK 1.2:</strong> Mengidentifikasi komponen-komponen utama
                      </div>
                      <div className="bg-primary/5 p-3 rounded text-sm">
                        <strong>Sub-CPMK 1.3:</strong> Membandingkan berbagai pendekatan teoritis
                      </div>
                    </div>
                  </div>

                  <div className="bg-card p-4 rounded border">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center text-sm font-semibold">2</div>
                      <h4 className="font-medium">CPMK 2: Menganalisis dan Mengevaluasi</h4>
                    </div>
                    <div className="ml-11 space-y-2">
                      <div className="bg-secondary/5 p-3 rounded text-sm">
                        <strong>Sub-CPMK 2.1:</strong> Melakukan analisis situasional
                      </div>
                      <div className="bg-secondary/5 p-3 rounded text-sm">
                        <strong>Sub-CPMK 2.2:</strong> Mengevaluasi efektivitas metode
                      </div>
                      <div className="bg-secondary/5 p-3 rounded text-sm">
                        <strong>Sub-CPMK 2.3:</strong> Menyimpulkan hasil analisis
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-accent/10 p-6 rounded-lg border border-accent/20">
                <h3 className="text-lg font-semibold mb-3 text-accent">Pedoman Penyusunan Sub-CPMK</h3>
                <div className="grid gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-sm">Gunakan kata kerja operasional yang terukur</p>
                      <p className="text-xs text-muted-foreground">Contoh: menjelaskan, mengidentifikasi, menganalisis, mengevaluasi</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-sm">Sesuaikan dengan tingkat taksonomi Bloom</p>
                      <p className="text-xs text-muted-foreground">Dari C1 (mengingat) hingga C6 (mencipta)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-sm">Pastikan dapat dinilai secara objektif</p>
                      <p className="text-xs text-muted-foreground">Setiap sub-CPMK harus memiliki indikator penilaian yang jelas</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SubCPMK;