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
  styled,
  FormHelperText
} from '@mui/material'
import logo from '../assets/logo.png'
import EmailIcon from '@mui/icons-material/Email'

import PersonIcon from '@mui/icons-material/Person'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useFormik } from 'formik'
import * as yup from 'yup'
import React from 'react'
import { registerUser } from '../helper/helper'
import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'

const BoxRegister = styled(Box)(({ theme }) => ({
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

const validationSchema = yup.object({
  email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  username: yup.string('Enter your username').required('Username is required'),
  confirm_password: yup
    .string('Confirm your password')
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required')
})

const Register2 = () => {
  const [checked, setChecked] = React.useState(false)
  const [showPassword, setShowPassword] = React.useState(false)
  const [showPassword1, setShowPassword1] = React.useState(false)
  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleClickShowPassword1 = () => setShowPassword1((show) => !show)
  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
      confirm_password: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values)
      let registerPromise = registerUser(values)
      toast.promise(registerPromise, {
        loading: 'Creating...',
        success: <b>Register Successfully...!</b>,
        error: (err) => {
          if (err || err.errors || err.errors.length > 0) {
            // Lấy lỗi đầu tiên từ mảng lỗi (có thể bạn muốn xử lý nhiều lỗi ở đây)
            const firstError = err.errors[0]

            // Truy cập các thuộc tính của lỗi và sử dụng chúng để tạo thông báo
            const errorMessage = `${firstError.msg} `

            return errorMessage
          } else {
            // Xử lý trường hợp không có lỗi hoặc không có thông tin lỗi
            return 'Unknown error occurred'
          }
        }
      })

      registerPromise.then(function () {
        navigate('/')
      })
    }
  })

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
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <form onSubmit={formik.handleSubmit}>
        <BoxRegister flexDirection='column' p={4}>
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
                name='email'
                id='outlined1'
                type='email'
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
              <InputLabel htmlFor='outlined1'>Username</InputLabel>
              <OutlinedInput
                id='outlined1'
                endAdornment={
                  <InputAdornment position='end'>
                    <PersonIcon />
                  </InputAdornment>
                }
                label='Username'
                name='username'
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.username && Boolean(formik.errors.username)}
              />
              <FormHelperText error>{formik.touched.username && formik.errors.username}</FormHelperText>
            </FormControl>
            {/* <FormControl sx={{ width: '50%', marginRight: '10px' }} variant='outlined'>
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
          </FormControl> */}
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
                name='password'
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
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '10px'
            }}
          >
            <FormControl sx={{ width: '100%' }} variant='outlined'>
              <InputLabel htmlFor='outlined-adornment-password'>Confirm password</InputLabel>
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
                name='confirm_password'
                label='Confirm password'
                value={formik.values.confirm_password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.confirm_password && Boolean(formik.errors.confirm_password)}
              />
              <FormHelperText error>{formik.touched.confirm_password && formik.errors.confirm_password}</FormHelperText>
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
              type='submit'
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
        </BoxRegister>
      </form>
    </Box>
  )
}

export default Register2
