import { Button } from "@mui/material";
import React from "react";
import AuthRequire from "../routes/AuthRequire";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProductsToCard } from "../features/card/cardSlice";
import { getUpdateQuantityProduct } from "../features/product/productSlice";

function AddToCard({ id, product }) {
  const { page } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const location = useLocation();
  const accessToken = window.localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const handleOnClick = () => {
    if (!accessToken) {
      navigate("/login", { state: { from: location } });
    } else {
      dispatch(getUpdateQuantityProduct(id, page));
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

export default AddToCard;
