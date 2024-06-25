import {useState} from 'react'
import Ranktable from "../components/Ranktable"

const CodeforcesRating = () => {

    const [type, setType] = useState('')
    const [ranklist, setRanklist] = useState('')
    
    const handleClick = async (clickType) => {
        setType(clickType)
        const response = await fetch('http://localhost:4000/api/cfactivity', {
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
            <div className='rating-button-container'>
                <button className="rating-button" onClick={ () => handleClick('allTime')}> All Time</button>
                <button className="rating-button" onClick={ () => handleClick('lastYear')}> Last Year</button>
                <button className="rating-button" onClick={ () => handleClick('lastMonth')}> Last Month</button>
            </div>
            <Ranktable finalRanklist={ranklist}/>
        </div>
    )
}

export default CodeforcesRating