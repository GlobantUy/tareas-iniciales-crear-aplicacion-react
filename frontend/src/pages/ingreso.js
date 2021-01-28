
import SimLogin from '../components/formLogin'

export default function Ingreso() {
  return (
    <div >
      <header className="header">
      <a href={process.env.RESTURL_FRONTEND}><img className="logoheader" src="/logo.png" /></a>
      </header>
      <SimLogin />

      <footer>
      </footer>
    </div>
  )
}
