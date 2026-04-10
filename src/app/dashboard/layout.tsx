import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default async function DashboardLayout({ children} : Readonly<{ children: React.ReactNode}>) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="bg-muted/50">
                <SidebarTrigger />
                <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="min-h-[100vh] flex-1 rounded-xl bg-background md:min-h-min border shadow-sm p-6">
                    {children}
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}