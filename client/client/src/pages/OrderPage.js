import { Box, Stack, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, FTextField } from "../components/form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import {
  updateUserProfile,
  getCurrentUserProfile,
  deleteAccount,
} from "../features/user/userSlice";
import { addNewOrder } from "../features/order/orderSlice";
import { LoadingButton } from "@mui/lab";
import {
  getProductsInCard,
  setProductsInCard,
} from "../features/card/cardSlice";
import { Link, useNavigate } from "react-router-dom";
import { fCurrency } from "../utils/fcurrency";

const OrderUserSchema = yup.object().shape({
  address: yup.string().required("name is required"),
  phone: yup.number().required("number is required"),
});

function OrderPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductsInCard());
  }, []);
  const { productsInCard } = useSelector((state) => state.card);
  const isLoading = useSelector((state) => state.user.isLoading);
  const defaultValues = {
    address: "",
    phone: "",
  };
  const methods = useForm({
    resolver: yupResolver(OrderUserSchema),
    defaultValues,
  });
  const {
    setValue,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (data) => {
    let totalPrice = productsInCard.reduce(function (previousValue, product) {
      return previousValue + product.product.price * product.quantity;
    }, 0);

    console.log("dada", data);
    dispatch(
      addNewOrder({ address: data.address, phone: data.phone, totalPrice })
    );
    navigate("/checkout");
  };

  return (
    <>
      <Stack display="flex" mt={15} justifyContent="center" alignItems="center">
        <Typography sx={{ fontSize: "2rem", mb: 3 }}>Your Order</Typography>
        <TableContainer sx={{ maxWidth: 1000 }} component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Total Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productsInCard.map((product) => (
                <TableRow
                  key={product.product.productName}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {product.product.productName}
                  </TableCell>
                  <TableCell align="center">
                    {" "}
                    {fCurrency(product.product.price)}
                  </TableCell>
                  <TableCell align="center">{product.quantity}</TableCell>
                  <TableCell align="center">
                    {fCurrency(product.product.price * product.quantity)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableBody>
              <TableRow>
                <TableCell />
                <TableCell />
                <TableCell>Total Price</TableCell>
                <TableCell>
                  {fCurrency(
                    productsInCard.reduce(function (previousValue, product) {
                      return (
                        previousValue + product.product.price * product.quantity
                      );
                    }, 0)
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          justifyContent="center"
          alignItems="center"
          display="flex"
          flexDirection="column"
          sx={{ maxWidth: 600, mt: 5 }}
        >
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Box
              sx={{
                width: 500,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography sx={{ fontSize: "1.2rem", mt: 5, width: 100 }}>
                Address
              </Typography>
              <FTextField sx={{ mt: 5, ml: 2 }} name="address" />
            </Box>
            <Box
              sx={{
                width: 500,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography sx={{ fontSize: "1.2rem", mt: 5, width: 100 }}>
                Phone
              </Typography>
              <FTextField sx={{ mt: 5, ml: 2 }} name="phone" />
            </Box>

            <Stack
              alignItems="center"
              sx={{ mt: 5, textAlign: "center", width: "100%" }}
            >
              {/* <Link style={{ textDecoration: "none" }} to="/checkout"> */}
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                Submit
              </LoadingButton>
              {/* </Link> */}
            </Stack>
          </FormProvider>
        </Box>
      </Stack>
    </>
  );
}

export default OrderPage;
