
import NextNprogress from 'nextjs-progressbar';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <div className="container">
      <NextNprogress height={8} color="#209cee" />
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
