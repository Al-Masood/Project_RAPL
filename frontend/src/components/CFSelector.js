import React, { useEffect, useState } from 'react';

const CFSelector = ({ updateURL }) => {
    const [year, setYear] = useState(2024);
    const [month, setMonth] = useState(1);
    const [bestof, setBestof] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(() => {
        fetch('http://localhost:4000/api/cfcontestcount', {
            method: 'POST',
            body: JSON.stringify([year, month]),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => setCount(data));
    }, [year, month]);

    const updateYear = (event) => {
        setYear(event.target.value);
        setBestof(0);
    };

    const updateMonth = (event) => {
        setMonth(event.target.value);
        setBestof(0);
    };

    const updateBestof = (event) => {
        setBestof(event.target.value);
    };

    const handleGenerateRanklist = () => {
        updateURL(year, month, bestof);
    };

    return (
        <div className='selector'>
            <div>
                <label>Select Year:</label>
                <div className="select-wrapper">
                    <select className="select-field" onChange={updateYear}>
                        <option>2024</option>
                    </select>
                </div>
            </div>
            <div>
                <label>Select Month:</label>
                <div className="select-wrapper">
                    <select className="select-field" onChange={updateMonth}>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(i => (
                            <option key={i}>{i}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div>
                <label>Best of:</label>
                <div className="select-wrapper">
                    <select className="select-field" onChange={updateBestof}>
                        {Array.from({ length: count + 1 }, (_, i) => i).map(i => (
                            <option key={i}>{i}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="button-group">
                <button className="button" onClick={handleGenerateRanklist}>
                    Generate Ranklist
                </button>
            </div>
        </div>
    );
};

export default CFSelector;
