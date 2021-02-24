import React, { Children, Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Modal, ModalHeader, ModalBody} from 'reactstrap';
import axios from 'axios';
import LoadingSpinner from './Spinner';

let emailFromStorage
let monedaPost
let cuotasPost
let tipoPrestamo = new Array()
let monto_a_pedir
let URL = process.env.RESTURL_BACKEND + '/storeLoan'
class Table extends Component {
    
    //popup usuario logueado//
    state = {
        abierto: false,
        abierto2: false,
        abierto3: false,
        abierto4: false,
        
    }

    volverAceptarPres = () => {
        sessionStorage.setItem('volverAceptarpress', true);
    }

    abrirModal = () => {
        const emailCargado = JSON.parse(sessionStorage.getItem('Usuario-Values'));
        if (emailCargado) {
            this.setState({ abierto: !this.state.abierto });
        } else {
            this.setState({ abierto3: !this.state.abierto3 });
        }
    }
    guardarTipo =( value , type) =>{
        
        if (value == true) {
            tipoPrestamo.push(type)
        } else {
            return false
        }
     
    }

    abrirModal2 = () => {   
        emailFromStorage = JSON.parse(sessionStorage.getItem('Usuario-Values')).email
        let automotor = JSON.parse(sessionStorage.getItem('prestamoValues')).TipoDePrestamoAutomotor
        let inmueble = JSON.parse(sessionStorage.getItem('prestamoValues')).TipoDePrestamoInmueble
        let otros = JSON.parse(sessionStorage.getItem('prestamoValues')).TipoDePrestamoOtros
        this.guardarTipo(inmueble,'Inmuebles')
        this.guardarTipo(otros,'Otros')
        this.guardarTipo(automotor,'Automotor')
        axios.post(URL, {
            'email': emailFromStorage,
            'amount': monto_a_pedir,
            'currency': monedaPost,
            'payments': cuotasPost,
            'loanType': tipoPrestamo
        }
        )
            .then(Response => {
                if (Response.data.message == 'The user already has a loan pending approval.') {
                    this.setState({ abierto4: !this.state.abierto4 });
                } else {
                    this.setState({ abierto2: !this.state.abierto2 });
                }
            })
            .catch(error => {
                console.log("registration error", error)
            });
            tipoPrestamo = [];
    }

    showSpinner = () =>{
        this.setState({
            loading: true
        })
    }

    cerrarModal = () => {
        this.setState({ abierto: !this.state.abierto });
    }

    cerrarModal3 = () => {
        this.setState({ abierto3: !this.state.abierto3 });
    }
    cerrarModals = () => {
        this.setState({
            abierto: false,
            abierto2: false,
            abierto3: false,
            abierto4: false
        });
    }

    abrirTableuser = () => {
        this.setState({
            loading: true,
            abierto: false,
            abierto2: false,
            abierto3: false,
            abierto4: false
        });
        window.location.href = '/Tableuser'
    }
    constructor(props) {
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
        this.handleSubmitClicked = this.handleSubmitClicked.bind(this);
        this.state = {
            loading: false,
        }
        this.state = { //state is by default an object
            Ingreso: '',
            Monto_a_pedir: '',
            Moneda: '',
            financiacion: '',
            rowSelected: false,
            clientes: [{ Moneda: '', Tasa: '', Cuotas: '', Plazo: '', ValorCuota: '' }],
            isDisabled: true,
            tipoPrestamo: [],
        }
    }

    showSpinner = () =>{
        this.setState({
            abierto3: false,    
            loading: true  
        })
    }

    getTipoPrestamos() {
        let printTipo = ''
        const myTipos = [ { name: "Automotor", value: JSON.parse(sessionStorage.getItem('prestamoValues')).TipoDePrestamoAutomotor },
                          { name: "Inmuebles", value: JSON.parse(sessionStorage.getItem('prestamoValues')).TipoDePrestamoInmueble },
                          { name: "Otros", value: JSON.parse(sessionStorage.getItem('prestamoValues')).TipoDePrestamoOtros } ];
        myTipos.forEach(element => {
            if(element.value === true){

               printTipo = printTipo +  element.name + ', '
            }
        })
        return printTipo.slice(0, printTipo.length - 2);
    }
    
    componentDidMount() {
        let moneda = (JSON.parse(sessionStorage.getItem('prestamoValues')).Moneda_$U) ? "$U" : "U$S"
        monto_a_pedir = parseInt((JSON.parse(sessionStorage.getItem('prestamoValues')).Monto_a_pedir))
        
        this.setState({

            clientes: [
                { Moneda: moneda, Tasa: '10%', Cuotas: 60, Plazo: 5, ValorCuota: this.valorCouta(monto_a_pedir, 0.1, 60) },
                { Moneda: moneda, Tasa: '15%', Cuotas: 120, Plazo: 10, ValorCuota: this.valorCouta(monto_a_pedir, 0.15, 120) },
                { Moneda: moneda, Tasa: '18%', Cuotas: 180, Plazo: 15, ValorCuota: this.valorCouta(monto_a_pedir, 0.18, 180) },
                { Moneda: moneda, Tasa: '20%', Cuotas: 240, Plazo: 20, ValorCuota: this.valorCouta(monto_a_pedir, 0.2, 240) },
                { Moneda: moneda, Tasa: '25%', Cuotas: 300, Plazo: 25, ValorCuota: this.valorCouta(monto_a_pedir, 0.25, 300) }
            ],

            Ingreso: JSON.parse(sessionStorage.getItem('prestamoValues')).Ingreso,
            Monto_a_pedir: JSON.parse(sessionStorage.getItem('prestamoValues')).Monto_a_pedir,
            Moneda: moneda,
            financiacion: JSON.parse(sessionStorage.getItem('prestamoValues')).financiacion,
            tipoPrestamo: this.getTipoPrestamos()

        })
    }

    handleSubmitClicked(index) {
        let element = document.getElementById(index.toString())
        if (this.state.rowSelected == false) {
            element.className += 'selected';
            this.setState({
                isDisabled: false,
                rowSelected: true
            });
            this.getValuesTable(element);

        } else {
            if (element.className != '') {
                element.className = ''
                this.setState({
                    isDisabled: true,
                    rowSelected: false
                });
            }
        }
    }

    getValuesTable(element) {
        if (element.hasChildNodes()) {
            var children = element.childNodes;
            for (var i = 0; i < children.length; i++) {
                monedaPost = children[0].innerHTML;
                cuotasPost = children[2].innerHTML;
            }
        }
    }

    volverSimular = () => {
        sessionStorage.setItem('volverBoton', true);
        window.location.href = process.env.RESTURL_FRONTEND;

    }

    valorCouta = (monto_a_pedir, porcentaje, cant_cuotas) => {
        const total_con_interes = monto_a_pedir + (monto_a_pedir * porcentaje);

        let cuota = total_con_interes / cant_cuotas;

        return cuota.toFixed(3);
    }

    renderTableData() {
        return this.state.clientes.map((cliente, index) => {
            const { Moneda, Tasa, Cuotas, Plazo, ValorCuota } = cliente //destructuring
            return (
                <tr id={index} onClick={(() => this.handleSubmitClicked(index))} key={index}>
                    <td className="celda">{Moneda}</td>
                    <td className="celda">{Tasa}</td>
                    <td className="celda">{Cuotas}</td>
                    <td className="celda">{Plazo}</td>
                    <td className="celda">{ValorCuota}</td>
                </tr>
            )
        })
    }

    renderTableHeader() {
        let header = Object.keys(this.state.clientes[0])
        return header.map((key, index) => {
            if (key == "ValorCuota") {
                return <th key={index}>{"Valor Cuota"}</th>
            } else { 
                return <th key={index}>{key}</th>
            }

        })
    }

    volverSimular = () => {
        sessionStorage.setItem('volverBoton', true);
        this.showSpinner();
        window.location.href = process.env.RESTURL_FRONTEND;

    }

    volverInicio = () => {
        this.setState({
            loading: true,
            abierto4: false,
            abierto: false,
            abierto2: false,
            abierto3: false,
        })
    }

    render() {
        const { loading } = this.state
        return (
            <div className="container">
                { loading ? <LoadingSpinner/> : <div />}
                <h2 id='titleee'>Resultado de préstamo</h2>
                <h1 id='ingresos'>  Ingresos </h1>
                <h1 id='ingresoss'> {this.state.Moneda + this.state.Ingreso} </h1>
                <h1 id='Monto' >  Monto solicitado </h1>
                <h1 id='Montoss'> {this.state.Moneda + this.state.Monto_a_pedir} </h1>
                <h1 id='TipoPrestamo' >  Motivo del Préstamo </h1>
                <h1 id='TipoPrestamoss'> {this.state.tipoPrestamo} </h1>
                <h2 id='seleccionar'>Seleccione la fila deseada para solicitar su préstamo</h2>
                <div className="table-responsive-">
                    <table id='clientes'>
                        <tbody>
                            <tr>{this.renderTableHeader()}</tr>
                            {this.renderTableData()}
                        </tbody>
                    </table>
                </div>

                <div className="Buttons">
                    <button onClick={this.volverSimular} type="submit" className="btnTerciario"> Volver a simular</button>
                    <button type="submit" className="btnCuarto" disabled={this.state.isDisabled} onClick={this.abrirModal}> Solicitar préstamo</button>
                </div>

                <Modal isOpen={this.state.abierto} className='modalStyles'>
                     <img onClick={this.cerrarModals} className='close-icon' src='./close.png'></img>
                     <h3 className='tittle'>Confirmar préstamo</h3>
                    <p className='text'>Préstamo valor {this.state.Moneda + this.state.Monto_a_pedir + " en " + cuotasPost} cuotas</p>
                    <Button id="btnCancelar" onClick={this.cerrarModal}>Cancelar</Button>
                    <Button id="btnSolicitar" onClick={this.abrirModal2}>Solicitar</Button>
                </Modal>

                <Modal isOpen={this.state.abierto2} className='modalStyles'>
                <img onClick={this.cerrarModals} className='close-icon' src='./close.png'></img>
                    <p className='textModal2'>Su préstamo ha sido registrado exitosamente <br></br> y se encuentra pendiente de aprobación</p>
                    <a href={process.env.RESTURL_FRONTEND} target="_self" onClick ={this.volverInicio}><Button id="btnVolver">Volver al inicio</Button></a>
                </Modal>

                <Modal isOpen={this.state.abierto4} className='modalStyles' id='modalPendiente'>
                <img onClick={this.cerrarModals} className='close-icon' src='./close.png'></img>
                    <p className='textModal2'>Ya tienes un préstamo pendiente</p>
                    <Button id="btnCancelar2" onClick={this.abrirTableuser}>Ver mis préstamos</Button>
                    <a href="/" target="_self" onClick ={this.volverInicio}><Button id="btnVolver">Volver al inicio</Button></a>
                </Modal>

                <Modal isOpen={this.state.abierto3} className="modalStyless" >
                <img onClick={this.cerrarModals} className='close-icon' src='./close.png'></img>
                    <ModalHeader>
                        <h1 className="titlee">Ingresar</h1>
                        <ModalBody className="modalBody">
                            <p className="subTitle">Necesita ingresar como usuario para <br></br> solicitar el préstamo</p>
                            <Button id="btnCR" onClick={this.cerrarModal3} > Cerrar </Button>
                            <a href="/ingreso" onClick={this.showSpinner}>
                                <Button id="btnIN" onClick={this.volverAceptarPres}> Ingresar </Button>
                            </a>
                        </ModalBody>
                    </ModalHeader>
                </Modal>

            </div>
        )
    }
}
export default Table;
