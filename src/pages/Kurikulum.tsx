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

      {/* Visual Curriculum Map */}
      <section className="py-12 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="relative">
            {/* Path Lines */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full max-w-6xl">
                {/* Horizontal path line */}
                <div className="absolute top-1/2 left-0 right-0 h-2 bg-gradient-to-r from-blue-300 via-purple-300 to-yellow-300 rounded-full transform -translate-y-1/2 opacity-50"></div>
                {/* Semester connection nodes */}
                <div className="absolute top-1/2 left-1/6 w-6 h-6 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-lg"></div>
                <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-purple-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-lg"></div>
                <div className="absolute top-1/2 left-5/6 w-6 h-6 bg-yellow-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-lg"></div>
              </div>
            </div>

            {/* Semester Islands */}
            <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {semesterData.map((semester, semesterIndex) => (
                <div key={semesterIndex} className="relative">
                  {/* Semester Header */}
                  <div className="text-center mb-6">
                    <div className={`inline-block px-6 py-3 rounded-full text-white font-bold text-lg shadow-lg ${
                      semesterIndex === 0 ? 'bg-blue-500' : 
                      semesterIndex === 1 ? 'bg-purple-500' : 'bg-yellow-500'
                    }`}>
                      {semester.semester}
                    </div>
                    <div className="mt-2">
                      <Badge variant="secondary" className="text-lg px-4 py-2">
                        {semester.totalSKS} SKS
                      </Badge>
                    </div>
                  </div>

                  {/* Course Islands */}
                  <div className="space-y-4">
                    {semester.courses.map((course, courseIndex) => (
                      <Card
                        key={courseIndex}
                        className={`relative transform hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl ${
                          semesterIndex === 0 ? 'bg-blue-50 border-blue-200 hover:bg-blue-100' :
                          semesterIndex === 1 ? 'bg-purple-50 border-purple-200 hover:bg-purple-100' :
                          'bg-yellow-50 border-yellow-200 hover:bg-yellow-100'
                        }`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className={`p-2 rounded-lg ${
                              semesterIndex === 0 ? 'bg-blue-100 text-blue-700' :
                              semesterIndex === 1 ? 'bg-purple-100 text-purple-700' :
                              'bg-yellow-100 text-yellow-700'
                            }`}>
                              {course.icon}
                            </div>
                            <Badge 
                              variant="outline" 
                              className={`${
                                semesterIndex === 0 ? 'border-blue-300 text-blue-700' :
                                semesterIndex === 1 ? 'border-purple-300 text-purple-700' :
                                'border-yellow-600 text-yellow-700'
                              }`}
                            >
                              {course.sks} SKS
                            </Badge>
                          </div>
                          <h3 className="font-semibold text-foreground text-sm leading-tight">
                            {course.name}
                          </h3>
                        </CardContent>
                        
                        {/* Course connection indicator */}
                        <div className={`absolute -top-1 -left-1 w-3 h-3 rounded-full ${
                          semesterIndex === 0 ? 'bg-blue-400' :
                          semesterIndex === 1 ? 'bg-purple-400' :
                          'bg-yellow-400'
                        }`}></div>
                      </Card>
                    ))}
                  </div>

                  {/* Navigation arrows */}
                  {semesterIndex < 2 && (
                    <div className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2">
                      <div className={`w-0 h-0 border-l-[12px] border-r-0 border-t-[8px] border-b-[8px] border-t-transparent border-b-transparent ${
                        semesterIndex === 0 ? 'border-l-purple-400' : 'border-l-yellow-400'
                      }`}></div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Map Legend */}
            <div className="mt-12 flex justify-center">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center gap-8 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                      <span>Semester 1: Fondasi</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                      <span>Semester 2: Pendalaman</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                      <span>Semester 3: Spesialisasi</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-muted/50 to-muted/30">
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