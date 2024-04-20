import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Autocomplete,
  TextField,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { collection, onSnapshot, addDoc, serverTimestamp, updateDoc, doc } from "firebase/firestore";
import { db } from "../Database/firebase";

const AddOrderDialog = () => {
  const [open, setOpen] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [newProduct, setNewProduct] = useState("");
  const [newQuantity, setNewQuantity] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchCustomers = async () => {
      const coll = collection(db, "Customers");
      const unsubscribe = onSnapshot(coll, (querySnapshot) => {
        const updatedCustomers = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCustomers(updatedCustomers);
      });
      return () => unsubscribe();
    };
    fetchCustomers();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const coll = collection(db, "products");
      const unsubscribe = onSnapshot(coll, (querySnapshot) => {
        const updatedProducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(updatedProducts);
      });
      return () => unsubscribe();
    };
    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    if (newProduct && newQuantity) {
      const productToAdd = products.find((product) => product.name === newProduct);
      if (productToAdd) {
        if (productToAdd.quantity >= parseInt(newQuantity, 10)) {
          const item = {
            product: productToAdd,
            quantity: parseInt(newQuantity, 10),
          };
          setOrderItems([...orderItems, item]);

          // Update the product quantity in the database after selling
          const updatedQuantity = productToAdd.quantity - parseInt(newQuantity, 10);
          const productRef = doc(db, "products", productToAdd.id);
          updateDoc(productRef, { quantity: updatedQuantity })
            .then(() => {
              console.log("Product quantity updated successfully");
            })
            .catch((error) => {
              console.error("Error updating product quantity: ", error);
            });

          setNewProduct("");
          setNewQuantity("");
        } else {
          alert(`Not enough quantity available for ${productToAdd.name}`);
        }
      }
    }
  };

  const handleCreateOrder = async () => {
    if (selectedCustomer && orderItems.length > 0) {
      try {
        const orderData = {
          customerId: selectedCustomer.id,
          items: orderItems.map((item) => ({
            productId: item.product.id,
            productName: item.product.name,
            quantity: item.quantity,
            totalCost: item.quantity * item.product.cost,
          })),
          createdAt: serverTimestamp(),
        };
        const docRef = await addDoc(collection(db, "Orders"), orderData);
        console.log("Order created with ID: ", docRef.id);
        setOrderItems([]);
        setSelectedCustomer(null);
        handleClose();
      } catch (error) {
        console.error("Error creating order: ", error);
      }
    }
  };

  return (
    <div>
      <button
        className="bg-[#4367de] text-white rounded-lg mr-4 p-2 flex items-center h-10 mt-4 ml-8 justify-between"
        onClick={handleOpen}
      >
        <AddIcon />
        Add Order
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Order</DialogTitle>
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
          <div>
            <span className="mt-2 mb-3">Customer Name</span>
            <Autocomplete
              options={customers}
              getOptionLabel={(customer) => customer.name}
              style={{ marginTop: "8px", marginBottom: "8px" }}
              value={selectedCustomer}
              onChange={(event, newValue) => setSelectedCustomer(newValue)}
              renderInput={(params) => <TextField {...params} label="Select" />}
            />
          </div>
          <div>
            <span className="mt-4 mb-3">Product Name</span>
            <Autocomplete
              options={products}
              getOptionLabel={(product) => product.name}
              style={{ marginTop: "8px", marginBottom: "8px" }}
              value={newProduct}
              onChange={(event, newValue) => setNewProduct(newValue)}
              renderInput={(params) => <TextField {...params} label="Select" />}
            />
            <span className="mt-4 mb-3">Quantity</span>
            <TextField
              type="number"
              fullWidth
              label="Quantity"
              style={{ marginTop: "8px", marginBottom: "10px" }}
              value={newQuantity}
              onChange={(e) => setNewQuantity(e.target.value)}
            />
            <Button variant="contained" onClick={handleAddProduct}>
              Add Product
            </Button>
          </div>
          <div>
            {orderItems.map((item, index) => (
              <div key={index}>
                {item.product.name} - Quantity: {item.quantity}
              </div>
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreateOrder} variant="contained" color="primary">
            Create Order
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddOrderDialog;
