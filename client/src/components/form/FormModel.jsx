// Form.js
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import styled from 'styled-components';


const FormModel = ({ productName, setProductName, productQuantity, setProductQuantity, productPrice, setProductPrice, createProduct }) => {
    return (
        <form onSubmit={(e) => { e.preventDefault(); createProduct(); }}>

            < input
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
            <button type="submit">Submit Product</button>
        </form >
    );
};


FormModel.propTypes = {
    productName: PropTypes.string.isRequired,
    setProductName: PropTypes.func.isRequired,
    productQuantity: PropTypes.string.isRequired,
    setProductQuantity: PropTypes.func.isRequired,
    productPrice: PropTypes.string.isRequired,
    setProductPrice: PropTypes.func.isRequired,
    createProduct: PropTypes.func.isRequired,
};

export default FormModel;
