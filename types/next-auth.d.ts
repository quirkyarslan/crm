import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      _id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
    };
    expires: string;
  }
} 