import '../styles/globals.css'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../firebase/firebase-init'
import { serverTimestamp, doc, setDoc } from "firebase/firestore";
import Login from './log-in';
import { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import Loading from '../components/Loading';

const theme = {
  primaryColor: '#efd48b',
  secondaryColor: '#ececec',
  secondaryWithOpacity:"#ecececb2",
  boxShadow: "-2px 4px 39px 1px rgba(0,0,0,0.15)"
}
function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {

    (async ()=>{
      if (user) {

        await setDoc(doc(db, "users",user.uid), {
          uid:user.uid,
          email: user.email,
          lastSeen: serverTimestamp(),
          photoUrl: user.photoURL
        }, { merge: true })
      }
    })();
    
  }, [user])

  if (loading) return <Loading />;

  return (
    <ThemeProvider theme={theme}>
      {
        !user ?
          <Login {...pageProps} />
          :
          <Component {...pageProps} />
      }
    </ThemeProvider>

  )
}

export default MyApp
