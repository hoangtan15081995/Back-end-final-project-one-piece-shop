import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import Logo from "../components/Logo";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchForm from "../components/SearchForm";
import SearchFormDemo from "../components/SearchFormDemo";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { alertClasses } from "@mui/material";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { getProductsInCard } from "../features/card/cardSlice";
import { useSelector, useDispatch } from "react-redux";
import { getProductsCatagory } from "../features/product/productSlice";

export default function PrimarySearchAppBar() {
  const accessToken = window.localStorage.getItem("accessToken");
  const dispatch = useDispatch();
  const { productsInCard } = useSelector((state) => state.card);
  useEffect(() => {
    dispatch(getProductsInCard());
  }, []);
  const auth = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    navigate("/change");
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleLogOut = async () => {
    try {
      setAnchorEl(null);
      handleMobileMenuClose();
      await auth.logout(() => {
        navigate("/");
      });
      toast.success("Log out success");
    } catch (error) {
      console.error(error);
    }
  };

  const Catagories = ["Clock", "T-shirt", "Poster", "Toymodel", "Coat"];
  const handleOnclickCatagory = (catagory) => {
    catagory = catagory.toLowerCase();
    dispatch(getProductsCatagory(catagory));
  };

  const handleLogin = async () => {
    try {
      setAnchorEl(null);
      handleMobileMenuClose();
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };
  const handleOrder = async () => {
    try {
      setAnchorEl(null);
      handleMobileMenuClose();
      navigate("/order");
    } catch (error) {
      console.error(error);
    }
  };
  const handleProfile = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    navigate("/profile");
  };
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {accessToken ? (
        <div>
          <MenuItem onClick={handleProfile}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>Change Password</MenuItem>
          <MenuItem onClick={handleOrder}>Order</MenuItem>
          <MenuItem onClick={handleLogOut}>Log out</MenuItem>
        </div>
      ) : (
        <MenuItem
          sx={{ minWidth: 150, justifyContent: "center" }}
          onClick={handleLogin}
        >
          Login
        </MenuItem>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <Link
        style={{ textDecoration: "none", color: "white" }}
        to="/productcard"
      >
        <MenuItem>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge
              badgeContent={accessToken ? productsInCard.length : 0}
              color="error"
            >
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <p>Cart</p>
        </MenuItem>
      </Link>

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2, ml: 2 }}
          >
            <Logo />
          </IconButton>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            ONE PIECE
          </Typography>
          <SearchFormDemo />

          {Catagories.map((catagory) => {
            return (
              <Link
                key={catagory}
                style={{ textDecoration: "none", color: "white" }}
                to={`catagoryPage/${catagory}`}
                onClick={() => handleOnclickCatagory(catagory)}
              >
                <Typography
                  variant="h5"
                  noWrap
                  component="div"
                  sx={{ display: { xs: "none", sm: "block" }, mr: 5, ml: 4 }}
                >
                  {catagory}
                </Typography>
              </Link>
            );
          })}

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Link
                style={{
                  textDecoration: "none",
                  color: "white",
                }}
                to="/productcard"
              >
                <Badge
                  badgeContent={accessToken ? productsInCard.length : 0}
                  color="success"
                >
                  <ShoppingCartIcon />
                </Badge>
              </Link>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
