// hooks/useDashboardStats.ts (optionnel - pour une meilleure organisation)
import { useState, useEffect, useCallback } from 'react';

interface DashboardStats {
  totalBookings: number;
  pendingBookings: number;
  totalContacts: number;
  revenue: string;
}

export const useDashboardStats = (): DashboardStats => {
  const [stats, setStats] = useState<DashboardStats>({
    totalBookings: 0,
    pendingBookings: 0,
    totalContacts: 0,
    revenue: "0€"
  });

  const calculateStats = useCallback((): DashboardStats => {
    try {
      // Récupérer les bookings
      const savedBookings = localStorage.getItem('lm-bookings');
      const bookings: any[] = savedBookings ? JSON.parse(savedBookings) : [];
      
      // Récupérer les contacts
      const savedContacts = localStorage.getItem('lm-contacts');
      const contacts: any[] = savedContacts ? JSON.parse(savedContacts) : [];

      // Calculer les statistiques des réservations
      const totalBookings = bookings.length;
      const pendingBookings = bookings.filter(b => b.statut === "en_attente").length;
      
      // Calculer le chiffre d'affaires
      const revenue = bookings
        .filter(b => (b.statut === "terminee" || b.statut === "confirmee") && b.prix)
        .reduce((sum, booking) => {
          try {
            const priceStr = booking.prix.replace('€', '').replace(',', '.').trim();
            const price = parseFloat(priceStr);
            return isNaN(price) ? sum : sum + price;
          } catch {
            return sum;
          }
        }, 0);

      return {
        totalBookings,
        pendingBookings,
        totalContacts: contacts.length,
        revenue: `${revenue.toFixed(2)}€`
      };
    } catch (error) {
      console.error('Erreur lors du calcul des statistiques:', error);
      return {
        totalBookings: 0,
        pendingBookings: 0,
        totalContacts: 0,
        revenue: "0€"
      };
    }
  }, []);

  useEffect(() => {
    // Calculer les stats initiales
    setStats(calculateStats());

    // Écouter les changements
    const handleStorageChange = () => {
      setStats(calculateStats());
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('bookingsUpdated', handleStorageChange);
    window.addEventListener('contactsUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('bookingsUpdated', handleStorageChange);
      window.removeEventListener('contactsUpdated', handleStorageChange);
    };
  }, [calculateStats]);

  return stats;
};