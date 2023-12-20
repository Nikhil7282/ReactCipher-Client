import { Route, Routes } from 'react-router-dom'
import './App.css'
import AddPassword from './Pages/AddPassword'
import HomePage from './Pages/HomePage'
import LoginPage from './Pages/LoginPage'
import SignUpPage from './Pages/SignUpPage'
import Navbar from './components/Navbar'
// import axios from 'axios'
const linksArray=["login","SignUp","Home","Random"]
export const  url="http://localhost:8000"
// axios.defaults.baseURL='http://localhost:8000'

function App() {
  return (
    <div className='App'>
      <Navbar links={linksArray}/>
      <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/signUp' element={<SignUpPage/>}/>
      <Route path='/addPassword' element={<AddPassword/>}/>
      </Routes>
    </div>
  )
}

export default App
