import React, { Component, Fragment } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import LoadingSpinner from './Spinner';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'

let URL = process.env.RESTURL_BACKEND + '/register'

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
class RegisterContent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            Nombre: '',
            NombreError: '',

            Apellido: '',
            ApellidoError: '',

            FechaNacimiento: '',
            FechaNacimientoError: '',

            Email: '',
            EmailError: '',

            Password: '',
            PasswordError: '',

            ConfirmPassword: '',
            ConfirmPasswordError: '',

            Departamento: '',
            DepartamentoError: '',

            masculinoChecked: false,
            femeninoChecked: false,
            otrosChecked: false,

            
            inmueblesChecked: false,
            hogarChecked: false,
            juguetesChecked: false,
            entretenimientoChecked: false,
            autosChecked: false,
            opticasChecked: false,
            saludChecked: false,
            comidaChecked: false,
            librosChecked: false,
            viajesChecked: false,
            vestimentaChecked: false,
            joyasChecked: false,

            isDisable: true,
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


    soloLetras = (e) => {
        const { name, value } = e.target;
        let regex = new RegExp("^[a-zA-ZÑñ ]+$");
        if (regex.test(value)) {
            this.setState({
                [name]: value
            });
        } else if (value == "") {
            this.setState({
                [name]: value
            });
        }
    }

    handleChangePreferencias = event => {
        if (this.state.Preferencias.includes(event.target.value)) {
            var index = this.state.Preferencias.indexOf(event.target.value);
            this.state.Preferencias.splice(index, 1);
        } else {
            this.setState(state => {
                state.Preferencias.push(event.target.value)
            });
        }
    };

    comprobarInputs = () => {
        let nombre = this.state.Nombre
        let apellido = this.state.Apellido
        let nombreIncorrecto = this.state.NombreError
        let apellidoIncorrecto = this.state.ApellidoError
        let fechaNacIncorrecta = this.state.FechaNacimientoError
        let fechaNac = this.state.FechaNacimiento
        let email = this.state.Email
        let pass = this.state.Password
        let confirmPass = this.state.ConfirmPassword
        let departamento = this.state.Departamento
        let genero = this.state.Genero
        let preferencias = this.state.Preferencias
        if (nombre && apellido && fechaNac && email && pass && confirmPass && departamento && genero && preferencias != '' &&
            pass.length >= 8 && fechaNacIncorrecta != "Solo nacidos el " + dia + "/" + mesActual + "/" + anio + " o antes." &&
            fechaNacIncorrecta != "Solo nacidos despues del " + anioMin + '.') {
            this.setState({
                isDisable: false
            })
        } else {
            this.setState({
                isDisable: true
            })
        }
    }

    handleOnBlur = (e) => {
        const { name } = e.target;
        switch (name) {
            case "Nombre":
                if (!this.state.Nombre) {
                    this.setState({
                        NombreError: ''
                    })
                } else if (!/[A-Z]$/i.test(this.state.Nombre)) {
                    this.setState({
                        NombreError: 'Ingrese un nombre valido.',
                    })
                } else {
                    this.setState({
                        NombreError: '',
                    })
                }
                break;
            case "Apellido":
                if (!this.state.Apellido) {
                    this.setState({
                        ApellidoError: ''
                    })
                } else if (!/[A-Z]$/i.test(this.state.Apellido)) {
                    this.setState({
                        ApellidoError: 'Ingrese un apellido valido.',
                    })
                } else {
                    this.setState({
                        ApellidoError: '',
                    })
                }
                break;
            case "FechaNacimiento":
                if (!this.state.FechaNacimiento) {
                    this.setState({
                        FechaNacimientoError: ''
                    })
                } else if (this.state.FechaNacimiento > fechaActual) {
                    this.setState({
                        FechaNacimientoError: 'Solo nacidos el ' + diaActual + "/" + mesActual + "/" + anio + " o antes."
                    })
                } else if (this.state.FechaNacimiento < fechaMin) {
                    this.setState({
                        FechaNacimientoError: 'Solo nacidos despues del ' + anioMin + '.'
                    })
                } else {
                    this.setState({
                        FechaNacimientoError: '',
                    })
                }
                break;
            case "Email":
                if (this.state.EmailError == 'Ya existe un usuario con este email.') {
                    this.setState({
                        EmailError: 'Ya existe un usuario con este email.',
                    })
                } else {
                    this.setState({
                        EmailError: '',
                    })
                }
                break;
            case "Password":
                if (!this.state.Password) {
                    this.setState({
                        PasswordError: ''
                    })
                } else if (this.state.Password.length < 8) {
                    this.setState({
                        PasswordError: 'La contraseña ingresada es menor a 8 caracteres.'
                    })
                } else {
                    this.setState({
                        PasswordError: '',
                    })
                }
                break;
            case "ConfirmPassword":
                if (!this.state.ConfirmPassword) {
                    this.setState({
                        ConfirmPasswordError: 'Este campo es obligatorio.'
                    })
                } else {
                    this.setState({
                        ConfirmPasswordError: '',
                    })
                }
                break;
            case "Departamento":
                if (!this.state.Departamento) {
                    this.setState({
                        DepartamentoError: 'Este campo es obligatorio.'
                    })
                } else {
                    this.setState({
                        DepartamentoError: '',
                    })
                }
                break;
            default:
                break;
        }
    }

    handleSumbit(e) {
        e.preventDefault();
        const { errors, ...sinErrors } = this.state
        const result = validate(sinErrors)
        this.setState({ errors: result })
        if (!Object.keys(result).length) {
            element.className += " velo"
            this.setState({ loading: true }, () => {
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
                if (Response.data.message == "Email belongs to an existing account.") {
                    this.setState({
                        EmailError: 'Ya existe un usuario con este email',
                        loading: false
                    })
                    element.className = "container"
                } else {
                    this.setState({
                        loading: false,
                        EmailError: ''
                    })
                    element.className = "container"
                    window.location.href = '/ingreso'
                }
            }).catch(error => {
                alert("No hemos podido registrarte debido a problemas tecnicos.")
                this.setState({
                    loading: false
                })
            })
        })
        } else {
            this.setState({
                EmailError: ''
            })
        }
    }

    cerrarModal = () => {
        this.setState({
            abierto: !this.state.abierto,
            Nombre: '',
            Apellido: '',
            FechaNacimiento: '',
            Email: '',
            Password: '',
            ConfirmPassword: '',
            Departamento: '',

            masculinoChecked: false,
            femeninoChecked: false,
            otrosChecked: false,

            Preferencias: [],
            inmueblesChecked: false,
            hogarChecked: false,
            juguetesChecked: false,
            entretenimientoChecked: false,
            autosChecked: false,
            opticasChecked: false,
            saludChecked: false,
            comidaChecked: false,
            librosChecked: false,
            viajesChecked: false,
            vestimentaChecked: false,
            joyasChecked: false,

        });
    }

    checkboxChange = (e) => {
        switch (e.target.name) {
            case 'Genero':
                if (e.target.id == 'Femenino') {
                    this.setState({ femeninoChecked: true, masculinoChecked: false, otrosChecked: false, Genero: 'Femenino' })
                } else if (e.target.id == 'Masculino') {
                    this.setState({ femeninoChecked: false, masculinoChecked: true, otrosChecked: false, Genero: 'Masculino' })
                } else {
                    this.setState({ femeninoChecked: false, masculinoChecked: false, otrosChecked: true, Genero: 'Otro' })
                }
                console.log(this.state.Genero)
                break;
            default:
                break;
        }
        switch (e.target.id) {
            case 'Inmuebles':
                this.setState({
                    inmueblesChecked: !this.state.inmueblesChecked
                })
                break;
            case 'Hogar_deco':
                this.setState({
                    hogarChecked: !this.state.hogarChecked
                })
                break;
            case 'Juguetes':
                this.setState({
                    juguetesChecked: !this.state.juguetesChecked
                })
                break;
            case 'Entretenimiento':
                this.setState({
                    entretenimientoChecked: !this.state.entretenimientoChecked
                })
                break;
            case 'Autos':
                this.setState({
                    autosChecked: !this.state.autosChecked
                })
                break;
            case 'Opticas':
                this.setState({
                    opticasChecked: !this.state.opticasChecked
                })
                break;
            case 'Salud_belleza':
                this.setState({
                    saludChecked: !this.state.saludChecked
                })
                break;
            case 'Comida':
                this.setState({
                    comidaChecked: !this.state.comidaChecked
                })
                break;
            case 'Libros':
                this.setState({
                    librosChecked: !this.state.librosChecked
                })
                break;
            case 'Viajes_turismo':
                this.setState({
                    viajesChecked: !this.state.viajesChecked
                })
                break;
            case 'Vestimenta':
                this.setState({
                    vestimentaChecked: !this.state.vestimentaChecked
                })
                break;
            case 'Joyas':
                this.setState({
                    joyasChecked: !this.state.joyasChecked
                })
                break;
            default:
                break;
        }
    }

    render() {
        const { loading } = this.state;
        const { errors } = this.state
        return (
            <Fragment>
                {loading ? <LoadingSpinner /> : <div />}
                <div className="body">
                    <form className="form registro" onSubmit={this.handleSumbit} onMouseMove={this.comprobarInputs}>

                        <center>
                            <h1 className="titlee-registro">Registro de usuario STB Bank</h1>
                        </center>

                        <div className="container">
                            <div className="row">
                                <div className="col-4">
                                    <p>Nombres*</p>
                                    <input className="inp-registro"
                                        autoComplete="off"
                                        type="text"
                                        name="Nombre"
                                        value={this.state.Nombre}
                                        onBlur={this.handleOnBlur}
                                        onChange={this.soloLetras}
                                        data-for="error-registro"
                                        data-tip="Este campo es obligatorio."
                                    />
                                </div>

                                <div className="col-4">
                                    <p className="mid">Apellidos*</p>
                                    <input className="inp-registro"
                                        autoComplete="off"
                                        type="text"
                                        name="Apellido"
                                        value={this.state.Apellido}
                                        onBlur={this.handleOnBlur}
                                        onChange={this.soloLetras}
                                        data-for="error-registro"
                                        data-tip="Este campo es obligatorio."
                                    />
                                </div>

                                <div className="col-4">
                                    <p>Fecha de nacimiento*</p>
                                    <input className="inp-registro"
                                        autoComplete="off"
                                        type="date"
                                        name="FechaNacimiento"
                                        value={this.state.FechaNacimiento}
                                        onBlur={this.handleOnBlur}
                                        onChange={this.handleChange}
                                        data-for="error-registro"
                                        data-tip="Este campo es obligatorio."
                                        max={fechaActual}
                                        min={fechaMin}
                                    />
                                    <label className="error-bottom">{this.state.FechaNacimientoError}</label>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-4">
                                    <p>Email*</p>
                                    <input className="inp-registro"
                                        autoComplete="off"
                                        type="text"
                                        name="Email"
                                        value={this.state.Email}
                                        onBlur={this.handleOnBlur}
                                        onChange={this.handleChange}
                                        data-for="error-registro"
                                        data-tip="Este campo es obligatorio."
                                    />
                                    <label className="error-bottom">{errors.Email}</label>
                                    <label className="error-bottom">{this.state.EmailError}</label>

                                </div>

                                <div className="col-4">
                                    <p className="mid">Contraseña*</p>
                                    <input className="inp-registro"
                                        autoComplete="off"
                                        type="password"
                                        name="Password"
                                        value={this.state.Password}
                                        onBlur={this.handleOnBlur}
                                        onChange={this.handleChange}
                                        data-for="error-registro"
                                        data-tip="Este campo es obligatorio."
                                    />
                                    <label className="error-bottom">{this.state.PasswordError}</label>

                                </div>

                                <div className="col-4">
                                    <p>Confirmación de contraseña*</p>
                                    <input className="inp-registro"
                                        autoComplete="off"
                                        type="password"
                                        name="ConfirmPassword"
                                        value={this.state.ConfirmPassword}
                                        onBlur={this.handleOnBlur}
                                        onChange={this.handleChange}
                                        data-for="error-registro"
                                        data-tip="Este campo es obligatorio."
                                    />
                                    <label className="error-bottom">{errors.ConfirmPassword}</label>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-4">
                                    <p>Departamento*</p>
                                    <select className="inp-registro"
                                        name="Departamento"
                                        value={this.state.Departamento}
                                        onChange={this.handleChange}
                                        onBlur={this.handleOnBlur}
                                        data-for="error-registro"
                                        data-tip="Este campo es obligatorio">
                                        <option hidden>Selecciona una opción</option>
                                        <option value="Artigas">Artigas</option>
                                        <option value="Canelones">Canelones</option>
                                        <option value="CerroLargo">Cerro Largo</option>
                                        <option value="Colonia">Colonia</option>
                                        <option value="Durazno">Durazno</option>
                                        <option value="Flores">Flores</option>
                                        <option value="Florida">Florida</option>
                                        <option value="Lavalleja">Lavalleja</option>
                                        <option value="Maldonado">Maldonado</option>
                                        <option value="Montevideo">Montevideo</option>
                                        <option value="Paysandu">Paysandú</option>
                                        <option value="RioNegro">Río Negro</option>
                                        <option value="Rivera">Rivera</option>
                                        <option value="Rocha">Rocha</option>
                                        <option value="SanJose">San José</option>
                                        <option value="Salto">Salto</option>
                                        <option value="Soriano">Soriano</option>
                                        <option value="Tacuarembo">Tacuarembo</option>
                                        <option value="TreintayTres">Treinta y Tres</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row row-name-genero">
                                <div className="col-3">
                                    <p>Género*</p>
                                </div>
                                <div className="col-3">
                                    <p>Preferencias*</p>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-3">
                                    <input
                                        type="radio"
                                        id="Femenino"
                                        name="Genero"
                                        value="Femenino"
                                        onChange={this.checkboxChange}
                                        checked={this.state.femeninoChecked}
                                    />

                                    <label className="genero" htmlFor="Femenino">Femenino</label>

                                    <div className="rdbutons">
                                        <input
                                            type="radio"
                                            id="Masculino"
                                            name="Genero"
                                            value="Masculino"
                                            onChange={this.checkboxChange}
                                            checked={this.state.masculinoChecked}
                                        />
                                        <label className="genero" htmlFor="Masculino">Masculino</label>
                                    </div>

                                    <input
                                        type="radio"
                                        id="Otro"
                                        name="Genero"
                                        value="Otro"
                                        onChange={this.checkboxChange}
                                        checked={this.state.otrosChecked}
                                    />
                                    <label className="genero" htmlFor="Otro">Otro</label>
                                </div>

                                <div className="col-3">

                                    <input className="inputTipo"
                                        type="checkbox"
                                        id="Inmuebles"
                                        name="Preferencias"
                                        value="Inmuebles"
                                        onChange={this.checkboxChange}
                                        checked={this.state.inmueblesChecked}
                                    />
                                    <label htmlFor="Inmuebles">Inmuebles</label><br></br>

                                    <input className="inputTipo"
                                        type="checkbox"
                                        id="Hogar_deco"
                                        name="Preferencias"
                                        value="Hogar_deco"
                                        onChange={this.checkboxChange}
                                        checked={this.state.hogarChecked}
                                    />
                                    <label htmlFor="Hogar_deco">Hogar y decoración</label><br></br>

                                    <input className="inputTipo"
                                        type="checkbox"
                                        id="Juguetes"
                                        name="Preferencias"
                                        value="Juguetes"
                                        onChange={this.checkboxChange}
                                        checked={this.state.juguetesChecked}
                                    />
                                    <label htmlFor="Juguetes">Juguetes</label><br></br>

                                    <input className="inputTipo"
                                        type="checkbox"
                                        id="Entretenimiento"
                                        name="Preferencias"
                                        value="Entretenimiento"
                                        onChange={this.checkboxChange}
                                        checked={this.state.entretenimientoChecked}
                                    />
                                    <label htmlFor="Entretenimiento">Entretenimiento</label><br></br>

                                </div>

                                <div className="col-3">

                                    <input className="inputTipo"
                                        type="checkbox"
                                        id="Autos"
                                        name="Preferencias"
                                        value="Autos"
                                        onChange={this.checkboxChange}
                                        checked={this.state.autosChecked}
                                    />
                                    <label htmlFor="Autos">Autos</label><br></br>

                                    <input className="inputTipo"
                                        type="checkbox"
                                        id="Opticas"
                                        name="Preferencias"
                                        value="Opticas"
                                        onChange={this.checkboxChange}
                                        checked={this.state.opticasChecked}
                                    />
                                    <label htmlFor="Opticas">Opticas</label><br></br>

                                    <input className="inputTipo"
                                        type="checkbox"
                                        id="Salud_belleza"
                                        name="Preferencias"
                                        value="Salud_belleza"
                                        onChange={this.checkboxChange}
                                        checked={this.state.saludChecked}
                                    />
                                    <label htmlFor="Salud_belleza">Salud y belleza</label><br></br>

                                    <input className="inputTipo"
                                        type="checkbox"
                                        id="Comida"
                                        name="Preferencias"
                                        value="Comida"
                                        onChange={this.checkboxChange}
                                        checked={this.state.comidaChecked}
                                    />
                                    <label htmlFor="Comida">Comida</label><br></br>
                                </div>

                                <div className="col-3">
                                    <input className="inputTipo"
                                        type="checkbox"
                                        id="Libros"
                                        name="Preferencias"
                                        value="Libros"
                                        onChange={this.checkboxChange}
                                        checked={this.state.librosChecked}
                                    />
                                    <label htmlFor="Libros">Libros</label><br></br>

                                    <input className="inputTipo"
                                        type="checkbox"
                                        id="Viajes_turismo"
                                        name="Preferencias"
                                        value="Viajes_turismo"
                                        onChange={this.checkboxChange}
                                        checked={this.state.viajesChecked}
                                    />
                                    <label htmlFor="Viajes_turismo">Viajes y turismo</label><br></br>

                                    <input className="inputTipo"
                                        type="checkbox"
                                        id="Vestimenta"
                                        name="Preferencias"
                                        value="Vestimenta"
                                        onChange={this.checkboxChange}
                                        checked={this.state.vestimentaChecked}
                                    />
                                    <label htmlFor="Vestimenta">Vestimenta</label><br></br>

                                    <input className="inputTipo"
                                        type="checkbox"
                                        id="Joyas"
                                        name="Preferencias"
                                        value="Joyas"
                                        onChange={this.checkboxChange}
                                        checked={this.state.joyasChecked}
                                    />
                                    <label htmlFor="Joyas">Joyas</label><br></br>
                                </div>
                            </div>

                            <center>
                                <button type="submit" disabled={this.state.isDisable} className="btn-registro">Registrarse</button>
                            </center>

                            <Modal isOpen={this.state.abierto} className='modalStyles'>
                                <img onClick={this.cerrarModal} className='close-icon' src='./close.png'></img>
                                <h3 className='tittle'>Usuario registrado exitosamente</h3>
                                <p className='text'>Su usuario ha sido registrado correctamente, presione OK para ingresar al sistema</p>
                                <Button id="btnCancelar" onClick={this.cerrarModal}>Cerrar</Button>
                                <a href="/ingreso" target="_self"><Button id="btnOK">OK</Button></a>
                            </Modal>

                        </div>

                    </form>
                </div >
            </Fragment >
        )
    }
}

export default RegisterContent;
