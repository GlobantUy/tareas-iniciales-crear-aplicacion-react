
import SimLoan from '../components/formSimLoan'
<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
</style>
export default function Home() {
  return (
    <div>
      <header className="header">
      <img className="logoheader" src="/logo.jpg"/>
          <a href="http://localhost:3000/ingreso" ><button className="btnHeader" type="submit"> Ingresar</button></a>
      </header>

      <SimLoan />
      <footer>

      </footer>
    </div>
  )
}
