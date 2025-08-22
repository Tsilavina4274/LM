import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Phone,
  Mail,
  Car,
  Edit,
  Trash2,
  Eye,
  Plus,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  AlertTriangle,
  MapPin
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface Booking {
  id: string;
  date: string;
  time: string;
  service: string;
  client: {
    nom: string;
    prenom: string;
    telephone: string;
    email: string;
    vehicule: string;
    commentaires: string;
  };
  statut: "en_attente" | "confirmee" | "en_cours" | "terminee" | "annulee" | "refusee";
  lieu: "atelier" | "domicile";
  prix?: string;
  notes?: string;
  dateCreation: string;
}

const BookingManager = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDate, setFilterDate] = useState("all");
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<Date | undefined>(new Date());

  const [newBooking, setNewBooking] = useState({
    date: "",
    time: "",
    service: "",
    client: {
      nom: "",
      prenom: "",
      telephone: "",
      email: "",
      vehicule: "",
      commentaires: ""
    },
    lieu: "atelier",
    prix: "",
    notes: ""
  });

  const services = [
    "Express Detailing", "Pro Detailing", "Ultimate Detailing",
    "Express Rénovation", "Pro Rénovation", "Ultimate Rénovation",
    "Express Protection", "Pro Protection", "Ultimate Protection",
    "Film Solaire", "Film Covering", "PPF Couleur"
  ];

  const timeSlots = [
    "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00",
    "15:30", "16:00", "16:30", "17:00", "17:30"
  ];

  // Charger les réservations depuis localStorage
  useEffect(() => {
    const savedBookings = localStorage.getItem('lm-bookings');
    if (savedBookings) {
      try {
        const parsedBookings = JSON.parse(savedBookings);
        setBookings(parsedBookings);
        setFilteredBookings(parsedBookings);
      } catch (error) {
        console.error('Erreur lors du chargement des réservations:', error);
      }
    }
  }, []);

  // Filtrer les réservations
  useEffect(() => {
    let filtered = bookings;

    if (searchTerm) {
      filtered = filtered.filter(booking => 
        booking.client.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.client.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.client.telephone.includes(searchTerm) ||
        booking.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.client.vehicule.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter(booking => booking.statut === filterStatus);
    }

    if (filterDate !== "all") {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const nextWeek = new Date(today);
      nextWeek.setDate(nextWeek.getDate() + 7);

      switch (filterDate) {
        case "today":
          filtered = filtered.filter(booking => booking.date === format(today, "yyyy-MM-dd"));
          break;
        case "tomorrow":
          filtered = filtered.filter(booking => booking.date === format(tomorrow, "yyyy-MM-dd"));
          break;
        case "week":
          filtered = filtered.filter(booking => {
            const bookingDate = new Date(booking.date);
            return bookingDate >= today && bookingDate <= nextWeek;
          });
          break;
      }
    }

    setFilteredBookings(filtered);
  }, [bookings, searchTerm, filterStatus, filterDate]);

  const saveBookings = (updatedBookings: Booking[]) => {
    setBookings(updatedBookings);
    localStorage.setItem('lm-bookings', JSON.stringify(updatedBookings));
  };

  const updateBookingStatus = (bookingId: string, newStatus: Booking['statut']) => {
    const updatedBookings = bookings.map(booking =>
      booking.id === bookingId ? { ...booking, statut: newStatus } : booking
    );
    saveBookings(updatedBookings);
  };

  const deleteBooking = (bookingId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette réservation ?')) {
      const updatedBookings = bookings.filter(booking => booking.id !== bookingId);
      saveBookings(updatedBookings);
    }
  };

  const handleAddBooking = () => {
    if (!newBooking.date || !newBooking.time || !newBooking.service || !newBooking.client.nom || !newBooking.client.telephone) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const booking: Booking = {
      id: Date.now().toString(),
      date: newBooking.date,
      time: newBooking.time,
      service: newBooking.service,
      client: newBooking.client,
      statut: "confirmee",
      lieu: newBooking.lieu as "atelier" | "domicile",
      prix: newBooking.prix,
      notes: newBooking.notes,
      dateCreation: new Date().toISOString()
    };

    const updatedBookings = [booking, ...bookings];
    saveBookings(updatedBookings);

    // Reset form
    setNewBooking({
      date: "",
      time: "",
      service: "",
      client: {
        nom: "",
        prenom: "",
        telephone: "",
        email: "",
        vehicule: "",
        commentaires: ""
      },
      lieu: "atelier",
      prix: "",
      notes: ""
    });
    setIsAddModalOpen(false);
  };

  const handleEditBooking = () => {
    if (!selectedBooking) return;

    const updatedBookings = bookings.map(booking =>
      booking.id === selectedBooking.id ? selectedBooking : booking
    );
    saveBookings(updatedBookings);
    setIsEditModalOpen(false);
    setSelectedBooking(null);
  };

  const openViewModal = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsViewModalOpen(true);
  };

  const openEditModal = (booking: Booking) => {
    setSelectedBooking({ ...booking });
    setIsEditModalOpen(true);
  };

  const getStatusBadge = (statut: Booking['statut']) => {
    const statusConfig = {
      confirmee: { label: "Confirmée", color: "bg-blue-600", icon: CheckCircle },
      en_cours: { label: "En cours", color: "bg-orange-500", icon: Clock },
      terminee: { label: "Terminée", color: "bg-green-600", icon: CheckCircle },
      annulee: { label: "Annulée", color: "bg-red-600", icon: XCircle }
    };

    const config = statusConfig[statut];
    const IconComponent = config.icon;

    return (
      <Badge className={`${config.color} text-white`}>
        <IconComponent className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  const stats = {
    total: bookings.length,
    confirmees: bookings.filter(b => b.statut === "confirmee").length,
    enCours: bookings.filter(b => b.statut === "en_cours").length,
    aujourd_hui: bookings.filter(b => b.date === format(new Date(), "yyyy-MM-dd")).length
  };

  return (
    <div className="space-y-6">
      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total réservations</p>
                <p className="text-2xl font-bold text-white">{stats.total}</p>
              </div>
              <CalendarIcon className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Confirmées</p>
                <p className="text-2xl font-bold text-white">{stats.confirmees}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">En cours</p>
                <p className="text-2xl font-bold text-white">{stats.enCours}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Aujourd'hui</p>
                <p className="text-2xl font-bold text-white">{stats.aujourd_hui}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions et filtres */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold text-white">Gestion des rendez-vous</h2>
        
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-red-600 hover:bg-red-700">
              <Plus className="w-4 h-4 mr-2" />
              Nouveau rendez-vous
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Ajouter un nouveau rendez-vous</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Date *</label>
                  <Input
                    type="date"
                    value={newBooking.date}
                    onChange={(e) => setNewBooking(prev => ({ ...prev, date: e.target.value }))}
                    className="bg-gray-900/50 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Heure *</label>
                  <Select value={newBooking.time} onValueChange={(value) => setNewBooking(prev => ({ ...prev, time: value }))}>
                    <SelectTrigger className="bg-gray-900/50 border-gray-600 text-white">
                      <SelectValue placeholder="Sélectionnez l'heure" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>{time}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Service *</label>
                <Select value={newBooking.service} onValueChange={(value) => setNewBooking(prev => ({ ...prev, service: value }))}>
                  <SelectTrigger className="bg-gray-900/50 border-gray-600 text-white">
                    <SelectValue placeholder="Sélectionnez le service" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    {services.map((service) => (
                      <SelectItem key={service} value={service}>{service}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Nom *</label>
                  <Input
                    value={newBooking.client.nom}
                    onChange={(e) => setNewBooking(prev => ({ 
                      ...prev, 
                      client: { ...prev.client, nom: e.target.value }
                    }))}
                    className="bg-gray-900/50 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Prénom</label>
                  <Input
                    value={newBooking.client.prenom}
                    onChange={(e) => setNewBooking(prev => ({ 
                      ...prev, 
                      client: { ...prev.client, prenom: e.target.value }
                    }))}
                    className="bg-gray-900/50 border-gray-600 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Téléphone *</label>
                  <Input
                    value={newBooking.client.telephone}
                    onChange={(e) => setNewBooking(prev => ({ 
                      ...prev, 
                      client: { ...prev.client, telephone: e.target.value }
                    }))}
                    className="bg-gray-900/50 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Email</label>
                  <Input
                    type="email"
                    value={newBooking.client.email}
                    onChange={(e) => setNewBooking(prev => ({ 
                      ...prev, 
                      client: { ...prev.client, email: e.target.value }
                    }))}
                    className="bg-gray-900/50 border-gray-600 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Véhicule</label>
                <Input
                  value={newBooking.client.vehicule}
                  onChange={(e) => setNewBooking(prev => ({ 
                    ...prev, 
                    client: { ...prev.client, vehicule: e.target.value }
                  }))}
                  placeholder="Ex: BMW Serie 3, 2020"
                  className="bg-gray-900/50 border-gray-600 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Lieu</label>
                  <Select value={newBooking.lieu} onValueChange={(value) => setNewBooking(prev => ({ ...prev, lieu: value }))}>
                    <SelectTrigger className="bg-gray-900/50 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      <SelectItem value="atelier">Atelier</SelectItem>
                      <SelectItem value="domicile">Domicile</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Prix</label>
                  <Input
                    value={newBooking.prix}
                    onChange={(e) => setNewBooking(prev => ({ ...prev, prix: e.target.value }))}
                    placeholder="Ex: 150€"
                    className="bg-gray-900/50 border-gray-600 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Commentaires</label>
                <Textarea
                  value={newBooking.client.commentaires}
                  onChange={(e) => setNewBooking(prev => ({ 
                    ...prev, 
                    client: { ...prev.client, commentaires: e.target.value }
                  }))}
                  className="bg-gray-900/50 border-gray-600 text-white"
                  rows={3}
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Notes internes</label>
                <Textarea
                  value={newBooking.notes}
                  onChange={(e) => setNewBooking(prev => ({ ...prev, notes: e.target.value }))}
                  className="bg-gray-900/50 border-gray-600 text-white"
                  rows={2}
                />
              </div>

              <Button onClick={handleAddBooking} className="w-full bg-red-600 hover:bg-red-700">
                Créer le rendez-vous
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filtres et recherche */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Rechercher par nom, téléphone, service..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-gray-900/50 border-gray-600 text-white pl-10"
                />
              </div>
            </div>
            <div className="w-full md:w-48">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="bg-gray-900/50 border-gray-600 text-white">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="confirmee">Confirmées</SelectItem>
                  <SelectItem value="en_cours">En cours</SelectItem>
                  <SelectItem value="terminee">Terminées</SelectItem>
                  <SelectItem value="annulee">Annulées</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-48">
              <Select value={filterDate} onValueChange={setFilterDate}>
                <SelectTrigger className="bg-gray-900/50 border-gray-600 text-white">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="all">Toutes les dates</SelectItem>
                  <SelectItem value="today">Aujourd'hui</SelectItem>
                  <SelectItem value="tomorrow">Demain</SelectItem>
                  <SelectItem value="week">Cette semaine</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liste des réservations */}
      <div className="space-y-4">
        {filteredBookings.length === 0 ? (
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-12 text-center">
              <CalendarIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">Aucun rendez-vous trouvé</p>
              <p className="text-gray-500 text-sm">Ajoutez un nouveau rendez-vous ou modifiez vos filtres</p>
            </CardContent>
          </Card>
        ) : (
          filteredBookings.map((booking) => (
            <Card key={booking.id} className="bg-gray-800/50 border-gray-700 hover:bg-gray-700/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-lg font-semibold text-white">
                        {booking.client.nom} {booking.client.prenom}
                      </h3>
                      {getStatusBadge(booking.statut)}
                      <Badge variant="outline" className="border-gray-600 text-gray-300 text-xs">
                        {booking.lieu === "domicile" ? "Domicile" : "Atelier"}
                      </Badge>
                      {booking.prix && (
                        <Badge className="bg-green-600 text-white text-xs">
                          {booking.prix}
                        </Badge>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4" />
                        <span>{format(new Date(booking.date), "dd MMMM yyyy", { locale: fr })}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{booking.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <span>{booking.client.telephone}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Badge variant="outline" className="border-blue-600 text-blue-300">
                        {booking.service}
                      </Badge>
                      {booking.client.vehicule && (
                        <div className="flex items-center gap-1 text-gray-400">
                          <Car className="w-4 h-4" />
                          <span>{booking.client.vehicule}</span>
                        </div>
                      )}
                    </div>

                    {(booking.client.commentaires || booking.notes) && (
                      <div className="text-sm text-gray-300 space-y-1">
                        {booking.client.commentaires && (
                          <p><strong>Client:</strong> {booking.client.commentaires}</p>
                        )}
                        {booking.notes && (
                          <p><strong>Notes:</strong> {booking.notes}</p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <Select 
                      value={booking.statut} 
                      onValueChange={(value) => updateBookingStatus(booking.id, value as Booking['statut'])}
                    >
                      <SelectTrigger className="bg-gray-900/50 border-gray-600 text-white text-xs w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        <SelectItem value="confirmee">Confirmée</SelectItem>
                        <SelectItem value="en_cours">En cours</SelectItem>
                        <SelectItem value="terminee">Terminée</SelectItem>
                        <SelectItem value="annulee">Annulée</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openViewModal(booking)}
                        className="border-gray-600 text-gray-300 w-8 h-8 p-0"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEditModal(booking)}
                        className="border-gray-600 text-gray-300 w-8 h-8 p-0"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteBooking(booking.id)}
                        className="w-8 h-8 p-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Modal de visualisation */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>Détails du rendez-vous</DialogTitle>
          </DialogHeader>

          {selectedBooking && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Client</p>
                  <p className="font-semibold">{selectedBooking.client.nom} {selectedBooking.client.prenom}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Statut</p>
                  {getStatusBadge(selectedBooking.statut)}
                </div>
                <div>
                  <p className="text-sm text-gray-400">Date</p>
                  <p>{format(new Date(selectedBooking.date), "dd MMMM yyyy", { locale: fr })}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Heure</p>
                  <p>{selectedBooking.time}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Service</p>
                  <p>{selectedBooking.service}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Lieu</p>
                  <p>{selectedBooking.lieu === "domicile" ? "Domicile" : "Atelier"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Téléphone</p>
                  <p>{selectedBooking.client.telephone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p>{selectedBooking.client.email || "Non renseigné"}</p>
                </div>
              </div>

              {selectedBooking.client.vehicule && (
                <div>
                  <p className="text-sm text-gray-400 mb-2">Véhicule</p>
                  <p>{selectedBooking.client.vehicule}</p>
                </div>
              )}

              {selectedBooking.prix && (
                <div>
                  <p className="text-sm text-gray-400 mb-2">Prix</p>
                  <Badge className="bg-green-600">{selectedBooking.prix}</Badge>
                </div>
              )}

              {selectedBooking.client.commentaires && (
                <div>
                  <p className="text-sm text-gray-400 mb-2">Commentaires client</p>
                  <div className="bg-gray-900/50 p-4 rounded-lg">
                    <p>{selectedBooking.client.commentaires}</p>
                  </div>
                </div>
              )}

              {selectedBooking.notes && (
                <div>
                  <p className="text-sm text-gray-400 mb-2">Notes internes</p>
                  <div className="bg-gray-900/50 p-4 rounded-lg">
                    <p>{selectedBooking.notes}</p>
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => window.open(`tel:${selectedBooking.client.telephone}`, '_blank')}
                  className="border-gray-600 text-gray-300"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Appeler
                </Button>
                {selectedBooking.client.email && (
                  <Button
                    variant="outline"
                    onClick={() => window.open(`mailto:${selectedBooking.client.email}`, '_blank')}
                    className="border-gray-600 text-gray-300"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal d'édition */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Modifier le rendez-vous</DialogTitle>
          </DialogHeader>

          {selectedBooking && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Date</label>
                  <Input
                    type="date"
                    value={selectedBooking.date}
                    onChange={(e) => setSelectedBooking(prev => prev ? { ...prev, date: e.target.value } : null)}
                    className="bg-gray-900/50 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Heure</label>
                  <Select 
                    value={selectedBooking.time} 
                    onValueChange={(value) => setSelectedBooking(prev => prev ? { ...prev, time: value } : null)}
                  >
                    <SelectTrigger className="bg-gray-900/50 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>{time}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Service</label>
                <Select 
                  value={selectedBooking.service} 
                  onValueChange={(value) => setSelectedBooking(prev => prev ? { ...prev, service: value } : null)}
                >
                  <SelectTrigger className="bg-gray-900/50 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    {services.map((service) => (
                      <SelectItem key={service} value={service}>{service}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Nom</label>
                  <Input
                    value={selectedBooking.client.nom}
                    onChange={(e) => setSelectedBooking(prev => prev ? { 
                      ...prev, 
                      client: { ...prev.client, nom: e.target.value }
                    } : null)}
                    className="bg-gray-900/50 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Prénom</label>
                  <Input
                    value={selectedBooking.client.prenom}
                    onChange={(e) => setSelectedBooking(prev => prev ? { 
                      ...prev, 
                      client: { ...prev.client, prenom: e.target.value }
                    } : null)}
                    className="bg-gray-900/50 border-gray-600 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Téléphone</label>
                  <Input
                    value={selectedBooking.client.telephone}
                    onChange={(e) => setSelectedBooking(prev => prev ? { 
                      ...prev, 
                      client: { ...prev.client, telephone: e.target.value }
                    } : null)}
                    className="bg-gray-900/50 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Email</label>
                  <Input
                    type="email"
                    value={selectedBooking.client.email}
                    onChange={(e) => setSelectedBooking(prev => prev ? { 
                      ...prev, 
                      client: { ...prev.client, email: e.target.value }
                    } : null)}
                    className="bg-gray-900/50 border-gray-600 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Véhicule</label>
                <Input
                  value={selectedBooking.client.vehicule}
                  onChange={(e) => setSelectedBooking(prev => prev ? { 
                    ...prev, 
                    client: { ...prev.client, vehicule: e.target.value }
                  } : null)}
                  className="bg-gray-900/50 border-gray-600 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Lieu</label>
                  <Select 
                    value={selectedBooking.lieu} 
                    onValueChange={(value) => setSelectedBooking(prev => prev ? { 
                      ...prev, 
                      lieu: value as "atelier" | "domicile"
                    } : null)}
                  >
                    <SelectTrigger className="bg-gray-900/50 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      <SelectItem value="atelier">Atelier</SelectItem>
                      <SelectItem value="domicile">Domicile</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Prix</label>
                  <Input
                    value={selectedBooking.prix || ""}
                    onChange={(e) => setSelectedBooking(prev => prev ? { ...prev, prix: e.target.value } : null)}
                    placeholder="Ex: 150€"
                    className="bg-gray-900/50 border-gray-600 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Commentaires client</label>
                <Textarea
                  value={selectedBooking.client.commentaires}
                  onChange={(e) => setSelectedBooking(prev => prev ? { 
                    ...prev, 
                    client: { ...prev.client, commentaires: e.target.value }
                  } : null)}
                  className="bg-gray-900/50 border-gray-600 text-white"
                  rows={3}
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Notes internes</label>
                <Textarea
                  value={selectedBooking.notes || ""}
                  onChange={(e) => setSelectedBooking(prev => prev ? { ...prev, notes: e.target.value } : null)}
                  className="bg-gray-900/50 border-gray-600 text-white"
                  rows={2}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleEditBooking} className="flex-1 bg-red-600 hover:bg-red-700">
                  Enregistrer les modifications
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditModalOpen(false)}
                  className="border-gray-600 text-gray-300"
                >
                  Annuler
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookingManager;
