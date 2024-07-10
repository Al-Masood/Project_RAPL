import React, {useState} from 'react'
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const VJAdder = () => {
    const [data, setData] = useState('')

    const inputTaken = (event) => {
        setData(event.target.value)
    }
    
    const addData = async () => {
        await fetch (`${BACKEND_URL}/vjaddcontest`, {
            method: 'POST',
            body: data,
            headers:{
                'Content-Type': 'application/json'
            }
        })
        setData('')
    }

    return(
        <div>
            <div>
                <input
                    className='input-field'
                    type = 'text'
                    value = {data}
                    onChange={inputTaken}
                    placeholder='Enter contest data'
                />
            </div>
            <div>
                <button className = 'button' onClick={addData}>
                    Add Contest Data
                </button>
            </div>
        </div>
    )
}

export default VJAdder