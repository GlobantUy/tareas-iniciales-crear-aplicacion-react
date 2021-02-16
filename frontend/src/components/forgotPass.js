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

            errors: {},
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSumbit = this.handleSumbit.bind(this)
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    inputCode = () => {
        if (correoCorrecto == true) {
            return (
                <Fragment>
                    <div className="col-12">
                        <p className="mid">Codigo*</p>
                        <input className="inp-registro"
                            autoComplete="off"
                            type="text"
                            name="Codigo"
                            value={this.state.Codigo}
                            onChange={this.handleChange}
                        />
                        <label className="error-bottom">{this.state.CodigoError}</label>
                    </div>

                    <button type="button" onClick={this.verifyCode}>Verificar codigo</button>
                </Fragment>
            )
        }
    }

    inputContra = () => {
        if (codigoCorrecto == true) {
            return (
                <Fragment>
                    <div className="col-12">
                        <p className="mid">Contraseña*</p>
                        <input className="inp-registro"
                            autoComplete="off"
                            type="password"
                            name="password"
                            value={this.state.Password}
                            onChange={this.handleChange}
                        />
                        <label className="error-bottom">{this.state.PasswordError}</label>

                        <p className="mid">Confirmar Contraseña*</p>
                        <input className="inp-registro"
                            autoComplete="off"
                            type="password"
                            name="ConfirmPassword"
                            value={this.state.ConfirmPassword}
                            onChange={this.handleChange}
                        />
                        <label className="error-bottom">{this.state.ConfirmPasswordError}</label>
                    </div>
                </Fragment>
            )
        }
    }

    enviarCorreo = () => {
        if (this.state.Email == "andrew@globant.com") {
            this.cerrarModals();
            correoCorrecto = true
            this.inputCode();
        } else {
            console.log("correo Incorrecto")
        }
    }

    verifyCode = () => {
        if (this.state.Codigo == "TH50L32KM") {
            codigoCorrecto = true
            this.inputContra();
        } else {
            console.log("codigo Incorrecto")
        }
    }

    resendCode = () => {
        console.log("TH50L32KM")
    }

    handleSumbit(e) {
        e.preventDefault();
        const { errors, ...sinErrors } = this.state
        const result = validate(sinErrors)
        this.setState({ errors: result })
        if (!Object.keys(result).length) {
            axios.post(URL, {
                "name": this.state.Nombre,
                "lName": this.state.Apellido,
                "dateOfBirth": this.state.FechaNacimiento,
                "gender": this.state.Genero,
                "preferences": this.state.Preferencias,
                "email": this.state.Email,
                "department": this.state.Departamento,
                "passwd": this.state.Password
            }).then(Response => {
                console.log(Response)
                if (Response.data.message == "Email belongs to an existing account.") {
                    this.setState({
                        EmailError: 'Ya existe un usuario con este email'
                    })
                } else {
                    this.setState({
                        EmailError: ''
                    })
                    window.location.href = '/ingreso'
                }
            }).catch(error => {
                console.log(error)
                alert("No hemos podido registrarte debido a problemas tecnicos.")
            })

        } else {
            this.setState({
                EmailError: ''
            })
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

    render() {
        return (
            <Fragment>
                <div className="body">
                    <form className="form registro" onSubmit={this.handleSumbit} onMouseMove={this.comprobarInputs}>

                        <center>
                            <h1 className="titlee-registro">Recuperar contraseña</h1>
                        </center>

                        <div className="container">
                            <div className="row">

                                <div className="col-4">
                                    <p className="mid" data-for="info-email"
                                        data-tip="Ingrese su email para recibir un codigo">Email*</p>
                                    <ReactTooltip id="info-email"
                                        place="bottom"
                                        type="info"
                                        effect="solid"
                                        className="error-tooltip"
                                    >
                                    </ReactTooltip>
                                    <input className="inp-registro"
                                        autoComplete="off"
                                        type="text"
                                        name="Email"
                                        value={this.state.Email}
                                        onChange={this.handleChange}
                                    />

                                    <button type="button" onClick={this.abrirModal}>Recibir codigo</button>
                                </div>

                                <Modal isOpen={this.state.abierto} className="modalStyless" >
                                    <img onClick={this.cerrarModals} className='close-icon' src='./close.png'></img>
                                    <ModalHeader>
                                        <h1 className="titlee">Codigo enviado</h1>
                                        <ModalBody className="modalBody">
                                            <p className="subTitle">¿Ha recibido su codigo?</p>
                                            <Button id="btnCR" onClick={this.abrirModal2} > No </Button>
                                            <Button id="btnIN" onClick={this.enviarCorreo}> Si </Button>
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

                                {this.inputCode()}
                                {this.inputContra()}
                            </div>
                        </div>
                    </form>
                </div >
            </Fragment >
        )
    }
}
export default RecuperarContra
