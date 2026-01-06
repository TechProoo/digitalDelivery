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
import Contact from "./Pages/Contact";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/how-it-works" element={<HowItWorks />} />

      {/* Dashboard routes */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/new-delivery" element={<NewDelivery />} />
      <Route path="/dashboard/track" element={<TrackPackage />} />
      <Route path="/dashboard/orders" element={<MyOrders />} />

      {/* Legacy routes for backward compatibility */}
      <Route path="/new-delivery" element={<NewDelivery />} />
      <Route path="/track-package" element={<TrackPackage />} />
      <Route path="/my-orders" element={<MyOrders />} />
    </Routes>
  );
}

export default App;
