import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import FCard from "./Fcard";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/product/productSlice";

function ProductList() {
  const dispatch = useDispatch();
  const { products, page } = useSelector((state) => state.product);
  // const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getProducts(page));
  }, [dispatch, page]);
  return (
    <Grid container spacing={2} mt={1}>
      {products.map((product) => (
        <Grid item key={product._id} xs={12} md={4} lg={3}>
          <FCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductList;
