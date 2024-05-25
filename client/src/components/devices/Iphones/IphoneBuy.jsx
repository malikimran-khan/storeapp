import { Button, Card, CardContent, CardMedia, Container, Grid, TextField, Typography, Modal } from '@mui/material';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function IphoneBuy() {
    const {id} = useParams()
    const[data,setdata] = useState({
        name :'',
        color:'' ,
         price :'',
          condition :'',
          image:null
    })
    const[debitcard , setdebitcard] = useState('')
    const[address , setaddress] = useState('')
    const[email , setemail] = useState('')
    const[openmodel , setopenmodel] = useState('')
    useEffect(()=>{
        console.log("ID:", id);

        const fetchdata = async()=>{
            try{
                       const response = await axios.get(`http://localhost:8000/api/iphonefetchid/${id}`)
                       const iphone = response.data
                       setdata({
                        name : iphone.name , 
                        color : iphone.color ,
                        price : iphone.price ,
                        condition : iphone.condition , 
                        image : iphone.image
                       })
            }catch(error)
            {
                console.log("Error in fetching in single iphone" , error)
            }
        }
        fetchdata()
     },[id])
     const handleOrderConfirm = () => {
        setopenmodel(true)
     }
     const handleModalClose = async() =>{
              try{
                       const response = await axios.post('http://localhost:8000/api/iphonemail' , {
                        email : email ,
                        address : address
                       });
                       console.log("Email sent successfully" , response)
              }catch(error)
              {
                console.log("Error in model", error);
              }
              setopenmodel(false)
     }
     const onCancleButton = () =>{
        setopenmodel(false)
     }
  return (
    <>
      <Container>
       <Grid container spacing={2}>
          <Grid item key={data.id} xs={12} sm={6} md={8} lg={6}>
             <Card sx={{maxWidth:'100%' , height:'100%' , margin:2}}>
                 <CardMedia>
                    {data.image && (
                        <img
                        src={`http://localhost:8000/iphoneimages/${data.image}`}
                        alt={`Iphone ${data.number}`}
                        style={{ width: '80%', height: 'auto' }}
                        />
                    )}
                    <CardContent>
                        <Typography variant='h5'>Iphone Name : {data.name}</Typography>
                        <Typography variant='h5'>Iphone color : {data.color}</Typography>
                        <Typography variant='h5'>Iphone price : {data.price}</Typography>
                        <Typography variant='h5'>Iphone Condition : {data.condition}</Typography>
                    </CardContent>
                    <Button variant='contained' onClick={handleOrderConfirm}>Order confirm</Button>
                 </CardMedia>
             </Card>

          </Grid>
       </Grid>
      </Container>
       
       <form>
        <Modal
          open={openmodel}
          onClose={handleModalClose}
          aria-labelledby="order-confirm-modal-title"
          aria-describedby="order-confirm-modal-description"
        >
             <Container>
                <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ height: '100vh' }}>
                    <Grid item xs={12} sm={6} md={4}>
                         <Card>
                            <CardContent>
                                <Typography variant="h5" id="order-confirm-modal-title">Enter payment detail</Typography>
                                <TextField
                                        label="Debit Card Number"
                                        variant="outlined"
                                        fullWidth
                                        value={debitcard}
                                        required
                                        onChange={(e) => setdebitcard(e.target.value)}
                                        sx={{ mt: 2 }}
                                    />
                                    <TextField
                                        label="Email"
                                        variant="outlined"
                                        fullWidth
                                        value={email}
                                        required
                                        onChange={(e) => setemail(e.target.value)}
                                        sx={{ mt: 2 }}
                                    />
                                    <TextField
                                        label="Enter Address"
                                        variant="outlined"
                                        fullWidth
                                        value={address}
                                        required
                                        onChange={(e) => setaddress(e.target.value)}
                                        sx={{ mt: 2 }}
                                    />
             <Button variant="contained" onClick={handleModalClose} sx={{ mt: 2 }}  type='submit'>Confirm</Button>
            <Button variant="contained" onClick={onCancleButton} color='error' sx={{ mt: 2 }}>Cancle</Button>
                            </CardContent>
                         </Card>
                    </Grid>

                </Grid>
                </Container> 
        </Modal>
       </form>
    </>
  )
}
