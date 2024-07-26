import { useEffect, useState } from "react"
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const ChangeRequests = () => {
    const [changeRequests, setChangeRequests] = useState([])

    const fetchChangeRequests = async () => {
        const response = await fetch(`${BACKEND_URL}/getchangerequests`, {
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
        await fetch(`${BACKEND_URL}/approvechange`, {
            method: 'POST',
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    const denyChange = async (request) => {
        await fetch(`${BACKEND_URL}/denychange`, {
            method: 'POST',
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    return (
        <div className="list">
            <h3> Change Requests </h3>
            {changeRequests.map(request => (
                <div className="item">
                    <div className="details-group">
                        <label>Name:</label>
                        <span>{request.name}</span>
                    </div>

                    <div className="details-group">
                        <label>Email:</label>
                        <span>{request.email}</span>
                    </div>

                    <div className="details-group">
                        <label>Roll:</label>
                        <span>{request.roll}</span>
                    </div>

                    <div className="details-group">
                        <label>Codeforces Handle:</label>
                        <span>{request.cfHandle}</span>
                    </div>

                    <div className="details-group">
                        <label>Vjudge Handle:</label>
                        <span>{request.vjHandle}</span>
                    </div>

                    <div className="details-group">
                        <label>CodeChef Handle:</label>
                        <span>{request.ccHandle}</span>
                    </div>

                    <div className="details-group">
                        <label>Atcoder Handle:</label>
                        <span>{request.atcoderHandle}</span>
                    </div>

                    <div className="button-group">
                        <button className='button' onClick={() => approveChange(request)}>
                            Approve Change
                        </button>

                        <button className='button' onClick={() => denyChange(request)}>
                            Deny Change
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ChangeRequests