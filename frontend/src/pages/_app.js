/*import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress
*/
//import NextNprogress from 'nextjs-progressbar';
import '../styles/globals.css'
//Binding events. 
/*Router.events.on('routeChangeStart', () => NextNprogress.start()); 
Router.events.on('routeChangeComplete', () => NextNprogress.done()); 
Router.events.on('routeChangeError', () => NextNprogress. .done());*/



function MyApp({ Component, pageProps, NextNprogress }) {
  return <Component {...pageProps} NextNprogress />
}

export default MyApp
