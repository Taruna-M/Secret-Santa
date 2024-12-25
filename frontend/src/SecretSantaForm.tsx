import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

// Set the app element for accessibility
Modal.setAppElement('#root');

const SecretSantaForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [responseDetails, setResponseDetails] = useState<{ [key: string]: any }>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .patch(`https://secret-santa-ten-nu.vercel.app/api/assign`, { email })
      .then((res) => {
        setResponseDetails(res.data.response);
        setModalIsOpen(true);
        setEmail('');
      })
      .catch((err) => {
        console.error(err);
        alert('Uh Oh! Looks like this email is not valid.');
      });
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e5799 0%,#207cca 29%,#2989d8 50%,#7db9e8 100%)',
      fontFamily: 'Arial, sans-serif',
    },
    form: {
      background: 'rgba(255, 255, 255, 0.9)',
      padding: '2rem',
      borderRadius: '10px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      width: '300px',
    },
    title: {
      color: '#c41e3a',
      textAlign: 'center' as const,
      marginBottom: '1.5rem',
      fontSize: '1.8rem',
      textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
    },
    inputGroup: {
      marginBottom: '1rem',
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      color: '#006400',
      fontWeight: 'bold',
    },
    input: {
      width: '100%',
      padding: '0.5rem',
      border: '2px solid #c41e3a',
      borderRadius: '4px',
      fontSize: '1rem',
    },
    button: {
      width: '100%',
      padding: '0.75rem',
      backgroundColor: '#c41e3a',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    modal: {
      content: {
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '10px',
        padding: '2rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: '400px',
        margin: 'auto',
      },
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
    },
    modalTitle: {
      color: '#c41e3a',
      fontSize: '1.5rem',
      textAlign: 'center' as const,
      marginBottom: '1rem',
    },
    modalContent: {
      fontSize: '1rem',
      color: '#333',
      marginBottom: '1.5rem',
    },
    closeButton: {
      width: '100%',
      padding: '0.75rem',
      backgroundColor: '#006400',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>🎅 Secret Santa Sign Up 🎄</h2>
        <div style={styles.inputGroup}>
          <label htmlFor="email" style={styles.label}>
            Your Registered Email on Rablo:
          </label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
            placeholder="santa.claus@gmail.com"
          />
        </div>
        <button type="submit" style={styles.button}>
          Join the Holiday Fun! 🎁
        </button>
      </form>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={styles.modal}
      >
        <h3 style={styles.modalTitle}>🎉 Secret Santa Details 🎁</h3>
        <div style={styles.modalContent}>
          {responseDetails ? (
            <>
            <h2 style={styles.modalContent}>Yay! You are the Secret Santa to {responseDetails.participantName} so be sure to get them a meaningful gift. Below you can find their details needed to deliver their gift. Merry Christmas!</h2>
              <p>
                <strong>Assigned to:</strong> {responseDetails.participantName}
              </p>
              <p>
                <strong>Email:</strong> {responseDetails.email}
              </p>
              <p>
                <strong>Contact Number:</strong> {responseDetails.contactNumber}
              </p>
              <p>
                <strong>Address:</strong> {responseDetails.address}
              </p>
              <div>
                <strong>Services:</strong>
                {responseDetails.services && responseDetails.services.length > 0 ? (
                  <ul>
                    {responseDetails.services.map((service, index) => (
                      <li style={{ textTransform: 'capitalize' }} key={index}>
                        {service}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No services available.</p>
                )}
              </div>
            </>
          ) : (
            <p>No details available.</p>
          )}
        </div>
        <button onClick={() => setModalIsOpen(false)} style={styles.closeButton}>
          Close
        </button>
      </Modal>
    </div>
  );
};

export default SecretSantaForm;
