// components/part/CreatePartForm.tsx
"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Schéma de validation pour la pièce
const partSchema = z.object({
  reference: z.string().nonempty("La référence est requise"),
  name: z.string().nonempty("Le nom est requis"),
  description: z.string().nonempty("La description est requise"),
  stockQuantity: z.preprocess(
    (val) => Number(val),
    z.number().min(0, "La quantité doit être positive")
  ),
  minStockLevel: z.preprocess(
    (val) => Number(val),
    z.number().min(0, "Le niveau minimum doit être positif")
  ),
  price: z.preprocess(
    (val) => Number(val),
    z.number().min(0, "Le prix doit être positif")
  ),
});

export type PartFormData = z.infer<typeof partSchema>;

interface CreatePartFormProps {
  onCreate: (part: any) => void;
}

export default function CreatePartForm({ onCreate }: CreatePartFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PartFormData>({
    resolver: zodResolver(partSchema),
  });

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost";

  const onSubmit = async (data: PartFormData) => {
    try {
      const port = parseInt(localStorage.getItem("port") || "3001", 10);
      const res = await fetch(`${baseUrl}:${port}/parts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error("Erreur lors de la création de la pièce");
      }
      const createdPart = await res.json();
      onCreate(createdPart);
      reset();
      alert("Pièce créée avec succès");
    } catch (error) {
      console.error("Erreur lors de la création de la pièce :", error);
      alert("Erreur lors de la création de la pièce");
    }
  };

  return (
    <div className="mb-8 p-4 border rounded">
      <h2 className="text-2xl font-bold mb-4">Créer une Pièce</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium">Référence</label>
          <input
            type="text"
            {...register("reference")}
            className="w-full border rounded p-2"
          />
          {errors.reference && (
            <p className="text-red-500">{errors.reference.message as string}</p>
          )}
        </div>
        <div>
          <label className="block font-medium">Nom</label>
          <input
            type="text"
            {...register("name")}
            className="w-full border rounded p-2"
          />
          {errors.name && (
            <p className="text-red-500">{errors.name.message as string}</p>
          )}
        </div>
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            {...register("description")}
            className="w-full border rounded p-2"
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message as string}</p>
          )}
        </div>
        <div>
          <label className="block font-medium">Quantité en stock</label>
          <input
            type="number"
            {...register("stockQuantity")}
            className="w-full border rounded p-2"
          />
          {errors.stockQuantity && (
            <p className="text-red-500">{errors.stockQuantity.message as string}</p>
          )}
        </div>
        <div>
          <label className="block font-medium">Niveau de stock minimum</label>
          <input
            type="number"
            {...register("minStockLevel")}
            className="w-full border rounded p-2"
          />
          {errors.minStockLevel && (
            <p className="text-red-500">{errors.minStockLevel.message as string}</p>
          )}
        </div>
        <div>
          <label className="block font-medium">Prix</label>
          <input
            type="number"
            step="0.01"
            {...register("price")}
            className="w-full border rounded p-2"
          />
          {errors.price && (
            <p className="text-red-500">{errors.price.message as string}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          {isSubmitting ? "Création..." : "Créer la Pièce"}
        </button>
      </form>
    </div>
  );
}
