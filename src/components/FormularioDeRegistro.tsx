"use client";
import { FormEvent, useRef } from "react";
import { verify } from "jsonwebtoken";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import Link from "next/link";

export default function FormularioDeRegistro() {
  const nombreRef = useRef(null);
  const edadRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const recordarmeRef = useRef(null);

  const { user, setUser } = useContext(UserContext);

  async function mandarDatosDeRegistro(evento: FormEvent) {
    evento.preventDefault();

    const datosAEnviar = {
      //@ts-ignore
      nombre: nombreRef.current?.value,
      //@ts-ignore
      edad: Number(edadRef.current?.value),
      //@ts-ignore
      email: emailRef.current?.value,
      //@ts-ignore
      password: passwordRef.current?.value,
    };

    console.log(datosAEnviar);

    const respuesta = await fetch(
      "https://blog-de-roberto.vercel.app/api/usuarios/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosAEnviar),
      }
    );

    if (respuesta.status !== 201) {
      const error = await respuesta.json();
      alert(error.msg);
    }

    const { token } = await respuesta.json();

    setUser({ ...datosAEnviar, token });

    //@ts-ignore
    if (recordarmeRef.current?.value) {
      localStorage.setItem("usuario", JSON.stringify(datosAEnviar));
    }

    console.log(user);

    // const usuarioDecodificado = verify(
    //   token as string,
    //   process.env.NEXT_PUBLIC_TOKEN_SECRET as string
    // );

    // console.log(usuarioDecodificado);
  }

  return (
    <>
      <form onSubmit={mandarDatosDeRegistro} className="text-black">
        <input ref={nombreRef} type="text" placeholder="Nombre completo" />
        <input
          ref={edadRef}
          type="number"
          inputMode="numeric"
          placeholder="Edad"
        />
        <input ref={emailRef} type="email" placeholder="Email" />
        <input ref={passwordRef} type="password" placeholder="Contraseña" />
        <input type="checkbox" ref={recordarmeRef} /> Recordarme
        <input type="submit" className="text-white" value="Registrarse" />
      </form>

      <button onClick={() => console.log(user)}>Click</button>

      <Link href="/perfil">Ir al perfil</Link>
    </>
  );
}
