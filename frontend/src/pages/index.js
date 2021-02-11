import SimLoan from '../components/formSimLoan'
import Header from '../components/Header'

export default function Home() {

  try {
    let rol= JSON.parse(sessionStorage.getItem('Usuario-Values')).role;
    switch (rol) {
      case 'ADMIN':
        return (
          <div>
            <Header />
              <h2 className='admin-text'>Bienvenido Administrador.</h2>    
            <footer>
      
            </footer>
          </div>
        )
        break;
      case 'CUSTOMER':
        return (
          <div>
            <Header />
            <SimLoan />
      
            <footer>
      
            </footer>
          </div>
        )        
        break;
      default:
        return (
          <div>
            <Header />
            <SimLoan />
      
            <footer>
      
            </footer>
          </div>
        )
        break;
    }
   
  } catch (error) {
    return (
      <div>
        <Header />
        <SimLoan />
  
        <footer>
  
        </footer>
      </div>
      
    )
  }
}
