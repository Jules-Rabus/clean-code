"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Company } from "@/types";

interface CompanyCardProps {
  company: Company;
  onDelete?: (identifier: string) => void;
}

export default function CompanyCard({ company, onDelete }: CompanyCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" });

  const handleDelete = async () => {
    if (!window.confirm("Voulez-vous vraiment supprimer cette compagnie ?")) return;
    setIsDeleting(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost";
      const port = parseInt(localStorage.getItem("port") || "3001", 10);
      const res = await fetch(`${baseUrl}:${port}/companies/${company.identifier}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });
      if (!res.ok) throw new Error("Erreur lors de la suppression");
      alert("Compagnie supprimée avec succès");
      if (onDelete) onDelete(company.identifier);
    } catch (error) {
      console.error("Erreur lors de la suppression de la compagnie :", error);
      alert("Erreur lors de la suppression de la compagnie");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card className="shadow-md hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="bg-gray-50 p-4 flex justify-between items-center">
        <CardTitle className="text-2xl font-bold text-gray-800">{company.name}</CardTitle>
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
          <strong>Email :</strong> {company.email}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Adresse :</strong> {company.address}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Téléphone :</strong> {company.phone}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Créée le :</strong> {formatDate(company.createdAt)}
        </p>
      </CardContent>
    </Card>
  );
}