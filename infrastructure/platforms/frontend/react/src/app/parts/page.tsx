"use client";

import { useEffect, useState } from "react";
import { Part } from "@/types";
import PartCard from "@/components/part/PartCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function PartsPage() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost";
  const [parts, setParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    async function fetchParts() {
      try {
        const port = parseInt(localStorage.getItem("port") || "3001", 10);
        const res = await fetch(`${baseUrl}:${port}/parts`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        });
        if (!res.ok) throw new Error("Erreur lors de la récupération des données");
        const data = await res.json();
        setParts(data);
      } catch (error) {
        console.error("Erreur lors du chargement des pièces :", error);
      } finally {
        setLoading(false);
      }
    }
    fetchParts();
  }, [baseUrl]);

  const handleDeletePart = (identifier: string) => {
    setParts((prevParts) => prevParts.filter((part) => part.identifier !== identifier));
    };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">Liste des Pièces</h1>
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <Skeleton className="h-10 w-10" />
        </div>
      ) : parts.length === 0 ? (
        <p className="text-lg">Aucune pièce trouvée.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {parts.map((part) => (
            <PartCard key={part.identifier} part={part} onDelete={handleDeletePart} />
          ))}
        </div>
      )}
    </div>
  );
}
