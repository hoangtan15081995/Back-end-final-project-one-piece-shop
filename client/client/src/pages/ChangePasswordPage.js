import React, { useState } from "react";
import {
  Stack,
  IconButton,
  InputAdornment,
  Container,
  Box,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { FormProvider, FTextField } from "../components/form";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { updatePassword } from "../features/user/userSlice";

const RegisterSchema = Yup.object().shape({
  password: Yup.string().required("Password is required"),
  passwordConfirmation: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

const defaultValues = {
  password: "",
  passwordConfirmation: "",
};

function ChangePasswordPage() {
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });
  const {
    handleSubmit,

    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    console.log("data", data);
    const { password, passwordConfirmation } = data;
    console.log(password, passwordConfirmation);
    dispatch(updatePassword(password, passwordConfirmation));
  };
  return (
    <Container
      sx={{
        minHeight: "100vh",
        mt: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography mb={5} id="modal-modal-title" variant="h5" component="h2">
        Change Your Password
      </Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <Box
            sx={{
              width: { sx: 250, md: 500 },
              height: 220,
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <FTextField
              name="password"
              label="New Password"
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <FTextField
              name="passwordConfirmation"
              label="Password Confirmation"
              type={showPasswordConfirmation ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowPasswordConfirmation(!showPasswordConfirmation)
                      }
                      edge="end"
                    >
                      {showPasswordConfirmation ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <LoadingButton
              sx={{ width: 300 }}
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Change Password
            </LoadingButton>
          </Box>
        </Stack>
      </FormProvider>
    </Container>
  );
}

export default ChangePasswordPage;
