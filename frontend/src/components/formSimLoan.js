import React, { Component } from 'react';
import axios from 'axios';
import LoadingSpinner from './Spinner';
import ReactTooltip from 'react-tooltip';

let emailFromStorage
let currency = ''
class SimLoan extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
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
            btn: 'btnPrimarioDisabled',
            btnst: true,
            errors: {}
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSumbit = this.handleSumbit.bind(this)
    }

    validacion = () => {
        const error = {}
        if (!this.state.Ingreso) {
            error.Ingreso = true
        }
        if (!this.state.Moneda_$U && !this.state.Moneda_U$S) {
            error.moneda = true
        }
        if (!this.state.Monto_a_pedir) {
            error.Monto_a_pedir2 = true
        }
        let porcentaje = (0.2) * (this.state.Ingreso)
        let monto = this.state.Monto_a_pedir
        if (monto > porcentaje) {
            error.Monto_a_pedir = 'El monto solicitado excede el 20% de sus ingresos.'
        }
        if (!this.state.financiacion) {
            error.financiacion = true
        }
        this.setState({ errors: error })
        if (!Object.keys(error).length) {
            this.setState({ 
                btn: 'btnPrimario',
                btnst: false
            })
        }else{
            this.setState({ 
                btn: 'btnPrimarioDisabled',
                btnst: true
            })
        }
    }

    async handleChange(e) {
        const { name, value } = e.target;
        await this.setState({ [name]: value })
        this.validacion()
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
                    this.validacion()
                } else {
                    currency = 'U$S'
                    this.setState({
                        Moneda_U$S: !this.state.Moneda_U$S,
                        Moneda_$U: false,
                        TipoMoneda: currency
                    })
                    this.validacion()
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

        this.setState({ loading: true }, () => {
            axios.post(process.env.RESTURL_BACKEND + '/storeLoan', {
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
                    this.setState({ loading: false })
                        window.location.href = process.env.RESTURL_FRONTEND + '/Descuento';
                })
                .catch(error => {
                    console.log("registration error", error)
                });
        })
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
        const { loading } = this.state;
        return (
            <div>
                <h1 className="titleForm">Simulador de préstamos</h1>
                <div className="form">
                {loading ? <LoadingSpinner /> : <div />}
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
                            data-for="error-sim"
                            data-tip="Este campo es obligatorio."
                        />

                        <p >Moneda del Préstamo*</p>
                        <div className="inputPesos">
                        <input
                            type="checkbox"
                            id="Moneda_U$S"
                            name="Moneda"
                            onChange={this.checkboxChange}
                            checked={this.state.Moneda_U$S}
                        />
                        <label data-for="error-sim"
                            data-tip="Este campo es obligatorio." htmlFor="Moneda_U$S"></label>
                            <span>U$S</span>
                        </div>
                        <div className="inputPesos">
                            <input
                                type="checkbox"
                                id="Moneda_$U"
                                name="Moneda"
                                onChange={this.checkboxChange}
                                checked={this.state.Moneda_$U}
                            />
                            <label data-for="error-sim"
                                data-tip="Este campo es obligatorio." htmlFor="Moneda_$U"></label>
                                <span>$U</span>
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
                            data-for="error-sim"
                            data-tip="Este campo es obligatorio."
                        />

                        <label className="error-bottom">{errors.Monto_a_pedir}</label>

                        <p>Años de financiación*</p>
                        <select className="inputPlazo"
                            name="financiacion"
                            value={this.state.financiacion}
                            onChange={this.handleChange}
                            data-for="error-sim"
                            data-tip="Este campo es obligatorio.">
                            <option hidden>Selecciona una opción</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                            <option value="25">25</option>
                        </select>

                        <p>Tipo de préstamo</p>
                        <div className="checkType">
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
                        </div>
                        <button className={this.state.btn} disabled={this.state.btnst}>Simular préstamo</button>

                    </form>
                </div>

            </div>
        )
    }
}

export default SimLoan;
