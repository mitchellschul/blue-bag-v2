import React from 'react'
import ProgressCircle from './ProgressCircle'
import "../index.css";


const statementCard = (props) => {
    // let total = props.total;
    // console.log(props.total)

    return (

        <div>
            <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <div className='flex justify-between'>
                    <div>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight">{props.title}</h5>
                        <p className="font-normal text-blue-500">${props.value}</p>
                    </div>
                    <ProgressCircle total={(props.value / props.total) * 100} size={40} />
                    {/* <PieChart total={props.total} value={props.value} /> */}
                </div>
            </div>
        </div>
    )
}

export default statementCard