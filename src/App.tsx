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
import About from "./Pages/About";
import { RequireAuth } from "./auth/RequireAuth";
import Resources from "./Pages/Resources";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/about" element={<About />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/resource" element={<Resources />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/how-it-works" element={<HowItWorks />} />

      {/* Dashboard routes */}
      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      />
      <Route
        path="/dashboard/new-delivery"
        element={
          <RequireAuth>
            <NewDelivery />
          </RequireAuth>
        }
      />
      <Route
        path="/dashboard/track"
        element={
          <RequireAuth>
            <TrackPackage />
          </RequireAuth>
        }
      />
      <Route
        path="/dashboard/orders"
        element={
          <RequireAuth>
            <MyOrders />
          </RequireAuth>
        }
      />

      {/* Legacy routes for backward compatibility */}
      <Route
        path="/new-delivery"
        element={
          <RequireAuth>
            <NewDelivery />
          </RequireAuth>
        }
      />
      <Route
        path="/track-package"
        element={
          <RequireAuth>
            <TrackPackage />
          </RequireAuth>
        }
      />
      <Route
        path="/my-orders"
        element={
          <RequireAuth>
            <MyOrders />
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default App;
