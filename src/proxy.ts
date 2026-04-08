import { NextResponse, type NextRequest } from "next/server";

// 1. Remova o "default" e use apenas "export function middleware"
export default async function proxy(request: NextRequest) {
  const token = await request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;
  
  // Log para você depurar no terminal se o middleware está rodando
  console.log("Middleware processando rota:", pathname);

  // Se for rota protegida e não tiver token, volta pro login
  if (pathname.startsWith('/dashboard') && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// 2. O config é ESSENCIAL para o Next saber onde aplicar o middleware
export const config = {
  matcher: ['/dashboard/:path*'], 
};
// import { NextResponse, type NextRequest } from "next/server";
// import { cookies } from "next/headers";

// export default async function proxy(request: NextRequest) {
//   const protectedRoutes = ["/dashboard"];
//   const currentPath = request.nextUrl.pathname;
//   const isProtectedRoute = protectedRoutes.includes(currentPath);

//   if (isProtectedRoute) {
//     const cookiesStore = await cookies()

//     const token = cookiesStore.get('token')?.value;

//     if (!token) {
//       return NextResponse.redirect(new URL("/", request.nextUrl));
//     }
//   }

//   return NextResponse.next();
// }


