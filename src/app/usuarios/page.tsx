async function obtenerUsuarios() {
  const respuesta = await fetch("http://localhost:3000/api/usuarios", {
    cache: "no-store",
  });
  const datos = await respuesta.json();
  return datos;
}

type Usuario = {
  id: string;
  nombre: string;
  edad: number;
  email: string;
  password: string;
  activo: boolean;
};

export default async function Pagina() {
  const usuarios = await obtenerUsuarios();

  return (
    <section>
      <h2>Usuarios</h2>

      <ul>
        {usuarios.map((usuario: Usuario) => (
          <li key={usuario.id}>
            {usuario.nombre} - {usuario.edad}
          </li>
        ))}
      </ul>
    </section>
  );
}
