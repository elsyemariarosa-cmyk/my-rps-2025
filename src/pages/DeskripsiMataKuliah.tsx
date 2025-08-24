import Layout from "@/components/Layout";
import { BookOpen, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const DeskripsiMataKuliah = () => {
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
              <BookOpen className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Deskripsi Mata Kuliah</h1>
          </div>
        </div>

        <div className="card-academic max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground mb-6">
              Bagian ini berisi deskripsi lengkap mengenai mata kuliah yang akan dipelajari, 
              termasuk tujuan pembelajaran, ruang lingkup materi, dan konteks mata kuliah 
              dalam kurikulum program studi MARS.
            </p>

            <div className="space-y-6">
              <div className="bg-muted/30 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-primary">Format Deskripsi</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Gambaran umum mata kuliah</li>
                  <li>• Tujuan pembelajaran umum</li>
                  <li>• Ruang lingkup materi</li>
                  <li>• Prasyarat mata kuliah (jika ada)</li>
                  <li>• Bobot SKS dan jam pembelajaran</li>
                </ul>
              </div>

              <div className="bg-secondary/10 p-6 rounded-lg border border-secondary/20">
                <h3 className="text-lg font-semibold mb-3 text-secondary">Contoh Template</h3>
                <div className="bg-card p-4 rounded border text-sm">
                  <p className="italic text-muted-foreground">
                    "Mata kuliah ini membahas tentang [topik utama] yang mencakup [ruang lingkup materi]. 
                    Mahasiswa akan mempelajari [komponen pembelajaran utama] untuk mencapai kemampuan [tujuan pembelajaran]. 
                    Mata kuliah ini merupakan [posisi dalam kurikulum] dengan bobot [jumlah SKS] SKS."
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

export default DeskripsiMataKuliah;