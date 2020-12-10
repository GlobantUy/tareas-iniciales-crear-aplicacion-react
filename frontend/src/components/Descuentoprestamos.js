import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Descuento extends Component {

    /*popup usuario logueado*/
    state = {
        abierto: false,
        abierto2: false,
      
    }
    abrirModal = () => {
        this.setState({ abierto: !this.state.abierto});
        console.log("funciona")
    }

    openModal2 = () => {
        this.setState({ abierto2: !this.state.abierto2 });
    }

    cerrarModal = () => {
        this.setState({ abierto: !this.state.abierto });
    }

    constructor(props) {
        super(props);
    }
    volverSimular = () => {
        sessionStorage.setItem('volverBoton', true);
        window.location.href = 'http://localhost:3000'
    }
    render() {
        return (
            <>
                <div>
                    <button onClick={this.volverSimular} type="submit" className="btnTerciario"> Volver a simular</button>
                    <button  type="submit" className="btnCuarto" onClick={this.abrirModal}> Solicitar préstamo</button>
                </div>

                <Modal isOpen = {this.state.abierto} className='modalStyles'>
                    <ModalHeader className='tittle'>
                        Confirmar préstamo
                    </ModalHeader>
                    <ModalBody className='subTitle'>
                        
                    </ModalBody>
                    <ModalFooter>
                        <Button id="btnCancelar" onClick = {this.cerrarModal}>Cancelar</Button>
                        <Button id="btnSolicitar" onClick = {this.openModal2}>Solicitar</Button>
                    </ModalFooter>
                </Modal>
                
                <Modal isOpen = {this.state.opened2} className='modalStyles'>
                    <ModalBody className='subTitle'>
                        Su préstamo se ha registrado exitosamente y se encuentra pendiente de aprobación
                    </ModalBody>
                    <ModalFooter>
                        <a href="http://localhost:3000" target="_blank"><Button id="btnVolver">Volver al inicio</Button></a>
                    </ModalFooter>
                </Modal>
                
                
            </>
            /*fin popup*/
        )
    }
}
export default Descuento;