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

function App() {
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
      <Container>
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/enter-products" element={<EnterProducts />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/help" element={<Help />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
          {/* <Route path="/logout" element={<Logout />} /> */}
          {/* Define other routes as needed */}
        </Routes>
      </Container>
    </div>
    // </ThemeProvider>
  );
}

export default App;