import apiService from "../../app/apiService";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  error: null,
  profile: {},
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateUserProfileSuccess(state, action) {
      state.isLoading = false;
      state.hasError = null;
      state.profile = action.payload;
    },
    updatePasswordSuccess(state, action) {
      state.isLoading = false;
      state.hasError = null;
      state.profile = action.payload;
    },
    getCurrentUserProfileSuccess(state, action) {
      state.isLoading = false;
      state.hasError = null;
      state.profile = action.payload;
    },
    deleteAccountSuccess(state, action) {
      state.isLoading = false;
      state.hasError = null;
      state.profile = action.payload;
    },
  },
});

export default slice.reducer;

export const updateUserProfile =
  ({ name, email }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.put("/users/me/update", {
        name,
        email,
      });
      dispatch(slice.actions.updateUserProfileSuccess(response.data.success));
      toast.success("Update Profile success");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error("Update Profile error");
    }
  };

export const getCurrentUserProfile = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get("/users/me/get");
    console.log("profileuser", response);
    dispatch(slice.actions.getCurrentUserProfileSuccess(response.data.success));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};
export const updatePassword =
  (newPassword, confirmPassword) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      console.log("inputdata", newPassword, confirmPassword);
      const response = await apiService.put("/users/me/updatepassword", {
        newPassword,
        confirmPassword,
      });
      dispatch(slice.actions.updatePasswordSuccess(response.data.success));
      toast.success("Updated password success!");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error("Can't update password");
    }
  };

export const deleteAccount = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.delete("/users/me/deactivate");
    dispatch(slice.actions.deleteAccountSuccess(response.data.success));
    window.localStorage.removeItem("accessToken");
    delete apiService.defaults.headers.common.Authorization;
    toast.success("Deleted Account Success");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error("Can't delete account");
  }
};
