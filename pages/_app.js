import React from 'react';
import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import PropTypes from 'prop-types';

MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
};

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
