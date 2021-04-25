import { authReducer } from "../../reducers/authReducer"
import { types } from "../../types/types";

const initState = {
    checking: true
}

describe('Pruebas en authReducer', () => {

    test('debe de retornar el estado por defecto', () => {

        const state = authReducer(initState, {});
        expect(state).toEqual(initState);
    })

    test('debe de autenticar el usuario', () => {

        const action = {
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'Carlos'
            }
        }

        const state = authReducer(initState, action);


        expect(state).toEqual({
            "checking": false,
            "name": "Carlos",
            "uid": "123",
        });
    })

})
