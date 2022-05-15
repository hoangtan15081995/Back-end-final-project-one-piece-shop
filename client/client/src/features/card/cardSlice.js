import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
  productsInCard: [],
};

const slice = createSlice({
  name: "card",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    resetCard(state, action) {
      state.productsInCard = [];
    },
    getProductsInCardSuccess(state, action) {
      state.isLoading = false;
      state.hasError = null;
    },
    addProductsToCard(state, action) {
      state.isLoading = false;
      state.hasError = null;
    },
  },
});

export const getProductsInCard =
  ({ _id }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.get(`/carts/add`, { _id });
      dispatch(slice.actions.getProductsInCardSuccess(response.data.cart));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const addProductsToCard = (productId) => async (dispatch) => {
  dispatch(slice.actions.startLoading);
  try {
    console.log("productId", productId);
    const response = await apiService.post("/cards/add", { productId });
    console.log("productscard", response);
  } catch (error) {
    console.log(error);
  }
};

export default slice.reducer;
