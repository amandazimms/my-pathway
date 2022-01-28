import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


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
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

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
        zipCode: zipCode
      },
    });
  }; // end registerUser

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <label htmlFor="first_name">
          First Name:
          <input
            type="text"
            name="first_name"
            value={firstName}
            required
            onChange={(event) => setFirstName(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="last_name">
          Last Name:
          <input
            type="text"
            name="last_name"
            value={lastName}
            required
            onChange={(event) => setLastName(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="username">
          Email:
          <input
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <div>
        <label htmlFor="address_one">
          Address Line 1:
          <input
            type="text"
            name="address_one"
            value={addressOne}
            required
            onChange={(event) => setAddressOne(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="address_two">
          Address Line 2:
          <input
            type="text"
            name="address_two"
            value={addressTwo}
            onChange={(event) => setAddressTwo(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="city">
          City:
          <input
            type="text"
            name="city"
            value={city}
            required
            onChange={(event) => setCity(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="state">
          State:
          <input
            type="text"
            name="state"
            value={state}
            required
            onChange={(event) => setState(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="zip_code">
          Zip Code:
          <input
            type="text"
            name="zip_code"
            value={zipCode}
            required
            onChange={(event) => setZipCode(event.target.value)}
          />
        </label>
      </div>
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
    </form>
  );
}


export default RegisterForm;
