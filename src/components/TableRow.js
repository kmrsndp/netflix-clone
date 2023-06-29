import React from "react";

const TableRow = ({ item }) => {
  console.log("record id: " + item);

  return (
    <tr className="">
      <td className="p-3 text-sm font-normal tracking-wide text-left">{item.customerName}</td>
       <td className="p-3 text-sm font-normal tracking-wide text-left">{item.Contact}</td>
       <td className="p-3 text-sm font-normal tracking-wide text-left">{item.Date.seconds}</td>
       <td className="p-3 text-sm font-normal tracking-wide text-left">{item.Item}</td>
       <td className="p-3 text-sm font-normal tracking-wide text-left">{item.Qty}</td>
       <td className="p-3 text-sm font-normal tracking-wide text-left">{item.Price}</td>
       <td className="p-3 text-sm font-normal tracking-wide text-left">{item.totalAmt}</td>
       <td className="p-3 text-sm font-normal tracking-wide text-left">{item.Advance}</td>
       <td className="p-3 text-sm font-normal tracking-wide text-left">{item.Pending}</td>
       <td className="p-3 text-sm font-normal tracking-wide text-left">
        {!item.fullyPaid && <label className="bg-red-400 text-justify px-1 py-1 rounded-md max-h-1">not paid</label>}
        {item.fullyPaid && <label className="bg-green-400 text-justify px-1 py-1 rounded-md max-h-1">paid</label>}
      </td>
       <td className="p-3 text-sm font-normal tracking-wide text-left">{item.Comment}</td>
    </tr>
  );
};

export default TableRow;
