import { getAnimadorById } from "@/features/animador";
import { AnimadorDetalhe } from "@/features/animador/components/animador-detalhe";
import { RoleGuard } from "@/components/role-guard";
import { Cargo } from "@/features/auth";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function AnimadorDetalhePage({ params }: Props) {
  const { id } = await params;
  const animador = await getAnimadorById(id);

  if (!animador) {
    notFound();
  }

  return (
    <RoleGuard allowedRoles={[Cargo.ADMIN, Cargo.COORDENADOR_GERAL, Cargo.COORDENADOR_FREQUENCIA]}>
      <AnimadorDetalhe animador={animador} />
    </RoleGuard>
  );
}
