import { mount } from "enzyme/build"
import { Provider } from "react-redux";
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { AppRouter } from "../../router/AppRouter";


const middlewares = [thunk];
const mockStore = configureStore(middlewares);



// store.dispatch = jest.fn();




describe('Pruebas en AppRouter', () => {


    test('debe de mostrar el espere...', () => {

        const initState = {
            auth: {
                checking: true
            }
        };

        const store = mockStore(initState);

        const wrapper = mount(
            <Provider store={store}>
                <AppRouter />
            </Provider>
        )

        expect(wrapper).toMatchSnapshot();
    })

    test('debe de mostrar la ruta publica', () => {

        const initState = {
            auth: {
                checking: false,
                uid: null
            }
        };

        const store = mockStore(initState);

        const wrapper = mount(
            <Provider store={store}>
                <AppRouter />
            </Provider>
        )

        expect(wrapper).toMatchSnapshot();

    })

    test('debe de mostrar la ruta privada', () => {

        const initState = {
            calendar: {
                events: []
            },
            ui:{
                modalOpen: false
            },
            auth: {
                checking: false,
                uid: '123',
                name: 'Carlos'
            }
        };

        const store = mockStore(initState);

        const wrapper = mount(
            <Provider store={store}>
                <AppRouter />
            </Provider>
        )

        expect(wrapper).toMatchSnapshot();
    })



})