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

export default function BasicModal({ productCard }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>View</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack display="flex" justifyContent="center" alignItems="center">
            <Typography sx={{ fontSize: "1.2rem", mb: 3 }}>
              Your Order
            </Typography>
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
            </TableContainer>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
