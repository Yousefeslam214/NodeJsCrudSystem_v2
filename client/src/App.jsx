import "./App.css";
// import AddUser from "./adduser/AddUser";
import Products from "./components/getProducts/Products";
import About from "./components/about/About";
import Navbar from "./components/navbar/Navbar";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import Update from "./updateuser/Update";
import { Route, Routes } from 'react-router-dom';
import { Box, Container } from "@mui/material";
import EnterProducts from "./components/enterProducts/EnterProducts"
import Update from './components/updateProduct/Update'
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import Help from "./components/help/Help";
import SignUp from './components/user/SignUp';
import Login from './components/user/Login';
import NetworkStatus from "./components/user/NetworkStatus";
import Profile from "./components/user/profile/Profile";
import { useDispatch } from 'react-redux';

import { fetchUserData } from './redux/userSlice'; // Import the thunk action
import { useEffect } from "react";
import { getCookie } from './components/global/cookieUtils/cookieUtils'
import Register from "./components/user/register/Register";
import ProfileForm from "./components/user/profile/ProfileForm";

function App() {
  const dispatch = useDispatch();
  // cookieUtils()
  // console.log(getCookie("authToken"))

  useEffect(() => {
    // const userId = getCookie('userId'); // Fetch user ID from cookies
    // const cookieToken = getCookie('authToken'); // Fetch token from cookies
    // Automatically fetch user data with a specific user ID
    dispatch(fetchUserData({
      // userId: '66cfe281ee84f7500051acd1', // Replace with actual user ID
      // cookieToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJnbWFpbCI6ImpvaG5kc3Nvc3NlMzlAZ21haWwuY29tIiwiaWQiOiI2NmNmZTI4MWVlODRmNzUwMDA1MWFjZDEiLCJyb2xlIjoiTUFOQUdFUiIsImlhdCI6MTcyNTY5NjE3MSwiZXhwIjoxNzI1Njk5NzcxfQ.-lbe81YtuHUAB_FmFiiWg8tfsTHzbeFwIhmLAJHwPmA', // Replace with actual token
      userId: getCookie("userId"), // Replace with actual user ID
      cookieToken: getCookie("authToken"), // Replace with actual token
    }));
    // if (userId && cookieToken) {
    //   dispatch(fetchUserData({ userId, cookieToken }));
    // } else {
    //   console.error('User ID or auth token missing');
    // }
  }, [dispatch]);
  // const route = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <About />,
  //   },
  //   {
  //     path: "/products",
  //     element: <User />,
  //   },
  //   // {
  //   //   path: "/add",
  //   //   element: <AddUser />,
  //   // },
  //   // {
  //   //   path: "/update/:id",
  //   //   element: <Update />,
  //   // },
  // ]);
  return (
    // <ThemeProvider theme={theme}>


    <div className="App">

      <Navbar />

      <NetworkStatus />
      <Container>

        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/enter-products" element={<EnterProducts />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/help" element={<Help />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/update" element={<ProfileForm />} />
          {/* <Route path="/logout" element={<Logout />} /> */}
          {/* Define other routes as needed */}
        </Routes>
      </Container>
    </div>
    // </ThemeProvider>
  );
}

export default App;
