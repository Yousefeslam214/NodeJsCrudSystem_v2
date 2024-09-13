import React, { useEffect, useState } from "react";
import "./enterProducts.css";
import axios from "axios";
// import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import FormModel from "../form/FormModel";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;


function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
  return null;
}



const EnterProducts = () => {
  // const apiUrl = "https://server-seven-khaki.vercel.app";
  const token = getCookie('authToken'); // Assume token is stored in localStorage


  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [productName, setProductName] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [productPrice, setProductPrice] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/products`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
          withCredentials: true,
        });
        setUsers(response.data);
      } catch (error) {
        console.log("Error while fetching data", error);
      }
    };
    fetchData();
  }, [token]);

  const createProduct = async () => {
    try {
      const productData = {
        name: productName,
        quantity: productQuantity,
        price: productPrice,
      };
      // const response = await axios.post(`${apiUrl}/api/products`, productData);
      const response = await axios.post(`${apiUrl}/api/products`, productData, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
        withCredentials: true,
      });
      // console.log(response.data.data.p)
      // setUsers((prevUsers) => [...prevUsers, response.data]);
      setUsers((prevUsers) => {
        console.log('Previous users:', prevUsers); // Log previous state
        return Array.isArray(prevUsers) ? [...prevUsers, response.data] : [response.data];
      });
      toast.success('Product created successfully!', { position: 'top-right' });
      setTimeout(() => {
        navigate("/products");
      }, 500);
    } catch (error) {
      console.log('Error creating product', error);
      // console.log('Error creating product because you are ', error.request.statusText);
      toast.error(`Failed to create product because you are ${error.request.statusText} please login again`, { position: 'top-right' });
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
