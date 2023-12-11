import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import BackgroundImage from '../components/BackgroundImage';
import Header from '../components/Header';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import { useNavigate } from 'react-router-dom';

import introVideo from '../components/IntroVideo/video.mp4';

export default function Login() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');

  const [showIntroVideo, setShowIntroVideo] = useState(true);
  const [introVideoSkipped, setIntroVideoSkipped] = useState(false);

  const skipIntroVideo = () => {
    setShowIntroVideo(false);
    setIntroVideoSkipped(true);
  };

  const handleLogIn = async () => {
    try {
      const { email, password } = formValues;
      const response = await signInWithEmailAndPassword(firebaseAuth, email, password);
      localStorage.setItem('uid', response.user.uid);
      console.log(response);
    } catch (error) {
      if (error.code === 'auth/invalid-email') {
        setErrorMessage('Invalid email address.');
      } else if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        setErrorMessage('Incorrect email or password.');
      } else {
        setErrorMessage('An error occurred while logging in.');
      }
      console.log(error);
    }
  };

  const handleForgotPassword = async () => {
    try {
      await sendPasswordResetEmail(firebaseAuth, forgotPasswordEmail);
      setErrorMessage('Password reset email sent. Check your inbox.');
    } catch (error) {
      if (error.code === 'auth/invalid-email') {
        setErrorMessage('Invalid email address.');
      } else if (error.code === 'auth/user-not-found') {
        setErrorMessage('No user found with this email address.');
      } else {
        setErrorMessage('An error occurred while sending the password reset email.');
      }
      console.log(error);
    }
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate('/');
  });

  useEffect(() => {
    if (!showIntroVideo) {
      // Add any logic you need when the intro video is skipped
    }
  }, [showIntroVideo]);

  const toggleForgotPassword = () => {
    setShowForgotPassword((prevState) => !prevState);
  };

  return (
    <Container>
      {showIntroVideo && !introVideoSkipped && (
        <VideoContainer>
          <video autoPlay controls src={introVideo} type="video/mp4" onEnded={skipIntroVideo} />
          <button className="skip-button" onClick={skipIntroVideo}>
            Skip
          </button>
        </VideoContainer>
      )}
      <BackgroundImage />
      {!showIntroVideo && (
        <div className="content">
          <Header />
          <div className="form-container flex column a-center j-center">
            {showForgotPassword ? (
              <ForgotPasswordForm
                toggleForgotPassword={toggleForgotPassword}
                forgotPasswordEmail={forgotPasswordEmail}
                setForgotPasswordEmail={setForgotPasswordEmail}
                handleForgotPassword={handleForgotPassword}
                errorMessage={errorMessage}
              />
            ) : (
              <LoginForm
                toggleForgotPassword={toggleForgotPassword}
                formValues={formValues}
                setFormValues={setFormValues}
                handleLogIn={handleLogIn}
                errorMessage={errorMessage}
              />
            )}
          </div>
        </div>
      )}
    </Container>
  );
}
// ... Rest of the code remains unchanged ...


const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 15vh 85vh;
    .form-container {
      gap: 2rem;
      height: 85vh;
      .form {
        padding: 2rem;
        background-color: #000000b0;
        width: 100%; /* Make the form full width */
        max-width: 400px; /* Limit the form width on larger screens */
        margin: 0 auto; /* Center the form horizontally */
        gap: 2rem;
        color: white;
        .container {
          gap: 2rem;
          input {
            padding: 0.5rem 1rem;
            width: 100%; /* Make input fields full width */
          }
          button {
            padding: 0.5rem 1rem;
            background-color: #e50914;
            border: none;
            cursor: pointer;
            color: white;
            border-radius: 0.2rem;
            font-weight: bolder;
            font-size: 1.05rem;
            width: 100%; /* Make the button full width */
          }
        }
      }
    }
  }
  .error {
    color: red;
    margin-top: 10px;
  }

  /* Media queries for responsiveness */
  @media (max-width: 768px) {
    .content {
      .form-container {
        .form {
          width: 90%;
          max-width: none;
        }
      }
    }
  }
`;

const VideoContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  video {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
  }

  .skip-button {
    padding: 0.5rem 1rem;
    background-color: #e50914;
    border: none;
    cursor: pointer;
    color: white;
    border-radius: 0.2rem;
    font-weight: bolder;
    font-size: 1.05rem;
    width: 10%;
    transition: background-color 0.3s ease; /* Add a smooth transition for the background color */
  }

  /* Add the hover effect */
  .skip-button:hover {
    background-color: rgba(255, 255, 255, 0.2); /* Change the background color on hover */
  }

  /* Media queries for skip button responsiveness */
  @media (max-width: 768px) {
    .skip-button {
      width: 20%;
      font-size: 0.9rem;
    }
  }
`;
// LoginForm Component
function LoginForm({ toggleForgotPassword, formValues, setFormValues, handleLogIn, errorMessage }) {
  return (
    <div className="form flex column a-center j-center">
      <div className="title">
        <h3>Login</h3>
      </div>
      <div className="container flex column">
        <input
          type="email"
          placeholder="Email Address"
          name="email"
          value={formValues.email}
          onChange={(e) =>
            setFormValues({
              ...formValues,
              [e.target.name]: e.target.value,
            })
          }
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formValues.password}
          onChange={(e) =>
            setFormValues({
              ...formValues,
              [e.target.name]: e.target.value,
            })
          }
        />
        <button onClick={handleLogIn}>Log In</button>
        <button onClick={toggleForgotPassword}>Forgot Password</button>
        {errorMessage && <p className="error">{errorMessage}</p>}
      </div>
    </div>
  );
}



function ForgotPasswordForm({ toggleForgotPassword, forgotPasswordEmail, setForgotPasswordEmail, handleForgotPassword, errorMessage }) {
  return (
    <FormContainer>
      <div className="title">
        <h3>Forgot Password</h3>
      </div>
      <div className="container">
        <input
          type="email"
          placeholder="Enter your email"
          value={forgotPasswordEmail}
          onChange={(e) => setForgotPasswordEmail(e.target.value)}
        />
        <button onClick={handleForgotPassword}>Reset Password</button>
        <button onClick={toggleForgotPassword}>Back to Login</button>
        {errorMessage && <p className="error">{errorMessage}</p>}
      </div>
    </FormContainer>
  );
}

const FormContainer = styled.div`
  background-color: #000000b0;
  width: 100%; /* Make the form full width */
  max-width: 400px; /* Limit the form width on larger screens */
  margin: 0 auto; /* Center the form horizontally */
  gap: 2rem;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;

  .title {
    margin-bottom: 1rem;
  }

  .container {
    gap: 2rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    input {
      padding: 0.5rem 1rem;
      width: 100%; /* Make input fields full width */
    }

    button {
      padding: 0.5rem 1rem;
      background-color: #e50914;
      border: none;
      cursor: pointer;
      color: white;
      border-radius: 0.2rem;
      font-weight: bolder;
      font-size: 1.05rem;
      width: 100%; /* Make the button full width */
    }
  }

  .error {
    color: red;
    margin-top: 10px;
  }
`;



