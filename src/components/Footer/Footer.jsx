import React from 'react';
import './Footer.css';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';


function Footer() {
  return (
    <footer>
      <a className="socialFooterIcon" target="_blank" href="https://www.facebook.com/PathwaysMinneapolis/"><FacebookIcon /></a>
      <a className="socialFooterIcon" target="_blank" href="https://www.youtube.com/user/MinneapolisPathways"><YouTubeIcon /></a>
      <a className="socialFooterIcon" target="_blank" href="https://twitter.com/Pathways_Mpls"><TwitterIcon /></a>
      <a className="socialFooterIcon" target="_blank" href="https://www.instagram.com/pathwaysminneapolis/"><InstagramIcon /></a>
      <p>www.kyros.care</p>
    </footer>
  );
}

export default Footer;
