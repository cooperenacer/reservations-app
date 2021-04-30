import { adminId, db } from "../firebase/firebase-config";
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types";
import moment from 'moment'

import { v4 as uuidv4 } from 'uuid'
import Swal from "sweetalert2";



export const eventStartAddNew = (event) => {

    const eid = uuidv4();

    return async (dispatch, getState) => {

        const { uid, name } = getState().auth;
        const state = 1;
        try {

            await db.collection("reservation").add(
                {
                    eid,
                    uid,
                    name,
                    state,
                    ...event
                }
            )

            event.eid = eid;
            event.uid = uid;
            event.name = name;
            event.state = state;
            dispatch(eventAddNew(event));

        } catch (error) {
            console.log(error)
        }
    }
}

export const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});

export const eventClearActiveEvent = () => ({ type: types.eventClearActiveEvent });


export const eventStartUpdate = (event) => {

    return async (dispatch, getState) => {
        const { eid, uid } = getState().calendar.activeEvent;

        const { uid: userUid } = getState().auth;

        let permiso = false;

        if (userUid === adminId) {
            permiso = true;
        } else if (userUid === uid) {
            permiso = true;
        } else {
            permiso = false;
        }

        if (permiso) {

            try {

                const getEvent = await db.collection('reservation').where('eid', '==', eid);

                const docRef = await getEvent.get()

                const ref = await docRef.docs[0].id;

                db.doc(`reservation/${ref}`).update(event)
                    .then(() => {
                        Swal.fire(
                            'Actualización',
                            'Reservación actualizada con éxito',
                            'info'
                        )
                        dispatch(eventUpdated(event))
                        dispatch(eventStartLoading())
                    })
                    .catch((e) => console.log(e))
            } catch (error) {
                console.log(error)
            }
        } else {
            Swal.fire('Error', 'No tiene permisos para editar esta reservacion', 'error');
        }
    }
}

export const eventStartDelete = () => {

    return (dispatch, getState) => {

        const { eid, uid } = getState().calendar.activeEvent;

        const { uid: userUid } = getState().auth;

        let permiso = false;

        if (userUid === adminId) {
            permiso = true;
        } else if (userUid === uid) {
            permiso = true;
        } else {
            permiso = false;
        }

        if (permiso) {

            const event = db.collection('reservation').where('eid', '==', eid);

            try {
                event.get().then((querySnapchot) => {
                    querySnapchot.forEach((doc) => {
                        doc.ref.delete();
                    })
                })
                    .then(() => {
                        dispatch(eventDeleted())
                        Swal.fire(
                            'Reservación eliminada',
                            'Su cita ha sido elminada con exito',
                            'warning'
                        )
                        dispatch(eventStartLoading())

                    }
                    )
                    .catch((e) => console.log(e))

            } catch (error) {
                console.log(error);
            }
        } else {
            Swal.fire('Error', 'No tiene permisos para borrar esta cita', 'error')
        }
        dispatch(eventStartLoading());
    }
}

export const eventDeleted = () => ({ type: types.eventDeleted });

const fetchData = () => db.collection("reservation").get();


const prepareData = (events = []) => {
    return events.map(
        (e) => ({
            ...e,
            end: moment(e.end.toDate()).format("YYYY-MM-DD HH:mm:ss"),
            start: moment(e.start.toDate()).format("YYYY-MM-DD HH:mm:ss")
        }))
};

export const eventStartLoading = () => {
    return async (dispatch) => {
        try {
            const query = await fetchData();

            const data = [];

            query.forEach(doc => {
                data.push(doc.data())
            });

            const newData = prepareData(data);

            const events = prepareEvents(newData);

            dispatch(eventLoaded(events));

        } catch (error) {
            console.log(error)
        }
    }
}
const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
});

export const eventLogout = () => ({
    type: types.eventLogout
})

export const eventStartStatusUpdate = (event, status) => {

    const { eid } = event;

    return async (dispatch) => {
        try {

            const getEvent = await db.collection('reservation').where('eid', '==', eid);


            const docRef = await getEvent.get()

            const ref = await docRef.docs[0].id;
            db.doc(`reservation/${ref}`).update({
                ...event,
                state: status
            })
                .then(() => {
                    dispatch(eventUpdated(event))
                    dispatch(eventStartLoading())
                })
                .catch((e) => console.log(e))

        } catch (error) {

        }
    }
}
export const eventUpdated = (event) => ({
    type: types.eventUpdated,
    payload: event
})