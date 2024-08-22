import React, { useEffect, useState } from "react";
import "./enterProducts.css";
import axios from "axios";
// import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import FormModel from "../form/FormModel";
import { useNavigate } from "react-router-dom";


const EnterProducts = () => {
    const apiUrl = "https://server-seven-khaki.vercel.app";


    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [productName, setProductName] = useState('');
    const [productQuantity, setProductQuantity] = useState('');
    const [productPrice, setProductPrice] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/products`);
                setUsers(response.data);
            } catch (error) {
                console.log("Error while fetching data", error);
            }
        };
        fetchData();
    }, []);
    // console.log(users)

    const createProduct = async () => {
        try {
            const productData = {
                name: productName,
                quantity: productQuantity,
                price: productPrice,
            };
            const response = await axios.post(`${apiUrl}/api/products`, productData);
            setUsers((prevUsers) => [...prevUsers, response.data]);
            toast.success('Product created successfully!', { position: 'top-right' });
            setTimeout(() => {
                navigate("/products");
            }, 500);
        } catch (error) {
            console.log('Error creating product', error);
            toast.error('Failed to create product', { position: 'top-right' });
        }
    };


    return (
        <div className="userTable">
            <Toaster />
            <h2>Create Product</h2>
            <FormModel
                productName={productName}
                setProductName={setProductName}
                productQuantity={productQuantity}
                setProductQuantity={setProductQuantity}
                productPrice={productPrice}
                setProductPrice={setProductPrice}
                createProduct={createProduct}
            />
            {/* <form onSubmit={(e) => { e.preventDefault(); createProduct(); }}>
                <input
                    type="text"
                    placeholder="Product Name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Product Quantity"
                    value={productQuantity}
                    onChange={(e) => setProductQuantity(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Product Price"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    required
                />
                <button type="submit">Create Product</button>
            </form> */}

        </div>
    );
};

export default EnterProducts;
