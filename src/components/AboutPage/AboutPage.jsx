import {Form} from 'react-bootstrap'
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  const dispatch = useDispatch();
  const store = useSelector((store) => store);

  useEffect(()=>{
    dispatch( {type: 'FETCH_TEST'})
  }, [])

  return (
    <div className="container">
      <div>
        <p>This about page is for anyone to read!</p>
        <h1>{JSON.stringify(store.quiz)}</h1>
      </div>
      
    </div>
  );
}

export default AboutPage;
