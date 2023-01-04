import React from 'react';
import jwt_decode from 'jwt-decode';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { client } from '../client';
const Login = () => {
  const navigate = useNavigate();
  const onSuccess = (credentialResponse)=> {
    let decoded = jwt_decode(credentialResponse.credential);
    localStorage.setItem('user',JSON.stringify(decoded));
    const {name, aud, picture } = decoded;
    const doc = {
      _id: aud,
      _type: 'user',
      userName: name,
      image: picture,
    }
    client.createIfNotExists(doc).then(()=> {
      navigate('/', {replace: true })
    })
  }
  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <h1>AllReviews</h1>
      <GoogleLogin
        onSuccess={onSuccess}
        onError={() => {
          console.log('Login Failed');
          }}
      />
    </div>
  );
};

export default Login;