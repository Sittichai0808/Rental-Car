import React, { useState } from 'react'
import {
  Menu as MenuIcon,
  Search,
  ArrowDropDownOutlined,
  NotificationsNoneOutlined,
  ChatBubbleOutlineOutlined
} from '@mui/icons-material'
import { styled } from '@mui/material/styles'
import Badge from '@mui/material/Badge'
import MuiAppBar from '@mui/material/AppBar'
import {
  AppBar,
  Button,
  Box,
  Typography,
  IconButton,
  InputBase,
  Toolbar,
  Menu,
  MenuItem,
  useTheme
} from '@mui/material'
import profileImage from '../../assets/avatar.jpg'

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const isOpen = Boolean(anchorEl)
  const handleClick = (event) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  return (
    <AppBar
      sx={{
        position: 'static',
        background: 'none',
        boxShadow: 'none'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#fffcfc',
              borderRadius: '9px',
              gap: '3rem',
              p: '0.1rem 1.5rem'
            }}
          >
            <InputBase placeholder='Search...' />
            <IconButton>
              <Search />
            </IconButton>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1.5rem'
          }}
        >
          <IconButton>
            <Badge badgeContent={4} color='error'>
              <NotificationsNoneOutlined sx={{ fontSize: '25px' }} />
            </Badge>
          </IconButton>
          <IconButton>
            <Badge badgeContent={4} color='error'>
              <ChatBubbleOutlineOutlined sx={{ fontSize: '25px' }} />
            </Badge>
          </IconButton>

          <Box display='flex' alignItems='center'>
            <Button
              onClick={handleClick}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                textTransform: 'none',
                borderRadius: '20%',
                bgcolor: '#E3F2FD',
                ':hover': {
                  bgcolor: '#1E88E5'
                }
              }}
            >
              <Box
                component='img'
                alt='profile'
                src={profileImage}
                height='32px'
                width='32px'
                borderRadius='50%'
                sx={{ objectFit: 'cover' }}
              />
              <ArrowDropDownOutlined sx={{ color: '#000', fontSize: '25px' }} />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>Log out</MenuItem>
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
