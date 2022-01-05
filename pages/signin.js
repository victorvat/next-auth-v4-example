import React from 'react';
import {
  getProviders,
  signIn,
  getSession,
  getCsrfToken,
} from 'next-auth/react';
import {
  Box,
  Button,
  // Flex,
  Heading,
  Input,
  Container,
  Stack,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

SignIn.propTypes = {
  providers: PropTypes.any,
  csrfToken: PropTypes.any,
};

export default function SignIn(props) {
  const { providers, csrfToken } = props;
  return (
    <Container>
      <Heading as="h1" textAlign="center">
        Welcome to our custom Page.
      </Heading>
      <Box alignContent="center" justifyContent="center" marginTop={12}>
        <Box className="email-form">
          <form method="post" action="/api/auth/signin/email">
            <Input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <label>
              {' '}
              Email Address
              <Input type="text" id="email" name="email" />
            </label>
            <Button type="submit">Sign in with email</Button>
          </form>
        </Box>
      </Box>

      <form method="post" action="/api/auth/callback/MyCredentialProviderId">
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <label>
          Username
          <input name="username" type="text" />
        </label>
        <label>
          Password
          <input name="password" type="password" />
        </label>
        <button type="submit">Sign in with credentials</button>
      </form>

      <Stack isInline margin={12}>
        {Object.values(providers).map((provider) => {
          if (provider.name === 'Email') {
            return;
          }
          if (provider.id === 'MyCredentialProviderId') {
            return;
          }
          return (
            <Box key={provider.name}>
              <Button variant="outline" onClick={() => {
                // debugger;
                signIn(provider.id);
              }}>
                Sign in with {provider.name}
              </Button>
            </Box>
          );
        })}
      </Stack>
    </Container>
  );
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  const { req, res } = context;
  const session = await getSession({ req });

  if (session && res && session.accessToken) {
    debugger;
    res.writeHead(302, {
      Location: '/',
    });
    res.end();
    return;
  }

  const providers = await getProviders(context);
  return {
    props: {
      // session: undefined,
      providers,
      csrfToken: await getCsrfToken(context),
    },
  };
}

/*
// If older than Next.js 9.3
SignIn.getInitialProps = async (context) => {
  const { req, res } = context;
  const session = await getSession({ req });

  if (session && res && session.accessToken) {
    debugger;
    res.writeHead(302, {
      Location: '/',
    });
    res.end();
    return;
  }
  return {
    session: undefined,
    providers: await getProviders(context),
    csrfToken: await getCsrfToken(context),
  };
};
*/
