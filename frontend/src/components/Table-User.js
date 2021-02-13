import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

let URLreturnpres = process.env.RESTURL_BACKEND + '/returnLoans'
let URLgetLoans = process.env.RESTURL_BACKEND + '/returnLoans';
let prestamosCargados

class TableUser extends Component {

    constructor(props) {
        super(props)

        this.state = {
            clientes: [{ userName: "", amount: '', date: '', currency: '', payments: '', state: '' }],
            filtro: 'Todos'
        }
    }

    crearestado(state, index) {
        switch (state) {
            case undefined:
                return (<label> Pendiente </label>)
                break
            case true:
                return (<label>Aprobado </label>)
                break
            case false:
                return (<label>Rechazado </label>)
                break
        }
    }

    changeFilterDropdown = () => {
        let dropdown = document.getElementById('menufiltro');
        switch (dropdown.value) {
            case 'option1':
                this.setState({
                    filtro: 'Todos'
                })
                break

            case 'option2':
                this.setState({
                    filtro: true
                })
                break
            case 'option3':
                this.setState({
                    filtro: false
                })
                break
            default:
                this.setState({
                    filtro: undefined
                })
                break
        }
    }

    getLoans() {
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
        let email = JSON.parse(sessionStorage.getItem('Usuario-Values')).email;
        axios.post(URLreturnpres, {
            "email": email
        }).then(res => {
            console.log(res.data.loans)
            if (res.data.loans == undefined) {
                prestamosCargados = true
            } else {
                prestamosCargados = false
            }
        })
        this.getLoans()
    }

    renderTableData(Filtro) {
        return this.state.clientes.map((cliente, index) => {
            const { userName, amount, date, currency, payments, state } = cliente //destructuring
            if (state == Filtro || Filtro == 'Todos') {
                return (
                    <tr id={index} key={index}>
                        <td className="celda">{userName}</td>
                        <td className="celda">{amount}</td>
                        <td className="celda">{date.substring(10, 0).split("-").reverse().join("-")}</td>
                        <td className="celda">{currency}</td>
                        <td className="celda">{payments}</td>
                        <td className="celda">
                            {this.crearestado(state, index)}
                        </td>
                    </tr>
                )
            }
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
                    <h2 id='Filtro'>Filtro por estado </h2>
                    <select id='menufiltro' onChange={this.changeFilterDropdown} >
                        <option value="option1"> Todos </ option>
                        <option value="option2">Aprobado  </ option>
                        <option value="option3"> Rechazado </ option>
                        <option value="opción4" >Pendiente  </ option>
                    </select>
                    <div>
                        <table id='Administrador'>
                            <tbody>
                                <tr>{this.renderTableHeader()}</tr>
                                {this.renderTableData(this.state.filtro)}
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
