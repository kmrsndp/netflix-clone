import React, { useState } from "react";

const AddItem = () => {


    const [addItemForm, setAddItemForm] = useState(false)

    const handleAddItemClick = () => {
        setAddItemForm(!addItemForm)
        console.log('add item clicked');
    }


  return (
    <div>
      <button
      onClick={handleAddItemClick}
        className="rounded-md bg-slate-300 mt-10 w-auto px-2 h-8 
      items-center shadow-xl mx-6  hover:bg-slate-500"
      >
        Add Item
      </button>

        {!addItemForm && (
      <div className="container border-b-2 my-4 mx-6 w-80 border shadow-inner block">
        <label className="text-lg mx-4">item type</label>
        <input type='drop-down' className="border shadow my-2 mx-4 bg-slate-50 block"></input>
        <label className="text-lg mx-4">qty</label>
        <input type='text' className="border shadow my-2 mx-4 bg-slate-50 block"></input>
        <label className="text-lg mx-4 block">size</label>
        <div>
        <input type='text' className="border shadow my-2 mx-4 bg-slate-50 w-28"></input>
        <input type='checkbox' className="border shadow my-2 bg-slate-50 accent-slate-300"></input>
        <label className="text-xs ml-1 mr-2">mm</label>
        <input type='checkbox' className="border shadow my-2  bg-slate-50  accent-slate-300"></input>
        <label className="text-xs ml-1 mr-2">cm</label>
        <input type='checkbox' className="border shadow  bg-slate-50  accent-slate-300"></input>
        <label className="text-xs ml-1">in</label>
        </div>
        <button className="text-md mx-4 border shadow my-2 w-auto px-1 rounded-md bg-green-200 hover:bg-green-300">submit</button>




      </div>
        )}
    </div>
  );
};

export default AddItem;
