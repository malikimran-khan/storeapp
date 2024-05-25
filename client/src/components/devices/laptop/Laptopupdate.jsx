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
export default function Laptopupdate() {
    const{id} = useParams()
    const navigate = useNavigate()
    const[formdata,setformdata]=useState({
        laptopname :'',
         laptopcompany:'' ,
          laptopprice :'',
           condition :'' ,
            image:null
    })
    useEffect(()=>{
        const fetchlaptopdata = async(e)=>{
            try{
                const response = await axios.get(`http://localhost:8000/api/laptopfetch/${id}`)
                const laptop = response.data
                setformdata({
                   laptopname :laptop.laptopname,
                   laptopcompany: laptop.laptopcompany,
                   laptopprice : laptop.laptopprice,
                   condition: laptop.condition
                })
            }catch(error)
            {
                console.log("Error in first fetch and updating data in front" , error)
            }
            
        }
        fetchlaptopdata()
    },[])
    const Handlesubmit=async(e)=>{
       e.preventDefault()
       try{
               const FormDataToUpdate = new FormData()
               FormDataToUpdate.append('laptopname' , formdata.laptopname)
               FormDataToUpdate.append('laptopcompany' ,formdata.laptopcompany)
               FormDataToUpdate.append('laptopprice' ,formdata.laptopprice)
               FormDataToUpdate.append('condition' ,formdata.condition)
               FormDataToUpdate.append('image' ,formdata.image)
               await axios.put(`http://localhost:8000/api/laptopupdate/${id}`, FormDataToUpdate);
               console.log("Data updated successfully")
               navigate('/laptopmodify')
       }catch(error)
       {
        console.log("Error in updating data in front end" , error)
       }
    }
    const HandleInputChange =async(e)=>{
       const{name , value , type} = e.target
       setformdata((predata)=>({
        ...predata,
        [name] : type === 'file' ? e.target.files[0] : value
       }))
    }

  return (
    <>
      <Container onSubmit={Handlesubmit}>
        <Typography variant='h3' sx={{textAlign:'center'}}>Update data</Typography>
        <FieldContainer>
            <FormControl>
                <InputLabel>Enter laptop name</InputLabel>
                <Input name='laptopname' type='text' value={formdata.laptopname} onChange={HandleInputChange}></Input>
            </FormControl>
        </FieldContainer>
        <FieldContainer>
            <FormControl>
                <InputLabel>Enter laptop company</InputLabel>
                <Input name='laptopcompany' type='text' value={formdata.laptopcompany} onChange={HandleInputChange}></Input>
            </FormControl>
        </FieldContainer>
        <FieldContainer>
            <FormControl>
                <InputLabel>Enter laptop price</InputLabel>
                <Input name='laptopprice' type='text' value={formdata.laptopprice} onChange={HandleInputChange}></Input>
            </FormControl>
        </FieldContainer>
        <FieldContainer>
            <FormControl>
                <InputLabel>Enter laptop condition</InputLabel>
                <Input name='condition' type='text' value={formdata.condition} onChange={HandleInputChange}></Input>
            </FormControl>
        </FieldContainer>
        <FieldContainer>
            <FormControl>
                <InputLabel>select laptop image</InputLabel>
                <Input name='image' type='file'  onChange={HandleInputChange}></Input>
            </FormControl>
        </FieldContainer>
        <FieldContainer>
            <FormControl>
                <Button type='submit' variant='contained'>Update</Button>
                </FormControl>
        </FieldContainer>

      </Container>
    </>
  )
}
