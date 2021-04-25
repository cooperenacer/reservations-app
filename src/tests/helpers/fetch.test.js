import { fetchConToken, fetchSinToken } from "../../helpers/fetch"

describe('Pruebas en el helper fetch', () => {

    let token = '';

    test('FetchSinToken debe de funcionar', async () => {

        const resp = await fetchSinToken('auth', { email: 'andres@gmail.com', password: '123456' }, 'POST');

        expect(resp instanceof Response).toBe(true);

        const body = await resp.json();

        expect(body.ok).toBe(true);
        
        token = body.token;
    })

    test('FetchConToken debe de funcionar', async () => {

        localStorage.setItem('token', token);

        const resp = await fetchConToken('events/601e0ae9a4527f65a47e8465',{},'DELETE');

        const body = await resp.json();

        expect(body.msg).toBe('Evento no existe por ese id');
    })

})
