import React, { useState } from 'react'
import {Button, FormControl, Input, InputLabel, Typography} from '@mui/material'
import styled from '@emotion/styled'
import axios from 'axios'
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
export default function Mobail() {
  const[company , setcompany] = useState("")
  const[color , setcolor] = useState("")
  const[model , setmodel] = useState("")
  const[Ram , setram] = useState("")
  const[memory , setmemory] = useState("")
  const[image , setimage] = useState("")

  const HandleSubmit=async(e)=>{
       e.preventDefault()
       const formdata = new FormData()
       formdata.append("file-upload" , image)
       try{
               const response = await axios.post("http://localhost:8000/api/mobailmulter" , formdata)
               if(response.data.name)
               {
                console.log({company:company,color:color , model:model ,
                   Ram:Ram ,memory:memory , image : response.data.name })
                const responsedata = await axios.post("http://localhost:8000/api/mobailinsert" , ({
                  company , color , model , Ram , memory , image:response.data.name
                }))
                console.log(responsedata)
               }
       }catch(error)
       {
                console.log("Error in inserting data in front end in mobail" , error)
       }
  }
  return (
    <>
       <Container onSubmit={HandleSubmit}>
        <Typography variant='h5' sx={{textAlign:'center'}}>Insert Mobail data</Typography>
        <FieldContainer>
          <FormControl>
            <InputLabel>Mobail Compnay name</InputLabel>
            <Input required name='company' onChange={(e)=>setcompany(e.target.value)}></Input>
          </FormControl>
        </FieldContainer>
        <FieldContainer>
          <FormControl>
            <InputLabel>Mobail color</InputLabel>
            <Input required name='color' onChange={(e)=>setcolor(e.target.value)}></Input>
          </FormControl>
        </FieldContainer>
        <FieldContainer>
          <FormControl>
            <InputLabel>Mobail Model</InputLabel>
            <Input required name='model' onChange={(e)=>setmodel(e.target.value)}></Input>
          </FormControl>
        </FieldContainer>
        <FieldContainer>
          <FormControl>
            <InputLabel>Mobail Ram</InputLabel>
            <Input required name='ram' onChange={(e)=>setram(e.target.value)}></Input>
          </FormControl>
        </FieldContainer>
        <FieldContainer>
          <FormControl>
            <InputLabel>Mobail Memory</InputLabel>
            <Input required name='memory' onChange={(e)=>setmemory(e.target.value)}></Input>
          </FormControl>
        </FieldContainer>
        <FieldContainer>
          <FormControl>
            <InputLabel>Select Image</InputLabel>
            <Input required name='image' type='file' onChange={(e)=>setimage(e.target.files[0])}></Input>
          </FormControl>
        </FieldContainer>
        <FieldContainer>
          <FormControl>
            <Button variant='contained' type='submit'>Insert Data</Button>
          </FormControl>
        </FieldContainer>
        <Typography variant='h5' sx={{m:3}}>If you want to modify data <Link to={'/mobailmodify'}>Click</Link></Typography>
       </Container>
    </>
  )
}
