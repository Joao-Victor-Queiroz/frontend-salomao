"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {LayoutDashboard, User, Users, LogOut} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/features/auth"

const items = [
{
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Perfil",
    url: "/dashboard/profile",
    icon: User,
  },
  {
    title: "Crismandos",
    url: "/dashboard/crismandos",
    icon: Users,
  },
  {
    title: 'Grupos',
    url: '/dashboard/grupos',
    icon: Users,
  }
]

export function AppSidebar() {
  const pathname = usePathname()
  const {user, signOut} = useAuth()

  return (
    <Sidebar>
      <SidebarHeader>
        <h1 className='font-bold text-xl'>Olá, {user?.nome}</h1>
        </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => {
            const isCurrentActive = pathname === item.url

            return (
              <SidebarMenuItem key={item.url} className="p-2">
              <SidebarMenuButton tooltip={item.title} 
              isActive={isCurrentActive}
              render={
                <Link href={item.url} >
                  <item.icon className={isCurrentActive ? "font-bold text-primary-red" : ""}/>
                  <span className={isCurrentActive ? "font-bold text-primary-red text-lg" : "text-lg"}>{item.title}</span>
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
            <SidebarMenuButton tooltip="Sair" onClick={signOut} className='flex-end'>
              <LogOut className="text-primary-red"/>
              <span className="text-primary-red">Sair</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}