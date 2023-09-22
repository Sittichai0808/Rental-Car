import * as React from 'react'
import { useEffect, useState } from 'react'
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MyAccount from './MyAccount'
import MyFavoriteCar from './Profile/MyFavoriteCar'
import MyCar from './Profile/MyCar'
import MyTrip from './Profile/MyTrip'
import Gift from './Profile/Gift'
import MyAddress from './Profile/MyAddress'
import ChangePassword from './Profile/ChangePassword'
import LogOut from './Profile/LogOut'
import DeletePassword from './Profile/DeletePassword'
import { AiOutlineUser, AiOutlineHeart, AiOutlineCar, AiOutlineDelete } from 'react-icons/ai'
import { BiTrip, BiGift } from 'react-icons/bi'
import { PiAddressBookLight } from 'react-icons/pi'
import { RiGitRepositoryPrivateLine } from 'react-icons/ri'
import { CiLogout } from 'react-icons/ci'

const drawerWidth = 350

const Sidebar = () => {
  const [menudata, setMenudata] = useState(
    'MyAccount',
    'MyFavoriteCar',
    'MyCar',
    'MyTrip',
    'Gift',
    'MyAddress',
    'ChangePassword',
    'LogOut',
    'DeletePassword'
  )

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position='fixed' sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
        <Toolbar>
          <Typography variant='h6' noWrap component='div'>
            Xin chào bạn !
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box'
          }
        }}
        variant='permanent'
        anchor='left'
      >
        <Toolbar />
        <Divider />
        <List>
          <ListItem
            disablePadding
            onClick={() => setMenudata('MyAccount')}
            sx={{
              positive: 'relative',
              display: 'flex',

              cursor: 'pointer',
              left: '50px'
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <AiOutlineUser />
              </ListItemIcon>
              <ListItemText primary='Tài khoản của tôi' />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            onClick={() => setMenudata('MyFavoriteCar')}
            sx={{
              positive: 'relative',
              display: 'flex',

              cursor: 'pointer',
              left: '50px'
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <AiOutlineHeart />
              </ListItemIcon>
              <ListItemText
                primary='Xe yêu thích'
                sx={{
                  color: '#000000'
                }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            onClick={() => setMenudata('MyCar')}
            sx={{
              positive: 'relative',
              display: 'flex',

              cursor: 'pointer',
              left: '50px'
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <AiOutlineCar width={50} height={100} />
              </ListItemIcon>
              <ListItemText
                primary='Xe của tôi'
                sx={{
                  color: '#000000'
                }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            onClick={() => setMenudata('MyTrip')}
            sx={{
              positive: 'relative',
              display: 'flex',

              cursor: 'pointer',
              left: '50px'
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <BiTrip />
              </ListItemIcon>
              <ListItemText
                primary='Chuyến đi của tôi'
                sx={{
                  color: '#000000'
                }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            onClick={() => setMenudata('Gift')}
            sx={{
              positive: 'relative',
              display: 'flex',

              cursor: 'pointer',
              left: '50px'
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <BiGift />
              </ListItemIcon>
              <ListItemText
                primary='Khuyến mãi/ Quà tặng'
                sx={{
                  color: '#000000'
                }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            onClick={() => setMenudata('MyAddress')}
            sx={{
              positive: 'relative',
              display: 'flex',

              cursor: 'pointer',
              left: '50px'
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <PiAddressBookLight />
              </ListItemIcon>
              <ListItemText primary='Địa chỉ của tôi' />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            onClick={() => setMenudata('ChangePassword')}
            sx={{
              positive: 'relative',
              display: 'flex',

              cursor: 'pointer',
              left: '50px'
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <RiGitRepositoryPrivateLine />
              </ListItemIcon>
              <ListItemText primary='Đổi mật khẩu' />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            onClick={() => setMenudata('LogOut')}
            sx={{
              positive: 'relative',
              display: 'flex',

              cursor: 'pointer',
              left: '50px'
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <CiLogout />
              </ListItemIcon>
              <ListItemText primary='Đăng xuất' />
            </ListItemButton>
          </ListItem>

          <ListItem
            disablePadding
            onClick={() => setMenudata('DeletePassword')}
            sx={{
              positive: 'relative',
              display: 'flex',

              left: '50px'
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <AiOutlineDelete />
              </ListItemIcon>
              <ListItemText primary='Yêu cầu xóa tài khoản' />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <Box component='main' sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
        <Toolbar />
        {menudata == 'MyAccount' && <MyAccount />}
        {menudata == 'MyFavoriteCar' && <MyFavoriteCar />}
        {menudata == 'MyCar' && <MyCar />}
        {menudata == 'MyTrip' && <MyTrip />}
        {menudata == 'Gift' && <Gift />}
        {menudata == 'MyAddress' && <MyAddress />}
        {menudata == 'ChangePassword' && <ChangePassword />}
        {menudata == 'LogOut' && <LogOut />}
        {menudata == 'DeletePassword' && <DeletePassword />}
      </Box>
    </Box>
  )
}
export default Sidebar
