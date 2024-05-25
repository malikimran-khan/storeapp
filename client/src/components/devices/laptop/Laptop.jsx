import styled from '@emotion/styled'
import { Button, FormControl, Input, InputLabel, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const Container=styled.form`
width:50%;
margin : 5% auto 0 auto
`
const FieldContainer = styled.div`
margin-top: 20px;
display: flex;
flex-direction: column;
`

export default function Laptop() {
    const[laptopname , setlaptopname]=useState("")
    const[laptopcompany , setlaptopcompany]=useState("")
    const[laptopprice , setlaptopprice]=useState("")
    const[condition , setcondition] = useState("")
    const[image , setimage] = useState(null)
    const HandleSubmit = async(e)=>{
        e.preventDefault()
        const formdata = new FormData()
        formdata.append("file-upload" , image)
        try{
              console.log(image)
              const response = await axios.post("http://localhost:8000/api/multer" , formdata);
              if(response.data.name)
              {
                console.log({laptopname:laptopname , laptopcompany:laptopcompany , laptopprice:laptopprice , 
                condition:condition , image:response.data.name
                })
                const responsedata = await axios.post("http://localhost:8000/api/laptop",({
                     laptopname , laptopcompany , laptopprice , condition , image:response.data.name
                })
                );
                console.log(responsedata)

              }
        }catch(error)
        {
            console.log("Error in inserting in front end" ,error);
        }


    }
  return (
    <>
      <Container onSubmit={HandleSubmit}>
        <Typography variant='h4' sx={{textAlign:'center'}}>Insert Laptop data</Typography>
        <FieldContainer>
            <FormControl>
                <InputLabel>Enter Laptop name</InputLabel>
                <Input required name='laptopname'  onChange={(e)=>setlaptopname(e.target.value)}></Input>
            </FormControl>
        </FieldContainer>
        <FieldContainer>
            <FormControl>
                <InputLabel>Enter Laptop company name name</InputLabel>
                <Input required name='laptopcompany'  onChange={(e)=>setlaptopcompany(e.target.value)}></Input>
            </FormControl>
        </FieldContainer>
        <FieldContainer>
            <FormControl>
                <InputLabel>Enter Laptop price</InputLabel>
                <Input required name='laptopprice'  onChange={(e)=>setlaptopprice(e.target.value)}></Input>
            </FormControl>
        </FieldContainer>
        <FieldContainer>
            <FormControl>
                <InputLabel>about Laptop condition</InputLabel>
                <Input required name='condition'  onChange={(e)=>setcondition(e.target.value)}></Input>
            </FormControl>
        </FieldContainer>
        <FieldContainer>
            <FormControl>
                <InputLabel>Select Image</InputLabel>
                <Input required  type='file' name='image'  onChange={(e)=>setimage(e.target.files[0])}></Input>
            </FormControl>
        </FieldContainer>
        <FieldContainer >
            <FormControl sx={{m:3}}>
                <Button variant='contained' type='submit'>Insert Data</Button>
            </FormControl>
        </FieldContainer>
        
        <Typography sx={{m:3}} variant='h5'>If you want to modify data -- <Link to={'/laptopmodify'}>Click</Link></Typography>
      </Container>
    </>
  )
}
