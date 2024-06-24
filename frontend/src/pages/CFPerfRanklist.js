import { useState } from 'react'
import CFSelector from '../components/CFSelector.js'
import Ranktable from '../components/Ranktable.js'

const CFPerfRanklist = () => {
    const [ranklist, setRanklist] = useState([])

    const updateRanklist = (newRanklist) => {
        setRanklist(newRanklist)
    }
    
    return(
        <div className = "cfperf">
            <CFSelector updateRanklist = {updateRanklist}/>
            <Ranktable finalRanklist = {ranklist}/>
        </div>
    )
}

export default CFPerfRanklist
