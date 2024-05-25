import { Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Laptopmodify() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/laptopfetch");
                setData(response.data);
            } catch (error) {
                console.log("Error in fetching data in front end", error)
            }
        }
        fetchData();
    }, []);

    const handleDelete = async (laptopId) => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/laptopdelete/${laptopId}`);
            if (response.data.success) {
                setData(prevData => prevData.filter(laptop => laptop._id !== laptopId));
                console.log("Record deleted successfully");
            } else {
                console.log(response.data.error);
                console.log("Record Not deleted");
            }
        } catch (error) {
            console.log("Error in deleting records in front end", error)
        }
    }

    return (
        <>
            <Grid container spacing={2}>
                {data.map((laptop) => (
                    <Grid item key={laptop._id} xs={12} sm={6} md={4} lg={3}>
                        <Card sx={{ maxWidth: 600, margin: 2 }}>
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
                                <Button variant='contained' color='error' onClick={() => handleDelete(laptop._id)}>Delete</Button>
            <Link to={`/laptopupdate/${laptop._id}`}><Button color='inherit'>Update</Button></Link>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}
