import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import ImageDisplay from '../ImageDisplay/ImageDisplay';


function AboutPage(props) {
  const dispatch = useDispatch();
  const store = useSelector((store) => store);
 

  return (
   <div> 
     <ImageDisplay
       url={"https://kyros-exam-objects.s3.us-east-2.amazonaws.com/wlUjXXAP6ZLzStdDh88MLI4FvZ4OKeCQ"}
       class={"largeImageDisplay"}
     />
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
