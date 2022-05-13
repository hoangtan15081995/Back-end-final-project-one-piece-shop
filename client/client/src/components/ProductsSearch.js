import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import FCardSearch from "./FcardSearch";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

function ProductsSearch() {
  const dispatch = useDispatch();
  const { productsByName } = useSelector((state) => state.product);
  console.log("1", productsByName);
  return (
    <Grid container spacing={2} mt={1}>
      {productsByName.map((product) => (
        <Grid
          sx={{ minWidth: 285 }}
          item
          key={product._id}
          xs={12}
          md={4}
          lg={3}
        >
          <FCardSearch product={product} />
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductsSearch;
