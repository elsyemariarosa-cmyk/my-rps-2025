import { BookOpen, GraduationCap, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [isRPSOpen, setIsRPSOpen] = useState(false);

  const semesterCourses = {
    "Semester 1": [
      { name: "Literasi Digital Akademik", slug: "literasi-digital-akademik", sks: 1 },
      { name: "Manajemen Pelayanan RS", slug: "manajemen-pelayanan-rs", sks: 4 },
      { name: "Pengantar Manajemen Keuangan", slug: "pengantar-manajemen-keuangan", sks: 2 },
      { name: "Digitalisasi RS", slug: "digitalisasi-rs", sks: 2 },
      { name: "Metodologi Penelitian Pelayanan Kesehatan", slug: "metodologi-penelitian-pelayanan-kesehatan", sks: 4 },
      { name: "Manajemen Keuangan RS", slug: "manajemen-keuangan-rs", sks: 2 }
    ],
    "Semester 2": [
      { name: "Manajemen SDM, Perilaku dan Kepemimpinan RS", slug: "manajemen-sdm-perilaku-kepemimpinan-rs", sks: 3 },
      { name: "Manajemen Pencegahan dan Pengendalian Infeksi RS", slug: "manajemen-pencegahan-pengendalian-infeksi-rs", sks: 2 },
      { name: "Pemberdayaan Masyarakat Kesehatan", slug: "pemberdayaan-masyarakat-kesehatan", sks: 4 },
      { name: "Manajemen Pemasaran Jasa Kesehatan", slug: "manajemen-pemasaran-jasa-kesehatan", sks: 2 },
      { name: "Manajemen Pelayanan Khusus RS", slug: "manajemen-pelayanan-khusus-rs", sks: 2 },
      { name: "Manajemen Strategik RS", slug: "manajemen-strategik-rs", sks: 3 },
      { name: "Publikasi Ilmiah", slug: "publikasi-ilmiah", sks: 6 }
    ],
    "Semester 3": [
      { name: "Blok Elektif", slug: "blok-elektif", sks: 2 },
      { name: "Residensi", slug: "residensi", sks: 3 },
      { name: "Tesis", slug: "tesis", sks: 12 }
    ]
  };

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="p-2 bg-gradient-primary rounded-lg group-hover:scale-105 transition-transform">
              <GraduationCap className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">My_RPS</h1>
              <p className="text-sm text-muted-foreground">Prodi MARS UMY</p>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Beranda
            </Link>

            <Link 
              to="/kurikulum" 
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Kurikulum
            </Link>
            
            {/* RPS Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsRPSOpen(!isRPSOpen)}
                onMouseEnter={() => setIsRPSOpen(true)}
                className="flex items-center gap-1 text-foreground hover:text-primary transition-colors font-medium"
              >
                RPS
                <ChevronDown className={`h-4 w-4 transition-transform ${isRPSOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isRPSOpen && (
                <div
                  onMouseLeave={() => setIsRPSOpen(false)}
                  className="absolute top-full left-0 mt-2 w-96 bg-card border border-border rounded-lg shadow-medium z-50 max-h-96 overflow-y-auto"
                >
                  <div className="p-2">
                    {Object.entries(semesterCourses).map(([semester, courses]) => (
                      <div key={semester} className="mb-4 last:mb-0">
                        <div className="px-4 py-2 text-sm font-semibold text-primary border-b border-border/50">
                          {semester}
                        </div>
                        <div className="mt-2 space-y-1">
                          {courses.map((course) => (
                            <Link
                              key={course.slug}
                              to={`/rps/${semester.toLowerCase().replace(' ', '-')}/${course.slug}`}
                              className="block px-4 py-2 text-sm text-foreground hover:bg-muted rounded-lg transition-colors"
                              onClick={() => setIsRPSOpen(false)}
                            >
                              <div className="flex justify-between items-center">
                                <span className="flex-1">{course.name}</span>
                                <span className="text-xs text-muted-foreground ml-2">{course.sks} SKS</span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link 
              to="/referensi" 
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Referensi
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;