import { useState } from 'react'
import Ranktable from "../components/Ranktable"
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const CodeforcesRating = () => {
    const [type, setType] = useState('')
    const [ranklist, setRanklist] = useState('')
    const [loading, setLoading] = useState(false)  // Add loading state

    const handleClick = async (clickType) => {
        setType(clickType)
        setLoading(true)  // Set loading to true when fetch starts
        const response = await fetch(`${BACKEND_URL}/cfrating`, {
            method: 'POST',
            body: JSON.stringify({type}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
        const newRanklist = await response.json()
        setRanklist(newRanklist)
        setLoading(false)  // Set loading to false when fetch completes
    }

    return (
        <div>
            <div className='option-button-group-large'>
                <button className="option-button button" onClick={ () => handleClick('CurrentRating')}> Current Rating</button>
                <button className="option-button button" onClick={ () => handleClick('MaxRating')}> Maximum Rating</button>
            </div>
            {loading ? (  // Conditionally render loading animation
                <div className="loading-spinner-container">
                    <div className="loading-spinner"></div>
                </div>
            ) : (
                <Ranktable finalRanklist={ranklist}/>
            )}
        </div>
    )
}

export default CodeforcesRating
