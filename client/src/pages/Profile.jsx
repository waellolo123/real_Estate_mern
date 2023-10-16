import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import { app } from "../firebase";
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, signoutUserFailure, signoutUserStart, signoutUserSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from "../redux/user/userSlice";
import {Link, useNavigate} from 'react-router-dom';


export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const {currentUser, loading, error} = useSelector((state)=>state.user);
  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({})
  const [updateSuccess, setUpdateSuccess] = useState(false); 

  useEffect(()=>{
   if(file){
    handleFileUpload(file);
   }
  },[file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred /
          snapshot.totalBytes) * 100;
          setFilePercentage(Math.round(progress));
      },
     (error) => {
      setFileUploadError(true);
      console.log(error);
     },
     ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>
      setFormData({...formData, avatar: downloadURL})
      )}
    )
  }
 
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`http://localhost:8000/api/users/update/${currentUser._id}`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  }
  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`http://localhost:8000/api/users/delete/${currentUser._id}`,{
        method: 'DELETE',
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      navigate("/signin");
    } catch (error) {
     dispatch(deleteUserFailure(error.message));
    }
  }
  const handleSignout = async () => {
    try {
      dispatch(signoutUserStart());
      const res = await fetch('http://localhost:8000/api/auth/signout');
      const data = await res.json();
      if(data.success === false){
        dispatch(signoutUserFailure(data.message));
        return;
      }
      dispatch(signoutUserSuccess(data));
    } catch (error) {
      dispatch(signoutUserFailure(data.message));
    }
  }
  
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <input type="file" ref={fileRef} hidden accept="image/*" onChange={(e)=>setFile(e.target.files[0])}/>
        <img
        className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'  
        src={formData.avatar || currentUser.avatar} alt="" onClick={()=>fileRef.current.click()}/>
        <p className="text-sm text-center mt-2">
          {fileUploadError ? (
            <span className="text-red-700">Error Image Upload(image must be less than 2mb)</span>
          ) : filePercentage > 0 && filePercentage < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePercentage}`}</span>
          ) : filePercentage === 100 ? (
            <span className="text-green-700">Image successfully uploaded</span>
          ) : (
            ""
          )
        }
        </p>
        <input 
        defaultValue={currentUser.username}  onChange={handleChange}
        className="border p-3 rounded-lg mt-2"
        type="text" placeholder="Username" id="username"/>
        <input 
        defaultValue={currentUser.email} onChange={handleChange}
        className="border p-3 rounded-lg mt-2"
        type="email" placeholder="Email" id="email"/>
        <input 
        className="border p-3 rounded-lg mt-2" onChange={handleChange}
        type="text" placeholder="Password" id="password"/>
        <button
        className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 mt-2"
        disabled={loading} 
        >
        {loading ? 'Loading...' : 'Update'}</button>
        <Link
        className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95 mt-3" 
        to={"/create-listing"}>Create Listing</Link>
      </form>
      <div className="flex justify-between mt-5">
      <span className="text-red-700 cursor-pointer" onClick={handleDelete}>Delete Account</span>
      <span className="text-red-700 cursor-pointer" onClick={handleSignout}>Sign Out</span>
      </div>
      {/* <p className="text-red-500 text-center mt-5">{error ? error : ""}</p> */}
      <p className="text-green-700 mt-5">{updateSuccess ? 'User updated successfully' : ""}</p>
    </div>
  )
}



