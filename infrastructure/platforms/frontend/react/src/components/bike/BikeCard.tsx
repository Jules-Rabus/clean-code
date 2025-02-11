// components/bike/BikeCard.tsx
"use client";

import React, { useState, ChangeEvent } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Bike } from "@/types";
import { z } from "zod";

// Schéma de validation pour la mise à jour d'une moto (les champs modifiables)
const bikeUpdateSchema = z.object({
  brand: z.string().nonempty("La marque est requise"),
  model: z.string().nonempty("Le modèle est requis"),
  mileage: z.preprocess(
    (val) => Number(val),
    z.number().min(0, "Le kilométrage doit être positif")
  ),
  registrationNumber: z.string().nonempty("Le numéro d'immatriculation est requis"),
  purchaseDate: z.string().nonempty("La date d'achat est requise"),
  warrantyExpirationDate: z.string().nullable(), // Peut être null
  isActive: z.boolean(),
  isDecommissioned: z.boolean(),
});

interface BikeCardProps {
  bike: Bike;
  onDelete?: (identifier: string) => void;
  onUpdate?: (updatedBike: Bike) => void;
}

export default function BikeCard({ bike, onDelete, onUpdate }: BikeCardProps) {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Valeurs éditables (les champs non modifiables : vin et ownerId restent inchangés)
  const [editedBike, setEditedBike] = useState({
    brand: bike.brand,
    model: bike.model,
    mileage: bike.mileage,
    registrationNumber:
      typeof bike.registrationNumber === "object" ? bike.registrationNumber.value : bike.registrationNumber,
    purchaseDate: bike.purchaseDate,
    warrantyExpirationDate: bike.warrantyExpirationDate,
    isActive: bike.isActive,
    isDecommissioned: bike.isDecommissioned,
  });

  // Fonctions d'aide pour extraire le VIN et le numéro d'immatriculation
  const getVin = (): string =>
    typeof bike.vin === "object" ? bike.vin.value : bike.vin;

  const getRegistrationNumber = (): string =>
    typeof bike.registrationNumber === "object" ? bike.registrationNumber.value : bike.registrationNumber;

  const formatDate = (date: string): string =>
    new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  // Suppression
  const handleDelete = async () => {
    if (!window.confirm("Voulez-vous vraiment supprimer cette moto ?")) return;
    setIsDeleting(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost";
      const port = parseInt(localStorage.getItem("port") || "3001", 10);
      const vin = getVin();
      const res = await fetch(`${baseUrl}:${port}/bikes/${vin}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });
      if (!res.ok) throw new Error("Erreur lors de la suppression");
      alert("Moto supprimée avec succès");
      if (onDelete) onDelete(vin);
    } catch (error) {
      console.error("Erreur lors de la suppression de la moto :", error);
      alert("Erreur lors de la suppression de la moto");
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
    setEditedBike({
      brand: bike.brand,
      model: bike.model,
      mileage: bike.mileage,
      registrationNumber: getRegistrationNumber(),
      purchaseDate: bike.purchaseDate,
      warrantyExpirationDate: bike.warrantyExpirationDate,
      isActive: bike.isActive,
      isDecommissioned: bike.isDecommissioned,
    });
    setValidationError(null);
    setIsEditing(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // @ts-ignore
    const { name, value, type, checked } = e.target;
    setEditedBike((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async () => {
    const result = bikeUpdateSchema.safeParse(editedBike);
    if (!result.success) {
      const errorMessage = result.error.errors[0]?.message || "Erreur de validation";
      setValidationError(errorMessage);
      return;
    }
    setIsSaving(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost";
      const port = parseInt(localStorage.getItem("port") || "3001", 10);
      const vin = getVin();
      const res = await fetch(`${baseUrl}:${port}/bikes/${vin}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify(editedBike),
      });
      if (!res.ok) throw new Error("Erreur lors de la modification");
      const updatedBike: Bike = await res.json();
      alert("Moto modifiée avec succès");
      if (onUpdate) onUpdate(updatedBike);
      setIsEditing(false);
    } catch (error) {
      console.error("Erreur lors de la modification de la moto :", error);
      alert("Erreur lors de la modification de la moto");
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
              type="text"
              name="brand"
              value={editedBike.brand}
              onChange={handleChange}
              className="border rounded p-1 mb-1"
              placeholder="Marque"
            />
            <input
              type="text"
              name="model"
              value={editedBike.model}
              onChange={handleChange}
              className="border rounded p-1 mb-1"
              placeholder="Modèle"
            />
          </div>
        ) : (
          <CardTitle className="text-2xl font-bold text-gray-800">
            {bike.brand} {bike.model}
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
            {validationError && <p className="text-red-500 text-sm">{validationError}</p>}
            <div>
              <label className="block text-sm font-medium">Kilométrage</label>
              <input
                type="number"
                name="mileage"
                value={editedBike.mileage}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Immatriculation</label>
              <input
                type="text"
                name="registrationNumber"
                value={editedBike.registrationNumber}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Date d'achat</label>
              <input
                type="date"
                name="purchaseDate"
                value={editedBike.purchaseDate.split("T")[0]}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Date de garantie</label>
              <input
                type="date"
                name="warrantyExpirationDate"
                value={
                  editedBike.warrantyExpirationDate
                    ? editedBike.warrantyExpirationDate.split("T")[0]
                    : ""
                }
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={editedBike.isActive}
                  onChange={handleChange}
                  className="mr-2"
                />
                Actif
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium">
                <input
                  type="checkbox"
                  name="isDecommissioned"
                  checked={editedBike.isDecommissioned}
                  onChange={handleChange}
                  className="mr-2"
                />
                Hors service
              </label>
            </div>
          </>
        ) : (
          <>
            <p className="text-sm text-gray-600"><strong>VIN:</strong> {getVin()}</p>
            <p className="text-sm text-gray-600"><strong>Nombre de kilomètres:</strong> {bike.mileage} km</p>
            <p className="text-sm text-gray-600"><strong>Immatriculation:</strong> {getRegistrationNumber()}</p>
            <p className="text-sm text-gray-600"><strong>Date d'achat:</strong> {formatDate(bike.purchaseDate)}</p>
            <p className="text-sm text-gray-600"><strong>Garantie:</strong> {bike.warrantyExpirationDate ? formatDate(bike.warrantyExpirationDate) : "Aucune"}</p>
            <p className="text-sm text-gray-600"><strong>Statut:</strong> {bike.isActive ? "Actif" : "Inactif"}</p>
            <p className="text-sm text-gray-600"><strong>Nombre d'incidents:</strong> {bike.incidents.length}</p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
