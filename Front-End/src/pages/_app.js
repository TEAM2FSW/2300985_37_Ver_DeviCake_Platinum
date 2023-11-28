import '@/styles/globals.css'
import Footer from '@/components/Footer';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  return (
    <div>
      <Component {...pageProps} />
      {router.pathname !== '/checkout' && <Footer />}
    </div>
  );
}
