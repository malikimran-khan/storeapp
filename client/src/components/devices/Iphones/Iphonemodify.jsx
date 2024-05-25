import { Button, Card, CardContent, CardMedia, Grid } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Iphonemodify() {
    const[data , setdata] = useState([])
    useEffect(()=>{
        const fetchdata = async()=>{
            try{
                  const response = await axios.get("http://localhost:8000/api/iphonefetch")
                  setdata(response.data)
            }catch(error)
            {
                console.log("Error in fetching in iphone in front end")
            }
        }
        fetchdata()
    },[])
    const HandleDelete = async(iphoneId)=>{
           try{
                  const response = await axios.delete(`http://localhost:8000/api/iphonedelete/${iphoneId}`);
                  if(response.data.success)
                  {
                    setdata((predata)=>predata.filter( iphone => iphone._id !== iphoneId))
                    console.log("Record deleted successfully")
                  }else{
                    console.log(response.data.error)
                    console.log("Record Not deleted")
                  }
           }catch(error)
           {
            console.log("Error in deleting records in iphone" , error)
           }   
    }
  return (
    <>
      <Grid container spacing={2}>
         {data.map((iphone)=>(
            <Grid item key={iphone._id} xs={12} sm={6} md={4} lg={3}>
                <Card sx={{ maxWidth: 600, margin: 2 }}>
                      <CardMedia
                       component="img"
                       height="400"
                       image={`http://localhost:8000/iphoneimages/${iphone.image}`}
                      />
                        <CardContent>Iphone name : {iphone.name}</CardContent>
                        <CardContent>Color : {iphone.color}</CardContent>
                        <CardContent>Price : {iphone.price}</CardContent>
                        <CardContent>condition : {iphone.condition}</CardContent>
            <Button variant='contained' color='error' onClick={()=>HandleDelete(iphone._id)}>Delete</Button>
          <Link to={`/iphoneupdate/${iphone._id}`}>  <Button color='inherit' variant='contained'>Update</Button></Link>
                      
                </Card>
                </Grid>
         ))}
      </Grid>
    </>
  )
}
