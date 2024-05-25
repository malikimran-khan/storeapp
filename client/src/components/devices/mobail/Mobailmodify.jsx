import { Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Mobailmodify() {
    const[data , setdata] = useState([])
    useEffect(()=>{
        const fetchdata = async()=>{
            try{
                const response = await axios.get("http://localhost:8000/api/mobailfetch");
                setdata(response.data)
            }catch(error)
            {
                console.log("Error in fetching data in front end in mobail" , error)
            }
           
        }
        fetchdata()
    },[])
    const HandleDelete = async(mobailId)=>{
          try{
                 const response = await axios.delete(`http://localhost:8000/api/mobaildelete/${mobailId}`);
                 if(response.data.success)
                 {
                    setdata(predata => predata.filter(mobail => mobail._id !== mobailId));
                    console.log("Record delted successfully")
                 }else{
                 console.log(response.data.error);
                console.log("Record Not deleted");
                 }
          }catch(error)
          {
            console.log("Error in deleting records" , error)
          }
    }
  return (
    <>
      <Grid container spacing={2}>
           {data.map((mobail)=>(
            <Grid item key={mobail._id} xs={12} sm={6} md={4} lg={3}>
                <Card sx={{ maxWidth: 600, margin: 2 }}>
                     <CardMedia
                        component="img"
                        height="440"
                        image={`http://localhost:8000/mobailimages/${mobail.image}`}
                     ></CardMedia>
                     <CardContent>
                        <Typography>Mobail company : {mobail.company}</Typography>
                        <Typography>Mobail color : {mobail.colpr}</Typography>
                        <Typography>Mobail model : {mobail.model}</Typography>
                        <Typography>Ram : {mobail.Ram} , Memory : {mobail.memory}</Typography>
                        <Button color='error' variant='contained' onClick={()=>HandleDelete(mobail._id)}>Delete</Button>
                        <Link to={`/mobailupdate/${mobail._id}`}><Button variant='contained' color='inherit'>Update</Button></Link>
                     </CardContent>
                </Card>
            </Grid>
           ))}
      </Grid>
    </>
  )
}
