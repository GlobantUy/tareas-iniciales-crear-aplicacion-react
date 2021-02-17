import SimLogin from '../components/formLogin'
import React from "react";


export default function Ingreso() {
  const [isTooltipVisible, setTooltipVisibility] = React.useState(false);

  React.useEffect(() => {
    setTooltipVisibility(true);
  }, []);
  return (
    <div className="ingreso">
      {isTooltipVisible && <div>tooltip component</div>}
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
