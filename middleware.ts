import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

export const middleware = (
  req: NextRequest,
  res: NextResponse,
  next: NextResponse
) => {
  const accessToken = req.cookies.get('accessToken');
  // const refreshToken = req.cookies.get('refreshToken');
  // console.log('request in mw: ', req.nextUrl.pathname);

  // console.log('pathname', req.nextUrl.pathname);

  if (!accessToken) {
    console.log('there is no accessToken');
    return NextResponse.redirect('http://localhost:3000/login');
  }
  if (req.nextUrl.pathname === '/logout') {
    req.cookies.delete('accessToken');
    req.cookies.delete('refreshToken');
  }

  // jwt.verify(
  //   accessToken!.toString()!,
  //   process.env.ACCESS_TOKEN_SECRET!,
  //   (err, user) => {
  //     if (err)
  //       return new NextResponse(
  //         JSON.stringify({ message: 'authentication failed' })
  //       );
  //   }
  // );
};

export const config = {
  matcher: ['/home/:path*'],
};

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
