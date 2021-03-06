import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startLogin, startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import './login.css';
import logo from '../../assets/logo.jpg'

export const LoginScreen = () => {

    const dispatch = useDispatch();

    //LOGIN
    const [formLoginValues, handleLoginInputChange] = useForm({
        lEmail: '',
        lPassword: ''
    });

    const { lEmail, lPassword } = formLoginValues;

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(startLogin(lEmail, lPassword))
    }

    //REGISTER
    const [formRegisterValues, handleRegisterInputChange] = useForm({
        rName: '',
        rEmail: '',
        rNumero: '',
        rPassword1: '',
        rPassword2: ''
    })

    const { rName, rEmail, rNumero, rPassword1, rPassword2 } = formRegisterValues;

    const handleRegister = (e) => {
        e.preventDefault();

        if (rPassword1.length <= 5) {
            return Swal.fire('Error', 'La contraseña debe de tener más de 5 caracteres', 'error')
        }

        if (rPassword1 !== rPassword2) {
            return Swal.fire('Error', 'Las contraseñas deben de ser iguales', 'error')
        }

        dispatch(startRegister(rEmail, rNumero, rPassword1, rName));
    }

    return (
        <>
            <div className="title">
                <h1 style={{ fontSize: 50 }}>Cooperenacer-SJ R.L.</h1>
                <img
                    src={logo}
                    alt="Cooperenacer logo"
                    style={{ width: 60, height: 60 }}
                />

            </div>
            <div >
                <div className="container login-container mt-5">
                    <div className="row">
                        <div className="col-md-6 login-form-1">
                            <h3>Ingreso</h3>
                            <form onSubmit={handleLogin}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Correo"
                                        name="lEmail"
                                        value={lEmail}
                                        onChange={handleLoginInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Contraseña"
                                        name="lPassword"
                                        value={lPassword}
                                        onChange={handleLoginInputChange}
                                    />
                                </div>
                                <div className="form-group" style={{ display: 'flex', justifyContent: 'center' }}>
                                    <input
                                        style={{ background: '#29becf', color: '#253233', fontWeight: 700 }}
                                        type="submit"
                                        className="btnSubmit"
                                        value="Login"
                                    />
                                </div>
                            </form>
                        </div>

                        <div className="col-md-6 login-form-2" style={{ background: '#29becf' }}>
                            <h3 style={{ color: '#253233' }}>Registro</h3>
                            <form onSubmit={handleRegister}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Nombre"
                                        name="rName"
                                        value={rName}
                                        onChange={handleRegisterInputChange}
                                        required={true}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Correo"
                                        name="rEmail"
                                        value={rEmail}
                                        onChange={handleRegisterInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Numero de telefono"
                                        name="rNumero"
                                        value={rNumero}
                                        onChange={handleRegisterInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Contraseña"
                                        name="rPassword1"
                                        value={rPassword1}
                                        onChange={handleRegisterInputChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Repita la contraseña"
                                        name="rPassword2"
                                        value={rPassword2}
                                        onChange={handleRegisterInputChange}
                                    />
                                </div>

                                <div className="form-group" style={{ display: 'flex', justifyContent: 'center' }}>
                                    <input
                                        style={{ color: '#253233', fontWeight: '700' }}
                                        type="submit"
                                        className="btnSubmit"
                                        value="Crear cuenta" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </>

    )
}