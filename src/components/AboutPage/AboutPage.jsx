import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';



// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage(props) {
  const dispatch = useDispatch();
  const store = useSelector((store) => store);
 

  return (
   <div> 
     <h2 className="heading">Technologies Used</h2>
     <ul>
       <li>PostgreSQL</li>
       <li>Express.Js</li>
       <li>React.Js</li>
       <li>Node.Js</li>
     </ul>
      <br></br>
     <h2 className="heading">Team</h2>
     <ul>
       <li>Amanda Zimmerman</li>
       <li>Chris Nelson</li>
       <li>Jackie Spiess</li>
       <li>Nickolas Cunningham</li>
     </ul>
  </div> 
  );
}

export default AboutPage;
