import React from 'react'
import { Box, Stack } from '@mui/material'
import Sidebar from '../components/Sidebar'
const Profile = () => {
  return (
    <Stack direction='row' justifyContent='space-between' sx={{ height: '100vh' }}>
      <Sidebar />
    </Stack>
  )
}

export default Profile
