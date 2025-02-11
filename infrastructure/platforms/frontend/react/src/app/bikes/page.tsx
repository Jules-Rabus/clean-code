// pages/bikes.tsx
"use client";

import { useEffect, useState } from "react";
import { Bike } from "@/types";
import BikeCard from "@/components/bike/BikeCard";
import CreateBikeForm from "@/components/bike/CreateBikeForm";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export default function BikesPage() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost";
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    async function fetchBikes() {
      try {
        const port = parseInt(localStorage.getItem("port") || "3001", 10);
        const res = await fetch(`${baseUrl}:${port}/bikes`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        });
        if (!res.ok) throw new Error("Erreur lors de la récupération des données");
        const data = await res.json();
        setBikes(data);
      } catch (error) {
        console.error("Erreur lors du chargement des motos :", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBikes();
  }, [baseUrl]);

  const handleDeleteBike = (identifier: string) => {
    setBikes((prevBikes) =>
      prevBikes.filter((bike) =>
        typeof bike.vin === "object" ? bike.vin.value !== identifier : bike.vin !== identifier
      )
    );
  };

  const handleCreateBike = (createdBike: Bike) => {
    setBikes((prevBikes) => [createdBike, ...prevBikes]);
  };

  const handleUpdateBike = (updatedBike: Bike) => {
    setBikes((prevBikes) =>
      prevBikes.map((bike) => {
        const vin = typeof bike.vin === "object" ? bike.vin.value : bike.vin;
        const updatedVin = typeof updatedBike.vin === "object" ? updatedBike.vin.value : updatedBike.vin;
        return vin === updatedVin ? updatedBike : bike;
      })
    );
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">Liste des Motos</h1>
      <CreateBikeForm onCreate={handleCreateBike} />
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <Skeleton className="h-10 w-10" />
        </div>
      ) : bikes.length === 0 ? (
        <p className="text-lg">Aucune moto trouvée.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bikes.map((bike) => {
            const vin = typeof bike.vin === "object" ? bike.vin.value : bike.vin;
            return (
              <div key={vin} className="space-y-2">
                <Link href={`/bikes/${vin}`}>
                  <h2 className="text-blue-600 hover:underline font-bold">
                    Voir les détails
                  </h2>
                </Link>
                <BikeCard
                  bike={bike}
                  onDelete={handleDeleteBike}
                  onUpdate={handleUpdateBike}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
