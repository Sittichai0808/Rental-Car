import * as React from 'react'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'

const drawerWidth = 240

const MyFavoriteCar = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', position: 'absolute', left: '50%' }}>
      <Box
        sx={{
          display: 'block',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 'auto'
        }}
      >
        <Typography
          variant='h4'
          sx={{
            color: '#000',
            display: 'flex',
            fontSize: '2rem',
            fontWeight: '800'
          }}
        >
          Xe yêu thích của tôi
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <img loading='lazy' src='https://www.mioto.vn/static/media/empty-favcar.2c855700.svg' alt='' width={340} />
        <Typography
          sx={{
            color: '#6f6f6f',
            textAlign: 'center',
            fontSize: '1.25rem',
            fontWeight: '600'
          }}
        >
          Không có xe yêu thích
        </Typography>
      </Box>
    </Box>
  )
}
export default MyFavoriteCar
