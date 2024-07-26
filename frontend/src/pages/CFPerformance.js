import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'
import CFSelector from '../components/CFSelector.js'
import Ranktable from '../components/Ranktable.js'

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const CFPerformance = () => {
    const { query } = useParams()
    const [ranklist, setRanklist] = useState([])
    const [loading, setLoading] = useState(false) 
    const navigate = useNavigate()

    const generateRanklist = useCallback(async (year, month, bestof) => {
        setLoading(true) 
        try {
            const response = await fetch(`${BACKEND_URL}/cfperformance`, {
                method: 'POST',
                body: JSON.stringify({year, month, bestof}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const ranklist = await response.json()
            setRanklist(ranklist)
        } catch (error) {
            console.error('Error fetching the ranklist:', error)
        } finally {
            setLoading(false) 
        }
    }, [])

    const parseQueryParams = (query) => {
        if (query) {
            const [year, month, bestof] = query.split('-').map(Number)
            return { year, month, bestof }
        }
        return { year: 2024, month: 1, bestof: 0 }
    }

    useEffect(() => {
        const initialParams = parseQueryParams(query)
        if (query) {
            const { year, month, bestof } = initialParams
            generateRanklist(year, month, bestof)
        }
    }, [query, generateRanklist])

    const updateURL = (year, month, bestof) => {
        const newQuery = `${year}-${month}-${bestof}`
        navigate(`/cfperformance/${newQuery}`)
        generateRanklist(year, month, bestof)
    }

    const initialParams = parseQueryParams(query)

    return (
        <div className="cfperf">
            <CFSelector updateURL={updateURL} initial={initialParams} />
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

export default CFPerformance