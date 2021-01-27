import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';


let Estado
let email
let URLupdateLoan = "https://backendmain-4npwjkmus.vercel.app/api/updateLoan"
let prestamosCargados
class Tableadmin extends Component {

    constructor(props) {
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
        this.handleClicked = this.handleClicked.bind(this);
        this.changeFilterDropdown = this.changeFilterDropdown.bind(this);
        this.changeStateDropdown = this.changeStateDropdown.bind(this);
        this.handleLimpiar = this.handleLimpiar.bind(this);
        this.state = { //state is by default an object

            estadocambiados: [],

            data : [],

            rowSelected: false,


            clientes: [{ Usuario: "", Montosolicitado: '', Fecha: '', Moneda: '', Cuotas: '', Estado: '' }],

            isAplicarDisabled: true,

            hidden: true,

            filtro: 'Todos'
        }
    }



    componentDidMount() {

        let listaclientes = JSON.parse(sessionStorage.getItem('prestamos')).map((cliente) => {
            0
            email = cliente.userEmail
            Estado = cliente.state
            console.log(email, Estado)
            return { Usuario: cliente.userName, Montosolicitado: cliente.amount, Fecha: cliente.date.substring(10, 0).split("-").reverse().join("-"), moneda: cliente.currency, Cuotas: cliente.payments, Estado: cliente.state }
        })

        prestamosCargados = JSON.parse(sessionStorage.getItem('prestamosNull'));


        this.setState({
            clientes: listaclientes


        })

    }

    crearestado(Estado, index) {
        switch (Estado) {
            default:
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
        let listaclientes = JSON.parse(sessionStorage.getItem('prestamos')).map((cliente) => {
            0
            return { Usuario: cliente.userName, Montosolicitado: cliente.amount, Fecha: cliente.date.substring(10, 0).split("-").reverse().join("-"), moneda: cliente.currency, Cuotas: cliente.payments, Estado: cliente.state }
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
        
            data = [email, Estado]
            axios.post(URLupdateLoan, {
            "data": data  
            }).then(res => {
          
             }
             
            )
                        
        }
    
    changeStateDropdown(index) {
        let listaclientes = this.state.clientes
        let dropdown = document.getElementById('menutabla' + index);
        let fila = document.getElementById(index.toString())
        if (dropdown.value != "option1") {
            listaclientes[index].Estado = (dropdown.value == "option2") ? false : true;
            let listacambiados = this.state.estadocambiados;
            listacambiados.push({ cliente: index, value: dropdown.value })
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
            const { Usuario, Montosolicitado, Fecha, moneda, Cuotas, Estado } = cliente //destructuring
            if (Estado == Filtro || Filtro == 'Todos') {
                return (
                    <tr id={index} key={index}>
                        <td className="celda">{Usuario}</td>
                        <td className="celda">{Montosolicitado}</td>
                        <td className="celda">{Fecha}</td>
                        <td className="celda">{moneda}</td>
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
                            <button type="submit" className="btnOctavo" disabled={this.state.isAplicarDisabled}  > Aplicar cambios</button>
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
                        <select id='menufiltro' onChange={this.changeFilterDropdown} >

                            <option value="option1"> Todos </ option>
                            <option value="option2">Aprobado  </ option>

                            <option value="option3"> Rechazado </ option>

                            <option value="opción4" >Pendiente  </ option>

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