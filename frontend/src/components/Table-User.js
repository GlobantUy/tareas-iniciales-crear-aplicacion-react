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
            clientes: [{ Usuario: "", Montosolicitado: '', Fecha: '', Moneda: '', Cuotas: '' }],
        }
    }

    getLoans() {
        // data = [email, Estado]
        const myLoans = axios.post(URLgetLoans, { "email": email }).then((resp) => {
            console.log(email);
            console.log(resp);
            return resp.data.loans;

        }).catch((error) => {
            console.log(error);
        });

        /*return { Usuario: cliente.userName, Montosolicitado: cliente.amount, Fecha: cliente.date.substring(10, 0).split("-").reverse().join("-"), Moneda: cliente.currency, Cuotas: cliente.payments, Estado: cliente.state }*/
    }

    componentDidMount() {

        
        try{
            let listaclientes = JSON.parse(sessionStorage.getItem('prestamos')).map((cliente) => {
                0
                email = cliente.userEmail
                let clientes = this.getLoans()
                console.log(clientes)
                console.log(email)
                return { Usuario: cliente.userName, Montosolicitado: cliente.amount, Fecha: cliente.date.substring(10, 0).split("-").reverse().join("-"), Moneda: cliente.currency, Cuotas: cliente.payments }
            });
            prestamosCargados = JSON.parse(sessionStorage.getItem('prestamosNull'));
            this.setState({
                clientes: listaclientes
            })
        }catch{
            prestamosCargados = JSON.parse(sessionStorage.getItem('prestamosNull'));
        }

    }

    renderTableData() {
        return this.state.clientes.map((cliente, index) => {
            const { Usuario, Montosolicitado, Fecha, Moneda, Cuotas } = cliente //destructuring
            return (
                <tr id={index} key={index}>
                    <td className="celda">{Usuario}</td>
                    <td className="celda">{Montosolicitado}</td>
                    <td className="celda">{Fecha}</td>
                    <td className="celda">{Moneda}</td>
                    <td className="celda">{Cuotas}</td>
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
        if (prestamosCargados == false) {
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
