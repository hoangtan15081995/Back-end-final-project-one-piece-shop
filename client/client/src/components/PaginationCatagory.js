import { Box, Stack, Pagination } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPagePaginationCatagory } from "../features/product/productSlice";

function PaginationCatagory() {
  const dispatch = useDispatch();
  const { pageCatagory, totalPagesCatagory } = useSelector(
    (state) => state.product
  );
  const handleChangePage = (event, newPage) => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    dispatch(getPagePaginationCatagory(newPage));
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
        {totalPagesCatagory > 1 ? (
          <Pagination
            page={pageCatagory}
            onChange={handleChangePage}
            count={totalPagesCatagory}
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
