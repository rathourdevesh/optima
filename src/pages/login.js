import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setUserInfo } from '../slices/userSlice';
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBIcon
} from 'mdb-react-ui-kit';
import { jwtDecode } from 'jwt-decode';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${process.env.REACT_APP_BEE_BASE_URL}/api/v1/users/login`, {
                email,
                password,
            });

            if (response.status === 200) {
                const token = response?.data?.data?.access_token;
                localStorage.setItem('token', token);
                dispatch(setUserInfo(jwtDecode(token)));
                navigate('/');
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    return (
        <div className="login">
            <MDBContainer fluid className='d-flex align-items-center justify-content-center' data-bs-theme="dark">
                <div className='mask gradient-custom-3'></div>
                <MDBCard className='m-5'>
                    <MDBCardBody className='px-5'>
                        <h2 className="text-center mb-5">Sign In</h2>
                        <form onSubmit={handleLogin}>
                            <MDBInput wrapperClass='mb-4' label='Email' size='lg' id='form2' type='email' onChange={(e) => setEmail(e.target.value)} />
                            <MDBInput wrapperClass='mb-4' label='Password' size='lg' id='form3' type='password' onChange={(e) => setPassword(e.target.value)} />
                            <MDBBtn className='mb-4 w-100 gradient-custom-4' size='lg' type='submit'>Login</MDBBtn>
                        </form>
                    </MDBCardBody>
                    <div className="text-center">
                        <p>Not a member? <a href="/signup">Register</a></p>

                        <div className='d-flex justify-content-between mx-auto' style={{ width: '40%' }}>
                            <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                                <MDBIcon fab icon='facebook-f' size="sm" />
                            </MDBBtn>

                            <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                                <MDBIcon fab icon='twitter' size="sm" />
                            </MDBBtn>

                            <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                                <MDBIcon fab icon='google' size="sm" />
                            </MDBBtn>

                            <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                                <MDBIcon fab icon='github' size="sm" />
                            </MDBBtn>

                        </div>
                    </div>
                </MDBCard>
            </MDBContainer>
        </div>
    );
}

export default Login;
