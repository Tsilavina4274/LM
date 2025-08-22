import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Mail, 
  Phone, 
  User, 
  Calendar,
  Eye,
  Trash2,
  MessageSquare,
  Reply,
  Archive,
  Search,
  Filter,
  Star,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface Contact {
  id: string;
  nom: string;
  email: string;
  telephone: string;
  service: string;
  message: string;
  dateEnvoi: string;
  statut: "nouveau" | "en_cours" | "traite" | "archive";
  lu: boolean;
  priorite?: "basse" | "normale" | "haute";
  reponse?: string;
  dateReponse?: string;
}

const ContactManager = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [replyMessage, setReplyMessage] = useState("");

  // Charger les contacts depuis localStorage
  useEffect(() => {
    const savedContacts = localStorage.getItem('lm-contacts');
    if (savedContacts) {
      try {
        const parsedContacts = JSON.parse(savedContacts);
        setContacts(parsedContacts);
        setFilteredContacts(parsedContacts);
      } catch (error) {
        console.error('Erreur lors du chargement des contacts:', error);
      }
    }
  }, []);

  // Filtrer les contacts
  useEffect(() => {
    let filtered = contacts;

    if (searchTerm) {
      filtered = filtered.filter(contact => 
        contact.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter(contact => contact.statut === filterStatus);
    }

    if (filterPriority !== "all") {
      filtered = filtered.filter(contact => contact.priorite === filterPriority);
    }

    setFilteredContacts(filtered);
  }, [contacts, searchTerm, filterStatus, filterPriority]);

  const saveContacts = (updatedContacts: Contact[]) => {
    setContacts(updatedContacts);
    localStorage.setItem('lm-contacts', JSON.stringify(updatedContacts));
  };

  const markAsRead = (contactId: string) => {
    const updatedContacts = contacts.map(contact =>
      contact.id === contactId ? { ...contact, lu: true } : contact
    );
    saveContacts(updatedContacts);
  };

  const updateContactStatus = (contactId: string, newStatus: Contact['statut']) => {
    const updatedContacts = contacts.map(contact =>
      contact.id === contactId ? { ...contact, statut: newStatus, lu: true } : contact
    );
    saveContacts(updatedContacts);
  };

  const updateContactPriority = (contactId: string, priority: Contact['priorite']) => {
    const updatedContacts = contacts.map(contact =>
      contact.id === contactId ? { ...contact, priorite: priority } : contact
    );
    saveContacts(updatedContacts);
  };

  const deleteContact = (contactId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce contact ?')) {
      const updatedContacts = contacts.filter(contact => contact.id !== contactId);
      saveContacts(updatedContacts);
    }
  };

  const openViewModal = (contact: Contact) => {
    setSelectedContact(contact);
    setIsViewModalOpen(true);
    markAsRead(contact.id);
  };

  const openReplyModal = (contact: Contact) => {
    setSelectedContact(contact);
    setIsReplyModalOpen(true);
    setReplyMessage("");
    markAsRead(contact.id);
  };

  const sendReply = () => {
    if (!selectedContact || !replyMessage) return;

    // Créer le lien mailto avec la réponse
    const subject = `Réponse: ${selectedContact.service} - LM Detailing`;
    const body = `Bonjour ${selectedContact.nom},

${replyMessage}

Cordialement,
L'équipe LM Detailing
Tél: 06 93 94 03 67
Email: mouniamalorezo555@gmail.com

---
Message original du ${format(new Date(selectedContact.dateEnvoi), "dd MMMM yyyy à HH:mm", { locale: fr })}:
${selectedContact.message}`;

    // const mailtoLink = `mailto:${selectedContact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const mailtoLink= `https://mail.google.com/mail/?view=cm&fs=1&to=${selectedContact.email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    try {
      if (navigator.onLine) {
        console.log('Ouverture de Gmail…');
        window.open(mailtoLink, '_blank');
      } else {
        alert("Veuillez vérifier votre connexion Internet avant d'envoyer un message.");
      }
    } catch (error) {
      console.error("Erreur lors de l'ouverture de Gmail :", error);
      alert("Impossible d'ouvrir Gmail. Veuillez nous contacter manuellement à : " + selectedContact.email);
    }

    // Sauvegarder la réponse
    const updatedContacts = contacts.map(contact =>
      contact.id === selectedContact.id 
        ? { 
            ...contact, 
            statut: "traite" as const,
            reponse: replyMessage,
            dateReponse: new Date().toISOString(),
            lu: true
          } 
        : contact
    );
    saveContacts(updatedContacts);

    setIsReplyModalOpen(false);
    setReplyMessage("");
  };

  const getStatusBadge = (statut: Contact['statut']) => {
    const statusConfig = {
      nouveau: { label: "Nouveau", color: "bg-blue-600", icon: AlertCircle },
      en_cours: { label: "En cours", color: "bg-orange-500", icon: Clock },
      traite: { label: "Traité", color: "bg-green-600", icon: CheckCircle },
      archive: { label: "Archivé", color: "bg-gray-600", icon: Archive }
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

  const getPriorityBadge = (priorite?: Contact['priorite']) => {
    if (!priorite) return null;

    const priorityConfig = {
      basse: { label: "Basse", color: "bg-gray-500" },
      normale: { label: "Normale", color: "bg-blue-500" },
      haute: { label: "Haute", color: "bg-red-500" }
    };

    const config = priorityConfig[priorite];
    return (
      <Badge className={`${config.color} text-white text-xs`}>
        {config.label}
      </Badge>
    );
  };

  const stats = {
    total: contacts.length,
    nouveaux: contacts.filter(c => c.statut === "nouveau").length,
    enCours: contacts.filter(c => c.statut === "en_cours").length,
    nonLus: contacts.filter(c => !c.lu).length
  };

  return (
    <div className="space-y-6">
      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total contacts</p>
                <p className="text-2xl font-bold text-white">{stats.total}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Nouveaux</p>
                <p className="text-2xl font-bold text-white">{stats.nouveaux}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-orange-500" />
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
              <Clock className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Non lus</p>
                <p className="text-2xl font-bold text-white">{stats.nonLus}</p>
              </div>
              <Mail className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtres et recherche */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Rechercher par nom, email, service..."
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
                  <SelectItem value="nouveau">Nouveaux</SelectItem>
                  <SelectItem value="en_cours">En cours</SelectItem>
                  <SelectItem value="traite">Traités</SelectItem>
                  {/* <SelectItem value="archive">Archivés</SelectItem> */}
                </SelectContent>
              </Select>
            </div>
            {/* <div className="w-full md:w-48">
              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger className="bg-gray-900/50 border-gray-600 text-white">
                  <Star className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="all">Toutes priorités</SelectItem>
                  <SelectItem value="haute">Haute</SelectItem>
                  <SelectItem value="normale">Normale</SelectItem>
                  <SelectItem value="basse">Basse</SelectItem>
                </SelectContent>
              </Select>
            </div> */}
          </div>
        </CardContent>
      </Card>

      {/* Liste des contacts */}
      <div className="space-y-4">
        {filteredContacts.length === 0 ? (
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-12 text-center">
              <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">Aucun contact trouvé</p>
              <p className="text-gray-500 text-sm">Modifiez vos filtres ou attendez de nouveaux messages</p>
            </CardContent>
          </Card>
        ) : (
          filteredContacts.map((contact) => (
            <Card 
              key={contact.id} 
              className={`bg-gray-800/50 border-gray-700 hover:bg-gray-700/50 transition-colors ${!contact.lu ? 'border-blue-500/50' : ''}`}
            >
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-white">{contact.nom}</h3>
                      {!contact.lu && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                      {getStatusBadge(contact.statut)}
                      {getPriorityBadge(contact.priorite)}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <span>{contact.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <span>{contact.telephone}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span>{format(new Date(contact.dateEnvoi), "dd MMMM yyyy à HH:mm", { locale: fr })}</span>
                      {contact.service && (
                        <>
                          <span>•</span>
                          <Badge variant="outline" className="border-gray-600 text-gray-300 text-xs">
                            {contact.service}
                          </Badge>
                        </>
                      )}
                    </div>

                    <p className="text-gray-300 line-clamp-2">{contact.message}</p>
                  </div>

                  <div className="flex flex-col md:flex-row gap-2">
                    <Select 
                      value={contact.statut} 
                      onValueChange={(value) => updateContactStatus(contact.id, value as Contact['statut'])}
                    >
                      <SelectTrigger className="bg-gray-900/50 border-gray-600 text-white text-xs w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        <SelectItem value="nouveau">Nouveau</SelectItem>
                        <SelectItem value="en_cours">En cours</SelectItem>
                        <SelectItem value="traite">Traité</SelectItem>
                        {/* <SelectItem value="archive">Archivé</SelectItem> */}
                      </SelectContent>
                    </Select>

                    {/* <Select 
                      value={contact.priorite || "normale"} 
                      onValueChange={(value) => updateContactPriority(contact.id, value as Contact['priorite'])}
                    >
                      <SelectTrigger className="bg-gray-900/50 border-gray-600 text-white text-xs w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        <SelectItem value="basse">Basse</SelectItem>
                        <SelectItem value="normale">Normale</SelectItem>
                        <SelectItem value="haute">Haute</SelectItem>
                      </SelectContent>
                    </Select> */}

                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openViewModal(contact)}
                        className="border-gray-600 text-gray-300 w-8 h-8 p-0"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openReplyModal(contact)}
                        className="border-gray-600 text-gray-300 w-8 h-8 p-0"
                      >
                        <Reply className="w-4 h-4" />
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteContact(contact.id)}
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
            <DialogTitle>Détails du contact</DialogTitle>
          </DialogHeader>

          {selectedContact && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Nom</p>
                  <p className="font-semibold">{selectedContact.nom}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Statut</p>
                  {getStatusBadge(selectedContact.statut)}
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p>{selectedContact.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Téléphone</p>
                  <p>{selectedContact.telephone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Service demandé</p>
                  <p>{selectedContact.service || "Non spécifié"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Date</p>
                  <p>{format(new Date(selectedContact.dateEnvoi), "dd MMMM yyyy à HH:mm", { locale: fr })}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-400 mb-2">Message</p>
                <div className="bg-gray-900/50 p-4 rounded-lg">
                  <p className="whitespace-pre-wrap">{selectedContact.message}</p>
                </div>
              </div>

              {selectedContact.reponse && (
                <div>
                  <p className="text-sm text-gray-400 mb-2">Réponse envoyée</p>
                  <div className="bg-green-900/20 border border-green-600/30 p-4 rounded-lg">
                    <p className="text-sm text-gray-400 mb-2">
                      {selectedContact.dateReponse && format(new Date(selectedContact.dateReponse), "dd MMMM yyyy à HH:mm", { locale: fr })}
                    </p>
                    <p className="whitespace-pre-wrap">{selectedContact.reponse}</p>
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <Button 
                  onClick={() => {
                    setIsViewModalOpen(false);
                    openReplyModal(selectedContact);
                  }}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <Reply className="w-4 h-4 mr-2" />
                  Répondre
                </Button>
                {/* <Button
                  variant="outline"
                  onClick={() => window.open(`mailto:${selectedContact.email}`, '_blank')}
                  className="border-gray-600 text-gray-300"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Ouvrir email
                </Button> */}
                <Button
                  variant="outline"
                  onClick={() => window.open(`tel:${selectedContact.telephone}`, '_blank')}
                  className="border-gray-600 text-gray-300"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Appeler
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal de réponse */}
      <Dialog open={isReplyModalOpen} onOpenChange={setIsReplyModalOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>Répondre à {selectedContact?.nom}</DialogTitle>
          </DialogHeader>

          {selectedContact && (
            <div className="space-y-4">
              <div className="bg-gray-900/50 p-4 rounded-lg">
                <p className="text-sm text-gray-400 mb-2">Message original:</p>
                <p className="text-sm">{selectedContact.message}</p>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Votre réponse:</label>
                <Textarea
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Saisissez votre réponse..."
                  className="bg-gray-900/50 border-gray-600 text-white"
                  rows={6}
                />
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={sendReply}
                  disabled={!replyMessage.trim()}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <Reply className="w-4 h-4 mr-2" />
                  Envoyer la réponse
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsReplyModalOpen(false)}
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

export default ContactManager;
