import React, { Component, } from 'react';
import { Formik } from 'formik';
import axios from 'axios';

var btn = "btnPrimarioDisabled";
let rol
let errorPass = true
let mailCorrecto = false
let contraCorrecta = false
let emaill
let passwordd
let URL = 'https://backendmain-lw9cfx37o.vercel.app/api/login'
const volverSolicitar = {}

class SimLogin extends Component {

    constructor(props) {
        super(props)
    }

    redireccionar() {
        if (volverSolicitar) {
            window.location.href = "/Descuento"
            this.guardarStorage(emaill, passwordd)
        } else {
            if (rol == "CUSTOMER") {
                window.location.href = "/"

                this.guardarStorage(emaill, passwordd)

            } else if (rol == "ADMIN") {
                window.location.href = "/registro"

            } else {
                if (mailCorrecto == false && contraCorrecta == false) {
                    errorPass = false
                }
            }
        }

    }

    post(email, pass) {
        axios.post(URL, {
            "email": email,
            "passwd": pass,
        },
        )
            .then(Response => {

                console.log("post realizado correctamente", Response)

                if (Response.data.found == undefined) {
                    rol = Response.data.rol;
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

    guardarStorage = (a, b) => {
        console.log('guardado correctamnete')
        this.values = {
            email: a,
            password: b
        }

        sessionStorage.setItem('Usuario-Values', JSON.stringify(this.values));

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
                            errors.password = '';
                            mailCorrecto = true;
                            if (!values.email) {
                                errors.email = 'Ingrese mail';
                            } else if (
                                !/^[A-Z0-9.%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i.test(values.email)
                            ) {
                                errors.email = 'El formato del email ingresado no es correcto, por favor verifique';
                                mailCorrecto = true;
                            } else {
                                mailCorrecto = true;
                            }

                        } else {
                            passwordd = values.password
                            contraCorrecta = false;

                            if (errorPass == false) {
                                errors.password = "La contraseña o el Mail son incorrectos";
                                errorPass = true
                            }

                            if (!values.email) {
                                errors.email = 'Ingrese mail';
                                mailCorrecto = true;
                            } else if (
                                !/^[A-Z0-9.%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i.test(values.email)
                            ) {
                                errors.email = 'El formato del email ingresado no es correcto, por favor verifique';
                                mailCorrecto = true;
                            } else {
                                emaill = values.email
                                mailCorrecto = false;
                            }
                        }

                        if (mailCorrecto && contraCorrecta == false) {
                            btn = "btnPrimarioDisabled"
                        } else {
                            btn = "btnPrimario"
                        }
                        return errors;
                    }}

                    onSubmit={(values, { setSubmitting }) => {
                        if (mailCorrecto == false && contraCorrecta == false) {
                            this.post(values.email, values.password)
                            volverSolicitar = JSON.parse(sessionStorage.getItem('volverAceptarpress'));
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

                            <button
                                className={btn}
                                type="submit"
                                disabled={isSubmitting}
                                onKeyDown={handleSubmit}
                                onClick={handleSubmit}  >
                                Ingresar
                        </button><br />
                        </form>
                    )}
                </Formik>
                <a href="/registro" target="_self"><button className="btnSecundario">Registrarse</button></a>

            </div>
        )
    }

}

export default SimLogin;
