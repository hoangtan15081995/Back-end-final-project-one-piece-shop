import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { useDispatch } from "react-redux";
import { getProductsById } from "../features/product/productSlice";
import { Link as RouterLink } from "react-router-dom";
import AddToCard from "./AddToCard";

export default function FCardSearch({ product }) {
  const dispatch = useDispatch();
  const { _id } = product;
  const handleOnclick = () => {
    dispatch(getProductsById(_id));
  };
  return (
    <Card onClick={handleOnclick} sx={{ minWidth: 270 }}>
      <RouterLink to={`/detail/${_id}`}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="400"
            image={product.image}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product.productName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </RouterLink>
      <CardActions>
        <AddToCard />
      </CardActions>
    </Card>
  );
}
