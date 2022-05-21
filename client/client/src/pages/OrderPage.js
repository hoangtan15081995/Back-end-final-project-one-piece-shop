import { Box, Button, Stack, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, FTextField } from "../components/form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm } from "react-hook-form";

import { addNewOrder } from "../features/order/orderSlice";
import { LoadingButton } from "@mui/lab";
import {
  deleteProductsInCard,
  getProductsInCard,
  updateProductsInCard,
} from "../features/card/cardSlice";
import { useNavigate } from "react-router-dom";
import { fCurrency } from "../utils/fcurrency";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";

const phoneRegExp = /([0]{1})([1-9]{1})([0-9]{8})/;
const OrderUserSchema = yup.object().shape({
  address: yup.string().required("name is required"),
  phone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .max(10)
    .required("number is required"),
});

function OrderPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductsInCard());
  }, [dispatch]);
  const { productsInCard } = useSelector((state) => state.card);

  const defaultValues = {
    address: "",
    phone: "",
  };
  const methods = useForm({
    resolver: yupResolver(OrderUserSchema),
    defaultValues,
  });
  const {
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

  const handleOnclickIncre = (productId, condition) => {
    dispatch(updateProductsInCard(productId, condition));
  };
  const handleOnclickDecre = (productId, condition) => {
    dispatch(updateProductsInCard(productId, condition));
  };
  const handleOnclickDel = (productId) => {
    console.log("test", productId);
    dispatch(deleteProductsInCard(productId));
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
                <TableCell align="center">Delete</TableCell>
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
                  <TableCell align="center">
                    <Button
                      onClick={() =>
                        handleOnclickDecre(product.product._id, "Des")
                      }
                    >
                      <RemoveIcon />
                    </Button>
                    {product.quantity}
                    <Button
                      onClick={() =>
                        handleOnclickIncre(product.product._id, "Ins")
                      }
                    >
                      <AddIcon />
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    {fCurrency(product.product.price * product.quantity)}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      onClick={() => handleOnclickDel(product.product._id)}
                    >
                      <DeleteIcon />
                    </Button>
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
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                Submit
              </LoadingButton>
            </Stack>
          </FormProvider>
        </Box>
      </Stack>
    </>
  );
}

export default OrderPage;
