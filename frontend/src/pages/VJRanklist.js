import { useState } from 'react'
import Ranktable from '../components/Ranktable.js'
import VJSelector from '../components/VJSelector.js'
import VJAdder from '../components/VJAdder.js'

const VJRank = () => {

    const [ranklist, setRanklist] = useState([])
    
    const updateRanklist = (newRanklist) => {
        setRanklist(newRanklist)
    }

    return(
        <div className='vjrank'>
            <VJAdder/>
            <VJSelector updateRanklist = {updateRanklist}/>
            <Ranktable finalRanklist={ranklist} />
        </div>
    )
}

export default VJRank