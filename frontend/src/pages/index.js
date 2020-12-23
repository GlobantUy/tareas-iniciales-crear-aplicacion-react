
import SimLoan from '../components/formSimLoan'
<style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
</style>


  const userLogin= ()=> {

    try {
      
      if (sessionStorage.getItem('Usuario-Values')){
        
      } else {

      }

    } catch (error) {
      console.log(error)
    }
  }


export default function Home() {
  userLogin()
  return (
    <div>
      <header className="header">
        <img className="logoheader" src="/logo.jpg" />
        <a href="http://localhost:3000/ingreso" ><button className="btnHeader" type="submit"> Ingresar</button></a>
      
        <div className='User'>

          <ul className='nav'>

            <li><a href=''>Nombre</a>

              <ul>
              <li><a href=''>Log out</a></li>
              </ul>

            </li>

          </ul>
          <img className="logoheader" src="/Frame.png" />
        </div>

      </header>

      <SimLoan />
        <footer>

        </footer>
    </div>
  )
}
