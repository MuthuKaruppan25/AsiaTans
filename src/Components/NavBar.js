import React from "react";
import { SearchOutlined } from "@mui/icons-material";
const NavBar = () => {
  return (
    <div>
      <div className="flex items-center border border-d-1 p-3 border-l-0 justify-between">
        <span className="text-3xl font-semibold">Analytics</span>
        <div className="flex items-center">
          <div className="flex items-center rounded-2xl border  ">
            <div className="p-2 ">
              <SearchOutlined sx={{ color: "GrayText" }} />
            </div>
            <div className="bg-[#696868] rounded focus:none">
              <input type="text" placeholder="Search"></input>
            </div>
          </div>
          <span className="ml-5">Muthu Karuppan</span>

          <div class="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ml-3">
            <span class="font-medium text-gray-600 dark:text-gray-300">MK</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
