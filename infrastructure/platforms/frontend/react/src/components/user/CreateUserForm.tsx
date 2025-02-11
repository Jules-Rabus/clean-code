// components/user/CreateUserForm.tsx
"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Schéma de validation pour la création d'un utilisateur
const userCreationSchema = z.object({
  email: z.string().email("Email invalide"),
  firstName: z.string().nonempty("Le prénom est requis"),
  lastName: z.string().nonempty("Le nom est requis"),
  password: z.string().nonempty("Le mot de passe est requis"),
  roles: z.string().nonempty("Les rôles sont requis"),
  isActive: z.boolean().default(true),
});

export type UserFormData = z.infer<typeof userCreationSchema>;

interface CreateUserFormProps {
  onCreate: (user: any) => void;
}

export default function CreateUserForm({ onCreate }: CreateUserFormProps) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost";
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({
    resolver: zodResolver(userCreationSchema),
    defaultValues: {
      isActive: true,
    },
  });

  const onSubmit = async (data: UserFormData) => {
    try {
      const port = parseInt(localStorage.getItem("port") || "3001", 10);
      // Convertir la chaîne des rôles en tableau
      const rolesArray = data.roles.split(",").map((role) => role.trim());
      const payload = {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
        roles: rolesArray,
        isActive: data.isActive,
      };
      const res = await fetch(`${baseUrl}:${port}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Erreur lors de la création de l'utilisateur");
      const createdUser = await res.json();
      onCreate(createdUser);
      reset();
      alert("Utilisateur créé avec succès");
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur:", error);
      alert("Erreur lors de la création de l'utilisateur");
    }
  };

  return (
    <div className="mb-8 p-4 border rounded">
      <h2 className="text-2xl font-bold mb-4">Créer un Utilisateur</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium">Email</label>
          <input type="email" {...register("email")} className="w-full border rounded p-2" />
          {errors.email && <p className="text-red-500">{errors.email.message as string}</p>}
        </div>
        <div>
          <label className="block font-medium">Prénom</label>
          <input type="text" {...register("firstName")} className="w-full border rounded p-2" />
          {errors.firstName && <p className="text-red-500">{errors.firstName.message as string}</p>}
        </div>
        <div>
          <label className="block font-medium">Nom</label>
          <input type="text" {...register("lastName")} className="w-full border rounded p-2" />
          {errors.lastName && <p className="text-red-500">{errors.lastName.message as string}</p>}
        </div>
        <div>
          <label className="block font-medium">Mot de passe</label>
          <input type="password" {...register("password")} className="w-full border rounded p-2" />
          {errors.password && <p className="text-red-500">{errors.password.message as string}</p>}
        </div>
        <div>
          <label className="block font-medium">Rôles (séparés par des virgules)</label>
          <input type="text" {...register("roles")} className="w-full border rounded p-2" />
          {errors.roles && <p className="text-red-500">{errors.roles.message as string}</p>}
        </div>
        <div>
          <label className="block font-medium">
            <input type="checkbox" {...register("isActive")} className="mr-2" />
            Actif
          </label>
          {errors.isActive && <p className="text-red-500">{errors.isActive.message as string}</p>}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          {isSubmitting ? "Création..." : "Créer l'Utilisateur"}
        </button>
      </form>
    </div>
  );
}
