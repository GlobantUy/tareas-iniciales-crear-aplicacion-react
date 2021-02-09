import React, { Component, } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import LoadingSpinner from './Spinner';
import ReactTooltip from 'react-tooltip';

let datosIncorrectos = 'Los datos ingresados no son correctos, por favor verifique.'
var btn = "btnPrimarioDisabled";
let rol
let errorPass = true
let mailCorrecto = false
let contraCorrecta = false
let emaill
let passwordd
let URL = process.env.RESTURL_BACKEND + '/login'
let URLreturnpres = process.env.RESTURL_BACKEND + '/returnLoans'

class SimLogin extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
        }
    }
    redireccionar() {
        const volverSolicitar = JSON.parse(sessionStorage.getItem('volverAceptarpress'));
        if (volverSolicitar) {
            this.guardarStorage(emaill, passwordd, rol)
            window.location.href = "/Descuento"
            sessionStorage.setItem('volverAceptarpress', false);
        } else {
            if (rol == "CUSTOMER") {
                window.location.href = "/"
                this.guardarStorage(emaill, passwordd, rol)
            } else if (rol == "ADMIN") {
                window.location.href = "/Tableadmin"
                this.guardarStorage(emaill, passwordd, rol)
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
        this.setState({ loading: true }, () => {
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
                    this.setState({loading:false});
                    this.mostrarError()

                }
            })
            .catch(error => {
                console.log("Error al iniciar sesion", error)
            });
        })//fin state loading
    }

    guardarStorage = (user, clave, type) => {
        console.log('guardado correctamnete')
        this.values = {
            email: user,
            password: clave,
            role: type
        }
        sessionStorage.removeItem('Usuario-Values');
        sessionStorage.setItem('Usuario-Values', JSON.stringify(this.values));
    }

    render() {
        const { loading } = this.state
        return (
            <div className="formLogin">
            { loading ? <LoadingSpinner />: <div /> }
            
                <h1>Ingreso</h1>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validate={values => {
                        const errors = {};

                        if (!values.password) {
                            errors.password = '';
                            contraCorrecta = false;
                        }
                        else if (values.password.length < 8 && values.password.length >= 1) {
                            errors.password = 'La contraseña ingresada es menor a 8 caracteres'
                            contraCorrecta = false;
                        }
                        else {
                            contraCorrecta = true;
                            passwordd = values.password
                        }

                        if (!values.email) {
                            errors.email = '';
                            mailCorrecto = false;
                        }
                        else if (!values.email) {
                            errors.email = '';
                            mailCorrecto = false;
                        }
                        else if (
                            !/^[A-Z0-9.%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'Formato invalido';
                            mailCorrecto = false;
                        }
                        else {
                            mailCorrecto = true;
                            emaill = values.email;
                        }

                        if (errorPass == false) {
                            datosIncorrectos = "Los datos ingresados no son correctos, por favor verifique";
                            errorPass = true
                        }

                        if (mailCorrecto && contraCorrecta == true) {
                            btn = "btnPrimario"
                        } else {
                            btn = "btnPrimarioDisabled"
                        }
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        if (mailCorrecto == true && contraCorrecta == true) {
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
                                data-for="errormail"
                                data-tip="Este campo es obligatorio."
                            />

                            <ReactTooltip id="errormail"
                                place="right"
                                type="info"
                                effect="solid"
                                className="error-tooltip"
                            >
                            </ReactTooltip>
                            {touched.email && <label className="error-bottom">{errors.email}</label>}


                            <p>Contraseña *</p>
                            <input className="inputIngreso"
                                type="password"
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                data-for="errorpsswd"
                                data-tip="Este campo es obligatorio."
                            />

                            <ReactTooltip id="errorpsswd"
                                place="right"
                                type="info"
                                effect="solid"
                                className="error-tooltip"
                            >
                            </ReactTooltip>
                            {touched.email && <label className="error-bottom">{errors.password}</label>}

                            <a href="/empty" type="submit"><p className="recContr">Recuperar contraseña</p></a>

                            { touched.password && <p id="datosIncorrectos" className="no-encontrado">{datosIncorrectos}</p>}

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
