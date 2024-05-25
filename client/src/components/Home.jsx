import styled from '@emotion/styled'
import { Button, Typography } from '@mui/material'
import React from 'react'
import bg1 from './images/bg3.jpg'
import { red } from '@mui/material/colors';
import { Link } from 'react-router-dom';
const backgroundStyle = {
    backgroundImage: `url(${bg1})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '91vh',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    flexDirection: 'column', 
  };
  const contentContainer = {
    textAlign: 'center',
    maxWidth: '1100px', 
  };
export default function Home() {
  return (
    <>
    
      <div style={backgroundStyle}>
        <div style={contentContainer}>
        <Typography variant='h6' sx={{color:'yellow'}}>
        Welcome to our innovative and user-friendly store app! We take pride in offering a seamless shopping experience that caters to your every need. Whether you're looking for the latest fashion trends, high-quality electronics, or unique home decor, our store app has it all.
        Explore a vast array of products from renowned brands, curated to meet the diverse preferences of our customers. Enjoy the convenience of browsing through categories, discovering exclusive deals, and making secure purchases with just a few taps.
        Shopping with us is not just a transaction; it's an experience. From a user-friendly interface to swift checkout processes, we aim to make your journey from selection to delivery as smooth as possible. Customer satisfaction is our priority, and our dedicated support team is always ready to assist you with any queries.
        </Typography>
        <Typography variant='h4' sx={{color:'black'}}>To visit or shopping please make account --<Button variant='contained' size='large' color="secondary">
             <Link to={'/signup'}>SignUp</Link></Button></Typography>
        </div>
      </div>
    </>
  )
}
