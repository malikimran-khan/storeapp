import { Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
export default function InsertData() {
  return (
    <>
    <div   style={{
          background: 'linear-gradient(to right, #2196F3 0%, #0D47A1 25%, #673AB7 50%, #3F51B5 75%)',
          height:'100vh'
        }}> 
<Typography variant='h5' sx={{ p: 5, color: 'white', textAlign: 'center' }}>
        You can insert all types of data according to your requirements or needs, and remember that authentic and accurate data will be entered. No doubt you can modify or delete data; this functionality is also provided, but authentication always matters.<br />
      </Typography>

      <Typography variant='h4' sx={{ p: 3, color: 'white', textAlign: 'center' }}>
        Insert Data for devices <br></br>
        <Link to={'/laptop'}>Laptop  </Link>
        <Link to={'/mobail'}>Mobail  </Link>
        <Link to={'/iphone'}>iphone   </Link>
        <Link to={'/desktop'}>Desktop  </Link>
        <Link to={'/tabs'}>Tabs </Link>
        </Typography>
        
      </div>
    </>
  )
}
