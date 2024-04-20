import { Add, SearchOutlined } from "@mui/icons-material";
import { color, height } from "@mui/system";
import React, { useState, useEffect } from "react";
import Select from "react-dropdown-select";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import AddDialog from "../Components/AddDialog";
import { getDocs, collection, onSnapshot } from "firebase/firestore";
import { DataGrid } from "@mui/x-data-grid";
import { db } from "../Database/firebase";
const Customer = () => {
  const options = [
    {
      id: 1,
      name: "Show Active",
    },
    {
      id: 2,
      name: "Show Past",
    },
  ];
  const [values, setValues] = useState(1);
  const [docs, setDocs] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const coll = collection(db, "Customers");

      // Listen to changes in the Firestore collection
      const unsubscribe = onSnapshot(coll, (querySnapshot) => {
        const updatedDocs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDocs(updatedDocs);
      });

      return () => unsubscribe(); // Unsubscribe from snapshot listener on component unmount
    };

    fetchData();
  }, []);

  const columns = [
    { field: "name", headerName: "Name", width: 160 },
    { field: "company", headerName: "Company", width: 130 },
    { field: "email", headerName: "Email", width: 300 },
    {
      field: "age",
      headerName: "Age",

      width: 80,
    },
    {
      field: "address",
      headerName: "Address",
      width: 400,
    },
  ];
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value); // Update search input state
  };

  // Filter documents based on the search input
  const filteredDocs = docs.filter((doc) =>
    doc.name.toLowerCase().includes(searchInput.toLowerCase())
  );
  const customStyles = {
    // Style for the root container of the DataGrid
    root: {
      "& .MuiDataGrid-root": {
        backgroundColor: "#f5f5f5", // Background color of the DataGrid
        borderRadius: "20px", // Border radius of the DataGrid
      },
    },
    // Style for the table inside the DataGrid
    table: {
      "& .MuiDataGrid-table": {
        borderCollapse: "collapse", // Ensure borders collapse properly
        width: "100%", // Ensure table takes full width
      },
      "& .MuiDataGrid-cell": {
        border: "1px solid #ddd", // Border style for cells
        padding: "8px", // Padding inside cells
      },
      "& .MuiDataGrid-row": {
        "&:nth-of-type(even)": {
          backgroundColor: "#f9f9f9", // Alternate row background color
        },
      },
    },
  };

  return (
    <div>
      <div className="flex flex-col">
        <span className="text-2xl font-semibold ml-3 mt-3">Customers</span>
      </div>
      <div className="flex  items-center">
        <div className="flex items-center">
          <div className="flex items-center border shadow-md p-2 w-[250px] rounded-lg mt-5 ml-5">
            <SearchOutlined style={{ color: "gray", height: "20px" }} />
            <input
              type="text"
              placeholder="Search"
              className="ml-1 outline-none border-none"
              onChange={handleSearchInputChange}
            />
          </div>
        </div>
        <AddDialog />
      </div>
      <div
        style={{ height: 500, width: "90%" }}
        className="mt-10 ml-5 rounded-lg"
      >
        <DataGrid
          rows={filteredDocs}
          columns={columns}
          components={customStyles}
          pageSize={5}
        />
      </div>
    </div>
  );
};

export default Customer;
