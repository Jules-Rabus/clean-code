"use client";

import { useState, useEffect, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost";
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const port = parseInt(localStorage.getItem("port") || "3001", 10);
    try {
      const response = await fetch(`${baseUrl}:${port}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });
      if (!response.ok) {
        const errorText = await response.text();
        setMessage(`Erreur ${response.status} : ${errorText}`);
        return;
      }
      const tokenResponse = await response.text();
      localStorage.setItem("token", tokenResponse);
      setToken(tokenResponse);
      setMessage("Connexion réussie");
    } catch (error: any) {
      setMessage(`Erreur : ${error.message}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setMessage("Déconnecté");
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      {token ? (
        <div className="flex flex-col items-center">
          <p className="mb-4">Vous êtes déjà connecté.</p>
          <Button onClick={handleLogout}>Déconnexion</Button>
        </div>
      ) : (
        <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full max-w-sm">
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1">Email</label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1">Mot de passe</label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <Button type="submit">Se connecter</Button>
        </form>
      )}
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
