// AboutUs.js
import React from 'react';
import './AboutUs.css';

const AboutUs = () => (
  <div className="about-us">
    <h2>About Us</h2>
    <p>Contact us through the following channels:</p>
    <ul>
      <li>WhatsApp: +123456789</li>
      <li>Facebook: <a href="https://facebook.com/yourpage" target="_blank" rel="noopener noreferrer">Our Facebook Page</a></li>
      <li>Phone: +987654321</li>
    </ul>
  </div>
);

export default AboutUs;
