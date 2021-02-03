import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';


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
            data : [],
            rowSelected: false,
            clientes: [{ Usuario: "", Montosolicitado: '', Fecha: '', Moneda: '', Cuotas: '', Estado: '' }],
            isAplicarDisabled: true,
            hidden: true,
            filtro: 'Todos'
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

        let clientes = this.getLoans()
        console.log(clientes);
        let listaclientes = JSON.parse(sessionStorage.getItem('prestamos')).map((cliente) => {
    
            return { Usuario: cliente.userName, Montosolicitado: cliente.amount, Fecha: cliente.date.substring(10, 0).split("-").reverse().join("-"), Moneda: cliente.currency, Cuotas: cliente.payments, Estado: cliente.state }
        });
        prestamosCargados = JSON.parse(sessionStorage.getItem('prestamosNull'));
        this.setState({
            clientes: listaclientes
        })
    }

    crearestado(Estado, index) {
        switch (Estado) {
            default:
                return (<select id={'menutabla' + index} className="selectitem" onChange={(e) => this.changeStateDropdown(index)}>
                    <option value="option1" > Pendiente</ option>
                    <option value="option2" > Rechazado</ option>
                    <option value="option3" > Aprobado</ option>
                </ select>);
                break
            case false:
                return (<select id={'menutabla' + index} className="selectitem" onChange={(e) => this.changeStateDropdown(index)}>
                    <option value="option1" > Pendiente</ option>
                    <option value="option2" selected="selected"> Rechazado</ option>
                    <option value="option3" > Aprobado</ option>
                </ select>);
                break
            case true:
                return (<select id={'menutabla' + index} className="selectitem" onChange={(e) => this.changeStateDropdown(index)}>
                    <option value="option1" > Pendiente</ option>
                    <option value="option2" > Rechazado</ option>
                    <option value="option3" selected="selected" > Aprobado</ option>
                </ select>);
                break
        }
    }

    handleLimpiar() {
        // let listaclientes = this.getLoans();
        let listaclientes = JSON.parse(sessionStorage.getItem('prestamos')).map((cliente) => {
            0
            return { Usuario: cliente.userName, Montosolicitado: cliente.amount, Fecha: cliente.date.substring(10, 0).split("-").reverse().join("-"), Moneda: cliente.currency, Cuotas: cliente.payments, Estado: cliente.state }
        })
        let filas = document.getElementsByTagName('tr')

        for (let i = 0; i < filas.length; i++) { filas[i].className = '' }
        this.setState({
            clientes: listaclientes,
            hidden: true,
            isAplicarDisabled: true

        });
    }

    handleClicked() {
        let lista = this.state.estadocambiados
        let data = lista
        axios.post(URLupdateLoan, {
            data
        }).then(res => {
          this.getLoans()
          location.reload()
        }

        )

    }
    
    changeStateDropdown(index) {
        let listaclientes = this.state.clientes
        let dropdown = document.getElementById('menutabla' + index);
        let fila = document.getElementById(index.toString())
        if (dropdown.value != "option1") {
            let estado = (dropdown.value == "option2") ? false : true;
            listaclientes[index].Estado = estado
            let listacambiados = this.state.estadocambiados;
            let indice = listacambiados.findIndex(cliente => cliente.email == listaclientes[index].Email) 
            indice === -1 ? listacambiados.push({ email: listaclientes[index].Email, state: estado }) : listacambiados[indice].state = estado 
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
            const { Usuario, Montosolicitado, Fecha, Moneda, Cuotas, Estado } = cliente //destructuring
            if (Estado == Filtro || Filtro == 'Todos') {
                return (
                    <tr id={index} key={index}>
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
            }
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
            this.getLoans();
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
