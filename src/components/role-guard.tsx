"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth, Cargo } from "@/features/auth";
import { doesCargoMatches } from "@/lib/cargo-matches";
import { Skeleton } from "@/components/ui/skeleton";

type RoleGuardProps = {
  allowedRoles: Cargo[];
  children: React.ReactNode;
};

export function RoleGuard({ allowedRoles, children }: RoleGuardProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user || !doesCargoMatches(user.cargo, allowedRoles)) {
        router.replace("/dashboard");
      }
    }
  }, [user, isLoading, allowedRoles, router]);

  if (isLoading) {
    return (
      <div className="space-y-4 p-4">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!user || !doesCargoMatches(user.cargo, allowedRoles)) {
    return null;
  }

  return <>{children}</>;
}
