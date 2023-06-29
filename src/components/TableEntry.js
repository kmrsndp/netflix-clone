import React from "react";

const TableEntry = () => {
  return (
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
          <tr>
            <td className="p-3 text-sm text-gray-700">
                wad
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableEntry;
