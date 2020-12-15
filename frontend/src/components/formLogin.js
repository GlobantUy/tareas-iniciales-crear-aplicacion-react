<<<<<<< HEAD
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
                    <a href="http://localhost:3000/registro" target="_blank"><button className="btnSecundario" >Registrarse</button></a>
                </div>
            </div>

        )
    }
}
=======
import React, { Component, } from 'react';
import { Formik } from 'formik';
import axios from 'axios';

let rol
let errorPass = true
let mailCorrecto = false
let contraCorrecta = false
class SimLogin extends Component {

    constructor(props) {
        super(props)
    }

    redireccionar() {
        if (rol == "CUSTOMER") {
            window.location.href = "/"

        } else if (rol == "ADMIN") {
            window.location.href = "/registro"

        } else {
            if (mailCorrecto == false && contraCorrecta == false){
                errorPass = false
            }
        }
    }

    post(email, pass) {
        axios.post('http://localhost:8000/login', {
            "email": email,
            "passwd": pass,
        },
        )
            .then(Response => {

                console.log("post realizado correctamente", Response)

                if (Response.data.found == undefined) {
                    rol = Response.data.Rol;
                    if (rol == "CUSTOMER") {
                        console.log(rol)
                        this.redireccionar()
                    } else {
                        console.log(rol)
                        this.redireccionar()
                    }
                } else {
                    console.log(Response.data.found)
                    this.redireccionar()
                }
            })
            .catch(error => {
                console.log("Error al iniciar sesion", error)
            });
    }


    render() {
        return (
            <div className="formLogin">
                <h1>Ingreso</h1>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validate={values => {
                        const errors = {};

                        if (!values.password) {
                            contraCorrecta = true
                            errors.password = 'Ingrese contraseña';
                            if (!values.email) {
                                mailCorrecto = true
                                errors.email = 'Ingrese mail';
                            } else if (
                                !/^[A-Z0-9.%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i.test(values.email)
                            ) {
                                mailCorrecto = true
                                errors.email = 'El formato del email ingresado no es correcto, por favor verifique';
                            } else {
                                mailCorrecto = false
                            }

                        } else {
                            contraCorrecta = false
                            if (errorPass == false) {
                                errors.password = "La contraseña o el Mail son incorrectos";
                                errorPass = true
                            }

                            if (!values.email) {
                                mailCorrecto = true
                                errors.email = 'Ingrese mail';
                            } else if (
                                !/^[A-Z0-9.%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i.test(values.email)
                            ) {
                                mailCorrecto = true
                                errors.email = 'El formato del email ingresado no es correcto, por favor verifique';
                            } else {
                                mailCorrecto = false
                            }
                        }

                        return errors;
                    }}


                    onSubmit={(values, { setSubmitting }) => {
                        if (mailCorrecto == false && contraCorrecta == false) {
                            this.post(values.email, values.password)
                            this.redireccionar
                        }
                        setSubmitting(false);
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                    }) => (
                            <form onSubmit={handleSubmit}>
                                <p>Email *</p>
                                <input className="inputIngreso"
                                    type="text"
                                    name="email"
                                    autoComplete="off"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                />
                                { touched.email && <label className="error">{errors.email}</label>}

                                <p>Contraseña *</p>
                                <input className="inputIngreso"
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                />
                                { touched.password && <label className="error">{errors.password}</label>}


                                <a href="/empty" type="submit"><p className="recContr"> Recuperar contraseña</p></a>
                                <button className="btnPrimario" type="submit" disabled={isSubmitting} onKeyDown={handleSubmit} onClick={handleSubmit}  >
                                    Ingresar
                        </button><br />
                            </form>
                        )}
                </Formik>
                <a href="http://localhost:3000/registro" target="_blank"><button className="btnSecundario">Registrarse</button></a>

            </div>
        )
    }

}

>>>>>>> 95ca8b70199d1963a16526c7ffc55c0e1375b886
export default SimLogin;
