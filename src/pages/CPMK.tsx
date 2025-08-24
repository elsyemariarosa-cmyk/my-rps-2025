import Layout from "@/components/Layout";
import { Award, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const CPMK = () => {
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
              <Award className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Capaian Pembelajaran Mata Kuliah (CPMK)</h1>
          </div>
        </div>

        <div className="card-academic max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground mb-6">
              CPMK adalah kemampuan yang dijabarkan secara spesifik dari CPL yang dibebankan 
              pada mata kuliah, dan bersifat spesifik terhadap bahan kajian atau materi pembelajaran 
              mata kuliah tersebut.
            </p>

            <div className="space-y-6">
              <div className="bg-primary/5 p-6 rounded-lg border border-primary/20">
                <h3 className="text-lg font-semibold mb-4 text-primary">Struktur CPMK</h3>
                <div className="space-y-4">
                  <div className="bg-card p-4 rounded border-l-4 border-l-primary">
                    <h4 className="font-medium mb-2">CPMK 1</h4>
                    <p className="text-sm text-muted-foreground">
                      Mahasiswa mampu memahami dan menjelaskan konsep dasar [topik mata kuliah] 
                      sesuai dengan standar profesi
                    </p>
                  </div>
                  <div className="bg-card p-4 rounded border-l-4 border-l-secondary">
                    <h4 className="font-medium mb-2">CPMK 2</h4>
                    <p className="text-sm text-muted-foreground">
                      Mahasiswa mampu menganalisis dan mengevaluasi [aspek khusus mata kuliah] 
                      dengan menggunakan metode yang tepat
                    </p>
                  </div>
                  <div className="bg-card p-4 rounded border-l-4 border-l-accent">
                    <h4 className="font-medium mb-2">CPMK 3</h4>
                    <p className="text-sm text-muted-foreground">
                      Mahasiswa mampu menerapkan pengetahuan [mata kuliah] dalam situasi nyata 
                      sesuai dengan standar operasional
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-muted/30 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Karakteristik CPMK yang Baik</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• <strong>Spesifik:</strong> Jelas dan terarah pada kemampuan tertentu</li>
                    <li>• <strong>Measurable:</strong> Dapat diukur dan dinilai</li>
                    <li>• <strong>Achievable:</strong> Dapat dicapai oleh mahasiswa</li>
                  </ul>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• <strong>Relevant:</strong> Sesuai dengan CPL dan profil lulusan</li>
                    <li>• <strong>Time-bound:</strong> Memiliki batasan waktu yang jelas</li>
                    <li>• <strong>Observable:</strong> Dapat diamati pencapaiannya</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CPMK;