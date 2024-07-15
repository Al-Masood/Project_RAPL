import React, { useState, useEffect } from 'react';
import ICPCFinalists from "../components/ICPCFinalists";
import Masters from "../components/Masters";

const HallofFame = () => {
    const [type, setType] = useState('');
    const [activeComponent, setActiveComponent] = useState('finalists');


    const handleClick = (selectedType) => {
        setType(selectedType);
    };

    useEffect(() => {
        handleClick('finalists');
    }, []);

    return (
        <div>
            <div className="option-button-large">
                <button
                    className={`option-button button ${activeComponent === 'finalists' ? 'active' : ''}`}
                    onClick={() => { setActiveComponent('finalists'); handleClick('finalists'); }}
                >
                    ICPC World Finalists
                </button>
                <button
                    className={`option-button button ${activeComponent === 'masters' ? 'active' : ''}`}
                    onClick={() => { setActiveComponent('masters'); handleClick('masters'); }}
                >
                    Codeforces Masters
                </button>
            </div>
            <div className='content'>
                {type === 'finalists' && <ICPCFinalists />}
                {type === 'masters' && <Masters />}
            </div>
        </div>
    );
}

export default HallofFame;