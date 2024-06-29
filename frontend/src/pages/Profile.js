import { useState } from 'react'
import UserProfile from '../components/UserProfile'
import PasswordChange from '../components/PasswordChange'


const Profile = () => {
    const [activeComponent, setActiveComponent] = useState('UserProfile') 
    return (
        <div>
            <button className='rating-button' onClick={() => setActiveComponent('UserProfile')}> Profile</button>
            <button className='rating-button' onClick={() => setActiveComponent('PasswordChange')}> Change Password</button>

            {activeComponent === 'UserProfile' && <UserProfile />}
            {activeComponent === 'PasswordChange' && <PasswordChange />}
        </div>
    )
}

export default Profile