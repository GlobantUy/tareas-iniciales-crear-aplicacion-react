
import SimLoan from '../components/formSimLoan'

export default function Home() {
  return (
    <div>
      <header class="header">
        <h1 class="titleHeader">STB Bank Logo </h1>
        <a href="http://localhost:3000/ingreso" ><button class="btnHeader" type="submit"> Ingresar</button></a>
      </header>

      <SimLoan />
      <footer>

      </footer>
    </div>
  )
}
