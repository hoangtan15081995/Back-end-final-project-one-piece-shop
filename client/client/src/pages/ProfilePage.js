import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, FTextField } from "../components/form";

import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import {
  updateUserProfile,
  getCurrentUserProfile,
} from "../features/user/userSlice";
import { useEffect } from "react";
import { LoadingButton } from "@mui/lab";

function ProfilePage() {
  // useEffect(() => {
  //   dispatch(getCurrentUserProfile());
  // }, []);

  const { user } = useAuth();
  console.log("user", user);

  const isLoading = useSelector((state) => state.user.isLoading);

  const methods = useForm();
  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    console.log(data);
    dispatch(updateUserProfile({ name: data.name, email: data.email }));
  };

  return (
    <>
      <Box
        justifyContent="center"
        alignItems="center"
        display="flex"
        flexDirection="column"
        sx={{ maxWidth: 600, mt: 20 }}
      >
        <Typography sx={{ fontSize: "1.2rem" }}>My profile</Typography>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <FTextField
            sx={{ mt: 5 }}
            name="name"
            label="Name"
            defaultValue={user.name}
          />
          <FTextField
            sx={{ mt: 5 }}
            name="email"
            label="Email"
            defaultValue={user.email}
          />

          <Stack
            alignItems="center"
            sx={{ mt: 5, textAlign: "center", width: "100%" }}
          >
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Save
            </LoadingButton>
          </Stack>
        </FormProvider>
      </Box>
    </>
  );
}

export default ProfilePage;
