// components/trip/TripCard.tsx
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Trip } from "@/types";
import { z } from "zod";

// Schéma de validation pour la modification d'un trip (ici, nous modifions uniquement les dates)
const tripUpdateSchema = z.object({
  startDate: z.string().nonempty("La date de début est requise"),
  endDate: z.string().nonempty("La date de fin est requise"),
});

interface TripCardProps {
  trip: Trip;
  onDelete?: (identifier: string) => void;
  onUpdate?: (updatedTrip: Trip) => void;
}

export default function TripCard({ trip, onDelete, onUpdate }: TripCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Stock local des valeurs éditables (ici, uniquement startDate et endDate)
  const [editedTrip, setEditedTrip] = useState({
    startDate: trip.startDate,
    endDate: trip.endDate,
  });

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  // Suppression
  const handleDelete = async () => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce trip ?")) return;
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
      if (onDelete) onDelete(trip.identifier);
    } catch (error) {
      console.error("Erreur lors de la suppression du trip :", error);
      alert("Erreur lors de la suppression du trip");
    } finally {
      setIsDeleting(false);
    }
  };

  // Passage en mode édition
  const handleEdit = () => {
    setIsEditing(true);
    setValidationError(null);
  };

  // Annulation de l'édition
  const handleCancelEdit = () => {
    setEditedTrip({
      startDate: trip.startDate,
      endDate: trip.endDate,
    });
    setValidationError(null);
    setIsEditing(false);
  };

  // Mise à jour locale lors de la modification
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedTrip((prev) => ({ ...prev, [name]: value }));
  };

  // Sauvegarde via PATCH après validation avec Zod
  const handleSave = async () => {
    const result = tripUpdateSchema.safeParse(editedTrip);
    if (!result.success) {
      const errorMessage = result.error.errors[0]?.message || "Erreur de validation";
      setValidationError(errorMessage);
      return;
    }
    setIsSaving(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost";
      const port = parseInt(localStorage.getItem("port") || "3001", 10);
      const res = await fetch(`${baseUrl}:${port}/trips/${trip.identifier}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify(editedTrip),
      });
      if (!res.ok) throw new Error("Erreur lors de la modification");
      const updatedTrip = await res.json();
      alert("Trip modifié avec succès");
      if (onUpdate) onUpdate(updatedTrip);
      setIsEditing(false);
    } catch (error) {
      console.error("Erreur lors de la modification du trip :", error);
      alert("Erreur lors de la modification du trip");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card className="shadow-md hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="bg-gray-50 p-4 flex justify-between items-center">
        {isEditing ? (
          <div className="flex flex-col">
            <input
              type="date"
              name="startDate"
              value={editedTrip.startDate.split("T")[0]} // format YYYY-MM-DD pour le champ date
              onChange={handleChange}
              className="border rounded p-1 mb-1"
            />
            <input
              type="date"
              name="endDate"
              value={editedTrip.endDate.split("T")[0]}
              onChange={handleChange}
              className="border rounded p-1"
            />
          </div>
        ) : (
          <CardTitle className="text-2xl font-bold text-gray-800">
            Trip de {trip.user.firstName} {trip.user.lastName} sur {trip.bike.brand} {trip.bike.model}
          </CardTitle>
        )}
        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded"
              >
                {isSaving ? "Sauvegarde..." : "Sauvegarder"}
              </button>
              <button
                onClick={handleCancelEdit}
                disabled={isSaving}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-3 rounded"
              >
                Annuler
              </button>
            </>
          ) : (
            <button
              onClick={handleEdit}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded"
            >
              Éditer
            </button>
          )}
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
          >
            {isDeleting ? "Suppression..." : "Supprimer"}
          </button>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-2">
        {isEditing ? (
          <>
            {validationError && (
              <p className="text-red-500 text-sm">{validationError}</p>
            )}
          </>
        ) : (
          <>
            <p className="text-sm text-gray-600">
              <strong>Date de début :</strong> {formatDate(trip.startDate)}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Date de fin :</strong> {formatDate(trip.endDate)}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Créé le :</strong> {formatDate(trip.createdAt)}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
