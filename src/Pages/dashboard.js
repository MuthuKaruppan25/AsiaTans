import React from "react";
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
const DashBoard = () => {
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
                  <span className="font-bold mt-1 text-2xl">₹4,562</span>
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
                  <span className="font-bold mt-1 text-2xl">200</span>
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
                  <span className="font-bold mt-1 text-2xl">20</span>
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
                  <span className="font-bold mt-1 text-2xl">200</span>
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
            series={[
              {
                data: [
                  { id: 0, value: 10, label: "series A" },
                  { id: 1, value: 15, label: "series B" },
                  { id: 2, value: 20, label: "series C" },
                ],
              },
            ]}
            width={340}
            height={200}
          />
        </div>
      </div>
      <div className="shadow-md border w-[60%] mt-3 ml-5 rounded-2xl">
        <div className="flex flex-col">
          <span className="text-slate-500 font-semibold p-4">
            Weekly Invoices
          </span>
          <span className="font-semibold ml-5">₹24,000</span>
        </div>
        <BarChart
          width={600} // Total width of the bar chart
          height={300} // Height of the bar chart
          data={data1} // Data array containing daily values
          // Margin for the chart
        >
          {/* Render X-axis (days of the week) */}
          <XAxis dataKey="day" />

          <Tooltip />

          <Legend />

          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
};

export default DashBoard;
