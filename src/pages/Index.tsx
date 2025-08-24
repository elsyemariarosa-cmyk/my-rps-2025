import Layout from "@/components/Layout";
import RPSCard from "@/components/RPSCard";
import { 
  BookOpen, 
  Target, 
  Award, 
  TrendingUp, 
  Calendar, 
  ClipboardCheck, 
  BookMarked,
  GraduationCap
} from "lucide-react";

const Index = () => {
  const rpsMenuItems = [
    {
      title: "Deskripsi Mata Kuliah",
      description: "Gambaran umum, tujuan pembelajaran, dan ruang lingkup mata kuliah dalam kurikulum program studi MARS.",
      icon: <BookOpen className="h-6 w-6" />,
      href: "/deskripsi-mata-kuliah",
      color: "primary" as const
    },
    {
      title: "Capaian Pembelajaran (CPL)",
      description: "Kemampuan yang diperoleh lulusan melalui internalisasi pengetahuan, sikap, dan keterampilan sesuai profil lulusan.",
      icon: <Target className="h-6 w-6" />,
      href: "/capaian-pembelajaran",
      color: "secondary" as const
    },
    {
      title: "Capaian Pembelajaran Mata Kuliah (CPMK)",
      description: "Kemampuan spesifik yang dijabarkan dari CPL dan dibebankan pada mata kuliah tertentu.",
      icon: <Award className="h-6 w-6" />,
      href: "/cpmk",
      color: "primary" as const
    },
    {
      title: "Sub-Capaian Pembelajaran Mata Kuliah",
      description: "Penjabaran detail CPMK yang menggambarkan kemampuan spesifik pada setiap tahapan pembelajaran.",
      icon: <TrendingUp className="h-6 w-6" />,
      href: "/sub-cpmk",
      color: "secondary" as const
    },
    {
      title: "Rencana Kegiatan Pembelajaran",
      description: "Rencana proses pembelajaran mingguan yang disusun sistematis untuk mencapai CPMK selama satu semester.",
      icon: <Calendar className="h-6 w-6" />,
      href: "/rencana-kegiatan-pembelajaran",
      color: "accent" as const
    },
    {
      title: "Metode Evaluasi",
      description: "Cara penilaian kemajuan belajar berupa komponen, indikator, dan kriteria penilaian CPMK.",
      icon: <ClipboardCheck className="h-6 w-6" />,
      href: "/metode-evaluasi",
      color: "secondary" as const
    },
    {
      title: "Referensi",
      description: "Sumber pustaka berupa buku teks, jurnal ilmiah, dan sumber digital yang mendukung pembelajaran.",
      icon: <BookMarked className="h-6 w-6" />,
      href: "/referensi",
      color: "primary" as const
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-gradient text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
                <GraduationCap className="h-16 w-16" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              My_RPS Prodi MARS UMY
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Sistem Manajemen Rencana Pembelajaran Semester
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Platform digital untuk mengelola dan mengakses semua komponen RPS 
              mata kuliah di Program Studi Manajemen dan Administrasi Rumah Sakit (MARS) 
              Universitas Muhammadiyah Yogyakarta.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Komponen Rencana Pembelajaran Semester
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Akses dan kelola seluruh elemen RPS untuk memastikan kualitas pembelajaran 
              yang terstruktur dan terintegrasi
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {rpsMenuItems.map((item, index) => (
              <RPSCard
                key={index}
                title={item.title}
                description={item.description}
                icon={item.icon}
                href={item.href}
                color={item.color}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="space-y-4">
                <div className="p-4 bg-primary/10 rounded-lg inline-block">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Standar Akademik</h3>
                <p className="text-muted-foreground">
                  Mengikuti standar kurikulum nasional dan akreditasi program studi
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-secondary/10 rounded-lg inline-block">
                  <Target className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold">Terintegrasi</h3>
                <p className="text-muted-foreground">
                  Semua komponen RPS saling terhubung untuk mencapai profil lulusan
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-accent/10 rounded-lg inline-block">
                  <Award className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold">Berkualitas</h3>
                <p className="text-muted-foreground">
                  Pembelajaran berbasis kompetensi untuk menghasilkan lulusan berkualitas
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;