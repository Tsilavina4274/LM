import { Button } from "@/components/ui/button";
import { Car, Shield, Sparkles, Phone, Wrench, Settings, Key } from "lucide-react";

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(20px) rotate(-180deg); }
        }
        
        @keyframes drift {
          0% { transform: translateX(0px) translateY(0px) rotate(0deg); }
          33% { transform: translateX(30px) translateY(-30px) rotate(120deg); }
          66% { transform: translateX(-20px) translateY(20px) rotate(240deg); }
          100% { transform: translateX(0px) translateY(0px) rotate(360deg); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-reverse { animation: float-reverse 8s ease-in-out infinite; }
        .animate-drift { animation: drift 12s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; opacity: 0; }
        
        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hover-lift:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        
        .hover-scale {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hover-scale:hover {
          transform: scale(1.05);
        }
        
        .text-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }
        
        .glass-effect {
          backdrop-filter: blur(20px);
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
      `}</style>
      
      <section id="accueil" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Professional car wash background */}
        <div className="absolute inset-0">
          <img 
            src="images/333.jpg" 
            alt="Professional car detailing background"
            className="w-full h-full object-cover object-center"
            style={{ 
              minWidth: '100%', 
              minHeight: '100vh',
              imageRendering: 'crisp-edges'
            }}
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80";
            }}
          />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-red-900/15"></div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse-glow"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-yellow-500/15 rounded-full blur-2xl animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Floating automotive tools and keys */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Wrench tools */}
          <div className="absolute top-20 left-1/4 text-blue-400/20 animate-float">
            <Wrench className="w-12 h-12" />
          </div>
          <div className="absolute top-40 right-1/4 text-red-400/20 animate-float-reverse" style={{ animationDelay: '1s' }}>
            <Wrench className="w-10 h-10" />
          </div>
          <div className="absolute bottom-32 left-1/3 text-yellow-400/20 animate-drift">
            <Settings className="w-8 h-8" />
          </div>
          
          {/* Car keys */}
          <div className="absolute top-1/3 right-20 text-blue-300/25 animate-float" style={{ animationDelay: '2s' }}>
            <Key className="w-14 h-14" />
          </div>
          <div className="absolute bottom-40 right-1/3 text-red-300/25 animate-float-reverse" style={{ animationDelay: '3s' }}>
            <Key className="w-10 h-10" />
          </div>
          <div className="absolute top-60 left-20 text-green-400/20 animate-drift" style={{ animationDelay: '1.5s' }}>
            <Wrench className="w-9 h-9" />
          </div>
          
          {/* Additional tools */}
          <div className="absolute bottom-60 left-1/2 text-purple-400/20 animate-float" style={{ animationDelay: '2.5s' }}>
            <Wrench className="w-11 h-11" />
          </div>
          <div className="absolute top-80 right-1/2 text-cyan-400/25 animate-float-reverse" style={{ animationDelay: '0.5s' }}>
            <Settings className="w-13 h-13" />
          </div>
        </div>

        <div className="container mx-auto px-4 py-32 relative z-10">
          <div className="text-center max-w-4xl mx-auto">

            <div className="flex flex-col items-center mb-8 animate-fade-in-up">
              <div className="w-24 h-24 mb-6 rounded-full overflow-hidden shadow-2xl animate-pulse-glow border-4 border-gradient-to-br from-blue-400 to-red-400">
                <img 
                  src="images/logo.jpg" 
                  alt="LM Detailing Logo" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling
                  }}
                />
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-red-400 rounded-full flex items-center justify-center" style={{ display: 'none' }}>
                  <Car className="w-12 h-12 text-white" />
                </div>
              </div>

              
              {/* Company name */}
              <h1 className="text-6xl md:text-8xl font-bold text-red-600">
                LM DETAILING
              </h1>
            </div>

            {/* Enhanced tagline without glass border */}
            <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
                "Bien plus qu'un simple lavage : rénovation, protection, personnalisation et vente de produits auto. 
                Grâce à notre savoir-faire et nos équipements modernes, nous sublimons votre véhicule tout en vous offrant une expérience unique."
              </p>
            </div>

            {/* Enhanced feature highlights */}
            <div className="grid md:grid-cols-3 gap-6 mb-10 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <div className="glass-effect rounded-xl p-6 hover-lift">
                <div className="relative">
                  <Car className="h-10 w-10 text-blue-400 mb-3 mx-auto animate-pulse-glow" />
                  <div className="absolute -top-2 -right-2">
                    <Sparkles className="h-4 w-4 text-yellow-400 animate-pulse" />
                  </div>
                </div>
                <span className="text-white font-semibold text-lg block">Nettoyage Expert</span>
                <p className="text-gray-300 text-sm mt-2">Techniques avancées</p>
              </div>
              
              <div className="glass-effect rounded-xl p-6 hover-lift" style={{ animationDelay: '0.1s' }}>
                <div className="relative">
                  <Shield className="h-10 w-10 text-green-400 mb-3 mx-auto animate-pulse-glow" />
                  <div className="absolute -top-2 -right-2">
                    <Sparkles className="h-4 w-4 text-blue-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
                  </div>
                </div>
                <span className="text-white font-semibold text-lg block">Protection Premium</span>
                <p className="text-gray-300 text-sm mt-2">Longue durée</p>
              </div>
              
              <div className="glass-effect rounded-xl p-6 hover-lift" style={{ animationDelay: '0.2s' }}>
                <div className="relative">
                  <Sparkles className="h-10 w-10 text-purple-400 mb-3 mx-auto animate-pulse-glow" />
                  <div className="absolute -top-2 -right-2">
                    <Car className="h-4 w-4 text-red-400 animate-pulse" style={{ animationDelay: '1s' }} />
                  </div>
                </div>
                <span className="text-white font-semibold text-lg block">Personnalisation</span>
                <p className="text-gray-300 text-sm mt-2">Selon vos goûts</p>
              </div>
            </div>

            {/* Enhanced call to action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 hover:from-blue-500 hover:via-blue-400 hover:to-purple-500 text-white shadow-2xl text-lg px-8 py-6 hover-scale glass-effect border-blue-400/30 relative overflow-hidden group"
                onClick={() => scrollToSection('services')}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                <Sparkles className="mr-2 h-5 w-5 animate-pulse" />
                Découvrir nos services
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="glass-effect border-white/40 text-white hover:bg-white/20 text-lg px-8 py-6 hover-scale relative overflow-hidden group"
                onClick={() => window.open('tel:0693940367')}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                <Phone className="mr-2 h-5 w-5 animate-pulse" />
                Appeler maintenant
              </Button>
            </div>

            {/* Enhanced business info */}
            <div className="mt-12 glass-effect rounded-xl p-6 inline-block animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
              <div className="text-gray-200 space-y-2">
                <p className="flex items-center justify-center gap-2">
                  <span className="text-blue-400">📍</span>
                  <span className="font-medium">20 rue Saint Vincent de Paul, Le Tampon</span>
                </p>
                <p className="flex items-center justify-center gap-2">
                  <span className="text-green-400">⏰</span>
                  <span className="font-medium">Lundi au samedi de 8h30 à 17h30</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="glass-effect w-8 h-14 rounded-full flex justify-center items-center group cursor-pointer hover-scale">
            <div className="w-1 h-4 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;