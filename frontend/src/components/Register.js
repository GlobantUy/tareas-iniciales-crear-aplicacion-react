import React, { Component } from 'react';
import axios from 'axios';

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
            Preferencias: '',

            errors: {}
        }
        this.handleChange = this.handleChange.bind(this)
        //this.handleSumbit = this.handleSumbit.bind(this)
    }

    handleChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
    console.log(this.state.Nombre)
    }

    render() {
        const { errors } = this.state
        return (
            <div>
                <div className="form">
                    <form onSubmit={this.handleSumbit}>
                        <h1 className="titleForm">Registro</h1>

                        <p>Nombres*</p>
                        <input className="Ingreso"
                            autoComplete="off"
                            type="text"
                            name="Nombre"
                            value={this.state.Nombre}
                            onChange={this.handleChange}
                            required
                        />

                        <p>Apellidos*</p>
                        <input className="Ingreso"
                            autoComplete="off"
                            type="text"
                            name="Apellido"
                            value={this.state.Apellido}
                            onChange={this.handleChange}
                            required
                        />

                        <p>Fecha de nacimiento*</p>
                        <input className="Ingreso"
                            autoComplete="off"
                            type="date"
                            name="FechaNacimiento"
                            value={this.state.FechaNacimiento}
                            onChange={this.handleChange}
                            required
                        />

                        <p>Email*</p>
                        <input className="Ingreso"
                            autoComplete="off"
                            type="text"
                            name="Email"
                            value={this.state.Email}
                            onChange={this.handleChange}
                            required
                        />

                        <p>Contraseña*</p>
                        <input className="Ingreso"
                            autoComplete="off"
                            type="password"
                            name="Password"
                            value={this.state.Password}
                            onChange={this.handleChange}
                            required
                        />

                        <p>Confirmación de contraseña*</p>
                        <input className="Ingreso"
                            autoComplete="off"
                            type="password"
                            name="ConfirmPassword"
                            value={this.state.ConfirmPassword}
                            onChange={this.handleChange}
                            required
                        />

                        <p>Departamento*</p>
                        <select className="inputAños" name="departamento" value={this.state.Departamento} onChange={this.handleChange}>
                            <option hidden>Selecciona una opción</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                            <option value="25">25</option>
                        </select>
                        <label htmlFor=""></label>

                        <p>Género*</p>
                        <input
                            type="radio"
                            id="Femenino"
                            name="Genero"
                            value="otro"
                            onChange={this.handleChange}
                            //checked={this.state.Moneda_U$S}
                        />

                        <label htmlFor="Femenino">Femenino</label>

                        <input
                            type="radio"
                            id="Masculino"
                            name="Genero"
                            value="otro"
                            onChange={this.handleChange}
                            //checked={this.state.Moneda_$U}
                        />
                        <label htmlFor="Masculino">Masculino</label>

                        <input
                            type="radio"
                            id="Otro"
                            name="Genero"
                            value="otro"
                            onChange={this.handleChange}
                            //checked={this.state.Moneda_$U}
                        />
                        <label htmlFor="Otro">Otro</label>

                        <p>Preferencias</p>
                        <input className="inputTipo"
                            type="checkbox"
                            id="Inmuebles"
                            name="Preferencias"
                            onChange={this.checkboxChange}
                            checked={this.state.Preferencias}
                        />
                        <label htmlFor="Inmuebles">Inmuebles</label><br></br>

                        <input className="inputTipo"
                            type="checkbox"
                            id="Hogar_deco"
                            name="Preferencias"
                            onChange={this.checkboxChange}
                            checked={this.state.Preferencias}
                        />
                        <label htmlFor="Hogar_deco">Hogar y decoración</label><br></br>

                        <input className="inputTipo"
                            type="checkbox"
                            id="Juguetes"
                            name="Preferencias"
                            onChange={this.checkboxChange}
                            checked={this.state.Preferencias}
                        />
                        <label htmlFor="Juguetes">Juguetes</label><br></br>

                        <input className="inputTipo"
                            type="checkbox"
                            id="Entretenimiento"
                            name="Preferencias"
                            onChange={this.checkboxChange}
                            checked={this.state.Preferencias}
                        />
                        <label htmlFor="Entretenimiento">Entretenimiento</label><br></br>

                        <input className="inputTipo"
                            type="checkbox"
                            id="Autos"
                            name="Preferencias"
                            onChange={this.checkboxChange}
                            checked={this.state.Preferencias}
                        />
                        <label htmlFor="Autos">Autos</label><br></br>

                        <input className="inputTipo"
                            type="checkbox"
                            id="Opticas"
                            name="Preferencias"
                            onChange={this.checkboxChange}
                            checked={this.state.Preferencias}
                        />
                        <label htmlFor="Opticas">Opticas</label><br></br>

                        <input className="inputTipo"
                            type="checkbox"
                            id="Salud_belleza"
                            name="Preferencias"
                            onChange={this.checkboxChange}
                            checked={this.state.Preferencias}
                        />
                        <label htmlFor="Salud_belleza">Salud y belleza</label><br></br>

                        <input className="inputTipo"
                            type="checkbox"
                            id="Comida"
                            name="Preferencias"
                            onChange={this.checkboxChange}
                            checked={this.state.Preferencias}
                        />
                        <label htmlFor="Comida">Comida</label><br></br>

                        <input className="inputTipo"
                            type="checkbox"
                            id="Libros"
                            name="Preferencias"
                            onChange={this.checkboxChange}
                            checked={this.state.Preferencias}
                        />
                        <label htmlFor="Libros">Libros</label><br></br>

                        <input className="inputTipo"
                            type="checkbox"
                            id="Viajes_turismo"
                            name="Preferencias"
                            onChange={this.checkboxChange}
                            checked={this.state.Preferencias}
                        />
                        <label htmlFor="Viajes_turismo">Viajes y turismo</label><br></br>

                        <input className="inputTipo"
                            type="checkbox"
                            id="Vestimenta"
                            name="Preferencias"
                            onChange={this.checkboxChange}
                            checked={this.state.Preferencias}
                        />
                        <label htmlFor="Vestimenta">Vestimenta</label><br></br>

                        <input className="inputTipo"
                            type="checkbox"
                            id="Joyas"
                            name="Preferencias"
                            onChange={this.checkboxChange}
                            checked={this.state.Preferencias}
                        />
                        <label htmlFor="Joyas">Joyas</label><br></br>


                        <button className="btnPrimario">Registrarse</button>

                    </form>
                </div>
            </div>
        )
    }
}

export default RegisterContent;