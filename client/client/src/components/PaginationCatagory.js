import { Box, Stack, Pagination } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPagePaginationSearch } from "../features/product/productSlice";

function PaginationCatagory() {
  const dispatch = useDispatch();
  const { pageSearch, totalPagesSearch } = useSelector(
    (state) => state.product
  );
  const handleChangePage = (event, newPage) => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    dispatch(getPagePaginationSearch(newPage));
  };
  return (
    <Box>
      <Stack
        spacing={2}
        mt={3}
        mb={3}
        // display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {totalPagesSearch > 1 ? (
          <Pagination
            page={pageSearch}
            onChange={handleChangePage}
            count={totalPagesSearch}
            color="primary"
          />
        ) : (
          ""
        )}
      </Stack>
    </Box>
  );
}

export default PaginationCatagory;
