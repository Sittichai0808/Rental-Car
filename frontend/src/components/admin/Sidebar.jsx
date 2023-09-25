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
    text: 'Bảng Điều Khiển',
    icon: <HomeOutlined />,
    path: 'dashboard'
  },
  {
    text: 'Xe',
    icon: <DirectionsCarOutlined />,
    path: 'cars'
  },
  {
    text: 'Người dùng',
    icon: <Groups2Outlined />,
    path: 'users'
  },
  {
    text: 'Duyệt xe',
    icon: <ReceiptLongOutlined />,
    path: 'registerCar'
  },
  {
    text: 'Lịch Thuê Xe',
    icon: <CalendarMonthOutlined />,
    path: 'booking'
  },
  {
    text: 'Báo Cáo',
    icon: <ReportOutlined />,
    path: 'reports'
  },
  {
    text: 'Cài Đặt',
    icon: <SettingsOutlined />,
    path: 'settings'
  },
  {
    text: 'Đăng Xuất',
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
          onClose={() => setIsSidebarOpen(true)}
          variant='persistent'
          anchor='left'
          sx={{
            width: drawerWidth,
            '& .MuiDrawer-paper': {
              color: '#cccc',
              backgroundColor: '#f8f9fa',
              boxSizing: 'border-box',
              borderWidth: '2px',
              width: drawerWidth
            }
          }}
        >
          <Box width='100%'>
            <Box m='2rem 2rem 1.4rem 1rem'>
              <Box display='flex' justifyContent='center' alignItems='end' color='#000'>
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
              {navItems.map(({ text, icon, path }) => {
                const lcPath = path
                return (
                  <ListItem key={text}>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcPath}`)
                        setActive(lcPath)
                      }}
                      sx={{
                        backgroundColor: active === lcPath ? '#ffffff' : 'transparent',
                        color: active === lcPath ? '#2a2a2b' : '#8c8c8c',
                        boxShadow: active === lcPath ? '0px 2px 9px 0.4px rgba(209,209,209,0.8)' : 'none',
                        ':hover': {
                          bgcolor: '#ffffff'
                        },
                        borderRadius: '10px'
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          color: active === lcPath ? '#fbfeff' : '#575d84',
                          minWidth: '36px',
                          boxShadow: '0px 2px 9px 0.4px rgba(209,209,209,0.8)',
                          justifyContent: 'center',
                          padding: '6px',
                          marginRight: '16px',
                          borderRadius: '10px',
                          bgcolor: active === lcPath ? '#17c1e8' : 'none'
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
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
