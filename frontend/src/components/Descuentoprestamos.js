import React, { Component } from 'react';


class Descuento extends Component {
    constructor(props) {
        super(props);
    }

    volverSimular=()=> {
        sessionStorage.setItem('volverBoton', true);
        window.location.href = 'http://localhost:3000'
    
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