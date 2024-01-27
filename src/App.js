import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./utils/Context";
// import Header from "./components/Header/Header";
// import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Category from "./components/Category/Category";
import SingleProduct from "./components/SingleProduct/SingleProduct";
// import Newsletter from "./components/Footer/Newsletter/Newsletter";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import PrivateRoutes from "./utils/PrivateRoutes";
import ContactUs from "./components/Detail/ContactUs";
import AboutUs from "./components/Detail/AboutUs";
import ShippingAddress from "./components/Order/ShippingAddress";
import OrderDetail from "./components/Order/OrderDetail";
import ReadMore from "./components/Home/Banner/ReadMore";
import Header from "./components/Header/Header";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        {/* <Header /> */}
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route element={<Home />} path="/" exact />
            <Route element={<Category />} path="/category/:id" />
            <Route element={<SingleProduct />} path="/product/:id" />
          </Route>
          <Route element={<Header />} path="/header" />
          <Route element={<Login />} path="/login" />
          <Route element={<Register />} path="/register" />
          <Route element={<ContactUs />} path="/contactUs" />
          <Route element={<AboutUs />} path="/aboutUs" />
          <Route element={<ShippingAddress />} path="/shippingAddress" />
          <Route element={<OrderDetail />} path="/orderDetail" />
          <Route element={<ReadMore />} path="/readMore" />
        </Routes>
        {/* <Newsletter /> */}
        {/* <Footer /> */}
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
