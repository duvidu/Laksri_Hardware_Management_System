const orderRequestEmailTemplate = `
<html>
<head>
    <style>
       
        body {
            font-family: Arial, sans-serif;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
        .header {
            background-color: #f0f0f0;
            padding: 10px;
            border-radius: 5px 5px 0 0;
        }
        .content {
            padding: 20px 0;
        }
        .footer {
            padding-top: 20px;
            border-top: 1px solid #ccc;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        th, td {
            border: 1px solid #ccc;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f0f0f0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Order Request</h2>
        </div>
        <div class="content">
            <p>From: Laksiri Hardware Pvt Ltd</p>
            <p>[Supplier Name],</p>
            <p>We hope this email finds you well. We are reaching out to place an order for some hardware items for our upcoming projects. Kindly find the details of our order below:</p>
            <table>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                        
                    </tr>
                </thead>
                <tbody>
                    [Order Details]
                </tbody>
            </table>
            <br>
            <p><strong>Delivery Information:</strong></p>
            <ul>
                <li>Delivery Address: No 17, Laksiri Hardware Pvt Ltd, Malabe</li>
                <li>Preferred Delivery Date: Within a week</li>
            </ul>
            <br>
            <p><strong>Billing Information:</strong></p>
            <ul>
                <li>Billing Address: No 17, Laksiri Hardware Pvt Ltd, Malabe</li>
                <li>Payment Method: COD</li>
            </ul>
            <br>
            <p>Please provide us with a quotation for the total cost of the order, including any applicable taxes and shipping charges. Additionally, let us know if there are any discounts or promotions available for bulk orders.</p>
            <p>We would appreciate it if you could confirm receipt of this email and provide an estimated delivery timeline.</p>
            <p>Thank you for your prompt attention to this matter. We look forward to doing business with you.</p>
            <br>
            <p>Best regards,</p>
            <p>Supply Manager</p>
            <p>Laksiri Hardware</p>
            <p>laksirihardware@gmail.com</p>
        </div>
        <div class="footer">
            <p>This is an automated email. Please do not reply.</p>
        </div>
    </div>
</body>
</html>
`;

module.exports = { orderRequestEmailTemplate };
