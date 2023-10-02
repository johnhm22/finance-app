import axios from 'axios';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

// GET
export async function GET(req: NextRequest, {params}) {

const {id} = params
console.log('params data in quote api: ', id);

try{
const response = await axios({
  url: `http://api.marketstack.com/v1/eod/latest?access_key=${process.env.MARKETSTACK_ACCESS_KEY}&symbols=${id}`,
method: 'GET'
});
console.log('res.data from quote api: ',response.data);

return NextResponse.json({response: response.data});

}
catch(e){
  console.log('There was an error');
  // console.log('Error: ', e);
}  

};
