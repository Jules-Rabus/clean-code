// components/maintenance/CreateMaintenanceForm.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Bike } from "@/types";

// Schéma de validation pour la création d'une maintenance
const maintenanceCreationSchema = z.object({
  title: z.string().nonempty("Le titre est requis"),
  description: z.string().nonempty("La description est requise"),
  startDate: z.preprocess(
    (arg) => {
      if (typeof arg === "string" && arg.trim() !== "") return new Date(arg).toISOString();
    },
    z.string().nonempty("La date de début est requise")
  ),
  endDate: z.preprocess(
    (arg) => {
      if (typeof arg === "string" && arg.trim() !== "") return new Date(arg).toISOString();
    },
    z.string().nonempty("La date de fin est requise")
  ),
  isDone: z.boolean().default(false),
  bikeVin: z.string().nonempty("Le VIN de la moto est requis"),
});

export type MaintenanceFormData = z.infer<typeof maintenanceCreationSchema>;

interface CreateMaintenanceFormProps {
  onCreate: (maintenance: any) => void;
}

export default function CreateMaintenanceForm({ onCreate }: CreateMaintenanceFormProps) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost";
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MaintenanceFormData>({
    resolver: zodResolver(maintenanceCreationSchema),
    defaultValues: {
      isDone: false,
    },
  });

  const [bikes, setBikes] = useState<Bike[]>([]);
  const [loadingBikes, setLoadingBikes] = useState(true);

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

  const onSubmit = async (data: MaintenanceFormData) => {
    try {
      const port = parseInt(localStorage.getItem("port") || "3001", 10);
      // Préparer le payload avec bikeVin directement comme chaîne de caractères
      const payload = {
        title: data.title,
        description: data.description,
        startDate: data.startDate,
        endDate: data.endDate,
        isDone: data.isDone,
        bikeVin: data.bikeVin,
      };
      const res = await fetch(`${baseUrl}:${port}/maintenances`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        throw new Error("Erreur lors de la création de la maintenance");
      }
      const createdMaintenance = await res.json();
      onCreate(createdMaintenance);
      reset();
      alert("Maintenance créée avec succès");
    } catch (error) {
      console.error("Erreur lors de la création de la maintenance:", error);
      alert("Erreur lors de la création de la maintenance");
    }
  };

  return (
    <div className="mb-8 p-4 border rounded">
      <h2 className="text-2xl font-bold mb-4">Créer une Maintenance</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium">Titre</label>
          <input type="text" {...register("title")} className="w-full border rounded p-2" />
          {errors.title && <p className="text-red-500">{errors.title.message as string}</p>}
        </div>
        <div>
          <label className="block font-medium">Description</label>
          <textarea {...register("description")} className="w-full border rounded p-2" />
          {errors.description && <p className="text-red-500">{errors.description.message as string}</p>}
        </div>
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
          <label className="block font-medium">
            <input type="checkbox" {...register("isDone")} className="mr-2" />
            Résolue
          </label>
          {errors.isDone && <p className="text-red-500">{errors.isDone.message as string}</p>}
        </div>
        <div>
          <label className="block font-medium">Motos</label>
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
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          {isSubmitting ? "Création..." : "Créer la Maintenance"}
        </button>
      </form>
    </div>
  );
}
