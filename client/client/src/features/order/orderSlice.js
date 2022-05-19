import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
  order: {},
  ordersList: [],
  totalPagesOrder: 1,
};

const slice = createSlice({
  name: "order",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    addNewOrderSuccess(state, action) {
      state.isLoading = false;
      state.hasError = null;
      state.order = action.payload.order;
    },
    getListOrdersSuccess(state, action) {
      state.isLoading = false;
      state.hasError = null;
      state.ordersList = action.payload.ordersList;
    },
  },
});

export const addNewOrder =
  ({ address, phone }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading);
    try {
      console.log(typeof address, typeof phone);
      const accessToken = window.localStorage.getItem("accessToken");
      apiService.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      const response = await apiService.post("/orders/add", { address, phone });
      // const res = await apiService.get("orders/list");
      console.log("response order", response);
      // console.log("res", res);
      dispatch(
        slice.actions.addNewOrderSuccess({
          order: response.data.data.order,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

export const getListOrders = () => async (dispatch) => {
  dispatch(slice.actions.startLoading);
  try {
    const response = await apiService.get("/orders/list");
    console.log("response ordersList", response);
    dispatch(
      slice.actions.getListOrdersSuccess({
        ordersList: response.data.data.listOrder,
        totalPagesOrder: response.data.data.totalPagesOrder,
      })
    );
  } catch (error) {
    console.log(error);
  }
};
export default slice.reducer;
