import React, { Component } from 'react';
import axios from 'axios';

class RegisterContent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Ingreso: '',
            Monto_a_pedir: '',

            Moneda_$U: false,
            Moneda_U$S: false,
            TipoMoneda: '',

            financiacion: '',

            TipoDePrestamoInmueble: false,
            TipoDePrestamoAutomotor: false,
            TipoDePrestamoOtros: false,

            errors: {}
        }
        //this.handleChange = this.handleChange.bind(this)
        //this.handleSumbit = this.handleSumbit.bind(this)
    }

    render() {
        const { errors } = this.state
        return (
            <div>
                <div className="form">
                    <form onSubmit={this.handleSumbit}>
                        <h1 className="titleForm">Simulador de préstamos</h1>

                        <p>Nombres*</p>
                        <input className="Ingreso"
                            autoComplete="off"
                            type="text"
                            name="Ingreso"
                            //value={this.state.Ingreso}
                            onChange={this.handleChange}
                            required
                        />

                        <p>Apellidos*</p>
                        <input className="Ingreso"
                            autoComplete="off"
                            type="text"
                            name="Ingreso"
                            //value={this.state.Ingreso}
                            onChange={this.handleChange}
                            required
                        />

                        <p>Fecha de nacimiento*</p>
                        <input className="Ingreso"
                            autoComplete="off"
                            type="date"
                            name="Ingreso"
                            //value={this.state.Ingreso}
                            onChange={this.handleChange}
                            required
                        />

                        <p>Email*</p>
                        <input className="Ingreso"
                            autoComplete="off"
                            type="text"
                            name="Ingreso"
                            //value={this.state.Ingreso}
                            onChange={this.handleChange}
                            required
                        />

                        <p>Contraseña*</p>
                        <input className="Ingreso"
                            autoComplete="off"
                            type="password"
                            name="Ingreso"
                            //value={this.state.Ingreso}
                            onChange={this.handleChange}
                            required
                        />

                        <p>Confirmación de contraseña*</p>
                        <input className="Ingreso"
                            autoComplete="off"
                            type="number"
                            name="Ingreso"
                            //value={this.state.Ingreso}
                            onChange={this.handleChange}
                            required
                        />

                        <p>Departamento*</p>
                        <select className="inputAños" name="financiacion" value={this.state.financiacion} onChange={this.handleChange}>
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
                            //onChange={this.checkboxChange}
                            //checked={this.state.Moneda_U$S}
                        />

                        <label htmlFor="Femenino">Femenino</label>

                        <input
                            type="radio"
                            id="Masculino"
                            name="Genero"
                            //onChange={this.checkboxChange}
                            //checked={this.state.Moneda_$U}
                        />
                        <label htmlFor="Masculino">Masculino</label>

                        <input
                            type="radio"
                            id="Otro"
                            name="Genero"
                            //onChange={this.checkboxChange}
                            //checked={this.state.Moneda_$U}
                        />
                        <label htmlFor="Otro">Otro</label>

                        <p>Monto a Pedir($U)*</p>
                        <input className="inputMonto"
                            autoComplete="off"
                            type="number"
                            name="Monto_a_pedir"
                            placeholder="Agregar Monto"
                            value={this.state.Monto_a_pedir}
                            onChange={this.handleChange}
                        //required 
                        />
                        <label className="error">{errors.Monto_a_pedir}</label>

                        <br />

                        <p>Preferencias</p>
                        <input className="inputTipo"
                            type="checkbox"
                            id="Inmuebles"
                            name="Preferencias"
                            onChange={this.checkboxChange}
                            checked={this.state.TipoDePrestamoInmueble}
                        />
                        <label htmlFor="Inmuebles">Inmuebles</label><br></br>

                        <input className="inputTipo"
                            type="checkbox"
                            id="Hogar_deco"
                            name="Preferencias"
                            onChange={this.checkboxChange}
                            checked={this.state.TipoDePrestamoAutomotor}
                        />
                        <label htmlFor="Hogar_deco">Hogar y decoración</label><br></br>

                        <input className="inputTipo"
                            type="checkbox"
                            id="Juguetes"
                            name="Preferencias"
                            onChange={this.checkboxChange}
                            checked={this.state.TipoDePrestamoOtros}
                        />
                        <label htmlFor="Juguetes">Juguetes</label><br></br>

                        <input className="inputTipo"
                            type="checkbox"
                            id="Entretenimiento"
                            name="Preferencias"
                            onChange={this.checkboxChange}
                            checked={this.state.TipoDePrestamoOtros}
                        />
                        <label htmlFor="Entretenimiento">Entretenimiento</label><br></br>

                        <input className="inputTipo"
                            type="checkbox"
                            id="Autos"
                            name="Preferencias"
                            onChange={this.checkboxChange}
                            checked={this.state.TipoDePrestamoOtros}
                        />
                        <label htmlFor="Autos">Autos</label><br></br>

                        <input className="inputTipo"
                            type="checkbox"
                            id="Opticas"
                            name="Preferencias"
                            onChange={this.checkboxChange}
                            checked={this.state.TipoDePrestamoOtros}
                        />
                        <label htmlFor="Opticas">Opticas</label><br></br>

                        <input className="inputTipo"
                            type="checkbox"
                            id="Salud_belleza"
                            name="Preferencias"
                            onChange={this.checkboxChange}
                            checked={this.state.TipoDePrestamoOtros}
                        />
                        <label htmlFor="Salud_belleza">Salud y belleza</label><br></br>

                        <input className="inputTipo"
                            type="checkbox"
                            id="Comida"
                            name="Preferencias"
                            onChange={this.checkboxChange}
                            checked={this.state.TipoDePrestamoOtros}
                        />
                        <label htmlFor="Comida">Comida</label><br></br>

                        <input className="inputTipo"
                            type="checkbox"
                            id="Libros"
                            name="Preferencias"
                            onChange={this.checkboxChange}
                            checked={this.state.TipoDePrestamoOtros}
                        />
                        <label htmlFor="Libros">Libros</label><br></br>

                        <input className="inputTipo"
                            type="checkbox"
                            id="Viajes_turismo"
                            name="Preferencias"
                            onChange={this.checkboxChange}
                            checked={this.state.TipoDePrestamoOtros}
                        />
                        <label htmlFor="Viajes_turismo">Viajes y turismo</label><br></br>

                        <input className="inputTipo"
                            type="checkbox"
                            id="Vestimenta"
                            name="Preferencias"
                            onChange={this.checkboxChange}
                            checked={this.state.TipoDePrestamoOtros}
                        />
                        <label htmlFor="Vestimenta">Vestimenta</label><br></br>

                        <input className="inputTipo"
                            type="checkbox"
                            id="Joyas"
                            name="Preferencias"
                            onChange={this.checkboxChange}
                            checked={this.state.TipoDePrestamoOtros}
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