import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

let URLgetLoans = process.env.RESTURL_BACKEND + '/returnLoans';
let email
let prestamosCargados

class TableUser extends Component {

    constructor(props) {
        super(props)

        this.state = {
            clientes: [{userName: "",  amount: '', date: '', currency: '', payments: '' }],
        }
    }

    getLoans(){
        let email = JSON.parse(sessionStorage.getItem('Usuario-Values')).email;
        const myLoans = axios.post(URLgetLoans, { "email": email }).then((resp) => {
            this.setState({
                clientes: resp.data.loans
            })
        }).catch((error) => {
            console.log(error);

        });
    }

    componentDidMount() {
        prestamosCargados = JSON.parse(sessionStorage.getItem('prestamosNull'));
        this.getLoans()
    }

    renderTableData() {
        return this.state.clientes.map((cliente, index) => {
            const { userName, amount, date, currency, payments} = cliente //destructuring
                return (
                    <tr id={index} key={index}>
                        <td className="celda">{userName}</td>
                        <td className="celda">{amount}</td>
                        <td className="celda">{date.substring(10, 0).split("-").reverse().join("-")}</td>
                        <td className="celda">{currency}</td>
                        <td className="celda">{payments}</td>
                    </tr>
                )
        })
    }

    renderTableHeader() {
        let header = Object.keys(this.state.clientes[0])
        return header.map((key, index) => {
            if (key == "userName")
                return <th key={index}>{"Usuario"}</th>
            if (key == "amount")
                return <th key={index}>{"Monto solicitado"}</th>
            if (key == "date")
                return <th key={index}>{"Fecha"}</th>
            if (key == "currency")
                return <th key={index}>{"Moneda"}</th>
            if (key == "state")
                return <th key={index}>{"Estado"}</th>
            if (key == "payments") {
                return <th key={index}>{"Cuotas"}</th>
            } else if (key !== "_id" && key != "userEmail" && key != "stateDate") {
                return <th key={index}>{key}</th>
            }
        })
    }

    render() {
        if (!prestamosCargados) {
            return (
                <div className="container">
                    <h2 id='titulo'>Solicitudes de préstamo</h2>
                    <div>
                        <table id='Administrador'>
                            <tbody>
                                <tr>{this.renderTableHeader()}</tr>
                                {this.renderTableData()}
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        } else {
            return (
                <>
                    <div className="container">
                        <h2 id='titulo'>Solicitudes de préstamo</h2>
                    </div>
                    <div>
                        <img className="Tablet" src="/table.png" />
                        <p id="noDatos">No has solicitado un prestamo aún</p>
                    </div>
                </>
            )
        }
    }
}
export default TableUser
