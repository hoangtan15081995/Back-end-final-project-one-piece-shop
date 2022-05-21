import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
  order: {},
  ordersList: [],
  pageListOrder: 1,
  totalPagesListOrder: 1,
  orderById: {},
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
      state.totalPagesListOrder = action.payload.totalPagesListOrder;
    },
    getSingleOrderSuccess(state, action) {
      state.isLoading = false;
      state.hasError = null;
      state.orderById = action.payload.orderById;
    },
    getPagePaginationListOrderSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.pageListOrder = action.payload;
    },
  },
});

export const addNewOrder =
  ({ address, phone, totalPrice }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      console.log(typeof address, typeof phone);
      const accessToken = window.localStorage.getItem("accessToken");
      apiService.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      const response = await apiService.post("/orders/add", {
        address,
        phone,
        totalPrice,
      });
      // const res = await apiService.get("orders/list");
      console.log("response order", response);
      // console.log("res", res);
      toast.success("Order success");
      dispatch(
        slice.actions.addNewOrderSuccess({
          order: response.data.data.order,
        })
      );
    } catch (error) {
      console.log(error);
      toast.error("Order error");
    }
  };

export const getListOrders = (pageListOrder) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/orders/list?page=${pageListOrder}`);
    console.log("response ordersList", response);
    dispatch(
      slice.actions.getListOrdersSuccess({
        ordersList: response.data.data.listOrder,
        totalPagesListOrder: response.data.data.totalPagesListOrder,
      })
    );
  } catch (error) {
    console.log(error);
  }
};

export const getSingleOrder = (id) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/orders/list/${id}`);
    console.log("single order", response);
    dispatch(
      slice.actions.getSingleOrderSuccess({
        orderById: response.data.data,
      })
    );
  } catch (error) {
    console.log(error);
  }
};

export const updateOrders = (orderId, pageListOrder) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.put("/orders/update", { orderId });
    console.log("response ordersList", response);
    const res = await apiService.get(`/orders/list?page=${pageListOrder}`);
    toast.success("Order Completed!");
    dispatch(
      slice.actions.getListOrdersSuccess({
        ordersList: res.data.data.listOrder,
        totalPagesListOrder: res.data.data.totalPagesListOrder,
      })
    );
  } catch (error) {
    console.log(error);
    toast.error("Completed error");
  }
};

export const updateOrderById =
  (id, address, phone, totalPrice, products) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.put(`/orders/update/${id}`, {
        address,
        phone,
        totalPrice,
        products,
      });
      console.log("orderById", response);
    } catch (error) {
      console.log(error);
    }
  };

export const updateProductInOrderById =
  (orderId, condition, productId) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.put(`/orders/update/${orderId}`, {
        condition,
        productId,
      });
      console.log("orderafterupdateproduct", response);
      const res = await apiService.get(`/orders/list/${orderId}`);
      console.log("single order", res);
    } catch (error) {
      console.log(error);
    }
  };

export const deleteOrders = (orderId, pageListOrder) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.put(`/orders/${orderId}`);
    console.log(response);
    const res = await apiService.get(`/orders/list?page=${pageListOrder}`);
    toast.success("Order Completed!");
    dispatch(
      slice.actions.getListOrdersSuccess({
        ordersList: res.data.data.listOrder,
        totalPagesListOrder: res.data.data.totalPagesListOrder,
      })
    );
  } catch (error) {
    console.log(error);
    toast.error("Completed error");
  }
};

export const getPagePaginationListOrder =
  (pageListOrder) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      dispatch(slice.actions.getPagePaginationListOrderSuccess(pageListOrder));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export default slice.reducer;
