import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, Clock, MapPin } from "lucide-react";

const About = () => {
  return (
    <section id="apropos" className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Une passion pour <span className="text-primary">l'excellence</span>
            </h2>
            
            <div className="space-y-6 text-lg leading-relaxed">
              <p>
                Avec plus de 4 ans d'expérience, LM Detailing s'est imposé à La Réunion comme une 
                référence du soin automobile premium.
              </p>
              
              <p>
                Née de la passion d'une équipe d'experts, notre mission est simple : réinventer l'expérience 
                du lavage, de la rénovation, de la protection et de la personnalisation automobile sur l'île.
              </p>
              
              <p>
                En combinant technologies de pointe, produits haut de gamme et savoir-faire méticuleux, 
                nous avons élevé le detailing automobile au rang d'art.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-8">
              <Card className="border-none bg-muted/50">
                <CardContent className="p-6 text-center">
                  <Award className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold">4+</div>
                  <div className="text-sm text-muted-foreground">Années d'expérience</div>
                </CardContent>
              </Card>
              
              <Card className="border-none bg-muted/50">
                <CardContent className="p-6 text-center">
                  <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-sm text-muted-foreground">Clients satisfaits</div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="border-l-4 border-l-primary bg-muted/30">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Notre adresse</h3>
                    <p className="text-muted-foreground">20 rue Saint Vincent de Paul, Le Tampon</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-primary bg-muted/30">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Horaires d'ouverture</h3>
                    <p className="text-muted-foreground">Lundi au samedi de 8h30 à 17h30</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-primary bg-primary/5">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3 text-primary">Notre engagement</h3>
                <ul className="space-y-2 text-sm">
                  <li>✓ Produits haut de gamme exclusivement</li>
                  <li>✓ Équipements modernes et techniques avancées</li>
                  <li>✓ Validation personnalisée avant chaque prestation</li>
                  <li>✓ Service à domicile disponible</li>
                  <li>✓ Garantie satisfaction sur tous nos services</li>
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