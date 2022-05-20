import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { getProductsById } from "../features/product/productSlice";
import { Link as RouterLink } from "react-router-dom";
import AddToCard from "./AddToCard";
import "./styleCard.css";
import { fCurrency } from "../utils/fcurrency";

export default function FCardCatagory({ product }) {
  const dispatch = useDispatch();
  const { _id } = product;
  const handleOnclick = () => {
    dispatch(getProductsById(_id));
  };
  return (
    <Card
      className="styleCard"
      onClick={handleOnclick}
      sx={{ minWidth: 270, minHeight: 500 }}
    >
      <RouterLink
        style={{ textDecoration: "none", color: "black" }}
        to={`/detail/${_id}`}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="400"
            image={product.image}
            alt="not found"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {product.productName.length > 20
                ? product.productName.slice(0, 19) + "..."
                : product.productName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <Stack
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Stack>Price: {fCurrency(product.price)}</Stack>
                <Stack>Quantity: {product.totalProducts}</Stack>
              </Stack>
            </Typography>
          </CardContent>
        </CardActionArea>
      </RouterLink>
      <CardActions>
        <AddToCard id={_id} />
      </CardActions>
    </Card>
  );
}
