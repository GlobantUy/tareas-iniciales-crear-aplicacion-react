import React, { Component, Fragment } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
let URL = 'https://backendmain-858cqrzs8.vercel.app/api/register'

const validate = values => {

    let contra = values.Password
    let confirmContra = values.ConfirmPassword

    const errors = {}
    if (!values.Nombre) {
        errors.Nombre = 'Este campo es obligatorio'
    }

    if (!values.Apellido) {
        errors.Apellido = 'Este campo es obligatorio'
    }

    if (!values.FechaNacimiento) {
        errors.FechaNacimiento = 'Este campo es obligatorio'
    }

    if (!values.Email) {
        errors.Email = 'Este campo es obligatorio'
    } else if (!/^[A-Z0-9.%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i.test(values.Email)) {
        errors.Email = 'formato incorrecto'
    }

    if (!values.Password) {
        errors.Password = 'Este campo es obligatorio'
    }

    if (!values.ConfirmPassword) {
        errors.ConfirmPassword = 'Este campo es obligatorio'
    } else if (contra != confirmContra) {
        errors.ConfirmPassword = 'Las contraseñas no coinciden'
        console.log(contra + " y " + confirmContra)
    }

    if (!values.Departamento) {
        errors.Departamento = 'Este campo es obligatorio'
    }

    if (!values.Genero && !values.Preferencias) {
        errors.Genero = 'Este campo es obligatorio'
    }

    return errors
}
class RegisterContent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Nombre: '',
            Apellido: '',
            FechaNacimiento: '',
            Email: '',
            Password: '',
            ConfirmPassword: '',

            Departamento: '',
            Genero: '',
            Preferencias: [],

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

    handleSumbit(e) {
        e.preventDefault();
        const { errors, ...sinErrors } = this.state
        const result = validate(sinErrors)
        this.setState({ errors: result })
        if (!Object.keys(result).length) {
            console.log(this.state)
            window.location.href = '/'
        }
    }

    render() {
        const { errors } = this.state
        return (
            <Fragment>
                <div className="algo">
                    <form className="form registro" onSubmit={this.handleSumbit}>

                        <center>
                            <h1 className="titlee-registro">Registro</h1>
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
                                        //onTouchStart={}
                                        onChange={this.handleChange}
                                    />
                                    <label className="error">{errors.Nombre}</label>

                                </div>
                                <div className="col-4">

                                    <p className="mid">Apellidos*</p>
                                    <input className="inp-registro"
                                        autoComplete="off"
                                        type="text"
                                        name="Apellido"
                                        value={this.state.Apellido}
                                        onChange={this.handleChange}
                                    />
                                    <label className="error">{errors.Apellido}</label>

                                </div>
                                <div className="col-4">

                                    <p>Fecha de nacimiento*</p>
                                    <input className="inp-registro"
                                        autoComplete="off"
                                        type="date"
                                        name="FechaNacimiento"
                                        value={this.state.FechaNacimiento}
                                        onChange={this.handleChange}
                                    />
                                    <label className="error">{errors.FechaNacimiento}</label>
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
                                        onChange={this.handleChange}
                                    />
                                    <label className="error">{errors.Email}</label>
                                </div>

                                <div className="col-4">

                                    <p className="mid">Contraseña*</p>
                                    <input className="inp-registro"
                                        autoComplete="off"
                                        type="password"
                                        name="Password"
                                        value={this.state.Password}
                                        onChange={this.handleChange}
                                    />
                                    <label className="error">{errors.Password}</label>
                                </div>

                                <div className="col-4">

                                    <p>Confirmación de contraseña*</p>
                                    <input className="inp-registro"
                                        autoComplete="off"
                                        type="password"
                                        name="ConfirmPassword"
                                        value={this.state.ConfirmPassword}
                                        onChange={this.handleChange}
                                    />
                                    <label className="error">{errors.ConfirmPassword}</label>

                                </div>
                            </div>

                            <div className="row">
                                <div className="col-4">

                                    <p>Departamento*</p>

                                    <select className="inp-registro" name="Departamento" value={this.state.Departamento} onChange={this.handleChange}>
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
                                    <label className="error">{errors.Departamento}</label>
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
                                        className="rdbutons"
                                        type="radio"
                                        id="Femenino"
                                        name="Genero"
                                        value="Femenino"
                                        onChange={this.handleChange}
                                    />

                                    <label className="genero" htmlFor="Femenino">Femenino</label>

                                    <input
                                        className="rdbutons"
                                        type="radio"
                                        id="Masculino"
                                        name="Genero"
                                        value="Masculino"
                                        onChange={this.handleChange}
                                    />
                                    <label className="genero" htmlFor="Masculino">Masculino</label>

                                    <input
                                        className="rdbutons"
                                        type="radio"
                                        id="Otro"
                                        name="Genero"
                                        value="otro"
                                        onChange={this.handleChange}
                                    />
                                    <label className="genero" htmlFor="Otro">Otro</label>
                                </div>

                                <div className="col-3">

                                    <input className="inputTipo"
                                        type="checkbox"
                                        id="Inmuebles"
                                        name="Preferencias"
                                        value="Inmuebles"
                                        onChange={this.handleChangePreferencias}
                                    />
                                    <label htmlFor="Inmuebles">Inmuebles</label><br></br>

                                    <input className="inputTipo"
                                        type="checkbox"
                                        id="Hogar_deco"
                                        name="Preferencias"
                                        value="Hogar_deco"
                                        onChange={this.handleChangePreferencias}
                                    />
                                    <label htmlFor="Hogar_deco">Hogar y decoración</label><br></br>

                                    <input className="inputTipo"
                                        type="checkbox"
                                        id="Juguetes"
                                        name="Preferencias"
                                        value="Juguetes"
                                        onChange={this.handleChangePreferencias}
                                    />
                                    <label htmlFor="Juguetes">Juguetes</label><br></br>

                                    <input className="inputTipo"
                                        type="checkbox"
                                        id="Entretenimiento"
                                        name="Preferencias"
                                        value="Entretenimiento"
                                        onChange={this.handleChangePreferencias}
                                    />
                                    <label htmlFor="Entretenimiento">Entretenimiento</label><br></br>

                                </div>

                                <div className="col-3">

                                    <input className="inputTipo"
                                        type="checkbox"
                                        id="Autos"
                                        name="Preferencias"
                                        value="Autos"
                                        onChange={this.handleChangePreferencias}
                                    />
                                    <label htmlFor="Autos">Autos</label><br></br>

                                    <input className="inputTipo"
                                        type="checkbox"
                                        id="Opticas"
                                        name="Preferencias"
                                        value="Opticas"
                                        onChange={this.handleChangePreferencias}
                                    />
                                    <label htmlFor="Opticas">Opticas</label><br></br>

                                    <input className="inputTipo"
                                        type="checkbox"
                                        id="Salud_belleza"
                                        name="Preferencias"
                                        value="Salud_belleza"
                                        onChange={this.handleChangePreferencias}
                                    />
                                    <label htmlFor="Salud_belleza">Salud y belleza</label><br></br>

                                    <input className="inputTipo"
                                        type="checkbox"
                                        id="Comida"
                                        name="Preferencias"
                                        value="Comida"
                                        onChange={this.handleChangePreferencias}
                                    />
                                    <label htmlFor="Comida">Comida</label><br></br>
                                </div>

                                <div className="col-3">
                                    <input className="inputTipo"
                                        type="checkbox"
                                        id="Libros"
                                        name="Preferencias"
                                        value="Libros"
                                        onChange={this.handleChangePreferencias}
                                    />
                                    <label htmlFor="Libros">Libros</label><br></br>

                                    <input className="inputTipo"
                                        type="checkbox"
                                        id="Viajes_turismo"
                                        name="Preferencias"
                                        value="Viajes_turismo"
                                        onChange={this.handleChangePreferencias}
                                    />
                                    <label htmlFor="Viajes_turismo">Viajes y turismo</label><br></br>

                                    <input className="inputTipo"
                                        type="checkbox"
                                        id="Vestimenta"
                                        name="Preferencias"
                                        value="Vestimenta"
                                        onChange={this.handleChangePreferencias}
                                    />
                                    <label htmlFor="Vestimenta">Vestimenta</label><br></br>

                                    <input className="inputTipo"
                                        type="checkbox"
                                        id="Joyas"
                                        name="Preferencias"
                                        value="Joyas"
                                        onChange={this.handleChangePreferencias}
                                    />
                                    <label htmlFor="Joyas">Joyas</label><br></br>
                                </div>
                            </div>

                            <center>
                                <button type="submit" className="btnPrimario">Registrarse</button>
                            </center>

                        </div>

                    </form>
                </div >
            </Fragment >
        )
    }
}

export default RegisterContent;