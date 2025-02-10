// components/bike/CreateBikeForm.tsx
"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Définition du schéma de validation avec Zod incluant isActive et isDecommissioned
const bikeSchema = z.object({
  vin: z.string().nonempty("Le VIN est requis"),
  brand: z.string().nonempty("La marque est requise"),
  model: z.string().nonempty("Le modèle est requis"),
  mileage: z.preprocess(
    (val) => Number(val),
    z.number().min(0, "Le kilométrage doit être positif")
  ),
  registrationNumber: z.string().optional(),
  purchaseDate: z.preprocess(
    (arg) => {
      if (typeof arg === "string" && arg.trim() !== "") {
        return new Date(arg).toISOString();
      }
    },
    z.string().nonempty("La date d'achat est requise")
  ),
  warrantyExpirationDate: z.preprocess(
    (arg) => {
      if (typeof arg === "string" && arg.trim() !== "") {
        return new Date(arg).toISOString();
      }
    },
    z.string().nonempty("La date de fin de garantie est requise")
  ),
  isActive: z.boolean().default(true),
  isDecommissioned: z.boolean().default(false),
});

// Type généré automatiquement à partir du schéma
export type BikeFormData = z.infer<typeof bikeSchema>;

interface CreateBikeFormProps {
  onCreate: (bike: any) => void;
}

export default function CreateBikeForm({ onCreate }: CreateBikeFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BikeFormData>({
    resolver: zodResolver(bikeSchema),
    defaultValues: {
      isActive: true,
      isDecommissioned: false,
    },
  });

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost";

  const onSubmit = async (data: BikeFormData) => {
    try {
      const port = parseInt(localStorage.getItem("port") || "3001", 10);
      const res = await fetch(`${baseUrl}:${port}/bikes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error("Erreur lors de la création de la moto");
      }
      const createdBike = await res.json();
      onCreate(createdBike);
      reset();
      alert("Moto créée avec succès");
    } catch (error) {
      console.error("Erreur lors de la création de la moto :", error);
      alert("Erreur lors de la création de la moto");
    }
  };

  return (
    <div className="mb-8 p-4 border rounded">
      <h2 className="text-2xl font-bold mb-4">Créer une Moto</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium">VIN</label>
          <input
            type="text"
            {...register("vin")}
            className="w-full border rounded p-2"
          />
          {errors.vin && (
            <p className="text-red-500">{errors.vin.message as string}</p>
          )}
        </div>
        <div>
          <label className="block font-medium">Marque</label>
          <input
            type="text"
            {...register("brand")}
            className="w-full border rounded p-2"
          />
          {errors.brand && (
            <p className="text-red-500">{errors.brand.message as string}</p>
          )}
        </div>
        <div>
          <label className="block font-medium">Modèle</label>
          <input
            type="text"
            {...register("model")}
            className="w-full border rounded p-2"
          />
          {errors.model && (
            <p className="text-red-500">{errors.model.message as string}</p>
          )}
        </div>
        <div>
          <label className="block font-medium">Kilométrage</label>
          <input
            type="number"
            {...register("mileage")}
            className="w-full border rounded p-2"
          />
          {errors.mileage && (
            <p className="text-red-500">{errors.mileage.message as string}</p>
          )}
        </div>
        <div>
          <label className="block font-medium">Immatriculation</label>
          <input
            type="text"
            {...register("registrationNumber")}
            className="w-full border rounded p-2"
          />
          {errors.registrationNumber && (
            <p className="text-red-500">
              {errors.registrationNumber.message as string}
            </p>
          )}
        </div>
        <div>
          <label className="block font-medium">Date d'achat</label>
          <input
            type="date"
            {...register("purchaseDate")}
            className="w-full border rounded p-2"
          />
          {errors.purchaseDate && (
            <p className="text-red-500">
              {errors.purchaseDate.message as string}
            </p>
          )}
        </div>
        <div>
          <label className="block font-medium">Date de fin de garantie</label>
          <input
            type="date"
            {...register("warrantyExpirationDate")}
            className="w-full border rounded p-2"
          />
          {errors.warrantyExpirationDate && (
            <p className="text-red-500">
              {errors.warrantyExpirationDate.message as string}
            </p>
          )}
        </div>
        {/* Champs pour isActive et isDecommissioned */}
        <div>
          <label className="block font-medium">
            <input
              type="checkbox"
              {...register("isActive")}
              defaultChecked={true}
              className="mr-2"
            />
            Actif
          </label>
          {errors.isActive && (
            <p className="text-red-500">{errors.isActive.message as string}</p>
          )}
        </div>
        <div>
          <label className="block font-medium">
            <input
              type="checkbox"
              {...register("isDecommissioned")}
              defaultChecked={false}
              className="mr-2"
            />
            Hors service
          </label>
          {errors.isDecommissioned && (
            <p className="text-red-500">{errors.isDecommissioned.message as string}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          {isSubmitting ? "Création..." : "Créer la Moto"}
        </button>
      </form>
    </div>
  );
}
