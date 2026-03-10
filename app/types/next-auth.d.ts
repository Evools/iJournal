import { DefaultSession } from "next-auth";
import { Role } from "../@generated/client"; // Проверь путь до своей Prisma

declare module "next-auth" {
    interface User {
        role?: Role;
    }
    interface Session {
        user: {
            role?: Role;
        } & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role?: Role;
    }
}