import { Stack } from '@mui/material'
import BgImage from '../components/BgImage'
import Register1 from '../components/Register1'
const Register = () => {
  return (
    <Stack direction='row' justifyContent='space-between' sx={{ height: '100vh' }}>
      <BgImage />
      <Register1 />
    </Stack>
  )
}

export default Register
