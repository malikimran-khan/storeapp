import styled from '@emotion/styled'
import { Button, FormControl, Input, InputLabel, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
const Container = styled.form`
width: 50%;
margin: 5% auto 0 auto;
`
const FieldContainer = styled.div`
margin-top: 20px;
display: flex;
flex-direction: column;
`
export default function Mobailupdate() {
  const{id} = useParams()
  const navigate = useNavigate()
  const[formdata , setformdata] = useState({
    company:'' ,
    color : '' , 
    model : '' , 
    ram : '',
    memory : '' , 
    image : null
  })
  useEffect(()=>{
    const fetchmobaildata = async(e)=>{
         try{
              const response = await axios.get(`http://localhost:8000/api/fetchid/${id}`)
              const mobail = response.data
              setformdata({
                comapny : mobail.company ,
                color : mobail.color , 
                model : mobail.model , 
                ram : mobail.ram , 
                memory : mobail.memory , 
              })
         }catch(error)
         {
          console.log("Error in first fetch and updating data in front in mobail" , error)
         }
    } 
    fetchmobaildata()
  },[])
  const HandleSubmit = async(e)=>{
    e.preventDefault()
    try{
          const formdatatoupdate = new FormData()
          formdatatoupdate.append('company' , formdata.company)
          formdatatoupdate.append('color' , formdata.color)
          formdatatoupdate.append('model' , formdata.model)
          formdatatoupdate.append('ram' , formdata.ram)
          formdatatoupdate.append('memory' , formdata.memory)
          formdatatoupdate.append('image' , formdata.image)
          await axios.put(`http://localhost:8000/api//mobailupdate/${id}` , formdatatoupdate)
           console.log("Data updated successfully")
           navigate('/mobailmodify')
    }catch(error)
    {
      console.log("Error in updating data in front end in mobail" , error)
    }
  }
  const HandleInputChange=async(e)=>{
     const{name , value , type} = e.target
     setformdata((predata)=>({
      ...predata , 
      [name] : type === 'file' ? e.target.files[0] : value
     }))
  }
  return (
    <>
      <Container onSubmit={HandleSubmit}>
         <Typography variant='h5' sx={{textAlign:'center'}}>Update Mobail Data</Typography>
         <FieldContainer>
        <FormControl>
          <InputLabel>company </InputLabel>
          <Input name='company' type='text' value={formdata.company} onChange={HandleInputChange}></Input>
        </FormControl>
      </FieldContainer>
      <FieldContainer>
        <FormControl>
          <InputLabel>color</InputLabel>
          <Input name='color' type='text' value={formdata.color} onChange={HandleInputChange}></Input>
        </FormControl>
      </FieldContainer>
      <FieldContainer>
        <FormControl>
          <InputLabel>model</InputLabel>
          <Input name='model' type='text' value={formdata.model} onChange={HandleInputChange}></Input>
        </FormControl>
      </FieldContainer>
      <FieldContainer>
        <FormControl>
          <InputLabel>Ram</InputLabel>
          <Input name='ram' type='text' value={formdata.ram} onChange={HandleInputChange}></Input>
        </FormControl>
      </FieldContainer>
      <FieldContainer>
        <FormControl>
          <InputLabel>Memory</InputLabel>
          <Input name='memory' type='text' value={formdata.memory} onChange={HandleInputChange}></Input>
        </FormControl>
      </FieldContainer>
      <FieldContainer>
        <FormControl>
          <InputLabel>image</InputLabel>
          <Input name='image' type='file'  onChange={HandleInputChange}></Input>
        </FormControl>
      </FieldContainer>
      <FieldContainer>
        <FormControl>
          <Button variant='contained' type='submit'>Update data</Button>
        </FormControl>
      </FieldContainer>
      </Container>
      
    </>
  )
}
