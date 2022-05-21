import * as React from "react";
import { useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Button,
  CardActionArea,
  CardActions,
  Container,
  Stack,
} from "@mui/material";
import AddToCard from "./AddToCard";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductsById } from "../features/product/productSlice";
import { fCurrency } from "../utils/fcurrency";

export default function CardDetail() {
  const dispatch = useDispatch();
  let params = useParams();
  let productId = params.productId;
  const { productById } = useSelector((state) => state.product);
  console.log("productId", productById);
  useEffect(() => {
    dispatch(getProductsById(productId));
  }, []);
  return (
    <Container
      sx={{
        minHeight: "100vh",
        mt: 3,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card sx={{ maxWidth: 900 }}>
        <CardActionArea sx={{ display: "flex" }}>
          <CardMedia
            component="img"
            height="500"
            image={productById.image}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {productById.productName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {productById.description}
            </Typography>
            <Stack
              sx={{ mt: 5 }}
              flexDirection="row"
              justifyContent="space-around"
              alignItems="center"
            >
              <Stack>Price: {fCurrency(productById.price)}</Stack>
              <Stack>Quantity: {productById.totalProducts}</Stack>
            </Stack>
          </CardContent>
        </CardActionArea>
        <CardActions sx={{ justifyContent: "center" }}>
          <AddToCard id={productId} />
        </CardActions>
      </Card>
    </Container>
  );
}
