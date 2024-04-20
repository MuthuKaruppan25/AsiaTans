import React from "react";
import { SearchOutlined } from "@mui/icons-material";
import AddOrderDialog from "../Components/AddOrderDialog";
const Orders = () => {
  return (
    <div className="">
      <div className="flex flex-col">
        <span className="text-2xl font-semibold ml-6 mt-3">Orders</span>
      </div>
      <div className="flex  items-center">
        <div className="flex items-center">
          <div className="flex items-center border shadow-md p-2 w-[250px] rounded-lg mt-5 ml-5">
            <SearchOutlined style={{ color: "gray", height: "20px" }} />
            <input
              type="text"
              placeholder="Search"
              className="ml-1 outline-none border-none"
            />
          </div>
          <AddOrderDialog/>
        </div>
        
      </div>
    </div>
  );
};

export default Orders;
