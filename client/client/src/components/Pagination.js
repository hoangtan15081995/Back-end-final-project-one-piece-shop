import { Box, Stack, Pagination } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPagePagination } from "../features/product/productSlice";

function FPagination() {
  const dispatch = useDispatch();
  const { page, totalPages } = useSelector((state) => state.product);
  const handleChangePage = (event, newPage) => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    dispatch(getPagePagination(newPage));
  };
  return (
    <Box>
      <Stack
        spacing={2}
        mt={3}
        mb={3}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {totalPages > 1 ? (
          <Pagination
            page={page}
            onChange={handleChangePage}
            count={totalPages}
            color="primary"
          />
        ) : (
          ""
        )}
      </Stack>
    </Box>
  );
}

export default FPagination;
