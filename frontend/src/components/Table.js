import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class Table extends Component {

    //popup usuario logueado//
    state = {
        abierto: false,
        abierto2: false,
        abierto3: false,

    }

    volverAceptarPres = () => {
        sessionStorage.setItem('volverAceptarpress', false);
    }

    abrirModal = () => {
        const emailCargado = JSON.parse(sessionStorage.getItem('Usuario-Values'));
        if (emailCargado) {
            this.setState({ abierto: !this.state.abierto });
        } else {
            this.setState({ abierto3: !this.state.abierto3 });
        }
        console.log("funciona")
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
        this.state = { //state is by default an object
            clientes: [
                { Moneda: '$U', Tasa: '15%', Cuotas: 60, Años: 5, ValorCuota: 23.000 },
                { Moneda: '$U', Tasa: '15%', Cuotas: 120, Años: 1, ValorCuota: 18.000 },
                { Moneda: '$U', Tasa: '15%', Cuotas: 180, Años: 15, ValorCuota: 16.000 },
                { Moneda: '$U', Tasa: '15%', Cuotas: 240, Años: 20, ValorCuota: 13.000 },
                { Moneda: '$U', Tasa: '15%', Cuotas: 300, Años: 25, ValorCuota: 11.000 }
            ]
        }
    }

    handleSubmitClicked() {
        this.setState({
            isDisabled: true
        });
    }

    volverSimular = () => {
        sessionStorage.setItem('volverBoton', true);
        window.location.href = 'http://localhost:3000/'

    }


    renderTableData() {
        return this.state.clientes.map((cliente, index) => {
            const { Moneda, Tasa, Cuotas, Años, ValorCuota } = cliente //destructuring
            return (
                <tr key={Moneda}>
                    <td className="celda">{Moneda}</td>
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
                <h1 id='title'>Resultado de préstamo</h1>
                <h1 id='ingresos'>Ingresos $U 107.500</h1>
                <h1 id='Monto'>Monto Solicitado  $U 105.000 </h1>
                <h1 id='seleccionar'>Seleccione la fila deseada para solicitar su préstamo</h1>
                <div>
                    <table id='clientes'>
                        <tbody>
                            <tr>{this.renderTableHeader()}</tr>
                            {this.renderTableData()}
                        </tbody>
                    </table>
                </div>
                <div className="Buttons">
                    <button onClick={this.volverSimular} type="submit" className="btnTerciario"> Volver a simular</button>
                    <button type="submit" className="btnCuarto" onClick={this.abrirModal}> Solicitar préstamo</button>
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


//disabled={!this.isDisabled}   onClick={this.state.handleChange}//
