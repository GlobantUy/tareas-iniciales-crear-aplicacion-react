import SimLoan from '../components/formSimLoan'
import Header from '../components/Header'
import React from "react";
import ReactTooltip from 'react-tooltip';

export default function Home() {
  const [isTooltipVisible, setTooltipVisibility] = React.useState(false);
  React.useEffect(() => {
    setTooltipVisibility(true);
  }, []);
  try {
    let rol = JSON.parse(sessionStorage.getItem('Usuario-Values')).role;
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
          <div className="App">
            {isTooltipVisible && <ReactTooltip id="error-sim"
              place="right"
              type="dark"
              effect="solid"
              className="error-tooltip"
            >
            </ReactTooltip>}
            <div>
              <Header />
              <SimLoan />
              <footer>
              </footer>
            </div>
          </div>
        )
        break;
      default:
        return (
          <div className="App">
            {isTooltipVisible && <ReactTooltip id="error-sim"
              place="right"
              type="dark"
              effect="solid"
              className="error-tooltip"
            >
            </ReactTooltip>}
            <div>
              <Header />
              <SimLoan />
              <footer>
              </footer>
            </div>
          </div>
        )
        break;
    }

  } catch (error) {
    return (
      <div className="App">
        {isTooltipVisible && <ReactTooltip id="error-sim"
          place="right"
          type="dark"
          effect="solid"
          className="error-tooltip"
        >
        </ReactTooltip>}
        <div>
          <Header />
          <SimLoan />
          <footer>
          </footer>
        </div>
      </div>
    )
  }
}
