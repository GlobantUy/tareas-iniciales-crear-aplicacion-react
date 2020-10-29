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
                <header>
                    <h1>STB Bank Logo </h1>
                    <button type="submit"> Ingresar</button>
                </header>

                <form onSubmit={this.handleSumbit}>
                    <h2>SIMULADOR DE PRÉSTAMO</h2>
                    <p>Ingreso:</p>
                    <input
                        type="text"
                        name="Ingreso" placeholder="Agregar en $U"
                        value={this.state.email}
                        onChange={this.handleChange}
                        required />
                    <p>Monto a Pedir:</p>
                    <input
                        type="text"
                        name="Monto_a_pedir"
                        placeholder="Agregar Monto"
                        value={this.state.password}
                        onChange={this.handleChange}
                        required />
                    <p>Moneda del Préstamo</p>
                    <input
                        type="radio"
                        id="Moneda_U$S"
                        name="Moneda_U$S"
                        value={this.state.Moneda_U$S}
                    />
                    <label for="Moneda_U$S">U$S</label>
                    <input
                        type="radio"
                        id="Moneda_$U"
                        name="Moneda_$U"
                        value={this.state.Moneda_$U}
                       
                    />
                    <label for="Moneda_$U">$U</label><br></br>
                </form>
                <button type="submit"> Simular Prestamo</button>
            </div>
        )
    }
}
export default SimLoan;