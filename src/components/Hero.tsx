import { Button } from "@/components/ui/button";
import { Car, Shield, Sparkles, Phone } from "lucide-react";

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="accueil" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary/90 to-black"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in-up">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              LM
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary to-red-400 bg-clip-text text-transparent">
              DETAILING
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            "Bien plus qu'un simple lavage : rénovation, protection, personnalisation et vente de produits auto. 
            Grâce à notre savoir-faire et nos équipements modernes, nous sublimons votre véhicule tout en vous offrant une expérience unique."
          </p>

          {/* Feature highlights */}
          <div className="grid md:grid-cols-3 gap-6 mb-10 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="flex flex-col items-center p-4 bg-white/5 rounded-lg backdrop-blur-sm hover-lift interactive-card">
              <Car className="h-8 w-8 text-primary mb-2 animate-glow" />
              <span className="text-white font-medium">Nettoyage Expert</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-white/5 rounded-lg backdrop-blur-sm hover-lift interactive-card" style={{ animationDelay: '0.1s' }}>
              <Shield className="h-8 w-8 text-primary mb-2 animate-glow" />
              <span className="text-white font-medium">Protection Premium</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-white/5 rounded-lg backdrop-blur-sm hover-lift interactive-card" style={{ animationDelay: '0.2s' }}>
              <Sparkles className="h-8 w-8 text-primary mb-2 animate-glow" />
              <span className="text-white font-medium">Personnalisation</span>
            </div>
          </div>

          {/* Call to action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white shadow-elegant text-lg px-8 py-6 hover-scale animate-glow"
              onClick={() => scrollToSection('services')}
            >
              Découvrir nos services
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm text-lg px-8 py-6 hover-scale"
              onClick={() => window.open('tel:0693940367')}
            >
              <Phone className="mr-2 h-5 w-5" />
              Appeler maintenant
            </Button>
          </div>

          {/* Business info */}
          <div className="mt-12 text-gray-400">
            <p className="mb-2">📍 20 rue Saint Vincent de Paul, Le Tampon</p>
            <p>⏰ Lundi au samedi de 8h30 à 17h30</p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;