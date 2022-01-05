import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import EmailProvider from 'next-auth/providers/email';
import CredentialProvider from 'next-auth/providers/credentials';
import SequelizeAdapter from '@next-auth/sequelize-adapter';
import Sequelize from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:');
// Calling sync() is not recommended in production
sequelize.sync();

export default async function auth(req, res) {
  // debugger;
  // Do whatever you want here, before the request is passed down to `NextAuth`
  return await NextAuth(req, res, {
    // Configure one or more authentication providers
    providers: [
      GithubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),

      EmailProvider({
        server: {
          host: process.env.EMAIL_SERVER_HOST,
          port: process.env.EMAIL_SERVER_PORT,
          auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD,
          },
        },
        from: process.env.EMAIL_FROM,
      }),

      CredentialProvider({
        id: 'MyCredentialProviderId',
        name: 'credential',
        type: 'credentials',
        credentials: {
          username: {
            label: 'Username',
            type: 'text',
            placeholder: 'victor',
          },
          password: { label: 'Password', type: 'password' },
          userinfo: {
            label: 'Userinfo',
            type: 'text',
            placeholder: 'info',
          },
        },
        async authorize(credentials, req) {
          debugger;
          // database look up
          if (
            credentials.username === 'foo' &&
            credentials.password === 'bar'
          ) {
            return {
              id: 2,
              name: 'Foo Bar',
              email: 'foo.bar@examlpe.com',
            };
          }

          // login failed
          return null;
        },
      }),

      {
        id: 'kipariss',
        name: 'Kipariss',
        type: 'oauth',
        scope: 'openid',
        authorization: process.env.CUSTOM_OAUTH2_PROVIDER_AUTHORIZATION_URL,
        issuer: process.env.CUSTOM_OAUTH2_PROVIDER_ISSUER_URL,
        token: process.env.CUSTOM_OAUTH2_PROVIDER_TOKEN_URL,
        userinfo: process.env.CUSTOM_OAUTH2_PROVIDER_USERINFO_URL,
        clientId: process.env.CUSTOM_OAUTH2_PROVIDER_CLIENT_ID,
        clientSecret: process.env.CUSTOM_OAUTH2_PROVIDER_CLIENT_SECRET,
        wellKnown: process.env.CUSTOM_OAUTH2_PROVIDER_WELLKNOWN_URL,
        idToken: true,
        state: true,
        profile: async (profile) => {
          console.log('kipariss profile is:', profile);
          return {
            id: profile.sub,
            // name: profile.name,
            // email: profile.email,
            // image: profile.picture,
          };
        },
      },

      // ...add more providers here
    ],

    callbacks: {
      jwt: async ({ token, user }) => {
        // first time jwt callback is run, user object is available
        if (user) {
          token.id = user.id;
        }

        return token;
      },
      session: async ({ session, token }) => {
        if (token) {
          session.id = token.id;
        }
        return session;
      },
    },

    secret: 'test',

    jwt: {
      secret: 'test',
      encryption: true,
    },

    session: {
      // Choose how you want to save the user session.
      // The default is `"jwt"`, an encrypted JWT (JWE) in the session cookie.
      // If you use an `adapter` however, we default it to `"database"` instead.
      // You can still force a JWT session by explicitly defining `"jwt"`.
      // When using `"database"`, the session cookie will only contain a `sessionToken` value,
      // which is used to look up the session in the database.
      // strategy: 'database',
      strategy: 'jwt',

      // Seconds - How long until an idle session expires and is no longer valid.
      maxAge: 30 * 24 * 60 * 60, // 30 days

      // Seconds - Throttle how frequently to write to database to extend a session.
      // Use it to limit write operations. Set to 0 to always update the database.
      // Note: This option is ignored if using JSON Web Tokens
      updateAge: 24 * 60 * 60, // 24 hours
    },

    adapter: SequelizeAdapter(sequelize),
    // adapter: SequelizeAdapter(sequelize, {
    //   models: {
    //     User: sequelize.define("user", {
    //       ...models.User,
    //       phoneNumber: DataTypes.STRING,
    //     }),
    //   },
    // }),

    // pages: {
    //   signIn: '/signin',
    // },

    debug: true,
  });
}
