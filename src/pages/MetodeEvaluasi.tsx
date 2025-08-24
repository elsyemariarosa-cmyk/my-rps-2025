import Layout from "@/components/Layout";
import { ClipboardCheck, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const MetodeEvaluasi = () => {
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
              <ClipboardCheck className="h-6 w-6 text-secondary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Metode Evaluasi</h1>
          </div>
        </div>

        <div className="card-academic max-w-5xl">
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground mb-6">
              Metode evaluasi berisi cara penilaian kemajuan belajar mahasiswa berupa komponen 
              penilaian, indikator penilaian, dan kriteria penilaian yang digunakan untuk 
              mengukur ketercapaian CPMK.
            </p>

            <div className="space-y-6">
              <div className="bg-secondary/5 p-6 rounded-lg border border-secondary/20">
                <h3 className="text-lg font-semibold mb-4 text-secondary">Komponen Penilaian</h3>
                <div className="grid gap-4">
                  <div className="bg-card p-4 rounded border">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-primary">Partisipasi & Kehadiran</h4>
                      <span className="text-lg font-bold text-primary">10%</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Keaktifan dalam diskusi kelas dan kehadiran perkuliahan</p>
                  </div>
                  
                  <div className="bg-card p-4 rounded border">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-secondary">Tugas & Praktikum</h4>
                      <span className="text-lg font-bold text-secondary">25%</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Tugas individu, kelompok, dan laporan praktikum</p>
                  </div>

                  <div className="bg-card p-4 rounded border">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-accent">Ujian Tengah Semester</h4>
                      <span className="text-lg font-bold text-accent">30%</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Evaluasi pencapaian CPMK 1-4 di pertengahan semester</p>
                  </div>

                  <div className="bg-card p-4 rounded border">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-destructive">Ujian Akhir Semester</h4>
                      <span className="text-lg font-bold text-destructive">35%</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Evaluasi komprehensif seluruh CPMK semester</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-primary/10 p-6 rounded-lg border border-primary/20">
                  <h3 className="text-lg font-semibold mb-3 text-primary">Teknik Penilaian</h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-sm">Penilaian Tertulis</h4>
                      <p className="text-xs text-muted-foreground">Ujian objektif, esai, dan analisis kasus</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Penilaian Praktik</h4>
                      <p className="text-xs text-muted-foreground">Demonstrasi keterampilan dan simulasi</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Penilaian Portofolio</h4>
                      <p className="text-xs text-muted-foreground">Kumpulan karya dan refleksi pembelajaran</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Penilaian Proyek</h4>
                      <p className="text-xs text-muted-foreground">Hasil kerja individual atau kelompok</p>
                    </div>
                  </div>
                </div>

                <div className="bg-success/10 p-6 rounded-lg border border-success/20">
                  <h3 className="text-lg font-semibold mb-3 text-success">Kriteria Penilaian</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>A (Sangat Baik)</span>
                      <span className="font-semibold">86 - 100</span>
                    </div>
                    <div className="flex justify-between">
                      <span>A- (Baik Sekali)</span>
                      <span className="font-semibold">81 - 85</span>
                    </div>
                    <div className="flex justify-between">
                      <span>B+ (Baik)</span>
                      <span className="font-semibold">76 - 80</span>
                    </div>
                    <div className="flex justify-between">
                      <span>B (Cukup Baik)</span>
                      <span className="font-semibold">71 - 75</span>
                    </div>
                    <div className="flex justify-between">
                      <span>B- (Cukup)</span>
                      <span className="font-semibold">66 - 70</span>
                    </div>
                    <div className="flex justify-between">
                      <span>C+ (Kurang Baik)</span>
                      <span className="font-semibold">61 - 65</span>
                    </div>
                    <div className="flex justify-between">
                      <span>C (Kurang)</span>
                      <span className="font-semibold">56 - 60</span>
                    </div>
                    <div className="flex justify-between">
                      <span>D (Sangat Kurang)</span>
                      <span className="font-semibold">41 - 55</span>
                    </div>
                    <div className="flex justify-between">
                      <span>E (Tidak Lulus)</span>
                      <span className="font-semibold">≤ 40</span>
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

export default MetodeEvaluasi;