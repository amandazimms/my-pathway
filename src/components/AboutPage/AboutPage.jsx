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
 

  return (
   <>About</> 
  );
}

export default AboutPage;
