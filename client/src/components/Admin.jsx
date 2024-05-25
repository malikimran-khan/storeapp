import styled from '@emotion/styled'
import { Button, FormControl, Input, InputLabel, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Container = styled.form`
width : 50%;
margin:5% auto 0 auto;
& > div {
    margin-top: 20px;
  display : flex;
}
`
export default function Admin() {
    const[email , setemail] = useState("")
    const[password , setpassword] = useState("")
    const[errormassage , seterrormassage] = useState()
    const navigate = useNavigate()
    const HandleSubmit = (e)=>{
        e.preventDefault()
        if(email === "imran89@gmail.com" && password=== "6789")
        {
            console.log("admin login successfull")
            navigate('/insertdata')
        }else{
            console.log("admin Failed to login")
            seterrormassage("Please enter coorect email and password")
        }
    }
  return (
    <>
      <Container onSubmit={HandleSubmit}>
        <Typography variant='h3' sx={{textAlign:'center' , textAlign:'center'}}>Admin form</Typography>
        <FormControl>
            <InputLabel>Enter your Email</InputLabel>
            <Input required name='email' onChange={(e)=>setemail(e.target.value)}></Input>
        </FormControl>
        <FormControl>
            <InputLabel>Enter your Password</InputLabel>
            <Input required name='password' onChange={(e)=>setpassword(e.target.value)}></Input>
        </FormControl>
        <FormControl>
             <Button variant='contained' type='submit'>Submit</Button>
        </FormControl>
        {errormassage && (
            <Typography variant='body2' sx={{color : 'red' , mt: 2}}>
            {errormassage}
            </Typography>
        )}
      </Container>
    </>
  )
}
