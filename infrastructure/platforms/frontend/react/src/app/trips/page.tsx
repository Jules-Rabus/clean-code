"use client";

import { useEffect, useState } from "react";
import { Trip } from "@/types";
import TripCard from "@/components/trip/TripCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function TripsPage() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost";
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    async function fetchTrips() {
      try {
        const port = parseInt(localStorage.getItem("port") || "3001", 10);
        const res = await fetch(`${baseUrl}:${port}/trips`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        });
        if (!res.ok) throw new Error("Erreur lors de la récupération des données");
        const data = await res.json();
        setTrips(data);
      } catch (error) {
        console.error("Erreur lors du chargement des trips :", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTrips();
  }, [baseUrl]);

  const handleDeleteTrip = (identifier: string) => {
    setTrips((prevTrips) => prevTrips.filter((trip) => trip.identifier !== identifier));
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">Liste des Trips</h1>
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <Skeleton className="h-10 w-10" />
        </div>
      ) : trips.length === 0 ? (
        <p className="text-lg">Aucun trip trouvé.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <TripCard key={trip.identifier} trip={trip} onDelete={handleDeleteTrip} />
          ))}
        </div>
      )}
    </div>
  );
}
