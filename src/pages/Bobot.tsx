import Layout from "@/components/Layout";
import { BarChart, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Bobot = () => {
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
            <div className="p-3 bg-gradient-primary rounded-lg">
              <BarChart className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Bobot (Persentase)</h1>
          </div>
        </div>

        <div className="card-academic max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground mb-6">
              Bobot atau persentase menunjukkan distribusi nilai untuk setiap komponen penilaian 
              dalam mata kuliah, yang digunakan untuk menghitung nilai akhir mahasiswa secara objektif 
              dan proporsional.
            </p>

            <div className="space-y-6">
              <div className="bg-primary/5 p-6 rounded-lg border border-primary/20">
                <h3 className="text-lg font-semibold mb-4 text-primary">Distribusi Bobot Penilaian</h3>
                
                <div className="space-y-4">
                  <div className="bg-card rounded-lg border overflow-hidden">
                    <div className="p-4 bg-muted/30">
                      <h4 className="font-semibold">Komponen Penilaian dan Bobot</h4>
                    </div>
                    <div className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-primary/5 rounded border-l-4 border-l-primary">
                          <div>
                            <h5 className="font-medium">Kehadiran & Partisipasi</h5>
                            <p className="text-sm text-muted-foreground">Keaktifan dalam kelas dan diskusi</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary">10%</div>
                            <div className="text-xs text-muted-foreground">Bobot minimum</div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-secondary/5 rounded border-l-4 border-l-secondary">
                          <div>
                            <h5 className="font-medium">Tugas & Quiz</h5>
                            <p className="text-sm text-muted-foreground">Tugas individu, kelompok, dan kuis</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-secondary">20%</div>
                            <div className="text-xs text-muted-foreground">Formatif</div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-accent/5 rounded border-l-4 border-l-accent">
                          <div>
                            <h5 className="font-medium">Ujian Tengah Semester (UTS)</h5>
                            <p className="text-sm text-muted-foreground">Evaluasi pada pertengahan semester</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-accent">30%</div>
                            <div className="text-xs text-muted-foreground">Sumatif 1</div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-destructive/5 rounded border-l-4 border-l-destructive">
                          <div>
                            <h5 className="font-medium">Ujian Akhir Semester (UAS)</h5>
                            <p className="text-sm text-muted-foreground">Evaluasi komprehensif akhir semester</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-destructive">40%</div>
                            <div className="text-xs text-muted-foreground">Sumatif 2</div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 p-3 bg-success/10 rounded border border-success/20">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-success">Total Bobot</span>
                          <span className="text-2xl font-bold text-success">100%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-secondary/10 p-6 rounded-lg border border-secondary/20">
                  <h3 className="text-lg font-semibold mb-3 text-secondary">Rumus Perhitungan</h3>
                  <div className="bg-card p-4 rounded border text-sm font-mono">
                    <p className="mb-2"><strong>Nilai Akhir =</strong></p>
                    <p>(Kehadiran × 0.10) +</p>
                    <p>(Tugas × 0.20) +</p>
                    <p>(UTS × 0.30) +</p>
                    <p>(UAS × 0.40)</p>
                  </div>
                  <div className="mt-3 text-xs text-muted-foreground">
                    <p><strong>Contoh:</strong> Kehadiran: 85, Tugas: 90, UTS: 80, UAS: 85</p>
                    <p><strong>Nilai Akhir:</strong> (85×0.1) + (90×0.2) + (80×0.3) + (85×0.4) = 84.5</p>
                  </div>
                </div>

                <div className="bg-accent/10 p-6 rounded-lg border border-accent/20">
                  <h3 className="text-lg font-semibold mb-3 text-accent">Ketentuan Bobot</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• <strong>Kehadiran minimum:</strong> 5-15% dari total nilai</li>
                    <li>• <strong>Tugas formatif:</strong> 15-25% untuk evaluasi berkala</li>
                    <li>• <strong>UTS:</strong> 25-35% untuk evaluasi tengah semester</li>
                    <li>• <strong>UAS:</strong> 35-45% sebagai evaluasi komprehensif</li>
                    <li>• <strong>Total bobot:</strong> Harus tepat 100%</li>
                    <li>• <strong>Transparansi:</strong> Diinformasikan di awal semester</li>
                  </ul>
                </div>
              </div>

              <div className="bg-muted/30 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Prinsip Pembobotan</h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h4 className="font-medium mb-2 text-primary">Proporsional</h4>
                    <p className="text-muted-foreground">Bobot sesuai dengan tingkat kesulitan dan pentingnya komponen penilaian</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 text-secondary">Adil</h4>
                    <p className="text-muted-foreground">Memberikan kesempatan yang sama bagi semua mahasiswa untuk meraih nilai optimal</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 text-accent">Terukur</h4>
                    <p className="text-muted-foreground">Setiap komponen dapat dinilai secara objektif dan konsisten</p>
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

export default Bobot;