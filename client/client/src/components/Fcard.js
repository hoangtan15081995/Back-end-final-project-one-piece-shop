import * as React from "react";
import { useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, CardActionArea, CardActions } from "@mui/material";
import { useDispatch } from "react-redux";
import { getProductsById } from "../features/product/productSlice";
import { Link as RouterLink, NavLink } from "react-router-dom";
import AddToCard from "./AddToCard";
import "./styleCard.css";

export default function FCard({ product }) {
  const dispatch = useDispatch();
  const { _id } = product;
  const handleOnclick = () => {
    dispatch(getProductsById(_id));
  };
  return (
    <Card
      className="styleCard"
      onClick={handleOnclick}
      sx={{
        minWidth: 270,
        minHeight: 500,
      }}
    >
      <NavLink
        style={{ textDecoration: "none", color: "black" }}
        to={`/detail/${_id}`}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="400"
            image={product.image}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {product.productName.length > 20
                ? product.productName.slice(0, 19) + "..."
                : product.productName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.price}
            </Typography>
          </CardContent>
        </CardActionArea>
      </NavLink>
      <CardActions>
        <AddToCard id={_id} />
      </CardActions>
    </Card>
  );
}
