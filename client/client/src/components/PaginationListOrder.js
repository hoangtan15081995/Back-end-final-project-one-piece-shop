import { Box, Stack, Pagination } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPagePaginationListOrder } from "../features/order/orderSlice";

function PaginationListOrder() {
  const dispatch = useDispatch();
  const { pageListOrder, totalPagesListOrder } = useSelector(
    (state) => state.order
  );
  const handleChangePage = (event, newPage) => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    dispatch(getPagePaginationListOrder(newPage));
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
        {/* {totalPagesListOrder > 1 ? ( */}
        <Pagination
          page={pageListOrder}
          onChange={handleChangePage}
          count={totalPagesListOrder}
          color="primary"
        />
        {/* ) : (
          ""
        )} */}
      </Stack>
    </Box>
  );
}

export default PaginationListOrder;
