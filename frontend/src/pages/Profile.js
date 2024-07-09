import { useState } from 'react'
import UserProfile from '../components/UserProfile'
import PasswordChange from '../components/PasswordChange'

const Profile = () => {
    const [activeComponent, setActiveComponent] = useState('UserProfile')

    return (
        <div>
            <div className="option-button-group">
                <button
                    className={`option-button button ${activeComponent === 'UserProfile' ? 'active' : ''}`}
                    onClick={() => setActiveComponent('UserProfile')}
                >
                    Profile
                </button>
                <button
                    className={`option-button button ${activeComponent === 'PasswordChange' ? 'active' : ''}`}
                    onClick={() => setActiveComponent('PasswordChange')}
                >
                    Change Password
                </button>
            </div>

            <div>
                {activeComponent === 'UserProfile' && <UserProfile />}
                {activeComponent === 'PasswordChange' && <PasswordChange />}
            </div>
        </div>
    )
}

export default Profile
