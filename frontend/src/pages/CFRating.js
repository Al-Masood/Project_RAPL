import {useState} from 'react'
import Ranktable from "../components/Ranktable"

const CodeforcesRating = () => {

    const [type, setType] = useState('')
    const [ranklist, setRanklist] = useState('')
    
    const handleClick = async (clickType) => {
        setType(clickType)
        const response = await fetch('http://localhost:4000/api/cfrating', {
            method: 'POST',
            body: JSON.stringify({type}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
         
        const newRanklist = await response.json()
        setRanklist(newRanklist)
    }

    return(
        <div>
            <div className='option-button-group-large'>
                <button className="option-button button" onClick={ () => handleClick('CurrentRating')}> Current Rating</button>
                <button className="option-button button" onClick={ () => handleClick('MaxRating')}> Maximum Rating</button>
            </div>
            <Ranktable finalRanklist={ranklist}/>
        </div>
    )
}

export default CodeforcesRating