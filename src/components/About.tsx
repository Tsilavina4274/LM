import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, Clock, MapPin } from "lucide-react";
import { useState, useEffect } from "react";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({ experience: 0, clients: 0 });

  useEffect(() => {
    setIsVisible(true);
    
    // Animation des compteurs
    const animateCounters = () => {
      let expCount = 0;
      let clientCount = 0;
      
      const interval = setInterval(() => {
        if (expCount < 4) {
          expCount += 1;
          setCounters(prev => ({ ...prev, experience: expCount }));
        }
        if (clientCount < 500) {
          clientCount += 25;
          setCounters(prev => ({ ...prev, clients: clientCount }));
        }
        
        if (expCount >= 4 && clientCount >= 500) {
          clearInterval(interval);
        }
      }, 100);
    };

    const timer = setTimeout(animateCounters, 800);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <section id="apropos" className="py-20 relative overflow-hidden bg-black text-white">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 relative">
              Une passion pour{" "}
              <span className="text-primary relative inline-block">
                l'excellence
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-400 transform scale-x-0 animate-[scaleX_1s_ease-out_0.5s_forwards] origin-left"></div>
              </span>
            </h2>
            
            <div className="space-y-6 text-lg leading-relaxed">
              <p className={`transform transition-all duration-700 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
                Avec plus de 4 ans d'expérience, LM Detailing s'est imposé à La Réunion comme une 
                référence du soin automobile premium.
              </p>
              
              <p className={`transform transition-all duration-700 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
                Née de la passion d'une équipe d'experts, notre mission est simple : réinventer l'expérience 
                du lavage, de la rénovation, de la protection et de la personnalisation automobile sur l'île.
              </p>
              
              <p className={`transform transition-all duration-700 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
                En combinant technologies de pointe, produits haut de gamme et savoir-faire méticuleux, 
                nous avons élevé le detailing automobile au rang d'art.
              </p>
            </div>

            <div className={`grid grid-cols-2 gap-6 mt-8 transform transition-all duration-1000 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <Card className="border-none bg-gradient-to-br from-gray-900/80 to-gray-800/80 hover:from-blue-900/50 hover:to-purple-900/50 transition-all duration-500 hover:scale-105 hover:shadow-xl group border border-gray-700">
                <CardContent className="p-6 text-center">
                  <Award className="h-8 w-8 text-blue-400 mx-auto mb-2 transform group-hover:rotate-12 transition-transform duration-300" />
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    +{counters.experience}
                  </div>
                  <div className="text-sm text-gray-400">Années d'expérience</div>
                </CardContent>
              </Card>
              
              <Card className="border-none bg-gradient-to-br from-gray-900/80 to-gray-800/80 hover:from-purple-900/50 hover:to-pink-900/50 transition-all duration-500 hover:scale-105 hover:shadow-xl group border border-gray-700">
                <CardContent className="p-6 text-center">
                  <Users className="h-8 w-8 text-purple-400 mx-auto mb-2 transform group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    +{counters.clients}
                  </div>
                  <div className="text-sm text-gray-400">Clients satisfaits</div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className={`space-y-6 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <Card className="border-l-4 border-l-blue-500 bg-gradient-to-r from-gray-900/50 to-gray-800/30 hover:shadow-lg transition-all duration-500 hover:translate-x-2 group border border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-blue-400 mt-1 transform group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <h3 className="font-semibold mb-2 group-hover:text-blue-400 transition-colors duration-300 text-white">Notre adresse</h3>
                    <p className="text-gray-">20 rue Saint Vincent de Paul, Le Tampon</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500 bg-gradient-to-r from-gray-900/50 to-gray-800/30 hover:shadow-lg transition-all duration-500 hover:translate-x-2 group border border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 text-purple-400 mt-1 transform group-hover:rotate-12 transition-transform duration-300" />
                  <div>
                    <h3 className="font-semibold mb-2 group-hover:text-purple-400 transition-colors duration-300 text-white">Horaires d'ouverture</h3>
                    <p className="text-gray">Lundi au samedi de 8h30 à 17h30</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500 bg-gradient-to-r from-gray-900/70 to-gray-800/50 hover:shadow-lg transition-all duration-500 hover:scale-105 group overflow-hidden relative border border-gray-700">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <CardContent className="p-6 relative z-10">
                <h3 className="font-semibold mb-3 text-green-400 flex items-center gap-2">
                  Notre engagement
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </h3>
                <ul className="space-y-3 text-sm">
                  {[
                    "Produits haut de gamme exclusivement",
                    "Équipements modernes et techniques avancées", 
                    "Validation personnalisée avant chaque prestation",
                    "Service à domicile disponible",
                    "Garantie satisfaction sur tous nos services"
                  ].map((item, index) => (
                    <li 
                      key={index}
                      className={`flex items-center gap-3 transform transition-all duration-500 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-5 opacity-0'}`}
                      style={{ transitionDelay: `${1200 + index * 100}ms` }}
                    >
                      <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0 animate-pulse"></div>
                      <span className="group-hover:text-green-300 transition-colors duration-300 text-gray-300">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;