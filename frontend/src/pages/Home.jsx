import toast, { Toaster } from 'react-hot-toast'
import { Box } from '@mui/material'

import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
const Home = () => {
  let location = useLocation()
  useEffect(() => {
    if (location.success === true) {
      toast.success(<b>Login Success</b>)
    }
  })

  return (
    <Box>
      <Toaster position='top-center' reverseOrder={false}></Toaster>Home
    </Box>
  )
}

export default Home
