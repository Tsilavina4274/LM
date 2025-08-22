import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import headlightExample from "@/assets/headlight-example.png";

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const galleryItems = [
    {
      id: 1,
      image: headlightExample,
      title: "Rénovation phare + PPF teinté",
      category: "renovation",
      description: "Ford Focus - Rénovation complète des optiques avant"
    },
    // Placeholder items for demonstration
    {
      id: 2,
      image: "/placeholder.svg",
      title: "Nettoyage complet intérieur",
      category: "nettoyage", 
      description: "Intérieur cuir rénové et protégé"
    },
    {
      id: 3,
      image: "/placeholder.svg",
      title: "Application céramique",
      category: "protection",
      description: "Protection céramique 3 ans"
    },
    {
      id: 4,
      image: "/placeholder.svg",
      title: "Film covering toit",
      category: "personnalisation",
      description: "Covering noir mat sur toit"
    },
    {
      id: 5,
      image: "/placeholder.svg",
      title: "Polissage carrosserie",
      category: "renovation",
      description: "Élimination des rayures et micro-rayures"
    },
    {
      id: 6,
      image: "/placeholder.svg",
      title: "Film solaire vitres",
      category: "personnalisation", 
      description: "Pose film solaire 35%"
    }
  ];

  const categories = [
    { id: "all", label: "Tous", count: galleryItems.length },
    { id: "nettoyage", label: "Nettoyage", count: galleryItems.filter(item => item.category === "nettoyage").length },
    { id: "renovation", label: "Rénovation", count: galleryItems.filter(item => item.category === "renovation").length },
    { id: "protection", label: "Protection", count: galleryItems.filter(item => item.category === "protection").length },
    { id: "personnalisation", label: "Personnalisation", count: galleryItems.filter(item => item.category === "personnalisation").length }
  ];

  const filteredItems = selectedCategory === "all" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <section id="galerie" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Galerie de nos <span className="text-primary">Réalisations</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez quelques-unes de nos plus belles transformations
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? "bg-primary text-white shadow-elegant"
                  : "bg-white/50 text-foreground hover:bg-white/80"
              }`}
            >
              {category.label}
              <Badge variant="secondary" className="ml-2 text-xs">
                {category.count}
              </Badge>
            </button>
          ))}
        </div>

        {/* Gallery grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="group overflow-hidden hover:shadow-elegant transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                      <p className="text-sm text-white/90">{item.description}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Instagram link */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Suivez-nous sur Instagram pour découvrir toutes nos réalisations
          </p>
          <button 
            onClick={() => window.open('https://instagram.com/lm.detailing974', '_blank')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.621 5.367 11.988 11.988 11.988s11.988-5.367 11.988-11.988C24.005 5.367 18.638.001 12.017.001zM8.449 6.283c.549-.614 1.334-.994 2.209-.994 1.555 0 2.817 1.262 2.817 2.817 0 .875-.38 1.66-.994 2.209l3.447 3.447c.234.234.234.614 0 .848L13.78 16.758c-.234.234-.614.234-.848 0L9.485 13.31c-.549.614-1.334.994-2.209.994-1.555 0-2.817-1.262-2.817-2.817 0-.875.38-1.66.994-2.209L1.906 5.731c-.234-.234-.234-.614 0-.848L4.054 2.735c.234-.234.614-.234.848 0l3.447 3.447z"/>
            </svg>
            @lm.detailing974
          </button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;