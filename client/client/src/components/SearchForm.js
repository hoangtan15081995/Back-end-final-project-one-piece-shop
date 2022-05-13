import React from "react";
import { Stack, Container } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { useNavigate } from "react-router-dom";

import { FormProvider, FTextField } from "../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const searchSchema = Yup.object().shape({
  searchQuery: Yup.string().required("SearchQuery is required"),
});

const defaultValues = {
  searchQuery: "",
};

function SearchForm() {
  const navigate = useNavigate();

  const methods = useForm({
    resolver: yupResolver(searchSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    setError,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      console.log(data);
      navigate("/search");
    } catch (error) {
      reset();
      setError("responseError", error);
    }
  };

  return (
    <Container maxWidth="xs">
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <FTextField name="search" label="Search..." />
        </Stack>
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Search
        </LoadingButton>
      </FormProvider>
    </Container>
  );
}

export default SearchForm;
