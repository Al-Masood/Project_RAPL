import { useEffect, useState } from "react"

const ChangeRequests = () => {
    const [changeRequests, setChangeRequests] = useState([])

    const fetchChangeRequests = async () => {
        const response = await fetch('http://localhost:4000/api/getchangerequests', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const fetchedChangeRequests = await response.json()
        setChangeRequests(fetchedChangeRequests)
    }

    useEffect(() => {
        fetchChangeRequests()
    })

    const approveChange = async (request) => {
        await fetch('http://localhost:4000/api/approvechange', {
            method: 'POST',
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    const denyChange = async (request) => {
        await fetch('http://localhost:4000/api/denychange', {
            method: 'POST',
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    return(
        <div>
            <ul className="user-list">
                {changeRequests.map(request => (
                    <li key={request._id} className="user-item">
                        <p>Name: {request.name}</p>
                        <p>Email: {request.email}</p>
                        <p>Roll: {request.roll}</p>
                        <p>Codeforces Handle: {request.cfHandle}</p>
                        <p>VJudge Handle: {request.vjHandle}</p>

                        <button className='button' onClick={() => approveChange(request)}>
                            Approve Change
                        </button>

                        <button className='button' onClick={() => denyChange(request)}>
                            Deny Change
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ChangeRequests