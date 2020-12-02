import React, { Component } from 'react';


class Descuento extends Component {
    constructor(props) {
        super(props);
    }

    volverSimular=()=> {
       const ingresoValue = JSON.parse(localStorage.getItem('prestamoValues')).Ingreso;
       const montoValue = JSON.parse(localStorage.getItem('prestamoValues')).Monto_a_pedir;
        console.log('finfdifndifn')
    }

    render() {
        return (
            <div>
                <button onClick={this.volverSimular} type="submit" className="btnTerciario"> Volver a simular</button>
                <button type="submit" className="btnCuarto"> Solicitar préstamo</button>




            </div>
        )
    }
}
export default Descuento;