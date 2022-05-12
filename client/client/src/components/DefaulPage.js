import { Box, Container, Stack } from "@mui/material";
import React from "react";
import ProductList from "./ProductList";
import FPagination from "./Pagination";

function DefaulPage() {
  return (
    <Container sx={{ display: "flex", minHeight: "100vh", mt: 3 }}>
      <Stack>
        <Box sx={{ position: "relative", height: 1 }}>
          <ProductList />
        </Box>
        <FPagination />
        {/* <Box>
          <Stack spacing={2}>
            <Pagination
              page={page}
              onChange={handleChangePage}
              count={totalPages}
              color="primary"
            />
          </Stack>
        </Box> */}
      </Stack>
    </Container>
  );
}

export default DefaulPage;
