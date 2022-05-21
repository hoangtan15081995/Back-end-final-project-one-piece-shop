import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import FCard from "./Fcard";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/product/productSlice";

function ProductList() {
  const dispatch = useDispatch();
  const { products, page } = useSelector((state) => state.product);
  console.log(products);
  useEffect(() => {
    dispatch(getProducts(page));
  }, [dispatch, page]);
  return (
    <Grid container spacing={2} mt={8}>
      {products.map((product) => (
        <Grid
          sx={{ minWidth: 285 }}
          item
          key={product._id}
          xs={12}
          md={4}
          lg={3}
        >
          <FCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductList;
