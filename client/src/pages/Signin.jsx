import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { signinStart, signinSuccess, signinFailure } from '../redux/user/userSlice';

export default function Signin() {
  const dispatch = useDispatch()
  const {loading, error} = useSelector((state)=>state.user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signinStart());
      const res = await fetch('http://localhost:8000/api/auth/signin',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(signinFailure(data.message));
        return;
      }
      dispatch(signinSuccess(data));
      navigate("/");
    } catch (error) { 
      dispatch(signinFailure(error.message));
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto ">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form 
      onSubmit={handleSubmit}
      className="flex flex-col gap-4" >
        <input type="text" placeholder="Email" onChange={handleChange}
        className="border p-3 rounded-lg" id="email"
        />
        <input type="text" placeholder="Password" onChange={handleChange}
        className="border p-3 rounded-lg" id="password"
        />
        <button 
        disabled={loading}
        className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >{loading ? 'Loading...' : 'Sign In'}
        </button>
      </form>
      <div className="flex gap-2 mt-3">
        <p>Dont have an account?</p>
        <Link to={"/signup"}>
          <span className='text-blue-700'>Sign Up</span>
        </Link>
      </div>
      { error && <p className='text-red-500 mt-5' >{error}</p>}
    </div>
  )
}



























