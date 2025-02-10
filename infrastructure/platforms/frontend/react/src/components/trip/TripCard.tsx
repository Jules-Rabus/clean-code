"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Trip } from "@/types";

interface TripCardProps {
  trip: Trip;
  onDelete?: (identifier: string) => void;
}

export default function TripCard({ trip, onDelete }: TripCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleDelete = async () => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce trip ?")) return;
    setIsDeleting(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost";
      const port = parseInt(localStorage.getItem("port") || "3001", 10);
      const res = await fetch(`${baseUrl}:${port}/trips/${trip.identifier}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });
      if (!res.ok) throw new Error("Erreur lors de la suppression");
      alert("Trip supprimé avec succès");
      if (onDelete) {
        onDelete(trip.identifier);
      }
    } catch (error) {
      console.error("Erreur lors de la suppression du trip :", error);
      alert("Erreur lors de la suppression du trip");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card className="shadow-md hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="bg-gray-50 p-4 flex justify-between items-center">
        <CardTitle className="text-2xl font-bold text-gray-800">
          Trip de {trip.user.firstName} {trip.user.lastName} sur {trip.bike.brand} {trip.bike.model}
        </CardTitle>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
        >
          {isDeleting ? "Suppression..." : "Supprimer"}
        </button>
      </CardHeader>
      <CardContent className="p-4 space-y-2">
        <p className="text-sm text-gray-600">
          <strong>Date de début :</strong> {formatDate(trip.startDate)}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Date de fin :</strong> {formatDate(trip.endDate)}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Créé le :</strong> {formatDate(trip.createdAt)}
        </p>
      </CardContent>
    </Card>
  );
}
