import Table from '../components/Table'
import User from '../components/User'
import Tableadmin from '../components/Table-admin'

export default function Admin() {
    return (
      <div >
        <User/>
        <div className="tablea">
        <Tableadmin/>
        </div>
        <footer>
        </footer>
      </div>
    )
  }