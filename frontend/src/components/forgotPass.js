import React, { Component, Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import axios from 'axios';
import ReactTooltip from 'react-tooltip';

//let URL = process.env.RESTURL_BACKEND + '/register'
let correoCorrecto = false
let codigoCorrecto = false

const validate = values => {

    let contra = values.Password
    let confirmContra = values.ConfirmPassword
    const errors = {}

    if (!/^[A-Z0-9.%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i.test(values.Email)) {
        errors.Email = 'Formato incorrecto.'
    }

    if (contra != confirmContra) {
        errors.ConfirmPassword = 'Las contraseñas no coinciden.'
    }

    if (!values.Genero && !values.Preferencias) {
        errors.Genero = 'Este campo es obligatorio.'
    }
    return errors
}

class RecuperarContra extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Email: '',
            EmailError: '',

            Codigo: '',
            CodigoError: '',

            Password: '',
            PasswordError: '',

            ConfirmPassword: '',
            ConfirmPasswordError: '',

            abierto: false,
            abierto2: false,

            isDisable: true,
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
        if (value != "") {
            this.setState({isDisable:false})
        }else{
            this.setState({isDisable:true})
        }
    }

    

    enviarCorreo = () => {
        if (!/^[A-Z0-9.%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i.test(this.state.Email)) {
            this.setState({ EmailError: "Formato Incorrecto." })
        } else {
            this.setState({
                EmailError: ""
            })
            this.setState({isDisable:true})
            this.abrirModal()
        }
    }


    inputCode = () => {
        if (correoCorrecto == true) {
            let code = document.getElementById("input-code-container")
            code.className += ' show-inputs'

            let inputEmail = document.getElementById("input-email")
            inputEmail.readOnly = true
        }
    }

    verifyCode = () => {
        if (this.state.Codigo == "TH50L32KM") {
            this.setState({ CodigoError: "" })
            codigoCorrecto = true
            this.setState({isDisable:true})
            this.inputContra();
        } else {
            this.setState({ CodigoError: "Codigo incorrecto." })
            console.log("codigo Incorrecto")
        }
    }

    inputContra = () => {
        if (codigoCorrecto == true) {
            let contra = document.getElementById("input-contras")
            contra.className += ' show-inputs'

            let btnVerifyCode = document.getElementById("btn-verifycode")
            btnVerifyCode.className += ' no-encontrado'

            let inputCode = document.getElementById("input-code")
            inputCode.readOnly = true
        }
    }

    verifyPass = () => {
        if (this.state.Password.length < 8) {
            this.setState({ PasswordError: "La contraseña ingresada es menor a 8 caracteres." })
        } else if (this.state.Password != this.state.ConfirmPassword) {
            this.setState({ PasswordError: "Las contraseñas no coinciden." })
        } else {
            this.setState({ PasswordError: "" })
            window.location.href = "/ingreso"
            //Future...
        }
    }

    abrirModal = () => {
        console.log("TH50L32KM")
        this.setState({ abierto: !this.state.abierto });
    }

    abrirModal2 = () => {
        this.setState({ abierto2: !this.state.abierto2 });
    }

    cerrarModals = () => {
        this.setState({
            abierto: false,
            abierto2: false,
        });
    }

    correoRecibido = () => {
        correoCorrecto = true
        this.inputCode();
        this.cerrarModals()
        let btnGetCode = document.getElementById("btn-getCode")
        btnGetCode.className += ' no-encontrado'
    }

    resendCode = () => {
        console.log("TH50L32KM")
        this.setState({ abierto2: false })
    }

    render() {
        return (
            <Fragment>
                <div className="body">
                    <form className="form-forgotpass" onSubmit={this.handleSumbit} onMouseMove={this.comprobarInputs}>

                        <div className="contenedor">
                            <h1 className="title-forgotpass">Recuperar contraseña</h1>

                            <div className="contenedor">
                                <p className="mid" data-for="info-email"
                                    data-tip="Ingrese su email para recibir un codigo">Email*</p>
                                <ReactTooltip id="info-email"
                                    place="left"
                                    type="info"
                                    effect="solid"
                                    className="error-tooltip"
                                >
                                </ReactTooltip>
                                <input id="input-email"
                                    className="input-forgotpass"
                                    autoComplete="off"
                                    type="text"
                                    name="Email"
                                    value={this.state.Email}
                                    onChange={this.handleChange}
                                />
                                <label className="error-bottom">{this.state.EmailError}</label>

                                <button id="btn-getCode" className="btns-forgotpass" type="button" disabled={this.state.isDisable} onClick={this.enviarCorreo}>Recibir codigo</button>

                                <div id="input-code-container" className="hidden-inputs-forgotpass ">
                                    <p className="mid">Codigo*</p>
                                    <input id="input-code"
                                        className="input-forgotpass"
                                        autoComplete="off"
                                        type="text"
                                        name="Codigo"
                                        value={this.state.Codigo}
                                        onChange={this.handleChange}
                                    />
                                    <label className="error-bottom">{this.state.CodigoError}</label>

                                    <button id="btn-verifycode" className="btns-forgotpass" type="button" disabled={this.state.isDisable} onClick={this.verifyCode}>Verificar codigo</button>

                                </div>
                                <div id="input-contras" className="hidden-inputs-forgotpass">
                                    <p className="mid">Nueva Contraseña*</p>
                                    <input className="input-forgotpass"
                                        autoComplete="off"
                                        type="password"
                                        name="Password"
                                        value={this.state.Password}
                                        onChange={this.handleChange}
                                    />
                                    <label className="error-bottom">{this.state.PasswordError}</label>

                                    <p className="mid">Confirmar Contraseña*</p>
                                    <input className="input-forgotpass"
                                        autoComplete="off"
                                        type="password"
                                        name="ConfirmPassword"
                                        value={this.state.ConfirmPassword}
                                        onChange={this.handleChange}
                                    />
                                    <label className="error-bottom">{this.state.ConfirmPasswordError}</label>

                                    <button className="btns-forgotpass" type="button" disabled={this.state.isDisable} onClick={this.verifyPass}>Cambiar contraseña</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div >

                <Modal isOpen={this.state.abierto} className="modalStyless" >
                    <img onClick={this.cerrarModals} className='close-icon' src='./close.png'></img>
                    <ModalHeader>
                        <h1 className="titlee">Codigo enviado</h1>
                        <ModalBody className="modalBody">
                            <p className="subTitle">¿Ha recibido su codigo?</p>
                            <Button id="btnCR" onClick={this.abrirModal2} > No </Button>
                            <Button id="btnIN" onClick={this.correoRecibido}> Si </Button>
                        </ModalBody>
                    </ModalHeader>
                </Modal>

                <Modal isOpen={this.state.abierto2} className="modalStyless" >
                    <img onClick={this.cerrarModals} className='close-icon' src='./close.png'></img>
                    <ModalHeader>
                        <h1 className="titlee">Soluciones</h1>
                        <ModalBody className="modalBody">
                            <p className="subTitle">1. Verifique la direccion de email ingresada <br></br>
                                            2. Reenvie el codigo</p>
                            <Button id="btnCR" onClick={this.cerrarModals} > Verificar email </Button>
                            <Button id="btnIN" onClick={this.resendCode}> Reenviar codigo </Button>
                        </ModalBody>
                    </ModalHeader>
                </Modal>
            </Fragment >
        )
    }
}
export default RecuperarContra
