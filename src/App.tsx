import "./App.css";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import NotFound from "./Pages/NotFound";
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
import ResourceDetails from "./Pages/ResourceDetails";
import Support from "./Pages/Support";
import SupportArticle from "./Pages/SupportArticle";
import SupportCategory from "./Pages/SupportCategory";
import SuccessStory from "./Pages/SuccessStory";
import Articles from "./Pages/Articles";
import Article from "./Pages/Article";
import HaulWithUs from "./Pages/HaulWithUs";
import Privacy from "./Pages/Privacy";
import Terms from "./Pages/Terms";
import Security from "./Pages/Security";
import Shipping from "./Pages/Shipping";
import Fulfilment from "./Pages/Fulfilment";
import Tracking from "./Pages/Tracking";
import Solutions from "./Pages/Solutions";
import SupportBot from "./components/support/SupportBot";
import RouteSplash from "./components/loader/RouteSplash";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <RouteSplash delayMs={500} label="Loading...">
              <Home />
            </RouteSplash>
          }
        />
        <Route path="/services" element={<Services />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/fulfilment" element={<Fulfilment />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/about" element={<About />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/resource" element={<Resources />} />
        <Route path="/resources/:id" element={<ResourceDetails />} />
        <Route path="/resource/:id" element={<ResourceDetails />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/blog" element={<Articles />} />
        <Route path="/articles/:id" element={<Article />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/security" element={<Security />} />
        <Route path="/support" element={<Support />} />
        <Route path="/haul-with-us" element={<HaulWithUs />} />
        <Route path="/support/categories/:id" element={<SupportCategory />} />
        <Route path="/support/articles/:id" element={<SupportArticle />} />
        <Route path="/success-stories/:id" element={<SuccessStory />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
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

        <Route path="*" element={<NotFound />} />
      </Routes>

      <SupportBot />
    </>
  );
}

export default App;
