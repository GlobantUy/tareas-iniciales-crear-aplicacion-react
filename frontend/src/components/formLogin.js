import React, { Component } from 'react';
import axios from 'axios';
import Link from 'next/link'
class SimLogin extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
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
            email,
            password,
        } = this.state;

        axios.post('http://localhost:3000/api/hello', {
            user: {
                email: this.state.email,
                password: this.state.password,

            }
        },
        )
            .then(Response => {
                console.log("ingreso res", Response)
            })
            .catch(error => {
                console.log("ingreso error", error)
            });
    }

    render() {
        return (
            <div>
                <div className="formLogin">
                    <form onSubmit={this.handleSumbit}>
                        <h1>Ingreso</h1>
                        <p>Email *</p>
                        <input className="inputIngreso"
                            autoComplete="off"
                            type="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            required />
                        <p>Contraseña *</p>
                        <input className="inputIngreso"
                            autoComplete="off"
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            required />
                        <Link href="/empty">
                            <a type="submit"><p className="recContr"> Recuperar contraseña</p></a>
                        </Link>
                        <Link href="/">
                            <a><button className="btnPrimario" type="submit"> Ingresar</button></a>
                        </Link>

                    </form><br />
                    <a href="http://localhost:3000/registro" target="_blank"><button className="btnSecundario">Registrarse</button></a>
                </div>
            </div>

        )
    }
}
export default SimLogin;
