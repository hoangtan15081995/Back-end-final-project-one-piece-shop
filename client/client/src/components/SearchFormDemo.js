import React from "react";
import "./SearchFormDemo.css";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  getPagePaginationSearch,
  getProductsByName,
} from "../features/product/productSlice";
import { useNavigate } from "react-router-dom";

function SearchFormDemo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    dispatch(getProductsByName(data.search));
    dispatch(getPagePaginationSearch(1));
    navigate(`/search/${data.search}`);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="search-bar">
        <input
          {...register("search")}
          placeholder="Search..."
          pattern=".*\S.*"
          required
        ></input>
        <button className="search-btn" type="submit">
          <span>Search</span>
        </button>
      </form>
    </>
  );
}

export default SearchFormDemo;
