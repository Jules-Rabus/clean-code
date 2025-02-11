// components/user/UserCard.tsx
"use client";

import React, { useState, ChangeEvent } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { User } from "@/types";
import { z } from "zod";

// Schéma de validation pour la mise à jour d'un utilisateur
const userUpdateSchema = z.object({
  email: z.string().email("Email invalide"),
  firstName: z.string().nonempty("Le prénom est requis"),
  lastName: z.string().nonempty("Le nom est requis"),
  roles: z.string().nonempty("Les rôles sont requis"),
  isActive: z.boolean(),
});

interface UserCardProps {
  user: User;
  onDelete?: (userId: string) => void;
  onUpdate?: (updatedUser: User) => void;
}

export default function UserCard({ user, onDelete, onUpdate }: UserCardProps) {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Stock local pour les champs éditables
  const [editedUser, setEditedUser] = useState({
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    roles: user.roles.join(", "),
    isActive: user.isActive,
  });

  // Calculer le total de jours passés en trip
  const totalTripDays = user.trips.reduce((acc, trip) => {
    const start = new Date(trip.startDate);
    const end = new Date(trip.endDate);
    const diffDays = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
    return acc + diffDays;
  }, 0);

  const formatDate = (date: string): string =>
    new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const handleDelete = async () => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?"))
      return;
    setIsDeleting(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost";
      const port = parseInt(localStorage.getItem("port") || "3001", 10);
      const res = await fetch(`${baseUrl}:${port}/users/${user.identifier}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });
      if (!res.ok) throw new Error("Erreur lors de la suppression de l'utilisateur");
      alert("Utilisateur supprimé avec succès");
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

  const handleEdit = () => {
    setIsEditing(true);
    setValidationError(null);
  };

  const handleCancelEdit = () => {
    setEditedUser({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      roles: user.roles.join(", "),
      isActive: user.isActive,
    });
    setValidationError(null);
    setIsEditing(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // @ts-ignore
    const { name, value, type, checked } = e.target;
    setEditedUser((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async () => {
    const result = userUpdateSchema.safeParse({
      email: editedUser.email,
      firstName: editedUser.firstName,
      lastName: editedUser.lastName,
      roles: editedUser.roles,
      isActive: editedUser.isActive,
    });
    if (!result.success) {
      const errorMessage = result.error.errors[0]?.message || "Erreur de validation";
      setValidationError(errorMessage);
      return;
    }
    setIsSaving(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost";
      const port = parseInt(localStorage.getItem("port") || "3001", 10);
      // Convertir la chaîne des rôles en tableau
      const rolesArray = editedUser.roles.split(",").map((role) => role.trim());
      const payload = {
        email: editedUser.email,
        firstName: editedUser.firstName,
        lastName: editedUser.lastName,
        roles: rolesArray,
        isActive: editedUser.isActive,
      };
      const res = await fetch(`${baseUrl}:${port}/users/${user.identifier}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Erreur lors de la modification");
      const updatedUser: User = await res.json();
      alert("Utilisateur modifié avec succès");
      if (onUpdate) onUpdate(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error("Erreur lors de la modification de l'utilisateur :", error);
      alert("Erreur lors de la modification de l'utilisateur");
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
              name="firstName"
              value={editedUser.firstName}
              onChange={handleChange}
              className="border rounded p-1 mb-1"
              placeholder="Prénom"
            />
            <input
              type="text"
              name="lastName"
              value={editedUser.lastName}
              onChange={handleChange}
              className="border rounded p-1"
              placeholder="Nom"
            />
          </div>
        ) : (
          <CardTitle className="text-2xl font-bold text-gray-800">
            {user.firstName} {user.lastName}
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
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={editedUser.email}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                Rôles (séparés par des virgules)
              </label>
              <input
                type="text"
                name="roles"
                value={editedUser.roles}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={editedUser.isActive}
                  onChange={handleChange}
                  className="mr-2"
                />
                Actif
              </label>
            </div>
          </>
        ) : (
          <>
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
              <strong>Incidents :</strong> {user.incidents.length}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Trips :</strong> {user.trips.length} (Total: {Math.round(totalTripDays)} jours)
            </p>
            <p className="text-sm text-gray-600">
              <strong>Créé le :</strong> {formatDate(user.createdAt)}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Mis à jour le :</strong> {formatDate(user.updatedAt)}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
