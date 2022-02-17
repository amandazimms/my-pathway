import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import ImageDisplay from '../ImageDisplay/ImageDisplay';


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
       <li>Amanda Zimmerman: Full Stack, Saga Girl</li>
       <li>Chris Nelson: Research and Development, The Spiker</li>
       <li>Jackie Spiess: Front End, Master Stylist</li>
       <li>Nickolas Cunningham: Back End, Databoy</li>
     </ul>
  </div> 
  );
}

export default AboutPage;
