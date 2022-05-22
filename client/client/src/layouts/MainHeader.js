import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Logo from "../components/Logo";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchFormDemo from "../components/SearchFormDemo";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { getProductsInCard } from "../features/card/cardSlice";
import { useSelector, useDispatch } from "react-redux";
import SelectCatagory from "../components/SelectCatagory";

export default function PrimarySearchAppBar() {
  const { profile } = useSelector((state) => state.user);
  const accessToken = window.localStorage.getItem("accessToken");
  const dispatch = useDispatch();
  const { productsInCard } = useSelector((state) => state.card);
  useEffect(() => {
    dispatch(getProductsInCard());
  }, [dispatch]);
  const auth = useAuth();
  const { user } = useAuth();
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
  const handleOrdersList = async () => {
    try {
      setAnchorEl(null);
      handleMobileMenuClose();
      navigate("/orderslist");
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
          <Link
            style={{ textDecoration: "none", color: "black" }}
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
          <MenuItem onClick={handleProfile}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>Change Password</MenuItem>
          <MenuItem onClick={handleOrder}>Order</MenuItem>
          <MenuItem onClick={handleOrdersList}>Orders List</MenuItem>
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
        style={{ textDecoration: "none", color: "black" }}
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
            sx={{ mr: { xs: 0, md: 2 } }}
          >
            <Logo />
          </IconButton>
          <Typography
            // variant="h6"
            noWrap
            component="div"
            sx={{
              display: { xs: "none", sm: "block" },
              color: { xs: "#ee4d2d", sm: "#ee4d2d", md: "white" },
              fontSize: { xs: 0, sm: 0, md: 19 },
            }}
          >
            ONE PIECE
          </Typography>
          <SearchFormDemo />

          <SelectCatagory />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "flex", sm: "flex" } }}>
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
              <Avatar
                src={accessToken ? profile.avatarURL || user.avatarURL : ""}
              />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
