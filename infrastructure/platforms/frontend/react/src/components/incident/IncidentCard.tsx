"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Incident } from "@/types";

interface IncidentCardProps {
  incident: Incident;
  onDelete?: (identifier: string) => void;
}

export default function IncidentCard({ incident, onDelete }: IncidentCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" });

  const handleDelete = async () => {
    if (!window.confirm("Voulez-vous vraiment supprimer cet incident ?")) return;
    setIsDeleting(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost";
      const port = parseInt(localStorage.getItem("port") || "3001", 10);
      const res = await fetch(`${baseUrl}:${port}/incidents/${incident.identifier}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });
      if (!res.ok) throw new Error("Erreur lors de la suppression");
      alert("Incident supprimé avec succès");
      if (onDelete) onDelete(incident.identifier);
    } catch (error) {
      console.error("Erreur lors de la suppression de l'incident :", error);
      alert("Erreur lors de la suppression de l'incident");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card className="shadow-md hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="bg-gray-50 p-4 flex justify-between items-center">
        <CardTitle className="text-2xl font-bold text-gray-800">
          Incident sur {incident.bike.brand} {incident.bike.model}
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
          <strong>Date :</strong> {formatDate(incident.date)}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Description :</strong> {incident.description}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Coût :</strong> {incident.cost} €
        </p>
        <p className="text-sm text-gray-600">
          <strong>Statut :</strong> {incident.isResolved ? "Résolu" : "Non résolu"}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Créé le :</strong> {formatDate(incident.createdAt)}
        </p>
      </CardContent>
    </Card>
  );
}