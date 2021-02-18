import SimLogin from '../components/formLogin'
import React from "react";
import ReactTooltip from 'react-tooltip';

export default function Ingreso() {
  const [isTooltipVisible, setTooltipVisibility] = React.useState(false);
  React.useEffect(() => {
    setTooltipVisibility(true);
  }, []);
  return (
    <div className="App">
      {isTooltipVisible && <ReactTooltip id="error-ingreso"
        place="right"
        type="info"
        effect="solid"
        className="error-tooltip"
      >
      </ReactTooltip>}
      <div>
        <header className="header">
          <a href={process.env.RESTURL_FRONTEND}><img className="logoheader" src="/logo.png" /></a>
        </header>
        <SimLogin />

        <footer>
        </footer>
      </div>
    </div>

  )
}
