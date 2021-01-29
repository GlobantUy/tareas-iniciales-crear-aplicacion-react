import RegisterContent from '../components/Register'

export default function Registro() {
  return (
    <div >
      <header className="header">
        <a href={process.env.RESTURL_FRONTEND}><img className="logoheader" src="/logo.png" /></a>
      </header>
      <RegisterContent/>
      <footer>
      </footer>
    </div>
  )
}
