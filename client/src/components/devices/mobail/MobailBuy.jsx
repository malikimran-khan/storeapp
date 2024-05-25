import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MobailBuy() {
  const { id } = useParams();
  const [data, setdata] = useState({
    company: "",
    color: "",
    model: "",
    ram: "",
    memory: "",
    image: null,
  });
  const [debitCardNumber, setDebitCardNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/fetchid/${id}`
        );
        const mobail = response.data;
        setdata({
          company: mobail.company,
          color: mobail.color,
          model: mobail.model,
          ram: mobail.ram,
          memory: mobail.memory,
          image: mobail.image,
        });
      } catch (error) {
        console.log("Error in single fetching mobail", error);
      }
    };
    fetchdata();
  }, [id]);
  const handleOrderConfirm = () => {
    setOpenModal(true);
  };
  const handleModalClose = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/mobailmail",
        {
          email: email,
          address: address,
        }
      );
      console.log("Email sent successfully", response.data);
    } catch (error) {
      console.log("Error in model", error);
    }
    setOpenModal(false);
  };
  const onCancleButton = () => {
    setOpenModal(false);
  };
  return (
    <>
      <Container>
        <Grid container spacing={2}>
          <Grid item key={data.id} xs={12} sm={6} md={8} lg={6}>
            <Card sx={{ maxWidth: "100%", height: "100%", margin: 2 }}>
              <CardMedia>
                {data.image && (
                  <img
                    src={`http://localhost:8000/mobailimages/${data.image}`}
                    alt={`Mobail ${data.number}`}
                    style={{ width: "100%", height: "auto" }}
                  />
                )}
                <CardContent>
                  <Typography variant="h5">
                    Mobail compnay : {data.company}
                  </Typography>
                  <Typography variant="h5">
                    Mobail color : {data.color}
                  </Typography>
                  <Typography variant="h5">
                    Mobail model : {data.model}
                  </Typography>
                  <Typography variant="h5">Mobail Ram : {data.ram}</Typography>
                  <Typography variant="h5">
                    Mobail memory : {data.memory}
                  </Typography>
                  <Button variant="contained" onClick={handleOrderConfirm}>
                    Order confirm
                  </Button>
                </CardContent>
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
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
            sx={{ height: "100vh" }}
          >
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" id="order-confirm-modal-title">
                    Enter Payment Details
                  </Typography>
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
                  <Button
                    variant="contained"
                    onClick={handleModalClose}
                    sx={{ mt: 2 }}
                    type="submit"
                  >
                    Confirm
                  </Button>
                  <Button
                    variant="contained"
                    onClick={onCancleButton}
                    color="error"
                    sx={{ mt: 2 }}
                  >
                    Cancle
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Modal>
      </form>
    </>
  );
}
