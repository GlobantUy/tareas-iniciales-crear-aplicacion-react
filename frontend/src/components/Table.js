import React, { Component } from 'react';


class Table extends Component {
    constructor(props) {
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
        this.state = { //state is by default an object
            clientes: [
                { Moneda: '$U', Tasa: '15%', Cuotas: 60, Años: 5, ValorCuota: 23.000 },
                { Moneda: '$U', Tasa: '15%', Cuotas: 120, Años: 1, ValorCuota: 18.000 },
                { Moneda: '$U', Tasa: '15%', Cuotas: 180, Años: 15, ValorCuota: 16.000 },
                { Moneda: '$U', Tasa: '15%', Cuotas: 240, Años: 20, ValorCuota: 13.000 },
                { Moneda: '$U', Tasa: '15%', Cuotas: 300, Años: 25, ValorCuota: 11.000 }
            ]
        }
    }

    handleSubmitClicked() {
        this.setState({
          isDisabled: true
        });
 } 

    renderTableData() {
        return this.state.clientes.map((cliente, index) => {
            const { Moneda, Tasa, Cuotas, Años, ValorCuota } = cliente //destructuring
            return (
                <tr key={Moneda}>
                    <td className="celda">{Moneda}</td>
                    <td className="celda">{Tasa}</td>
                    <td className="celda">{Cuotas}</td>
                    <td className="celda">{Años}</td>
                    <td className="celda">{ValorCuota}</td>
                </tr>
            )
        })
    }


  
    renderTableHeader() {
        let header = Object.keys(this.state.clientes[0])
        return header.map((key, index) => 
            {if(key=="ValorCuota"){
                return <th key={index}>{"Valor Cuota"}</th>
            } else {
                return <th key={index}>{key}</th>
            }

        })
    }

    volverSimular=()=> {
        sessionStorage.setItem('volverBoton', true);
        window.location.href = 'http://localhost:3000'
    
    }


    render() {
        return (
            <div className="container">
                <h1 id='title'>Resultado de préstamo</h1>
                <h1 id='ingresos'>Ingresos $U 107.500</h1>
                <h1 id='Monto'>Monto Solicitado  $U 105.000 </h1>
                <h1 id='seleccionar'>Seleccione la fila deseada para solicitar su préstamo</h1>
                <div>
                    <table id='clientes'>
                        <tbody>

                            <tr>{this.renderTableHeader()}</tr>
                            {this.renderTableData()}

                        </tbody>
                    </table>
                </div>
                <div className="Buttons">
                <button onClick={this.volverSimular} type="submit" className="btnTerciario"> Volver a simular</button>


                    <button type="submit" className="btnCuarto"   > Solicitar préstamo</button>

                    
                </div>
            </div>
        )
    }
}
export default Table;


//disabled={!this.isDisabled}   onClick={this.state.handleChange}//