import '@/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';


export default function App({ Component, pageProps }) {
  return (
    <div>
    
      <Component {...pageProps} />
    </div>
  );
}

