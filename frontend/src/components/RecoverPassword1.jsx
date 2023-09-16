import { Box, Button, TextField, Typography, styled } from '@mui/material'
import forgotPassword from '../assets/forgot-password.png'

const BoxLogin = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '130px ',
  position: 'absolute',
  marginLeft: '100px',
  width: '470px',

  [theme.breakpoints.down('lg')]: {
    transform: `translate(-50%, -50%)`,
    top: '50%',
    left: '50%',
    marginLeft: '0',
    marginTop: '0px ',
    width: '380px'
  }
}))

const RecoverPassword1 = () => {
  return (
    <Box
      flex={1}
      sx={{
        flexDirection: 'row',

        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <BoxLogin flexDirection='column' p={4}>
        <Box justifyContent='center' alignItems='center' sx={{ display: 'flex', marginBottom: '20px' }}>
          <img src={forgotPassword} alt='' width={70} height={70} />
        </Box>
        <Typography
          variant='h6'
          sx={{
            fontWeight: 'bold',
            fontSize: { xs: '20px', lg: '25px' },
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          Lost your password?
        </Typography>
        <Typography
          variant='h6'
          sx={{
            display: 'flex',
            fontWeight: 'bold',
            justifyContent: 'center',
            alignItems: 'center',

            fontSize: { xs: '20px', lg: '25px' },
            marginBottom: '10px'
          }}
        >
          Enter your details to recover
        </Typography>
        <Typography
          variant='h6'
          sx={{
            display: 'flex',
            fontWeight: 'bold',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#b6b5b5',

            fontSize: { xs: '14px', lg: '14px' },
            marginBottom: '10px'
          }}
        >
          Enter your details to proceed further
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '20px'
          }}
        >
          <TextField id='outlined-basic' label='Email' variant='outlined' sx={{ width: '100%', marginTop: '20px' }} />
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
            // paddingRight: '23px'
          }}
        >
          <Button
            variant='contained'
            sx={{
              width: '100%',
              top: '10px',
              // left: '7px',
              color: 'white',
              textTransform: 'capitalize',
              padding: '10px'
            }}
          >
            Recover password
          </Button>
        </Box>
      </BoxLogin>
    </Box>
  )
}

export default RecoverPassword1
