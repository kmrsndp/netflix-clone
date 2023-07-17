import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebaseconfig";
import "./TableEntry.css";

const AddRowForm = ({ onAddRow }) => {
  const [formData, setFormData] = useState({
    customerName: "",
    Contact: "",
    Date: "",
    Item: "",
    Qty: "",
    Price: "",
    totalAmt: "",
    Advance: "",
    Pending: "",
    fullyPaid: "",
    Comment: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if mandatory fields are filled
    if (!formData.customerName || !formData.Item || !formData.Qty || !formData.Price || !formData.totalAmt) {
      alert("Please fill in all mandatory fields.");
      return;
    }

    // Save the data to the database
    try {
      const salesrecordsCollectionRef = collection(db, "salesrecord");
      await addDoc(salesrecordsCollectionRef, formData);
      onAddRow(formData); // Pass the new row data back to the parent component
      setFormData({
        customerName: "",
        Contact: "",
        Date: "",
        Item: "",
        Qty: "",
        Price: "",
        totalAmt: "",
        Advance: "",
        Pending: "",
        fullyPaid: "",
        Comment: "",
      });
    } catch (error) {
      console.error("Error adding row:", error);
    }
  };

  return (
    <form className="add-row-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="customerName">Customer Name*</label>
        <input
          type="text"
          id="customerName"
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="Contact">Contact</label>
        <input type="text" id="Contact" name="Contact" value={formData.Contact} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="Date">Date</label>
        <input type="text" id="Date" name="Date" value={formData.Date} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="Item">Item*</label>
        <input type="text" id="Item" name="Item" value={formData.Item} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="Qty">Qty*</label>
        <input type="text" id="Qty" name="Qty" value={formData.Qty} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="Price">Price*</label>
        <input type="text" id="Price" name="Price" value={formData.Price} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="totalAmt">Total Amount*</label>
        <input
          type="text"
          id="totalAmt"
          name="totalAmt"
          value={formData.totalAmt}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="Advance">Advance</label>
        <input type="text" id="Advance" name="Advance" value={formData.Advance} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="Pending">Pending</label>
        <input type="text" id="Pending" name="Pending" value={formData.Pending} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="fullyPaid">Fully Paid</label>
        <input type="text" id="fullyPaid" name="fullyPaid" value={formData.fullyPaid} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="Comment">Comment</label>
        <input type="text" id="Comment" name="Comment" value={formData.Comment} onChange={handleChange} />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default AddRowForm;
