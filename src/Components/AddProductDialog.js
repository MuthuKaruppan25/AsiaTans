import React from "react";
import { useState, useCallback } from "react";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useDropzone } from "react-dropzone";
import firebase from "firebase/compat/app";
import { db, storage } from "../Database/firebase";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
const AddProductDialog = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [cost, setCost] = useState(0);
  const [price, setPrice] = useState(0);
  const [formerrors, setformerrors] = useState({});
  const [url, setUrl] = useState("");
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setSelectedImage({
      file,
      preview: URL.createObjectURL(file),
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*", // Accept only image files
    multiple: false, // Allow only single file selection
  });
  const dropzoneStyle = {
    width: "100%",
    height: "200px",
    border: "2px dashed #ccc",
    borderRadius: "4px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  };

  const imageStyle = {
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain",
  };
  const handleSubmit = async () => {
    setformerrors(validate(name, selectedImage, quantity, price, cost));
    if (name && selectedImage && price && quantity && cost) {
      const storageRef = ref(storage, "images/" + selectedImage.file.name);
      try {
        const snapshot = await uploadBytes(storageRef, selectedImage.file);
        console.log('File uploaded successfully');
  
        // Retrieve the download URL for the uploaded image
        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log('Download URL:', downloadURL);
  
        
        setUrl(downloadURL);
  

        const coll = collection(db, "products");
        const docref = await addDoc(coll, {
          name: name,
          quantity: quantity,
          cost: cost,
          price: price,
          image: url,
        });
        const id = docref.id;
        await updateDoc(docref, { id: id });
        console.log("product inserted successfully");
        setCost(0);
        setName("");
        setSelectedImage(null);
        setQuantity(0);
        setPrice(0);
        setOpen(false);
      } catch (err) {
        console.log(err);
      }
    }
  };
  const errors = {};
  const validate = (name, selectedImage, quantity, price, cost) => {
    if (!name) errors.name = "Name is required";
    if (!selectedImage) errors.selectedImage = "Image is required";
    if (!quantity) errors.quantity = "Quantity is required";
    if (!price) errors.price = "Price is required";
    if (!cost) errors.cost = "Cost is required";

    return errors;
  };

  return (
    <div>
      <button
        className="bg-[#4367de] text-white rounded-lg mr-4 p-2 flex items-center h-10 mt-4 ml-8 justify-between"
        onClick={handleOpen}
      >
        <AddIcon />
        Add Product
      </button>
      <Dialog open={open}>
        <DialogTitle id="customized-dialog-title">Add Product</DialogTitle>
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
            <span className="ml-1">Product Image</span>
            <div {...getRootProps()} style={dropzoneStyle} className="mt-2">
              <input {...getInputProps()} />
              {selectedImage ? (
                <img
                  src={selectedImage.preview}
                  alt="Selected"
                  style={imageStyle}
                />
              ) : (
                <p>Drag & drop an image or click to select an image</p>
              )}
            </div>
            <p className="text-[13px] ml-1 text-red-500">
              {formerrors.selectedImage}
            </p>
            <span className="ml-1 mt-2">Product Name</span>
            <div className="w-80 border p-3 rounded-lg mt-2">
              <input
                type="text"
                className="border-none outline-none w-full"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <p className="text-[13px] ml-1 text-red-500">
              {formerrors.name}
            </p>
            <span className="ml-1 mt-2">Quantity (in sqft) </span>
            <div className="w-80 border p-3 rounded-lg mt-2">
              <input
                type="number"
                className="border-none outline-none w-full"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <p className="text-[13px] ml-1 text-red-500">
              {formerrors.quantity}
            </p>
            <span className="ml-1 mt-2">Cost (per sqft) </span>
            <div className="w-80 border p-3 rounded-lg mt-2">
              <input
                type="number"
                className="border-none outline-none w-full"
                onChange={(e) => setCost(e.target.value)}
              />
            </div>
            <p className="text-[13px] ml-1 text-red-500">
              {formerrors.cost}
            </p>
            <span className="ml-1 mt-2">Price (per sqft) </span>
            <div className="w-80 border p-3 rounded-lg mt-2">
              <input
                type="number"
                className="border-none outline-none w-full"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <p className="text-[13px] ml-1 text-red-500">
              {formerrors.price}
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

export default AddProductDialog;
