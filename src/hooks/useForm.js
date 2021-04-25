import { useState } from 'react'

export const useForm = (initialState = {}) => {

    //HOOK PARA RECIBIR EL TEXTO DE INPUT EN UN FORMULARIO
    
    const reset = () => {
        setvalues(initialState);
    }
    

    const [values, setvalues] = useState(initialState);

    const handleInputChange = ({ target }) => {
        setvalues({
            ...values,
            [target.name]: target.value
        });
    };

    return [values, handleInputChange, reset];
}