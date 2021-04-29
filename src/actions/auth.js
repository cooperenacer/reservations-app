import Swal from 'sweetalert2';
import { firebase } from '../firebase/firebase-config'
import { types } from '../types/types';
import { eventLogout } from './events';



export const startLogin = (email, password) => {
    return (dispatch) => {

        return firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({ user }) => {
                dispatch(
                    login({
                        uid: user.uid,
                        name: user.displayName
                    })
                )
                localStorage.setItem('token-init-date', new Date().getTime())
            })
            .catch((e) => {
                console.log(e)
                Swal.fire('Error', e.message, 'error')
            })
    }
};

export const login = (uid, displayName) => ({
    type: types.authLogin,
    payload: {
        uid,
        displayName
    }
});

export const startRegister = (email, password, name) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async ({ user }) => {
                await user.updateProfile({
                    displayName: name
                });
                dispatch(
                    login({
                        uid: user.uid,
                        name: user.displayName
                    })
                )
            })
            .catch(e => {
                console.log(e)
                Swal.fire('Error', e.message, 'error')
            })
    }
};


export const checkingFinish = () => ({
    type: types.authCheckingFinish
});

export const startLogout = () => {
    return async(dispatch) => {

        await firebase.auth().signOut();
        localStorage.clear();
        dispatch(eventLogout);
        dispatch(logout())
    }
}

const logout = () => ({
    type: types.authLogout
})
