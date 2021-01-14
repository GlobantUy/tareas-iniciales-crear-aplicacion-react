import React, { Component } from 'react';
import axios from 'axios';

const validate = values => {
    const errors = {}
    if (!values.Ingreso) {
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

let emailFromStorage
let currency = ''
class SimLoan extends Component {
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

            registrationErrors: '',

            errors: {}
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSumbit = this.handleSumbit.bind(this)
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    checkboxChange = (e) => {
        switch (e.target.name) {
            case 'TipoDePrestamoInmueble':
                this.setState({
                    TipoDePrestamoInmueble: !this.state.TipoDePrestamoInmueble
                })
                break;
            case 'TipoDePrestamoAutomotor':
                this.setState({
                    TipoDePrestamoAutomotor: !this.state.TipoDePrestamoAutomotor
                })
                break;
            case 'TipoDePrestamoOtros':
                this.setState({
                    TipoDePrestamoOtros: !this.state.TipoDePrestamoOtros
                })
                break;
            case 'Moneda':
                if (e.target.id == 'Moneda_$U') {
                    currency = '$U'
                    this.setState({
                        Moneda_$U: !this.state.Moneda_$U,
                        Moneda_U$S: false,
                        TipoMoneda: currency
                    })

                } else {
                    currency = 'U$S'
                    this.setState({
                        Moneda_U$S: !this.state.Moneda_U$S,
                        Moneda_$U: false,
                        TipoMoneda: currency
                    })
                }
                break;
            default:
                break;
        }
    }

    handleSumbit(e) {
        e.preventDefault();
        sessionStorage.setItem('prestamoValues', JSON.stringify(this.state));
        sessionStorage.setItem('volverBoton', false);
        const {
            Ingreso,
            Monto_a_pedir,
            financiacion,
            TipoDePrestamoInmueble,
            TipoDePrestamoAutomotor,
            TipoDePrestamoOtros
        } = this.state;

        const { errors, ...sinErrors } = this.state
        const result = validate(sinErrors)
        this.setState({ errors: result })
        if (!Object.keys(result).length) {
            console.log('enviar formulario')
            window.location.href = '/Descuento'
        }

        axios.post('http://localhost:3000/api/hello', {
            user: {
                Ingreso: this.state.Ingreso,
                Monto_a_pedir: this.state.Monto_a_pedir,
                financiacion: this.state.financiacion,
                TipoDePrestamoInmueble: this.state.TipoDePrestamoInmueble,
                TipoDePrestamoAutomotor: this.state.TipoDePrestamoAutomotor,
                TipoDePrestamoOtros: this.state.TipoDePrestamoOtros,
            }
        },
            { withCredentials: true }
        )
            .then(Response => {
                console.log("registration res", Response)
                if (!Object.keys(result).length) {
                    window.location.href = 'http://localhost:3000/Descuento'
                }
            })
            .catch(error => {
                console.log("registration error", error)
            });
    }

    componentDidMount() {
        const volverTue = JSON.parse(sessionStorage.getItem('volverBoton'));
        if (volverTue) {
            this.setState({
                Ingreso: JSON.parse(sessionStorage.getItem('prestamoValues')).Ingreso,
                Monto_a_pedir: JSON.parse(sessionStorage.getItem('prestamoValues')).Monto_a_pedir,

                Moneda_$U: JSON.parse(sessionStorage.getItem('prestamoValues')).Moneda_$U,
                Moneda_U$S: JSON.parse(sessionStorage.getItem('prestamoValues')).Moneda_U$S,

                financiacion: JSON.parse(sessionStorage.getItem('prestamoValues')).financiacion,

                TipoDePrestamoInmueble: JSON.parse(sessionStorage.getItem('prestamoValues')).TipoDePrestamoInmueble,
                TipoDePrestamoAutomotor: JSON.parse(sessionStorage.getItem('prestamoValues')).TipoDePrestamoAutomotor,
                TipoDePrestamoOtros: JSON.parse(sessionStorage.getItem('prestamoValues')).TipoDePrestamoOtros,
            })
        }
    }

    render() {
        const { errors } = this.state
        return (
            <div>
                <h1 className="titleForm">Simulador de préstamos</h1>

                <div className="form">
                    <form onSubmit={this.handleSumbit}>

                        <p>Ingreso($U)*</p>
                        <input className="Ingreso"
                            autoComplete="off"
                            type="number"
                            min="1"
                            name="Ingreso"
                            placeholder="Agregar en $U"
                            value={this.state.Ingreso}
                            onChange={this.handleChange}
                        />
                        <label className="error">{errors.Ingreso}</label>

                        <p>Moneda del Préstamo</p>
                        <input
                            type="radio"
                            id="Moneda_U$S"
                            name="Moneda"
                            onChange={this.checkboxChange}
                            checked={this.state.Moneda_U$S}
                        />

                        <label htmlFor="Moneda_U$S">U$S</label>

                        <div className="inputPesos">
                            <input
                                type="radio"
                                id="Moneda_$U"
                                name="Moneda"
                                onChange={this.checkboxChange}
                                checked={this.state.Moneda_$U}
                            />
                            <label htmlFor="Moneda_$U">$U</label>
                        </div>

                        <p>Monto a Pedir($U)*</p>
                        <input className="inputMonto"
                            autoComplete="off"
                            type="number"
                            min="1"
                            name="Monto_a_pedir"
                            placeholder="Agregar Monto"
                            value={this.state.Monto_a_pedir}
                            onChange={this.handleChange}
                        />
                        <label className="error">{errors.Monto_a_pedir}</label>


                        <p>Años de financiación*</p>
                        <select className="inputAños" name="financiacion" value={this.state.financiacion} onChange={this.handleChange}>
                            <option hidden>Selecciona una opción</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                            <option value="25">25</option>
                        </select>
                        <label htmlFor=""></label>

                        <p>Tipo de préstamo</p>
                        <input className="inputTipo"
                            type="checkbox"
                            value="Inmuebles"
                            id="Inmuebles"
                            name="TipoDePrestamoInmueble"
                            onChange={this.checkboxChange}
                            checked={this.state.TipoDePrestamoInmueble}
                        />
                        <label className="label-tipo" htmlFor="Inmuebles">Inmuebles</label><br></br>

                        <input className="inputTipo"
                            type="checkbox"
                            value="Automotor"
                            id="Automotor"
                            name="TipoDePrestamoAutomotor"
                            onChange={this.checkboxChange}
                            checked={this.state.TipoDePrestamoAutomotor}
                        />
                        <label className="label-tipo" htmlFor="Automotor">Automotor</label><br></br>

                        <input className="inputTipo"
                            type="checkbox"
                            value="Otros"
                            id="Otros"
                            name="TipoDePrestamoOtros"
                            onChange={this.checkboxChange}
                            checked={this.state.TipoDePrestamoOtros}
                        />
                        <label className="label-tipo" htmlFor="Otros">Otros</label><br></br>

                        <button className="btnPrimario">Simular préstamo</button>

                    </form>
                </div>
            </div>
        )
    }
}

export default SimLoan;
