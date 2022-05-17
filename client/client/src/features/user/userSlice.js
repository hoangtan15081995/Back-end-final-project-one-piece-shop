import apiService from "../../app/apiService";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
// import { cloudinaryUpload } from "../../utils/cloudinary";

const initialState = {
  isLoading: false,
  error: null,
  profile: {},
  // updatePassword: null,
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
    // updateUserProfileSuccess(state, action) {
    //   state.isLoading = false;
    //   state.hasError = null;

    // },
    // updatePasswordSuccess(state, action) {
    //   state.isLoading = false;
    //   state.hasError = null;

    // },
    getCurrentUserProfileSuccess(state, action) {
      state.isLoading = false;
      state.hasError = null;
      state.profile = action.payload;
    },
  },
});

export default slice.reducer;

// export const updateUserProfile =
//   ({ userId, fullName, avatarUrl, city, country, numberOfPhone, address }) =>
//   async (dispatch) => {
//     dispatch(slice.actions.startLoading());
//     try {
//       const data = {
//         fullName,
//         // avatarUrl,
//         city,
//         country,
//         numberOfPhone,
//         address,
//       };
//       if (avatarUrl instanceof File) {
//         const imageUrl = await cloudinaryUpload(avatarUrl);
//         data.avatarUrl = imageUrl;
//       }
//       const response = await apiService.put(`/users/me/update`, data);
//       dispatch(slice.actions.updateUserProfileSuccess(response.data));
//       toast.success("Update Profile successfully");
//     } catch (error) {
//       dispatch(slice.actions.hasError(error.message));
//       toast.error(error.message);
//     }
//   };

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
// export const updatePassword =
//   ({ password, newPassword }) =>
//   async (dispatch) => {
//     dispatch(slice.actions.isLoading());
//     console.log("first", password);
//     try {
//       const response = await apiService.put(`/users/password`, {
//         password,
//         newPassword,
//       });
//       dispatch(slice.actions.updatePasswordSuccess(response.data));
//     } catch (error) {
//       dispatch(slice.actions.hasError(error.message));
//       toast.error(error.message);
//     }
//   };
//
