import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, GraduationCap, Users, FileText, Microscope, Calculator, Laptop, Search, TrendingUp, Heart, Globe, Stethoscope, Building } from "lucide-react";

const Kurikulum = () => {
  const semesterData = [
    {
      semester: "SEMESTER 1",
      totalSKS: 15,
      color: "bg-blue-50 border-blue-200",
      courses: [
        { name: "Literasi Digital Akademik", sks: 1, icon: <Laptop className="h-4 w-4" /> },
        { name: "Manajemen Pelayanan RS", sks: 4, icon: <Building className="h-4 w-4" /> },
        { name: "Pengantar Manajemen Keuangan", sks: 2, icon: <Calculator className="h-4 w-4" /> },
        { name: "Digitalisasi RS", sks: 2, icon: <Laptop className="h-4 w-4" /> },
        { name: "Metodologi Penelitian Pelayanan Kesehatan", sks: 4, icon: <Search className="h-4 w-4" /> },
        { name: "Manajemen Keuangan RS", sks: 2, icon: <Calculator className="h-4 w-4" /> }
      ]
    },
    {
      semester: "SEMESTER 2", 
      totalSKS: 22,
      color: "bg-purple-50 border-purple-200",
      courses: [
        { name: "Manajemen SDM, Perilaku dan Kepemimpinan RS", sks: 3, icon: <Users className="h-4 w-4" /> },
        { name: "Manajemen Pencegahan dan Pengendalian Infeksi RS", sks: 2, icon: <Microscope className="h-4 w-4" /> },
        { name: "Pemberdayaan Masyarakat Kesehatan", sks: 4, icon: <Globe className="h-4 w-4" /> },
        { name: "Manajemen Pemasaran Jasa Kesehatan", sks: 2, icon: <TrendingUp className="h-4 w-4" /> },
        { name: "Manajemen Pelayanan Khusus RS", sks: 2, icon: <Heart className="h-4 w-4" /> },
        { name: "Manajemen Strategik RS", sks: 3, icon: <Building className="h-4 w-4" /> },
        { name: "Publikasi Ilmiah", sks: 6, icon: <FileText className="h-4 w-4" /> }
      ]
    },
    {
      semester: "SEMESTER 3",
      totalSKS: 17,
      color: "bg-yellow-50 border-yellow-200",
      courses: [
        { name: "Blok Elektif", sks: 2, icon: <BookOpen className="h-4 w-4" /> },
        { name: "Residensi", sks: 3, icon: <Stethoscope className="h-4 w-4" /> },
        { name: "Tesis", sks: 12, icon: <GraduationCap className="h-4 w-4" /> }
      ]
    }
  ];

  return (
    <Layout>
      {/* Header Section */}
      <section className="bg-gradient-to-r from-primary to-primary-foreground text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                <BookOpen className="h-12 w-12" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Peta Kurikulum Prodi MARS UMY
            </h1>
            <p className="text-lg text-white/90">
              Struktur mata kuliah dan distribusi SKS per semester dalam Program Studi 
              Manajemen dan Administrasi Rumah Sakit
            </p>
          </div>
        </div>
      </section>

      {/* Curriculum Content */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="space-y-8">
            {semesterData.map((semester, index) => (
              <Card key={index} className={`${semester.color} shadow-lg`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-bold text-foreground">
                      {semester.semester}
                    </CardTitle>
                    <Badge variant="secondary" className="text-lg px-4 py-2">
                      {semester.totalSKS} SKS
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {semester.courses.map((course, courseIndex) => (
                      <div
                        key={courseIndex}
                        className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-lg p-4 hover:bg-white/90 transition-all duration-200 cursor-pointer group"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                            {course.icon}
                          </div>
                          <Badge variant="outline" className="bg-white/80">
                            {course.sks} SKS
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-foreground text-sm leading-tight group-hover:text-primary transition-colors">
                          {course.name}
                        </h3>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Summary */}
          <Card className="mt-8 bg-gradient-to-r from-muted/50 to-muted/30">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Total Beban Studi
                </h3>
                <div className="flex justify-center items-center gap-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary">
                      {semesterData.reduce((total, sem) => total + sem.totalSKS, 0)}
                    </div>
                    <div className="text-muted-foreground">Total SKS</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-secondary">
                      {semesterData.length}
                    </div>
                    <div className="text-muted-foreground">Semester</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-accent">
                      {semesterData.reduce((total, sem) => total + sem.courses.length, 0)}
                    </div>
                    <div className="text-muted-foreground">Mata Kuliah</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default Kurikulum;