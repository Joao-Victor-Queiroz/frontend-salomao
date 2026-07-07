import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Providers  from '../providers';
import { AuthProvider } from "@/features/auth";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Projeto Salomão",
  description: "Aplicação de gerenciamento pastoral para facilitar nossa vida",
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} font-sans h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
         attribute="class"
         defaultTheme="system"
         enableSystem
         disableTransitionOnChange
        >
          <Providers>
            <AuthProvider>
              <TooltipProvider>
                {children}
                <Toaster />
              </TooltipProvider>
            </AuthProvider>
          </Providers>
        </ThemeProvider>
        </body>
    </html>
  );
}
