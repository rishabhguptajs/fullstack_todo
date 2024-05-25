import './App.css'
import EditPage from './pages/EditPage'
import HomePage from './pages/HomePage'
import NewTask from './pages/NewTask'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/new" element={<NewTask />} />
        <Route path='/edit/:id' element={<EditPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
