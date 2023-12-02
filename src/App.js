
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateCurrentUser } from "firebase/auth";
import app from './firebase.init';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

const auth = getAuth(app);
function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleEmailChange = event => {
    setEmail(event.target.value);
  }
  const handlePasswordChange = event => {
    setPassword(event.target.value);
  }
  const handleFormSubmit = event => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
        verifyEmail();
      })
      .catch(error => {
        console.error(error);
      })
    event.preventDefault();
  }
  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        console.log('Email Verification Sent');
      })
  }
  return (
    <div>
      <div className="registration w-50 mx-auto mt-20">
        <h2 className='text-success'> Please, Register!!</h2>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onChange={handleEmailChange} type="email" placeholder="Enter email" required />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePasswordChange} type="password" placeholder="Password" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
