import React, { useState } from 'react';
import ICPCFinalists from "../components/ICPCFinalists";
import Masters from "../components/Masters";

const HallofFame = () => {
    const [type, setType] = useState('');

    const handleClick = (selectedType) => {
        setType(selectedType);
    };

    return (
        <div>
            <div className='option-button-group-large'>
                <button className="option-button button" onClick={() => handleClick('finalists')}>ICPC Finalists</button>
                <button className="option-button button" onClick={() => handleClick('masters')}>Masters</button>
            </div>
            <div className='content'>
                {type === 'finalists' && <ICPCFinalists />}
                {type === 'masters' && <Masters />}
            </div>
        </div>
    );
}

export default HallofFame;
