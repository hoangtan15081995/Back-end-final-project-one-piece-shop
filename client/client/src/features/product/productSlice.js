import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
  products: [],
  page: 1,
  totalPages: 1,
  productsByName: [],
  pageSearch: 1,
  totalPagesSearch: 1,
  productId: "",
  productById: {},
  productsCatagory: [],
  pageCatagory: 1,
  totalPagesCatagory: 1,
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
    updateQuantityProductSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.products = action.payload.products;
    },
    getProductsByNameSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.productsByName = action.payload.productsByName;
      state.totalPagesSearch = action.payload.totalPagesSearch;
    },
    getProductsCatagorySuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.productsCatagory = action.payload.productsCatagory;
      state.totalPagesCatagory = action.payload.totalPagesCatagory;
    },
    getProductsByIdSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.productById = action.payload.productById;
    },

    getPagePaginationSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.page = action.payload;
    },

    getPagePaginationSearchSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.pageSearch = action.payload;
    },
    getPagePaginationCatagorySuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.pageCatagory = action.payload;
    },
  },
});

export const getProducts = (page) => async (dispatch) => {
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

// export const updateQuantityProduct = (id) => async (dispatch) => {
//   dispatch(slice.actions.startLoading());
//   try {
//     const response = await apiService.get(`/products/listall/${id}`);
//     dispatch(
//       slice.actions.updateQuantityProductSuccess({
//         products: response.data.data.products,
//       })
//     );
//   } catch (error) {
//     dispatch(slice.actions.hasError(error.message));
//     toast.error(error.message);
//   }
// };

export const getPagePagination = (page) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    dispatch(slice.actions.getPagePaginationSuccess(page));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};
export const getPagePaginationSearch = (pageSearch) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    dispatch(slice.actions.getPagePaginationSearchSuccess(pageSearch));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};
export const getPagePaginationCatagory = (pageCatagory) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    dispatch(slice.actions.getPagePaginationCatagorySuccess(pageCatagory));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const getProductsByName = (searchquery) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    console.log(searchquery);
    // searchquery = searchquery.toLowerCase();
    const response = await apiService.post("/products/find", { searchquery });
    console.log(response.data.data.product);
    // toast.success("Find product success");
    dispatch(
      slice.actions.getProductsByNameSuccess({
        productsByName: response.data.data.product,
        totalPagesSearch: response.data.data.totalPagesSearch,
      })
    );
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error("Don't find product");
  }
};

export const getProductsCatagory = (catagory) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    console.log(catagory, typeof catagory);
    // searchquery = searchquery.toLowerCase();
    const response = await apiService.post("/products/catagory", { catagory });
    console.log("res", response);

    dispatch(
      slice.actions.getProductsCatagorySuccess({
        productsCatagory: response.data.data.products,
        totalPagesCatagory: response.data.data.totalPagesCatagory,
      })
    );
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const getProductsById = (productId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/products/${productId}`);
    console.log(response);
    dispatch(
      slice.actions.getProductsByIdSuccess({
        productById: response.data.data.product,
      })
    );
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export default slice.reducer;
