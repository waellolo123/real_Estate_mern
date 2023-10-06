
import './App.css'
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Profile from './pages/Profile';
import About from './pages/About';

function App() {


  return (
    <>
    <Routes>
     <Route path='/' element={<Home />} />
     <Route path='/about' element={<About />} />
     <Route path='/profile' element={<Profile />} />
     <Route path='/signin' element={<Signin />} />
     <Route path='/signup' element={<Signup />} />
     
    </Routes>
    </>
  )
}

export default App
