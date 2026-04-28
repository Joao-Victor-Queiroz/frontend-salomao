import { NextRequest, NextResponse} from "next/server";
import { cookies } from "next/headers";

export default async function proxy(request: NextRequest){
    const cookiesStore = await cookies();
    const { pathname } = request.nextUrl;

    const token = cookiesStore.get("token")?.value;

    if (!token) {
       const loginUrl = new URL("/", request.url);
       loginUrl.searchParams.set("callbackUrl", pathname);
       return NextResponse.redirect(loginUrl);
    }

    const isJWTPattern = token.split('.').length === 3;

    if (!isJWTPattern) {
        const response = NextResponse.redirect(new URL("/", request.url));
        response.cookies.delete("token");
        response.cookies.delete("refreshToken");
        return response;
    }

    return NextResponse.next();

}

export const config = {
    matcher: ["/dashboard/:path*"]
}