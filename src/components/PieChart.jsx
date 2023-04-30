import React from 'react'

import { VictoryPie } from 'victory';

const PieChart = (props) => {


    return (

        <svg viewBox="0 0 300 300">
            <VictoryPie
                standalone={false}
                width={200} height={200}
                data={[
                    { x: "S", y: props.total }, { x: "R", y: props.value }
                ]}
                innerRadius={68} labelRadius={50}
                style={{ labels: { fontSize: 20, fill: "white" } }}
            />
        </svg>


    )
}

export default PieChart