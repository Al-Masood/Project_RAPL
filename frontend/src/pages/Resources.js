import React, { useState, useEffect } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import data from '../data/advancedplan.json';

const Resources = () => {
  const [showResourcesModal, setShowResourcesModal] = useState(false);
  const [showTopicsModal, setShowTopicsModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [sessionData, setSessionData] = useState([]);

  useEffect(() => {
    // Debugging: Check the imported data
    console.log(data);

    if (Array.isArray(data.Sessions)) {
      setSessionData(data.Sessions);
    } else {
      console.error('The imported data is not an array:', data);
    }
  }, []);

  const handleTitleClick = (topics) => {
    setModalTitle('Topics');
    setModalContent(topics || 'No topics available');
    setShowTopicsModal(true);
  };

  const handleResourcesClick = (resources) => {
    setModalTitle('Resources');
    setModalContent(resources || 'No resources available');
    setShowResourcesModal(true);
  };


  return (
    <div className="container">
      <h1>Sessions</h1>
      <Table>
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
                <Button variant="link" onClick={() => handleTitleClick(session.Topics)}>
                  {session.Topics ? session.Topics.split('\n')[0] : 'No Title'}
                </Button>
              </td>
              <td>{session.Date}</td>
              <td>
                <Button variant="link" onClick={() => handleResourcesClick(session.Resources)}>
                  Resources
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showTopicsModal} onHide={() => setShowTopicsModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalContent}</Modal.Body>
      </Modal>

      <Modal show={showResourcesModal} onHide={() => setShowResourcesModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalContent}</Modal.Body>
      </Modal>
    </div>
  );
};

export default Resources;
