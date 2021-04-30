import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2';
import { startChangePassword, startLogout } from '../../actions/auth';
import { adminId } from '../../firebase/firebase-config';



export const Navbar = () => {

    const dispatch = useDispatch();
    const { name, uid } = useSelector(state => state.auth);

    const handleLogout = () => {
        dispatch(startLogout());
    }

    let admin = uid === adminId ? 'admin' : 'user';

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
                            dispatch(startChangePassword(password1))
                        } else {
                            console.log('cancelado');
                        }
                    })
            }
        })
    }

    const showInfo = () => {
        Swal.fire({
            title: 'Estados de reservación',
            confirmButtonText:
                '<i class="fa fa-thumbs-up"></i> Aceptada',
            confirmButtonColor: '#5cc72e',
            showCancelButton: true,
            cancelButtonText:
                'Pendiente',
            cancelButtonColor: '#367CF7',
            denyButtonColor: '#EB0606',
            showCloseButton: true,
            showDenyButton: true,
            denyButtonText: '<i class="fa fa-thumbs-down"></i> Rechazar',
        })
    }

    return (
        <div className="navbar navbar-dark bg-dark mb-4">
            <span className="navbar-brand">
                {name}
            </span>

            <span className="navbar-brand" style={{ paddingRight: '30%' }}>
                {admin === 'admin' ? 'Administrador' : ''}
            </span>

            <button className="btn btn-outline-info" style={{ marginLeft: '20%' }} onClick={showInfo}>
                <span> Conocer estados de reservación </span>
            </button>

            {
                admin === 'admin' ? (
                    <button className="btn btn-outline-warning" onClick={handlePasswordChanged}>
                        <span> Cambiar Contraseña </span>
                    </button>
                ) : null
            }


            <button className="btn btn-outline-danger" onClick={handleLogout} style={{marginRight: '1%'}}>
                <i className="fas fa-sign-out-alt"></i>
                <span> Salir</span>
            </button>

        </div>
    )
}
