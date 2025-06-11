import NextAuth, { NextAuthOptions } from "next-auth";

declare module "next-auth" {
  interface Session { id_token?: string; profile?: any }
  interface JWT { id_token?: string; profile?: any }
}

export const authOptions: NextAuthOptions = {
  providers: [
    {
      id: "worldcoin",
      name: "Worldcoin",
      type: "oauth",
      wellKnown: "https://id.worldcoin.org/.well-known/openid-configuration",
      authorization: { params: { scope: "openid profile email" } },
      clientId: process.env.WLD_CLIENT_ID,
      clientSecret: process.env.WLD_CLIENT_SECRET,
      idToken: true,
      checks: ["state", "nonce", "pkce"],
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          given_name: profile.given_name,
          family_name: profile.family_name,
          email: profile.email,
          verification_level: profile["https://id.worldcoin.org/v1"].verification_level,
          credential_type: profile["https://id.worldcoin.org/beta"].credential_type,
          likely_human: profile["https://id.worldcoin.org/beta"].likely_human
        };
      },
    },
  ],
  callbacks: {
    async jwt({ token, profile, account }) {
      if (profile) {
        token.profile = profile;
      }
      if (account) {
        token.id_token = account.id_token;
      }
      return token;
    },
    async session({ session, token }: { session: any, token: any }) {
      session.id_token = token.id_token;
      session.profile = token.profile;
      return session;
    }
  },
  debug: true,
};

export default NextAuth(authOptions);
