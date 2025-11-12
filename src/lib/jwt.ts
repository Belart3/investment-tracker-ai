import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET

const generateToken = (userId: string) => {
    if (!JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }

    const token = jwt.sign(
        { userId },
        JWT_SECRET,
        { expiresIn: '1h' }
    );
    return token;
}

const verifyToken = (token: string) => {
    if (!JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; iat: number; exp: number };
        return decoded;
    } catch (error) {
        return null
    }
}

export { generateToken, verifyToken };