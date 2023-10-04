import {
  Box,
  Button,
  Checkbox,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  styled
} from '@mui/material'
import logo from '../assets/logo.png'
import EmailIcon from '@mui/icons-material/Email'
import GoogleIcon from '@mui/icons-material/Google'

import React from 'react'
import OAuthGoogle from './OAuthGoogle'

const BoxLogin = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '50px ',
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

const BootstrapButton = styled('button')({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  border: 'none',
  color: '#00cc22',
  // padding: '5px 10px',
  // border: '1px solid',
  // lineHeight: 1.5,
  backgroundColor: 'white',
  // borderColor: '#00cc22',
  fontWeight: 'bold',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"'
  ].join(','),
  '&:hover': {
    backgroundColor: 'white',
    cursor: 'pointer',
    color: '#000000'
    // borderColor: '#00cc22'
    // boxShadow: 'none'
  }
})
const Register1 = () => {
  const [checked, setChecked] = React.useState(false)

  const handleChange = (event) => {
    setChecked(event.target.checked)
  }
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
          <img src={logo} alt='' width={50} height={50} />
        </Box>
        <Typography
          variant='h6'
          sx={{
            fontWeight: 'bold',
            fontSize: { xs: '20px', lg: '32px' },
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          Sign Up to getting started
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
            marginBottom: '30px'
          }}
        >
          Enter your details to proceed further
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '10px'
          }}
        >
          <FormControl sx={{ width: '100%' }} variant='outlined'>
            <InputLabel htmlFor='outlined-adornment-password'>Email</InputLabel>
            <OutlinedInput
              id='outlined-adornment-password'
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton aria-label='toggle password visibility' edge='end'>
                    <EmailIcon sx={{ color: 'black' }} />
                  </IconButton>
                </InputAdornment>
              }
              label='Email'
            />
          </FormControl>
        </Box>
        <Typography
          variant='h6'
          sx={{
            display: 'flex',
            fontWeight: 'bold',
            justifyContent: 'flex-start',
            alignItems: 'center',
            color: '#b6b5b5',

            fontSize: { xs: '14px', lg: '14px' },
            marginBottom: '10px'
          }}
        >
          <Checkbox checked={checked} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} /> I agree
          with terms & conditions
        </Typography>

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
              padding: '10px',
              marginBottom: '25px'
            }}
          >
            Sign Up
          </Button>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center'
            // paddingRight: '23px'
          }}
        >
          <Typography
            sx={{
              color: '#b6b5b5',
              fontWeight: 'bold',
              fontSize: { xs: '14px', lg: '14px' }
            }}
          >
            {' '}
            You have an account? <BootstrapButton>Sign in</BootstrapButton>
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '20px',
            marginBottom: '15px',
            color: 'gray'
          }}
        >
          <Typography>Or</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            // paddingRight: '23px',
            marginBottom: '10px'
          }}
        >
          <OAuthGoogle />
        </Box>
      </BoxLogin>
    </Box>
  )
}

export default Register1
