import ChangeRequests from '../components/ChangeRequests'
import TempUsers from '../components/TempUsers'
import AddVJContest from '../components/AddVJContest'
import '../css/Admin.css'

const Admin = () => {

    return (
        <div>
            <AddVJContest />
            <TempUsers />
            <ChangeRequests />
        </div>
    )
}

export default Admin