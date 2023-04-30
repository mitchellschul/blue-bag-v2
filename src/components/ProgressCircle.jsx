import React from 'react'

import { CircularProgress } from "@mui/material"

const ProgressCircle = (props) => {

    // console.log('passed', props.total)


    return (
        <CircularProgress variant="determinate" value={props.total} size="40px" thickness={2} />

    )
}

export default ProgressCircle