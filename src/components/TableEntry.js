import React, { useEffect, useState, useMemo } from "react";
import { db } from "../firebaseconfig";
import {
  getDocs,
  collection,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
// import TableRow from "./TableRow";

import { useTable, useSortBy, useFilters, useGlobalFilter } from "react-table";
import { MdDelete, MdSave, MdEdit } from "react-icons/md";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import "./TableEntry.css";

const TableEntry = () => {
  const [salesrecords, setSalesRecords] = useState([]);

  const salesrecordsCollectionRef = collection(db, "salesrecord");

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
  }, []);

  const data = useMemo(() => salesrecords, [salesrecords]);

  const columns = useMemo(
    () => [
      {
        Header: "Customer name",
        accessor: "customerName",
      },
      {
        Header: "Contact",
        accessor: "Contact",
      },
      {
        Header: "Date",
        accessor: "Date",
      },
      {
        Header: "Item",
        accessor: "Item",
      },
      {
        Header: "Qty",
        accessor: "Qty",
      },
      {
        Header: "Price",
        accessor: "Price",
      },
      {
        Header: "Total amt",
        accessor: "totalAmt",
      },
      {
        Header: "Advance",
        accessor: "Advance",
      },
      {
        Header: "Pending",
        accessor: "Pending",
      },
      {
        Header: "Fully paid",
        accessor: "fullyPaid",
        Cell: ({ value }) => (
          <label
            className={`bg-${
              value ? "green" : "red"
            }-400 text-justify px-1 py-1 rounded-md max-h-1`}
          >
            {value ? "yes" : "no"}
          </label>
        ),
      },
      {
        Header: "Comment",
        accessor: "Comment",
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div className="actions-container">
            <button className="save-button">
              <MdSave />
            </button>
            <button className="edit-button" >
                  <MdEdit />
                </button>
            <button className="" onClick={() => deleteItem(row.original.id)}>
              <MdDelete />
            </button>
          </div>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        hiddenColumns: ["id"],
      },
    },
    useFilters,
    useGlobalFilter,
    useSortBy
  );

  const { filters, globalFilter } = state;

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

  const deleteItem = async (id) => {
    const itemDoc = doc(db, "salesrecord", id);
    await deleteDoc(itemDoc);
  };

  return (
    <>
      <div className="table-container">
        <input
          type="text"
          value={globalFilter || ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search"
          className="p-2 mb-4 w-64 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <table className="w-full mt-5 mr-5 ml-2" {...getTableProps()}>
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    className="p-3 text-sm font-semibold tracking-wide text-left"
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <FiArrowDown />
                        ) : (
                          <FiArrowUp />
                        )
                      ) : (
                        ""
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td
                      className="p-3 text-sm font-normal tracking-wide text-left"
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableEntry;
