"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Part } from "@/types";

interface PartCardProps {
  part: Part;
  onDelete?: (identifier: string) => void;
}

export default function PartCard({ part, onDelete }: PartCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" });

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

  return (
    <Card className="shadow-md hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="bg-gray-50 p-4 flex justify-between items-center">
        <CardTitle className="text-2xl font-bold text-gray-800">
          {part.name} ({part.reference})
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
      </CardContent>
    </Card>
  );
}
