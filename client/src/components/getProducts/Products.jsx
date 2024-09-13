import React, { useEffect, useState } from "react";
import "./Products.css";
import axios from "axios";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { FaPen, FaTrash } from "react-icons/fa";
const apiUrl = import.meta.env.VITE_API_URL;

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
  return null;
}

const Products = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [fadeIn, setFadeIn] = useState(false);

  axios.defaults.withCredentials = true;
  const token = getCookie("authToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setFadeIn(false); // Set fadeIn to false to hide the content

        const response = await axios.get(
          `${apiUrl}/api/products?limit=${limit}&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        setUsers(response.data.data.products);
        setLoading(false);

        // Add a slight delay to trigger the fadeIn effect after loading
        setTimeout(() => {
          setFadeIn(true);
        }, 100); // Delay time in milliseconds
      } catch (error) {
        console.log("Error while fetching data", error);
        setError("Error while fetching data. Please try again later.");
        setLoading(false);
      }
    };
    fetchData();
  }, [token, limit, page]);

  const deleteProduct = async (productId) => {
    try {
      const response = await axios.delete(
        `${apiUrl}/api/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers((prevUser) =>
        prevUser.filter((user) => user._id !== productId)
      );
      toast.success(response.data.message, { position: "top-right" });
    } catch (error) {
      console.log(error);
      toast.error("Error while deleting product. Please try again later.", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="userTable">
      <Toaster />
      <h2>Products List</h2>
      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      ) : error ? (
        <div className="error">
          <p>{error}</p>
        </div>
      ) : (
        <div className={`table-container ${fadeIn ? "show" : ""}`}>
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
                  <td>{index + 1 + (page - 1) * limit}</td>
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
          <div className="pagination-controls">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              Previous
            </button>
            <span>Page {page}</span>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={users.length < limit}
            >
              Next
            </button>
          </div>
          <div className="limit-controls">
            <label>
              Limit:
              <select
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
              </select>
            </label>
          </div>
        </div>
      )}
      <div className="enterProductsLink" style={{ marginTop: "20px" }}>
        <Link to="/enter-products">To Enter Products Click Here ...</Link>
      </div>
    </div>
  );
};

export default Products;
