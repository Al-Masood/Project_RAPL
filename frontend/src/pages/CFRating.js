import { useState, useEffect } from 'react'
import Ranktable from "../components/Ranktable"
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const CodeforcesRating = () => {
    const [ranklist, setRanklist] = useState([])
    const [loading, setLoading] = useState(false)
    const [activeComponent, setActiveComponent] = useState('CurrentRating')

    const handleClick = async (clickType) => {
        setLoading(true)

        try {
            const response = await fetch(`${BACKEND_URL}/cfrating`, {
                method: 'POST',
                body: JSON.stringify({ type: clickType }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const newRanklist = await response.json()
            setRanklist(newRanklist)
        } catch (error) {
            console.error('Error fetching the ranklist:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        handleClick('CurrentRating')
    }, [])

    return (
        <div>
            <div className="option-button-large">
                <button
                    className={`option-button button ${activeComponent === 'CurrentRating' ? 'active' : ''}`}
                    onClick={() => { setActiveComponent('CurrentRating'); handleClick('CurrentRating') }}
                >
                    Current Rating
                </button>
                <button
                    className={`option-button button ${activeComponent === 'MaxRating' ? 'active' : ''}`}
                    onClick={() => { setActiveComponent('MaxRating'); handleClick('MaxRating') }}
                >
                    Max Rating 
                </button>
            </div>
            {loading ? (
                <div className="loading-spinner-container">
                    <div className="loading-spinner"></div>
                </div>
            ) : (
                <Ranktable finalRanklist={ranklist} />
            )}
        </div>
    )
}

export default CodeforcesRating
