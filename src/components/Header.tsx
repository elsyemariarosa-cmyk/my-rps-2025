import { BookOpen, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
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
              to="/about" 
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Tentang
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;