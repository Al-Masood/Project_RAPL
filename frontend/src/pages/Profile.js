import { useState } from 'react'
import UpdateInfo from '../components/UpdateInfo'
import PasswordChange from '../components/PasswordChange'


const Profile = () => {
    const [activeComponent, setActiveComponent] = useState(UpdateInfo) 
    return (
        <div>
            <button className='rating-button' onClick={() => setActiveComponent('UpdateInfo')}> Update Info</button>
            <button className='rating-button' onClick={() => setActiveComponent('PasswordChange')}> Change Password</button>

            {activeComponent === 'UpdateInfo' && <UpdateInfo />}
            {activeComponent === 'PasswordChange' && <PasswordChange />}

        </div>
    )
}

export default Profile