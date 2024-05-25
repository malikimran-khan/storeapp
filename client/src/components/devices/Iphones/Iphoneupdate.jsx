import styled from '@emotion/styled'
import { Button, FormControl, Input, InputLabel, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Container = styled.form`
  width: 50%;
  margin: 5% auto 0 auto;
`;

const FieldContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

export default function Iphoneupdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formdata, setformdata] = useState({
    name: "",
    color: "",
    price: "",
    condition: "",
    image: null
  });

  useEffect(() => {
    const fetchiphonedata = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/iphonefetchid/${id}`);
        const iphone = response.data;
        setformdata({
          name: iphone.name ,
          color: iphone.color ,
          price: iphone.price  ,
          condition: iphone.condition
        });
      } catch (error) {
        console.log("Error in first fetch and updating data in front in mobile", error);
      }
    };
    fetchiphonedata();
  }, []);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formdatatoupdate = new FormData();
      formdatatoupdate.append('name', formdata.name);
      formdatatoupdate.append('color', formdata.color);
      formdatatoupdate.append('price', formdata.price);
      formdatatoupdate.append('condition', formdata.condition);
      formdatatoupdate.append('image', formdata.image);
      await axios.put(`http://localhost:8000/api/iphoneupdate/${id}`, formdatatoupdate);
      console.log("Data updated successfully");
      navigate('/iphonemodify');
    } catch (error) {
      console.log("Error in updating data in front end in iphone", error);
    }
  };
  const HandleInputChange = (e) => {
    const { name, value, type } = e.target;
    console.log(`Name: ${name}, Value: ${value}`);
    setformdata((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? e.target.files[0] : value,
    }));
  };

  return (
    <>
      <Container onSubmit={HandleSubmit}>
        <Typography variant='h4' sx={{ textAlign: 'center' }}>Iphone Update Data</Typography>
        <FieldContainer>
          <FormControl>
            <InputLabel>Iphone name</InputLabel>
            <Input name='name' value={formdata.name} type='text' onChange={HandleInputChange}></Input>
          </FormControl>
        </FieldContainer>
        <FieldContainer>
          <FormControl>
            <InputLabel>Iphone color</InputLabel>
            <Input name='color' value={formdata.color} type='text' onChange={HandleInputChange}></Input>
          </FormControl>
        </FieldContainer>
        <FieldContainer>
          <FormControl>
            <InputLabel>Iphone price</InputLabel>
            <Input name='price' value={formdata.price} type='text' onChange={HandleInputChange}></Input>
          </FormControl>
        </FieldContainer>
        <FieldContainer>
          <FormControl>
            <InputLabel>Iphone condition</InputLabel>
            <Input name='condition' value={formdata.condition} type='text' onChange={HandleInputChange}></Input>
          </FormControl>
        </FieldContainer>
        <FieldContainer>
          <FormControl>
            <InputLabel>Iphone image</InputLabel>
            <Input name='image' type='file' onChange={HandleInputChange}></Input>
          </FormControl>
        </FieldContainer>
        <FieldContainer>
          <FormControl>
            <Button variant='contained' type='submit'>Update Data</Button>
          </FormControl>
        </FieldContainer>
      </Container>
    </>
  )
}
