import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Target, ListChecks, GitBranch, Calendar, CheckCircle, BarChart3, BookMarked } from "lucide-react";

const CourseRPS = () => {
  const { semester, courseSlug } = useParams();
  
  // Course data mapping
  const courseData: Record<string, Record<string, { name: string; sks: number; code: string }>> = {
    "semester-1": {
      "literasi-digital-akademik": { name: "Literasi Digital Akademik", sks: 1, code: "MRS101" },
      "manajemen-pelayanan-rs": { name: "Manajemen Pelayanan RS", sks: 4, code: "MRS102" },
      "pengantar-manajemen-keuangan": { name: "Pengantar Manajemen Keuangan", sks: 2, code: "MRS103" },
      "digitalisasi-rs": { name: "Digitalisasi RS", sks: 2, code: "MRS104" },
      "metodologi-penelitian-pelayanan-kesehatan": { name: "Metodologi Penelitian Pelayanan Kesehatan", sks: 4, code: "MRS105" },
      "manajemen-keuangan-rs": { name: "Manajemen Keuangan RS", sks: 2, code: "MRS106" }
    },
    "semester-2": {
      "manajemen-sdm-perilaku-kepemimpinan-rs": { name: "Manajemen SDM, Perilaku dan Kepemimpinan RS", sks: 3, code: "MRS201" },
      "manajemen-pencegahan-pengendalian-infeksi-rs": { name: "Manajemen Pencegahan dan Pengendalian Infeksi RS", sks: 2, code: "MRS202" },
      "pemberdayaan-masyarakat-kesehatan": { name: "Pemberdayaan Masyarakat Kesehatan", sks: 4, code: "MRS203" },
      "manajemen-pemasaran-jasa-kesehatan": { name: "Manajemen Pemasaran Jasa Kesehatan", sks: 2, code: "MRS204" },
      "manajemen-pelayanan-khusus-rs": { name: "Manajemen Pelayanan Khusus RS", sks: 2, code: "MRS205" },
      "manajemen-strategik-rs": { name: "Manajemen Strategik RS", sks: 3, code: "MRS206" },
      "publikasi-ilmiah": { name: "Publikasi Ilmiah", sks: 6, code: "MRS207" }
    },
    "semester-3": {
      "blok-elektif": { name: "Blok Elektif", sks: 2, code: "MRS301" },
      "residensi": { name: "Residensi", sks: 3, code: "MRS302" },
      "tesis": { name: "Tesis", sks: 12, code: "MRS303" }
    }
  };

  const course = courseData[semester || ""]?.[courseSlug || ""];
  
  if (!course) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Mata Kuliah Tidak Ditemukan</h1>
          <p className="text-muted-foreground">Silakan pilih mata kuliah dari menu RPS.</p>
        </div>
      </Layout>
    );
  }

  const semesterName = semester?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <Layout>
      {/* Header Section */}
      <section className="bg-gradient-to-r from-primary to-primary-foreground text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                <BookOpen className="h-8 w-8" />
              </div>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                {course.code}
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                {course.sks} SKS
              </Badge>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              {course.name}
            </h1>
            <p className="text-white/90 text-lg">
              Rencana Pembelajaran Semester - {semesterName}
            </p>
          </div>
        </div>
      </section>

      {/* RPS Content */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="deskripsi" className="w-full">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 mb-8">
              <TabsTrigger value="deskripsi" className="text-xs">
                <BookOpen className="h-4 w-4 mr-1" />
                Deskripsi
              </TabsTrigger>
              <TabsTrigger value="cpl" className="text-xs">
                <Target className="h-4 w-4 mr-1" />
                CPL
              </TabsTrigger>
              <TabsTrigger value="cpmk" className="text-xs">
                <ListChecks className="h-4 w-4 mr-1" />
                CPMK
              </TabsTrigger>
              <TabsTrigger value="subcpmk" className="text-xs">
                <GitBranch className="h-4 w-4 mr-1" />
                Sub-CPMK
              </TabsTrigger>
              <TabsTrigger value="rencana" className="text-xs">
                <Calendar className="h-4 w-4 mr-1" />
                Rencana
              </TabsTrigger>
              <TabsTrigger value="evaluasi" className="text-xs">
                <CheckCircle className="h-4 w-4 mr-1" />
                Evaluasi
              </TabsTrigger>
              <TabsTrigger value="bobot" className="text-xs">
                <BarChart3 className="h-4 w-4 mr-1" />
                Bobot
              </TabsTrigger>
              <TabsTrigger value="referensi" className="text-xs">
                <BookMarked className="h-4 w-4 mr-1" />
                Referensi
              </TabsTrigger>
            </TabsList>

            <TabsContent value="deskripsi">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Deskripsi Mata Kuliah
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Deskripsi Singkat</h4>
                    <p className="text-muted-foreground">
                      Mata kuliah ini memberikan pemahaman komprehensif tentang konsep dan praktik dalam bidang {course.name.toLowerCase()}, 
                      dengan fokus pada pengembangan kompetensi yang sesuai dengan kebutuhan industri kesehatan modern.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Manfaat Mata Kuliah</h4>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>Mengembangkan pemahaman teoritis dan praktis</li>
                      <li>Meningkatkan kemampuan analisis dan problem solving</li>
                      <li>Mempersiapkan mahasiswa untuk dunia kerja profesional</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cpl">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Capaian Pembelajaran Lulusan (CPL)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold mb-2">CPL-1: Sikap dan Tata Nilai</h4>
                      <p className="text-muted-foreground text-sm">
                        Menunjukkan sikap bertakwa kepada Tuhan Yang Maha Esa dan mampu menunjukkan sikap religius, 
                        berjiwa Pancasila, dan berkepribadian Indonesia.
                      </p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold mb-2">CPL-2: Penguasaan Pengetahuan</h4>
                      <p className="text-muted-foreground text-sm">
                        Menguasai konsep teoritis dan praktis dalam bidang manajemen dan administrasi rumah sakit.
                      </p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold mb-2">CPL-3: Keterampilan Khusus</h4>
                      <p className="text-muted-foreground text-sm">
                        Mampu mengaplikasikan pengetahuan dan keterampilan dalam pengelolaan rumah sakit secara efektif.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cpmk">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ListChecks className="h-5 w-5" />
                    Capaian Pembelajaran Mata Kuliah (CPMK)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border-l-4 border-primary bg-primary/5">
                      <h4 className="font-semibold mb-2">CPMK-1</h4>
                      <p className="text-muted-foreground text-sm">
                        Mampu memahami dan menjelaskan konsep dasar {course.name.toLowerCase()}.
                      </p>
                    </div>
                    <div className="p-4 border-l-4 border-secondary bg-secondary/5">
                      <h4 className="font-semibold mb-2">CPMK-2</h4>
                      <p className="text-muted-foreground text-sm">
                        Mampu menganalisis permasalahan dan memberikan solusi yang tepat.
                      </p>
                    </div>
                    <div className="p-4 border-l-4 border-accent bg-accent/5">
                      <h4 className="font-semibold mb-2">CPMK-3</h4>
                      <p className="text-muted-foreground text-sm">
                        Mampu mengimplementasikan konsep dalam situasi nyata.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="subcpmk">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GitBranch className="h-5 w-5" />
                    Sub-Capaian Pembelajaran Mata Kuliah
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <div key={num} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                        <Badge variant="outline" className="mt-0.5">Sub-CPMK-{num}</Badge>
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground">
                            Mampu menjelaskan aspek khusus dari {course.name.toLowerCase()} 
                            dengan tingkat pemahaman yang mendalam.
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="rencana">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Rencana Kegiatan Pembelajaran
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Array.from({ length: 16 }, (_, i) => (
                      <div key={i} className="p-4 border rounded-lg">
                        <div className="flex items-center gap-4 mb-2">
                          <Badge variant="secondary">Minggu {i + 1}</Badge>
                          <h4 className="font-semibold">Topik Pembelajaran {i + 1}</h4>
                        </div>
                        <p className="text-muted-foreground text-sm mb-2">
                          Pembahasan mengenai aspek penting dari {course.name.toLowerCase()}.
                        </p>
                        <div className="text-xs text-muted-foreground">
                          <span className="font-medium">Metode:</span> Ceramah, Diskusi, Studi Kasus
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="evaluasi">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Metode Evaluasi
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-primary/5 rounded-lg">
                      <h4 className="font-semibold mb-2">Penilaian Formatif</h4>
                      <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
                        <li>Kuis mingguan</li>
                        <li>Diskusi kelas</li>
                        <li>Tugas individu</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-secondary/5 rounded-lg">
                      <h4 className="font-semibold mb-2">Penilaian Sumatif</h4>
                      <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
                        <li>Ujian Tengah Semester (UTS)</li>
                        <li>Ujian Akhir Semester (UAS)</li>
                        <li>Proyek akhir</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bobot">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Bobot Penilaian
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg text-center">
                        <div className="text-3xl font-bold text-primary mb-1">20%</div>
                        <div className="text-sm text-muted-foreground">Tugas & Kuis</div>
                      </div>
                      <div className="p-4 border rounded-lg text-center">
                        <div className="text-3xl font-bold text-secondary mb-1">25%</div>
                        <div className="text-sm text-muted-foreground">Partisipasi</div>
                      </div>
                      <div className="p-4 border rounded-lg text-center">
                        <div className="text-3xl font-bold text-accent mb-1">25%</div>
                        <div className="text-sm text-muted-foreground">UTS</div>
                      </div>
                      <div className="p-4 border rounded-lg text-center">
                        <div className="text-3xl font-bold text-primary mb-1">30%</div>
                        <div className="text-sm text-muted-foreground">UAS</div>
                      </div>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold mb-2">Kriteria Penilaian</h4>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <div>A: 85-100 (Sangat Baik)</div>
                        <div>B: 70-84 (Baik)</div>
                        <div>C: 55-69 (Cukup)</div>
                        <div>D: 40-54 (Kurang)</div>
                        <div>E: 0-39 (Sangat Kurang)</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="referensi">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookMarked className="h-5 w-5" />
                    Referensi
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-3">Referensi Utama</h4>
                      <div className="space-y-2">
                        <div className="p-3 bg-muted/30 rounded-lg">
                          <p className="text-sm font-medium">Buku Referensi 1</p>
                          <p className="text-xs text-muted-foreground">Penulis, Tahun, Penerbit</p>
                        </div>
                        <div className="p-3 bg-muted/30 rounded-lg">
                          <p className="text-sm font-medium">Buku Referensi 2</p>
                          <p className="text-xs text-muted-foreground">Penulis, Tahun, Penerbit</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Referensi Pendukung</h4>
                      <div className="space-y-2">
                        <div className="p-3 bg-muted/30 rounded-lg">
                          <p className="text-sm font-medium">Jurnal Ilmiah Terkait</p>
                          <p className="text-xs text-muted-foreground">Journal Name, Volume, Issue</p>
                        </div>
                        <div className="p-3 bg-muted/30 rounded-lg">
                          <p className="text-sm font-medium">Artikel Online</p>
                          <p className="text-xs text-muted-foreground">Website, Tanggal Akses</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default CourseRPS;