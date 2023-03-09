import Layout from '../components/layout/Layout';
import '../styles/globals.css';
import { UserProvider } from '@auth0/nextjs-auth0/client';

function MyApp({ Component, pageProps }) {
  return (
      <UserProvider>
    <Layout>
      <Component {...pageProps} />
    </Layout>
      </UserProvider>
  );
}

export default MyApp;
