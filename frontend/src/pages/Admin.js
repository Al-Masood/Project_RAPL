import ChangeRequests from '../components/ChangeRequests'
import TempUsers from '../components/TempUsers'
import AddVJContest from '../components/AddVJContest'
import '../css/Admin.css'

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL


const Admin = () => {
    const handleupdaterating = async () => {
        await fetch(`${BACKEND_URL}/updaterating`, {
            method: 'POST',
        })
    }
    const handleupdateproblemcount = async () => {
        await fetch(`${BACKEND_URL}/updateproblemcount`, {
            method: 'POST',
        })
    }

    return (
        <div>
            <div className='button-group'>
                <button className='button' onClick={handleupdaterating}>
                    Update Codeforces Rating
                </button>
                <button className='button' onClick={handleupdateproblemcount}>
                    Update Codeforces Problem Count
                </button>
            </div>
            
            <AddVJContest />
            <TempUsers />
            <ChangeRequests />
        </div>
    )
}

export default Admin