import React, { useState } from "react";
import { BorderLeft, SearchOutlined } from "@mui/icons-material";
import AddOrderDialog from "../Components/AddOrderDialog";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { useEffect } from "react";
import { db } from "../Database/firebase";
import { onSnapshot, collection, doc ,getDoc} from "firebase/firestore";
import { Page, Text, View, Document, StyleSheet, PDFViewer } from "@react-pdf/renderer";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const Orders = () => {
  const [orderItems, setOrderItems] = useState([]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [cost,setCost] = useState(0);
  const [customer,setCustomer] = useState({});
  useEffect(() => {
    const fetchOrders = () => {
      const coll = collection(db, "Orders");
      const unsubscribe = onSnapshot(coll, (querySnapshot) => {
        const updatedProducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(updatedProducts);
        setOrderItems(updatedProducts);
      });

      return () => unsubscribe();
    };
    fetchOrders();
  }, []);

  const handleInvoiceButtonClick = async(order) => {
    const items = order.items;
    let totalcost = 0; 
    items.map((item) => {
      totalcost += item.totalCost;

    });
    const customerDocRef = doc(db, "Customers", order.customerId);
    const customerDocSnapshot = await getDoc(customerDocRef);
    const customerData = customerDocSnapshot.data();
    setSelectedOrder(order);
    setCost(totalcost);
    setCustomer(customerData);
};

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
          <AddOrderDialog />
        </div>
      </div>
      <div className=" grid grid-cols-2">
      {orderItems && orderItems.length
        ? orderItems.map((order) => (
            <TrackCard
              key={order.id}
              track={order}
              onInvoiceButtonClick={handleInvoiceButtonClick}
            />
          ))
        : null}
        </div>

      {selectedOrder && (
        <PDFViewer width="100%" height="800px" style={{marginBottom:"30px"}}>
          <InvoicePDF invoice={selectedOrder} cost={cost} customer={customer}/>
        </PDFViewer>
      )}
    </div>
  );
};

const TrackCard = ({ track, onInvoiceButtonClick }) => {
  const { id, createdAt, customerId, items } = track;

  const handleInvoiceClick = () => {
    onInvoiceButtonClick(track);
  };
  const createdAtDate = createdAt.toDate();


  const formattedDate = createdAtDate.toLocaleDateString();
  const formattedTime = createdAtDate.toLocaleTimeString();

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-5 mt-5 ml-3 w-[400px]">
      <div className="p-4">
        <div className="flex items-center mt-1 space-x-1">
          <p className="text-gray-600 font-semibold">Customer: </p>
          <p className="text-gray-600">{customerId}</p>
        </div>
        <div className="flex items-center mt-1 space-x-1">
          <p className="text-gray-600 font-semibold">Placed at: </p>
          <p className="text-gray-600">{formattedDate}</p>{" "}
          {/* Render formatted date */}
        </div>
        {items.map((item, index) => (
          <div key={index} className="flex flex-col  mt-1">
            <div className="flex space-x-1">
              <p className="text-gray-600 font-semibold">Product Name:</p>
              <p className="text-gray-600">{item.productName}</p>
            </div>
            <div className="flex space-x-1">
              <p className="text-gray-600 font-semibold">Quantity:</p>
              <p className="text-gray-600">{item.quantity}</p>
            </div>
            <div className="flex space-x-1">
              <p className="text-gray-600 font-semibold">Total Cost:</p>
              <p className="text-gray-600">{item.totalCost}</p>
            </div>
          </div>
        ))}

        <div className="flex items-center justify-end">
          <button
            className="mt-4 bg-[#4367de] hover:bg-blue-600 text-white py-2 px-4 ml-3 rounded flex items-center justify-between"
            onClick={handleInvoiceClick}
          >
            <PictureAsPdfIcon sx={{ marginRight: "2px" }} />
            Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    marginLeft : "80%"
  },
  subheader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,

  },
  text: {
    fontSize: 12,
    marginBottom: 10,
    
  },
  table: {
    display: 'table',
    width: 'auto',
    marginBottom: 10,
    marginTop : 10
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableHeader1: {
    fontWeight: 'bold',
    border: '1px solid black',
    borderRight : 0,
    padding: 10,
    width: "150px",
    fontSize:"13px"
  },
  tableHeader2: {
    fontWeight: 'bold',
    border: '1px solid black',
    borderLeft : 0,
    borderRight : 0,
    padding: 10,
    width: "150px",
    fontSize:"13px"
  },
  tableHeader3: {
    fontWeight: 'bold',
    border: '1px solid black',
    borderLeft : 0,
    padding: 10,
    width: "150px",
    fontSize:"13px"
  },
  tableCell1: {
    border :"1px solid",
    borderBottom  : 1,
    borderRight : 0,
    borderLeft : 1,
    padding: 10,
    width:"150px",
    fontSize:"12px"
  },
  tableCell2: {
    border :"1px solid",
    borderBottom  : 1,
    borderRight : 0,
    borderLeft : 0,
    padding: 10,
    width:"150px",
    fontSize:"12px"
  },
  tableCell3: {
    border :"1px solid",
    borderBottom  : 1,
    borderRight : 1,
    borderLeft : 0,
    padding: 10,
    width:"150px",
    fontSize:"12px"
    
  },
});

const InvoicePDF = ({ invoice, cost, customer }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>Invoice</Text>
        
        
        <Text style={styles.text}>ID:      {invoice.id}</Text>
        <Text style={styles.text}>Date:  {invoice.createdAt.toDate().toLocaleDateString()}</Text>
        <Text style={styles.subheader}>Customer Details:</Text>
        <Text style={styles.text}>Billed To: {customer.name}</Text>
        <Text style={styles.text}>Pay To: {customer.address}</Text>
        <Text style={styles.text}>Email: {customer.email}</Text>
        <Text style={styles.text}>Phone: {customer.mobile}</Text>
        
        <Text style={styles.subheader}>Product Details:</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader1}>Name</Text>
            <Text style={styles.tableHeader2}>Cost(per sqft)</Text>
            <Text style={styles.tableHeader2}>Quantity(in sqft)</Text>
            <Text style={styles.tableHeader3}>Amount</Text>
          </View>
          {invoice.items.map((item, index) => (
            <View style={styles.tableRow} key={index}>
              <Text style={styles.tableCell1} >{item.productName} </Text>
              <Text style={styles.tableCell2} >{item.cost}</Text>
              <Text style={styles.tableCell2} >{item.quantity}</Text>
              <Text style={styles.tableCell3} >Rs.{item.totalCost}</Text>
            </View>
            
          ))}
          <View style={styles.tableRow} >
            <Text style={styles.tableCell1} >Total</Text>
            <Text style={styles.tableCell2} ></Text>
            <Text style={styles.tableCell2} ></Text>          
            <Text style={styles.tableCell3} >Rs.{cost}</Text>
          </View>
        </View>
        
        
        <Text style={styles.text}>Payment is required within 14 days of invoice date. Please send reimittance to info@tans.com</Text>

      </View>
    </Page>
  </Document>
);



export default Orders;
