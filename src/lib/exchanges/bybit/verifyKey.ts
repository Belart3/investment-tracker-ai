import 'server-only';
import { RestClientV5 } from 'bybit-api';

export type KeyCheck =
    | { ok: true; expiresAt: Date | null }
    | { ok: false; field: 'apiKey' | 'apiSecret' | 'general'; message: string };

type Failure = Extract<KeyCheck, { ok: false }>;

// Bybit error codes we can explain to the user
const KNOWN_ERRORS: Record<number, Omit<Failure, 'ok'>> = {
    10003: { field: 'apiKey', message: 'Bybit doesn’t recognise this API key. Check you copied all of it.' },
    33004: { field: 'apiKey', message: 'This API key has expired. Create a new one in Bybit.' },
    10004: { field: 'apiSecret', message: 'This secret doesn’t match the API key.' },
    10010: { field: 'general', message: 'This key only works from certain IP addresses. Create a key without an IP restriction.' },
    10002: { field: 'general', message: 'Bybit couldn’t check the key right now. Please try again.' },
};

const failure = (retCode: number | undefined): Failure | null => {
    const known = retCode !== undefined ? KNOWN_ERRORS[retCode] : undefined;
    return known ? { ok: false, ...known } : null;
};

// Uses the key once, read-only, to ask Bybit what it is ("Get API Key Information").
// Never log the raw error from bybit-api: it contains the key and secret.
export async function verifyBybitKey(apiKey: string, apiSecret: string): Promise<KeyCheck> {
    const client = new RestClientV5({ key: apiKey, secret: apiSecret, testnet: false });

    let response;
    try {
        response = await client.getQueryApiKey();
    } catch (error) {
        // Bybit answered with an HTTP error, or didn't answer at all
        const { code, body } = (error ?? {}) as { code?: number; body?: { retCode?: number; retMsg?: string } };
        const known = failure(body?.retCode);
        if (known) return known;

        console.error('Bybit key check failed:', { httpStatus: code, retCode: body?.retCode, retMsg: body?.retMsg });
        return { ok: false, field: 'general', message: 'We couldn’t reach Bybit to check this key. Please try again.' };
    }

    if (response.retCode !== 0) {
        const known = failure(response.retCode);
        if (known) return known;

        console.error('Bybit key check rejected:', { retCode: response.retCode, retMsg: response.retMsg });
        return { ok: false, field: 'general', message: 'Bybit rejected this key. Check it and try again.' };
    }

    if (response.result.readOnly !== 1) {
        return {
            ok: false,
            field: 'general',
            message: 'This key can place trades or move funds. For your safety, create a read-only key instead.',
        };
    }

    const expiresAt = new Date(response.result.expiredAt);
    return { ok: true, expiresAt: isNaN(expiresAt.getTime()) ? null : expiresAt };
}
