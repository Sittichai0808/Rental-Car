import * as React from 'react'
import Input from '@mui/material/Input'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'
import { AiOutlineEdit } from 'react-icons/ai'
import logo from '../assets/logo.png'
import thinh from '../assets/thinh.png'
import { MdSportsScore } from 'react-icons/md'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import WarningIcon from '@mui/icons-material/Warning'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import LinkIcon from '@mui/icons-material/Link'
import LinkOffIcon from '@mui/icons-material/LinkOff'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import Button from '@mui/material/Button'
import TabPanel from '@mui/lab/TabPanel'
import DialogTitle from '@mui/material/DialogTitle'
import Modal from '@mui/material/Modal'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

import { FormControl, FormLabel } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

const sex = [
  {
    value: 'Male',
    label: 'Nam'
  },
  {
    value: 'Female',
    label: 'Nữ'
  }
]

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 500,
  border: '1px solid #e0e0e0',
  fontSize: '1.25rem',
  fontWeight: '800',

  color: '#000',
  padding: '10px',
  bgcolor: 'background.paper',

  boxShadow: 24,
  p: 4
}
const MyAccount = () => {
  const [value, setValue] = React.useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
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
          flexDirection: 'column'
        }}
      >
        <Typography
          variant='h5'
          sx={{
            display: 'flex',
            alignItems: 'center',

            fontSize: '1.25rem',
            fontWeight: 'bold'
          }}
        >
          Thông tin tài khoản
          <Button onClick={handleOpen}>
            <AiOutlineEdit />
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={style}>
              <Typography
                id='modal-modal-title'
                variant='h5'
                component='h2'
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  fontWeight: '700'
                }}
              >
                Cập nhật thông tin
              </Typography>
              <FormControl sx={{ width: '100%', display: 'flex', flexDirection: 'column' }} variant='outlined'>
                <FormLabel
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '.875rem',
                    fontWeight: '700',
                    color: '#767676',
                    padding: '5px'
                  }}
                >
                  Tên tài khoản
                </FormLabel>
                <TextField id='outlined-size-normal' defaultValue='Thịnh Tsubasa' sx={{ paddingBottom: '20px' }} />
                <FormLabel
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '.875rem',
                    fontWeight: '700',
                    color: '#767676'
                  }}
                >
                  Ngày sinh
                </FormLabel>
                <TextField
                  id='outlined-size-normal'
                  defaultValue='01-01-1950'
                  sx={{
                    paddingBottom: '20px'
                  }}
                />
                <FormLabel
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '.875rem',
                    fontWeight: '700',
                    color: '#767676'
                  }}
                >
                  Giới tính
                </FormLabel>

                <Select labelId='demo-simple-select-helper-label' id='demo-simple-select-helper' defaultValue='Male'>
                  {' '}
                  {sex.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>

                <Button
                  variant='contained'
                  sx={{
                    marginTop: '20px',
                    padding: '16px 24px',
                    color: '#fff',
                    fontWeight: '700'
                  }}
                >
                  Cập nhật
                </Button>
              </FormControl>
            </Box>
          </Modal>
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'baseline',
            position: 'absolute',
            right: '100px',
            padding: '8px 16px',

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
                <svg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M11 6C11 8.76142 8.76142 11 6 11C3.23858 11 1 8.76142 1 6C1 3.23858 3.23858 1 6 1C8.76142 1 11 3.23858 11 6ZM6 3.58499C6.20711 3.58499 6.375 3.75288 6.375 3.95999V6.28999C6.375 6.4971 6.20711 6.66499 6 6.66499C5.79289 6.66499 5.625 6.4971 5.625 6.28999V3.95999C5.625 3.75288 5.79289 3.58499 6 3.58499ZM6 8.03998C6.20711 8.03998 6.375 7.87208 6.375 7.66498C6.375 7.45787 6.20711 7.28998 6 7.28998C5.79289 7.28998 5.625 7.45787 5.625 7.66498C5.625 7.87208 5.79289 8.03998 6 8.03998Z'
                    fill='#F79009'
                  ></path>
                </svg>{' '}
                Xác minh
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
                <svg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M6 1C3.245 1 1 3.245 1 6C1 8.755 3.245 11 6 11C8.755 11 11 8.755 11 6C11 3.245 8.755 1 6 1ZM7.795 5.295L6.035 7.055C5.96 7.13 5.865 7.165 5.77 7.165C5.675 7.165 5.575 7.13 5.505 7.055L4.625 6.175C4.475 6.03 4.475 5.79 4.625 5.645C4.77 5.5 5.01 5.5 5.155 5.645L5.77 6.26L7.265 4.765C7.41 4.62 7.645 4.62 7.795 4.765C7.94 4.91 7.94 5.15 7.795 5.295Z'
                    fill='#12B76A'
                  ></path>
                </svg>{' '}
                Đã xác thực
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
          <svg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M6 1C3.245 1 1 3.245 1 6C1 8.755 3.245 11 6 11C8.755 11 11 8.755 11 6C11 3.245 8.755 1 6 1ZM7.795 5.295L6.035 7.055C5.96 7.13 5.865 7.165 5.77 7.165C5.675 7.165 5.575 7.13 5.505 7.055L4.625 6.175C4.475 6.03 4.475 5.79 4.625 5.645C4.77 5.5 5.01 5.5 5.155 5.645L5.77 6.26L7.265 4.765C7.41 4.62 7.645 4.62 7.795 4.765C7.94 4.91 7.94 5.15 7.795 5.295Z'
              fill='#12B76A'
            ></path>
          </svg>{' '}
          Đã xác thực
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
                color: '#000',
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                fontSize: '1.25rem',
                fontWeight: 'bold'
              }}
            >
              Thông tin chung
            </Typography>

            <Typography
              variant='h6'
              sx={{
                position: 'absolute',
                right: '100px',
                color: '#000',
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                fontSize: '1.25rem',
                fontWeight: 'bold'
              }}
            >
              Hình ảnh
            </Typography>
            <Box
              sx={{
                position: 'absolute',
                right: '100px',
                paddingTop: '50px'
              }}
            >
              <img src={thinh} width={200} height={200} />
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
                Họ và tên
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
                  <TextField disabled id='outlined-disabled' defaultValue='Nguyễn Ngọc Ngạn' />
                </Box>
              </Box>
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
                Ngày sinh
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
                  <TextField disabled id='outlined-disabled' defaultValue='01-01-2000' />
                </Box>
              </Box>
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
            fontSize: '1.25rem',
            fontWeight: 'bold'
          }}
        >
          Giới thiệu bạn mới
        </Typography>
        <Typography
          variant='p'
          sx={{
            display: 'flex',
            fontSize: '.65rem',
            fontWeight: '500',
            color: '#666'
          }}
        >
          Tìm hiểu chi tiết chương trình
          <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <g clip-path='url(#clip0_2164_37736)'>
              <path
                d='M8.00065 14.6673C11.6825 14.6673 14.6673 11.6825 14.6673 8.00065C14.6673 4.31875 11.6825 1.33398 8.00065 1.33398C4.31875 1.33398 1.33398 4.31875 1.33398 8.00065C1.33398 11.6825 4.31875 14.6673 8.00065 14.6673Z'
                stroke='black'
                stroke-linecap='round'
                stroke-linejoin='round'
              ></path>
              <path
                d='M6.06055 6.00038C6.21728 5.55483 6.52665 5.17912 6.93385 4.9398C7.34105 4.70049 7.81981 4.61301 8.28533 4.69285C8.75085 4.7727 9.17309 5.01473 9.47726 5.37607C9.78144 5.7374 9.94792 6.19473 9.94721 6.66705C9.94721 8.00038 7.94721 8.66705 7.94721 8.66705'
                stroke='black'
                stroke-linecap='round'
                stroke-linejoin='round'
              ></path>
              <path d='M8 11.334H8.00667' stroke='black' stroke-linecap='round' stroke-linejoin='round'></path>
            </g>
            <defs>
              <clipPath id='clip0_2164_37736'>
                <rect width='16' height='16' fill='white'></rect>
              </clipPath>
            </defs>
          </svg>
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
              color: '#000',
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              fontSize: '1.25rem',
              fontWeight: 'bold'
            }}
          >
            Thẻ của tôi
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
              Thêm thẻ
            </Typography>
            <AddCircleOutlineIcon />
          </Box>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              left: '70px'
            }}
          >
            <img src='https://www.mioto.vn/static/media/my-card.c94c4868.svg' alt='' width={300} />
            <Typography
              sx={{
                color: '#6f6f6f',
                fontSize: '1.25rem',
                fontWeight: '600',
                textAlign: 'center'
              }}
            >
              Bạn chưa có thẻ nào
            </Typography>
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
          variant='h5'
          sx={{
            color: '#000',
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            fontSize: '1.25rem',
            fontWeight: 'bold'
          }}
        >
          Danh sách xe
          <Box
            sx={{
              display: 'flex',
              position: 'absolute',
              width: '250px',
              typography: 'body1',
              right: '50px'
            }}
          >
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label='lab API tabs example'>
                  <Tab
                    label='Có tài xế'
                    value='1'
                    sx={{
                      color: '#000',
                      fontWeight: '600'
                    }}
                  />
                  <Tab
                    label='Tự lái'
                    value='2'
                    sx={{
                      color: '#000',
                      fontWeight: '600'
                    }}
                  />
                </TabList>
              </Box>
            </TabContext>
          </Box>
        </Typography>
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'column',
          paddingTop: '30px ',
          position: 'relative',
          left: '90px'
        }}
      >
        <img src='https://www.mioto.vn/static/media/empty-mycar.e023e681.svg' alt=''></img>
        <Typography
          sx={{
            color: '#6f6f6f',
            fontSize: '1.25rem',
            fontWeight: '600',
            textAlign: 'center'
          }}
        >
          Không tìm thấy xe nào
        </Typography>
      </Box>
    </Box>
  )
}
export default MyAccount
