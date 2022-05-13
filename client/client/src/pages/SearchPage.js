import { Box, Container, Stack } from "@mui/material";
import React from "react";
import ProductsSearch from "../components/ProductsSearch";
import FPaginationSearch from "../components/PaginationSearch";

function SearchPage() {
  return (
    <Container
      sx={{
        minHeight: "100vh",
        mt: 3,
      }}
    >
      <Stack width="300">
        <Box sx={{ position: "relative", height: 1 }}>
          <ProductsSearch />
        </Box>
        <FPaginationSearch />
      </Stack>
    </Container>
  );
}

export default SearchPage;
