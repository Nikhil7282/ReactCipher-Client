import { useState } from 'react'
import './App.css'

function App() {
  const [userDetails,setUserDetails]=useState({password:"",title:""})

  const handleChange=(e)=>{
    const {name,value}=e.target
    setUserDetails({...userDetails,[name]:value})
  }

  const handleSubmit=()=>{
    console.log(userDetails);
  }
  return (
    <div className='App'>
      <div className='AddingPassword'>
        <input type='text' placeholder='Password...' name='password' onChange={handleChange}/>
        <input type='text' placeholder='Title...' name='title' onChange={handleChange}/>
        <button onClick={handleSubmit}>Add Password</button>
      </div>
    </div>
  )
}

export default App
