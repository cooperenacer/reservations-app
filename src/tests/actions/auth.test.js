import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { startChecking, startLogin, startRegister } from '../../actions/auth';
import { types } from '../../types/types';
import Swal from 'sweetalert2';
import * as fetchModule from '../../helpers/fetch';



jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);

Storage.prototype.setItem = jest.fn();


describe('Pruebas en las Acciones del Auth', () => {

    beforeEach(() => {
        store = mockStore(initState);
        jest.clearAllMocks();
    })

    test('startLogin correcto', async () => {

        await store.dispatch(startLogin('andres@gmail.com', '123456'));

        const actions = store.getActions();


        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: expect.any(String),
                name: expect.any(String)
            }
        });

        expect(localStorage.setItem).toHaveBeenCalledWith('token', expect.any(String));

        // token = localStorage.setItem.mock.calls[0][1];
    })

    test('startLogin incorrecto', async () => {

        await store.dispatch(startLogin('andres@gmail.com', '123456789'));

        let actions = store.getActions();

        expect(actions).toEqual([]);

        expect(Swal.fire).toHaveBeenCalled();
    })

    test('startRegister correcto', async () => {

        fetchModule.fetchSinToken = jest.fn(() => ({
            json() {
                return {
                    ok: true,
                    uid: '123',
                    name: 'Carlos',
                    token: 'ABC123ABC123'
                }
            }
        }));

        await store.dispatch(startRegister('test@test.com', '123456', 'Test'));

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'Carlos'
            }
        });

        expect(localStorage.setItem).toHaveBeenCalledWith('token', 'ABC123ABC123');

    })

    test('startChecking correcto', async () => {

        fetchModule.fetchConToken = jest.fn(() => ({
            json() {
                return {
                    ok: true,
                    uid: '123',
                    name: 'Carlos',
                    token: 'ABC123ABC123'
                }
            }
        }));

        await store.dispatch(startChecking());

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'Carlos'
            }
        })

        expect(localStorage.setItem).toHaveBeenCalledWith('token', 'ABC123ABC123');
    })


})
