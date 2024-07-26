import React, { useState } from 'react'
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const AddVJContest = () => {
    const [data, setData] = useState('')

    const inputTaken = (event) => {
        setData(event.target.value)
    }

    const addData = async () => {
        await fetch(`${BACKEND_URL}/addvjcontest`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        setData('')
    }

    return (
        <div className='add-vj-contest'>
            <h3>Add Vjudge Contest Data</h3>
            <div>
                <input
                    className='input-field'
                    type='text'
                    value={data}
                    onChange={inputTaken}
                    placeholder='Enter contest data'
                />
            </div>
            <div>
                <button className='button' onClick={addData}>
                    Add Contest Data
                </button>
            </div>
        </div>
    )
}

export default AddVJContest