import React from 'react'
import { BrowserRouter , Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Info from './pages/Info'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/cryptoinfo/' element={<Home/>} />
      <Route path='/cryptoinfo/info/:id' element={<Info/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App