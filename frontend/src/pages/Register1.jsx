import { Stack } from '@mui/material'
import BgImage from '../components/BgImage'
import Register2 from '../components/Register2'
const Register1 = () => {
  return (
    <Stack direction='row' justifyContent='space-between' sx={{ height: '100vh' }}>
      <BgImage />
      <Register2 />
    </Stack>
  )
}

export default Register1
