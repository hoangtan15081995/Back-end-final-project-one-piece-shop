import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
} from "@mui/material";
import { fCurrency } from "../utils/fcurrency";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch } from "react-redux";
import { updateProductInOrderById } from "../features/order/orderSlice";
import EditIcon from "@mui/icons-material/Edit";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ModalUPdateOrder({ order }) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const productCard = order.products;

  const handleOnclickIncre = (orderId, condition, productId) => {
    console.log(orderId, condition, productId);
    dispatch(updateProductInOrderById(orderId, condition, productId));
  };
  const handleOnclickDecre = (orderId, condition, productId) => {
    dispatch(updateProductInOrderById(orderId, condition, productId));
  };
  // const handleOnclickDel = (productId) => {
  //   console.log("test", productId);
  //   dispatch(deleteProductsInCard(productId));
  // };

  return (
    <>
      <Button
        disabled={order.status === "Done" ? true : false}
        onClick={handleOpen}
      >
        <EditIcon />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack display="flex" justifyContent="center" alignItems="center">
            <Typography sx={{ fontSize: "1.2rem", mb: 3 }}>
              Your Order {order.address} {order.phone} {order.totalPrice}
              {order._id}
            </Typography>
            {/* <TableContainer sx={{ maxWidth: 1000 }} component={Paper}>
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
                  {productCard.map((product) => (
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
                        productCard.reduce(function (previousValue, product) {
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
            </TableContainer> */}
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
                  {order.products.map((product) => (
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
                        // onClick={() =>
                        //   handleOnclickDecre(
                        //     order._id,
                        //     "Des",
                        //     product.product._id
                        //   )
                        // }
                        >
                          <RemoveIcon />
                        </Button>
                        {product.quantity}
                        <Button
                        // onClick={() =>
                        //   handleOnclickIncre(
                        //     order._id,
                        //     "Ins",
                        //     product.product._id
                        //   )
                        // }
                        >
                          <AddIcon />
                        </Button>
                      </TableCell>
                      <TableCell align="center">
                        {fCurrency(product.product.price * product.quantity)}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                        // onClick={() => handleOnclickDel(product.product._id)}
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
                        productCard.reduce(function (previousValue, product) {
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
          </Stack>
        </Box>
      </Modal>
    </>
  );
}
