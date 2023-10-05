import { genSalt, hash } from "bcrypt";

export async function encriptarPassword(password: string) {
  const cantidadDeSaltos = await genSalt(10);
  const contrasenaHash = await hash(password, cantidadDeSaltos);

  return contrasenaHash;
}
