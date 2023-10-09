"use client";
import { send } from "@emailjs/browser";
import { FormEvent, useRef, useState } from "react";

export default function Page() {
  const emailRef = useRef(null);
  const [mailEnviado, setMailEnviado] = useState(false);

  async function recuperarContrasenia(evento: FormEvent) {
    evento.preventDefault();
    const respuesta = await fetch(
      "https://blog-de-roberto.vercel.app/api/recuperar",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        //@ts-ignore
        body: JSON.stringify({ email: emailRef.current?.value }),
      }
    );

    if (respuesta.status !== 200) {
      alert("El email no existe");
      return;
    }

    const email = await respuesta.json();

    send("service_1xg87lx", "template_26djh83", email, "muwR5lFZDAoQUfcMH");

    setMailEnviado(true);
  }

  return (
    <section>
      {mailEnviado ? (
        <h2>Mail enviado exitosamente! Revisa tu correo</h2>
      ) : (
        <form onSubmit={recuperarContrasenia} className="text-black">
          <input
            type="email"
            ref={emailRef}
            placeholder="Email para la recuperacion"
          />

          <input
            type="submit"
            value="Enviar email de recuperacion"
            className="text-white"
          />
        </form>
      )}
    </section>
  );
}
