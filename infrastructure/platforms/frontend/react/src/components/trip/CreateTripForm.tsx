// components/trip/CreateTripForm.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Bike, User } from "@/types"; // Assurez-vous que ces types sont exportés dans votre projet

// Schéma de validation pour le trip avec Zod
const tripSchema = z.object({
  startDate: z.preprocess(
    (arg) => {
      if (typeof arg === "string" && arg.trim() !== "") {
        return new Date(arg).toISOString();
      }
    },
    z.string().nonempty("La date de début est requise")
  ),
  endDate: z.preprocess(
    (arg) => {
      if (typeof arg === "string" && arg.trim() !== "") {
        return new Date(arg).toISOString();
      }
    },
    z.string().nonempty("La date de fin est requise")
  ),
  bikeVin: z.string().nonempty("Le VIN de la moto est requis"),
  userIdentifier: z.string().nonempty("L'identifiant de l'utilisateur est requis"),
});

export type TripFormData = z.infer<typeof tripSchema>;

interface CreateTripFormProps {
  onCreate: (trip: any) => void;
}

export default function CreateTripForm({ onCreate }: CreateTripFormProps) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost";

  // Gestion du formulaire avec react-hook-form et Zod
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TripFormData>({
    resolver: zodResolver(tripSchema),
  });

  const [bikes, setBikes] = useState<Bike[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loadingBikes, setLoadingBikes] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    async function fetchBikes() {
      try {
        const port = parseInt(localStorage.getItem("port") || "3001", 10);
        const res = await fetch(`${baseUrl}:${port}/bikes`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
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
    fetchBikes();
  }, [baseUrl]);

  // Récupération des utilisateurs
  useEffect(() => {
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
    fetchUsers();
  }, [baseUrl]);

  const onSubmit = async (data: TripFormData) => {
    try {
      const port = parseInt(localStorage.getItem("port") || "3001", 10);
      const payload = {
        ...data,
        bikeId:  data.bikeVin,
        userId: data.userIdentifier,
      };
      const res = await fetch(`${baseUrl}:${port}/trips`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        throw new Error("Erreur lors de la création du trip");
      }
      const createdTrip = await res.json();
      onCreate(createdTrip);
      reset();
      alert("Trip créé avec succès");
    } catch (error) {
      console.error("Erreur lors de la création du trip :", error);
      alert("Erreur lors de la création du trip");
    }
  };

  return (
    <div className="mb-8 p-4 border rounded">
      <h2 className="text-2xl font-bold mb-4">Créer un Trip</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium">Date de début</label>
          <input type="date" {...register("startDate")} className="w-full border rounded p-2" />
          {errors.startDate && <p className="text-red-500">{errors.startDate.message as string}</p>}
        </div>
        <div>
          <label className="block font-medium">Date de fin</label>
          <input type="date" {...register("endDate")} className="w-full border rounded p-2" />
          {errors.endDate && <p className="text-red-500">{errors.endDate.message as string}</p>}
        </div>
        <div>
          <label className="block font-medium">Moto</label>
          {loadingBikes ? (
            <p>Chargement des motos...</p>
          ) : (
            <select {...register("bikeVin")} className="w-full border rounded p-2">
              <option value="">Sélectionnez une moto</option>
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
            <select {...register("userIdentifier")} className="w-full border rounded p-2">
              <option value="">Sélectionnez un utilisateur</option>
              {users.map((user) => (
                <option key={user.identifier} value={user.identifier}>
                  {user.firstName} {user.lastName} ({user.email})
                </option>
              ))}
            </select>
          )}
          {errors.userIdentifier && <p className="text-red-500">{errors.userIdentifier.message as string}</p>}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          {isSubmitting ? "Création..." : "Créer le Trip"}
        </button>
      </form>
    </div>
  );
}
