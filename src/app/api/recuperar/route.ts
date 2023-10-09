// Recuperar el email del usuario
// buscar ese usuario en base de datos
// despues vamos a crearle un token unico
// despues vamos a mandarle el mail

// en base a ese email va a poder acceder al cambi ode contrase;a
import { PrismaClient } from "@prisma/client";
import { sign } from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const datos = await req.json();

  const usuario = await prisma.usuario.findUnique({
    where: { email: datos.email },
  });

  if (!usuario) {
    return new Response(JSON.stringify({ msg: "Este usuario no existe!" }), {
      status: 400,
    });
  }

  const tokenUnicoParaRecuperacion = sign(
    datos.email,
    process.env.TOKEN_SECRET as string,
    {}
  );

  const emailAEnviar = {
    asunto: "Recupera tu contraseña",
    from_name: "Blog de Roberto",
    to_name: usuario.nombre,
    link: `https://blog-de-roberto.vercel.app/auth/recuperar/${tokenUnicoParaRecuperacion}`,
    user_email: datos.email,
  };

  return new Response(JSON.stringify(emailAEnviar));
}
