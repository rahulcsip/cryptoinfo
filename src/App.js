import React from 'react'
import { BrowserRouter , Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Info from './pages/Info'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/cryptoinfo/' element={<Home/>} />
      <Route path='/cryptoinfo/info/:id' element={<Info/>} />
      <Route path='*' element={<NotFound/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App