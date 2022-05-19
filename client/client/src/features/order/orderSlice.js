import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
  order: {},
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
      console.log("response", response);
      // console.log("res", res);
      dispatch(
        slice.actions.addNewOrderSuccess({
          order: {},
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
export default slice.reducer;
