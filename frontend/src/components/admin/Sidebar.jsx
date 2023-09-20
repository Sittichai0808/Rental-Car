import React from 'react'
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme
} from '@mui/material'
import {
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  DirectionsCarOutlined,
  ReportOutlined,
  CalendarMonthOutlined,
  SettingsOutlined,
  LogoutOutlined
} from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const navItems = [
  {
    text: 'Dashboard',
    icon: <HomeOutlined />
  },
  {
    text: 'Management',
    icon: null
  },
  {
    text: 'Cars',
    icon: <DirectionsCarOutlined />
  },
  {
    text: 'Users',
    icon: <Groups2Outlined />
  },
  {
    text: 'Booking',
    icon: <ReceiptLongOutlined />
  },
  {
    text: 'Calender',
    icon: <CalendarMonthOutlined />
  },
  {
    text: 'Action',
    icon: null
  },
  {
    text: 'Report',
    icon: <ReportOutlined />
  },
  {
    text: 'Settings',
    icon: <SettingsOutlined />
  },
  {
    text: 'Sign Out',
    icon: <LogoutOutlined />
  }
]

const Sidebar = ({ drawerWidth, isSidebarOpen, setIsSidebarOpen, isNonMobile }) => {
  const { pathname } = useLocation()
  const [active, setActive] = useState('')
  const navigate = useNavigate()
  const theme = useTheme()

  useEffect(() => {
    setActive(pathname.substring(1))
  }, [pathname])

  return (
    <Box>
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant='persistent'
          anchor='left'
          sx={{
            width: drawerWidth,
            '& .MuiDrawer-paper': {
              color: '#cccc',
              backgroundColor: '#ffff',
              boxSizing: 'border-box',
              borderWidth: '2px',
              width: drawerWidth
            }
          }}
        >
          <Box width='100%'>
            <Box m='1rem 1rem 1rem 1rem'>
              <Box display='flex' justifyContent='center' alignItems='center' color={theme.palette.primary.main}>
                <Box display='flex' alignItems='center' gap='0.5rem'>
                  <Typography variant='h4' fontWeight='bold'>
                    CRT
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </Box>
            </Box>
            <List>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography
                      key={text}
                      sx={{
                        m: '1rem 0 1rem 3rem',
                        color: '#000000'
                      }}
                    >
                      {text}
                    </Typography>
                  )
                }
                const lcText = text.toLowerCase()
                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`)
                        setActive(lcText)
                      }}
                      sx={{
                        backgroundColor: active === lcText ? 'rgba(150, 246, 150, 0.5)' : 'transparent',
                        color: active === lcText ? '#43fb05' : '#8c8c8c',
                        ':hover': {
                          bgcolor: 'rgba(150, 246, 150, 0.5)'
                        }
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: '2rem',
                          color: active === lcText ? '#43fb05' : '#8c8c8c'
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && <ChevronRightOutlined sx={{ ml: 'auto' }} />}
                    </ListItemButton>
                  </ListItem>
                )
              })}
            </List>
          </Box>
        </Drawer>
      )}
    </Box>
  )
}

export default Sidebar
