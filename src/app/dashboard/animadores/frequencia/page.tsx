import { getAnimadores } from "@/features/animador";
import { FrequenciaAnimadoresForm } from "@/features/animador/components/frequencia-animadores-form";
import { RoleGuard } from "@/components/role-guard";
import { Cargo } from "@/features/auth";

export default async function FrequenciaAnimadoresPage() {
  const animadores = await getAnimadores();

  return (
    <RoleGuard allowedRoles={[Cargo.ADMIN, Cargo.COORDENADOR_GERAL, Cargo.COORDENADOR_FREQUENCIA]}>
      <FrequenciaAnimadoresForm animadores={animadores} />
    </RoleGuard>
  );
}
