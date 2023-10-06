import { jwtVerify } from 'jose';
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

  try {
    jwtVerify(
      accessToken!.toString()!,
      new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET)
    );
  } catch (e) {
    return new NextResponse(
      JSON.stringify({ message: 'authentication failed' })
    );
  }
};

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

export const config = {
  matcher: ['/home', '/api/quote', '/api/share', '/api/portfolio'],
};
