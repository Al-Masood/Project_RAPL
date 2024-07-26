import React, { useState, useEffect } from 'react'
import Ranktable from '../components/Ranktable.js'
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const currentContestNumbers = [627365, 628754, 629205, 630390, 630500, 631401];

const TFCRanklist = () => {
    const [ranklist, setRanklist] = useState([])
    const [loading, setLoading] = useState(false) 

    useEffect(() => {
        const fetchRanklist = async () => {
            setLoading(true) 

            try {
                const response = await fetch(`${BACKEND_URL}/tfcranklist`, {
                    method: 'POST',
                    body: JSON.stringify(currentContestNumbers),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                const ranklist = await response.json()
                setRanklist(ranklist)
            } catch (error) {
                console.error('Error fetching ranklist:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchRanklist()
    }, [])

    return (
        <div className='tfc-ranklist'>
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

export default TFCRanklist
