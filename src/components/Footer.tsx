import { Phone, Mail, MapPin, Instagram } from "lucide-react";
import logoLM from "@/assets/logo-lm-detailing.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img src={logoLM} alt="LM Detailing" className="h-12 w-12 rounded-full" />
              <span className="text-2xl font-bold">LM Detailing</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Votre spécialiste du detailing automobile à La Réunion. 
              Nettoyage, rénovation, protection et personnalisation de véhicules.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => window.open('https://instagram.com/lm.detailing974', '_blank')}
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Nos Services</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Nettoyage automobile</li>
              <li>Rénovation véhicule</li>
              <li>Protection céramique</li>
              <li>Film covering</li>
              <li>Film solaire</li>
              <li>PPF couleur</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <a href="tel:0693940367" className="hover:text-primary transition-colors">
                  0693 94 03 67
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:mouniamalorezo555@gmail.com" className="hover:text-primary transition-colors">
                  mouniamalorezo555@gmail.com
                </a>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-1" />
                <div>
                  <p>20 rue Saint Vincent de Paul</p>
                  <p>Le Tampon, La Réunion</p>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-white/5 rounded-lg">
              <p className="text-sm font-medium text-primary">Horaires</p>
              <p className="text-sm text-gray-300">Lundi au samedi</p>
              <p className="text-sm text-gray-300">8h30 - 17h30</p>
            </div>
          </div>
        </div>

        <hr className="my-8 border-gray-600" />

        <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>&copy; {currentYear} LM Detailing. Tous droits réservés.</p>
          <p className="mt-2 md:mt-0">
            Detailing automobile premium à La Réunion
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;