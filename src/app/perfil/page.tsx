"use client";
import { UserContext } from "@/context/UserContext";
import Link from "next/link";
import { useContext } from "react";

export default function Page() {
  const { user } = useContext(UserContext);

  return (
    <section className="perfil">
      <h2>{user.nombre}</h2>

      <p>{user.edad}</p>
      <p>{user.email}</p>
      <p>{user.password}</p>

      <Link href="/auth/registrarse">Volver</Link>
    </section>
  );
}
