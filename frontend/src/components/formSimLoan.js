import React, { Component } from 'react';
import axios from 'axios';


class SimLoan extends Component {
    constructor(props) {
        super(props)

        this.state = {
            Ingreso: '',
            Monto_a_pedir: '',
            registrationErrors: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSumbit = this.handleSumbit.bind(this)
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSumbit(e) {
        e.preventDefault();
        const {
            Ingreso,
            Monto_a_pedir,
        } = this.state;

        axios.post('http://localhost:3000/api/hello', {
            user: {
                Ingreso: this.state.Ingreso,
                Monto_a_pedir: this.state.Monto_a_pedir,

            }
        },
            { withCredentials: true }
        )
            .then(Response => {
                console.log("registration res", Response)
            })
            .catch(error => {
                console.log("registration error", error)
            });
    }

    render() {
        return (
            <div>
                <div className="form">
                    <form onSubmit={this.handleSumbit}>
                        <h1 className="titleForm">Simulador de prestamos</h1>
                        <p>Ingreso($U)*</p>
                        <input className="Ingreso"
                            autoComplete="off"
                            type="number"
                            name="Ingreso" placeholder="Agregar en $U"
                            value={this.state.Ingreso}
                            onChange={this.handleChange}
                            required />

                        <p>Moneda del Préstamo</p>
                        <input
                            type="radio"
                            id="Moneda_U$S"
                            name="Moneda"
                            value={this.state.Moneda_U$S}
                        />
                        <label htmlFor="Moneda_U$S">U$S</label>

                        <div className="inputPesos">
                            <input
                                type="radio"
                                id="Moneda_$U"
                                name="Moneda"
                                value={this.state.Moneda_$U}
                            />
                            <label htmlFor="Moneda_$U">$U</label>
                        </div>

                        <p>Monto a Pedir($U)*</p>
                        <input className="inputMonto"
                            autoComplete="off"
                            type="number"
                            name="Monto_a_pedir"
                            placeholder="Agregar Monto"
                            value={this.state.Monto_a_pedir}
                            onChange={this.handleChange}
                            required /><br />

                        <p>Años de financiación*</p>
                        <select className="inputAños" name="financiacion">
                            <option hidden>Selecciona una opción</option>
                            <option value="1">10</option>
                            <option value="2">15</option>
                            <option value="3">20</option>
                            <option value="4">25</option>
                            <option value="5">30</option>
                            value={this.state.financiacion}
                        </select>
                        <label htmlFor=""></label>

                        <p>Tipo de préstamo</p>
                        <input className="inputTipo"
                            type="checkbox"
                            id="Inmuebles"
                            name="TipoDePrestamo"
                            value={this.state.Inmuebles}
                        />
                        <label htmlFor="Inmuebles">Inmuebles</label><br></br>

                        <input className="inputTipo"
                            type="checkbox"
                            id="Automotor"
                            name="TipoDePrestamo"
                            value={this.state.Automotor}
                        />
                        <label htmlFor="Automotor">Automotor</label><br></br>

                        <input className="inputTipo"
                            type="checkbox"
                            id="Otros"
                            name="TipoDePrestamo"
                            value={this.state.Otros}
                        />
                        <label htmlFor="Otros">Otros</label><br></br>

                        <button type="submit" className="btnPrimario">Simular Prestamo</button>

                    </form>
                </div>
            </div>
        )
    }
}

export default SimLoan;
