import React, { Component } from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

class Descuento extends Component {

    /*popup usuario logueado*/
    state = {
        opened: false,
        closed: true,
    }
    openModal = () => {
        this.setState({ opened: !this.state.opened });
    }

    openModal2 = () => { 
        this.setState({ opened: !this.state.opened });
    }

    closeModal = () => {
        this.setState({ opened: !this.state.closed });
    }
    render() {
        return (
            <>
            <div>
                <a href="http://localhost:3000" target="_blank"><button type="submit" className="btnTerciario"> Volver a simular</button></a>
                <button type="submit" className="btnCuarto" onClick={this.openModal}>Solicitar préstamo</button>
            </div>

            <Modal isOpen = {this.state.opened} className = 'modalStyles'>
                <ModalHeader className = 'tittle'>
                    Confirmar préstamo
                </ModalHeader>
                <ModalBody className= 'subTitle'>
                    ¿Desea pedir un prestamo valor %valorPrestamo% en %cantidadCuotas% cuotas?
                </ModalBody>
                <ModalFooter>
                    <button onClick={this.closeModal}>Cancelar</button>
                    <button onclick={this.openModal2}>Solicitar</button>
                </ModalFooter>
            </Modal>
            
            <Modal isOpen = {this.state.opened} className = 'modalStyles'>
            <ModalBody className= 'subTitle'>
                    Su préstamo se ha registrado exitosamente y se encuentra pendiente de aprobación
                </ModalBody>
                <ModalFooter>
                    <a href="http://localhost:3000" target="_blank"><button >Volver al inicio</button></a>
                </ModalFooter>
            </Modal> 
        </>    
        )
    }
}
export default Descuento;