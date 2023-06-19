import "bootstrap/dist/css/bootstrap.min.css";
import "@flaticon/flaticon-uicons/css/all/all.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Fragment, useEffect } from "react";
import AdminSideBar from "./js/components/layouts/AdminSlideBar";
import "./css/main.css";
import DashboardSection from "./js/components/pages/DashBoardSection";
import LoginPageSection from "./js/components/pages/LoginPageSection";
import Toaster from "./js/components/layouts/Toaster";
import store from "./reduxState"
import { GetAdminProfileAction } from "./js/Actions/AuthenticationAction";
import ProtectedRoute from "./js/components/Utils/ProtectedRoute";
import OrdersSection from "./js/components/pages/OrdersSection";
import SingleOrderSection from "./js/components/pages/SingleOrderSection";
import CustommerSection from "./js/components/pages/CustommersSection";
import ProductSection from "./js/components/pages/ProductSection";
import CreateProductSection from "./js/components/pages/CreateProductSection";
import UpdateProductSection from "./js/components/pages/UptdateProductSection";

function App() {


  useEffect(()=>{
    store.dispatch(GetAdminProfileAction)
  })
  return (
    <Fragment>
      <div className="App">
        <Router>
          <HelmetProvider>
            <AdminSideBar/>
            <Routes>
              <Route path="/admin/login" element={<LoginPageSection/>} />

              {/* Protected Route */}
              <Route path="/" element={<ProtectedRoute admin={'admin'}><DashboardSection/></ProtectedRoute>} />
              <Route path="/admin/orders" element={<ProtectedRoute admin={"admin"}><OrdersSection/></ProtectedRoute>} />
              <Route path="/admin/order/details/:id" element={<ProtectedRoute admin={'admin'}><SingleOrderSection/></ProtectedRoute>} />
              <Route path="/admin/customers" element={<ProtectedRoute admin={'admin'}><CustommerSection/></ProtectedRoute>} />
              <Route path="/admin/products" element={<ProtectedRoute admin={'admin'}><ProductSection/></ProtectedRoute>} />
              <Route path="/admin/create/product" element={<ProtectedRoute admin={'admin'}><CreateProductSection/></ProtectedRoute>} />
              <Route path="/admin/update/:id" element={<ProtectedRoute admin={'admin'}><UpdateProductSection/></ProtectedRoute>} />
            </Routes>
            <Toaster/>
          </HelmetProvider>
        </Router>
      </div>
    </Fragment>
  );
}

export default App;
