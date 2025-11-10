// import NextAuth from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import Google from "next-auth/providers/google";
// import type { Provider } from "next-auth/providers";
// import bcrypt from "bcrypt"

// const providers: Provider[] = [
//     Credentials({
//         credentials: {
//             email: { label: "Email", type: "email" },
//             password: { label: "Password", type: "password" }
//         },
//         async authorize(credentials: Partial<Record<"email" | "password", unknown>>) {
//             let user = null;

//             if (!credentials?.email || !credentials?.password) return null;

//             const hashPW = bcrypt.hashSync(credentials.password as string, 10);

//             user = await getUserFromDb(credentials.email as string, hashPW);

//             if (credentials.password !== "password") return null;
//             return {
//                 id: "test",
//                 name: "Admin User",
//                 email: "test@gmail.com",
//             }
//         },
//     }),
//     Google
// ]

// export const providerMap = providers.map((provider) => {
//     if (typeof provider === "function") {
//         const providerData = provider();
//         return {
//             id: providerData.id,
//             name: providerData.name,
//         };
//     } else {
//         return {
//             id: provider.id,
//             name: provider.name,
//         }
//     }
// }).filter((provider) => provider.id !== "credentials");

// export const {handlers, auth, signIn, signOut} = NextAuth({
//     providers,
//     pages: {
//         signIn: "/signin",
//     },
// });