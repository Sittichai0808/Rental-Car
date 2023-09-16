import { Box, Stack } from '@mui/material'
import BgImage from '../components/BgImage'
import Login1 from '../components/Login1'
const Login = () => {
  return (
    <Stack direction='row' justifyContent='space-between' sx={{ height: '100vh' }}>
      <BgImage />
      <Login1 />
    </Stack>
  )
}

export default Login
