import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';


class Tableadmin extends Component {

    constructor(props) {
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
        this.handleSubmitClicked = this.handleSubmitClicked.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = { //state is by default an object
            Ingreso: '',
            Monto_a_pedir: '',

            Moneda: '',

            financiacion: '',

            rowSelected: false,


            clientes: [{ checkbox: "", Usuario: "", Montosolicitado: '', Fecha: '', Moneda: '', Cuotas: '', Estado: '' }],

            isDisabled: true,
            
            hidden:false
        }
    }

    componentDidMount() {
        let moneda = (JSON.parse(sessionStorage.getItem('prestamoValues')).Moneda_$U) ? "$U" : "U$S"
        let Año = (JSON.parse(sessionStorage.getItem('prestamoValues')).financiacion)
        let monto_a_pedir = parseInt((JSON.parse(sessionStorage.getItem('prestamoValues')).Monto_a_pedir))
        this.setState({

            clientes: [
                { "": "", Usuario: '10%', Montosolicitado: monto_a_pedir, Fecha: 60, Moneda: moneda, Cuotas: 60, Estado: "" },
                { "": "", Usuario: '15%', Montosolicitado: monto_a_pedir, Fecha: 120, Moneda: moneda, Cuotas: 120, Estado: "" },
                { "": "", Usuario: '18%', Montosolicitado: monto_a_pedir, Fecha: 180, Moneda: moneda, Cuotas: 180, Estado: "" },
                { "": "", Usuario: '20%', Montosolicitado: monto_a_pedir, Fecha: 240, Moneda: moneda, Cuotas: 240, Estado: "" }
            ],

            Ingreso: JSON.parse(sessionStorage.getItem('prestamoValues')).Ingreso,
            Monto_a_pedir: JSON.parse(sessionStorage.getItem('prestamoValues')).Monto_a_pedir,
            Moneda: moneda,
            financiacion: JSON.parse(sessionStorage.getItem('prestamoValues')).financiacion

        })
    }

    handleSubmitClicked(index) {
        let element = document.getElementById(index.toString())
        if (this.state.rowSelected == false) {
            element.className += 'selected';
            this.setState({
                isDisabled: false,
                rowSelected: true,
                hidden:false

            });

        } else {
            if (element.className != '') {
                element.className = ''
                this.setState({
                    isDisabled: true,
                    rowSelected: false,
                    hidden:true
                });
            }
        }
    }

    handleChange(checked) {
        this.setState({ checked });
      }
   
    renderTableData() {
        return this.state.clientes.map((cliente, index) => {
            const { Usuario, Montosolicitado, Fecha, Moneda, Cuotas } = cliente //destructuring
            return (
                <tr id={index} key={Moneda}>
                    <td> <input type="checkbox" onClick={(() => this.handleSubmitClicked(index))} />&nbsp;</td>
                    <td className="celda">{Usuario}</td>
                    <td className="celda">{Montosolicitado}</td>
                    <td className="celda">{Fecha}</td>
                    <td className="celda">{Moneda}</td>
                    <td className="celda">{Cuotas}</td>
                    <td>  <select name="nombredelmenu">

                        <option value="option1"> Opción 1 </ option>

                        <option value="option2" selected="selected"> Opción 2 </ option>

                        <option value="opción3"> Opción 3 </ option>

                    </ select> </td>
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
        return (
            <div className="container">
                <h2 id='titulo'>Solicitudes de préstamo</h2>
                <h2 id='Filtro'>Filtro por estado</h2>
                <select id='nombredelmenuu' >

                    <option value="">   </option>
                    <option value="option1">Aprobado  </ option>

                    <option value="option2" > Rechazado </ option>

                    <option value="opción3">Pendiente  </ option>

                    <option value="opción4"> Todos </ option>


                </ select>
                <div>
                    <table id='Administrador'>
                        <tbody>
                            <tr>{this.renderTableHeader()}</tr>
                            {this.renderTableData()}
                        </tbody>
                    </table>
                </div>
                <div className="Buttons">
                    <button type="submit" className="btnSeptimo"   hidden={this.state.hidden}> Limpiar</button>
                    <button type="submit" className="btnOctavo" disabled={this.state.isDisabled} > Aplicar cambios</button>
                </div>

            </div>
        )
    }
}

export default Tableadmin