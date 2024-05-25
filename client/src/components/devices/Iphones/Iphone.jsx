import styled from '@emotion/styled'
import { Button, FormControl, Input, InputLabel, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const Container= styled.form`
width:50%;
margin : 5% auto 0 auto
`
const FieldContainer = styled.div`
margin-top: 20px;
display: flex;
flex-direction: column;
`
export default function Iphone() {
  const[name , setname] = useState("")
  const[color , setcolor] = useState("")
  const[price , setprice] = useState("")
  const[condition , setcondition] = useState("")
  const[image , setimage] = useState(null)

  const HandleSubmit=async(e)=>{
  e.preventDefault()
  const formdata = new FormData()
  formdata.append("file-upload" , image)
  try{
    const response = await axios.post("http://localhost:8000/api/iphonemulter" , formdata)
    if(response.data.name)
    {
      console.log({name:name , color : color , price : price , condition : condition , image : response.data.name})
      const responsedata = await axios.post("http://localhost:8000/api/iphoneinsert" , {
        name , color , price , condition ,image:response.data.name
      })
      console.log(responsedata)
    }
  }catch(error)
  {
    console.log("Error in inserting data in front end in iphone" , error)
  }
  }
  return (
    <>
      <Container onSubmit={HandleSubmit}>
        <Typography variant='h5' sx={{textAlign:'center'}}>Insert Iphone data</Typography>
        <FieldContainer>
          <FormControl>
            <InputLabel>Iphone name</InputLabel>
            <Input required name='name' onChange={(e)=>setname(e.target.value)}></Input>
          </FormControl>
        </FieldContainer>
        <FieldContainer>
          <FormControl>
            <InputLabel>Iphone color</InputLabel>
            <Input required name='color' onChange={(e)=>setcolor(e.target.value)}></Input>
          </FormControl>
        </FieldContainer>
        <FieldContainer>
          <FormControl>
            <InputLabel>Iphone price</InputLabel>
            <Input required name='price' onChange={(e)=>setprice(e.target.value)}></Input>
          </FormControl>
        </FieldContainer>
        <FieldContainer>
          <FormControl>
            <InputLabel>Iphone condition</InputLabel>
            <Input required name='condition' onChange={(e)=>setcondition(e.target.value)}></Input>
          </FormControl>
        </FieldContainer>
        <FieldContainer>
          <FormControl>
            <InputLabel>Select image</InputLabel>
            <Input required name='image' type='file' onChange={(e)=>setimage(e.target.files[0])}></Input>
          </FormControl>
        </FieldContainer>
        <FieldContainer>
          <FormControl>
            <Button variant='contained' type='submit'>Insert Data</Button>
          </FormControl>
        </FieldContainer>
        <Typography variant='h5' sx={{m:3}}>If you want to modify <Link to={'/iphonemodify'}>Click</Link></Typography>
      </Container>
    </>
  )
}
