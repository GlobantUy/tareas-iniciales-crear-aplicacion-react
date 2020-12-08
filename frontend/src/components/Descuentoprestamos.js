import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";

class Descuento extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        abierto: false,
        cerrado: true,
    }
    abrirModal = () => {
        this.setState({ abierto: !this.state.abierto });
    }
    cerrarModal = () => {
        this.setState({ abierto: !this.state.cerrado });
    }
    volverSimular=()=> {
        sessionStorage.setItem('volverBoton', true);
        window.location.href = 'http://localhost:3000'
    
    }
    render() {
        return (
            <div>
                <div>
                    <button onClick={this.volverSimular} type="submit" className="btnTerciario"> Volver a simular</button>
                    <button type = "submit"className = "btnCuarto"onClick = { this.abrirModal } > Solicitar préstamo</button>
                </div>
                <Modal isOpen = { this.state.abierto }className = "modalStyles" >
                    <ModalHeader>
                        <h1 className = "title">Ingresar</h1>
                        <ModalBody className = "modalBody">
                            <p className = "subTitle">Necesita ingresar como usuario para <br></br> solicitar el préstamo</p>
                            <Button id = "btnCR" onClick = {this.cerrarModal } > Cerrar </Button> 
                            <a href = "/ingreso"> 
                                <Button id = "btnIN"> Ingresar </Button> 
                            </a>
                        </ModalBody>
                    </ModalHeader> 
                </Modal>
            </div>
        )
    }
}
export default Descuento;