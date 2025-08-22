import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Clock, Home, Instagram } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create mailto link with form data
    const subject = `Demande de devis - ${formData.service}`;
    const body = `Nom: ${formData.name}
Email: ${formData.email}
Téléphone: ${formData.phone}
Service souhaité: ${formData.service}

Message:
${formData.message}`;
    
    const mailtoLink = `mailto:mouniamalorezo555@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink);
    
    toast({
      title: "Demande envoyée",
      description: "Votre client email va s'ouvrir pour finaliser l'envoi.",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Contactez-<span className="text-primary">nous</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Prêt à sublimer votre véhicule ? Contactez-nous pour un devis personnalisé
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="shadow-elegant hover-lift animate-fade-in-left">
            <CardHeader>
              <CardTitle className="text-2xl">Demande de devis</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nom complet *</Label>
                    <Input
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Téléphone *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="0693 XX XX XX"
                    />
                  </div>
                  <div>
                    <Label htmlFor="service">Service souhaité</Label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full p-3 border rounded-md bg-background"
                    >
                      <option value="">Sélectionnez un service</option>
                      <option value="Nettoyage Express">Nettoyage Express</option>
                      <option value="Nettoyage Pro">Nettoyage Pro</option>
                      <option value="Nettoyage Ultimate">Nettoyage Ultimate</option>
                      <option value="Rénovation Express">Rénovation Express</option>
                      <option value="Rénovation Pro">Rénovation Pro</option>
                      <option value="Rénovation Ultimate">Rénovation Ultimate</option>
                      <option value="Protection Express">Protection Express</option>
                      <option value="Protection Pro">Protection Pro</option>
                      <option value="Protection Ultimate">Protection Ultimate</option>
                      <option value="Film Solaire">Film Solaire</option>
                      <option value="Film Covering">Film Covering</option>
                      <option value="PPF Couleur">PPF Couleur</option>
                      <option value="Autre">Autre</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Décrivez votre véhicule et vos besoins..."
                    rows={4}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-primary to-primary/80 text-white shadow-elegant hover-scale animate-glow"
                  size="lg"
                >
                  Envoyer ma demande
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6 animate-fade-in-right">
            <Card className="border-l-4 border-l-primary hover-lift interactive-card">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-primary mt-1 animate-glow" />
                  <div>
                    <h3 className="font-semibold mb-2">Téléphone</h3>
                    <p className="text-muted-foreground mb-2">0693 94 03 67</p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open('tel:0693940367')}
                      className="hover-scale"
                    >
                      Appeler maintenant
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-primary">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Email</h3>
                    <p className="text-muted-foreground mb-2">mouniamalorezo555@gmail.com</p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open('mailto:mouniamalorezo555@gmail.com')}
                    >
                      Envoyer un email
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-primary">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Adresse</h3>
                    <p className="text-muted-foreground">20 rue Saint Vincent de Paul<br />Le Tampon, La Réunion</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-primary">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Horaires</h3>
                    <p className="text-muted-foreground">Lundi au samedi<br />8h30 - 17h30</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-primary bg-primary/5">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Home className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2 text-primary">Service à domicile</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Nous nous déplaçons chez vous pour certains services !
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open('tel:0693940367')}
                    >
                      <Home className="mr-2 h-4 w-4" />
                      Demander un RDV
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-primary bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Instagram className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Instagram</h3>
                    <p className="text-muted-foreground mb-3">@lm.detailing974</p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open('https://instagram.com/lm.detailing974', '_blank')}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none hover:from-purple-600 hover:to-pink-600"
                    >
                      <Instagram className="mr-2 h-4 w-4" />
                      Suivre
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;