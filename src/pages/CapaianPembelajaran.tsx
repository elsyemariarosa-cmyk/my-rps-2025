import Layout from "@/components/Layout";
import { Target, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const CapaianPembelajaran = () => {
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
              <Target className="h-6 w-6 text-secondary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Capaian Pembelajaran (CPL)</h1>
          </div>
        </div>

        <div className="card-academic max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground mb-6">
              Capaian Pembelajaran Lulusan (CPL) adalah kemampuan yang diperoleh melalui 
              internalisasi pengetahuan, sikap, keterampilan, kompetensi, dan akumulasi 
              pengalaman kerja yang sesuai dengan profil lulusan program studi MARS.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-primary/10 p-6 rounded-lg border border-primary/20">
                <h3 className="text-lg font-semibold mb-3 text-primary">CPL Sikap</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Bertakwa kepada Tuhan Yang Maha Esa</li>
                  <li>• Menjunjung tinggi nilai kemanusiaan</li>
                  <li>• Berperan sebagai warga negara yang bangga dan cinta tanah air</li>
                  <li>• Berkontribusi dalam peningkatan mutu kehidupan bermasyarakat</li>
                </ul>
              </div>

              <div className="bg-secondary/10 p-6 rounded-lg border border-secondary/20">
                <h3 className="text-lg font-semibold mb-3 text-secondary">CPL Pengetahuan</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Menguasai konsep teoritis bidang rekam medis</li>
                  <li>• Menguasai prinsip dan teknik analisis data kesehatan</li>
                  <li>• Menguasai sistem informasi kesehatan</li>
                  <li>• Memahami aspek hukum dan etika profesi</li>
                </ul>
              </div>

              <div className="bg-accent/10 p-6 rounded-lg border border-accent/20">
                <h3 className="text-lg font-semibold mb-3 text-accent">CPL Keterampilan Umum</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Mampu menerapkan pemikiran logis, kritis, sistematis, dan inovatif</li>
                  <li>• Mampu menunjukkan kinerja mandiri, bermutu, dan terukur</li>
                  <li>• Mampu mengkaji implikasi pengembangan ilmu pengetahuan</li>
                </ul>
              </div>

              <div className="bg-success/10 p-6 rounded-lg border border-success/20">
                <h3 className="text-lg font-semibold mb-3 text-success">CPL Keterampilan Khusus</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Mampu melakukan pengkodean diagnosis dan tindakan medis</li>
                  <li>• Mampu mengelola rekam medis elektronik</li>
                  <li>• Mampu melakukan analisis data rekam medis</li>
                  <li>• Mampu melakukan audit klinis sederhana</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CapaianPembelajaran;