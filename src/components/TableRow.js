import React from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseconfig";
import { MdDelete } from "react-icons/md";

const TableRow = ({ item }) => {
  const deleteItem = async (id) => {
    const itemDoc = doc(db, "salesrecord", id);
    await deleteDoc(itemDoc);
  };

  return (
    <tr className="">
      <td className="p-3 text-sm font-normal tracking-wide text-left">
        {item.customerName}
      </td>
      <td className="p-3 text-sm font-normal tracking-wide text-left">
        {item.Contact}
      </td>
      <td className="p-3 text-sm font-normal tracking-wide text-left">
        {item.Date}
      </td>
      <td className="p-3 text-sm font-normal tracking-wide text-left">
        {item.Item}
      </td>
      <td className="p-3 text-sm font-normal tracking-wide text-left">
        {item.Qty}
      </td>
      <td className="p-3 text-sm font-normal tracking-wide text-left">
        {item.Price}
      </td>
      <td className="p-3 text-sm font-normal tracking-wide text-left">
        {item.totalAmt}
      </td>
      <td className="p-3 text-sm font-normal tracking-wide text-left">
        {item.Advance}
      </td>
      <td className="p-3 text-sm font-normal tracking-wide text-left">
        {item.Pending}
      </td>
      <td className="p-3 text-sm font-normal tracking-wide text-left">
        {!item.fullyPaid && (
          <label className="bg-red-400 text-justify px-1 py-1 rounded-md max-h-1">
            no
          </label>
        )}
        {item.fullyPaid && (
          <label className="bg-green-400 text-justify px-1 py-1 rounded-md max-h-1">
            yes
          </label>
        )}
      </td>
      <td className="p-3 text-sm font-normal tracking-wide text-left">
        {item.Comment}
      </td>
      <td>
        <button className="" onClick={() => deleteItem(item.id)}>
          <MdDelete ></MdDelete>
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
