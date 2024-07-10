import { useState, useEffect } from 'react'
import Ranktable from '../components/Ranktable.js'
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const currentContestNumbers = [627365, 628754, 629205, 630390, 630500, 631401]

const VJRank = () => {
    const [ranklist, setRanklist] = useState([])

    useEffect(() => {
        const fetchRanklist = async () => {
            const response = await fetch(`${BACKEND_URL}/vjudgeranklist`, {
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