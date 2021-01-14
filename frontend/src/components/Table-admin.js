import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';



class Tableadmin extends Component {

    constructor(props) {
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
        this.handleChange = this.handleChange.bind(this);
        this.state = { //state is by default an object
            Ingreso: '',
            Monto_a_pedir: '',

            Moneda: '',

            financiacion: '',

            rowSelected: false,


            clientes: [{ Usuario: "", Montosolicitado: '', Fecha: '', Moneda: '', Cuotas: '', Estado: '' }],

            isAplicarDisabled: true,

            hidden: true
        }
    }

    componentDidMount() {
        prestamosCargados = JSON.parse(sessionStorage.getItem('prestamosNull'));
        let moneda = (JSON.parse(sessionStorage.getItem('prestamoValues')).Moneda_$U) ? "$U" : "U$S"
        let Año = (JSON.parse(sessionStorage.getItem('prestamoValues')).financiacion)
        let monto_a_pedir = parseInt((JSON.parse(sessionStorage.getItem('prestamoValues')).Monto_a_pedir))
        this.setState({

            clientes: [
                { Usuario: '', Montosolicitado: monto_a_pedir, Fecha: '', Moneda: moneda, Cuotas: 60, Estado: "" },
                { Usuario: '', Montosolicitado: monto_a_pedir, Fecha: '', Moneda: moneda, Cuotas: 120, Estado: "" },
                { Usuario: '', Montosolicitado: monto_a_pedir, Fecha: '', Moneda: moneda, Cuotas: 180, Estado: "" },
                { Usuario: '', Montosolicitado: monto_a_pedir, Fecha: '', Moneda: moneda, Cuotas: 240, Estado: "" }
            ],

            Ingreso: JSON.parse(sessionStorage.getItem('prestamoValues')).Ingreso,
            Monto_a_pedir: JSON.parse(sessionStorage.getItem('prestamoValues')).Monto_a_pedir,
            Moneda: moneda,
            financiacion: JSON.parse(sessionStorage.getItem('prestamoValues')).financiacion

        })
    }

    crearestado(Estado, index) {
        switch (Estado) {
            case "Pendiente":
                return (<select id={'menutabla' + index} className="selectitem" onChange={(e) => this.handleChange(index)}>


                    <option value="option1" > Pendiente     </ option>

                    <option value="option2" > Rechazado     </ option>

                    <option value="option3" > Aprobado      </ option>



                </ select>)
                break

            case "Aprobado":
                return (<label>Aprobado </label>)
                break
            case "Rechazado":
                return (<label>Rechazado </label>)
                break

        }
    }


    handleChange(index) {
        var dropdown = document.getElementById('menutabla' + index);
        console.log(dropdown.value)
        var fila = document.getElementById(index.toString())
        if (dropdown.value != "option1") {
            this.setState({
                isAplicarDisabled: false,
                rowSelected: true,
                hidden: false,
            });
            fila.className = 'selected';
        } else {
            this.setState({
                isAplicarDisabled: true,
                rowSelected: false,
                hidden: true,
            });
            fila.className = '';
        }
    }





    renderTableData() {
        return this.state.clientes.map((cliente, index) => {
            const { Usuario, Montosolicitado, Fecha, Moneda, Cuotas, Estado } = cliente //destructuring
            return (
                <tr id={index} key={Moneda}>
                    <td className="celda">{Usuario}</td>
                    <td className="celda">{Montosolicitado}</td>
                    <td className="celda">{Fecha}</td>
                    <td className="celda">{Moneda}</td>
                    <td className="celda">{Cuotas}</td>
                    <td className="celda">
                        {this.crearestado(Estado, index)}
                    </td>
                </tr>
            )
        })
    }

    renderTableHeader() {
        let header = Object.keys(this.state.clientes[0])
        return header.map((key, index) => {
            if (key == "Montosolicitado") {
                return <th key={index}>{"Monto solicitado"}</th>
            } else {
                return <th key={index}>{key}</th>
            }

        })
    }

    render() {
        if(prestamosCargados) {
        return (
            <div className="container">
                <h2 id='titulo'>Solicitudes de préstamo</h2>
                <h2 id='Filtro'>Filtro por estado </h2>
                <select id='nombredelmenuu' >

                    <option value="option4"> Todos </ option>
                    <option value="option1">Aprobado  </ option>

                    <option value="option2"> Rechazado </ option>

                    <option value="opción3" >Pendiente  </ option>

                </select>
                <div>
                    <table id='Administrador'>
                        <tbody>
                            <tr>{this.renderTableHeader()}</tr>
                            {this.renderTableData()}
                        </tbody>
                    </table>
    
                <div className="Buttons">

                    <button type="submit" className="btnSeptimo" hidden={this.state.hidden}  > Limpiar</button>
                    <button type="submit" className="btnOctavo" disabled={this.state.isAplicarDisabled} > Aplicar cambios</button>
                </div>
            </div> 
        </div> 
            )
        } else {
            return (
                <>
                <div className="container">
                    <h2 id='titulo'>Solicitudes de préstamo</h2>
                    <h2 id='Filtro'>Filtro por estado </h2>
                    <select id='nombredelmenuu' >

                        <option value="option4"> Todos </ option>
                        <option value="option1">Aprobado  </ option>

                        <option value="option2"> Rechazado </ option>

                        <option value="opción3" >Pendiente  </ option>

                    </ select>
                    </div>
                    <div>
                    <img className="Tablet" src="/table.png" />
                    <p className="noDatos">No hay datos ingresados aún</p>
                    </div>
                    </>
            )

        }
    }
}
export default Tableadmin