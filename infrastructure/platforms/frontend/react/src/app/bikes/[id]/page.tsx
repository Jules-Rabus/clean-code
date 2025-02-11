// pages/bikes/[id].tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Bike, Maintenance, Incident, Trip } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

export default function BikeDetailPage() {
  const { id } = useParams(); // "id" correspond au VIN de la moto
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost";
  const [bike, setBike] = useState<Bike | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Groupes pour les maintenances
  const [pastMaintenances, setPastMaintenances] = useState<Maintenance[]>([]);
  const [futureMaintenances, setFutureMaintenances] = useState<Maintenance[]>([]);
  const [inProgressMaintenances, setInProgressMaintenances] = useState<Maintenance[]>([]);

  // Liste des trips et incidents
  const [trips, setTrips] = useState<Trip[]>([]);
  const [incidents, setIncidents] = useState<Incident[]>([]);

  useEffect(() => {
    async function fetchBike() {
      setLoading(true);
      try {
        const port = parseInt(localStorage.getItem("port") || "3001", 10);
        const res = await fetch(`${baseUrl}:${port}/bikes/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        });
        if (!res.ok) throw new Error("Erreur lors de la récupération des données de la moto");
        const data: Bike = await res.json();
        setBike(data);

        // Traitement des maintenances
        const now = new Date();
        const inProgress = data.maintenances.filter(
          (m) => new Date(m.startDate) <= now && new Date(m.endDate) >= now
        );
        const past = data.maintenances.filter(
          (m) => new Date(m.endDate) < now
        );
        const future = data.maintenances.filter(
          (m) => new Date(m.startDate) > now
        );
        setPastMaintenances(past);
        setFutureMaintenances(future);
        setInProgressMaintenances(inProgress);

        // Récupération des trips et incidents à partir des relations de la moto
        setTrips(data.trips);
        setIncidents(data.incidents);
      } catch (error) {
        console.error("Erreur lors du chargement de la moto :", error);
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      fetchBike();
    }
  }, [id, baseUrl]);

  // Fonction pour calculer la durée en jours d'un trip
  const getTripDuration = (trip: Trip): number => {
    const start = new Date(trip.startDate);
    const end = new Date(trip.endDate);
    const diffMs = end.getTime() - start.getTime();
    return Math.round(diffMs / (1000 * 60 * 60 * 24));
  };

  const formatDate = (date: string): string =>
    new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  if (loading) {
    return (
      <div className="container mx-auto p-8">
        <Skeleton className="h-10 w-10" />
      </div>
    );
  }

  if (!bike) {
    return (
      <div className="container mx-auto p-8">
        <p>Aucune moto trouvée.</p>
      </div>
    );
  }

  // Gestion de l'affichage du VIN et du numéro d'immatriculation
  const vinDisplay =
    typeof bike.vin === "object" ? bike.vin.value : bike.vin;
  const registrationDisplay =
    typeof bike.registrationNumber === "object" ? bike.registrationNumber.value : bike.registrationNumber;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">
        {bike.brand} {bike.model}
      </h1>
      <div className="mb-8">
        <p><strong>VIN:</strong> {vinDisplay}</p>
        <p><strong>Marque:</strong> {bike.brand}</p>
        <p><strong>Modèle:</strong> {bike.model}</p>
        <p><strong>Nombre de kilomètres:</strong> {bike.mileage} km</p>
        <p><strong>Immatriculation:</strong> {registrationDisplay}</p>
        <p><strong>Date d'achat:</strong> {formatDate(bike.purchaseDate)}</p>
        <p><strong>Garantie:</strong> {bike.warrantyExpirationDate ? formatDate(bike.warrantyExpirationDate) : "Aucune"}</p>
        <p><strong>Statut:</strong> {bike.isActive ? "Actif" : "Inactif"}</p>
      </div>

      {/* Section des entretiens */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Entretiens passés</h2>
        {pastMaintenances.length === 0 ? (
          <p>Aucun entretien passé.</p>
        ) : (
          <ul className="space-y-4">
            {pastMaintenances.map((m) => (
              <li key={m.identifier} className="border p-4 rounded">
                <p><strong>Date de début:</strong> {formatDate(m.startDate)}</p>
                <p><strong>Date de fin:</strong> {formatDate(m.endDate)}</p>
                <p><strong>Description:</strong> {m.description}</p>
                <p><strong>Statut:</strong> {m.isDone ? "Réalisé" : "Non réalisé"}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Entretiens en cours</h2>
        {inProgressMaintenances.length === 0 ? (
          <p>Aucun entretien en cours.</p>
        ) : (
          <ul className="space-y-4">
            {inProgressMaintenances.map((m) => (
              <li key={m.identifier} className="border p-4 rounded">
                <p><strong>Date de début:</strong> {formatDate(m.startDate)}</p>
                <p><strong>Date de fin:</strong> {formatDate(m.endDate)}</p>
                <p><strong>Description:</strong> {m.description}</p>
                <p><strong>Statut:</strong> {m.isDone ? "Réalisé" : "Non réalisé"}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Entretiens futurs</h2>
        {futureMaintenances.length === 0 ? (
          <p>Aucun entretien futur.</p>
        ) : (
          <ul className="space-y-4">
            {futureMaintenances.map((m) => (
              <li key={m.identifier} className="border p-4 rounded">
                <p><strong>Date de début:</strong> {formatDate(m.startDate)}</p>
                <p><strong>Date de fin:</strong> {formatDate(m.endDate)}</p>
                <p><strong>Description:</strong> {m.description}</p>
                <p><strong>Statut:</strong> {m.isDone ? "Réalisé" : "Non réalisé"}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Section des trips */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Trips</h2>
        {trips.length === 0 ? (
          <p>Aucun trip trouvé.</p>
        ) : (
          <ul className="space-y-4">
            {trips.map((trip) => {
              // Calcul du nombre de jours d'utilisation
              const start = new Date(trip.startDate);
              const end = new Date(trip.endDate);
              const diffMs = end.getTime() - start.getTime();
              const days = Math.round(diffMs / (1000 * 60 * 60 * 24));
              return (
                <li key={trip.identifier} className="border p-4 rounded">
                  <p><strong>Date de début:</strong> {formatDate(trip.startDate)}</p>
                  <p><strong>Date de fin:</strong> {formatDate(trip.endDate)}</p>
                  <p><strong>Durée d'utilisation:</strong> {days} jours</p>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Section des incidents */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Incidents</h2>
        {incidents.length === 0 ? (
          <p>Aucun incident trouvé.</p>
        ) : (
          <ul className="space-y-4">
            {incidents.map((incident) => (
              <li key={incident.identifier} className="border p-4 rounded">
                <p><strong>Date:</strong> {formatDate(incident.date)}</p>
                <p><strong>Description:</strong> {incident.description}</p>
                <p><strong>Coût:</strong> {incident.cost} €</p>
                <p><strong>Statut:</strong> {incident.isResolved ? "Résolu" : "Non résolu"}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
