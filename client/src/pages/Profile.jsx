import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import { app } from "../firebase";

export default function Profile() {
  const fileRef = useRef(null);
  const {currentUser} = useSelector((state)=>state.user);
  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  
  

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
 
  

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col">
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
        className="border p-3 rounded-lg mt-2"
        type="text" placeholder="Username" id="username"/>
        <input 
        className="border p-3 rounded-lg mt-2"
        type="email" placeholder="Email" id="email"/>
        <input 
        className="border p-3 rounded-lg mt-2"
        type="text" placeholder="Password" id="password"/>
        <button
        className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 mt-2" 
        >Update</button>
      </form>
      <div className="flex justify-between mt-5">
      <span className="text-red-700 cursor-pointer">Delete Account</span>
      <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  )
}
