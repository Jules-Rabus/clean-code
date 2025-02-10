"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { User } from "@/types";

interface UserCardProps {
  user: User;
  // Optionnel : callback appelé après la suppression réussie
  onDelete?: (userId: string) => void;
}

export default function UserCard({ user, onDelete }: UserCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleDelete = async () => {
    // Confirmation avant suppression
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      return;
    }

    setIsDeleting(true);
    try {
      // Appel à l'API pour supprimer l'utilisateur (adapté à votre endpoint)
      const response = await fetch(`/api/users/${user.identifier}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de l'utilisateur");
      }

      alert("Utilisateur supprimé avec succès");

      // Si un callback onDelete est fourni, on le déclenche
      if (onDelete) {
        onDelete(user.identifier);
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur :", error);
      alert("Erreur lors de la suppression de l'utilisateur");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card className="shadow-md hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="bg-gray-50 p-4 flex justify-between items-center">
        <CardTitle className="text-2xl font-bold text-gray-800">
          {user.firstName} {user.lastName}
        </CardTitle>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
        >
          {isDeleting ? "Suppression..." : "Supprimer"}
        </button>
      </CardHeader>
      <CardContent className="p-4 space-y-2">
        <p className="text-sm text-gray-600">
          <strong>Identifiant :</strong> {user.identifier}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Email :</strong> {user.email}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Rôles :</strong> {user.roles.join(", ")}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Statut :</strong> {user.isActive ? "Actif" : "Inactif"}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Créé le :</strong> {formatDate(user.createdAt)}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Mis à jour le :</strong> {formatDate(user.updatedAt)}
        </p>
      </CardContent>
    </Card>
  );
}
