import React, { Component } from 'react';
import axios from 'axios';


class SimLoan extends Component {
    constructor(props) {
        super(props)

        this.state = {
            Ingreso: '',
            Monto_a_pedir: '',

            Moneda_$U: false,
            Moneda_U$S: false,

            financiacion: '',

            TipoDePrestamoInmueble: false,
            TipoDePrestamoAutomotor: false,
            TipoDePrestamoOtros: false,

            registrationErrors: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSumbit = this.handleSumbit.bind(this)
    }

    handleChange = (e) => {
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
                    this.setState({
                        Moneda_$U: !this.state.Moneda_$U,
                        Moneda_U$S: false
                    })
                } else {
                    this.setState({
                        Moneda_U$S: !this.state.Moneda_U$S,
                        Moneda_$U: false
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
                window.location.href = 'http://localhost:3000/Descuento'            })
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
        return (
            <div>
                <div className="form">
                    <form onSubmit={this.handleSumbit}>
                        <h1 className="titleForm">Simulador de prestamos</h1>
                        <p>Ingreso($U)</p>
                        <input className="inputIngreso"
                            type="number"
                            name="Ingreso" placeholder="Agregar en $U"
                            value={this.state.Ingreso}
                            onChange={this.handleChange}
                            required />
                        <p>Monto a Pedir($U)</p>
                        <input className="inputMonto"
                            type="number"
                            name="Monto_a_pedir"
                            placeholder="Agregar Monto"
                            value={this.state.Monto_a_pedir}
                            onChange={this.handleChange}
                            required /><br />

                        <p>Moneda del Préstamo</p>
                        <input className="inputPesos"
                            type="radio"
                            id="Moneda_U$S"
                            name="Moneda"
                            onChange={this.checkboxChange}
                            checked={this.state.Moneda_U$S}

                        />
                        <label htmlFor="Moneda_U$S">U$S</label>

                        <input className="inputPesos"
                            type="radio"
                            id="Moneda_$U"
                            name="Moneda"
                            onChange={this.checkboxChange}
                            checked={this.state.Moneda_$U}

                        />
                        <label htmlFor="Moneda_$U">$U</label><br />

                        <p>Años de financiación</p>
                        <select className="inputAños" name="financiacion" value={this.state.financiacion} onChange={this.handleChange}>
                            <option hidden>Selecciona una opción</option>
                            <option value="1">10</option>
                            <option value="2">15</option>
                            <option value="3">20</option>
                            <option value="4">25</option>
                            <option value="5">30</option>
                        </select>
                        <label htmlFor=""></label>

                        <p>Tipo de préstamo</p>
                        <input className="inputTipo"
                            type="checkbox"
                            id="Inmuebles"
                            name="TipoDePrestamoInmueble"
                            onChange={this.checkboxChange}
                            checked={this.state.TipoDePrestamoInmueble}
                        />
                        <label htmlFor="Inmuebles">Inmuebles</label><br></br>

                        <input className="inputTipo"
                            type="checkbox"
                            id="Automotor"
                            name="TipoDePrestamoAutomotor"
                            onChange={this.checkboxChange}
                            checked={this.state.TipoDePrestamoAutomotor}

                        />
                        <label htmlFor="Automotor">Automotor</label><br></br>

                        <input className="inputTipo"
                            type="checkbox"
                            id="Otros"
                            name="TipoDePrestamoOtros"
                            onChange={this.checkboxChange}
                            checked={this.state.TipoDePrestamoOtros}
                        />
                        <label htmlFor="Otros">Otros</label><br></br>

                        <button  className="btnPrimario">Simular prestamo</button>
                    </form>

                </div>
            </div>
        )
    }
}
export default SimLoan;