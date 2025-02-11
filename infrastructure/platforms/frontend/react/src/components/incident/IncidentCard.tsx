// components/incident/IncidentCard.tsx
"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Incident } from "@/types";
import { z } from "zod";

const incidentUpdateSchema = z.object({
  date: z.string().nonempty("La date est requise"),
  description: z.string().nonempty("La description est requise"),
  cost: z.preprocess(
    (val) => Number(val),
    z.number().min(0, "Le coût doit être positif")
  ),
  isResolved: z.boolean(),
});

interface IncidentCardProps {
  incident: Incident;
  onDelete?: (identifier: string) => void;
  onUpdate?: (updatedIncident: Incident) => void;
}

export default function IncidentCard({ incident, onDelete, onUpdate }: IncidentCardProps) {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // État local pour les champs éditables
  const [editedIncident, setEditedIncident] = useState({
    date: incident.date,
    description: incident.description,
    cost: incident.cost,
    isResolved: incident.isResolved,
  });

  const formatDate = (date: string): string =>
    new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const handleDelete = async (): Promise<void> => {
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

  const handleEdit = (): void => {
    setIsEditing(true);
    setValidationError(null);
  };

  const handleCancelEdit = (): void => {
    setEditedIncident({
      date: incident.date,
      description: incident.description,
      cost: incident.cost,
      isResolved: incident.isResolved,
    });
    setValidationError(null);
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    // @ts-ignore
    const { name, value, type, checked } = e.target;
    setEditedIncident((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async (): Promise<void> => {
    const result = incidentUpdateSchema.safeParse(editedIncident);
    if (!result.success) {
      const errorMessage = result.error.errors[0]?.message || "Erreur de validation";
      setValidationError(errorMessage);
      return;
    }
    setIsSaving(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost";
      const port = parseInt(localStorage.getItem("port") || "3001", 10);
      const res = await fetch(`${baseUrl}:${port}/incidents/${incident.identifier}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify(editedIncident),
      });
      if (!res.ok) throw new Error("Erreur lors de la modification");
      const updatedIncident: Incident = await res.json();
      alert("Incident modifié avec succès");
      if (onUpdate) onUpdate(updatedIncident);
      setIsEditing(false);
    } catch (error) {
      console.error("Erreur lors de la modification de l'incident :", error);
      alert("Erreur lors de la modification de l'incident");
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
              name="date"
              value={editedIncident.date.split("T")[0]}
              onChange={handleChange}
              className="border rounded p-1 mb-1"
            />
          </div>
        ) : (
          <CardTitle className="text-2xl font-bold text-gray-800">
           {incident.bike.brand} {incident.bike.model}<br />
            Utilisateur: {incident.user.firstName} {incident.user.lastName}
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
            <div>
              <label className="block text-sm font-medium">Description</label>
              <textarea
                name="description"
                value={editedIncident.description}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Coût (€)</label>
              <input
                type="number"
                name="cost"
                value={editedIncident.cost}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                <input
                  type="checkbox"
                  name="isResolved"
                  checked={editedIncident.isResolved}
                  onChange={handleChange}
                  className="mr-2"
                />
                Résolu
              </label>
            </div>
          </>
        ) : (
          <>
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
          </>
        )}
      </CardContent>
    </Card>
  );
}
