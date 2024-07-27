import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MobileMenu from "../MobileMenu";
import { useNavigate } from "react-router-dom";

const pages = ["home"];

const ResponsiveNavbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenMobileMenu = () => setMobileMenuOpen(true);
  const handleCloseMobileMenu = () => setMobileMenuOpen(false);

  const navigateTo = (page: string) =>
    navigate(page === "home" ? "/" : `/${page}`);

  const renderPageButtons = (display: string) =>
    pages.map((page) => (
      <Button
        key={page}
        sx={{ my: 2, color: "white", display }}
        onClick={() => navigateTo(page)}
      >
        {page}
      </Button>
    ));

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#ff5722" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h5"
              noWrap
              sx={{ mr: 2, display: { xs: "none", md: "flex" }, textDecoration: "none",}}>
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Box>
            <Typography variant="h5" noWrap
             sx={{ mr: 2, display: { xs: "flex", md: "none" }, flexGrow: 1, textDecoration: "none",}}>
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {renderPageButtons("block")}
            </Box>
            <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="open drawer"
                onClick={handleOpenMobileMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <Typography
              component="span"
              sx={{color: "black", cursor: "pointer", mr: 2, textDecoration: "underline", fontSize: "1.1rem",
              display: { xs: "none", sm: "none", md: "inline" },}}
              onClick={() => navigate("/logIn")}>
              Log In
            </Typography>
            <Button variant="contained"
              sx={{ borderRadius: 50, color: "white",
              display: { xs: "none", sm: "none", md: "inline" },}}
              onClick={() => navigate("register")}>
              Get Started
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
      <MobileMenu open={mobileMenuOpen} onClose={handleCloseMobileMenu} pages={pages} navigate={navigate} />
    </>
  );
};

export default ResponsiveNavbar;
