import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import DashBoard from "./Components/Dashboard//DashBoard";
import NavHome from "./Components/Home/NavHome";

import InventoryHome from "./Components/Inventory/InventoryHome";
import InventoryForm from "./Components/Inventory/InventoryForm";
import SelectedItem from "./Components/Inventory/SelectedItem";
import EditInventoryItems from "./Components/Inventory/EditInventoryItems";
import CusHome from "./Components/Home/Home-Products";
import CusSelectedItem from "./Components/Home/Home-SelectedItem";
import Report1 from "./Components/Inventory/Inventory-report1";
import ProductCategory from "./Components/Inventory/inventory-AddNewCategory";
import ScannerBarcode from "./Components/Inventory/scanner";
import InventoryLayout from "./Components/Inventory/InventoryLayout"


import EmployeeHome from './Pages/EmployeeHome';

//import EmployeeHome from './Pages/EmployeeHome';


import EmployeeForm from './Components/Employee/EmployeeForm';
import UpdateEmployeeForm from './Components/Employee/UpdateEmployeeForm';
import EmployeeQRCode from './Components/Employee/EmployeeQRCode';
import LeaveHome from './Pages/LeaveHome';
import AttendanceHome from './Pages/AttendanceHome';
import EmployeeReq from './Pages/EmployeeReq';
import AttendanceForm from './Components/Attendance/AttendanceForm';
import LeaveForm from './Components/Leave/LeaveForm';
import AcceptedLeaveReq from './Pages/AcceptedLeaveReq';
import EmpDashboard from './Pages/EmpDashboard';
import EmployeeReport from './Pages/EmployeeReport';
// import QRCodeScanner from './Components/Attendance/QRCodeScanner';

import Layout from "./Pages/SupplyManager/components/Layout";
import SupplyManagementHome from "./Pages/SupplyManager/home.page";
import NotificationPage from "./Pages/SupplyManager/components/low-stock-notifications/home.notifications";
import NotificationDetails from "./Pages/SupplyManager/components/NotificationDetails";
import SupplierList from "./Pages/SupplyManager/components/supplier-management/SupplierList";
import PurchaseOrderList from "./Pages/SupplyManager/components/purchase-order-management/PurchaseOrderList";
import ReturnItemsNotifications from "./Pages/SupplyManager/components/ReturnItems/returnItemsNotifications";


import MapView from "./Components/DeliveryManagement/MapView/AlignMap";
import CreateVehicle from "./Components/DeliveryManagement/VehicleView/CreateVehicle";
import VehicleView from "./Components/DeliveryManagement/VehicleView/VehicleView";
import VehicleUpdateDelete from "./Components/DeliveryManagement/VehicleView/VehicleUpdateDelete";
import DeliveryView from "./Components/DeliveryManagement/DeliveryView/DeliveryView";
import CreateDelivery from "./Components/DeliveryManagement/MapView/DeliveryForm";
import DeliveryUpdateDelete from "./Components/DeliveryManagement/DeliveryView/DeliveryUpdateDelete";
import Orders from "./Components/DeliveryManagement/OrderView/Orders";
import Orderfetch from "./Components/DeliveryManagement/Retrive/callorderFetch"
import DeliveryInfo from "./Components/DeliveryManagement/Retrive/DeliveryInfoPage"


import SelectedOrderItem from "./Components/Order/Home-SelectedItem";
import CartPage from "./Components/Order/CartPages";
import DeliveryInfoPage from "./Components/Order/DeliveryInfoPage";
import PaymentPage from "./Components/Order/PaymentPage";
import AdminOrdersPage from "./Components/Order/AdminOrderdPage";
import AdminRatingPage from './Components/Order/AdminRatingPage';
import FinalPage from './Components/Order/FinalPage';

import { Provider } from "react-redux";
import store from "../src/Components/ReduxTool/Store";

// sanjuka
import RentalManagement from "./Components/RentalManagement/RentalManagement";
import LendedItemsList from "./Components/RentalManagement/lendedItem/LendedItemList";
import UserItemList from "./Components/RentalManagement/UserItemList/UserItemList";
import ReservedItemsList from "./Components/RentalManagement/ReservedItemsList/ReservedItemsList";
import RentalReport from "./Components/RentalManagement/RentalReport/RentalReport";
import RentalLayout from "./Components/RentalManagement/Layout";





import DriverDispatcherHome from "./Components/DriverDispatcherManagement/DriverDispatcherHome";
import AddDriverForm from "./Components/DriverDispatcherManagement/AddDriverForm/AddDriverForm";
import UpdateDriverForm from "./Components/DriverDispatcherManagement/UpdateDriverForm/UpdateDriver";

//Himash
import SalesManagement from "./Components/Sales/salesManager/Sales";
import CashierHome from "./Components/Sales/cashier/CashierHome";



// import SearchBar from "./Components/RentalManagement/searchBar/searchBar";

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavHome />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/DashBoard" element={<DashBoard />} />

          <Route
            path="/inventory/*"
            element={
              <InventoryLayout>
                <Routes>
                  <Route exact path="/" element={<InventoryHome />} />
                  <Route exact path="/addnewItem" element={<InventoryForm />} />
                  <Route exact path="/selectedItem/:id" element={<SelectedItem />} />
                  <Route exact path="/editItem/:id" element={<EditInventoryItems />} />
                  <Route exact path="/report1" element={<Report1 />} />
                </Routes>
              </InventoryLayout>}
          />


          <Route exact path='/cart' element={<CartPage cart={cart} />} />
          <Route exact path="/cusOrderSelectedItem/:id" element={<SelectedOrderItem addToCart={addToCart} />} />
          <Route exact path='/deliveryinfo' element={<DeliveryInfoPage />} />
          <Route exact path='/payment' element={<PaymentPage />} />
          <Route exact path='/order' element={<AdminOrdersPage />} />
          <Route exact path="/rating" element={<AdminRatingPage />} />
          <Route exact path="/final" element={<FinalPage />} />
          {<Route exact path="/cusHome" element={<CusHome addToCart={addToCart} />} />}
          <Route exact path="/cusSelectedItem/:id" element={<CusSelectedItem />} />

          {/* sanjuka - routes */}

          <Route
            path="/rentalservice/*"
            element={
              <RentalLayout>
                <Routes>
                  <Route exact path="/" element={<RentalManagement />} />
                  <Route path="/lendedItems" element={<LendedItemsList />} />
                  <Route path="/reserved-items" element={<ReservedItemsList />} />
                  <Route path="/rentalReport" element={<RentalReport />} />
                </Routes>
              </RentalLayout>
            }
          />
          <Route path="/userItemList" element={<UserItemList />} />


          {/* Prabashwara's routes */}
          <Route path="/MapView" element={<MapView />} />
          <Route path="/CreateVehicle" element={<CreateVehicle />} />
          <Route path="/VehicleView" element={<VehicleView />} />
          <Route
            path="/VehicleUpdateDelete/:id"
            element={<VehicleUpdateDelete />}
          />
          <Route path="/DeliveryView" element={<DeliveryView />} />
          <Route path="/CreateDelivery" element={<CreateDelivery />} />
          <Route
            path="/DeliveryUpdateDelete/:id"
            element={<DeliveryUpdateDelete />}
          />
          <Route path="/Orders" element={<Orders />} />
          <Route path="/orderfetchfromorder" element={<Orderfetch />} />
          {/* orderfetch */}
          <Route path="/Deliveryinfofromorder" element={<DeliveryInfo />} />


          <Route path="/driver-dispatcher" element={<DriverDispatcherHome />} />
          <Route path="/driver-dispatcher/AddDriver" element={<AddDriverForm />} />
          <Route path="/driver-dispatcher/:driverId" element={<UpdateDriverForm />} />
          {/* <Route path="/driver-dispatcher/report" element={<Report/>} /> */}


          <Route
            path="/supply-management/*"
            element={
              <Layout>
                <Routes>
                  <Route index element={<SupplyManagementHome />} />
                  <Route path="low-stock-notifications" element={<NotificationPage />} />
                  <Route path="return-items-notifications" element={<ReturnItemsNotifications />} />
                  <Route
                    path="notifications/:id"
                    element={<NotificationDetails />}
                  />
                  <Route
                    path="supplier-management"
                    element={<SupplierList />}
                  />
                  <Route
                    path="purchase-orders"
                    element={<PurchaseOrderList />}
                  />
                  <Route path="return-management" element={<ReturnitemsList />} />
                  <Route path="reports" element={<SupplierList />} />
                </Routes>
              </Layout>
            }
          />

          <Route exact path="/salesManagement" element={<SalesManagement />} />
          <Route exact path="/cashierView" element={<CashierHome />} />

          {/* Duvidu's routes */}
          <Route exact path="/employee" element={<EmployeeHome />} />
          <Route exact path="/addNewEmployee" element={<EmployeeForm />} />
          <Route exact path="/updateEmployee/:id" element={<UpdateEmployeeForm />} />
          <Route exact path="/leaveRequest" element={<LeaveHome />} />
          <Route exact path="/employeereq" element={<EmployeeReq />} />
          <Route exact path="/addNewLeave" element={<LeaveForm />} />
          <Route exact path="//employee/:employeeid/qr" element={<EmployeeQRCode />} />


          <Route exact path="/EmpDash" element={<EmpDashboard />} />
          <Route exact path="/AttHome" element={<AttendanceHome />} />
          <Route exact path="/addAttendance" element={<AttendanceForm />} />
          <Route exact path="/acceptedLeaveRequests" element={<AcceptedLeaveReq />} />
          <Route exact path="/employee/:employeeid/report" element={<EmployeeReport />} />


        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;