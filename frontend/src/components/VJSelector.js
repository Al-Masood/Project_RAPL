import React, { useState } from 'react'

const currentContestNumbers = [627365, 628754, 629205, 630390, 630500, 631401]

const VJSelector = ({updateRanklist}) => {

    const [customContestNumbers, setCustom] = useState([])

    const inputTaken = (event) => {
        setCustom(event.target.value.split(' ').map(Number))
    }

    const currentRanklist = async() => {
        const response = await fetch('http://localhost:4000/api/vjudgeranklist', {
            method: 'POST',
            body: JSON.stringify(currentContestNumbers),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const ranklist = await response.json()
        updateRanklist(ranklist)
    }

    const customRanklist = async() => {
        const response = await fetch('http://localhost:4000/api/vjudgeranklist', {
            method: 'POST',
            body: JSON.stringify(customContestNumbers),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const ranklist = await response.json()
        updateRanklist(ranklist)
    }

    return (
        <div>
            <div>
                <button className = 'button' onClick={currentRanklist}>
                    Ranklist of Current TFCs
                </button>
            </div>
            <div>
                <input
                    className='input-field'
                    type='text'
                    value={customContestNumbers}
                    onChange={inputTaken}
                    placeholder='Enter contest numbers space separated'
                />
            </div>
            <div>
                <button className = 'button' onClick={customRanklist}>
                    Generate Ranklist
                </button>
            </div>
        </div>
    )
}

export default VJSelector