import { getUsuarios } from "@/features/usuario";
import { UsuariosLista } from "@/features/usuario/components/usuarios-lista";
import { RoleGuard } from "@/components/role-guard";
import { Cargo } from "@/features/auth";

export default async function UsuariosPage() {
  const usuarios = await getUsuarios();

  return (
    <RoleGuard allowedRoles={[Cargo.ADMIN, Cargo.COORDENADOR_GERAL]}>
      <UsuariosLista usuarios={usuarios} />
    </RoleGuard>
  );
}
