import React, { Component, } from 'react';
import { Formik } from 'formik';
import axios from 'axios';

let datosIncorrectos = 'Los datos ingresados no son correctos, por favor verifique'
var btn = "btnPrimarioDisabled";
let rol
let errorPass = true
let mailCorrecto = false
let contraCorrecta = false
let emaill
let passwordd
let URL = process.env.RESTURL_BACKEND + '/login'
// "https://backendmain-o2ub8kmbw.vercel.app/api/login"
let URLreturnpres = process.env.RESTURL_BACKEND + '/returnLoans'
// "https://backendmain-o2ub8kmbw.vercel.app/api/returnLoans"

class SimLogin extends Component {

    constructor(props) {
        super(props)
    }
    redireccionar() {
        const volverSolicitar = JSON.parse(sessionStorage.getItem('volverAceptarpress'));
        if (volverSolicitar) {
            this.guardarStorage(emaill, passwordd)
            window.location.href = "/Descuento"
            sessionStorage.setItem('volverAceptarpress', false);
        } else {
            if (rol == "CUSTOMER") {
                window.location.href = "/"
                this.guardarStorage(emaill, passwordd)
            } else if (rol == "ADMIN") {
                window.location.href = "/Tableadmin"
                this.guardarStorage(emaill, passwordd)
            } else {
                if (mailCorrecto == false && contraCorrecta == false) {
                    errorPass = false
                }
            }
        }
    }

    mostrarError = () => {
        let element = document.getElementById("datosIncorrectos")
        element.className += ' encontrado'
    }

    quitarError = () => {
        let element
        if (element = document.getElementById("datosIncorrectos")) {
            element.className = 'no-encontrado'
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
                    this.quitarError()
                    if (rol == "CUSTOMER") {
                        console.log(rol)
                        this.redireccionar()
                    } else {
                        console.log(rol)
                        axios.post(URLreturnpres, {
                            "email": emaill
                        }).then(res => {
                            console.log(res.data.loans)
                            if (res.data.loans == undefined) {
                                sessionStorage.setItem('prestamosNull', false);
                                this.redireccionar()
                            } else {
                                sessionStorage.setItem('prestamosNull', true);
                                sessionStorage.setItem('prestamos', JSON.stringify(res.data.loans));

                                this.redireccionar()
                            }
                        })

                    }
                } else {
                    console.log(Response.data.found)
                    this.mostrarError()
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
                            errors.password = 'Necesario';
                            mailCorrecto = true;
                            if (!values.email) {
                                errors.email = 'Necesario';
                            } else if (
                                !/^[A-Z0-9.%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i.test(values.email)
                            ) {
                                errors.email = 'Formato invalido';
                                mailCorrecto = true;
                            } else {
                                mailCorrecto = true;
                            }

                        } else {
                            passwordd = values.password
                            contraCorrecta = false;

                            if (errorPass == false) {
                                datosIncorrectos = "Los datos ingresados no son correctos, por favor verifique";
                                errorPass = true
                            }
                            if (!values.email) {
                                errors.email = '';
                                mailCorrecto = true;
                            } else if (
                                !/^[A-Z0-9.%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i.test(values.email)
                            ) {
                                errors.email = 'Formato invalido';
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

                            { touched.password && <p id="datosIncorrectos" className="no-encontrado ">{datosIncorrectos}</p>}

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
