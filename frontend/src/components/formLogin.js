import React, { Component } from 'react';
import axios from 'axios';

class SimLogin extends Component {
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
                    <h2>Ingreso</h2>
                    <p>Email*</p>
                    <input
                        type="email"
                        name="email"
                        placeholder="email@mail.com"
                        value={this.state.email}
                        onChange={this.handleChange}
                        required />
                    <p>Contraseña*</p>
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        required />
                    <a href="http://localhost:3000/empty" target="_blank">Recuperar contraseña</a>
                </form><br />
                <button type="submit"><a href="http://localhost:3000/empty" target="_blank">Ingresar</a></button><br />
                <button type="submit"><a href="http://localhost:3000/registro" target="_blank">Registrarse</a> </button>
            </div>
        )
    }
}
export default SimLogin;