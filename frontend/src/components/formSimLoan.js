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
                <form onSubmit={this.handleSumbit}>
                    <h2>Simulador de préstamos</h2>
                    <p>Ingreso:</p>
                    <input
                        type="number"
                        name="Ingreso" placeholder="Agregar en $U"
                        value={this.state.Ingreso}
                        onChange={this.handleChange}
                        required />
                    <p>Monto a Pedir:</p>
                    <input
                        type="number"
                        name="Monto_a_pedir"
                        placeholder="Agregar Monto"
                        value={this.state.Monto_a_pedir}
                        onChange={this.handleChange}
                        required /><br />

                    <p>Moneda del Préstamo</p>
                    <input
                        type="radio"
                        id="Moneda_U$S"
                        name="Moneda"
                        value={this.state.Moneda_U$S}
                    />
                    <label for="Moneda_U$S">U$S</label>

                    <input
                        type="radio"
                        id="Moneda_$U"
                        name="Moneda"
                        value={this.state.Moneda_$U}

                    />
                    <label for="Moneda_$U">$U</label><br />

                    <p>Moneda del Préstamo</p>

                    <input
                        type="checkbox"
                        id="Inmueble"
                        name="TipoDePrestamo"
                        value={this.state.Inmueble}

                    />
                    <label for="Inmueble">Inmueble</label><br />

                    <input
                        type="checkbox"
                        id="Automotor"
                        name="TipoDePrestamo"
                        value={this.state.Automotor}

                    />
                    <label for="Automotor">Automotor</label><br />

                    <input
                        type="checkbox"
                        id="Otros"
                        name="TipoDePrestamo"
                        value={this.state.Otros}

                    />
                    <label for="Otros">Otros</label><br />

                </form>
                <button class="btn-ingresar" type="submit"> Simular Prestamo</button>
            </div>
        )
    }
}
export default SimLoan;