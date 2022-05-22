import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import FCardSearch from "./FcardSearch";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductsByName } from "../features/product/productSlice";

function ProductsSearch() {
  const dispatch = useDispatch();
  let params = useParams();
  let searchQuery = params.query;
  const { productsByName } = useSelector((state) => state.product);
  // console.log("1", productsByName);
  useEffect(() => {
    dispatch(getProductsByName(searchQuery));
  }, [dispatch, searchQuery]);
  return (
    <Grid container spacing={2} mt={8}>
      {productsByName.map((product) => (
        <Grid
          sx={{ minWidth: 285 }}
          item
          key={product._id}
          xs={12}
          md={4}
          lg={3}
        >
          <FCardSearch product={product} searchQuery={searchQuery} />
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductsSearch;
