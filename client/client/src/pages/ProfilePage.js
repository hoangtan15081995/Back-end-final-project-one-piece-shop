import { Box, Stack, Typography, Container, Avatar } from "@mui/material";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, FTextField } from "../components/form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import { updateUserProfile } from "../features/user/userSlice";
import { useEffect } from "react";
import { LoadingButton } from "@mui/lab";
import ModalDeleteAccount from "../components/ModalDeleteAccount";

const UpdateUserSchema = yup.object().shape({
  name: yup.string().required("name is required"),
  email: yup.string().email().required("email is required"),
});

function ProfilePage() {
  const { profile } = useSelector((state) => state.user);
  console.log(profile);
  const { user } = useAuth();
  const accessToken = window.localStorage.getItem("accessToken");
  const defaultValues = {
    avatarURL: user?.avatarURL || "",
    name: user?.name || "",
    email: user?.email || "",
  };
  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });
  const {
    reset,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    reset(user);
  }, [reset, user]);
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    console.log("dada", data);
    dispatch(
      updateUserProfile({
        name: data.name,
        email: data.email,
        image: data.image,
      })
    );
  };

  const inputFile = useRef();
  const handleChange = (e) => {
    const file = inputFile.current.files[0];
    if (file) {
      setValue("image", file);
    }
  };

  return (
    <>
      <Container
        sx={{
          minHeight: "100vh",
          mt: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          justifyContent="center"
          alignItems="center"
          display="flex"
          flexDirection="column"
          sx={{ maxWidth: 600 }}
        >
          <Typography sx={{ fontSize: "1.5rem" }}>Your Profile</Typography>
          <Avatar
            sx={{ width: 100, height: 100, mt: 5 }}
            src={accessToken ? profile.avatarURL || user.avatarURL : ""}
          />
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Box
              sx={{
                mt: 2,
                ml: 15,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <input
                type="file"
                name="myImage"
                ref={inputFile}
                onChange={handleChange}
              />
            </Box>
            <Box
              sx={{
                width: 500,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography sx={{ fontSize: "1.2rem", mt: 5, width: 100 }}>
                Name
              </Typography>
              <FTextField sx={{ mt: 5 }} name="name" />
            </Box>
            <Box
              sx={{
                width: 500,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography sx={{ fontSize: "1.2rem", mt: 5, width: 100 }}>
                Email
              </Typography>
              <FTextField sx={{ mt: 5 }} name="email" />
            </Box>

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
          <ModalDeleteAccount />
        </Box>
      </Container>
    </>
  );
}

export default ProfilePage;
