import Layout from "@/components/Layout";
import { BookMarked, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Referensi = () => {
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
              <BookMarked className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Referensi</h1>
          </div>
        </div>

        <div className="card-academic max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground mb-6">
              Daftar referensi berisi sumber-sumber pustaka yang digunakan dalam pembelajaran 
              mata kuliah, meliputi buku teks, jurnal ilmiah, artikel, dan sumber digital 
              yang relevan dengan capaian pembelajaran.
            </p>

            <div className="space-y-6">
              <div className="bg-primary/5 p-6 rounded-lg border border-primary/20">
                <h3 className="text-lg font-semibold mb-4 text-primary">Referensi Utama</h3>
                <div className="space-y-4">
                  <div className="bg-card p-4 rounded border-l-4 border-l-primary">
                    <h4 className="font-medium text-sm mb-1">Buku Teks Wajib</h4>
                    <p className="text-sm text-muted-foreground">
                      [Nama Pengarang]. (Tahun). <em>Judul Buku Utama Mata Kuliah</em>. Edisi ke-X. 
                      Kota Penerbit: Nama Penerbit.
                    </p>
                  </div>
                  
                  <div className="bg-card p-4 rounded border-l-4 border-l-secondary">
                    <h4 className="font-medium text-sm mb-1">Buku Pendukung</h4>
                    <p className="text-sm text-muted-foreground">
                      [Nama Pengarang]. (Tahun). <em>Judul Buku Pendukung</em>. 
                      Kota Penerbit: Nama Penerbit.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-secondary/5 p-6 rounded-lg border border-secondary/20">
                <h3 className="text-lg font-semibold mb-4 text-secondary">Jurnal dan Artikel Ilmiah</h3>
                <div className="space-y-3">
                  <div className="bg-card p-3 rounded text-sm">
                    <p className="text-muted-foreground">
                      [Nama Pengarang]. (Tahun). Judul artikel jurnal. <em>Nama Jurnal</em>, 
                      Volume(Nomor), halaman. DOI atau URL
                    </p>
                  </div>
                  <div className="bg-card p-3 rounded text-sm">
                    <p className="text-muted-foreground">
                      [Nama Pengarang]. (Tahun). Judul artikel penelitian terkait. <em>Nama Jurnal Internasional</em>, 
                      Volume(Nomor), halaman. DOI
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-accent/10 p-6 rounded-lg border border-accent/20">
                  <h3 className="text-lg font-semibold mb-3 text-accent">Sumber Digital</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <h4 className="font-medium">Database Online</h4>
                      <p className="text-muted-foreground text-xs">PubMed, ScienceDirect, ProQuest</p>
                    </div>
                    <div>
                      <h4 className="font-medium">E-Learning Platform</h4>
                      <p className="text-muted-foreground text-xs">Coursera, edX, Khan Academy</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Website Profesional</h4>
                      <p className="text-muted-foreground text-xs">Asosiasi profesi dan organisasi terkait</p>
                    </div>
                  </div>
                </div>

                <div className="bg-success/10 p-6 rounded-lg border border-success/20">
                  <h3 className="text-lg font-semibold mb-3 text-success">Pedoman Penulisan</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>• Gunakan format APA Style untuk konsistensi</p>
                    <p>• Prioritaskan sumber terbaru (5-10 tahun terakhir)</p>
                    <p>• Sertakan minimal 70% referensi primer</p>
                    <p>• Pastikan semua referensi dapat diakses mahasiswa</p>
                    <p>• Verifikasi keakuratan semua data bibliografi</p>
                  </div>
                </div>
              </div>

              <div className="bg-muted/30 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Catatan Penting</h3>
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>
                    <strong>Aksesibilitas:</strong> Pastikan mahasiswa dapat mengakses semua referensi 
                    yang diperlukan melalui perpustakaan atau sumber legal lainnya.
                  </p>
                  <p>
                    <strong>Relevansi:</strong> Semua referensi harus relevan dengan CPMK dan 
                    mendukung pencapaian tujuan pembelajaran mata kuliah.
                  </p>
                  <p>
                    <strong>Update:</strong> Lakukan pembaruan referensi secara berkala untuk 
                    memastikan kesesuaian dengan perkembangan ilmu pengetahuan terkini.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Referensi;