import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import moment from 'moment';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import Swal from 'sweetalert2';

import { uiCloseModal } from '../../actions/ui';
import { eventClearActiveEvent, eventStartAddNew, eventStartStatusUpdate, eventStartUpdate } from '../../actions/events';

require('dotenv').config()


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};
Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours'); // 3:00:00
const nowPlus1 = now.clone().add(1, 'hours');

const initEvent = {
    nombre: '',
    motivo: '',
    cedula: '',
    start: now.toDate(),
    end: nowPlus1.toDate()
}


export const CalendarModal = () => {

    const { modalOpen } = useSelector(state => state.ui);
    const { activeEvent } = useSelector(state => state.calendar);
    const dispatch = useDispatch();

    const { uid } = useSelector(state => state.auth)

    const [dateStart, setDateStart] = useState(now.toDate());
    const [dateEnd, setDateEnd] = useState(nowPlus1.toDate());
    const [titleValid, setTitleValid] = useState(true);

    const [formValues, setFormValues] = useState(initEvent);

    const { motivo, nombre, cedula, start, end } = formValues;

    const ADMINID = process.env.REACT_APP_ADMINID;

    console.log('User ids', uid, ADMINID)


    useEffect(() => {
        if (activeEvent) {
            setFormValues(activeEvent);
        } else {
            setFormValues(initEvent);
        }
    }, [activeEvent, setFormValues])


    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }


    const closeModal = () => {
        // TODO: cerrar el modal
        dispatch(uiCloseModal());
        dispatch(eventClearActiveEvent());
        setFormValues(initEvent);
    }

    const handleStartDateChange = (e) => {
        setDateStart(e);
        setFormValues({
            ...formValues,
            start: e
        })
    }

    const handleEndDateChange = (e) => {
        setDateEnd(e);
        setFormValues({
            ...formValues,
            end: e
        })
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();



        const momentStart = moment(start);
        const momentEnd = moment(end);

        if (momentStart.isSameOrAfter(momentEnd)) {
            return Swal.fire('Error', 'La fecha fin debe de ser mayor a la fecha de inicio', 'error');
        }

        if (nombre.trim().length < 2) {
            return setTitleValid(false);
        }

        if (activeEvent) {
            dispatch(eventStartUpdate(formValues))
        } else {
            dispatch(eventStartAddNew(formValues))
        }


        setTitleValid(true);
        closeModal();
        if (!activeEvent) {

            Swal.fire(
                'Solicitud de reservación creada',
                'Revisar de nuevo la agenda entre las siguientes 24-48 horas para conocer el resultado de la reserva',
                'success')
        }

    }

    const handleStatus = (e) => {
        e.preventDefault();

        Swal.fire({
            title: 'Cambiar estado de reservación',
            confirmButtonText:
                '<i class="fa fa-thumbs-up"></i> Aceptar',
            showCancelButton: true,
            cancelButtonText:
                '<i class="fa fa-thumbs-down"></i> Cancelar',
            showCloseButton: true,
            showDenyButton: true,
            denyButtonText: '<i class="fa fa-thumbs-down"></i> Rechazar',
        })
            .then((result) => {
                if (result.isConfirmed) {
                    dispatch(eventStartStatusUpdate(activeEvent, 2))
                } else if (result.isDenied) {
                    dispatch(eventStartStatusUpdate(activeEvent, 3))
                } else {
                    console.log('cancelada')
                }
            })
        dispatch(uiCloseModal());
    }

    return (
        <Modal
            isOpen={modalOpen}
            onRequestClose={closeModal}
            style={customStyles}
            closeTimeoutMS={200}
            className="modal"
            overlayClassName="modal-fondo"
        >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h1> {(activeEvent) ? 'Editar reservación' : 'Crear reservación'} </h1>
                {
                    uid === ADMINID ? (

                        <button onClick={handleStatus}>Aprobar</button>
                    ) : null
                }
            </div>
            <hr />
            <form
                className="container"
                onSubmit={handleSubmitForm}
            >

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={handleStartDateChange}
                        value={dateStart}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={handleEndDateChange}
                        value={dateEnd}
                        minDate={dateStart}
                        className="form-control"
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Información Personal</label>
                    <input
                        type="text"
                        className={`form-control ${!titleValid && 'is-invalid'} `}
                        placeholder="Nombre completo"
                        name="nombre"
                        autoComplete="off"
                        value={nombre}
                        onChange={handleInputChange}
                    />
                    <input
                        style={{ marginTop: '2%' }}
                        type="text"
                        className={'form-control'}
                        placeholder="Cedula"
                        name="cedula"
                        autoComplete="off"
                        value={cedula}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Motivo"
                        rows="4"
                        name="motivo"
                        value={motivo}
                        onChange={handleInputChange}
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>

        </Modal>
    )
}
