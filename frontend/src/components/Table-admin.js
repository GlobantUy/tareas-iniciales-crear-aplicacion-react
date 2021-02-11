import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { faThList } from '@fortawesome/free-solid-svg-icons';

let URLgetLoans = process.env.RESTURL_BACKEND + '/returnLoans';
let URLupdateLoan = process.env.RESTURL_BACKEND + '/updateLoan';
let prestamosCargados

class Tableadmin extends Component {

    constructor(props) {
        //since we are extending class Table so we have to use super in order to override Component class constructor
        super(props)
        this.handleClicked = this.handleClicked.bind(this);
        this.changeFilterDropdown = this.changeFilterDropdown.bind(this);
        this.changeStateDropdown = this.changeStateDropdown.bind(this);
        this.handleLimpiar = this.handleLimpiar.bind(this);
        //state is by default an object
        this.state = {
            estadocambiados: [],
            clientes: [{ userName: "",  amount: '', date: '', currency: '', payments: '', state: '' }],
            rowSelected: false,
            isAplicarDisabled: true,
            hidden: true,
            filtro: 'Todos'
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

   

    crearestado(state, index) {
        switch (state) {
            case undefined:
                return (<select id={'menutabla' + index} className="selectitem" onChange={(e) => this.changeStateDropdown(index)}>
                    <option value="option1" > Pendiente     </ option>
                    <option value="option2" > Rechazado     </ option>
                    <option value="option3" > Aprobado      </ option>
                </ select>)
                break
            case true:
                return (<label>Aprobado </label>)
                break
            case false:
                return (<label>Rechazado </label>)
                break

        }
    }

    handleLimpiar() {
        let email = JSON.parse(sessionStorage.getItem('Usuario-Values')).email;
        let filas = document.getElementsByTagName('tr')
        for (let i = 0; i < filas.length; i++) { filas[i].className = '' }
        const myLoans = axios.post(URLgetLoans, { "email": email }).then((resp) => {
            this.setState({
                clientes: resp.data.loans,
                hidden: true,
                isAplicarDisabled: true
            })
        }).catch((error) => {
            console.log(error);

        });
    }
    

    handleClicked() {
        let lista = this.state.estadocambiados
        let data = lista
        axios.post(URLupdateLoan, {
            data
        }).then(res => {
            this.getLoans()
            window.location.href = '/Tableadmin';
        }

        )

    }

    changeStateDropdown(index) {
        let listaclientes = this.state.clientes
        let dropdown = document.getElementById('menutabla' + index);
        let fila = document.getElementById(index.toString())
        if (dropdown.value != "option1") {
            let estado = (dropdown.value == "option2") ? false : true;
            listaclientes[index].state = estado
            let listacambiados = this.state.estadocambiados;
            let indice = listacambiados.findIndex(cliente => cliente.email == listaclientes[index].userEmail)
            indice === -1 ? listacambiados.push({ email: listaclientes[index].userEmail, state: estado }) : listacambiados[indice].state = estado
            this.setState({
                isAplicarDisabled: false,
                rowSelected: true,
                hidden: false,
                estadocambiados: listacambiados
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

    changeFilterDropdown() {
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


    renderTableData(Filtro) {
        return this.state.clientes.map((cliente, index) => {
            const { userName, amount, date, currency, payments, state} = cliente //destructuring
            if (state == Filtro || Filtro == 'Todos' ) {
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
            //this.getLoans();
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

                        <div className="Buttons">

                            <button className="btnSeptimo" hidden={this.state.hidden} onClick={this.handleLimpiar} > Limpiar</button>
                            <button type="submit" className="btnOctavo" disabled={this.state.isAplicarDisabled} onClick={this.handleClicked} > Aplicar cambios</button>
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
                        <select id='menufiltro' disabled  >
                            <option value="option1">  </ option>
                            <option value="option2">Aprobado  </option>
                            <option value="option3"> Rechazado </option>
                            <option value="opción4" >Pendiente  </ option>
                        </ select>
                    </div>
                    <div>
                        <img className="Tablet" src="/table.png" />
                        <p id="noDatos">No hay datos ingresados aún</p>
                    </div>
                </>
            )

        }
    }
}
export default Tableadmin
