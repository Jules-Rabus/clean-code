// components/incident/CreateIncidentForm.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Bike, User } from "@/types";

// Schéma de validation pour la création d'un incident
const incidentCreationSchema = z.object({
  date: z.preprocess(
    (arg) => {
      if (typeof arg === "string" && arg.trim() !== "") return new Date(arg).toISOString();
    },
    z.string().nonempty("La date est requise")
  ),
  description: z.string().nonempty("La description est requise"),
  cost: z.preprocess(
    (arg) => Number(arg),
    z.number().min(0, "Le coût doit être positif")
  ),
  isResolved: z.boolean().default(false),
  bikeVin: z.string().nonempty("Le VIN du vélo est requis"),
  userId: z.string().nonempty("L'identifiant de l'utilisateur est requis"),
});

export type IncidentFormData = z.infer<typeof incidentCreationSchema>;

interface CreateIncidentFormProps {
  onCreate: (incident: any) => void;
}

export default function CreateIncidentForm({ onCreate }: CreateIncidentFormProps) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost";
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IncidentFormData>({
    resolver: zodResolver(incidentCreationSchema),
    defaultValues: {
      isResolved: false,
    },
  });

  // Récupération des vélos
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [loadingBikes, setLoadingBikes] = useState<boolean>(true);

  // Récupération des utilisateurs
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState<boolean>(true);

  useEffect(() => {
    async function fetchBikes() {
      try {
        const port = parseInt(localStorage.getItem("port") || "3001", 10);
        const res = await fetch(`${baseUrl}:${port}/bikes`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        });
        if (!res.ok) throw new Error("Erreur lors de la récupération des vélos");
        const data = await res.json();
        setBikes(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des vélos :", error);
      } finally {
        setLoadingBikes(false);
      }
    }
    async function fetchUsers() {
      try {
        const port = parseInt(localStorage.getItem("port") || "3001", 10);
        const res = await fetch(`${baseUrl}:${port}/users`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
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

  const onSubmit = async (data: IncidentFormData) => {
    try {
      const port = parseInt(localStorage.getItem("port") || "3001", 10);
      // Préparer le payload avec bikeVin et userId directement comme chaînes de caractères
      const payload = {
        date: data.date,
        description: data.description,
        cost: data.cost,
        isResolved: data.isResolved,
        bikeVin: data.bikeVin,
        userId: data.userId,
      };
      const res = await fetch(`${baseUrl}:${port}/incidents`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Erreur lors de la création de l'incident");
      const createdIncident = await res.json();
      onCreate(createdIncident);
      reset();
      alert("Incident créé avec succès");
    } catch (error) {
      console.error("Erreur lors de la création de l'incident:", error);
      alert("Erreur lors de la création de l'incident");
    }
  };

  return (
    <div className="mb-8 p-4 border rounded">
      <h2 className="text-2xl font-bold mb-4">Créer un Incident</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium">Date</label>
          <input type="date" {...register("date")} className="w-full border rounded p-2" />
          {errors.date && <p className="text-red-500">{errors.date.message as string}</p>}
        </div>
        <div>
          <label className="block font-medium">Description</label>
          <textarea {...register("description")} className="w-full border rounded p-2" />
          {errors.description && <p className="text-red-500">{errors.description.message as string}</p>}
        </div>
        <div>
          <label className="block font-medium">Coût (€)</label>
          <input type="number" {...register("cost")} className="w-full border rounded p-2" />
          {errors.cost && <p className="text-red-500">{errors.cost.message as string}</p>}
        </div>
        <div>
          <label className="block font-medium">
            <input type="checkbox" {...register("isResolved")} className="mr-2" />
            Résolu
          </label>
          {errors.isResolved && <p className="text-red-500">{errors.isResolved.message as string}</p>}
        </div>
        <div>
          <label className="block font-medium">Vélo</label>
          {loadingBikes ? (
            <p>Chargement des vélos...</p>
          ) : (
            <select {...register("bikeVin")} className="w-full border rounded p-2">
              <option value="">Sélectionnez un vélo</option>
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
          {errors.bikeVin && <p className="text-red-500">{errors.bikeVin.message as string}</p>}
        </div>
        <div>
          <label className="block font-medium">Utilisateur</label>
          {loadingUsers ? (
            <p>Chargement des utilisateurs...</p>
          ) : (
            <select {...register("userId")} className="w-full border rounded p-2">
              <option value="">Sélectionnez un utilisateur</option>
              {users.map((user) => (
                <option key={user.identifier} value={user.identifier}>
                  {user.firstName} {user.lastName} ({user.email})
                </option>
              ))}
            </select>
          )}
          {errors.userId && <p className="text-red-500">{errors.userId.message as string}</p>}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          {isSubmitting ? "Création..." : "Créer l'Incident"}
        </button>
      </form>
    </div>
  );
}
