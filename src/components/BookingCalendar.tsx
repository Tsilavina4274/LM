import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Clock, User, Phone, Mail, Car, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const BookingCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>("");
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    nom: "",
    prenom: "",
    telephone: "",
    email: "",
    vehicule: "",
    commentaires: ""
  });

  // Créneaux horaires disponibles (8h30 à 17h30)
  const timeSlots = [
    "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00",
    "15:30", "16:00", "16:30", "17:00", "17:30"
  ];

  // Services disponibles
  const services = [
    { id: "express-nettoyage", name: "Express Detailing", price: "60€", duration: "2h" },
    { id: "pro-nettoyage", name: "Pro Detailing", price: "110€", duration: "4h" },
    { id: "ultimate-nettoyage", name: "Ultimate Detailing", price: "180€", duration: "5h" },
    { id: "express-renovation", name: "Express Rénovation", price: "40€", duration: "1h" },
    { id: "pro-renovation", name: "Pro Rénovation", price: "250€", duration: "6h" },
    { id: "ultimate-renovation", name: "Ultimate Rénovation", price: "450€", duration: "14h" },
    { id: "express-protection", name: "Express Protection", price: "230€", duration: "7h" },
    { id: "pro-protection", name: "Pro Protection", price: "850€", duration: "14h" },
    { id: "ultimate-protection", name: "Ultimate Protection", price: "Sur devis", duration: "35h" },
    { id: "film-solaire", name: "Film Solaire", price: "230€", duration: "4h" },
    { id: "film-covering", name: "Film Covering", price: "Sur devis", duration: "35h" },
    { id: "ppf-couleur", name: "PPF Couleur", price: "Sur devis", duration: "35h" }
  ];

  // Simule les créneaux occupés (à remplacer par des données réelles)
  const [bookedSlots, setBookedSlots] = useState<{[key: string]: string[]}>({
    "2024-01-15": ["09:00", "14:00"],
    "2024-01-16": ["10:30", "15:30"]
  });

  const handleFormChange = (field: string, value: string) => {
    setBookingForm(prev => ({ ...prev, [field]: value }));
  };

  const handleBooking = () => {
    if (!selectedDate || !selectedTime || !selectedService || !bookingForm.nom || !bookingForm.telephone) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    const dateKey = format(selectedDate, "yyyy-MM-dd");
    const newBooking = {
      id: Date.now().toString(),
      date: dateKey,
      time: selectedTime,
      service: selectedService,
      client: {
        nom: bookingForm.nom,
        prenom: bookingForm.prenom,
        telephone: bookingForm.telephone,
        email: bookingForm.email,
        vehicule: bookingForm.vehicule,
        commentaires: bookingForm.commentaires
      },
      statut: "en_attente", // Les clients créent des réservations en attente
      lieu: "atelier", // Par défaut
      dateCreation: new Date().toISOString()
    };

    // NE PAS ajouter le créneau aux créneaux occupés immédiatement
    // Il ne sera occupé qu'après confirmation par l'admin

    // Sauvegarder la réservation en attente
    const existingBookings = JSON.parse(localStorage.getItem('lm-bookings') || '[]');
    localStorage.setItem('lm-bookings', JSON.stringify([newBooking, ...existingBookings]));

    alert(`Votre demande de réservation a été envoyée pour le ${format(selectedDate, "dd MMMM yyyy", { locale: fr })} à ${selectedTime}.
Vous recevrez une confirmation par téléphone sous 24h.`);

    // Reset du formulaire
    setBookingForm({
      nom: "",
      prenom: "",
      telephone: "",
      email: "",
      vehicule: "",
      commentaires: ""
    });
    setSelectedTime("");
    setSelectedService("");
    setIsBookingOpen(false);
  };

  const isTimeSlotBooked = (time: string) => {
    if (!selectedDate) return false;
    const dateKey = format(selectedDate, "yyyy-MM-dd");
    return bookedSlots[dateKey]?.includes(time) || false;
  };

  const selectedServiceData = services.find(s => s.id === selectedService);

  return (
    <section id="reservation" className="py-20 bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Réservation <span className="text-red-600">en Ligne</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choisissez votre date, votre créneau et réservez votre service en quelques clics
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Calendrier */}
          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <CalendarIcon className="w-5 h-5 text-red-600" />
                Sélectionnez une date
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < new Date() || date.getDay() === 0} // Pas de dimanche
                className="rounded-md border border-gray-600 bg-gray-900/50 text-white"
                locale={fr}
              />
            </CardContent>
          </Card>

          {/* Sélection du service et créneau */}
          <div className="space-y-6">
            {/* Sélection du service */}
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Car className="w-5 h-5 text-red-600" />
                  Choisissez votre service
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={selectedService} onValueChange={setSelectedService}>
                  <SelectTrigger className="bg-gray-900/50 border-gray-600 text-white">
                    <SelectValue placeholder="Sélectionnez un service" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    {services.map((service) => (
                      <SelectItem key={service.id} value={service.id} className="text-white hover:bg-gray-700">
                        <div className="flex justify-between items-center w-full">
                          <span>{service.name}</span>
                          <div className="flex gap-2 ml-4">
                            <Badge variant="secondary" className="bg-red-600 text-white">
                              {service.price}
                            </Badge>
                            <Badge variant="outline" className="border-gray-500 text-gray-300">
                              {service.duration}
                            </Badge>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {selectedServiceData && (
                  <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-gray-600">
                    <h4 className="font-semibold text-white mb-2">{selectedServiceData.name}</h4>
                    <div className="flex gap-4 text-sm text-gray-300">
                      <span>Prix: <strong className="text-red-400">{selectedServiceData.price}</strong></span>
                      <span>Durée: <strong className="text-blue-400">{selectedServiceData.duration}</strong></span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Créneaux horaires */}
            {selectedDate && (
              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Clock className="w-5 h-5 text-red-600" />
                    Créneaux disponibles - {format(selectedDate, "dd MMMM yyyy", { locale: fr })}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTime(time)}
                        disabled={isTimeSlotBooked(time)}
                        className={`
                          ${selectedTime === time 
                            ? "bg-red-600 hover:bg-red-700 text-white" 
                            : "bg-gray-900/50 border-gray-600 text-white hover:bg-gray-700"
                          }
                          ${isTimeSlotBooked(time) ? "opacity-50 cursor-not-allowed" : ""}
                        `}
                      >
                        {time}
                        {isTimeSlotBooked(time) && <span className="ml-1 text-xs">(Occupé)</span>}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Bouton de réservation */}
            {selectedDate && selectedTime && selectedService && (
              <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                <DialogTrigger asChild>
                  <Button 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-2xl"
                  >
                    Confirmer la réservation
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-2xl text-center">
                      Finaliser votre réservation
                    </DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-6">
                    {/* Récapitulatif */}
                    <Card className="bg-gray-900/50 border-gray-600">
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2 text-red-400">Récapitulatif</h4>
                        <div className="space-y-1 text-sm">
                          <p><strong>Service:</strong> {selectedServiceData?.name}</p>
                          <p><strong>Date:</strong> {format(selectedDate, "dd MMMM yyyy", { locale: fr })}</p>
                          <p><strong>Heure:</strong> {selectedTime}</p>
                          <p><strong>Prix:</strong> {selectedServiceData?.price}</p>
                          <p><strong>Durée:</strong> {selectedServiceData?.duration}</p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Formulaire client */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="nom" className="text-white">Nom *</Label>
                        <Input
                          id="nom"
                          value={bookingForm.nom}
                          onChange={(e) => handleFormChange("nom", e.target.value)}
                          className="bg-gray-900/50 border-gray-600 text-white"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="prenom" className="text-white">Prénom</Label>
                        <Input
                          id="prenom"
                          value={bookingForm.prenom}
                          onChange={(e) => handleFormChange("prenom", e.target.value)}
                          className="bg-gray-900/50 border-gray-600 text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="telephone" className="text-white">Téléphone *</Label>
                        <Input
                          id="telephone"
                          type="tel"
                          value={bookingForm.telephone}
                          onChange={(e) => handleFormChange("telephone", e.target.value)}
                          className="bg-gray-900/50 border-gray-600 text-white"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-white">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={bookingForm.email}
                          onChange={(e) => handleFormChange("email", e.target.value)}
                          className="bg-gray-900/50 border-gray-600 text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="vehicule" className="text-white">Véhicule (marque, modèle, année)</Label>
                      <Input
                        id="vehicule"
                        value={bookingForm.vehicule}
                        onChange={(e) => handleFormChange("vehicule", e.target.value)}
                        className="bg-gray-900/50 border-gray-600 text-white"
                        placeholder="Ex: BMW Serie 3, 2020"
                      />
                    </div>

                    <div>
                      <Label htmlFor="commentaires" className="text-white">Commentaires ou demandes spéciales</Label>
                      <Textarea
                        id="commentaires"
                        value={bookingForm.commentaires}
                        onChange={(e) => handleFormChange("commentaires", e.target.value)}
                        className="bg-gray-900/50 border-gray-600 text-white"
                        rows={3}
                      />
                    </div>

                    <Button 
                      onClick={handleBooking}
                      className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                      size="lg"
                    >
                      Confirmer la réservation
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>

        {/* Informations pratiques */}
        <Card className="mt-12 bg-gray-800/50 border-gray-700 backdrop-blur-sm max-w-4xl mx-auto">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4 text-white">Informations pratiques</h3>
            <div className="grid md:grid-cols-2 gap-6 text-gray-300">
              <div>
                <h4 className="font-semibold text-red-400 mb-2">Horaires d'ouverture</h4>
                <p>Lundi au samedi : 8h30 - 17h30</p>
                <p>Dimanche : Fermé</p>
              </div>
              <div>
                <h4 className="font-semibold text-red-400 mb-2">Service à domicile</h4>
                <p>Disponible sur toute l'île de La Réunion</p>
                <p>Supplément selon la zone</p>
              </div>
              <div>
                <h4 className="font-semibold text-red-400 mb-2">Annulation</h4>
                <p>Possible jusqu'à 24h avant le rendez-vous</p>
                <p>Contactez-nous au 06 93 94 03 67</p>
              </div>
              <div>
                <h4 className="font-semibold text-red-400 mb-2">Paiement</h4>
                <p>Espèces, CB, virement</p>
                <p>Acompte possible pour certains services</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default BookingCalendar;
