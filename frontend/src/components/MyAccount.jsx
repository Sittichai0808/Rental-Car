import * as React from 'react'
import Input from '@mui/material/Input'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'
import { AiOutlineEdit } from 'react-icons/ai'
import logo from '../assets/logo.png'
import { MdSportsScore } from 'react-icons/md'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import WarningIcon from '@mui/icons-material/Warning'
import LinkIcon from '@mui/icons-material/Link'
import LinkOffIcon from '@mui/icons-material/LinkOff'

const MyAccount = () => {
  return (
    <Box
      sx={{
        flexDirection: 'column',
        display: 'flex',
        paddingLeft: '20px'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'column',
          gridGap: '8px',
          gap: '8px'
        }}
      >
        <Typography
          variant='h5'
          sx={{
            display: 'flex',
            alignItems: 'center',
            gridGap: '8px',
            gap: '8px',
            fontSize: '1.25rem',
            fontWeight: 'bold'
          }}
        >
          Thông tin tài khoản <AiOutlineEdit />
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'baseline',
            position: 'absolute',
            right: '100px',
            padding: '8px 16px',
            gridGap: '4px',
            gap: '4px',
            borderRadius: '8px',
            border: '1px solid #e0e0e0'
          }}
        >
          <Typography
            sx={{
              color: '#5fcf86',
              fontSize: '2rem',
              fontWeight: '800'
            }}
          >
            <AiOutlineEdit />0
          </Typography>
          Chuyến
        </Box>
        <Box
          justifyContent='center'
          alignItems='center'
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gridGap: '16px',
            gap: '16px',
            position: 'relative',
            border: '1px solid #e0e0e0',
            borderRadius: '100%',
            paddingTop: '20px'
          }}
        >
          <img src={logo} alt='' width={150} height={150} />
        </Box>

        <Typography
          variant='h6'
          sx={{
            fontWeight: '600',
            fontSize: '1.25rem',

            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          Thịnh Tsubasa
        </Typography>
        <Typography
          sx={{
            fontWeight: 'bold',
            fontSize: '.75rem',
            fontWeight: '500',
            color: '#666',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          Tham gia : 21/09/2023
        </Typography>
        <Box
          justifyContent='center'
          alignItems='center'
          sx={{
            display: 'flex',

            gridGap: '4px',
            gap: '4px',
            padding: '8px',
            flexWrap: 'wrap',
            border: '1px solid #e0e0e0'
          }}
        >
          <MdSportsScore width={100} height={100} />
          <Typography
            sx={{
              display: 'flex',
              flexDirection: 'column',
              fontWeight: 'bold',
              fontSize: '1rem',
              fontWeight: '800',
              display: 'flex',
              margin: '0px'
            }}
          >
            0 điểm
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              padding: '16px 24px',
              borderRadius: '8px',
              background: '#f6f6f6'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline'
              }}
            >
              <Typography
                sx={{
                  fontWeight: 'bold',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#6f6f6f'
                }}
              >
                Ngày sinh
              </Typography>

              <Typography
                sx={{
                  fontWeight: 'bold',
                  position: 'absolute',
                  right: '100px',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#6f6f6f'
                }}
              >
                ----/----/--------
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                paddingTop: '10px'
              }}
            >
              <Typography
                sx={{
                  fontWeight: 'bold',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#6f6f6f'
                }}
              >
                Giới tính
              </Typography>

              <Typography
                sx={{
                  fontWeight: 'bold',
                  position: 'absolute',
                  right: '100px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#6f6f6f'
                }}
              >
                Nam
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 20px'
              }}
            >
              <Typography
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  fontWeight: 'bold',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#6f6f6f'
                }}
              >
                Số điện thoại
              </Typography>
              <Typography
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  background: '#ffe2bb',
                  padding: '4px 6px',
                  borderRadius: '50px',
                  fontSize: '.625rem',
                  fontWeight: '500',
                  color: '#262626'
                }}
              >
                <WarningIcon /> Xác minh
              </Typography>
              <Typography
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  position: 'absolute',
                  right: '100px',
                  padding: '4px 6px',
                  fontSize: '1.rem',
                  fontWeight: '600',
                  color: '#000'
                }}
              >
                +012345678 <AiOutlineEdit />
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 20px'
              }}
            >
              <Typography
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  fontWeight: 'bold',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#6f6f6f'
                }}
              >
                Email
              </Typography>
              <Typography
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  background: '#cff1db',
                  padding: '4px 6px',
                  borderRadius: '50px',
                  fontSize: '.625rem',
                  fontWeight: '500',
                  color: '#262626'
                }}
              >
                <CheckCircleIcon /> Đã xác thực
              </Typography>
              <Typography
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  position: 'absolute',
                  right: '100px',
                  padding: '4px 6px',
                  fontSize: '1.rem',
                  fontWeight: '600',
                  color: '#000'
                }}
              >
                messithinh12345@gmail.com <AiOutlineEdit />
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 20px'
              }}
            >
              <Typography
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  fontWeight: 'bold',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#6f6f6f'
                }}
              >
                Facebook
              </Typography>

              <Typography
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  position: 'absolute',
                  right: '100px',
                  padding: '4px 6px',
                  fontSize: '1.rem',
                  fontWeight: '600',
                  color: '#000'
                }}
              >
                Thêm liên kết <LinkIcon />
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 20px'
              }}
            >
              <Typography
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  fontWeight: 'bold',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#6f6f6f'
                }}
              >
                Google
              </Typography>

              <Typography
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  position: 'absolute',
                  right: '100px',
                  padding: '4px 6px',
                  fontSize: '1.rem',
                  fontWeight: '600',
                  color: '#000'
                }}
              >
                Thịnh Tsubasa <LinkOffIcon />
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'column',
          paddingTop: '30px '
        }}
      >
        <Typography
          variant='h6'
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            fontSize: '1.25rem',
            fontWeight: 'bold'
          }}
        >
          Giấy phép lái xe
        </Typography>
        <Typography
          sx={{
            display: 'flex',
            alignItems: 'center',
            background: '#cff1db',
            padding: '4px 6px',
            borderRadius: '50px',
            fontSize: '.625rem',
            fontWeight: '500',
            color: '#262626'
          }}
        >
          <CheckCircleIcon /> Đã xác thực
        </Typography>
        <Box
          sx={{
            display: 'flex',
            backgroundColor: 'initial',
            alignItems: 'center',
            position: 'absolute',
            right: '100px',
            padding: '8px 16px',
            borderRadius: '8px',
            border: '1px solid #000',
            padding: '12px 20px'
          }}
        >
          <Typography
            sx={{
              color: '#000',
              fontSize: '.75rem',
              fontWeight: '800'
            }}
          >
            Chỉnh sửa
            <AiOutlineEdit />
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            paddingTop: '30px'
          }}
        >
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'column'
            }}
          >
            <Typography
              variant='h6'
              sx={{
                // color: '#000',
                // fontSize: '1rem',
                // fontWeight: '800'
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                fontSize: '1.25rem',
                fontWeight: 'bold'
              }}
            >
              Thông tin chung
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            width: '100%',
            flexDirection: 'column'
          }}
        ></Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'column',
              padding: '20px'
            }}
          >
            <Typography
              variant='h6'
              sx={{
                color: '#767676',
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                fontSize: '1.25rem',
                fontWeight: 'bold'
              }}
            >
              Số GPLX
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px'
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  paddingLeft: '70px'
                }}
              >
                <TextField disabled id='outlined-disabled' defaultValue='042942940' />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
export default MyAccount
