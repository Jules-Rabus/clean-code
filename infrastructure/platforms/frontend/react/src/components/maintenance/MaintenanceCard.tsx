// components/maintenance/MaintenanceCard.tsx
"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Maintenance } from "@/types";
import { z } from "zod";

// Schéma de validation pour la mise à jour d'une maintenance (sans le champ bikeVin)
const maintenanceUpdateSchema = z.object({
  description: z.string().nonempty("La description est requise"),
  startDate: z.string().nonempty("La date de début est requise"),
  endDate: z.string().nonempty("La date de fin est requise"),
  isDone: z.boolean(),
});

interface MaintenanceCardProps {
  maintenance: Maintenance;
  onDelete?: (identifier: string) => void;
  onUpdate?: (updatedMaintenance: Maintenance) => void;
}

const MaintenanceCard: React.FC<MaintenanceCardProps> = ({
  maintenance,
  onDelete,
  onUpdate,
}) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Stock local pour les valeurs éditables (uniquement les champs modifiables)
  const [editedMaintenance, setEditedMaintenance] = useState({
    description: maintenance.description,
    startDate: maintenance.startDate,
    endDate: maintenance.endDate,
    isDone: maintenance.isDone,
  });

  const formatDate = (date: string): string =>
    new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  // Suppression
  const handleDelete = async (): Promise<void> => {
    if (!window.confirm("Voulez-vous vraiment supprimer cette maintenance ?"))
      return;
    setIsDeleting(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost";
      const port = parseInt(localStorage.getItem("port") || "3001", 10);
      const res = await fetch(
        `${baseUrl}:${port}/maintenances/${maintenance.identifier}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        }
      );
      if (!res.ok) throw new Error("Erreur lors de la suppression");
      alert("Maintenance supprimée avec succès");
      if (onDelete) onDelete(maintenance.identifier);
    } catch (error) {
      console.error("Erreur lors de la suppression de la maintenance :", error);
      alert("Erreur lors de la suppression de la maintenance");
    } finally {
      setIsDeleting(false);
    }
  };

  // Passage en mode édition
  const handleEdit = (): void => {
    setIsEditing(true);
    setValidationError(null);
  };

  // Annulation de l'édition
  const handleCancelEdit = (): void => {
    setEditedMaintenance({
      description: maintenance.description,
      startDate: maintenance.startDate,
      endDate: maintenance.endDate,
      isDone: maintenance.isDone,
    });
    setValidationError(null);
    setIsEditing(false);
  };

  // Mise à jour locale lors des modifications
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    // @ts-ignore
    const { name, value, type, checked } = e.target;
    setEditedMaintenance((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Sauvegarde des modifications via PATCH après validation avec Zod
  const handleSave = async (): Promise<void> => {
    const result = maintenanceUpdateSchema.safeParse(editedMaintenance);
    if (!result.success) {
      const errorMessage =
        result.error.errors[0]?.message || "Erreur de validation";
      setValidationError(errorMessage);
      return;
    }
    setIsSaving(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost";
      const port = parseInt(localStorage.getItem("port") || "3001", 10);
      const res = await fetch(
        `${baseUrl}:${port}/maintenances/${maintenance.identifier}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
          body: JSON.stringify(editedMaintenance),
        }
      );
      if (!res.ok) throw new Error("Erreur lors de la modification");
      const updatedMaintenance: Maintenance = await res.json();
      alert("Maintenance modifiée avec succès");
      if (onUpdate) onUpdate(updatedMaintenance);
      setIsEditing(false);
    } catch (error) {
      console.error("Erreur lors de la modification de la maintenance :", error);
      alert("Erreur lors de la modification de la maintenance");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card className="shadow-md hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="bg-gray-50 p-4 flex justify-between items-center">
        {/* Affichage du bikeVin (lecture seule) dans le header */}
        <CardTitle className="text-2xl font-bold text-gray-800">
          {maintenance.bike.brand} ({maintenance.bike.model})
        </CardTitle>
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
            <div>
              <label className="block text-sm font-medium">
                Description
              </label>
              <textarea
                name="description"
                value={editedMaintenance.description}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                Date de début
              </label>
              <input
                type="date"
                name="startDate"
                value={editedMaintenance.startDate.split("T")[0]}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                Date de fin
              </label>
              <input
                type="date"
                name="endDate"
                value={editedMaintenance.endDate.split("T")[0]}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                <input
                  type="checkbox"
                  name="isDone"
                  checked={editedMaintenance.isDone}
                  onChange={handleChange}
                  className="mr-2"
                />
                Résolue
              </label>
            </div>
          </>
        ) : (
          <>
            <p className="text-sm text-gray-600">
              <strong>Description :</strong> {maintenance.description}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Date de début :</strong> {formatDate(maintenance.startDate)}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Date de fin :</strong> {formatDate(maintenance.endDate)}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Statut :</strong> {maintenance.isDone ? "Résolue" : "Non résolue"}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Créée le :</strong> {formatDate(maintenance.createdAt)}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default MaintenanceCard;
