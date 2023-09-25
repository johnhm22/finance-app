import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

export const middleware = async (
  req: NextRequest,
  response: NextResponse,
  next: NextResponse
) => {
  const accessToken = req.cookies.get('accessToken');

  if (!accessToken) {
    console.log('there is no accessToken');
    return NextResponse.redirect('http://localhost:3000/login');
  }
  // if (req.nextUrl.pathname === '/logout') {
  // await deleteCookies();
  // }

  jwt.verify(
    accessToken!.toString()!,
    process.env.ACCESS_TOKEN_SECRET!,
    (err, user) => {
      if (err)
        return new NextResponse(
          JSON.stringify({ message: 'authentication failed' })
        );
    }
  );
};

export const config = {
  matcher: ['/home', '/api/quote', '/api/share'],
};

// "/api/article(.*)",
// "/api/auth/logout",
// "/api/college/(.*)",
// "/api/contribution(.*)",
// "/api/dashboard(.*)",
// "/api/education-detail(.*)",
// "/api/financial-aid(.*)",
// "/api/private-student-loan(.*)",
// "/api/savings(.*)",
// "/api/scholarship(.*)",
// "/api/user/(.*)",

//from nitro
// export const verifyToken = async (
//   token: string
// ): Promise<Record<string, any>> => {
//   try {
//     const { payload } = await jwtVerify(
//       token,
//       new TextEncoder().encode(JWT_SECRET),
//       {
//         algorithms: ["HS256"],
//       }
//     );
//     return payload;
//   } catch (e) {
//     console.error(e);
//     throw new CustomHttpException(StatusCodes.UNAUTHORIZED, "Invalid token");
//   }
// };
