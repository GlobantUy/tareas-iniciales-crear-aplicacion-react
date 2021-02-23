import React, { Component, Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import axios from 'axios';
import LoadingSpinner from './Spinner';

let URL = process.env.RESTURL_BACKEND + '/passwd'

const data = new Date();
let anioMin = data.getUTCFullYear() - 100
let anio = data.getUTCFullYear() - 18
let mes = data.getUTCMonth() + 1
let dia = data.getUTCDate()
let mesActual
let diaActual
if (mes >= 1 && mes <= 9) {
    mesActual = "0" + mes
} else {
    mesActual = mes
}
if (dia >= 1 && dia <= 9) {
    diaActual = "0" + dia
} else {
    diaActual = dia
}
let fechaActual = anio + "-" + mesActual + "-" + diaActual
let fechaMin = anioMin + "-" + "01" + "-" + "01"
class RecuperarContra extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,

            Email: '',
            EmailError: '',

            FechaNacimiento: '',
            FechaNacimientoError: '',

            password: '',

            abierto: false,

            isDisable: true,
        }
        this.handleChange = this.handleChange.bind(this)
    }

    async handleChange(e) {
        const { name, value } = e.target;
        await this.setState({ [name]: value })
        if (this.state.Email && this.state.FechaNacimiento != "") {
            this.setState({ isDisable: false })
        } else {
            console.log(this.state.FechaNacimiento)
            this.setState({ isDisable: true })
        }
    }

    handleOnBlur = (e) => {
        const { name } = e.target;
        switch (name) {
            case "FechaNacimiento":
                if (!this.state.FechaNacimiento) {
                    this.setState({ FechaNacimientoError: '' })

                } else if (this.state.FechaNacimiento > fechaActual) {
                    this.setState({ FechaNacimientoError: 'Solo nacidos el ' + diaActual + "/" + mesActual + "/" + anio + " o antes." })

                } else if (this.state.FechaNacimiento < fechaMin) {
                    this.setState({ FechaNacimientoError: 'Solo nacidos despues del ' + anioMin + '.' })

                } else {
                    this.setState({ FechaNacimientoError: '' })
                }
                break;
            case "Email":
                if (!this.state.Email) {
                    this.setState({ EmailError: '' })
                } else if (!/^[A-Z0-9.%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i.test(this.state.Email)) {
                    this.setState({ EmailError: "Formato Incorrecto." })
                } else {
                    this.setState({ EmailError: '', })
                }
                break;
            default:
                break;
        }
    }

    getPass = () => {
        function convertDateFormat(string) {
            return string.split('-').reverse()
        }

        function splitDate(array) {
            let algo = array.split('0')
            return algo
        }

        let date = convertDateFormat(this.state.FechaNacimiento)
        let dia = splitDate(date[0])
        let mes = splitDate(date[1])
        let anio = date[2]

        if (dia[0] == "") {
            dia = dia[1]
        } else if (dia[1] == "") {
            dia = dia[0] + "0"
        } else {
            dia = dia[0]
        }

        if (mes[0] == "") {
            mes = mes[1]
        } else if (mes[1] == "") {
            mes = mes[0] + "0"
        } else {
            mes = mes[0]
        }
        let email = this.state.Email
        let dateOfBirth = dia + "-" + mes + "-" + anio
        let emailError = this.state.EmailError
        let fechaError = this.state.FechaNacimientoError
        if (emailError == "" && fechaError == "") {
            this.setState({ loading: true }, () => {
                axios.post(URL, { "email": email, "dateOfBirth": dateOfBirth }).then((resp) => {
                    console.log(resp)
                    if (resp.data.message == "Value of 'dateOfBirth' did not match.") {
                        this.setState({ FechaNacimientoError: "La fecha de nacimiento no coinside.", loading: false })
                    } else if (resp.data.message == "Provided email did not match any user.") {
                        this.setState({ EmailError: "El email ingresado no coinside con el de ningun usuario.", loading: false })
                    } else {
                        this.setState({ password: resp.data.passwd, abierto: !this.state.abierto, loading: false })
                    }
                }).catch((error) => {
                    console.log(error);
                    this.setState({ loading: false })
                    alert("No hemos podido obtener tu contraseña debido a problemas tecnicos.")
                });
            });
        }
    }

    ingresar = () => {
        this.cerrarModals()
        this.setState({ loading: true }, () => {
            window.location.href = "/ingreso"
        });
    }

    cerrarModals = () => {
        this.setState({
            abierto: false,
        });
    }

    render() {
        const { loading } = this.state;
        return (
            <Fragment>
                <div className="body">
                    <form className="form-forgotpass" onSubmit={this.handleSumbit} onMouseMove={this.comprobarInputs}>
                        {loading ? <LoadingSpinner /> : <div />}
                        <div className="contenedor">

                            <center>
                                <h1 className="title-forgotpass">Recuperar contraseña</h1>
                            </center>
                            <div className="contenedor">
                                <p className="mid">Email*</p>
                                <input className="input-forgotpass"
                                    autoComplete="off"
                                    type="text"
                                    name="Email"
                                    value={this.state.Email}
                                    onChange={this.handleChange}
                                    onBlur={this.handleOnBlur}
                                    data-for="error-forgotpass"
                                    data-tip="Este campo es obligatorio."
                                />
                                <label className="error-bottom">{this.state.EmailError}</label>

                                <div id="input-code-container" className="">
                                    <p className="mid">Fecha de Nacimiento*</p>
                                    <input className="input-forgotpass"
                                        type="date"
                                        name="FechaNacimiento"
                                        value={this.state.FechaNacimiento}
                                        onChange={this.handleChange}
                                        onBlur={this.handleOnBlur}
                                        max={fechaActual}
                                        min={fechaMin}
                                        data-for="error-forgotpass"
                                        data-tip="Este campo es obligatorio."
                                    />
                                    <label className="error-bottom">{this.state.FechaNacimientoError}</label>

                                    <button id="btn-getCode" className="btns-forgotpass" type="button" disabled={this.state.isDisable} onClick={this.getPass}>Recibir contraseña</button>

                                </div>
                            </div>
                        </div>
                    </form>
                </div >

                <Modal isOpen={this.state.abierto} className="modalStyless" >
                    <img onClick={this.cerrarModals} className='close-icon' src='./close.png'></img>
                    <ModalHeader>
                        <h1 className="titlee">Contraseña</h1>
                        <ModalBody className="modalBody">
                            <p className="subTitle">Su contraseña es: {this.state.password}</p>
                            <Button id="btnCR" onClick={this.cerrarModals} > Cancelar </Button>
                            <Button id="btnIN" onClick={this.ingresar}> Ingresar </Button>
                        </ModalBody>
                    </ModalHeader>
                </Modal>
            </Fragment >
        )
    }
}
export default RecuperarContra
