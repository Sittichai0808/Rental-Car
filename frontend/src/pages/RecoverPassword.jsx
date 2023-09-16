import { Stack } from '@mui/material'
import BgImage from '../components/BgImage'
import RecoverPassword1 from '../components/RecoverPassword1'
const RecoverPassword = () => {
  return (
    <Stack direction='row' justifyContent='space-between' sx={{ height: '100vh' }}>
      <BgImage />
      <RecoverPassword1 />
    </Stack>
  )
}

export default RecoverPassword
