import Header from '../components/Header';
import Tableadmin from '../components/Table-admin'

export default function Admin() {
  return (
    <div className='containertablas'>
      <Header />
      <div className="tablea">
        <Tableadmin />
      </div>
      <footer>
      </footer>
    </div>
  )
}
