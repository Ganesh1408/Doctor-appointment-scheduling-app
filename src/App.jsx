
import './App.css'
import Appointment from './Components/Appointments/Index'

import Home from './Components/Home'
import { BrowserRouter, Route, Routes  } from 'react-router-dom'

function App() {


  return (
    <BrowserRouter>
    <Routes>
    <Route exact path="/" element={<Home/>}/>
    <Route exact path="/appointment/:id" element={<Appointment/>}/>
    </Routes>
    </BrowserRouter>

  
  )
}

export default App
