import React, { useState } from 'react';
import '../css/Resources.css';
import beginnerData from '../data/beginnerplan.json';
import advancedData from '../data/advancedplan.json';

const Resources = () => {
  const [showResourcesModal, setShowResourcesModal] = useState(false);
  const [showTopicsModal, setShowTopicsModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [sessionData, setSessionData] = useState([]);

  const handleClick = (selectedType) => {
    if (selectedType === 'Advanced') {
      setSessionData(advancedData.Sessions);
    } else {
      setSessionData(beginnerData.Sessions);
    }
  }

  const handleTitleClick = (topics) => {
    setModalTitle('Topics');
    setModalContent(topics || 'No topics available');
    setShowTopicsModal(true);
  }

  const handleResourcesClick = (resources) => {
    setModalTitle('Resources');
    setModalContent(resources || 'No resources available');
    setShowResourcesModal(true);
  }

  return (
    <div>
      <div className='option-button-group-large'>
        <button className="option-button button" onClick={() => handleClick('Beginner')}>Beginner</button>
        <button className="option-button button" onClick={() => handleClick('Advanced')}>Advanced</button>
      </div>
      <div className="table-container">
        {sessionData.length > 0 && (
          <>
            <h1>Sessions</h1>
            <table>
              <thead>
                <tr>
                  <th>Week</th>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Resources</th>
                </tr>
              </thead>
              <tbody>
                {sessionData.map((session, index) => (
                  <tr key={index}>
                    <td>{session.Week}</td>
                    <td>
                      <button className="link-button" onClick={() => handleTitleClick(session.Topics)}>
                        {session.Topics ? session.Topics.split('\n')[0] : 'No Title'}
                      </button>
                    </td>
                    <td>{session.Date}</td>
                    <td>
                      <button className="link-button" onClick={() => handleResourcesClick(session.Resources)}>
                        Resources
                      </button>
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
  );
}

export default Resources;
