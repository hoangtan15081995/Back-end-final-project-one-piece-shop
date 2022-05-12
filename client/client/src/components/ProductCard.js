import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Stack, Button, CardActions } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import useCartContext from "../hooks/useCartContext";

function ProductCard({ product }) {
  const navigate = useNavigate();
  // const { dispatch } = useCartContext();
  return (
    <Card>
      <CardActionArea onClick={() => navigate(`/products/${product._id}`)}>
        <CardMedia
          component="img"
          height="400"
          image={product.image}
          alt={product.productName}
        />
        <CardContent>
          <Typography gutterBottom variant="body" component="div" noWrap>
            {product.productName}
          </Typography>
          <Stack
            direction="row"
            spacing={0.5}
            alignItems="center"
            justifyContent="flex-end"
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textDecoration: "line-through", color: "text.disabled" }}
            >
              {product.totalProducts}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.price}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          // onClick={() => dispatch({ type: "ADD", payload: product })}
          variant="contained"
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
