//index.js
require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')


const registerRouter = require('./routes/LoginRegisterDashboard/registerRouter');
const authRoutes = require('./routes/LoginRegisterDashboard/authRoutes');
const authDashboard = require('./routes/LoginRegisterDashboard/authDashboard');
const inventoryRoutes = require('./routes/inventory');
const orderRoutes = require('./routes/order');
const cartRoutes = require('./routes/cart')
const deliveryInfoRoutes = require('./routes/deliveryInfo')
const feedbackRoutes = require('./routes/productFeedback');
const productCategoryRoutes = require('./routes/productCategories');
const ratingRoutes = require('./routes/ratings')
const returnItemRouts = require('./routes/returnItem');
const productBrands = require('./routes/productBrands');

const lowStockNotifications = require('./routes/SupplyManagementRoutes/lowStockRoutes');
const supplierManagementRoutes = require('./routes/SupplyManagementRoutes/SupplierManagementRoutes');
const purchaseOrderRoutes = require('./routes/SupplyManagementRoutes/PurchaseOrdersRoutes');
const sendMailRoutes = require('./routes/SupplyManagementRoutes/sendMailRoutes')
const returnItemsRoutes = require('./routes/SupplyManagementRoutes/returnItemsRoutes')

const CreatevehicleRoutes = require('./routes/DeliveryManagementRoutes/VehicleRoutes/CreateVehicleRoute');
const VehicleViewRoutes = require('./routes/DeliveryManagementRoutes/VehicleRoutes/VehicleViewRoute');
const GetVehicleRoutes = require('./routes/DeliveryManagementRoutes/VehicleRoutes/GetVehicleRoutes');
const VehicleUpdateDeleteRoutes = require('./routes/DeliveryManagementRoutes/VehicleRoutes/UpdateAndDeleteRoutes');
const VehicleAvailabilityRoutes = require('./routes/DeliveryManagementRoutes/VehicleRoutes/VehicleAvailabilityRoutes');
const ViewDeliveryRoute = require('./routes/DeliveryManagementRoutes/DeliveryRoutes/ViewDeliveryRoute');
const CreateVehicleRoute = require('./routes/DeliveryManagementRoutes/DeliveryRoutes/CreateDeliveryRoutes');
const GetDeliveryRoutes = require('./routes/DeliveryManagementRoutes/DeliveryRoutes/GetDeliveryRoute');
const DeliveryUpdateDeleteRoutes = require('./routes/DeliveryManagementRoutes/DeliveryRoutes/UpdateAndDeleteRoutes');

const DeliveryInfoRoutesfromOrders = require('./routes/DeliveryManagementRoutes/DeliveryRoutes/DeliveryInfoRoutesFromOrders');


const employeeRoutes = require('./routes/employees');
const leaveRoutes = require('./routes/leaves');
const attendanceRoutes = require('./routes/attendance');
const accleaveRoutes = require('./routes/accleaves');

const driverDispatcherRoutes = require('./routes/DriverDispatcherRoutes/DriverDispatcherRoutes')

const SalesRoutes = require('./routes/SalesRoutes');





const { copyInventoryToOrderItems } = require('./controllers/orderController');

const app = express()


//middleware
app.use(express.json());
app.use(cors({ 
    origin: ['http://localhost:5173'],
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    credentials: true
}));
app.use(cookieParser());
app.use(express.static('upload'))

//Prabashwara's Apis
app.use('/register', registerRouter);
app.use('/', authRoutes);
app.use('/dashboard', authDashboard);

//Inventory Manager's Api
app.use('/inventory', inventoryRoutes);
app.use('/brands',productBrands);
app.use('/returnItem',returnItemRouts);
app.use('/categories',productCategoryRoutes);

//Navishka's API
app.use('/order', orderRoutes); 
app.use('/cart',cartRoutes)
app.use('/deliveryinfo', deliveryInfoRoutes);
app.use('/ratings', ratingRoutes);




app.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ Status: true })
})

//Supply Manager Api's
app.use('/supply-management/suppliers', supplierManagementRoutes);
app.use('/supply-management/purchase-orders', purchaseOrderRoutes);
app.use('/supply-management/sendMail', sendMailRoutes);
app.use('/supply-management/returnItems', returnItemsRoutes);
app.use('/supply-management', lowStockNotifications);














//Rental - routes
const itemsRouter = require('./routes/RentalManagementRoutes/items');
const lendedItemsRouter = require('./routes/RentalManagementRoutes/lendedItems');
const userItemListRouter = require('./routes/RentalManagementRoutes/userItemList');
const reservedItemsRouter = require("./routes/RentalManagementRoutes/reservedItems");
const rentalReportRoutes = require('./routes/RentalManagementRoutes/rentalReports');

app.use('/items', itemsRouter); 
app.use('/lendedItems', lendedItemsRouter);
app.use('/userItemList', userItemListRouter);
app.use("/reservedItems", reservedItemsRouter);
app.use('/rentalReport', rentalReportRoutes); 

app.use('/sale',SalesRoutes);



//-----------------------------------------------------------------------------------------------------------------------------------------------------//

////Prabashwara's API's
///Vehicle Database


//Create Vehicle
app.use('/CreateVehicle', CreatevehicleRoutes);

//View Vehicles
app.use('/VehicleView' , VehicleViewRoutes);

//Get Vehicle ID for Update
app.use('/getVehicle' , GetVehicleRoutes);

//Update  Vehicle data
app.use('/VehicleUpdateDelete' , VehicleUpdateDeleteRoutes);

// Delete Vehicle data
app.use('/VehicleDelete' , VehicleViewRoutes);

// Route to update vehicle availability by ID
app.put('/VehicleUpdateDelete', VehicleAvailabilityRoutes);


///DeliveryDatabase
//Create Delivery
app.use('/CreateDelivery', CreateVehicleRoute);

//View Delivery
app.use('/DeliveryView', ViewDeliveryRoute);

//Get Delivery ID for Update
app.use('/getDelivery', GetDeliveryRoutes);

//Delivery Update  
app.use('/DeliveryUpdateDelete', DeliveryUpdateDeleteRoutes);

//Get Delivery ID for Delete
app.use('/DeliveryDelete', DeliveryUpdateDeleteRoutes);

app.use('/Deliveryinfofromorder', DeliveryInfoRoutesfromOrders);

//Delete Deliveryinfofromorder data

app.use('/DeleteDeliveryinfofromorder', DeliveryInfoRoutesfromOrders);




//-----------------------------------------------------------------------------------------------------------------------------------------------------//

app.use('/driver-dispatcher', driverDispatcherRoutes);

app.use('/driver-dispatcher', driverDispatcherRoutes);


//Duvidu's Api
app.use('/employees',employeeRoutes)
app.use('/leaves',leaveRoutes)
app.use('/attendance',attendanceRoutes)
app.use('/accleaves',accleaveRoutes)

app.use((req, res, next)=> {
    console.log(req.path, req.method)
    next()
})


//Database connection
mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        
        //Server setup
        app.listen(process.env.PORT, () => {
            console.log('Connected to db and listening to port ', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })
