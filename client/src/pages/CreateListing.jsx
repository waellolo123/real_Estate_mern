
export default function CreateListing() {
  return (
    <main className="p-3 max-w-4xl mx-auto">
     <h1 className="text-3xl font-semibold text-center my-7">Create a Listing</h1>
     <form className="flex flex-col sm:flex-row gap-5">
      <div className="flex flex-col gap-4 flex-1">
        <input className="border p-3 rounded-lg"
        type="text" name="" id="name" placeholder="Name" maxLength="62" minLength="10" required/>
        <textarea className="border p-3 rounded-lg"
        type="text" name="" id="description" placeholder="Description" required></textarea>
        <input className="border p-3 rounded-lg"
        type="text" name="" id="address" placeholder="Address" required/>
        <div className="flex gap-6 flex-wrap items-center justify-around">
          <div className="flex gap-2">
           <input type="checkbox" id="sale" className="w-5"/>
           <span className="text-slate-700 font-semibold">Sell</span>
          </div>
          <div className="flex gap-2">
           <input type="checkbox" id="rent" className="w-5"/>
           <span className="text-slate-700 font-semibold">Rent</span>
          </div>
          <div className="flex gap-2">
           <input type="checkbox" id="parking" className="w-5"/>
           <span className="text-slate-700 font-semibold">Parking Spot</span>
          </div>
          <div className="flex gap-2">
           <input type="checkbox" id="furnished" className="w-5"/>
           <span className="text-slate-700 font-semibold">Furnished</span>
          </div>
          <div className="flex gap-2">
           <input type="checkbox" id="offer" className="w-5"/>
           <span className="text-slate-700 font-semibold">Offer</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-2">
            <input 
            className="p-3 border border-gray-300 rounded-lg"
            type="number" id="bedrooms" min='1' max='10' required/>
            <p>Beds</p>
          </div>
          <div className="flex items-center gap-2">
            <input 
            className="p-3 border border-gray-300 rounded-lg"
            type="number" id="bathrooms" min='1' max='10' required/>
            <p>Baths</p>
          </div>
          <div className="flex items-center gap-2">
            <input 
            className="p-3 border border-gray-300 rounded-lg"
            type="number" id="regularPrice" min='1' max='10' required/>
            <div className="flex flex-col items-center">
             <p>Regular Price</p>
             <span className="text-xs">($ / month)</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input 
            className="p-3 border border-gray-300 rounded-lg"
            type="number" id="disountPrice" min='1' max='10' required/>
            <div className="flex flex-col items-center">
             <p>Discount Price</p>
             <span className="text-xs">($ / month)</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1">
        <p className="font-semibold">Images: 
         <span className="font-normal text-gray-600 ml-2">the firs image witll be the cover (max 6)</span>
        </p>
        <div className="flex gap-4">
          <input 
          className="p-3 border border-gray-300 rounded w-full"
          type="file" id="images" accept="images/*" multiple/>
          <button className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80">Upload</button>
        </div>
        <button className="p-3 bg-slate-700 text-white rounded-lg mt-3 hover:opacity-80">Create Listing</button>
      </div>
     </form>

    </main>
  )
}
