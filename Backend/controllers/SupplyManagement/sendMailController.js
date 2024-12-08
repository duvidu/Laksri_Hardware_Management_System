const nodemailer = require("nodemailer");
require('dotenv').config();
const { orderRequestEmailTemplate } = require('../../emailTemplates/purchaseOrderEmailTemplate')
const { returnItemsEmailTemplate } = require('../../emailTemplates/returnItemsEmailTemplate')

const sendEmail = async (recipient, subject, html) => {

    //text = orderRequestEmailTemplate;

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.USER,
                pass: process.env.APP_PASSWORD,
            },
        });

        const mailOptions = {
            from: {
                name: 'Ishara Umayangana',
                address: process.env.USER
            },
            to: recipient,
            subject: subject,
            html: html,
        };

        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${recipient}`);
    } catch (error) {
        console.error(`Failed to send email to ${recipient}:`, error);
        throw error; // Throw the error to handle it outside
    }
};

const sendLowStocksMail = async (req, res) => {
    try {
        const currentDate = new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Colombo' });
        const { notifications } = req.body;

        // Group notifications by supplier
        const ordersBySupplier = {};
        notifications.forEach(notification => {
            notification.suppliers.forEach(supplier => {
                const supplierEmail = supplier.contact.email;
                const supplierName = supplier.name;
                if (supplierEmail) {
                    if (!ordersBySupplier[supplierEmail]) {
                        ordersBySupplier[supplierEmail] = [];
                    }
                    ordersBySupplier[supplierEmail].push({ order: notification, supplierName });
                }
            });
        });

        // Send email to each supplier with their orders
        for (const [supplierEmail, orders] of Object.entries(ordersBySupplier)) {
            // Create order details for the email
            const orderDetails = orders.map(order => `
            <tr>
                <td>${order.order.name}</td>
                <td>${order.order.quantity}</td>
                
            </tr>
        `).join('');

            
            
            // Generate HTML content using the email template
            let html = orderRequestEmailTemplate.replace("[Date]", currentDate);

            // Replace the supplier name placeholder for each unique supplier
            html = html.replace("[Supplier Name]", orders[0].supplierName);


            // Replace the order details placeholder
            html = html.replace("[Order Details]", orderDetails);
            // Send email to supplier
            await sendEmail(supplierEmail, "Order Request", html);
        }

        res.sendStatus(200);
    } catch (error) {
        console.error("Failed to send emails:", error);
        res.sendStatus(500); // Send appropriate HTTP status code in case of failure
    }
};

const sendReturnItemsMail = async (req, res) => {
    try {
        const currentDate = new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Colombo' });
        const { notifications } = req.body;

        // Group notifications by supplier
        const ordersBySupplier = {};
        notifications.forEach(notification => {
            notification.suppliers.forEach(supplier => {
                const supplierEmail = supplier.contact.email;
                const supplierName = supplier.name;
                if (supplierEmail) {
                    if (!ordersBySupplier[supplierEmail]) {
                        ordersBySupplier[supplierEmail] = [];
                    }
                    ordersBySupplier[supplierEmail].push(notification);
                }
            });
        });

        // Send email to each supplier with their return items
        for (const [supplierEmail, notifications] of Object.entries(ordersBySupplier)) {
            // Create return items details for the email
            const returnItemsDetailsHTML = notifications.map(notification => {
                const { name, serialNumber, returnType, description } = notification;
                const productName = name.name;
                return `
                    <tr>
                        ${notification === notifications[0] ? `<td rowspan="${notifications.length}">${productName}</td>` : ""}
                        ${notification === notifications[0] ? `<td rowspan="${notifications.length}">${notifications.length}</td>` : ""}
                        <td>${serialNumber}</td>
                        <td>${returnType}</td>
                       
                    </tr>
                `;
            }).join('');

            // Generate HTML content using the return items email template
            let html = returnItemsEmailTemplate;

            // Replace the supplier name placeholder for each unique supplier
            html = html.replace("[Supplier Name]", notifications[0].suppliers[0].name);

            // Replace the return items details placeholder
            html = html.replace("[Return Items Details]", returnItemsDetailsHTML);

            // Send email to supplier
            await sendEmail(supplierEmail, "Return Items", html);
        }

        res.sendStatus(200);
    } catch (error) {
        console.error("Failed to send emails:", error);
        res.sendStatus(500); // Send appropriate HTTP status code in case of failure
    }
};







module.exports = { sendLowStocksMail, sendReturnItemsMail };
