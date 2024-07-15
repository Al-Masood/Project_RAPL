import { useState, useEffect } from 'react';
import Ranktable from "../components/Ranktable";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const CodeforcesActivity = () => {
    const [ranklist, setRanklist] = useState('');
    const [loading, setLoading] = useState(true);
    const [activeComponent, setActiveComponent] = useState('allTime');

    const handleClick = async (clickType) => {
        setLoading(true);
        const response = await fetch(`${BACKEND_URL}/cfactivity`, {
            method: 'POST',
            body: JSON.stringify({ type: clickType }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const newRanklist = await response.json();
        console.log(newRanklist)
        setRanklist(newRanklist);
        setLoading(false);
    };


    useEffect(() => {
        handleClick('allTime');
    }, []);

    return (
        <div>
            <div className="option-button-large">
                <button
                    className={`option-button button ${activeComponent === 'allTime' ? 'active' : ''}`}
                    onClick={() => { setActiveComponent('allTime'); handleClick('allTime'); }}
                >
                    All Time
                </button>
                <button
                    className={`option-button button ${activeComponent === 'lastYear' ? 'active' : ''}`}
                    onClick={() => { setActiveComponent('lastYear'); handleClick('lastYear'); }}
                >
                    Last Year
                </button>
                <button
                    className={`option-button button ${activeComponent === 'lastMonth' ? 'active' : ''}`}
                    onClick={() => { setActiveComponent('lastMonth'); handleClick('lastMonth'); }}
                >
                    Last Month
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
    );
};

export default CodeforcesActivity;
