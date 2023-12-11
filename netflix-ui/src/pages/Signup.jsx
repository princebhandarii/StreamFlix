import React, { useState } from 'react';
import styled from 'styled-components';
import BackgroundImage from '../components/BackgroundImage';
import Header from '../components/Header';
import { createUserWithEmailAndPassword, onAuthStateChanged, fetchSignInMethodsForEmail } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });

  const handleSignIn = async () => {
    try {
      const { email, password } = formValues;
      if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        return; // Stop execution if the password is too short
      }

      // Check if the email already exists
      const isEmailExists = await checkEmailExists(email);

      if (isEmailExists) {
        alert('An account with this email address already exists.');
        return; // Stop execution if the email already exists
      }

      // Create a new user if the email doesn't exist
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  const checkEmailExists = async (email) => {
    try {
      const methods = await fetchSignInMethodsForEmail(firebaseAuth, email);
      return methods && methods.length > 0;
    } catch (error) {
      console.error('Error checking email existence:', error);
      return false;
    }
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate('/');
  });

  return (
    <Container showPassword={showPassword}>
      <BackgroundImage />
      <div className="content">
        <Header login />
        <div className="body flex column j-center a-center">
          <div className="text flex column">
            <h1>Unlimited movies, TV shows, and more</h1>
            <h4>Watch anywhere. Cancel anytime.</h4>
            <h6>Ready to watch? Enter your email to create or restart membership</h6>
          </div>
          <div className="form">
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
            {showPassword && (
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
            )}

            {!showPassword && (
              <button onClick={() => setShowPassword(true)}>Get Started</button>
            )}
          </div>
          <button onClick={handleSignIn}>Sign Up</button>
        </div>
      </div>
    </Container>
  );
}

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
    .body {
      gap: 1rem;
      .text {
        gap: 1rem;
        text-align: center;
        font-size: 2rem;
        h1 {
          padding: 0 25rem;
        }
      }
      .form {
        display: grid;
        grid-template-columns: ${({ showPassword }) =>
          showPassword ? '1fr 1fr' : '2fr 1fr'};
        width: 60%;

        input {
          color: black;
          border: none;
          padding: 1.5rem;
          font-size: 1.2rem;
          border: 1px solid black;
          &:focus {
            outline: none;
          }
        }

        button {
          padding: 0.5rem 1rem;
          background-color: #e50914;
          border: none;
          cursor: pointer;
          color: white;
          font-weight: bolder;
          font-size: 1.05rem;
        }
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
      }
    }
  }

  @media (max-width: 768px) {
    .body {
      .text {
        h1 {
          padding: 0 2rem; /* Adjust padding for smaller screens */
        }
      }
      .form {
        width: 80%; /* Adjust form width for smaller screens */
        grid-template-columns: 1fr; /* Stack inputs on top of each other for smaller screens */
        button {
          width: 100%; /* Make the button full width on smaller screens */
        }
      }
    }
  }
`;
