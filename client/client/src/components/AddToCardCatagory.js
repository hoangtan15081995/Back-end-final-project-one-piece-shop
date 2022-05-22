import { Button } from "@mui/material";
import React from "react";
import AuthRequire from "../routes/AuthRequire";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProductsToCard } from "../features/card/cardSlice";
import { getUpdateQuantityProductInCatagory } from "../features/product/productSlice";

function AddToCardCatagory({ id, product, catagory }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const accessToken = window.localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const handleOnClick = () => {
    if (!accessToken) {
      navigate("/login", { state: { from: location } });
    } else {
      dispatch(getUpdateQuantityProductInCatagory(id, catagory));
      dispatch(addProductsToCard(id, product.totalProducts));
    }
  };
  return (
    <AuthRequire>
      <Button
        onClick={handleOnClick}
        size="small"
        color="primary"
        variant="contained"
      >
        Add To Card
      </Button>
    </AuthRequire>
  );
}

export default AddToCardCatagory;
