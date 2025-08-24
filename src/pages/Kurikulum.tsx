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
        { name: "Literasi Digital Akademik", sks: 1, icon: <Laptop className="h-4 w-4" />, penanggungJawab: "", tahunAjaran: "20../20.." },
        { name: "Manajemen Pelayanan RS", sks: 4, icon: <Building className="h-4 w-4" />, penanggungJawab: "", tahunAjaran: "20../20.." },
        { name: "Pengantar Manajemen Keuangan", sks: 2, icon: <Calculator className="h-4 w-4" />, penanggungJawab: "", tahunAjaran: "20../20.." },
        { name: "Digitalisasi RS", sks: 2, icon: <Laptop className="h-4 w-4" />, penanggungJawab: "", tahunAjaran: "20../20.." },
        { name: "Metodologi Penelitian Pelayanan Kesehatan", sks: 4, icon: <Search className="h-4 w-4" />, penanggungJawab: "", tahunAjaran: "20../20.." },
        { name: "Manajemen Keuangan RS", sks: 2, icon: <Calculator className="h-4 w-4" />, penanggungJawab: "", tahunAjaran: "20../20.." }
      ]
    },
    {
      semester: "SEMESTER 2", 
      totalSKS: 22,
      color: "bg-purple-50 border-purple-200",
      courses: [
        { name: "Manajemen SDM, Perilaku dan Kepemimpinan RS", sks: 3, icon: <Users className="h-4 w-4" />, penanggungJawab: "", tahunAjaran: "20../20.." },
        { name: "Manajemen Pencegahan dan Pengendalian Infeksi RS", sks: 2, icon: <Microscope className="h-4 w-4" />, penanggungJawab: "", tahunAjaran: "20../20.." },
        { name: "Pemberdayaan Masyarakat Kesehatan", sks: 4, icon: <Globe className="h-4 w-4" />, penanggungJawab: "", tahunAjaran: "20../20.." },
        { name: "Manajemen Pemasaran Jasa Kesehatan", sks: 2, icon: <TrendingUp className="h-4 w-4" />, penanggungJawab: "", tahunAjaran: "20../20.." },
        { name: "Manajemen Pelayanan Khusus RS", sks: 2, icon: <Heart className="h-4 w-4" />, penanggungJawab: "", tahunAjaran: "20../20.." },
        { name: "Manajemen Strategik RS", sks: 3, icon: <Building className="h-4 w-4" />, penanggungJawab: "", tahunAjaran: "20../20.." },
        { name: "Publikasi Ilmiah", sks: 6, icon: <FileText className="h-4 w-4" />, penanggungJawab: "", tahunAjaran: "20../20.." }
      ]
    },
    {
      semester: "SEMESTER 3",
      totalSKS: 17,
      color: "bg-yellow-50 border-yellow-200",
      courses: [
        { name: "Blok Elektif", sks: 2, icon: <BookOpen className="h-4 w-4" />, penanggungJawab: "", tahunAjaran: "20../20.." },
        { name: "Residensi", sks: 3, icon: <Stethoscope className="h-4 w-4" />, penanggungJawab: "", tahunAjaran: "20../20.." },
        { name: "Tesis", sks: 12, icon: <GraduationCap className="h-4 w-4" />, penanggungJawab: "", tahunAjaran: "20../20.." }
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
      <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="relative max-w-7xl mx-auto">
            {/* Connection Path */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-full max-w-5xl">
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-yellow-400 rounded-full transform -translate-y-1/2 opacity-60"></div>
                <div className="absolute top-1/2 left-1/6 w-4 h-4 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-md"></div>
                <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-purple-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-md"></div>
                <div className="absolute top-1/2 left-5/6 w-4 h-4 bg-yellow-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-md"></div>
              </div>
            </div>

            {/* Semester Sections */}
            <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
              {semesterData.map((semester, semesterIndex) => (
                <div key={semesterIndex} className="relative animate-fade-in" style={{ animationDelay: `${semesterIndex * 0.2}s` }}>
                  {/* Semester Badge */}
                  <div className="text-center mb-8">
                    <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-bold text-lg shadow-lg ${
                      semesterIndex === 0 ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 
                      semesterIndex === 1 ? 'bg-gradient-to-r from-purple-500 to-purple-600' : 
                      'bg-gradient-to-r from-yellow-500 to-yellow-600'
                    }`}>
                      <span>{semester.semester}</span>
                    </div>
                    <div className="mt-3">
                      <Badge variant="secondary" className="text-base px-4 py-1 font-semibold">
                        Total: {semester.totalSKS} SKS
                      </Badge>
                    </div>
                  </div>

                  {/* Course Cards */}
                  <div className="space-y-3">
                    {semester.courses.map((course, courseIndex) => (
                      <Card
                        key={courseIndex}
                        className={`relative group hover-scale cursor-pointer shadow-md hover:shadow-lg transition-all duration-300 ${
                          semesterIndex === 0 ? 'bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200 hover:from-blue-100 hover:to-blue-150' :
                          semesterIndex === 1 ? 'bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200 hover:from-purple-100 hover:to-purple-150' :
                          'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200 hover:from-yellow-100 hover:to-yellow-150'
                        }`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3 flex-1">
                              <div className={`p-2.5 rounded-xl ${
                                semesterIndex === 0 ? 'bg-blue-200 text-blue-700' :
                                semesterIndex === 1 ? 'bg-purple-200 text-purple-700' :
                                'bg-yellow-200 text-yellow-700'
                              }`}>
                                {course.icon}
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold text-foreground text-sm leading-tight group-hover:text-primary transition-colors mb-1">
                                  {course.name}
                                </h3>
                              </div>
                            </div>
                            <Badge 
                              variant="outline" 
                              className={`ml-3 font-semibold ${
                                semesterIndex === 0 ? 'border-blue-400 text-blue-700 bg-blue-50' :
                                semesterIndex === 1 ? 'border-purple-400 text-purple-700 bg-purple-50' :
                                'border-yellow-500 text-yellow-700 bg-yellow-50'
                              }`}
                            >
                              {course.sks} SKS
                            </Badge>
                          </div>
                          
                          {/* Additional Course Information */}
                          <div className="space-y-1 text-xs text-muted-foreground pl-12">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">Penanggung Jawab:</span>
                              <span className="italic">{course.penanggungJawab || "Belum diisi"}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="font-medium">Tahun Ajaran:</span>
                              <span className="italic">{course.tahunAjaran}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Progress Arrow */}
                  {semesterIndex < 2 && (
                    <div className="hidden lg:block absolute top-1/2 -right-8 transform -translate-y-1/2 animate-pulse">
                      <div className={`w-0 h-0 border-l-[16px] border-r-0 border-t-[10px] border-b-[10px] border-t-transparent border-b-transparent ${
                        semesterIndex === 0 ? 'border-l-purple-400' : 'border-l-yellow-400'
                      }`}></div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="mt-16 flex justify-center">
              <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
                <CardContent className="px-8 py-6">
                  <div className="flex items-center justify-center gap-12 text-sm font-medium">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-sm"></div>
                      <span className="text-slate-700">Semester 1: Fondasi</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full shadow-sm"></div>
                      <span className="text-slate-700">Semester 2: Pendalaman</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full shadow-sm"></div>
                      <span className="text-slate-700">Semester 3: Spesialisasi</span>
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