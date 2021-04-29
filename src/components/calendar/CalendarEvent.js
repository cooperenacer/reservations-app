import React from 'react'

export const CalendarEvent = ({ event }) => {

    // console.log(event)
    const { nombre, name } = event;

    return (
        <div>
            <strong> {nombre} </strong>
            <span>- {name} </span>
        </div>
    )
}
