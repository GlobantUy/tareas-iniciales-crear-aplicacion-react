import React, { Children, Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


let emailFromStorage
let monedaPost
let añosPost
let monto_a_pedir
let URL = "https://backendmain-60tqle36e.vercel.app/api/storeLoan"
class Table extends Component {

    //popup usuario logueado//
    state = {
        abierto: false,
        abierto2: false,
        abierto3: false,

    }

    volverAceptarPres = () => {
        sessionStorage.setItem('volverAceptarpress', true);
    }

    abrirModal = () => {
        const emailCargado = JSON.parse(sessionStorage.getItem('Usuario-Values'));
        if (emailCargado) {
            this.setState({ abierto: !this.state.abierto });
            emailFromStorage = JSON.parse(sessionStorage.getItem('Usuario-Values')).email
            axios.post(URL, {
                'email': emailFromStorage,
                'amount': monto_a_pedir,
                'currency': monedaPost,
                'payments': añosPost,
            }
            )
                .then(Response => {
                    console.log("registration res", Response)
                })
                .catch(error => {
                    console.log("registration error", error)
                });
        } else {
            this.setState({ abierto3: !this.state.abierto3 });
        }
    }

    abrirModal2 = () => {
        this.setState({ abierto2: !this.state.abierto2 });
    }

    cerrarModal = () => {
        this.setState({ abierto: !this.state.abierto });
    }

    cerrarModal3 = () => {
        this.setState({ abierto3: !this.state.abierto3 });
    }
    constructor(props) {
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
        this.handleSubmitClicked = this.handleSubmitClicked.bind(this);
        this.state = { //state is by default an object
            Ingreso: '',
            Monto_a_pedir: '',

            Moneda: '',

            financiacion: '',

            rowSelected: false,


            clientes: [{ Moneda: '', Tasa: '', Cuotas: '', Años: '', ValorCuota: '' }],

            isDisabled: true
        }
    }

    componentDidMount() {
        let moneda = (JSON.parse(sessionStorage.getItem('prestamoValues')).Moneda_$U) ? "$U" : "U$S"
        let Año = (JSON.parse(sessionStorage.getItem('prestamoValues')).financiacion)
        monto_a_pedir = parseInt((JSON.parse(sessionStorage.getItem('prestamoValues')).Monto_a_pedir))
        this.setState({

            clientes: [
                { Moneda: moneda, Tasa: '10%', Cuotas: 60, Años: 5, ValorCuota: this.valorCouta(monto_a_pedir, 0.1, 60) },
                { Moneda: moneda, Tasa: '15%', Cuotas: 120, Años: 10, ValorCuota: this.valorCouta(monto_a_pedir, 0.15, 120) },
                { Moneda: moneda, Tasa: '18%', Cuotas: 180, Años: 15, ValorCuota: this.valorCouta(monto_a_pedir, 0.18, 180) },
                { Moneda: moneda, Tasa: '20%', Cuotas: 240, Años: 20, ValorCuota: this.valorCouta(monto_a_pedir, 0.2, 240) },
                { Moneda: moneda, Tasa: '25%', Cuotas: 300, Años: 25, ValorCuota: this.valorCouta(monto_a_pedir, 0.25, 300) }
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

    getValuesTable (element){
        if (element.hasChildNodes()) {
            var children = element.childNodes;
            for (var i = 0; i < children.length; i++) {
                monedaPost = children[0].innerHTML;
                añosPost = children[3].innerHTML;
                console.log(monedaPost + " " + añosPost)
            }
        }
    }

    volverSimular = () => {
        sessionStorage.setItem('volverBoton', true);
        window.location.href = 'http://localhost:3000/'

    }

    valorCouta = (monto_a_pedir, porcentaje, cant_cuotas) => {
        const total_con_interes = monto_a_pedir + (monto_a_pedir * porcentaje);

        let cuota = total_con_interes / cant_cuotas;

        return cuota.toFixed(3);
    }

    renderTableData() {
        return this.state.clientes.map((cliente, index) => {
            const { Moneda, Tasa, Cuotas, Años, ValorCuota } = cliente //destructuring
            return (
                <tr id={index} onClick={(() => this.handleSubmitClicked(index))} key={index}>
                    <td className="celda"> {Moneda}</td>
                    <td className="celda">{Tasa}</td>
                    <td className="celda">{Cuotas}</td>
                    <td className="celda">{Años}</td>
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
        window.location.href = 'http://localhost:3000/'

    }

    render() {
        return (
            <div className="container">
                <h2 id='titleee'>Resultado de préstamo</h2>
                <h1 id='ingresos'>  Ingresos </h1>
                <h1 id='ingresoss'> {this.state.Moneda + this.state.Ingreso} </h1>
                <h1 id='Monto' >  Monto  solicitado </h1>
                <h1 id='Montoss'> {this.state.Moneda + this.state.Monto_a_pedir} </h1>
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
                    <h3 className='tittle'>Confirmar préstamo</h3>
                    <p className='text'>Prestamo valor $120.940 en 18 cuotas</p>
                    <Button id="btnCancelar" onClick={this.cerrarModal}>Cancelar</Button>
                    <Button id="btnSolicitar" onClick={this.abrirModal2}>Solicitar</Button>
                </Modal>

                <Modal isOpen={this.state.abierto2} className='modalStyles'>
                    <p className='textModal2'>Su préstamo ha sido registrado exitosamente y se encuentra pendiente de aprobación</p>
                    <a href="http://localhost:3000/" target="_self"><Button id="btnVolver">Volver al inicio</Button></a>
                </Modal>

                <Modal isOpen={this.state.abierto3} className="modalStyless" >
                    <ModalHeader>
                        <h1 className="titlee">Ingresar</h1>
                        <ModalBody className="modalBody">
                            <p className="subTitle">Necesita ingresar como usuario para <br></br> solicitar el préstamo</p>
                            <Button id="btnCR" onClick={this.cerrarModal3} > Cerrar </Button>
                            <a href="/ingreso" >
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


