import { useState } from 'react'
import './App.css'
import axios from 'axios'
import toast,{Toaster} from 'react-hot-toast'
export const url='http://localhost:8000'

function App() {
  const [userDetails,setUserDetails]=useState({password:"",title:""})

  const handleChange=(e)=>{
    const {name,value}=e.target
    setUserDetails({...userDetails,[name]:value})
  }

  const handleSubmit=()=>{
    axios.post(`${url}/passwords/addPassword`,userDetails)
    .then((res)=>{
      console.log(res.data);
      toast.success('Password Added')
    })
    .catch((error)=>{
      console.log(error);
    })
  }
  
  return (
    <div className='App'>
      <div className="AddingPassword">
        <input type="text" name='password' placeholder='Password...' onChange={handleChange}/>
        <input type="text" name='title' placeholder='Title..' onChange={handleChange}/>
        <button onClick={handleSubmit}>Add Password</button>
        <Toaster/>
      </div>
    </div>
  )
}

export default App
