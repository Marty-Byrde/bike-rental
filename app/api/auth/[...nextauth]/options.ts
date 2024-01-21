import type { NextAuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import clientPromise from '@/app/api/auth/[...nextauth]/mongoDBClientPromise'

const { GITHUB_ID, GITHUB_SECRET, NEXTAUTH_DB } = process.env

if (!GITHUB_ID || !GITHUB_SECRET) throw new Error('Missing Github Credentials...')
if (!NEXTAUTH_DB) throw new Error('Missing Next-Auth MongoDB Credentials...')

export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: GITHUB_ID,
      clientSecret: GITHUB_SECRET,
      name: 'Github-Provider',
    }),
  ],
  // @ts-ignore
  adapter: MongoDBAdapter(clientPromise, {
    databaseName: NEXTAUTH_DB,
    collections: {
      Users: 'users',
      Accounts: 'accounts',
      Sessions: 'sessions',
      VerificationTokens: 'verification_tokens',
    },
  }),
}
