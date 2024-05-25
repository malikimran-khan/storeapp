import { Button, Card, CardContent, CardMedia, Container, Grid,  Typography ,  Modal, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Buynow() {
    const{id} = useParams();
    const[data , setdata] = useState({
    laptopname:'',
    laptopcompany:'',
    laptopprice:'',
    condition:'',
    image:null
    });
    const [debitCardNumber, setDebitCardNumber] = useState('');
    const [email, setEmail] = useState('');
    const [address , setAddress] = useState('');
    const [openModal, setOpenModal] = useState(false);
    useEffect(()=>{
        const fetchdata = async()=>{
           try{
                 const response = await axios.get(`http://localhost:8000/api/laptopfetch/${id}`)
                 const laptop = response.data;
                 setdata({
                       laptopname : laptop.laptopname,
                       laptopcompany : laptop.laptopcompany,
                       laptopprice : laptop.laptopprice , 
                       condition : laptop.condition,
                       image : laptop.image
                 })
           }catch(error)
           {
            console.log("Error in single fetching laptop" , error)
           }
        }
        fetchdata()
    },[id])
    const handleOrderConfirm = () => {
        setOpenModal(true);
    };
    const handleModalClose = async() => {
        try {
            const response = await axios.post('http://localhost:8000/api/laptopmail', {
              email: email,
              address: address
            });
            console.log("Email sent successfully", response.data);
          } catch (error) {
            console.log("Error in model", error);
          }
        setOpenModal(false);
    };
    const onCancleButton = () =>{
      setOpenModal(false);
    }
   
  return (
    <>
    
     <Container>
        <Grid container spacing={2}>
          <Grid item key={data.id} xs={12} sm={6} md={8} lg={6}>
            <Card sx={{ maxWidth: '100%', height: '100%', margin: 2 }}>
              <CardMedia>
                {data.image && (
                  <img
                    src={`http://localhost:8000/laptopimages/${data.image}`}
                    alt={`Laptop ${data.number}`}
                    style={{ width: '100%', height: 'auto' }}
                  />
                )}
                <CardContent>
                  <Typography variant='h6'>Laptop name: {data.laptopname}</Typography>
                  <Typography>Laptop compnay: {data.laptopcompany}</Typography>
                  <Typography>Laptop price: {data.laptopprice}</Typography>
                  <Typography>Laptop condition: {data.condition}</Typography>
                </CardContent>
                   <Button variant='contained' onClick={handleOrderConfirm}>Order confirm</Button>
              </CardMedia>
            </Card>
          </Grid>
        </Grid>
      </Container>
      
      <form>
      <Modal
                open={openModal}
                onClose={handleModalClose}
                aria-labelledby="order-confirm-modal-title"
                aria-describedby="order-confirm-modal-description"
            >
                <Container>
                    <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ height: '100vh' }}>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" id="order-confirm-modal-title">Enter Payment Details</Typography>
                                    <TextField
                                        label="Debit Card Number"
                                        variant="outlined"
                                        fullWidth
                                        value={debitCardNumber}
                                        onChange={(e) => setDebitCardNumber(e.target.value)}
                                        sx={{ mt: 2 }}
                                    />
                                    <TextField
                                        label="Email"
                                        variant="outlined"
                                        fullWidth
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        sx={{ mt: 2 }}
                                    />
                                      <TextField
                                        label="Enter Address"
                                        variant="outlined"
                                        fullWidth
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
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
