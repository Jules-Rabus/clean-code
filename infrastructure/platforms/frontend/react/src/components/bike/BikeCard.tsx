"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Bike } from "@/types";

interface BikeCardProps {
  bike: Bike;
  onDelete?: (identifier: string) => void;
}

export default function BikeCard({ bike, onDelete }: BikeCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const vinDisplay =
    typeof bike.vin === "object" && bike.vin !== null ? bike.vin.value : bike.vin;

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" });

  const handleDelete = async () => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce vélo ?")) return;
    setIsDeleting(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost";
      const port = parseInt(localStorage.getItem("port") || "3001", 10);
      const res = await fetch(`${baseUrl}:${port}/bikes/${vinDisplay}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });
      if (!res.ok) throw new Error("Erreur lors de la suppression");
      alert("Vélo supprimé avec succès");
      if (onDelete) onDelete(vinDisplay);
    } catch (error) {
      console.error("Erreur lors de la suppression du vélo :", error);
      alert("Erreur lors de la suppression du vélo");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card className="shadow-md hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="bg-gray-50 p-4 flex justify-between items-center">
        <CardTitle className="text-2xl font-bold text-gray-800">
          {bike.brand} {bike.model}
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
          <strong>VIN:</strong> {vinDisplay}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Nombre de kilomètres:</strong> {bike.mileage} km
        </p>
        <p className="text-sm text-gray-600">
          <strong>Statut:</strong> {bike.isActive ? "Actif" : "Inactif"}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Immatriculation:</strong> {bike.registrationNumber}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Date d'achat:</strong> {formatDate(bike.purchaseDate)}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Garantie:</strong> {bike.warrantyExpirationDate ? formatDate(bike.warrantyExpirationDate) : "Aucune"}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Nombre d'incidents:</strong> {bike.incidents.length}
        </p>
      </CardContent>
    </Card>
  );
}
