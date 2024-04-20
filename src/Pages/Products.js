import React, { useState, useEffect, useRef } from "react";
import { SearchOutlined } from "@mui/icons-material";
import AddProductDialog from "../Components/AddProductDialog";
import { db } from "../Database/firebase";
import { onSnapshot, collection } from "firebase/firestore";
import AddIcon from "@mui/icons-material/Add";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const containerRef = useRef(null);
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const coll = collection(db, "products");

      // Listen to changes in the Firestore collection
      const unsubscribe = onSnapshot(coll, (querySnapshot) => {
        const updatedProducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(updatedProducts);
      });

      return () => unsubscribe(); // Unsubscribe from snapshot listener on component unmount
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
  const { name, image, price, quantity, cost } = product;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-5 mt-5 ml-3">
      <div className="h-40 rounded-lg">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
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
          <button className="mt-4 bg-[#4367de] hover:bg-blue-600 text-white py-2 px-2 rounded flex items-center justify-between">
            <AddIcon sx={{ marginRight: "2px" }} />
            Add
          </button>
          <button className="mt-4 bg-[#4367de] hover:bg-blue-600 text-white py-2 px-4 ml-3 rounded flex items-center justify-between">
            <EditRoundedIcon sx={{ marginRight: "2px" }} />
            Edit
          </button>
          <button className="mt-4 bg-[#4367de] hover:bg-blue-600 text-white py-2 px-4 ml-3 rounded flex items-center justify-between">
            <DeleteRoundedIcon sx={{ marginRight: "2px" }} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;
