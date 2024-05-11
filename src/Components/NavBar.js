import React from "react";

const NavBar = () => {
  const email = localStorage.getItem("name");
  const photo = localStorage.getItem("photoURL");
  return (
    <div>
      <div className="flex items-center border border-d-1 p-3 border-l-0 justify-between">
        <span className="text-3xl font-semibold">Analytics</span>
        <div className="flex items-center">
          <span className="ml-5">{email}</span>
          {photo && (
            <div className="items-center justify-center w-10 h-10  bg-gray-100 rounded-full ml-3">
              <img src={photo} alt="Profile" className="rounded-full" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
