import { useState, useEffect } from 'react'
import Ranktable from "../components/Ranktable"

const CodeforcesStandings = () => {
    const [contests, setContests] = useState([])
    const [selectedContestId, setSelectedContestId] = useState('')
    const [ranklist, setRanklist] = useState([])

    useEffect(() => {
        const fetchContests = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/getcontests', {
                    method: 'GET'
                })
                const recentContests = await response.json()
                setContests(recentContests)
            } catch (error) {
                console.error("Error fetching contests:", error)
            }
        }
        fetchContests()
    }, [])

    useEffect(() => {
        const fetchStandings = async () => {
            if (selectedContestId) {
                try {
                    const response = await fetch('http://localhost:4000/api/cfstandings', {
                        method: 'POST',
                        body: JSON.stringify({ selectedContestId }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })

                    if (response.ok) {
                        const data = await response.json()
                        setRanklist(data)
                    } else {
                        console.error("Error fetching standings:", response.statusText)
                    }
                } catch (error) {
                    console.error("Error fetching standings:", error)
                }
            }
        }

        fetchStandings()
    }, [selectedContestId])

    const handleContestChange = (event) => {
        setSelectedContestId(event.target.value)
    }

    return (
        <div>
            <div className='selector'>
                <div>
                    <label>Select Contest:</label>
                    <div className="select-wrapper">
                        <select className="select-field" onChange={handleContestChange} value={selectedContestId}>
                            <option value="" disabled>Select a contest</option>
                            {contests.map(contest => (
                                <option key={contest.number} value={contest.number}>
                                    {contest.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <Ranktable finalRanklist={ranklist} />
        </div>
    )
}

export default CodeforcesStandings
