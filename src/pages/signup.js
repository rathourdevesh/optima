import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBIcon
} from 'mdb-react-ui-kit';

function Register() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_BEE_BASE_URL}/api/v1/users/register`, {
                name,
                phone,
                email,
                password,
            });

            if (response.status === 200) {
                navigate('/login');
            } else {
                console.error('Registration failed');
            }
        } catch (error) {
            console.error('An error occurred during registration:', error);
        }
    };

    return (
        <div className="login">
            <MDBContainer fluid className='d-flex align-items-center justify-content-center' data-bs-theme="dark">
                <div className='mask gradient-custom-3'></div>
                <MDBCard className='m-5'>
                    <MDBCardBody className='px-5'>
                        <h2 className="text-center mb-5">Create Your Account</h2>
                        <form onSubmit={handleRegister}>
                            <MDBInput wrapperClass='mb-4' label='Name' size='lg' id='form1' type='text' value={name} onChange={(e) => setName(e.target.value)} required />
                            <MDBInput wrapperClass='mb-4' label='Phone' size='lg' id='form2' type='tel' value={phone} onChange={(e) => setPhone(e.target.value)} required />
                            <MDBInput wrapperClass='mb-4' label='Email' size='lg' id='form3' type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                            <MDBInput wrapperClass='mb-4' label='Password' size='lg' id='form4' type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                            <MDBInput wrapperClass='mb-4' label='Retype Password' size='lg' id='form5' type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                            <MDBBtn className='mb-4 w-100 gradient-custom-4' size='lg' type='submit'>Register</MDBBtn>
                        </form>
                    </MDBCardBody>
                    <div className="text-center">
                        <p>Already a member? <a href="/login">LogIn</a></p>
                    </div>
                </MDBCard>
            </MDBContainer>
        </div>
    );
}

export default Register;
