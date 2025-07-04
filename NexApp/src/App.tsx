
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Meetform } from './pages/meetform'
import { Landing } from './pages/landing'
import { HMeeting } from './pages/host'
import { PMeeting } from './pages/participant'

import { CreateRoom } from './pages/createroom'
import { Auth } from './pages/auth'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/join' element={<Meetform />} />
        <Route path='/room/host' element={<HMeeting />} />
        <Route path='/room/participant' element={<PMeeting />} />
        <Route path='/room/create' element={<CreateRoom />} />



      </Routes>
    </BrowserRouter>
  )
}

export default App
