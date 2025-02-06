import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const leftLinks = [
    { name: 'ActiveTodos', path: '/' },
    { name: 'Completed', path: '/completed' },
    { name: 'Users', path: '/users' },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#616161" }}>
        <Toolbar>
          {/* Hamburger Menu Icon (Visible on Small Screens) */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{ display: { xs: 'block', md: 'none' }, mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          {/* App Title */}
          <Typography
            variant="h6"
            component="div"
            sx={{
              textAlign: { xs: 'center', md: 'left' },
              fontSize: { xs: '18px', sm: '22px', md: '24px' },
            }}
          >
            Todo App
          </Typography>

          {/* Left Navigation Links (Visible on Medium and Larger Screens) */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 2 }}>
            {leftLinks.map((link) => (
              <Button
                key={link.name}
                color="inherit"
                sx={{ marginLeft: 2 }}
                component={Link}
                to={link.path}
              >
                {link.name}
              </Button>
            ))}
          </Box>

          {/* Right Navigation Link (Login/Logout Button) */}
          <Box sx={{ display: 'flex', marginLeft: 'auto' }}>
            {isLoggedIn ? (
              <Button
                color="inherit"
                sx={{ marginLeft: 2 }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <Button
                color="inherit"
                sx={{ marginLeft: 2 }}
                component={Link}
                to="/login"
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer for Small Screens */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{ display: { md: 'none' } }}
      >
        <Box
          sx={{
            width: 250,
            paddingTop: 2,
          }}
          role="presentation"
          onClick={handleDrawerToggle}
          onKeyDown={handleDrawerToggle}
        >
          {/* Drawer List */}
          <List>
            {leftLinks.map((link) => (
              <ListItem key={link.name} disablePadding>
                <ListItemButton component={Link} to={link.path}>
                  <ListItemText primary={link.name} />
                </ListItemButton>
              </ListItem>
            ))}
            <Divider />
            <ListItem disablePadding>
              {isLoggedIn ? (
                <ListItemButton onClick={handleLogout}>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              ) : (
                <ListItemButton component={Link} to="/login">
                  <ListItemText primary="Login" />
                </ListItemButton>
              )}
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
