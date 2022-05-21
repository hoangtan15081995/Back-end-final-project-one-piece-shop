import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Stack } from "@mui/material";
import logoImg from "../logo.png";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  getPagePagination,
} from "../features/product/productSlice";
import { useNavigate } from "react-router-dom";

function Logo({ disabledLink = false, sx }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleOnclick = () => {
    dispatch(getProducts(1));
    dispatch(getPagePagination(1));
    navigate("/");
  };
  const logo = (
    <Box sx={{ width: 60, height: 60, ...sx }}>
      <img src={logoImg} alt="logo" width="100%" />
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <Box onClick={handleOnclick}>{logo}</Box>;
}

export default Logo;
