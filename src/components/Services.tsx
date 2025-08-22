import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Car, Shield, Sparkles, Palette, Phone, Home } from "lucide-react";
import { useState } from "react";

const Services = () => {
  const [activeService, setActiveService] = useState("nettoyage");

  const serviceData = {
    nettoyage: {
      title: "NETTOYAGE",
      subtitle: "SERVICE",
      backgroundImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      services: [
        {
          title: "EXPRESS\nDETAILING",
          price: "À partir de 60 €",
          duration: "~2h",
          color: "bg-blue-600",
          features: ["Intérieur", "Extérieur"]
        },
        {
          title: "PRO\nDETAILING",
          price: "À partir de 110 €",
          duration: "~4h", 
          color: "bg-red-600",
          features: ["Intérieur", "+siège", "Extérieur"]
        },
        {
          title: "ULTIMATE\nDETAILING",
          price: "À partir de 180 €",
          duration: "~5h",
          color: "bg-orange-500",
          features: ["Intérieur", "+siège", "Extérieur", "+décontamination", "+cire en spray"]
        }
      ]
    },
    renovation: {
      title: "RÉNOVATION",
      subtitle: "SERVICE", 
      backgroundImage: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      services: [
        {
          title: "EXPRESS\nRÉNOVATION",
          price: "À partir de 40 €",
          duration: "~1h",
          color: "bg-blue-600",
          features: ["Optique avant", "OPTION :", "Céramique + 30", "Ou OPTION :", "PPF + 110"]
        },
        {
          title: "PRO\nRÉNOVATION", 
          price: "À partir de 250 €",
          duration: "~6h",
          color: "bg-red-600",
          features: ["Intérieur +siège", "Extérieur", "+décontamination", "Traitement", "anti-silice", "Cire en pâte", "(garantie 3 mois)"]
        },
        {
          title: "ULTIMATE\nRÉNOVATION",
          price: "À partir de 450 €",
          duration: "~14h",
          color: "bg-orange-500",
          features: ["Intérieur +siège", "Extérieur", "+décontamination", "Polissage", "+lustrage"]
        }
      ]
    },
    protection: {
      title: "PROTECTION",
      subtitle: "SERVICE",
      backgroundImage: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      services: [
        {
          title: "EXPRESS\nPROTECTION", 
          price: "À partir de 230 €",
          duration: "~7h",
          color: "bg-blue-600",
          features: ["Intérieur", "OFFERT", "Cire 12 mois"]
        },
        {
          title: "PRO\nPROTECTION",
          price: "À partir de 850 €", 
          duration: "~14h",
          color: "bg-red-600",
          features: ["Intérieur +siège", "OFFERT", "Céramique 3 ans"]
        },
        {
          title: "ULTIMATE\nPROTECTION",
          price: "Sur devis",
          duration: "~35h",
          color: "bg-orange-500", 
          features: ["Intérieur +siège", "OFFERT", "PPF 7 à 10 ans"]
        }
      ]
    },
    personnalisation: {
      title: "PERSONNALISATION",
      subtitle: "SERVICE",
      backgroundImage: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80", 
      services: [
        {
          title: "FILM\nSOLAIRE",
          price: "À partir de 230 €",
          duration: "~4h",
          color: "bg-blue-600",
          features: ["• 70%", "• 35%", "• 20%", "• 15%", "• 5%"]
        },
        {
          title: "FILM\nCOVERING",
          price: "Sur devis", 
          duration: "~35h",
          color: "bg-red-600",
          features: ["Intérieur +siège", "OFFERT", "• HEXIS", "• TECKWRAP", "• 3M"]
        },
        {
          title: "PPF\nCOULEUR",
          price: "Sur devis",
          duration: "~35h",
          color: "bg-orange-500",
          features: ["Intérieur +siège", "OFFERT", "PPF 7 à 10 ans"]
        }
      ]
    }
  };

  const ServiceCard = ({ title, price, duration, color, features }: any) => (
    <Card className={`${color} text-white h-full hover:scale-105 transition-all duration-300 border-none shadow-2xl`}>
      <CardContent className="p-6 h-full flex flex-col">
        <div className="text-center mb-4">
          <div className="text-lg font-bold mb-1">{price}</div>
          <h3 className="text-xl font-black leading-tight whitespace-pre-line">{title}</h3>
        </div>
        
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <Car className="w-4 h-4" />
          </div>
          <span className="text-sm">Intérieur</span>
        </div>

        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-sm">Extérieur</span>
        </div>

        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <Clock className="w-4 h-4" />
          </div>
          <span className="text-sm font-bold">Durée : {duration}</span>
        </div>

        <div className="mt-auto space-y-1 text-xs">
          {features.map((feature, index) => (
            <div key={index} className="text-center">{feature}</div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const ServiceSection = ({ data }: any) => (
    <div 
      className="relative min-h-screen bg-black text-white flex flex-col"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${data.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Logo LM Detailing */}
      <div className="flex justify-center pt-8 mb-8">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
          <img src="/src/assets/logo-lm-detailing.png" alt="LM Detailing" className="w-16 h-16 rounded-full" />
        </div>
      </div>

      {/* Titre principal */}
      <div className="text-center mb-12">
        <h1 className="text-6xl md:text-8xl font-black text-white mb-2 tracking-wider">
          {data.title}
        </h1>
        <h2 className="text-4xl md:text-6xl font-black text-red-600 tracking-wider">
          {data.subtitle}
        </h2>
      </div>

      {/* Ligne rouge décorative */}
      <div className="w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent mb-12"></div>

      {/* Cartes de services */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl w-full">
          {data.services.map((service: any, index: number) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>

      {/* Footer avec contact */}
      <div className="bg-red-600 text-white py-4 mt-12">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5" />
            <span className="text-xl font-bold">06 93 94 03 67</span>
          </div>
          <div className="flex items-center gap-2">
            <Home className="w-5 h-5" />
            <span className="text-lg">Service à Domicile</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="services" className="relative">
      {/* Navigation entre services */}
      <div className="fixed top-20 right-4 z-50 space-y-2">
        {Object.keys(serviceData).map((key) => (
          <Button
            key={key}
            variant={activeService === key ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setActiveService(key);
              setTimeout(() => {
                document.getElementById(`service-${key}`)?.scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }, 100);
            }}
            className="capitalize"
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </Button>
        ))}
      </div>

      {/* Sections de services */}
      {Object.entries(serviceData).map(([key, data]) => (
        <div key={key} id={`service-${key}`}>
          <ServiceSection data={data} />
        </div>
      ))}

      {/* Bouton de devis général */}
      <div className="bg-black text-white py-12 text-center">
        <Button 
          size="lg" 
          className="bg-gradient-to-r from-red-600 to-red-700 text-white shadow-2xl hover:scale-105 transition-all duration-300 text-xl px-8 py-4"
          onClick={() => window.open('tel:0693940367')}
        >
          Demander un devis gratuit
        </Button>
      </div>
    </section>
  );
};

export default Services;
