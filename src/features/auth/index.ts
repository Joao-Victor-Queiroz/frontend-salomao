export * from "./types";
export * from "./context";


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
