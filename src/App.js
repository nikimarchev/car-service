import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AddCustomer from "./pages/AddCustomer.tsx";
import AllCustomers from "./pages/AllCustomers.tsx";
import CustomerDetails from "./pages/CustomerDetails.tsx";
import NavBar from "./components/NavBar.tsx";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/all-customers" element={<AllCustomers />} />
          <Route exact path="/add-customer" element={<AddCustomer />} />
          <Route path="/customer/:id" element={<CustomerDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
