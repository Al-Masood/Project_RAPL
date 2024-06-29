import ChangeRequests from '../components/ChangeRequests'
import TempUsers from '../components/TempUsers'
import VJAdder from '../components/VJAdder'

const AdminPanel = () => {

    return(
        <div>
            <VJAdder/>
            <TempUsers />
            <ChangeRequests />
        </div>
    )
}

export default AdminPanel