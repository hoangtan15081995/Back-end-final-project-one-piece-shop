import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
  products: [],
  page: 1,
  totalPages: 1,
};

const slice = createSlice({
  name: "product",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getProductsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.products = action.payload.products;
      state.totalPages = action.payload.totalPages;
    },

    getPagePaginationSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.page = action.payload;
    },
  },
});

export const getProducts =
  ({ page, limit = 1 }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.get(`/products/list?page=${page}`);
      dispatch(
        slice.actions.getProductsSuccess({
          products: response.data.data.products,
          totalPages: response.data.data.totalPages,
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const getPagePagination = (page) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    dispatch(slice.actions.getPagePaginationSuccess(page));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export default slice.reducer;
