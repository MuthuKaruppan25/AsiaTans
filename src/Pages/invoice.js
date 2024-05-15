import { collection, getDocs,orderBy,query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../Database/firebase";

const Invoice = () => {
  const [invoices, setInvoices] = useState([]);
  useEffect(() => {
    const fetchInvoice = async () => {
        try {
          const coll = collection(db, "invoices");
          const querySnapshot = await getDocs(coll);
          const docs = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }));
          const sortedInvoices = docs.sort((a, b) => b.createdAt - a.createdAt); // Sorting by timestamp
          setInvoices(sortedInvoices);
        } catch (error) {
          console.error("Error fetching invoices:", error);
        }
      };
      
    fetchInvoice();
  }, []);
  const handleDownload = (url) => {
    // Create an anchor element
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.target = "_blank"; // Open the link in a new tab
    anchor.download = url; // Specify a filename for the downloaded file
    anchor.click(); // Trigger the click event to start downloading
  };
  return (

    <div className="flex flex-col">
        <span className="font-semibold text-2xl ml-4 mt-4 mb-5">Invoices</span>
        {
            invoices.map((item)=>(
                <div className="w-200 pl-5 pt-2 pb-2 flex gap-4 ml-4 mr-4 shadow-md border rounded-md items-center justify-between pr-3 mb-4">
                    <span>{item.filename}</span>
                    <span>{}</span>
                    <button className="p-2 bg-[#4367de] text-white rounded-md " onClick={() => handleDownload(item.url)}>Download</button>
                </div>
            ))
        }
    </div>
  );
};

export default Invoice;
