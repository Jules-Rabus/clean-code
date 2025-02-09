"use client";

import { useEffect, useState } from "react";
import { Bike } from "@/types";
import BikeCard from "@/components/BikeCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function BikesPage() {
    const [bikes, setBikes] = useState<Bike[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchBikes() {
            try {
                const res = await fetch("http://localhost:3001/bikes");
                if (!res.ok) {
                    throw new Error("Erreur lors de la récupération des données");
                }
                const data = await res.json();
                console.log("Données reçues :", data);
                setBikes(data);
            } catch (error) {
                console.error("Erreur lors du chargement des motos :", error);
            } finally {
                setLoading(false);
            }
        }
        fetchBikes();
    }, []);

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-4xl font-bold mb-6">Liste des Motos</h1>
            {loading ? (
                <div className="flex justify-center items-center h-32">
                    <Skeleton className="h-10 w-10" />
                </div>
            ) : bikes.length === 0 ? (
                <p className="text-lg">Aucune moto trouvée.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bikes.map((bike) => (
                        <BikeCard key={typeof bike.vin === "object" ? bike.vin.value : bike.vin} bike={bike}/>
                    ))}
                </div>
            )}
        </div>
    );
}
