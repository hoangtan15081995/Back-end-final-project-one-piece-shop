import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Stack, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  updateProductsInCard,
  deleteProductsInCard,
} from "../features/card/cardSlice";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getProductsInCard } from "../features/card/cardSlice";
import { fCurrency } from "../utils/fcurrency";
import {
  getUpdateQuantityProductInCart,
  getUpdateQuantityProductinCartDelete,
} from "../features/product/productSlice";

export default function ProductCardPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { page } = useSelector((state) => state.product);
  const handleOnclickIncre = (productId, condition) => {
    dispatch(updateProductsInCard(productId, condition));
    dispatch(getUpdateQuantityProductInCart(productId, condition, page));
  };
  const handleOnclickDecre = (productId, condition) => {
    dispatch(updateProductsInCard(productId, condition));
    dispatch(getUpdateQuantityProductInCart(productId, condition, page));
  };
  const handleOnclickDel = (productId, condition, quantity) => {
    console.log("test", productId);
    dispatch(deleteProductsInCard(productId));
    dispatch(
      getUpdateQuantityProductinCartDelete(productId, condition, quantity, page)
    );
  };
  const { productsInCard } = useSelector((state) => state.card);
  console.log("map", productsInCard);
  useEffect(() => {
    dispatch(getProductsInCard());
  }, [dispatch]);
  const accessToken = window.localStorage.getItem("accessToken");
  const handleOnclickToOrder = () => {
    navigate("/order");
  };
  return (
    <>
      {accessToken && (
        <Stack
          display="flex"
          mt={5}
          justifyContent="center"
          alignItems="center"
        >
          <Typography sx={{ fontSize: "2rem", mt: 10, mb: 3 }}>
            Pruducts In Cart
          </Typography>
          <TableContainer sx={{ maxWidth: 1000 }} component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell align="center">Price</TableCell>
                  <TableCell align="center">Quantity</TableCell>
                  <TableCell align="center">Total Products</TableCell>
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
                        disabled={
                          product.product.totalProducts === 0 ? true : false
                        }
                      >
                        <AddIcon />
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      {product.product.totalProducts}
                    </TableCell>
                    <TableCell align="center">
                      {fCurrency(product.product.price * product.quantity)}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={() =>
                          handleOnclickDel(
                            product.product._id,
                            "Del",
                            product.quantity
                          )
                        }
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
                          previousValue +
                          product.product.price * product.quantity
                        );
                      }, 0)
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Stack mt={5} mb={5} sx={{ maxWidth: 100 }}>
            <Button onClick={handleOnclickToOrder} variant="contained">
              Order
            </Button>
          </Stack>
        </Stack>
      )}
    </>
  );
}
