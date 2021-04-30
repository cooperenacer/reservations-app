import React from 'react';
import { useDispatch } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import Button from '@material-ui/core/Button';

export const AddNewFab = () => {

    const dispatch = useDispatch();

    const handleClickNew = () => {
        dispatch(uiOpenModal());
    }


    return (
        <Button variant="contained" color="primary" onClick={handleClickNew} size="large" style={{ padding: 15, backgroundColor: '#0063cc', fontWeight: 700 }}>
            Agregar nueva solicitud de reservación
        </Button>

    )
}
