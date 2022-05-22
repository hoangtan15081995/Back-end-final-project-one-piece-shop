import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
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
    // getProductsInCardSuccess(state, action) {
    //   state.isLoading = false;
    //   state.hasError = null;
    // },
    addProductsToCardSuccess(state, action) {
      state.isLoading = false;
      state.hasError = null;
      state.productsInCard = action.payload.productsInCard;
    },
    updateProductsInCardSuccess(state, action) {
      state.isLoading = false;
      state.hasError = null;
      state.productsInCard = action.payload.productsInCard;
    },
    deleteProductsInCardSuccess(state, action) {
      state.isLoading = false;
      state.hasError = null;
      state.productsInCard = action.payload.productsInCard;
    },
    getProductsInCardSuccess(state, action) {
      state.isLoading = false;
      state.hasError = null;
      state.productsInCard = action.payload.productsInCard;
    },
    setProductsInCardSuccess(state, action) {
      state.isLoading = false;
      state.hasError = null;
      state.productsInCard = action.payload.productsInCard;
    },
  },
});

export const updateProductsInCard =
  (productId, condition) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.put("/cards/update", {
        productId,
        condition,
      });
      const res = await apiService.get("/cards/list");
      dispatch(
        slice.actions.updateProductsInCardSuccess({
          productsInCard: res.data.data.currentCart.products,
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const deleteProductsInCard = (productId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    console.log("iddel", productId);
    const response = await apiService.put("/cards/delete", { productId });
    console.log("det", response);
    const res = await apiService.get("/cards/list");
    dispatch(
      slice.actions.deleteProductsInCardSuccess({
        productsInCard: res.data.data.currentCart.products,
      })
    );
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export const addProductsToCard = (productId) => async (dispatch) => {
  dispatch(slice.actions.startLoading);
  try {
    console.log("productidsearch", productId);
    const response = await apiService.post("/cards/add", { productId });
    const res = await apiService.get("cards/list");
    console.log("resca", res.data.data.currentCart.products);
    toast.success("Add Product Success!");
    dispatch(
      slice.actions.addProductsToCardSuccess({
        productsInCard: res.data.data.currentCart.products,
      })
    );
    console.log("productscard", response.data.data.products);
  } catch (error) {
    console.log(error);
    toast.error("Product already exists!");
  }
};
export const getProductsInCard = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const accessToken = window.localStorage.getItem("accessToken");
    apiService.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    if (accessToken) {
      const response = await apiService.get("/cards/list");
      console.log("fin", response);
      dispatch(
        slice.actions.getProductsInCardSuccess({
          productsInCard: response.data.data.currentCart.products,
        })
      );
    } else {
      console.log("getproductcart failed");
    }
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export const setProductsInCard = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const productsInCard = [];
    console.log("...", productsInCard);
    const response = await apiService.put("/cards/set", { productsInCard });
    console.log(response);
    dispatch(
      slice.actions.setProductsInCardSuccess({
        productsInCard: response.data.data,
      })
    );
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export default slice.reducer;
