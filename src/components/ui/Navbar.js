import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2';
import { startLogout } from '../../actions/auth';

export const Navbar = () => {

    const dispatch = useDispatch();
    const { name, uid } = useSelector(state => state.auth);

    const handleLogout = () => {
        dispatch(startLogout());
    }

    let admin = uid === 'HlW8UDn7rzeDxt6fJUtAxUTSi2E3' ? 'admin' : 'user';

    const handlePasswordChanged = () => {
        Swal.mixin({
            input: 'text',
            confirmButtonText: 'Continuar &rarr;',
            showCancelButton: true,
            progressSteps: ['1', '2']
        }).queue([
            {
                title: 'Digite contraseña nueva'
            },
            {
                title: 'Confirmar nueva contraseña'
            }
        ]).then((result) => {
            if (result.value) {
                let password1 = result.value[0];
                let password2 = result.value[1];
                if (password1 !== password2) {
                    return Swal.fire('Error', 'Contraseñas no son iguales', 'error')
                }
                Swal.fire({
                    title: 'Seguro que desea cambiar contraseña?',
                    confirmButtonText: 'Confirmar',
                    showDenyButton: true,
                    denyButtonText: 'Cancelar'
                })
                    .then((result) => {
                        if (result.isConfirmed) {
                            console.log('confirmar')
                        } else {
                            console.log('cancelado');
                        }
                    })
            }
        })
    }

    return (
        <div className="navbar navbar-dark bg-dark mb-4">
            <span className="navbar-brand">
                {name}
            </span>

            <span className="navbar-brand">
                {admin === 'admin' ? 'Administrador' : ''}
            </span>

            {
                admin === 'admin' ? (
                    <button className="btn btn-outline-warning" onClick={handlePasswordChanged}>
                        <span> Cambiar Contraseña </span>
                    </button>
                ) : null
            }

            <button className="btn btn-outline-danger" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i>
                <span> Salir</span>
            </button>

        </div>
    )
}
