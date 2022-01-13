import {Form} from 'react-bootstrap'
import React, { useEffect, useState } from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {

  useEffect(()=>{
    dispatchEvent( {type: 'FETCH_QUIZ'})
  })

  return (
    <div className="container">
      <div>
        <p>This about page is for anyone to read!</p>
        <h1>{JSON.stringify(dispatchEvent)}</h1>
      </div>
      
    </div>
  );
}

export default AboutPage;
