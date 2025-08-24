import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface RPSCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  href: string;
  color?: "primary" | "secondary" | "accent";
}

const RPSCard = ({ title, description, icon, href, color = "primary" }: RPSCardProps) => {
  const colorClasses = {
    primary: "from-primary/10 to-primary/5 border-primary/20 hover:border-primary/40",
    secondary: "from-secondary/10 to-secondary/5 border-secondary/20 hover:border-secondary/40",
    accent: "from-accent/10 to-accent/5 border-accent/20 hover:border-accent/40"
  };

  const iconClasses = {
    primary: "text-primary bg-primary/10",
    secondary: "text-secondary bg-secondary/10", 
    accent: "text-accent bg-accent/10"
  };

  return (
    <Link to={href} className="group block">
      <div className={`card-academic bg-gradient-to-br ${colorClasses[color]} group-hover:shadow-medium transition-all duration-300`}>
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-lg ${iconClasses[color]} group-hover:scale-110 transition-transform`}>
            {icon}
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
        
        <h3 className="text-lg font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </Link>
  );
};

export default RPSCard;