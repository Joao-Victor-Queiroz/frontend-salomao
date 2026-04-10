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
import {LayoutDashboard, User} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

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
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader>
        <h1>HEADER DA SIDEBAR</h1>
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
                  <span className={isCurrentActive ? "font-bold text-primary-red" : ""}>{item.title}</span>
                </Link>
              }
              />
            </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}