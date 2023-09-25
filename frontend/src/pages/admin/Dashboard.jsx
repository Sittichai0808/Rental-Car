import React from 'react'
import { Box, Grid, Typography, Card, CardContent } from '@mui/material'
import UsersTable from '../../components/admin/UsersTable'
import {
  AccountBoxOutlined,
  MovingOutlined,
  TimeToLeaveOutlined,
  TrendingDownOutlined,
  MonetizationOnOutlined,
  CheckOutlined,
  NoCrashOutlined
} from '@mui/icons-material'
const Dashboard = () => {
  return (
    <Box width='100%'>
      <Box m='1.5rem 2rem'>
        <Grid container spacing={3} marginTop='5px' marginBottom='2rem'>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                borderRadius: '10px',
                boxShadow: 'rgba(159, 162, 191, 0.18) 0px 9px 16px, rgba(159, 162, 191, 0.32) 0px 2px 2px',
                '& .MuiCardContent-root:last-child': {
                  paddingBottom: '14px'
                },
                background: 'rgb(10,10,10)',
                background: 'linear-gradient(281deg, rgba(10,10,10,1) 0%, rgba(51,51,51,1) 100%)'
              }}
            >
              <CardContent
                sx={{
                  marginLeft: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignContent: 'space-between'
                }}
              >
                <Box display='flex' justifyContent='space-between' alignItems='center'>
                  <Box>
                    <Typography fontSize='0.875rem' lineHeight='1.3' fontWeight='400' color='#ffffff'>
                      NGƯỜI DÙNG
                    </Typography>
                    <Typography fontSize='1.8rem' fontWeight='400' lineHeight='1.6' color='#ffffff'>
                      586,363
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      boxShadow: '0px 2px 9px 0.4px rgba(209,209,209,0.2)',
                      padding: '0.8rem',
                      borderRadius: '10px',
                      color: '#00FF00',
                      backgroundColor: '#ffffff',
                      fontWeight: '500'
                    }}
                  >
                    <AccountBoxOutlined sx={{ fontSize: '1.4rem' }} />
                  </Box>
                </Box>
                <Box display='flex' alignItems='center'>
                  <MovingOutlined sx={{ m: '4px', color: '#00FF00' }} />
                  <Typography color='#ffffff' fontSize='14px'>
                    Tăng 14,5% trong tháng
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                borderRadius: '10px',
                boxShadow: 'rgba(159, 162, 191, 0.18) 0px 9px 16px, rgba(159, 162, 191, 0.32) 0px 2px 2px',
                '& .MuiCardContent-root:last-child': {
                  paddingBottom: '14px'
                },
                background:
                  'linear-gradient(180deg, rgba(63,75,118,1) 0%, rgba(60,78,118,1) 50%, rgba(52,83,118,1) 100%)',
                backkgroud: 'rgb(63,75,118)'
              }}
            >
              <CardContent
                sx={{
                  marginLeft: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignContent: 'space-between'
                }}
              >
                <Box display='flex' justifyContent='space-between' alignItems='center'>
                  <Box>
                    <Typography fontSize='0.875rem' lineHeight='1.3' fontWeight='400' color='#ffffff'>
                      XE
                    </Typography>
                    <Typography fontSize='1.8rem' fontWeight='400' lineHeight='1.6' color='#ffffff'>
                      201
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      boxShadow: '0px 2px 9px 0.4px rgba(209,209,209,0.2)',
                      padding: '0.8rem',
                      borderRadius: '10px',
                      color: '#ffbf5d',
                      backgroundColor: '#ffffff',
                      fontWeight: '500'
                    }}
                  >
                    <TimeToLeaveOutlined sx={{ fontSize: '1.4rem' }} />
                  </Box>
                </Box>
                <Box display='flex' alignItems='center'>
                  <MovingOutlined sx={{ m: '4px', color: '#00FF00' }} />
                  <Typography color='#ffffff'>Tăng 10% trong tháng</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                borderRadius: '10px',
                boxShadow: 'rgba(159, 162, 191, 0.18) 0px 9px 16px, rgba(159, 162, 191, 0.32) 0px 2px 2px',
                '& .MuiCardContent-root:last-child': {
                  paddingBottom: '14px'
                },
                background:
                  'linear-gradient(180deg, rgba(10,177,148,1) 0%, rgba(60,185,116,1) 50%, rgba(146,201,63,1) 100%)',
                backkgroud: 'rgb(10,177,148)'
              }}
            >
              <CardContent
                sx={{
                  marginLeft: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignContent: 'space-between'
                }}
              >
                <Box display='flex' justifyContent='space-between' alignItems='center'>
                  <Box>
                    <Typography fontSize='0.875rem' lineHeight='1.3' fontWeight='400' color='#ffffff'>
                      DOANH THU
                    </Typography>
                    <Typography fontSize='1.8rem' fontWeight='400' lineHeight='1.6' color='#ffffff'>
                      10.000.000đ
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      boxShadow: '0px 2px 9px 0.4px rgba(209,209,209,0.3)',
                      padding: '0.8rem',
                      borderRadius: '10px',
                      color: '#ffffff',
                      backgroundColor: '#ffffff4b',
                      fontWeight: '500'
                    }}
                  >
                    <MonetizationOnOutlined sx={{ fontSize: '1.4rem' }} />
                  </Box>
                </Box>
                <Box display='flex' alignItems='center'>
                  <TrendingDownOutlined sx={{ m: '4px', color: '#ff0000' }} />
                  <Typography color='#ffffff'>Giảm 10% trong tháng</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                borderRadius: '10px',
                boxShadow: 'rgba(159, 162, 191, 0.18) 0px 9px 16px, rgba(159, 162, 191, 0.32) 0px 2px 2px',
                '& .MuiCardContent-root:last-child': {
                  paddingBottom: '14px'
                },
                background:
                  'linear-gradient(140deg, rgba(161,216,255,1) 0%, rgba(85,184,255,1) 51%, rgba(22,158,255,1) 100%)',
                backkgroud: 'rgb(161,216,255)'
              }}
            >
              <CardContent
                sx={{
                  marginLeft: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignContent: 'space-between'
                }}
              >
                <Box display='flex' justifyContent='space-between' alignItems='center'>
                  <Box>
                    <Typography fontSize='0.875rem' lineHeight='1.3' fontWeight='400' color='#ffffff'>
                      DUYỆT XE
                    </Typography>
                    <Typography fontSize='1.8rem' fontWeight='400' lineHeight='1.6' color='#ffffff'>
                      10
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      boxShadow: '0px 2px 9px 0.4px rgba(209,209,209,0.3)',
                      padding: '0.8rem',
                      borderRadius: '10px',
                      color: '#ffffff',
                      backgroundColor: '#ffffff4b',
                      fontWeight: '500'
                    }}
                  >
                    <NoCrashOutlined sx={{ fontSize: '1.4rem' }} />
                  </Box>
                </Box>
                <Box display='flex' alignItems='center'>
                  <CheckOutlined sx={{ m: '4px', color: '#ffffff' }} />
                  <Typography color='#ffffff'>Duyệt</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Box
          sx={{
            marginTop: '10px',
            boxShadow: '0px 2px 9px 0.4px rgba(209,209,209,0.8)',
            overflow: 'auto'
          }}
        >
          <UsersTable />
        </Box>
        <Box mt='1rem' height='10px'></Box>
      </Box>
    </Box>
  )
}

export default Dashboard
