import Table from '../components/Table'

export default function Descuentoo() {
  return (
    <div >
      <header className="header">
        <a href="http://localhost:3000"><img className="logoheader" src="/logo.jpg" /></a>
        <a href="http://localhost:3000/ingreso" ><button className="btnHeader" type="submit"> Ingresar</button></a>
      </header>
      <div className="tablea">
        <Table />
      </div>
      <footer>

      </footer>
    </div>
  )
}