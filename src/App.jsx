import Login from './pages/Login'
import Header from './components/Header';
import PetFeederApp from './pages/PetFeederApp'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { UserProvider } from "./context/UserContext";

const App = () => {
  return (
    <div className='h-screen flex flex-col'>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/dashboard' element={<><Header></Header><PetFeederApp /></>} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  )
}


export default App