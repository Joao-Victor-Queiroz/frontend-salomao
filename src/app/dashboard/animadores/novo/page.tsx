import { getUsuarios } from "@/features/usuario";
import { AnimadorForm } from "@/features/animador/components/animador-form";
import { RoleGuard } from "@/components/role-guard";
import { Cargo } from "@/features/auth";

export default async function NovoAnimadorPage() {
  const usuarios = await getUsuarios();

  return (
    <RoleGuard allowedRoles={[Cargo.ADMIN, Cargo.COORDENADOR_GERAL, Cargo.COORDENADOR_FREQUENCIA]}>
      <AnimadorForm type="CREATE" usuarios={usuarios} />
    </RoleGuard>
  );
}
