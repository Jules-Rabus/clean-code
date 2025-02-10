"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Part } from "@/types";
import { z } from "zod";

// Schéma de validation pour la mise à jour d'une pièce
const partUpdateSchema = z.object({
  name: z.string().nonempty("Le nom est requis"),
  reference: z.string().nonempty("La référence est requise"),
  description: z.string().nonempty("La description est requise"),
  stockQuantity: z.number().min(0, "La quantité doit être positive"),
  minStockLevel: z.number().min(0, "Le niveau minimum doit être positif"),
  price: z.number().min(0, "Le prix doit être positif"),
});

interface PartCardProps {
  part: Part;
  onDelete?: (identifier: string) => void;
  onUpdate?: (updatedPart: Part) => void;
}

export default function PartCard({ part, onDelete, onUpdate }: PartCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Stock local des valeurs éditables
  const [editedPart, setEditedPart] = useState({
    name: part.name,
    reference: part.reference,
    description: part.description,
    stockQuantity: part.stockQuantity,
    minStockLevel: part.minStockLevel,
    price: part.price,
  });

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  // Fonction de suppression
  const handleDelete = async () => {
    if (!window.confirm("Voulez-vous vraiment supprimer cette pièce ?")) return;
    setIsDeleting(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost";
      const port = parseInt(localStorage.getItem("port") || "3001", 10);
      const res = await fetch(`${baseUrl}:${port}/parts/${part.identifier}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });
      if (!res.ok) throw new Error("Erreur lors de la suppression");
      alert("Pièce supprimée avec succès");
      if (onDelete) onDelete(part.identifier);
    } catch (error) {
      console.error("Erreur lors de la suppression de la pièce :", error);
      alert("Erreur lors de la suppression de la pièce");
    } finally {
      setIsDeleting(false);
    }
  };

  // Passage en mode édition
  const handleEdit = () => {
    setIsEditing(true);
    setValidationError(null);
  };

  // Annulation de l'édition : réinitialisation des valeurs
  const handleCancelEdit = () => {
    setEditedPart({
      name: part.name,
      reference: part.reference,
      description: part.description,
      stockQuantity: part.stockQuantity,
      minStockLevel: part.minStockLevel,
      price: part.price,
    });
    setValidationError(null);
    setIsEditing(false);
  };

  // Mise à jour des valeurs locales lors des modifications
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedPart((prev) => ({
      ...prev,
      [name]:
        name === "stockQuantity" || name === "minStockLevel" || name === "price"
          ? Number(value)
          : value,
    }));
  };

  // Sauvegarde des modifications via une requête PATCH après validation avec Zod
  const handleSave = async () => {
    // Validation avec Zod
    const result = partUpdateSchema.safeParse(editedPart);
    if (!result.success) {
      // Récupère le premier message d'erreur
      const errorMessage = result.error.errors[0]?.message || "Erreur de validation";
      setValidationError(errorMessage);
      return;
    }
    setIsSaving(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost";
      const port = parseInt(localStorage.getItem("port") || "3001", 10);
      const res = await fetch(`${baseUrl}:${port}/parts/${part.identifier}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify(editedPart),
      });
      if (!res.ok) throw new Error("Erreur lors de la modification");
      const updatedPart = await res.json();
      alert("Pièce modifiée avec succès");
      if (onUpdate) onUpdate(updatedPart);
      setIsEditing(false);
    } catch (error) {
      console.error("Erreur lors de la modification de la pièce :", error);
      alert("Erreur lors de la modification de la pièce");
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
              name="name"
              value={editedPart.name}
              onChange={handleChange}
              className="border rounded p-1 mb-1"
            />
            <input
              type="text"
              name="reference"
              value={editedPart.reference}
              onChange={handleChange}
              className="border rounded p-1"
            />
          </div>
        ) : (
          <CardTitle className="text-2xl font-bold text-gray-800">
            {part.name} ({part.reference})
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
            <div>
              <label className="block text-sm font-medium">Description</label>
              <textarea
                name="description"
                value={editedPart.description}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Stock</label>
              <input
                type="number"
                name="stockQuantity"
                value={editedPart.stockQuantity}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Niveau de stock minimum</label>
              <input
                type="number"
                name="minStockLevel"
                value={editedPart.minStockLevel}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Prix</label>
              <input
                type="number"
                step="0.01"
                name="price"
                value={editedPart.price}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            </div>
            {validationError && (
              <p className="text-red-500 text-sm">{validationError}</p>
            )}
          </>
        ) : (
          <>
            <p className="text-sm text-gray-600">
              <strong>Description :</strong> {part.description}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Stock :</strong> {part.stockQuantity} (Minimum : {part.minStockLevel})
            </p>
            <p className="text-sm text-gray-600">
              <strong>Prix :</strong> {part.price} €
            </p>
            <p className="text-sm text-gray-600">
              <strong>Créé le :</strong> {formatDate(part.createdAt)}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
