import { getResponse } from "@/app/external/LiveCointWatch";

export async function GET(request: Request) {
    console.log(new Date());
    // const body = await getStocks();
    // console.log(body);
    return Response.json(getResponse());
}