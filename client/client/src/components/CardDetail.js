import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Container } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AddToCard from "./AddToCard";

export default function CardDetail() {
  let params = useParams();
  console.log("param", params);
  const { productById } = useSelector((state) => state.product);
  console.log("productId", productById);
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
      <Card sx={{ maxWidth: 270 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="400"
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
          </CardContent>
        </CardActionArea>
        <CardActions>
          <AddToCard />
        </CardActions>
      </Card>
    </Container>
  );
}
