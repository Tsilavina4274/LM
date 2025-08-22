import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import ImageGalleryManager from "@/components/admin/ImageGalleryManager";
import ContactManager from "@/components/admin/ContactManager";
import BookingManager from "@/components/admin/BookingManager";
import {
  LogOut,
  Settings,
  Users,
  Calendar,
  MessageSquare,
  Images,
  BarChart,
  Phone,
  Mail,
  Clock
} from "lucide-react";

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Vérifier l'authentification
    const authStatus = localStorage.getItem('lm-admin-auth');
    if (authStatus !== 'true') {
      navigate('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('lm-admin-auth');
    localStorage.removeItem('lm-admin-user');
    navigate('/');
  };

  // Simulation des données (à remplacer par des vraies données)
  const [stats, setStats] = useState({
    totalBookings: 24,
    pendingBookings: 5,
    totalContacts: 12,
    newContacts: 3,
    totalImages: 45,
    revenue: "2,850€"
  });

  // Récupérer les réservations depuis le localStorage
  const [bookings, setBookings] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('lm-bookings') || '[]');
    } catch {
      return [];
    }
  });

  // Récupérer les contacts depuis le localStorage
  const [contacts, setContacts] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('lm-contacts') || '[]');
    } catch {
      return [];
    }
  });

  if (!isAuthenticated) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Header Admin */}
      <header className="bg-gray-800/50 border-b border-gray-700 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src="/src/assets/logo-lm-detailing.png" alt="LM Detailing" className="w-10 h-10 rounded-full" />
              <div>
                <h1 className="text-xl font-bold text-white">LM Detailing Admin</h1>
                <p className="text-sm text-gray-400">Interface d'administration</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="text-white hover:bg-white/10"
              >
                Voir le site
              </Button>
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="text-white hover:bg-white/10"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Navigation des onglets */}
          <TabsList className="grid w-full grid-cols-5 bg-gray-800/50 border-gray-700">
            {/* <TabsTrigger value="dashboard" className="data-[state=active]:bg-red-600">
              <BarChart className="w-4 h-4 mr-2" />
              Tableau de bord
            </TabsTrigger> */}
            <TabsTrigger value="bookings" className="data-[state=active]:bg-red-600">
              <Calendar className="w-4 h-4 mr-2" />
              Réservations
            </TabsTrigger>
            <TabsTrigger value="contacts" className="data-[state=active]:bg-red-600">
              <MessageSquare className="w-4 h-4 mr-2" />
              Contacts
            </TabsTrigger>
            <TabsTrigger value="gallery" className="data-[state=active]:bg-red-600">
              <Images className="w-4 h-4 mr-2" />
              Galerie
            </TabsTrigger>
            {/* <TabsTrigger value="settings" className="data-[state=active]:bg-red-600">
              <Settings className="w-4 h-4 mr-2" />
              Paramètres
            </TabsTrigger> */}
          </TabsList>

          {/* Tableau de bord */}
          {/* <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Réservations totales</p>
                      <p className="text-2xl font-bold text-white">{stats.totalBookings}</p>
                    </div>
                    <Calendar className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">En attente</p>
                      <p className="text-2xl font-bold text-white">{stats.pendingBookings}</p>
                    </div>
                    <Clock className="w-8 h-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Messages</p>
                      <p className="text-2xl font-bold text-white">{stats.totalContacts}</p>
                    </div>
                    <MessageSquare className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Chiffre d'affaires</p>
                      <p className="text-2xl font-bold text-white">{stats.revenue}</p>
                    </div>
                    <BarChart className="w-8 h-8 text-red-500" />
                  </div>
                </CardContent>
              </Card>
            </div> */}

            {/* Activité récente */}
            {/* <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Activité récente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookings.slice(0, 5).map((booking: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                      <div>
                        <p className="text-white font-medium">{booking.client.nom} {booking.client.prenom}</p>
                        <p className="text-sm text-gray-400">
                          {booking.service} - {booking.date} à {booking.time}
                        </p>
                      </div>
                      <Badge className="bg-blue-600">Nouvelle</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent> */}

          {/* Gestion des réservations */}
          <TabsContent value="bookings" className="space-y-6">
            <BookingManager />
          </TabsContent>

          {/* Gestion des contacts */}
          <TabsContent value="contacts" className="space-y-6">
            <ContactManager />
          </TabsContent>

          {/* Gestion de la galerie */}
          <TabsContent value="gallery" className="space-y-6">
            <ImageGalleryManager />
          </TabsContent>

          {/* Paramètres */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Paramètres</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">Paramètres de l'application</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
