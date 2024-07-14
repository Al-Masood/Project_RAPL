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

    return (
        <div>
            <div className='selector'>
                <label>Select Contest:</label>
                <div className="select-wrapper">
                    <Select 
                        styles={customStyles}
                        options={contestOptions} 
                        onChange={handleContestChange} 
                        value={contestOptions.find(option => option.value === selectedContestId)} 
                        placeholder="Select a contest"
                    />
                </div>
            </div>
            <Ranktable finalRanklist={ranklist} />
        </div>
    );
};

export default CodeforcesStandings;
