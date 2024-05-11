import React, { useState, useEffect, useRef } from "react";
import { SearchOutlined } from "@mui/icons-material";
import AddProductDialog from "../Components/AddProductDialog";
import { db } from "../Database/firebase";
import { onSnapshot, collection, doc , getDoc , updateDoc, deleteDoc} from "firebase/firestore";
import AddIcon from "@mui/icons-material/Add";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Autocomplete,
  TextField,
} from "@mui/material";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const containerRef = useRef(null);
  const [searchInput, setSearchInput] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
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

    fetchData();
  }, []);
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value); // Update search input state
  };

  // Filter documents based on the search input
  const filteredDocs = products.filter((doc) =>
    doc.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  // Lazy loading: Infinite scroll
  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    if (scrollHeight - scrollTop === clientHeight && !isLoading && hasMore) {
      setIsLoading(true);

      // Simulate loading more data (e.g., fetch from API)
      setTimeout(() => {
        setIsLoading(false);
        // Set hasMore to false after fetching all data, in this case, we assume there's no more data to fetch
        setHasMore(false);
      }, 1000); // Simulated loading time


    }
  };

  return (
    <div>
      <div className="flex flex-col">
        <span className="text-2xl font-semibold ml-6 mt-3">Products</span>
      </div>
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
        <AddProductDialog />

      </div>
      <div
        ref={containerRef}
        className="grid grid-cols-3 gap-4 mt-5 ml-4 mb-5 "
        onScroll={handleScroll}
        style={{ maxHeight: "70vh", overflowY: "auto" }}
      >
        {filteredDocs.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {isLoading && <p className="text-center">Loading...</p>}
        {!hasMore && <p className="text-center">No more products</p>}
      </div>
    </div>
  );
};

const ProductCard = ({ product }) => {
  const { id, name, image, price, quantity, cost } = product;
  const [open,setOpen] = useState(false);
  const [quan,setQuan] = useState(0);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async()=>{
    const coll = collection(db, "products");
    const docRef = doc(coll, id);
   
    // Fetch the document from Firestore
    const docSnapshot = await getDoc(docRef);
  
    if (docSnapshot.exists()) {
      const currentData = docSnapshot.data();
      const currentQuantity = parseInt(currentData.quantity, 10) || 0;  // If quantity doesn't exist, default to 0
  
      // Calculate new quantity by adding 2
      const newQuantity = currentQuantity + quan;
  
    
      await updateDoc(docRef, { quantity: newQuantity });
      handleClose();
      console.log("Document updated successfully!");
    } else {
      console.log("Document does not exist");
    }
  }
  const deletedoc = async()=>{
    const coll = collection(db, "products");
    const docRef = doc(coll, id);
    await deleteDoc(docRef);
    console.log("document deleted successfully");
  }
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-5 mt-5 ml-3">
      <div className="h-40 rounded-lg">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
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
          <div className="w-100">
          <span className="mt-4 mb-3">Quantity</span>
            <TextField
              type="number"
              fullWidth
              label="Quantity"
              style={{ marginTop: "8px", marginBottom: "10px" }}
              onChange={(e)=>setQuan(e.target.value)}
            />
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
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <div className="flex items-center mt-1">
          <p className="text-gray-600 font-semibold">Quantity : </p>
          <p className="text-gray-600 ">{quantity}</p>
        </div>
        <div className="flex items-center mt-1">
          <p className="text-gray-600 font-semibold">Cost : </p>
          <p className="text-gray-600 ">{cost}</p>
        </div>
        <div className="flex items-center mt-1">
          <p className="text-gray-600 font-semibold">Price : </p>
          <p className="text-gray-600 ">{price}</p>
        </div>
        <div className="flex items-center justify-end">
          <button className="mt-4 bg-[#4367de] hover:bg-blue-600 text-white py-2 px-2 rounded flex items-center justify-between" onClick={handleOpen}>
            <AddIcon sx={{ marginRight: "2px" }} />
            Add
          </button>
          
          <button className="mt-4 bg-[#4367de] hover:bg-blue-600 text-white py-2 px-4 ml-3 rounded flex items-center justify-between" onClick={deletedoc}>
            <DeleteRoundedIcon sx={{ marginRight: "2px" }} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;
