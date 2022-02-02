import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PhotoCapture from '../PhotoCapture/PhotoCapture';
import Button from '@mui/material/Button';




function RegisterForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [addressOne, setAddressOne] = useState('');
  const [addressTwo, setAddressTwo] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [takePicture, setTakePicture] = useState(false);
  const errors = useSelector((store) => store.errors);
  const store = useSelector((store) => store);
  const dispatch = useDispatch();

  const postImageData = async () => {
    if(store.image.url != '/images/profile_default.png'){
      const url = store.image.url;
      console.log('url = ', url);
      return await fetch(url,{
        method: 'PUT',
        headers: {
          'Content-Type' : 'jpeg'
        },
        body: store.image.data
      });
    }
  }

  const registerUser = async (event) => {
    event.preventDefault();
    try{
      const url = store.image.url.split('?')[0];
      console.log('line 39 url = ', url);        
      const result = await postImageData();
      console.log(result);
      dispatch({
        type: 'REGISTER',
        payload: {
          firstName: firstName,
          lastName: lastName,
          username: username,
          password: password,
          addressOne: addressOne,
          addressTwo: addressTwo,
          city: city,
          state: state,
          zipCode: zipCode,
          profilePicture:url
        },
      });
      dispatch({
        type: 'UNSET_IMAGE_DATA'
      })
      dispatch({
        type: 'UNSET_IMAGE_URL'
      })
    } catch (err) {
      console.error('Registration Error:', err);
    }
  }; // end registerUser

  return (
    <form className="formPanel" onSubmit={registerUser}>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div className="loginContainer">
          <input
            placeholder="First Name"
            className="loginInput"
            type="text"
            name="first_name"
            value={firstName}
            required
            onChange={(event) => setFirstName(event.target.value)}
          />
          <input
            placeholder="Last Name"
            className="loginInput"
            type="text"
            name="last_name"
            value={lastName}
            required
            onChange={(event) => setLastName(event.target.value)}
          />
        
          <input
            placeholder="Email address"
            className="loginInput"
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
       <input
            placeholder="Password"
            className="loginInput"
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
          <input
              placeholder="Address Line 1"
              className="loginInput"
              type="text"
              name="address_one"
              value={addressOne}
              required
              onChange={(event) => setAddressOne(event.target.value)}
            />
          <input
              placeholder="Address Line 2"
              className="loginInput"
              type="text"
              name="address_two"
              value={addressTwo}
              onChange={(event) => setAddressTwo(event.target.value)}
            />
          
         <input
              placeholder="City"
              className="loginInput"
              type="text"
              name="city"
              value={city}
              required
              onChange={(event) => setCity(event.target.value)}
            />
            <input
              placeholder="State"
              className="loginInput"
              type="text"
              name="state"
              value={state}
              required
              onChange={(event) => setState(event.target.value)}
            />
            <input
              placeholder="Zip Code"
              className="loginInput" 
              type="text"
              name="zip_code"
              value={zipCode}
              required
              onChange={(event) => setZipCode(event.target.value)}
            />
      
          {takePicture?
            <>
              <Button variant="contained" onClick={() => setTakePicture(false)}>Cancel</Button>
              <PhotoCapture />
            </>:
            <Button variant="contained" onClick={() => setTakePicture(true)}>Take Profile Picture</Button>
          }

      </div>
      <div>
        <Button className="btn-primary registerButton" variant="contained" onClick={registerUser}>
          Register
        </Button>
      </div>
    </form>
  );
}


export default RegisterForm;
