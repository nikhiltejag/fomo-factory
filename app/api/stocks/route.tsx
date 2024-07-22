import { getResponse } from "@/app/external/LiveCointWatch";

export async function GET(request: Request) {
    const body = await getResponse();
    return Response.json(body);
}