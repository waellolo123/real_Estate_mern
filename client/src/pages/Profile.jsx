import { useSelector } from "react-redux";

export default function Profile() {
  const {currentUser} = useSelector((state)=>state.user);

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col">
        <img
        className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'  
        src={currentUser.avatar} alt="" />
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
