import { Box, Button } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google'
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'
import { app } from '../firebase.js'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function OAuthGoogle() {
  const navigate = useNavigate()
  const handleGoogleAuthClick = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const auth = getAuth(app)

      const result = await signInWithPopup(auth, provider)
      console.log(result)
      const res = await axios.post(
        'http://localhost:4000/users/google',

        {
          username: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      )
      // const res = await fetch('/api/auth/google', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     name: result.user.displayName,
      //     email: result.user.email,
      //     photo: result.user.photoURL,
      //   }),
      // });

      navigate('/')
    } catch (error) {
      console.log("couldn't not login with google", error)
    }
  }
  return (
    <>
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
        onClick={handleGoogleAuthClick}
        // startIcon={<GoogleIcon />}
      >
        <GoogleIcon sx={{ position: 'absolute', left: '15px' }} />
        Sign up with Google
      </Button>
    </>
  )
}

export default OAuthGoogle
