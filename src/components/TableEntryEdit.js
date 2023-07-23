import React, { useEffect, useState, useMemo } from "react";
import { db } from "../firebaseconfig";
import {
  getDocs,
  collection,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useTable, useSortBy, useFilters, useGlobalFilter } from "react-table";
import { MdDelete, MdSave } from "react-icons/md";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import AddRowForm from "./AddRowForm";

import "./TableEntry.css";

const TableEntryEdit = () => {
  const [salesrecords, setSalesRecords] = useState([]);
  const [editableRowIndex, setEditableRowIndex] = useState(null);
  const [editableRowData, setEditableRowData] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

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

  const handleAddRow = () => {
    setShowAddForm(true);
  };

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
        Cell: ({ row, rowIndex }) => (
          <div className="actions-container">
            {editableRowIndex === rowIndex ? (
              <button className="save-button" onClick={() => handleSave(row)}>
                <MdSave />
              </button>
            ) : (
              <>
                {/* <button className="edit-button" onClick={() => handleEdit(rowIndex)}>
                  <MdEdit />
                </button> */}
                <button
                  className="delete-button"
                  onClick={() => deleteItem(row.original.id)}
                >
                  <MdDelete />
                </button>
              </>
            )}
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

  // const handleEdit = (row) => {
  //   const { id } = row.original;

  //   const updatedSalesRecords = salesrecords.map((record) => {
  //     if (record.id === id) {
  //       return {
  //         ...record,
  //         editing: !record.editing,
  //       };
  //     }
  //     return record;
  //   });

  //   setSalesRecords(updatedSalesRecords);
  // };

  const handleEdit = (rowIndex) => {
    const updatedSalesRecords = salesrecords.map((record, index) => {
      if (index === rowIndex) {
        return {
          ...record,
          editing: !record.editing,
        };
      }
      return record;
    });

    setSalesRecords(updatedSalesRecords);
    //     setEditableRowIndex(rowIndex);
    //   setEditableRowData(salesrecords[rowIndex]);
  };

  // const handleEdit = (rowIndex) => {
  //   setEditableRowIndex(rowIndex);
  //   const rowData = salesrecords[rowIndex];
  //   setEditableRowData(rowData);
  // };

  const handleEditInputChange = (
    rowIndex,
    columnIndex,
    column,
    columnId,
    value
  ) => {
    // const updatedRowData = [...editableRowData];
    const updatedRowData = { ...editableRowData, [columnId]: value };
    updatedRowData[columnIndex] = value;
    // setEditableRowData(updatedRowData);
    setEditableRowData((prevState) => ({
      ...prevState,
      [column.id]: value,
    }));
  };

  const handleSave = (row) => {
    // Perform your save logic here
    console.log("Saved row:", row);
    setEditableRowIndex(null);
    setEditableRowData([]);
  };

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

  const deleteItem = async (id) => {
    const itemDoc = doc(db, "salesrecord", id);
    await deleteDoc(itemDoc);

    const updatedSalesRecords = salesrecords.filter(
      (record) => record.id !== id
    );
    setSalesRecords(updatedSalesRecords);
  };

  return (
    <>
      <div className="button-signup mt-2 ml-2">
        <button onClick={() => setEditableRowIndex(-1)}>Add</button>
      </div>
      {editableRowIndex === -1 && <AddRowForm onAddRow={handleAddRow} />}

      <div className="table-container">
        <input
          type="text"
          value={globalFilter || ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search"
          className="p-2 mb-4 mt-4 w-64 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            {rows.map((row, rowIndex) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell, columnIndex) => (
                    <td
                      className={`p-3 text-sm font-normal tracking-wide text-left ${
                        editableRowIndex === rowIndex ? "editing" : ""
                      }`}
                      {...cell.getCellProps()}
                    >
                      {editableRowIndex === rowIndex ? (
                        <input
                          type="text"
                          value={editableRowData[columnIndex] || ""}
                          onChange={(e) =>
                            // handleEditInputChange(rowIndex, columnIndex, e.target.value)
                            handleEditInputChange(
                              rowIndex,
                              cell.column.id,
                              e.target.value
                            )
                          }
                        />
                      ) : (
                        cell.render("Cell")
                      )}
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

export default TableEntryEdit;
