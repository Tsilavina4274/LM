import { useState } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import logoLM from "@/assets/logo-lm-detailing.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const scrollToService = (serviceType: string) => {
    const element = document.getElementById(`service-${serviceType}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const serviceTypes = [
    { id: "nettoyage", label: "Nettoyage" },
    { id: "renovation", label: "Rénovation" },
    { id: "protection", label: "Protection" },
    { id: "personnalisation", label: "Personnalisation" }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src={logoLM} alt="LM Detailing" className="h-12 w-12 rounded-full" />
            <span className="text-xl font-bold">LM Detailing</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('accueil')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Accueil
            </button>
             <button
              onClick={() => scrollToSection('apropos')}
              className="text-foreground hover:text-primary transition-colors"
            >
              À propos
            </button>
            {/* Menu déroulant Services */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 text-foreground hover:text-primary transition-colors">
                  Services
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-background border border-border">
                <DropdownMenuItem
                  onClick={() => scrollToSection('services')}
                  className="cursor-pointer hover:bg-muted"
                >
                  Tous les services
                </DropdownMenuItem>
                {serviceTypes.map((service) => (
                  <DropdownMenuItem
                    key={service.id}
                    onClick={() => scrollToService(service.id)}
                    className="cursor-pointer hover:bg-muted"
                  >
                    {service.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <button
              onClick={() => scrollToSection('galerie')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Galerie
            </button>
            <button
              onClick={() => scrollToSection('reservation')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Réservation
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Contact
            </button>
            <Button className="bg-gradient-to-r from-primary to-primary/80">
              <Phone className="mr-2 h-4 w-4" />
              0693 94 03 67
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t">
            <div className="flex flex-col space-y-4 pt-4">
              <button
                onClick={() => scrollToSection('accueil')}
                className="text-left text-foreground hover:text-primary transition-colors"
              >
                Accueil
              </button>

              <button
                onClick={() => scrollToSection('apropos')}
                className="text-left text-foreground hover:text-primary transition-colors"
              >
                À propos
              </button>
              
              {/* Services avec sous-menu mobile */}
              <div className="space-y-2">
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-left text-foreground hover:text-primary transition-colors font-medium"
                >
                  Services
                </button>
                <div className="pl-4 space-y-2">
                  {serviceTypes.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => scrollToService(service.id)}
                      className="block text-left text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      • {service.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => scrollToSection('galerie')}
                className="text-left text-foreground hover:text-primary transition-colors"
              >
                Galerie
              </button>
              <button
                onClick={() => scrollToSection('reservation')}
                className="text-left text-foreground hover:text-primary transition-colors"
              >
                Réservation
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-left text-foreground hover:text-primary transition-colors"
              >
                Contact
              </button>
              <Button className="bg-gradient-to-r from-primary to-primary/80 w-full">
                <Phone className="mr-2 h-4 w-4" />
                0693 94 03 67
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
