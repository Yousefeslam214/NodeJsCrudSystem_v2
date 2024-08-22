import React, { useEffect, useState } from "react";
import "./Products.css";
import axios from "axios";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { FaPen, FaTrash } from "react-icons/fa";

const Products = () => {
  // const apiUrl = "https://server-seven-khaki.vercel.app";
  const apiUrl = "http://localhost:5002"

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/products`, {
          withCredentials: true,
        });
        console.log(response.data);
        setUsers(response.data.data.products); // Access the products array
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.log("Error while fetching data", error);
        setError("Error while fetching data. Please try again later."); // Set error message
        setLoading(false); // Set loading to false even if there is an error
      }
    };
    fetchData();
  }, []);

  const deleteProduct = async (productId) => {
    try {
      const response = await axios.delete(`${apiUrl}/api/products/${productId}`, {
        withCredentials: true,
      });
      setUsers((prevUser) => prevUser.filter((user) => user._id !== productId));
      toast.success(response.data.message, { position: "top-right" });
    } catch (error) {
      console.log(error);
      toast.error("Error while deleting product. Please try again later.", { position: "top-right" });
    }
  };

  return (
    <div className="userTable">
      <Toaster />
      <h2>Products List</h2>
      {loading ? (
        <div className="loading">
          <div className="spinner"></div> {/* Loading spinner */}
        </div>
      ) : error ? (
        <div className="error">
          <p>{error}</p>
        </div>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Index</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.quantity}</td>
                <td>{user.price}</td>
                <td className="actionButtons">
                  <div className="actionButtonsContainer">
                    <Link
                      to={`/update/${user._id}`}
                      className="btn btn-info"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <button className="btn btn-info">
                        <FaPen />
                      </button>
                    </Link>
                    <button
                      onClick={() => deleteProduct(user._id)}
                      type="button"
                      className="btn-danger"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="enterProductsLink" style={{ marginTop: "20px" }}>
        <Link to="/enter-products">To Enter Products Click Here ...</Link>
      </div>
    </div>
  );
};

export default Products;
