import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import '../css/Selector.css';

import customStyles from './SelectorCustomStyles';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const CFSelector = ({ updateURL, initial }) => {
    const [year, setYear] = useState(initial.year || 2024);
    const [month, setMonth] = useState(initial.month || 1);
    const [bestof, setBestof] = useState(initial.bestof || 0);
    const [count, setCount] = useState(0);

    useEffect(() => {
        fetch(`${BACKEND_URL}/cfcontestcount`, {
            method: 'POST',
            body: JSON.stringify([year, month]),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => setCount(data));
    }, [year, month]);

    const updateYear = (selectedOption) => {
        setYear(selectedOption.value);
        setBestof(0);
    };

    const updateMonth = (selectedOption) => {
        setMonth(selectedOption.value);
        setBestof(0);
    };

    const updateBestof = (selectedOption) => {
        setBestof(selectedOption.value);
    };

    const handleGenerateRanklist = () => {
        updateURL(year, month, bestof);
    };

    const yearOptions = [
        { value: 2024, label: 2024 },
    ];

    const monthOptions = Array.from({ length: 12 }, (_, i) => ({
        value: i + 1,
        label: i + 1
    }));

    const bestofOptions = Array.from({ length: count + 1 }, (_, i) => ({
        value: i,
        label: i
    }));

    return (
        <div className='selector'>
            <div className="selector-row">
                <label>Select Year:</label>
                <div className="select-wrapper">
                    <Select 
                        styles={customStyles}
                        options={yearOptions} 
                        onChange={updateYear} 
                        value={yearOptions.find(option => option.value === year)} 
                    />
                </div>
                <label>Select Month:</label>
                <div className="select-wrapper">
                    <Select 
                        styles={customStyles}
                        options={monthOptions} 
                        onChange={updateMonth} 
                        value={monthOptions.find(option => option.value === month)} 
                    />
                </div>
                <label>Best of:</label>
                <div className="select-wrapper">
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
    );
};

export default CFSelector;
