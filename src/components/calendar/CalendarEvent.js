import React from 'react'

export const CalendarEvent = ({ event }) => {

    // console.log(event)
    const { title, name } = event;

    return (
        <div>
            <strong> { title } </strong>
            <span>- { name } </span>
        </div>
    )
}
