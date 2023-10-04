import axios from 'axios'
import { signInFailure, signInSuccess, signInStart } from '../redux/user/userSlice'
import { useDispatch } from 'react-redux'

/** register user function */
export async function registerUser(credentials) {
  try {
    // dispatch(signInStart())
    const res = await axios.post(
      'http://localhost:4000/users/register',

      credentials,
      {
        headers: { 'Content-Type': 'application/json' }
      }
    )
    console.log(res)

    // return Promise.resolve(dispatch(signInSuccess(res)))
  } catch (error) {
    console.log(error)
    // return Promise.reject(dispatch(signInFailure(error)))
  }
}

export async function loginUser(credentials) {
  try {
    const res = await axios.post(
      'http://localhost:4000/users/login',

      credentials,
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      }
    )
    console.log(res)
    return Promise.resolve(res)
  } catch (error) {
    console.log(error)
    return Promise.reject(error.response.data)
  }
}
