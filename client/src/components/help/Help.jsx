import React from 'react';
import './help.css'; // Make sure to create this CSS file for custom styling

const Help = () => {
    return (
        <div className="helpContainer">
            <h1>Help & Support</h1>
            <p>
                Welcome to the Help page for our Warehouse Management System (WMS). Here, you'll find information and resources to assist you in using the system effectively.
            </p>

            <h2>Getting Started</h2>
            <p>
                To get started with our WMS, follow these steps:
            </p>
            <ol>
                <li>Log in to the system using your credentials.</li>
                <li>Navigate to the "Products" section to view and manage your inventory.</li>
                <li>Use the "Add Product" button to add new items to your warehouse.</li>
                <li>Update existing products by selecting them from the list and making the necessary changes.</li>
                <li>Monitor inventory levels and make adjustments as needed.</li>
            </ol>

            <h2>Frequently Asked Questions (FAQs)</h2>
            <div className="faq">
                <h3>How do I add a new product?</h3>
                <p>
                    To add a new product, go to the "Products" section and click on the "Add Product" button. Fill in the required details and click "Submit" to save the product.
                </p>
            </div>
            <div className="faq">
                <h3>How can I update product information?</h3>
                <p>
                    To update product information, select the product from the "Products" list and click on the "Edit" button. Make your changes and click "Submit" to update the product.
                </p>
            </div>
            <div className="faq">
                <h3>What should I do if I encounter an issue?</h3>
                <p>
                    If you encounter any issues, please check the FAQs section or contact our support team for assistance.
                </p>
            </div>

            <h2>Contact Support</h2>
            <p>
                If you need further assistance or have specific questions, don't hesitate to reach out to our support team:
            </p>
            <p>
                <strong>Email:</strong> <a href="mailto:yousefeslam214@gmail.com">support@company.com</a><br />
                <strong>Phone:</strong> +201005307391<br />
                <strong>Support Hours:</strong> Sunday to Thursday, 9 AM - 5 PM (EST)
            </p>
        </div>
    );
};

export default Help;
