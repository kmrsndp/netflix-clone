import React, { useEffect, useState } from "react";
import { db } from "../firebaseconfig";
import { getDocs, collection, addDoc } from "firebase/firestore";
import TableRow from "./TableRow";

const TableEntry = () => {
  const [salesrecords, setSalesRecords] = useState([]);

  const [addSaleData, setAddSaleData] = useState({
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

  const salesrecordsCollectionRef = collection(db, "salesrecord");

  useEffect(() => {
    const getSalesrecords = async () => {
      try {
        const data = await getDocs(salesrecordsCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setSalesRecords(filteredData);
      } catch (err) {
        console.error(err);
      }
    };

    getSalesrecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addSaleData]);

  let name, value;
  const handleChange = (event) => {
    name = event.target.name;
    value = event.target.value;

    setAddSaleData({ ...addSaleData, [name]: value });
  };

  const handleAddItem = async () => {
    await addDoc(salesrecordsCollectionRef, addSaleData);
    setAddSaleData({
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
  };

  return (
    <>
      <div>
        <table className="w-full mt-5 mr-5 ml-2">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Customer name
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Contact
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Date
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Item
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Qty
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Price
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Total amt
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Advance
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Pending
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Fully paid
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Comment
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="drop-shadow-md">
              <td>
                <input
                  className="p-3 text-sm font-normal tracking-wide text-left bg-slate-200 w-4/6 mt-3 h-9"
                  onChange={handleChange}
                  name="customerName"
                  id=""
                  value={addSaleData.customerName}
                ></input>
              </td>
              <td>
                <input
                  className="p-3 text-sm font-normal tracking-wide text-left bg-slate-200 w-4/6 mt-3 h-9"
                  onChange={handleChange}
                  name="Contact"
                  id=""
                  value={addSaleData.Contact}
                ></input>
              </td>
              <td>
                <input
                  className="p-3 text-sm font-normal tracking-wide text-left bg-slate-200 w-4/6 mt-3 h-9"
                  onChange={handleChange}
                  name="Date"
                  id=""
                  value={addSaleData.Date}
                ></input>
              </td>
              <td>
                <input
                  className="p-3 text-sm font-normal tracking-wide text-left bg-slate-200 w-4/6 mt-3 h-9"
                  onChange={handleChange}
                  name="Item"
                  id=""
                  value={addSaleData.Item}
                ></input>
              </td>
              <td>
                <input
                  className="p-3 text-sm font-normal tracking-wide text-left bg-slate-200 w-4/6 mt-3 h-9"
                  onChange={handleChange}
                  name="Qty"
                  id=""
                  value={addSaleData.Qty}
                ></input>
              </td>
              <td>
                <input
                  className="p-3 text-sm font-normal tracking-wide text-left bg-slate-200 w-4/6 mt-3 h-9"
                  onChange={handleChange}
                  name="Price"
                  id=""
                  value={addSaleData.Price}
                ></input>
              </td>
              <td>
                <input
                  className="p-3 text-sm font-normal tracking-wide text-left bg-slate-200 w-4/6 mt-3 h-9"
                  onChange={handleChange}
                  name="totalAmt"
                  id=""
                  value={addSaleData.totalAmt}
                ></input>
              </td>
              <td>
                <input
                  className="p-3 text-sm font-normal tracking-wide text-left bg-slate-200 w-4/6 mt-3 h-9"
                  onChange={handleChange}
                  name="Advance"
                  id=""
                  value={addSaleData.Advance}
                ></input>
              </td>
              <td>
                <input
                  className="p-3 text-sm font-normal tracking-wide text-left bg-slate-200 w-4/6 mt-3 h-9"
                  onChange={handleChange}
                  name="Pending"
                  id=""
                  value={addSaleData.Pending}
                ></input>
              </td>
              <td className="flex items-center justify-center">
                <input
                  type="checkbox"
                  className="w-4 bg-slate-50 accent-slate-300"
                  onChange={handleChange}
                  name="fullyPaid"
                  id=""
                  value={addSaleData.fullyPaid}
                ></input>
              </td>
              <td>
                <input
                  className="p-3 text-sm font-normal tracking-wide text-left bg-slate-200 w-4/6 mt-3 h-9"
                  onChange={handleChange}
                  name="Comment"
                  id=""
                  value={addSaleData.Comment}
                ></input>
              </td>
              <td>
                <button className="button-success mt-3 mr-4 " onClick={handleAddItem}>
                  Add
                </button>
              </td>
            </tr>

            {salesrecords.map((item) => (
              <TableRow key={item.id} item={item} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableEntry;
