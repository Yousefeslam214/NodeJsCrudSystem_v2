import React, { useEffect, useState } from "react";
import "./update.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import toast, { Toaster } from "react-hot-toast";
import FormModel from "../form/FormModel";
const apiUrl = import.meta.env.VITE_API_URL;




const Update = () => {
  // const apiUrl = "https://server-seven-khaki.vercel.app";

  const initialUser = {
    name: "",
    quantity: "",
    price: "",
  };
  const [user, setUser] = useState(initialUser);
  const navigate = useNavigate();
  const { id } = useParams();
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/products/${id}`, {
        withCredentials: true,
        headers: {
          // Add any required headers here
        },
      })
      .then((response) => {
        // console.log(response.data.data.product)
        setUser(response.data.data.product);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  // const submitForm = async (e) => {
  //  e.preventDefault();
  //  try {
  //   const response = await axios.put(`http://localhost:5002/api/products/${id}`, user);
  //   toast.success(response.data.message, { position: "top-right" });
  //   navigate("/products");
  //  } catch (error) {
  //   console.log("Error updating product", error);
  //  }
  // };

  const updateProduct = async () => {
    try {

      const response = await axios.put(`${apiUrl}/api/products/${id}`, user);

      // setUsers((prevUsers) => [...prevUsers, response.data]);
      toast.success('Product Updated successfully!', { position: 'top-right' });

      setTimeout(() => {
        navigate("/products");
      }, 500);
    } catch (error) {
      console.log('Error creating product', error);
      toast.error('Failed to create product', { position: 'top-right' });
    }
  };

  return (
    <div className="updateProduct">
      {/* <Link to="/" className="btn btn-secondary">
    <i className="fa-solid fa-backward"></i> Back
   </Link> */}

      {/* <form
    className="updateProductForm"
    onSubmit={submitForm}
   >
    <div
     className="inputGroup" >
     <label htmlFor="name">Name:</label>
     <input
      type="text"
      id="name"
      value={user.name}
      onChange={inputHandler}
      name="name"
      autoComplete="off"
      placeholder="Enter product name"
     />
    </div>
    <div className="inputGroup">
     <label htmlFor="quantity">Quantity:</label>
     <input
      type="number"
      id="quantity"
      value={user.quantity}
      onChange={inputHandler}
      name="quantity"
      autoComplete="off"
      placeholder="Enter product quantity"
     />
    </div>
    <div className="inputGroup">
     <label htmlFor="price">Price:</label>
     <input
      type="number"
      id="price"
      value={user.price}
      onChange={inputHandler}
      name="price"
      autoComplete="off"
      placeholder="Enter product price"
     />
    </div>
    <div className="inputGroup">
     <button type="submit" className="btn btn-primary">
      Submit
     </button>
    </div>
   </form> */}
      <div className="userTable">
        <Toaster />

        <h2>Update Product</h2>
        <FormModel
          productName={user.name}
          setProductName={(name) => setUser((prevUser) => ({ ...prevUser, name }))}
          productQuantity={user.quantity}
          setProductQuantity={(quantity) => setUser((prevUser) => ({ ...prevUser, quantity }))}
          productPrice={user.price}
          setProductPrice={(price) => setUser((prevUser) => ({ ...prevUser, price }))}
          createProduct={updateProduct}
        />
      </div>
    </div>
  );
};

export default Update;

