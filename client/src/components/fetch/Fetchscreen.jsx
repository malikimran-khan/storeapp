import { Button, Card, CardContent, CardMedia, Grid, Input, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom' // Changed 'Link' import

export default function Fetchscreen() {
  const [laptopdata, setlaptopdata] = useState([])
  const [iphonedata, setiphonedata] = useState([])
  const [mobaildata, setmobaildata] = useState([])
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const laptopResponse = await axios.get("http://localhost:8000/api/laptopfetch");
        const iphoneResponse = await axios.get("http://localhost:8000/api/iphonefetch");
        const mobailResponse = await axios.get("http://localhost:8000/api/mobailfetch");
        setlaptopdata(laptopResponse.data);
        setiphonedata(iphoneResponse.data);
        setmobaildata(mobailResponse.data);
      } catch (error) {
        console.log("Error in fetching data", error);
      }
    }
    fetchData();
  }, [])
  const searchhere=(e)=>{
    console.log(e.target.value)
  }

  return (
    <>
    <Grid sx={{alignItems:'center' , alignContent:'center' , textAlign:'center'}}>
      <input type='text' onChange={searchhere}></input>
    </Grid>
      {/* Grid layout */}
      <Grid container spacing={2} m={3}>
        {/* Render each item from laptop, mobile, and iPhone data in parallel */}
        {laptopdata.map((laptop, index) => (
          <React.Fragment key={laptop._id}>
            {/* Laptop Card */}
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Card sx={{ maxWidth: 600 }}>
                <CardMedia
                  component="img"
                  height="440"
                  image={`http://localhost:8000/laptopimages/${laptop.image}`}
                />
                <CardContent>
                  <Typography>Laptop name: {laptop.laptopname}</Typography>
                  <Typography>Laptop company: {laptop.laptopcompany}</Typography>
                  <Typography>Laptop price: {laptop.laptopprice}</Typography>
                  <Typography>Laptop condition: {laptop.condition}</Typography>
                  <Link to={`/buynow/${laptop._id}`}>
                  <Button variant='contained' sx={{ bgcolor: 'yellow', color: 'black' }}>Buy Now</Button>
                  </Link>
                </CardContent>
              </Card>
            </Grid>

            {/* Mobile Card */}
            {mobaildata[index] && (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Card sx={{ maxWidth: 600 }}>
                  <CardMedia
                    component="img"
                    height="440"
                    image={`http://localhost:8000/mobailimages/${mobaildata[index].image}`}
                  ></CardMedia>
                  <CardContent>
                    <Typography>Mobile company : {mobaildata[index].company}</Typography>
                    <Typography>Mobile color : {mobaildata[index].colpr}</Typography>
                    <Typography>Mobile model : {mobaildata[index].model}</Typography>
                    <Typography>Ram : {mobaildata[index].Ram}, Memory : {mobaildata[index].memory}</Typography>
                    <Link to={`/mobailbuy/${mobaildata[index]._id}`}>
                    <Button variant='contained' sx={{ bgcolor: 'yellow', color: 'black' }}>Buy Now</Button>
                    </Link>
                  </CardContent>
                </Card>
              </Grid>
            )}

            {/* iPhone Card */}
            {iphonedata[index] && (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Card sx={{ maxWidth: 600 }}>
                  <CardMedia
                    component="img"
                    height="440"
                    image={`http://localhost:8000/iphoneimages/${iphonedata[index].image}`}
                  />
                  <CardContent>
                    <Typography>iPhone name : {iphonedata[index].name}</Typography>
                    <Typography>Color : {iphonedata[index].color}</Typography>
                    <Typography>Price : {iphonedata[index].price}</Typography>
                    <Typography>Condition : {iphonedata[index].condition}</Typography>
                    <Link to={`/iphonebuy/${iphonedata[index]._id}`}>
                    <Button variant='contained' sx={{ bgcolor: 'yellow', color: 'black' }}>Buy Now</Button>
                    </Link>
                  </CardContent>
                </Card>
              </Grid>
            )}
          </React.Fragment>
        ))}
      </Grid>
    </>
  )
}
