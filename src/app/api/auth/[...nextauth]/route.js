import { User } from "@/models/User";
import NextAuth, { getServerSession } from "next-auth/next";
import bcryptjs from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
import { UserInfo } from "@/models/UserInfo";
import { connect } from "@/libs/mongoConnect";

export const authOptions = {
  secret: process.env.SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          await connect();
          const user = await User.findOne({ email });
          if (!user) {
            return null;
          }
          const passwordsMatch = await bcryptjs.compare(password, user.password);
          if (!passwordsMatch) {
            return null;
          }
          return user;
        } catch (error) {
          console.log("Error:", error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        try {
          const { name, email } = user;
          await connect();
          let existingUser = await User.findOne({ email });

          if (!existingUser) {
            // Create new user
            const newUser = new User({
              name: name,
              email: email
            });
            existingUser = await newUser.save();
          }
          return existingUser;
        } catch (err) {
          console.log(err);
          return null;
        }
      }
      return user;
    }
  }
}

export async function isAdmin() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  if (!userEmail) {
    return false;
  }
  const userInfo = await UserInfo.findOne({ email: userEmail });
  if (!userInfo) {
    return false;
  }
  return userInfo.admin;
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }