import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import '../css/Selector.css'
import customStyles from './SelectorCustomStyles'

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const CFSelector = ({ updateURL, initial }) => {
    const [year, setYear] = useState(initial.year || 2024)
    const [month, setMonth] = useState(initial.month || 1)
    const [bestof, setBestof] = useState(initial.bestof || 0)
    const [count, setCount] = useState(0)

    useEffect(() => {
        fetch(`${BACKEND_URL}/cfcontestcount`, {
            method: 'POST',
            body: JSON.stringify({year, month}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => setCount(data))
    }, [year, month])

    const updateYear = (selectedOption) => {
        setYear(selectedOption.value)
        setBestof(0)
    }

    const updateMonth = (selectedOption) => {
        setMonth(selectedOption.value) 
        setBestof(0)
    }

    const updateBestof = (selectedOption) => {
        setBestof(selectedOption.value)
    }

    const handleGenerateRanklist = () => {
        updateURL(year, month, bestof)
    }

    const yearOptions = [
        { value: 2024, label: 2024 },
    ]

    const monthOptions = [
        { value: 1, label: 'January' },
        { value: 2, label: 'February' },
        { value: 3, label: 'March' },
        { value: 4, label: 'April' },
        { value: 5, label: 'May' },
        { value: 6, label: 'June' },
        { value: 7, label: 'July' },
        { value: 8, label: 'August' },
        { value: 9, label: 'September' },
        { value: 10, label: 'October' },
        { value: 11, label: 'November' },
        { value: 12, label: 'December' },
    ]

    const bestofOptions = Array.from({ length: count + 1 }, (_, i) => ({
        value: i,
        label: i
    }))

    return (
        <div className='selector'>
            <div className="selector-row">
                <div className="select-wrapper">
                    <label>Select Year:</label>
                    <Select
                        styles={customStyles}
                        options={yearOptions}
                        onChange={updateYear}
                        value={yearOptions.find(option => option.value === year)}
                    />
                </div>
                <div className="select-wrapper">
                    <label>Select Month:</label>
                    <Select
                        styles={customStyles}
                        options={monthOptions}
                        onChange={updateMonth}
                        value={monthOptions.find(option => option.value === month)} // Update to find by value
                    />
                </div>
                <div className="select-wrapper">
                    <label>Best of:</label>
                    <Select
                        styles={customStyles}
                        options={bestofOptions}
                        onChange={updateBestof}
                        value={bestofOptions.find(option => option.value === bestof)}
                    />
                </div>
            </div>
            <div className="button-group">
                <button className="button" onClick={handleGenerateRanklist}>
                    Generate Ranklist
                </button>
            </div>
        </div>
    )
}

export default CFSelector