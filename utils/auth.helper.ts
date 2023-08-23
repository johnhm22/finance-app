// import { NextRequest, NextResponse } from 'next/server';

// export const authenticateToken = (
//   req: NextRequest,
//   res: NextResponse,
//   next: NextResponse
// ) => {
//   const authHeader = req.headers['authorization'];
//   console.log('authHeader: ', authHeader);
//   // const token = authHeader && authHeader.split(' ')[1]
// };

export const middlewareTestFunction = () => {
  console.log('Middleware function executed');
};
