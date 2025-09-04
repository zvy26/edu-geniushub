// import { NextRequest, NextResponse } from 'next/server';

// export function middleware(request: NextRequest) {
//   const token = request.cookies.get('token')?.value;
//   const role = request.cookies.get('role')?.value;
//   const pathname = request.nextUrl.pathname;

//   // 🔒 Login qilmagan odamni /login ga qaytarish
//   if (!token && pathname.startsWith('/crm')) {
//     return NextResponse.redirect(new URL('/login', request.url));
//   }

//   // 🏠 Root sahifaga login qilmagan odam kira olmasin
//   if (pathname === '/') {
//     const url = request.nextUrl.clone();
//     url.pathname = token ? '/crm' : '/login';
//     return NextResponse.redirect(url);
//   }

//   // 🎯 Role tekshirish
//   if (pathname.startsWith('/crm/admin') && role !== 'admin') {
//     return NextResponse.redirect(new URL('/crm', request.url));
//   }

//   if (pathname.startsWith('/crm/user') && role !== 'user') {
//     return NextResponse.redirect(new URL('/crm', request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/', '/crm/:path*'],
// };
