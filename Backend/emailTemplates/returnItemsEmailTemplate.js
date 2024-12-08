const returnItemsEmailTemplate = `
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
            <h2>Return Items</h2>
        </div>
        <div class="content">
            <p>Dear [Supplier Name],</p>
            <p>We regret to inform you that we need to return the following items:</p>
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Serial Number</th>
                        <th>Reason for Return</th>
                    </tr>
                </thead>
                <tbody>
                    [Return Items Details]
                </tbody>
            </table>
            <p>We kindly request your assistance in processing the return. Please provide us with instructions on how to proceed with the return process.</p>
            <p>Thank you for your cooperation in this matter.</p>
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

module.exports = { returnItemsEmailTemplate };
