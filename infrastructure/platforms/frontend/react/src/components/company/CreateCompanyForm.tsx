// components/company/CreateCompanyForm.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Bike, User } from "@/types";

// Schéma de validation pour la création d'une compagnie
const companyCreationSchema = z.object({
  name: z.string().nonempty("Le nom est requis"),
  email: z.string().email("Email invalide"),
  address: z.string().nonempty("L'adresse est requise"),
  phone: z.string().nonempty("Le téléphone est requis"),
  // Les champs bikes et users sont des tableaux de chaînes
  bikes: z.array(z.string()).optional(),
  users: z.array(z.string()).optional(),
});

export type CompanyFormData = z.infer<typeof companyCreationSchema>;

interface CreateCompanyFormProps {
  onCreate: (company: any) => void;
}

export default function CreateCompanyForm({ onCreate }: CreateCompanyFormProps) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost";
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<CompanyFormData>({
    resolver: zodResolver(companyCreationSchema),
  });

  // Récupération des motos pour le select multiple
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [loadingBikes, setLoadingBikes] = useState<boolean>(true);

  // Récupération des utilisateurs pour le select multiple
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState<boolean>(true);

  useEffect(() => {
    async function fetchBikes() {
      try {
        const port = parseInt(localStorage.getItem("port") || "3001", 10);
        const res = await fetch(`${baseUrl}:${port}/bikes`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token") || ""}` },
        });
        if (!res.ok) throw new Error("Erreur lors de la récupération des motos");
        const data = await res.json();
        setBikes(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des motos :", error);
      } finally {
        setLoadingBikes(false);
      }
    }
    async function fetchUsers() {
      try {
        const port = parseInt(localStorage.getItem("port") || "3001", 10);
        const res = await fetch(`${baseUrl}:${port}/users`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token") || ""}` },
        });
        if (!res.ok) throw new Error("Erreur lors de la récupération des utilisateurs");
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
      } finally {
        setLoadingUsers(false);
      }
    }
    fetchBikes();
    fetchUsers();
  }, [baseUrl]);

  const onSubmit = async (data: CompanyFormData) => {
    try {
      const port = parseInt(localStorage.getItem("port") || "3001", 10);
      const payload = {
        name: data.name,
        email: data.email,
        address: data.address,
        phone: data.phone,
        bikes: data.bikes || [],
        users: data.users || [],
      };
      const res = await fetch(`${baseUrl}:${port}/companies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Erreur lors de la création de la compagnie");
      const createdCompany = await res.json();
      onCreate(createdCompany);
      reset();
      alert("Compagnie créée avec succès");
    } catch (error) {
      console.error("Erreur lors de la création de la compagnie:", error);
      alert("Erreur lors de la création de la compagnie");
    }
  };

  return (
    <div className="mb-8 p-4 border rounded">
      <h2 className="text-2xl font-bold mb-4">Créer une Compagnie</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium">Nom</label>
          <input type="text" {...register("name")} className="w-full border rounded p-2" />
          {errors.name && <p className="text-red-500">{errors.name.message as string}</p>}
        </div>
        <div>
          <label className="block font-medium">Email</label>
          <input type="email" {...register("email")} className="w-full border rounded p-2" />
          {errors.email && <p className="text-red-500">{errors.email.message as string}</p>}
        </div>
        <div>
          <label className="block font-medium">Adresse</label>
          <textarea {...register("address")} className="w-full border rounded p-2" />
          {errors.address && <p className="text-red-500">{errors.address.message as string}</p>}
        </div>
        <div>
          <label className="block font-medium">Téléphone</label>
          <input type="text" {...register("phone")} className="w-full border rounded p-2" />
          {errors.phone && <p className="text-red-500">{errors.phone.message as string}</p>}
        </div>
        <div>
          <label className="block font-medium">Motos</label>
          {loadingBikes ? (
            <p>Chargement des motos...</p>
          ) : (
            <select multiple {...register("bikes")} className="w-full border rounded p-2">
              {bikes.map((bike) => {
                const vin = typeof bike.vin === "object" ? bike.vin.value : bike.vin;
                return (
                  <option key={vin} value={vin}>
                    {bike.brand} {bike.model} ({vin})
                  </option>
                );
              })}
            </select>
          )}
          {errors.bikes && <p className="text-red-500">{errors.bikes.message as string}</p>}
        </div>
        <div>
          <label className="block font-medium">Utilisateurs</label>
          {loadingUsers ? (
            <p>Chargement des utilisateurs...</p>
          ) : (
            <select multiple {...register("users")} className="w-full border rounded p-2">
              {users.map((user) => (
                <option key={user.identifier} value={user.identifier}>
                  {user.firstName} {user.lastName} ({user.email})
                </option>
              ))}
            </select>
          )}
          {errors.users && <p className="text-red-500">{errors.users.message as string}</p>}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          {isSubmitting ? "Création..." : "Créer la Compagnie"}
        </button>
      </form>
    </div>
  );
}
