"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { LayoutDashboard, User, Users, LogOut, Cake, UserCheck, ShieldCheck } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth, Cargo } from "@/features/auth"
import { doesCargoMatches } from "@/lib/cargo-matches"

export function AppSidebar() {
  const pathname = usePathname()
  const { user, signOut } = useAuth()

  const navItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      show: true,
    },
    {
      title: "Perfil",
      url: "/dashboard/profile",
      icon: User,
      show: true,
    },
    {
      title: "Animadores",
      url: "/dashboard/animadores",
      icon: UserCheck,
      show: user ? doesCargoMatches(user.cargo, [Cargo.ADMIN, Cargo.COORDENADOR_GERAL, Cargo.COORDENADOR_FREQUENCIA]) : false,
    },
    {
      title: "Usuários",
      url: "/dashboard/usuarios",
      icon: ShieldCheck,
      show: user ? doesCargoMatches(user.cargo, [Cargo.ADMIN, Cargo.COORDENADOR_GERAL]) : false,
    },
    {
      title: "Crismandos",
      url: "/dashboard/crismandos",
      icon: Users,
      show: true,
    },
    {
      title: "Grupos",
      url: "/dashboard/grupos",
      icon: Users,
      show: true,
    },
    {
      title: "Aniversários",
      url: "/dashboard/aniversarios",
      icon: Cake,
      show: true,
    },
  ]

  const visibleItems = navItems.filter((item) => item.show)

  return (
    <Sidebar>
      <SidebarHeader>
        <h1 className="font-bold text-xl">Olá, {user?.nome || user?.nomeAnimador}</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {visibleItems.map((item) => {
            const isCurrentActive =
              item.url === "/dashboard"
                ? pathname === "/dashboard"
                : pathname === item.url || pathname.startsWith(`${item.url}/`)

            return (
              <SidebarMenuItem key={item.url} className="p-2">
                <SidebarMenuButton
                  tooltip={item.title}
                  isActive={isCurrentActive}
                  render={
                    <Link href={item.url}>
                      <item.icon className={isCurrentActive ? "font-bold text-primary-red" : ""} />
                      <span className={isCurrentActive ? "font-bold text-primary-red text-lg" : "text-lg"}>
                        {item.title}
                      </span>
                    </Link>
                  }
                />
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Sair" onClick={signOut} className="flex-end">
              <LogOut className="text-primary-red" />
              <span className="text-primary-red">Sair</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}