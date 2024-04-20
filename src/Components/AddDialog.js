import React, { useState,useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { db } from "../Database/firebase";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { addDoc, collection, getDocs, updateDoc } from "firebase/firestore";
const AddDialog = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState(null);
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [company, setCompany] = useState("");
  const [formerrors, setformerrors] = useState({});
  const [docs,setDocs] = useState([]);
  const handleOpen = () => {
    setOpen(true); // Open the dialog
  };

  const handleClose = () => {
    setOpen(false); // Close the dialog
  };
  const handleSubmit = async () => {
    setformerrors(validate(name, age, address, email, mobile, company));
    if (name && age && address && email &&  mobile && company) {
      try {
        const collection1 = collection(db, "Customers");
        const docref = await addDoc(collection1, {
          name: name,
          age: age,
          address: address,
          email: email,
          mobile: mobile,
          company: company,
        });
        const docId = docref.id;
        await updateDoc(docref, { id: docId });
        console.log("user inserted successfully");
        setName("");
        setAddress("");
        setAge(null);
        setCompany("");
        setEmail("");
        setMobile("");
        setOpen(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const errors = {};
  function validate(name, age, address, email, mobile, company) {
    if (!name) {
      errors.name = "Name is required";
    }
    if (!email) {
      errors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        errors.email = "Invalid email format";
      }
    }
    if (!mobile) {
      errors.mobile = "Mobile number is required";
    } else {
      const mobileRegex = /^\d{10}$/;
      if (!mobileRegex.test(mobile)) {
        errors.mobile = "Invalid mobile number format (should be 10 digits)";
      }
    }
    if (!address) {
      errors.address = "Address is required";
    }
    if (!age) {
      errors.age = "Age is required";
    } else if (age >= 120) {
      errors.age = "Invalid age";
    }
    if (!company) {
      errors.company = "Company is required";
    }
    return errors;
  }
  return (
    <div>
      <button
        className="bg-[#4367de] text-white rounded-lg mr-4 p-2 flex items-center h-10 mt-4 ml-8 justify-between"
        onClick={handleOpen}
      >
        <AddIcon />
        Add Customer
      </button>
      <Dialog open={open}>
        <DialogTitle id="customized-dialog-title">Add Customer</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <div className="flex flex-col">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <div className="border p-2 w-[300px] rounded-lg">
                  <input
                    type="text"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                    className="w-full outline-none border-none"
                  ></input>
                </div>
                <p className="text-[13px] ml-1 text-red-500">
                  {formerrors.name}
                </p>
              </div>
              <div className="flex flex-col">
                <div className="border p-2 w-[150px] ml-2 mr-2 rounded-lg ml-4">
                  <input
                    type="number"
                    placeholder="Age"
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full outline-none border-none"
                  ></input>
                </div>
                <p className="text-[13px] ml-5 text-red-500">
                  {formerrors.age}
                </p>
              </div>
            </div>
            <div className="border p-2 w-[470px] mt-5 rounded-lg">
              <input
                type="text"
                placeholder="Address"
                onChange={(e) => setAddress(e.target.value)}
                className="w-full outline-none border-none"
              ></input>
            </div>
            <p className="text-[13px] ml-1 text-red-500">
              {formerrors.address}
            </p>
            <div className="flex justify-between items-center mt-5 rounded-lg">
              <div className="flex flex-col">
                <div className="border p-2 w-[260px] rounded-lg">
                  <input
                    type="text"
                    placeholder="E-mail"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full outline-none border-none"
                  ></input>
                </div>
                <p className="text-[13px] ml-1 text-red-500">
                  {formerrors.email}
                </p>
              </div>
              <div className="flex flex-col">
                <div className="border p-2 w-[200px] rounded-lg">
                  <input
                    type="text"
                    placeholder="Mobile No"
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full outline-none border-none"
                  ></input>
                </div>
                <p className="text-[13px] ml-1 text-red-500">
                  {formerrors.mobile}
                </p>
              </div>
            </div>
            <div className="border p-2 w-[470px] mt-5 rounded-lg">
              <input
                type="text"
                placeholder="Company"
                onChange={(e) => setCompany(e.target.value)}
                className="w-full outline-none border-none"
              ></input>
            </div>
            <p className="text-[13px] ml-1 text-red-500">
              {formerrors.company}
            </p>
          </div>
        </DialogContent>
        <DialogActions>
          <div className="flex items-center">
            <Button
              autoFocus
              className="bg-[#8884d8] rounded-lg p-3"
              onClick={handleSubmit}
            >
              ADD
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddDialog;
