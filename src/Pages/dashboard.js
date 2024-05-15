import React, { useState } from "react";
import { BarChart, Bar } from "recharts";

import { StackedLineChartOutlined } from "@mui/icons-material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { PieChart } from "@mui/x-charts";
import { useEffect } from "react";
import { db } from "../Database/firebase";
import { onSnapshot, collection,query,where,getDocs ,orderBy,limit} from "firebase/firestore";
const DashBoard = () => {
  const [revenue, setRevenue] = useState(0);
  const [customer, setCustomer] = useState(0);
  const [products, setProducts] = useState(0);
  const [spendings, setSpendings] = useState(0);
  const [data2, setData2] = useState([]);
  const [product,setProduct] = useState([]);
  const [product1,setproduct1] = useState([]);
  useEffect(() => {
    const fetchData = () => {
      const coll = collection(db, "products");

      const unsubscribe = onSnapshot(coll, (querySnapshot) => {
        const updatedProducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(updatedProducts.length);
      });

      return () => unsubscribe();
    };
    const fetchData1 = () => {
      const coll1 = collection(db, "Customers");

      // Listen to changes in the Firestore collection
      const unsubscribe1 = onSnapshot(coll1, (querySnapshot) => {
        const updatedProducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCustomer(updatedProducts.length);
      });

      return () => unsubscribe1();
    };
    const fetchData3 = () => {
      const coll2 = collection(db, "Orders");
      let totalSpendings = 0;

      const unsubscribe = onSnapshot(coll2, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const order = doc.data();
          order.items.forEach((item) => {
            totalSpendings += item.totalCost;
          });
        });

        setRevenue(totalSpendings);
      });

      return () => unsubscribe();
    };

    const fetchData4 = () => {
      const coll2 = collection(db, "products");
      let totalSpendings = 0;

      const unsubscribe = onSnapshot(coll2, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const order = doc.data();
          totalSpendings +=parseInt (order.cost) * parseInt(order.quantity);
        });

        setSpendings(totalSpendings);
      });

      return () => unsubscribe();
    }
    const fetchData5 = async () => {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 6); // Get the date of 7 days ago
      const endDate = new Date();

      const coll = collection(db, "Orders");
      const q = query(
        coll,
        where("createdAt", ">=", startDate),
        where("createdAt", "<=", endDate)
      );

      const querySnapshot = await getDocs(q);

      const dailyRevenue = new Array(7).fill(0);

      querySnapshot.forEach((doc) => {
        const order = doc.data();
        const orderDate = order.createdAt.toDate();
        const dayIndex = Math.floor((endDate - orderDate) / (1000 * 60 * 60 * 24));
        let totcost = 0;
        order.items.map((item)=>(
          totcost += item.totalCost
        ))
        dailyRevenue[dayIndex] += totcost;
      });

      const formattedData = dailyRevenue.map((revenue, index) => ({
        day: index + 1, 
        value: revenue,
      }));

      setData2(formattedData);
    };
    const fetchData6 = () => {
      const coll = collection(db, "products");
      const q = query(coll, orderBy("count", "desc"), limit(3)); 

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const updatedProducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProduct(updatedProducts);
     
      });
    

      return () => unsubscribe();
    };
    const fetchData7 = ()=>{
      const coll = collection(db, "products");
      const q = query(coll, orderBy("totalRevenue", "desc"), limit(3)); 

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const updatedProducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setproduct1(updatedProducts);
     
      });
    

      return () => unsubscribe();
    }
    fetchData();
    fetchData1();
    fetchData3();
    fetchData4();
    fetchData5();
    fetchData6();
    fetchData7();
  }, []);
  const data = [
    { name: "A", value: 2 },
    { name: "B", value: 5.5 },
    { name: "C", value: 2 },
    { name: "D", value: 8.5 },
    { name: "E", value: 1.5 },
    { name: "F", value: 5 },
  ];
  const data1 = [
    { day: "1", value: 150 },
    { day: "2", value: 200 },
    { day: "3", value: 180 },
    { day: "4", value: 220 },
    { day: "5", value: 250 },
    { day: "6", value: 280 },
    { day: "7", value: 300 },
  ];
  return (
    <div className="flex flex-col">
      <div className="flex ">
        <div className="flex flex-col">
          <div className="flex mt-10 ml-4 w-50">
            <div className="shadow-md h-50 border rounded-l-3xl p-2">
              <div className="flex items-center justify-center">
                <div className="flex flex-col">
                  <span className="text-slate-500 font-semibold pr-20">
                    Total Revenue
                  </span>
                  <span className="font-bold mt-1 text-2xl">₹{revenue}</span>
                  <div className="flex mt-3">
                    <span className="text-[8px] text-green-700">12%</span>
                    <span className="text-[8px] ml-3 text-slate-500">
                      v/s Previous 28 days
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <LineChart width={125} height={100} data={data}>
                    {/* Render only the line */}
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#8884d8"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </div>
              </div>
            </div>
            <div className="shadow-lg border rounded-r-3xl h-50 p-2 ml-3">
              <div className="flex items-center justify-center">
                <div className="flex flex-col">
                  <span className="text-slate-500 font-semibold pr-20">
                    Total Customers
                  </span>
                  <span className="font-bold mt-1 text-2xl">{customer}</span>
                  <div className="flex mt-3">
                    <span className="text-[8px] text-green-700">12%</span>
                    <span className="text-[8px] ml-3 text-slate-500">
                      v/s Previous 28 days
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <LineChart width={125} height={100} data={data}>
                    {/* Render only the line */}
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#8884d8"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </div>
              </div>
            </div>
          </div>
          <div className="flex mt-5  ml-4 w-50">
            <div className="shadow-md h-50 border rounded-l-3xl p-2 w-70">
              <div className="flex items-center justify-center">
                <div className="flex flex-col">
                  <span className="text-slate-500 font-semibold pr-20">
                    Total Products
                  </span>
                  <span className="font-bold mt-1 text-2xl">{products}</span>
                  <div className="flex mt-3">
                    <span className="text-[8px] text-green-700">12%</span>
                    <span className="text-[8px] ml-3 text-slate-500">
                      v/s Previous 28 days
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <LineChart width={125} height={100} data={data}>
                    {/* Render only the line */}
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#8884d8"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </div>
              </div>
            </div>
            <div className="shadow-lg border rounded-r-3xl h-50 p-2 ml-3">
              <div className="flex items-center justify-center w-70">
                <div className="flex flex-col">
                  <span className="text-slate-500 font-semibold pr-20 ">
                    Total Spendings
                  </span>
                  <span className="font-bold mt-1 text-2xl">₹{spendings}</span>
                  <div className="flex mt-3">
                    <span className="text-[8px] text-green-700">12%</span>
                    <span className="text-[8px] ml-3 text-slate-500">
                      v/s Previous 28 days
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <LineChart width={125} height={100} data={data}>
                    {/* Render only the line */}
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#8884d8"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </div>
              </div>
            </div>
          </div>
          <div></div>
        </div>
        <div className="mt-10 shadow-md p-2 mr-2 border rounded-2xl ml-3 items-center flex flex-col">
          <span className="text-slate-500 font-semibold mb-5 ml-0">
            Sales by category
          </span>
          <PieChart
            // series={[
            //   {
            //     data: [
            //       { id: 0, value: product[0]["count"], label: product[0]["name"]},
            //       { id: 1, value: product[1]["count"], label: product[1]["name"]},
            //       { id: 2, value: product[2]["count"], label: product[2]["name"]},
            //     ],
            //   },
            // ]}
            series={[
              {
                data: product.slice(0, 3).map((item, index) => ({
                  id: index,
                  value: item.count,
                  label: item.name,
                })),
              },
            ]}
            width={340}
            height={200}
          />
        </div>
      </div>
      <div className="flex">
      <div className="shadow-md border w-[60%] mt-3 ml-5 rounded-2xl">
        <div className="flex flex-col">
          <span className="text-slate-500 font-semibold p-4">
            Weekly Invoices
          </span>
          <span className="font-semibold ml-5">₹{revenue}</span>
        </div>
        <BarChart
          width={600} // Total width of the bar chart
          height={300} // Height of the bar chart
          data={data2} // Data array containing daily values
          // Margin for the chart
        >
          {/* Render X-axis (days of the week) */}
          <XAxis dataKey="day" />

          <Tooltip />

          <Legend />

          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </div>
      <div className="mt-4 shadow-md p-2 mr-2 border rounded-2xl ml-3 items-center flex flex-col h-[350px]">
          <span className="text-slate-500 font-semibold mb-5 ml-0">
            Sales by Amount
          </span>
          <PieChart
            // series={[
            //   {
            //     data: [
            //       { id: 0, value: product[0]["count"], label: product[0]["name"]},
            //       { id: 1, value: product[1]["count"], label: product[1]["name"]},
            //       { id: 2, value: product[2]["count"], label: product[2]["name"]},
            //     ],
            //   },
            // ]}
            series={[
              {
                data: product1.slice(0, 3).map((item, index) => ({
                  id: index,
                  value: item.count,
                  label: item.name,
                })),
              },
            ]}
            width={340}
            height={200}
          />
        </div>
      
      </div>

      
      
    </div>
  );
};

export default DashBoard;
