### next-auth example


#### First, set enviromennt in .env.local
- GITHUB_ID=
- GITHUB_SECRET=
- NEXTAUTH_URL=http://localhost/
- DATABASE_URL=sqlite://loclahost/:memory:
- EMAIL_SERVER_USER=
- EMAIL_SERVER_PASSWORD=
- EMAIL_SERVER_HOST=
- EMAIL_SERVER_PORT=
- EMAIL_FROM=
- CUSTOM_OAUTH2_PROVIDER_ISSUER_URL=
- CUSTOM_OAUTH2_PROVIDER_AUTHORIZATION_URL=
- CUSTOM_OAUTH2_PROVIDER_TOKEN_URL=
- CUSTOM_OAUTH2_PROVIDER_USERINFO_URL=
- CUSTOM_OAUTH2_PROVIDER_WELLKNOWN_URL=
- CUSTOM_OAUTH2_PROVIDER_CLIENT_ID=
- CUSTOM_OAUTH2_PROVIDER_CLIENT_SECRET=
- NODE_TLS_REJECT_UNAUTHORIZED=0 (dangerous!! )


#### You can use below providers:
- GitHub 
- Custom (with any OUATH2 provider)
- Email (with any email)
- Credentials (with username + password === 'foo' + 'bar' in this example)

More about [next-auth](https://next-auth.js.org/configuration/options)

