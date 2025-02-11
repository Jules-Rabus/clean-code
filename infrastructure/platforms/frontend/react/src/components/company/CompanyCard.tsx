// components/company/CompanyCard.tsx
"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Company, Bike, User } from "@/types";
import { z } from "zod";

// Schéma de validation pour la mise à jour d'une compagnie
const companyUpdateSchema = z.object({
  name: z.string().nonempty("Le nom est requis"),
  email: z.string().email("Email invalide"),
  address: z.string().nonempty("L'adresse est requise"),
  phone: z.string().nonempty("Le téléphone est requis"),
  // Les champs bikes et users sont des tableaux de chaînes
  bikes: z.array(z.string()),
  users: z.array(z.string()),
});

interface CompanyCardProps {
  company: Company;
  onDelete?: (identifier: string) => void;
  onUpdate?: (updatedCompany: Company) => void;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company, onDelete, onUpdate }) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Pour l'édition, on stocke les valeurs éditables sous forme d'objets
  const [editedCompany, setEditedCompany] = useState({
    name: company.name,
    email: company.email,
    address: company.address,
    phone: company.phone,
    // On stocke les références sous forme de tableaux de chaînes
    bikes: company.bikes.map((b) =>
      typeof b.vin === "object" ? b.vin.value : b.vin
    ),
    users: company.users.map((u) => u.identifier),
  });

  // États pour les options disponibles en modification
  const [availableBikes, setAvailableBikes] = useState<Bike[]>([]);
  const [availableUsers, setAvailableUsers] = useState<User[]>([]);
  const [loadingOptions, setLoadingOptions] = useState<boolean>(false);

  const formatDate = (date: string): string =>
    new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  // Lorsque l'utilisateur passe en mode édition, on récupère les options si elles ne sont pas encore chargées
  const loadOptions = async () => {
    setLoadingOptions(true);
    try {
      const port = parseInt(localStorage.getItem("port") || "3001", 10);
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost";

      // Récupérer les motos (ici, nous utilisons le même endpoint que pour la création)
      const resBikes = await fetch(`${baseUrl}:${port}/bikes`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });
      if (resBikes.ok) {
        const dataBikes = await resBikes.json();
        setAvailableBikes(dataBikes);
      }

      // Récupérer les utilisateurs
      const resUsers = await fetch(`${baseUrl}:${port}/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });
      if (resUsers.ok) {
        const dataUsers = await resUsers.json();
        setAvailableUsers(dataUsers);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des options :", error);
    } finally {
      setLoadingOptions(false);
    }
  };

  const handleDelete = async (): Promise<void> => {
    if (!window.confirm("Voulez-vous vraiment supprimer cette compagnie ?"))
      return;
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

  const handleEdit = (): void => {
    setIsEditing(true);
    setValidationError(null);
    // Charger les options disponibles si elles ne sont pas déjà chargées
    if (availableBikes.length === 0 || availableUsers.length === 0) {
      loadOptions();
    }
  };

  const handleCancelEdit = (): void => {
    setEditedCompany({
      name: company.name,
      email: company.email,
      address: company.address,
      phone: company.phone,
      bikes: company.bikes.map((b) =>
        typeof b.vin === "object" ? b.vin.value : b.vin
      ),
      users: company.users.map((u) => u.identifier),
    });
    setValidationError(null);
    setIsEditing(false);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setEditedCompany((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Gestion des sélections multiples pour les champs bikes et users
  const handleMultiSelectChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setEditedCompany((prev) => ({
      ...prev,
      [e.target.name]: selectedOptions,
    }));
  };

  const handleSave = async (): Promise<void> => {
    const result = companyUpdateSchema.safeParse(editedCompany);
    if (!result.success) {
      const errorMessage = result.error.errors[0]?.message || "Erreur de validation";
      setValidationError(errorMessage);
      return;
    }
    setIsSaving(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost";
      const port = parseInt(localStorage.getItem("port") || "3001", 10);
      const payload = {
        name: editedCompany.name,
        email: editedCompany.email,
        address: editedCompany.address,
        phone: editedCompany.phone,
        bikes: editedCompany.bikes, // tableau de VINs
        users: editedCompany.users, // tableau d'identifiants
      };
      const res = await fetch(`${baseUrl}:${port}/companies/${company.identifier}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Erreur lors de la modification");
      const updatedCompany: Company = await res.json();
      alert("Compagnie modifiée avec succès");
      if (onUpdate) onUpdate(updatedCompany);
      setIsEditing(false);
    } catch (error) {
      console.error("Erreur lors de la modification de la compagnie :", error);
      alert("Erreur lors de la modification de la compagnie");
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
              value={editedCompany.name}
              onChange={handleChange}
              className="border rounded p-1 mb-1"
              placeholder="Nom de la compagnie"
            />
          </div>
        ) : (
          <CardTitle className="text-2xl font-bold text-gray-800">{company.name}</CardTitle>
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
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={editedCompany.email}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Adresse</label>
              <textarea
                name="address"
                value={editedCompany.address}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Téléphone</label>
              <input
                type="text"
                name="phone"
                value={editedCompany.phone}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Motos (VINs, multi-sélection)</label>
              {loadingOptions ? (
                <p>Chargement des options...</p>
              ) : (
                <select
                  multiple
                  name="bikes"
                  value={editedCompany.bikes}
                  onChange={handleMultiSelectChange}
                  className="w-full border rounded p-2"
                >
                  {availableBikes.map((bike) => {
                    const vin = typeof bike.vin === "object" ? bike.vin.value : bike.vin;
                    return (
                      <option key={vin} value={vin}>
                        {bike.brand} {bike.model} ({vin})
                      </option>
                    );
                  })}
                </select>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">
                Utilisateurs (IDs, multi-sélection)
              </label>
              {loadingOptions ? (
                <p>Chargement des options...</p>
              ) : (
                <select
                  multiple
                  name="users"
                  value={editedCompany.users}
                  onChange={handleMultiSelectChange}
                  className="w-full border rounded p-2"
                >
                  {availableUsers.map((user) => (
                    <option key={user.identifier} value={user.identifier}>
                      {user.firstName} {user.lastName} ({user.email})
                    </option>
                  ))}
                </select>
              )}
            </div>
          </>
        ) : (
          <>
            <p className="text-sm text-gray-600"><strong>Email :</strong> {company.email}</p>
            <p className="text-sm text-gray-600"><strong>Adresse :</strong> {company.address}</p>
            <p className="text-sm text-gray-600"><strong>Téléphone :</strong> {company.phone}</p>
            <p className="text-sm text-gray-600">
              <strong>Motos :</strong> {company.bikes.map(b => typeof b.vin === "object" ? b.vin.value : b.vin).join(", ")}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Utilisateurs :</strong> {company.users.map(u => `${u.firstName} ${u.lastName}`).join(", ")}
            </p>
            <p className="text-sm text-gray-600"><strong>Créée le :</strong> {formatDate(company.createdAt)}</p>
            <p className="text-sm text-gray-600"><strong>Mis à jour le :</strong> {formatDate(company.updatedAt)}</p>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default CompanyCard;
