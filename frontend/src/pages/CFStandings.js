import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import Ranktable from '../components/Ranktable';
import '../css/Selector.css';
import customStyles from '../components/SelectorCustomStyles';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const CodeforcesStandings = () => {
    const [contests, setContests] = useState([]);
    const [selectedContestId, setSelectedContestId] = useState('');
    const [ranklist, setRanklist] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchContests = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/getcontests`, {
                    method: 'GET'
                });
                const recentContests = await response.json();
                setContests(recentContests);
            } catch (error) {
                console.error("Error fetching contests:", error);
            }
        };
        fetchContests();
    }, []);

    useEffect(() => {
        const fetchStandings = async () => {
            if (selectedContestId) {
                setLoading(true);

                try {
                    const response = await fetch(`${BACKEND_URL}/cfstandings`, {
                        method: 'POST',
                        body: JSON.stringify({ selectedContestId }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setRanklist(data);
                    } else {
                        console.error("Error fetching standings:", response.statusText);
                    }
                } catch (error) {
                    console.error("Error fetching standings:", error);
                } finally {
                    setLoading(false); 
                }
            }
        };

        fetchStandings();
    }, [selectedContestId]);

    const handleContestChange = (selectedOption) => {
        setSelectedContestId(selectedOption.value);
    };

    const contestOptions = contests.map(contest => ({
        value: contest.number,
        label: contest.name
    }));

    const customStylesWidth = {
        control: (provided) => ({
            ...provided,
            width: '500px', 
        }),
        menu: (provided) => ({
            ...provided,
            width: '500px', 
        }),
        ...customStyles 
    };

    return (
        <div>
            <div className='selector'>
                <label>Select Contest:</label>
                <div className="select-wrapper">
                    <Select 
                        styles={customStylesWidth}
                        options={contestOptions} 
                        onChange={handleContestChange} 
                        value={contestOptions.find(option => option.value === selectedContestId)} 
                        placeholder="Select a contest"
                    />
                </div>
            </div>
            {loading ? (
                <div className="loading-spinner-container">
                    <div className="loading-spinner"></div>
                </div>
            ) : (
                <Ranktable finalRanklist={ranklist} />
            )}
        </div>
    );
};

export default CodeforcesStandings;
