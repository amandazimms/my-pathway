import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PhotoCapture from '../PhotoCapture/PhotoCapture';
import Button from '@mui/material/Button';
import Footer from '../Footer/Footer';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


function RegisterForm() {
  /*
    Lives on RegisterPage
    
    Register user to the app - they are registered as students by default
    ... alter DB directly (role changes to "PROCTOR") 
    ...or have another proctor make them a proctor in user management tab of nav drawer
  */
  const MySwal = withReactContent(Swal)
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
    try{
      const url = store.image.url.split('?')[0];
      const result = await postImageData();
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

  const validateUser = () => {
    if (firstName === "") {
      MySwal.fire({
        title: 'First name is required.',
        icon: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#1E2A49',
        confirmButtonText: 'OK'
      })
    } else if (lastName === "") {
      MySwal.fire({
        title: 'Last name is required.',
        icon: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#1E2A49',
        confirmButtonText: 'OK'
      })
    } else if (!username.includes("@")||!username.includes(".")) {
      MySwal.fire({
        title: 'Email Invalid.',
        icon: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#1E2A49',
        confirmButtonText: 'OK'
      })
    } else if (password.length < 8) {
      MySwal.fire({
        title: 'Password must be at least 8 characters',
        icon: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#1E2A49',
        confirmButtonText: 'OK'
      })
    } else if (addressOne === "") {
      MySwal.fire({
        title: 'Address Line 1 is required.',
        icon: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#1E2A49',
        confirmButtonText: 'OK'
      })
    } else if (city === "") {
      MySwal.fire({
        title: 'City is required.',
        icon: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#1E2A49',
        confirmButtonText: 'OK'
      })
    } else if ((state.length != 2)) {
      MySwal.fire({
        title: 'State must be a valid 2 character abbreviation',
        icon: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#1E2A49',
        confirmButtonText: 'OK'
      })

    } else if ((zipCode.length != 5)) {
      MySwal.fire({
        title: 'Zip Code must be 5 digits.',
        icon: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#1E2A49',
        confirmButtonText: 'OK'
      })
    } else {
      registerUser();
    }
  };
 
  const setDefaults = () => {
    setFirstName( 'Student' );
    setLastName( 'User' );
    setUsername( 'studentuser@gmail.com' );
    setPassword( 'password' );
    setAddressOne( '1251 Avenue of the Americas' );
    setCity( 'New York' );
    setState( 'NY' );
    setZipCode( '10020' );
  }


  return (
    <form className="formPanel" onSubmit={validateUser}>
      {errors.registrationMessage && (
        <h2 className="alert" role="alert">
          {errors.registrationMessage}
        </h2>
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
              type="number"
              name="zip_code"
              value={zipCode}
              required
              onChange={(event) => setZipCode(event.target.value)}
            />
      
          {takePicture?
            <>
              <Button variant="contained" color="secondary" onClick={() => setTakePicture(false)}>Cancel</Button>
              <PhotoCapture />
            </>:
            <Button variant="contained" color="secondary" onClick={() => setTakePicture(true)}>Take Profile Picture</Button>
          }

      </div>

      <br/><br/>
      
      <div>
        <Button className="btn-primary registerButton" variant="contained" onClick={validateUser}>
          Register
        </Button>
      </div>
      <div>

      </div>
    </form>
  );
}


export default RegisterForm;
