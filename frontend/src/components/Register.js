import React, { Component, Fragment } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
let URL = 'https://backendmain-858cqrzs8.vercel.app/api/register'

const validate = values => {
    const errors = {}
    if (!values.Nombre) {
        errors.Ingreso = 'Este campo es obligatorio'
    }
    if (!values.Monto_a_pedir) {
        errors.Monto_a_pedir = 'Este campo es obligatorio'
    }

    let porcentaje = (0.2) * (values.Ingreso)
    let monto = values.Monto_a_pedir
    if ((monto > porcentaje) && (values.Ingreso > 0)) {
        errors.Monto_a_pedir = 'El monto a solicitar supera el 20% de su sueldo, por favor intente con un monto menor'
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

    validate = () => {
        /*
        //let nameError = ""; 
        //let apellidoError = ""; 
        //let emailError = "";
        //let passError = "";
        //let passConfirmError = "";
        //let generoError = "";
        //let preferenciasError = "";

        if (!this.state.Email.includes('@')) {
            emailError = "invalid email"
        }else{
            emailError = ""
        }

        if (emailError) {
            this.setState({
                EmailError: emailError
            });
            return false
        }*/
        return true
    }

    handleSumbit(e) {
        e.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            console.log(this.state)
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
                                        onChange={this.handleChange}
                                    />


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
                                    <div className="error">
                                        {this.state.EmailError}
                                    </div>

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
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-3">
                                    <p>Género*</p>
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
                                    <p>Preferencias*</p>
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