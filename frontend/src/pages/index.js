import SimLoan from '../components/formSimLoan'
import Header from '../components/Header'

export default function Home() {

  try {
    let rol= JSON.parse(sessionStorage.getItem('Usuario-Values')).role;
    switch (rol) {
      case 'ADMIN':
        console.log('admin catch')
        return (
          <div>
            <Header />
              <h2 className='admin-text'>Bienvenido Administrador</h2>    
            <footer>
      
            </footer>
          </div>
        )
        break;
      case 'CUSTOMER':
        console.log('customer catch')
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
        console.log('default catch')
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
    console.log('error catch')
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
