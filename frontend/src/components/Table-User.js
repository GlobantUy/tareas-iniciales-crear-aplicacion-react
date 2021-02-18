import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import LoadingSpinner from './Spinner';

let URLgetLoans = process.env.RESTURL_BACKEND + '/returnLoans';

class TableUser extends Component {

    constructor(props) {
        super(props)

        this.state = {
            clientes: [{ userName: "", amount: '', date: '', currency: '', payments: '', state: '' }],
            filtro: 'Todos',
            loading: false,
            prestamosCargados: false
        }
    }

    crearestado(state, index) {
        switch (state) {
            case "pendiente":
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
                    filtro: "pendiente"
                })
                break
        }
    }

    getLoans() {
        let email = JSON.parse(sessionStorage.getItem('Usuario-Values')).email;
        const myLoans = axios.post(URLgetLoans, { "email": email }).then((resp) => {
            if (resp.data.loans == undefined) {
                this.setState({
                    prestamosCargados:true
                })
            } else {
                this.setState({
                    clientes: resp.data.loans.reverse(),
                    prestamosCargados:false
                })
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    componentDidMount() {
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
        if (this.state.clientes[0].state == undefined) {
            this.state.clientes[0].state = "pendiente"
        }
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
            } else if (key !== "_id" && key != "userEmail" && key != "stateDate" && key != "loanType") {
                return <th key={index}>{key}</th>
            }
        })
    }

    render() {
        const { loading } = this.state
        if (!this.state.prestamosCargados) {
            return (
                <div className="container">
                    { loading ? <LoadingSpinner /> : <div />}
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
                    { loading ? <LoadingSpinner /> : <div />}
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
