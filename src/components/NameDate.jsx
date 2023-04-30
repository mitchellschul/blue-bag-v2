import React from 'react'

const NameDate = (props) => {

    let newDate = new Date()
    let date = newDate.getDate();
    let symbol = getSymbol(date)
    let month = newDate.getMonth() + 1;
    let actMonth = getActMonth(month)
    let day = newDate.getDay();
    let actDay = getActDay(day)
    let hour = newDate.getHours();
    let minutes = newDate.getMinutes();

    function getSymbol(date) {
        if (date === 1 || date === 21 || date === 31) {
            return 'st'
        } else if (date === 2 || date === 22) {
            return 'nd'
        } else if (date === 3 || date === 23) {
            return 'rd'
        } else {
            return 'th'
        }
    }

    function getActMonth(val) {
        let MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "Ootober", "november", "december"]
        return MONTHS[val - 1]
    }

    function getActDay(val) {
        let DAYS = ["sun", "mon", "tues", "wed", "thurs", "fri", "sat"]
        return DAYS[val]
    }


    return (
        <div className='mt-8 flex flex-col w-fit'>
            <div className='text-xl'>{props.name}'s Asset Breakdown</div>
            <div className='text-gray-400'>
                {actDay + ', '}{actMonth} {date}{symbol} {hour}:{minutes}
            </div>
        </div>
    )
}

export default NameDate