import { BookOpen, GraduationCap, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [isRPSOpen, setIsRPSOpen] = useState(false);

  const rpsMenuItems = [
    { title: "Deskripsi Mata Kuliah", href: "/deskripsi-mata-kuliah" },
    { title: "Capaian Pembelajaran (CPL)", href: "/capaian-pembelajaran" },
    { title: "Capaian Pembelajaran Mata Kuliah (CPMK)", href: "/cpmk" },
    { title: "Sub-Capaian Pembelajaran Mata Kuliah", href: "/sub-cpmk" },
    { title: "Rencana Kegiatan Pembelajaran", href: "/rencana-kegiatan-pembelajaran" },
    { title: "Metode Evaluasi", href: "/metode-evaluasi" },
    { title: "Bobot (Persentase)", href: "/bobot" }
  ];

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
                  className="absolute top-full left-0 mt-2 w-80 bg-card border border-border rounded-lg shadow-medium z-50"
                >
                  <div className="p-2">
                    {rpsMenuItems.map((item, index) => (
                      <Link
                        key={index}
                        to={item.href}
                        className="block px-4 py-3 text-sm text-foreground hover:bg-muted rounded-lg transition-colors"
                        onClick={() => setIsRPSOpen(false)}
                      >
                        {item.title}
                      </Link>
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