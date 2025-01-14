// import { jwtDecode } from "jwt-decode";
// import {
//   NextFetchEvent,
//   NextMiddleware,
//   NextRequest,
//   NextResponse,
// } from "next/server";

// const onlyAdminPage = ["/dashboard/:path*"];
// const authPage = ["/auth/login", "/auth/register"];
// export default function withAuth(
//   middleware: NextMiddleware,
//   requireAuth: string[] = []
// ) {
//   return async (req: NextRequest, next: NextFetchEvent) => {
//     const pathname = req.nextUrl.pathname;
//     const accessToken = req.cookies.get("accessToken")?.value;

//     if (requireAuth.includes(pathname)) {
//       if (!accessToken && !authPage.includes(pathname)) {
//         const url = new URL("/auth/login", req.url);
//         // url.searchParams.set("callbackUrl", encodeURI(req.url));
//         return NextResponse.redirect(url);
//       }

//       if (accessToken) {
//         const decoded: any = accessToken ? jwtDecode(accessToken) : null;
//         if (decoded) {
//           if (authPage.includes(pathname)) {
//             return NextResponse.redirect(
//               new URL("/dashboard/overview", req.url)
//             );
//           }
//           if (decoded.role !== "mitra" && onlyAdminPage.includes(pathname)) {
//             return NextResponse.redirect(new URL("/", req.url));
//           }
//         }
//       }
//     }

//     return middleware(req, next);
//   };
// }
