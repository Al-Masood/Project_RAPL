import { useState } from 'react'
import Ranktable from '../components/Ranktable.js'
import VJSelector from '../components/VJSelector.js'

const VJRank = () => {

    const [ranklist, setRanklist] = useState([])
    
    const updateRanklist = (newRanklist) => {
        setRanklist(newRanklist)
    }

    return(
        <div className='vjrank'>
            <VJSelector updateRanklist = {updateRanklist}/>
            <Ranktable finalRanklist={ranklist} />
        </div>
    )
}

export default VJRank