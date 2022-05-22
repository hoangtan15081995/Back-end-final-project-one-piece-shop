import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getListOrders,
  updateOrders,
  deleteOrders,
} from "../features/order/orderSlice";
import {
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import PaginationListOrder from "../components/PaginationListOrder";
import Modal from "../components/Modal";
import { fCurrency } from "../utils/fcurrency";
import { fDateTimeSuffix } from "../utils/formatTime";

function OrdersListPage() {
  const accessToken = window.localStorage.getItem("accessToken");
  const dispatch = useDispatch();
  const { ordersList, pageListOrder } = useSelector((state) => state.order);
  useEffect(() => {
    dispatch(getListOrders(pageListOrder));
  }, [dispatch, pageListOrder]);
  console.log("oderlist", ordersList);
  const handleOnclickComplete = (id) => {
    dispatch(updateOrders(id, pageListOrder));
  };
  const handleOnclickCancel = (id) => {
    dispatch(deleteOrders(id, pageListOrder));
  };

  return (
    <>
      {accessToken && (
        <Stack
          display="flex"
          mt={15}
          justifyContent="center"
          alignItems="center"
        >
          <Typography sx={{ fontSize: "2rem", mb: 3 }}>
            History List Order
          </Typography>
          <TableContainer sx={{ maxWidth: 1000 }} component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: 50 }}>ID</TableCell>
                  <TableCell align="center">Code Order</TableCell>
                  <TableCell align="center"> Total Price</TableCell>
                  <TableCell sx={{ width: 250 }} align="center">
                    Time Order
                  </TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Complete Order</TableCell>
                  <TableCell align="center">Cancel Order</TableCell>
                  <TableCell align="center">View Order</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ordersList.map((order, index) => (
                  <TableRow
                    key={order._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="center">{order._id}</TableCell>
                    <TableCell align="center">
                      {fCurrency(order.totalPrice)}
                    </TableCell>
                    <TableCell align="center">
                      {fDateTimeSuffix(order.createdAt)}
                      {/* {new Date(order.createdAt).toString()} */}
                    </TableCell>
                    <TableCell align="center">{order.status}</TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={() => handleOnclickComplete(order._id)}
                        disabled={order.status === "Done" ? true : false}
                      >
                        Confirm
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={() => handleOnclickCancel(order._id)}
                        disabled={order.status === "Done" ? true : false}
                      >
                        Cancel
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Modal productCard={order.products} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      )}
      <PaginationListOrder />
    </>
  );
}

export default OrdersListPage;
