import React, { useEffect, useState } from 'react'

const CFSelector = ({ updateRanklist }) => {

    const [year, setYear] = useState(2024)
    const [month, setMonth] = useState(1)
    const [bestof, setBestof] = useState(0)
    const [count, setCount] = useState(0)

    useEffect(() => {
        fetch('http://localhost:4000/api/cfcontestcount', {
            method: 'POST',
            body: JSON.stringify([year, month]),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                setCount(data)
            })
    }, [year, month])

    const updateYear = (event) => {
        setYear(event.target.value)
        setBestof(0)
    }

    const updateMonth = (event) => {
        setMonth(event.target.value)
        setBestof(0)
    }

    const updateBestof = (event) => {
        setBestof(event.target.value)
    }

    const generateRanklist = async () => {
        const response = await fetch('http://localhost:4000/api/cfranklist', {
            method: 'POST',
            body: JSON.stringify([year, month, bestof]),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const ranklist = await response.json()
        updateRanklist(ranklist)
    }

    return (
        <div className="form-container">
            <div className="form-group">
                <label htmlFor="year">Select Year: </label>
                <select className='year' onChange={updateYear}>
                    <option>2024</option>
                </select>
                <label htmlFor="month">Select Month: </label>
                <select className='month' onChange={updateMonth}>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map(i => (
                        <option key={i}>{i}</option>
                    ))}
                </select>
                <label htmlFor="best of">Best of: </label>
                <select className='best of' onChange={updateBestof}>
                    {Array.from({ length: count + 1 }, (_, i) => i).map(i => (
                        <option key={i}>{i}</option>
                    ))}
                </select>
            </div>
            <div>
                <button className='button' onClick={generateRanklist}>
                    Generate Ranklist
                </button>
            </div>
        </div>
    )
}

export default CFSelector