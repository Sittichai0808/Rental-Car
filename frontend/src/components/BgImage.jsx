import { Box, Button, Typography, AppBar } from '@mui/material'

import bgImage from '../assets/bgImage.jpg'
const BgImage = () => {
  return (
    <Box flex={1} p={3} sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'block' } }}>
      <Box
        sx={{
          backgroundImage: `url(${bgImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          width: '75%',
          height: '100%',
          marginLeft: '120px',
          borderRadius: '10px',
          position: 'relative'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '0',
            left: '0',
            backgroundImage: `linear-gradient(90deg, #3bd827 1%, #21d834 100%);`,
            zIndex: 100,
            width: '100%',
            height: '90%',
            opacity: 0.7,
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px'
          }}
        ></Box>
        <Box
          sx={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            backgroundImage: `linear-gradient(90deg, #125509 1%, #075c10 100%);`,
            zIndex: 100,
            width: '100%',
            height: '10%',
            opacity: 0.9,
            borderBottomLeftRadius: '10px',
            borderBottomRightRadius: '10px'
          }}
        ></Box>

        <Typography
          variant='h2'
          sx={{
            position: 'absolute',
            top: '80px',
            left: '60px',
            color: 'white',

            fontWeight: 'bold',
            zIndex: 200
          }}
        >
          A new way to rental cars
        </Typography>
        <Typography
          variant='h6'
          sx={{
            position: 'absolute',
            bottom: '20px',
            left: '60px',
            color: 'white',
            fontSize: '16px',
            zIndex: 200
          }}
        >
          You don&apos;t have to account?
        </Typography>
        <Button
          variant='contained'
          sx={{
            position: 'absolute',
            bottom: '17px',
            right: '60px',
            color: 'white',
            fontSize: '14px',
            zIndex: 200
          }}
        >
          Sign Up
        </Button>
      </Box>
    </Box>
  )
}

export default BgImage
