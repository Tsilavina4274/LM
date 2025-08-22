import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Car, Shield, Sparkles, Palette } from "lucide-react";

const Services = () => {
  const nettoyageServices = [
    {
      title: "EXPRESS DETAILING",
      price: "À partir de 60€",
      duration: "~2h",
      color: "bg-blue-600",
      services: ["Intérieur", "Extérieur"]
    },
    {
      title: "PRO DETAILING", 
      price: "À partir de 110€",
      duration: "~4h",
      color: "bg-red-600",
      services: ["Intérieur + siège", "Extérieur"]
    },
    {
      title: "ULTIMATE DETAILING",
      price: "À partir de 180€", 
      duration: "~5h",
      color: "bg-orange-500",
      services: ["Intérieur + siège", "Extérieur + décontamination", "+ cire en spray"]
    }
  ];

  const renovationServices = [
    {
      title: "EXPRESS RÉNOVATION",
      price: "À partir de 40€",
      duration: "~1h",
      color: "bg-blue-600",
      services: ["Optique avant", "OPTION : Céramique + 30", "Ou OPTION : PPF + 110"]
    },
    {
      title: "PRO RÉNOVATION",
      price: "À partir de 250€", 
      duration: "~6h",
      color: "bg-red-600",
      services: ["Intérieur + siège", "Extérieur + décontamination", "Traitement anti-silice", "Cire en pâte (garantie 3 mois)"]
    },
    {
      title: "ULTIMATE RÉNOVATION",
      price: "À partir de 450€",
      duration: "~14h", 
      color: "bg-orange-500",
      services: ["Intérieur + siège", "Extérieur + décontamination", "Polissage + lustrage"]
    }
  ];

  const protectionServices = [
    {
      title: "EXPRESS PROTECTION",
      price: "À partir de 230€",
      duration: "~7h",
      color: "bg-blue-600", 
      services: ["Intérieur OFFERT", "Cire 12 mois"]
    },
    {
      title: "PRO PROTECTION",
      price: "À partir de 850€",
      duration: "~14h",
      color: "bg-red-600",
      services: ["Intérieur + siège OFFERT", "Céramique 3 ans"]
    },
    {
      title: "ULTIMATE PROTECTION", 
      price: "Sur devis",
      duration: "~35h",
      color: "bg-orange-500",
      services: ["Intérieur + siège OFFERT", "PPF 7 à 10 ans"]
    }
  ];

  const personnalisationServices = [
    {
      title: "FILM SOLAIRE",
      price: "À partir de 230€",
      duration: "~4h",
      color: "bg-blue-600",
      services: ["70%", "35%", "20%", "15%", "5%"]
    },
    {
      title: "FILM COVERING",
      price: "Sur devis",
      duration: "~35h", 
      color: "bg-red-600",
      services: ["Intérieur + siège OFFERT", "HEXIS", "TECKWRAP", "3M"]
    },
    {
      title: "PPF COULEUR",
      price: "Sur devis",
      duration: "~35h",
      color: "bg-orange-500", 
      services: ["Intérieur + siège OFFERT", "PPF 7 à 10 ans"]
    }
  ];

  const ServiceCard = ({ title, price, duration, color, services }: any) => (
    <Card className="h-full hover:shadow-elegant transition-all duration-300 hover-lift interactive-card animate-fade-in-up">
      <CardHeader className={`${color} text-white rounded-t-lg`}>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        <CardDescription className="text-white/90 text-lg font-semibold">{price}</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="h-4 w-4 text-muted-foreground animate-glow" />
          <span className="text-sm text-muted-foreground">Durée : {duration}</span>
        </div>
        <ul className="space-y-2">
          {services.map((service: string, index: number) => (
            <li key={index} className="flex items-center gap-2 hover-scale transition-all duration-200">
              <div className="w-2 h-2 bg-primary rounded-full animate-glow"></div>
              <span className="text-sm">{service}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );

  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Nos <span className="text-primary">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez notre gamme complète de services pour sublimer votre véhicule
          </p>
        </div>

        {/* Nettoyage Services */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Car className="h-8 w-8 text-primary" />
            <h3 className="text-3xl font-bold">Services de Nettoyage</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {nettoyageServices.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>

        {/* Rénovation Services */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Sparkles className="h-8 w-8 text-primary" />
            <h3 className="text-3xl font-bold">Services de Rénovation</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {renovationServices.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>

        {/* Protection Services */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Shield className="h-8 w-8 text-primary" />
            <h3 className="text-3xl font-bold">Services de Protection</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {protectionServices.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>

        {/* Personnalisation Services */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Palette className="h-8 w-8 text-primary" />
            <h3 className="text-3xl font-bold">Services de Personnalisation</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {personnalisationServices.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>

        <div className="text-center animate-fade-in-up">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-primary to-primary/80 text-white shadow-elegant hover-scale animate-glow"
            onClick={() => window.open('tel:0693940367')}
          >
            Demander un devis gratuit
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;