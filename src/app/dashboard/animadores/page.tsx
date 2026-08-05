import { getAnimadores } from "@/features/animador";
import { AnimadoresLista } from "@/features/animador/components/animadores-lista";
import { RoleGuard } from "@/components/role-guard";
import { Cargo } from "@/features/auth";

export default async function AnimadoresPage() {
  const animadores = await getAnimadores();

  return (
    <RoleGuard allowedRoles={[Cargo.ADMIN, Cargo.COORDENADOR_GERAL, Cargo.COORDENADOR_FREQUENCIA]}>
      <AnimadoresLista animadores={animadores} />
    </RoleGuard>
  );
}
