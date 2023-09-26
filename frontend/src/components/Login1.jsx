import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import logo from '../assets/logo.png'
import IconButton from '@mui/material/IconButton'

import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { styled } from '@mui/material/styles'
import GoogleIcon from '@mui/icons-material/Google'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined'
import EmailIcon from '@mui/icons-material/Email'
import toast, { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { loginUser } from '../helper/helper'
import { Link, useNavigate } from 'react-router-dom'
const validationSchema = yup.object({
  email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required')
})

const BootstrapButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  border: 'none',

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
    color: '#000000',
    backgroundColor: 'white'
  }
})
const BootstrapButton1 = styled('button')({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  border: 'none',
  color: '#00cc22',

  backgroundColor: 'white',

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
  }
})

const BoxLogin = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '50px ',
  position: 'absolute',
  marginLeft: '70px',
  width: '460px',

  [theme.breakpoints.down('lg')]: {
    transform: `translate(-50%, -50%)`,
    top: '50%',
    left: '50%',
    marginLeft: '0',
    marginTop: '30px ',
    width: '380px'
  }
}))
const Login1 = () => {
  const [showPassword, setShowPassword] = React.useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const navigate = useNavigate()
  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const formik = useFormik({
    initialValues: {
      email: '',

      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values)
      let loginPromise = loginUser(values)
      toast.promise(loginPromise, {
        loading: 'Logining...',
        success: <b>Login Successfully...!</b>,
        error: (err) => {
          if (err || err.errors || err.errors.length > 0) {
            // Lấy lỗi đầu tiên từ mảng lỗi (có thể bạn muốn xử lý nhiều lỗi ở đây)
            const firstError = err.errors[0]

            // Truy cập các thuộc tính của lỗi và sử dụng chúng để tạo thông báo
            const errorMessage = `${firstError.msg} (${firstError.path} in ${firstError.location})`

            return errorMessage
          } else {
            // Xử lý trường hợp không có lỗi hoặc không có thông tin lỗi
            return 'Unknown error occurred'
          }
        }
      })
      loginPromise.then(function () {
        navigate('/')
      })
    }
  })
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
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <form onSubmit={formik.handleSubmit}>
        <BoxLogin flexDirection='column' p={4}>
          <Box justifyContent='center' alignItems='center' sx={{ display: 'flex', marginBottom: '10px' }}>
            <img src={logo} alt='' width={40} height={40} />
          </Box>
          <Typography
            variant='h6'
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: '25px', lg: '35px' },
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            Sign in to your account
          </Typography>
          <Typography
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#b6b5b5',
              fontSize: '14px',
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
              marginBottom: '10px',
              marginTop: '30px'
            }}
          >
            <FormControl sx={{ width: '100%' }} variant='outlined'>
              <InputLabel htmlFor='outlined1'>Email</InputLabel>
              <OutlinedInput
                id='outlined1'
                name='email'
                endAdornment={
                  <InputAdornment position='end'>
                    <EmailIcon sx={{ color: 'black' }} />
                  </InputAdornment>
                }
                label='Email'
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
              />
              <FormHelperText error>{formik.touched.email && formik.errors.email}</FormHelperText>
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
                name='password'
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label='Password'
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
              />
              <FormHelperText error>{formik.touched.password && formik.errors.password}</FormHelperText>
            </FormControl>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center'
            }}
          >
            <BootstrapButton href='#text-buttons' disableRipple>
              Recover password
            </BootstrapButton>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '20px'
              // paddingRight: '23px'
            }}
          >
            <Button
              type='summit'
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
              Sign in
            </Button>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
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
              You don&apos;t have an account? <BootstrapButton1>Sign up</BootstrapButton1>
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '15px',
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
            <Button
              variant='outlined'
              sx={{
                width: '100%',
                top: '10px',
                // left: '7px',
                color: 'gray',
                textTransform: 'capitalize',
                borderColor: '#c4c2c2',
                padding: '10px',
                position: 'relative'
              }}
              // startIcon={<GoogleIcon />}
            >
              <GoogleIcon sx={{ position: 'absolute', left: '15px' }} />
              Sign up with Google
            </Button>
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
              variant='outlined'
              sx={{
                width: '100%',
                top: '10px',
                // left: '7px',
                color: 'gray',
                textTransform: 'capitalize',
                borderColor: '#c4c2c2',
                padding: '10px',
                position: 'relative'
              }}
            >
              <FacebookOutlinedIcon sx={{ position: 'absolute', left: '15px' }} />
              Sign up with facebook
            </Button>
          </Box>
        </BoxLogin>
      </form>
    </Box>
  )
}

export default Login1
