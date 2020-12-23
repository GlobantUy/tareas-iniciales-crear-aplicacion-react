
import SimLoan from '../components/formSimLoan'
<style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
</style>


  const userLogin= ()=> {

    try {
      
    let btnHeader = document.querySelector(".btnHeader");
    let user = document.querySelector(".User");

      if (sessionStorage.getItem('Usuario-Values')){
        btnHeader.style.display= 'none';
        user.style.display= 'block';
      } else {
        btnHeader.style.display= 'block';
        user.style.display= 'none';
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
          <span>Nombre</span>
          <img className="imgUser" src="/Frame.png" />
        </div>

      </header>

      <SimLoan />
        <footer>

        </footer>
    </div>
  )
}
