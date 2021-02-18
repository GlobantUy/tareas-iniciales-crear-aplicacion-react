import Header from '../components/Header';
import RegisterContent from '../components/Register'
import React from "react";
import ReactTooltip from 'react-tooltip';

export default function Registro() {
  const [isTooltipVisible, setTooltipVisibility] = React.useState(false);
  React.useEffect(() => {
    setTooltipVisibility(true);
  }, []);
  return (

    <div className="App">
      {isTooltipVisible && <ReactTooltip id="error-registro"
        place="bottom"
        type="warning"
        effect="solid"
        className="error-tooltip"
      >
      </ReactTooltip>}
      <div >
        <Header />
        <RegisterContent />
        <footer>
        </footer>
      </div>
    </div>
  )
}
