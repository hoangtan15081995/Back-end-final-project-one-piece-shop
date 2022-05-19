import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Typography, Container } from "@mui/material";
import { useDispatch } from "react-redux";
import { setProductsInCard } from "../features/card/cardSlice";

function CheckoutPage() {
  const dispatch = useDispatch();
  const handleOnclick = () => {
    dispatch(setProductsInCard());
  };
  return (
    <Container sx={{ display: "flex", height: "100%", alignItems: "center" }}>
      <Box sx={{ maxWidth: 480, margin: "auto", textAlign: "center" }}>
        <Typography variant="h4" paragraph>
          Order Success
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: "1rem" }}>
          Thank you for ordering from our shop. We are waiting for your next
          order!
        </Typography>
        <Button
          onClick={handleOnclick}
          to="/"
          variant="contained"
          component={RouterLink}
        >
          Go to Home
        </Button>
      </Box>
    </Container>
  );
}
export default CheckoutPage;
