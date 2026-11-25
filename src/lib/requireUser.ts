import 'server-only';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { verifyToken } from './jwt';

export type AuthResult =
    | { ok: true; userId: string }
    | { ok: false; response: NextResponse };

// For API routes. Usage:
//   const auth = await requireUser();
//   if (!auth.ok) return auth.response;
//   ...use auth.userId
export async function requireUser(): Promise<AuthResult> {
    const token = (await cookies()).get('token')?.value;
    const decoded = token ? verifyToken(token) : null;

    if (!decoded?.userId) {
        return {
            ok: false,
            response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
        };
    }

    return { ok: true, userId: decoded.userId };
}
