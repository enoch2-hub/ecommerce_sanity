import React from 'react';
import {AiFillAccountBook, AiFillAmazonSquare, AiFillInstagram, AiOutlineTwitter} from 'react-icons/ai';


const Footer = () => {
  return (
    <div className="footer-container">
      <p>2023 Ecommerce App All rights reserved</p>
      <p className="icons">
        <AiFillInstagram/>
        <AiOutlineTwitter/>
        <AiFillAmazonSquare/>
        <AiFillAccountBook/>
      </p>
    </div>
  )
}

export default Footer