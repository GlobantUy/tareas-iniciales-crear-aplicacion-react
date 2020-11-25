import React, { Component } from 'react';
import axios from 'axios';

class Descuento extends Component {
    render() {
        return (
            <div>
                <div className="form">

                    <form onSubmit={this.handleSumbit}>
                        <button type="submit" className="btnTerciario"> Volver a simular</button>
                  
                        <button type="submit" className="btnCuarto"> Solicitar préstamo</button>

                    </form>
                </div>
            </div>
        )
    }
}
export default Descuento;