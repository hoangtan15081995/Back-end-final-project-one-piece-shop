import { Box, Container, Stack } from "@mui/material";
import React from "react";
import ProductsCatagory from "../components/ProductsCatagory";
import PaginationCatagory from "../components/PaginationCatagory";

function CatagoryPage() {
  return (
    <Container
      sx={{
        minHeight: "100vh",
        mt: 3,
      }}
    >
      <Stack width="300">
        <Box sx={{ position: "relative", height: 1 }}>
          <ProductsCatagory />
        </Box>
        <PaginationCatagory />
      </Stack>
    </Container>
  );
}

export default CatagoryPage;
