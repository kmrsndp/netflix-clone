import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebaseconfig";
import { useNavigate } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore";
import TableRow from "./TableRow";

const TableEntry = () => {
  const navigate = useNavigate();

  const [salesrecords, setSalesRecords] = useState([]);

  const salesrecordsCollectionRef = collection(db, "salesrecord");

  //eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const getSalesrecords = async () => {
      try {
        const data = await getDocs(salesrecordsCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        
        setSalesRecords(filteredData);
        // console.log(filteredData);
      } catch (err) {
        console.error(err);
      }
    };

    getSalesrecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
    navigate("/login");
  };

  return (
    <>
      <div className="items-end">
        <button className="bg-red-800 mt-3" onClick={handleLogOut}>
          Logout
        </button>
      </div>

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
