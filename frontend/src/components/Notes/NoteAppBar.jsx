import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  Icon
} from '@mui/material';

const NoteAppBar = ({
  isMobile = false,
  toggleMenuDrawer,
  onLogout,
}) => {
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);

  const handleUserMenuOpen = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  // Render Helpers

  const renderSidebarButton = () => (
    <IconButton
      edge="start"
      onClick={toggleMenuDrawer}
      sx={{ mr: 2 }}
    >
      <Icon>menu</Icon>
    </IconButton>
  )

  const renderUserButton = () => (
    <IconButton
      onClick={handleUserMenuOpen}
      size="small"
    >
      <Avatar sx={{ width: 32, height: 32 }}>
        <Icon>account_circle</Icon>
      </Avatar>
    </IconButton>
  )

  const renderUserMenu = () => (
    <Menu
      anchorEl={userMenuAnchor}
      open={Boolean(userMenuAnchor)}
      onClose={handleUserMenuClose}
    >
      <MenuItem onClick={handleUserMenuClose}>Profile</MenuItem>
      <MenuItem
        onClick={() => {
          handleUserMenuClose();
          if (onLogout) onLogout();
        }}
      >
        Logout
      </MenuItem>
    </Menu>
  )

  return (
    <AppBar
      position='sticky'
      elevation={0}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: 'background.paper',
        color: 'text.primary',
        borderBottom: '1px solid',
        borderColor: 'divider',
        width: '100%',
        left: 0,
      }}
    >
      <Toolbar>
        {isMobile && renderSidebarButton()}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 500 }}>
          Note Taker
        </Typography>

        {renderUserButton()}
        {renderUserMenu()}
      </Toolbar>
    </AppBar>
  );
};

export default NoteAppBar;
