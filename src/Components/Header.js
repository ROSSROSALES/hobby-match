import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import BlenderIcon from '@mui/icons-material/Blender';
import { Link } from "react-router-dom";

import { auth } from "../firebase";

import { SignOut } from "../firebase";


const pages = [
    {
        title: 'Home', 
        path: '/'
    },
    {
        title: 'Profile', 
        path: '/history'
    },
    {
      title: 'Chat', 
      path: '/chat'
  },
]

const settings = [
    {
      title: 'Home', 
      path: '/'
    },
    {
      title: 'Profile', 
      path: '/history'
    },
    
    {
      title: 'Chat', 
      path: '/chat'
    },
];


function Header() {
  const user = auth.currentUser;
  console.log(user)

  //if (user) {
  //  // User is authenticated, you can safely access user properties like photoURL
  //  const { photoURL } = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fillustrations%2Fempty-profile-picture&psig=AOvVaw2yD1HDk6aK7kYmnGv1TtDg&ust=1696114999524000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCLjQ7vH20IEDFQAAAAAdAAAAABAZ";
  //  console.log('User photoURL:', photoURL);
  //} else {
  //  // User is not authenticated, handle accordingly
  //  console.log('User is not authenticated');
  //}

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  function handleOpenNavMenu(event) {
    console.log(event.currentTarget)
    console.log("This opens the menu")
    setAnchorElNav(event.currentTarget);
  };

  function handleOpenUserMenu(event) {
    setAnchorElUser(event.currentTarget);
    console.log(anchorElUser)
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLinkClick = () => {
    console.log('Link clicked');
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <BlenderIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            ANIME
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <Link to={page.path}>
                    <MenuItem key={page.title} onClick={() => {handleCloseNavMenu(); handleLinkClick();}}>
                    <Typography textAlign="center" color="black" >{page.title}</Typography>
                    </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <BlenderIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            ANIME
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link to={page.path}>
                <Button
                    key={page.title}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block',  marginLeft: 2}} // ToDo: Title currently changes format too
                >
                    {page.title}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src= {user ? user.photoURL : "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="}/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <Link to={setting.path}>
                    <MenuItem key={setting.title} onClick={handleCloseUserMenu}>
                        <Typography color="black" textAlign="center">{setting.title}</Typography>
                    </MenuItem>
                </Link>
              ))}
                <MenuItem key="SignOut" onClick={SignOut}>
                    <Typography color="black" textAlign="center">Signout</Typography>
                </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;

