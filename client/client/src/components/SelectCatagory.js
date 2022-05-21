import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProductsCatagory } from "../features/product/productSlice";

export default function SelectCatagory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [catagory, setCatagory] = React.useState("");

  const handleChange = (event) => {
    console.log(event.target.value);
    setCatagory(event.target.value);
    navigate(`catagoryPage/${event.target.value}`);
    dispatch(getProductsCatagory(event.target.value));
  };

  return (
    <Box sx={{ minWidth: { xs: 50, sm: 100, md: 120 } }}>
      <FormControl
        sx={{
          backgroundColor: "white",
          borderRadius: 1,
        }}
        fullWidth
      >
        <InputLabel
          sx={{ fontSize: { xs: 0, sm: 14, md: 19 } }}
          id="demo-simple-select-label"
        >
          Catagory
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={catagory}
          label="Catagory"
          onChange={handleChange}
        >
          <MenuItem value={"clock"}>Clock</MenuItem>
          <MenuItem value={"t-shirt"}>T-shirt</MenuItem>
          <MenuItem value={"poster"}>Poster</MenuItem>
          <MenuItem value={"toymodel"}>ToyModel</MenuItem>
          <MenuItem value={"coat"}>Coat</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
