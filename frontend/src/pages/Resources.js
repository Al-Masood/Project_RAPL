import React, { useState } from 'react';
import '../css/Resources.css';
import '../css/Table.css';
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
  };

  const handleTitleClick = (topics) => {
    setModalTitle('Topics');
    setModalContent(topics.length > 0 ? topics.join(', ') : 'No topics available');
    setShowTopicsModal(true);
  };

  const handleResourcesClick = (resources) => {
    setModalTitle('Resources');
    setModalContent(resources ? resources : 'No resources available');
    setShowResourcesModal(true);
  };

  return (
    <div>
      <div className='option-button-group-large'>
        <button className="option-button button" onClick={() => handleClick('Beginner')}>Beginner</button>
        <button className="option-button button" onClick={() => handleClick('Advanced')}>Advanced</button>
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
                        {session.Title}
                      </button>
                    </td>
                    <td>
                      <button className="link-button" onClick={() => handleResourcesClick(session.Resources)}>
                        Resources
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
  );
}

export default Resources;
