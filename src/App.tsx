import "./App.css";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import NewDelivery from "./Pages/NewDelivery";
import TrackPackage from "./Pages/TrackPackage";
import MyOrders from "./Pages/MyOrders";
import { Routes, Route } from "react-router-dom";
import Services from "./Pages/Services";
import HowItWorks from "./Pages/HowItWorks";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/new-delivery" element={<NewDelivery />} />
      <Route path="/track-package" element={<TrackPackage />} />
      <Route path="/my-orders" element={<MyOrders />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
    </Routes>
  );
}

export default App;
