import { cookies } from "next/headers";
import { verifyToken } from "./jwt";

export async function getUserId() {
    const token = (await cookies()).get('token')?.value;
    if (!token) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }
    const decoded = verifyToken(token);
    if (!decoded) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }
    return decoded.userId;
}