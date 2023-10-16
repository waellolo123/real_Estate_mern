
import './App.css'
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Profile from './pages/Profile';
import About from './pages/About';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import CreateListing from './pages/CreateListing';

function App() {


  return (
    <>
    <Header />
    <Routes>
     <Route path='/' element={<Home />} />
     <Route path='/about' element={<About />} />
     <Route element={<PrivateRoute />}>
      <Route path='/profile' element={<Profile />} />
      <Route path='/create-listing' element={<CreateListing />} />
     </Route>
     <Route path='/signin' element={<Signin />} />
     <Route path='/signup' element={<Signup />} />
     
    </Routes>
    </>
  )
}

export default App
