import React from 'react';
import { Formik } from 'formik';
import axios from 'axios';
const SimLogin = () => (
    <div className="formLogin">
        <h1>Ingreso</h1>
        <Formik
            initialValues={{ email: '', password: '' }}
            validate={values => {
                const errors = {};
                if (!values.email) {
                    errors.email = 'Ingrese mail';
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                    errors.email = 'El formato del email ingresado no es correcto, por favor verifique';
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
                const { email, password, } = this.state;
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
                        {errors.email && touched.email && <label className="error">{errors.email}</label>}

                        <p>Contraseña *</p>
                        <input className="inputIngreso"
                            type="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                        />
                        {errors.password && touched.password && errors.password}
                        <a href="/empty" type="submit"><p className="recContr"> Recuperar contraseña</p></a>
                        <button className="btnPrimario" type="submit" disabled={isSubmitting}>
                            Ingresar
                        </button><br />
                    </form>
                )}
        </Formik>
        <a href="http://localhost:3000/registro" target="_blank"><button className="btnSecundario">Registrarse</button></a>

    </div>
);

export default SimLogin;
