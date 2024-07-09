import { useState, useEffect } from 'react'
import Ranktable from '../components/Ranktable.js'

const currentContestNumbers = [627365, 628754, 629205, 630390, 630500, 631401]

const VJRank = () => {
    const [ranklist, setRanklist] = useState([])

    useEffect(() => {
        const fetchRanklist = async () => {
            const response = await fetch('http://localhost:4000/api/vjudgeranklist', {
                method: 'POST',
                body: JSON.stringify(currentContestNumbers),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const ranklist = await response.json()
            setRanklist(ranklist)
        }
        fetchRanklist()
    }, [])

    return (
        <div className='vjrank'>
            <Ranktable finalRanklist={ranklist} />
        </div>
    )
}

export default VJRank