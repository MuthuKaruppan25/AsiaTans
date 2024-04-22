import { RouterProvider,createBrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './Pages/home';

import DashBoard from './Pages/dashboard';
import SideBar from './Components/SideBar';
import Customer from './Pages/Customer';
import Signup from './Pages/Signup';
import Products from './Pages/Products';
import Orders from './Pages/Orders';
function App() {
  const AppRouter = createBrowserRouter([
    {
      path:'/',
      element:<Signup/>
    },
    {
      path:'/home',
      element:<Home/>,
      children:[
        {
          path:'dashboard',
          element:<DashBoard/>
        },
        {
          path:'customers',
          element:<Customer/>
        },
        {
          path:'products',
          element:<Products/>
        },
        {
          path:'orders',
          element:<Orders/>
        }
      ]
    }
  ]);
  return (
    <RouterProvider router={AppRouter}/>
  );
}

export default App;