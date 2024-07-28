import React, { useState, useEffect } from 'react'
import '../css/SessionPlan.css'
import '../css/Table.css'
import beginnerData from '../data/beginnerplan.json'
import advancedData from '../data/advancedplan.json'
import '@fortawesome/fontawesome-free/css/all.min.css'

const SessionPlan = () => {
  const [showResourcesModal, setShowResourcesModal] = useState(false)
  const [showTopicsModal, setShowTopicsModal] = useState(false)
  const [modalContent, setModalContent] = useState('')
  const [modalTitle, setModalTitle] = useState('')
  const [sessionData, setSessionData] = useState([])
  const [activeComponent, setActiveComponent] = useState('Beginner')

  const handleClick = (selectedType) => {
    if (selectedType === 'Advanced') {
      setSessionData(advancedData.Sessions)
    } else {
      setSessionData(beginnerData.Sessions)
    }
  }

  useEffect(() => {
    handleClick('Beginner')
  }, [])

  const handleTitleClick = (topics) => {
    setModalTitle('Topics')
    setModalContent(topics.length > 0 ? topics.join(', ') : 'No topics available')
    setShowTopicsModal(true)
  }

  const handleResourcesClick = (resources) => {
    setModalTitle('Resources')
    setModalContent(resources ? resources : 'No resources available')
    setShowResourcesModal(true)
  }

  return (
    <div>
      <div className="option-button-large">
        <button
          className={`option-button button ${activeComponent === 'Beginner' ? 'active' : ''}`}
          onClick={() => { setActiveComponent('Beginner'); handleClick('Beginner') }}
        >
          Beginner
        </button>
        <button
          className={`option-button button ${activeComponent === 'Advanced' ? 'active' : ''}`}
          onClick={() => { setActiveComponent('Advanced'); handleClick('Advanced') }}
        >
          Advanced
        </button>
      </div>
      <div className="table-container">
        {sessionData.length > 0 && (
          <>
            <table>
              <thead>
                <tr>
                  <th>Week</th>
                  <th>Title</th>
                  <th>Resources</th>
                  <th>Marathon Link</th>
                </tr>
              </thead>
              <tbody>
                {sessionData.map((session, index) => (
                  <tr key={index}>
                    <td>{session.Week}</td>
                    <td>
                      <button className="link-button" onClick={() => handleTitleClick(session.Topics)}>
                        {session.Title}   <i className="fas fa-chevron-down"></i>
                      </button>
                    </td>
                    <td>
                      <button className="link-button" onClick={() => handleResourcesClick(session.Resources)}>
                        <i className="fas fa-chevron-down"></i>
                      </button>
                    </td>
                    <td>
                      {session.MarathonLink}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {showTopicsModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setShowTopicsModal(false)}>&times;</span>
              <h2>{modalTitle}</h2>
              <p>{modalContent}</p>
            </div>
          </div>
        )}

        {showResourcesModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setShowResourcesModal(false)}>&times;</span>
              <h2>{modalTitle}</h2>
              <p>{modalContent}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SessionPlan
