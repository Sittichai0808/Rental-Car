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

import PersonIcon from '@mui/icons-material/Person'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

import React from 'react'

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

const Register2 = () => {
  const [checked, setChecked] = React.useState(false)
  const [showPassword, setShowPassword] = React.useState(false)
  const [showPassword1, setShowPassword1] = React.useState(false)
  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleClickShowPassword1 = () => setShowPassword1((show) => !show)
  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

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
            fontSize: { xs: '20px', lg: '35px' },
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          Tell us about yourself
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
            <InputLabel htmlFor='outlined1'>Email</InputLabel>
            <OutlinedInput
              id='outlined1'
              endAdornment={
                <InputAdornment position='end'>
                  <EmailIcon sx={{ color: 'black' }} />
                </InputAdornment>
              }
              label='Email'
            />
          </FormControl>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '10px'
          }}
        >
          <FormControl sx={{ width: '50%', marginRight: '10px' }} variant='outlined'>
            <InputLabel htmlFor='outlined-adornment-password'>First name</InputLabel>
            <OutlinedInput
              id='outlined-adornment-password'
              endAdornment={
                <InputAdornment position='end'>
                  <PersonIcon />
                </InputAdornment>
              }
              label='First name'
            />
          </FormControl>
          <FormControl sx={{ width: '50%' }} variant='outlined'>
            <InputLabel htmlFor='outlined-adornment-password'>Last name</InputLabel>
            <OutlinedInput
              id='outlined-adornment-password'
              endAdornment={
                <InputAdornment position='end'>
                  <PersonIcon />
                </InputAdornment>
              }
              label='Last name'
            />
          </FormControl>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '10px'
          }}
        >
          <FormControl sx={{ width: '100%' }} variant='outlined'>
            <InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
            <OutlinedInput
              id='outlined-adornment-password'
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              label='Password'
            />
          </FormControl>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '10px'
          }}
        >
          <FormControl sx={{ width: '100%' }} variant='outlined'>
            <InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
            <OutlinedInput
              id='outlined-adornment-password'
              type={showPassword1 ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword1}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {showPassword1 ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              label='Password'
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
            marginBottom: '20px'
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
              padding: '10px'
            }}
          >
            Continue
          </Button>
        </Box>
      </BoxLogin>
    </Box>
  )
}

export default Register2
