import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
// import Header from './components/Header'
import RecoverPassword from './pages/RecoverPassword'
import Register1 from './pages/Register1'
import Layout from './pages/admin/Layout'
import Dashboard from './pages/admin/Dashboard'
function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-in' element={<Login />} />

        <Route path='/sign-up' element={<Register />} />
        <Route path='/sign-up-1' element={<Register1 />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/recover-password' element={<RecoverPassword />} />
        <Route element={<Layout />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
