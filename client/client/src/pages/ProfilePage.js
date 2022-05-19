import { Box, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, FTextField } from "../components/form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import {
  updateUserProfile,
  getCurrentUserProfile,
  deleteAccount,
} from "../features/user/userSlice";
import { useEffect } from "react";
import { LoadingButton } from "@mui/lab";

const UpdateUserSchema = yup.object().shape({
  name: yup.string().required("name is required"),
  email: yup.string().email().required("email is required"),
});

function ProfilePage() {
  const { user } = useAuth();
  const isLoading = useSelector((state) => state.user.isLoading);
  const defaultValues = {
    name: user?.name || "",
    email: user?.email || "",
  };
  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });
  const {
    setValue,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    reset(user);
  }, [user]);
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    console.log("dada", data);
    dispatch(updateUserProfile({ name: data.name, email: data.email }));
  };
  const handleOnclick = () => {
    dispatch(deleteAccount());
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
          <FTextField sx={{ mt: 5 }} name="name" />
          <FTextField sx={{ mt: 5 }} name="email" />

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
        <LoadingButton
          sx={{ mt: 5 }}
          variant="contained"
          loading={isSubmitting}
          onClick={handleOnclick}
        >
          Delete Account
        </LoadingButton>
      </Box>
    </>
  );
}

export default ProfilePage;
