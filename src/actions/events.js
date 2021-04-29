import { db } from "../firebase/firebase-config";
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types";
import moment from 'moment'

import { v4 as uuidv4 } from 'uuid'
import Swal from "sweetalert2";

export const eventStartAddNew = (event) => {

    const eid = uuidv4();

    return async (dispatch, getState) => {

        const { uid, name } = getState().auth.uid;
        try {
            console.log('EVENTO', event)
            await db.collection("reservation").add(
                {
                    eid,
                    uid,
                    name,
                    state: 1,
                    ...event
                }
            )

            event.id = eid;

            event.user = {
                uid,
                name
            }
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

//Realizar
export const eventStartUpdate = (event) => {
    return async (dispatch) => {
        try {

        } catch (error) {

        }
    }
}


export const eventUpdated = (event) => ({
    type: types.eventUpdated,
    payload: event
});




export const eventStartDelete = () => {

    return async (dispatch, getState) => {

        const { eid, uid } = getState().calendar.activeEvent;

        const { uid: userUid } = getState().auth.uid;

        console.log(userUid, uid);
        if (userUid === uid) {

            const event = db.collection('reservation').where('eid', '==', eid);

            try {
                event.get().then((querySnapchot) => {
                    querySnapchot.forEach((doc) => {
                        doc.ref.delete();
                    })
                })

                dispatch(eventDeleted());
            } catch (error) {
                console.log(error);
            }
        } else {
            Swal.fire('Error', 'No tiene permisos para borrar esta cita', 'error')
        }
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
                // console.log(moment(doc.data().end.toDate()).format("YYYY-MM-DD HH:mm:ss"))
            });

            const newData = prepareData(data);

            // console.log('ND', newData);
            const events = prepareEvents(newData);

            console.log('events', events)
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
