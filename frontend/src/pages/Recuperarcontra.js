import Header from '../components/Header';
import RecuperarContra from '../components/forgotPass';
import React from "react";
import ReactTooltip from 'react-tooltip';

export default function User() {
    const [isTooltipVisible, setTooltipVisibility] = React.useState(false);
  React.useEffect(() => {
    setTooltipVisibility(true);
  }, []);
    return (
        <div >
            <div className="App">
                {isTooltipVisible && <ReactTooltip id="error-forgotpass"
                    place="bottom"
                    type="dark"
                    effect="solid"
                    className="error-tooltip"
                >
                </ReactTooltip>}
            </div>
            <Header />
            <RecuperarContra />
            <footer>
            </footer>
        </div>
    )
}