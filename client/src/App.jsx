import Header from "./components/Header";
import { Routes, Route} from "react-router-dom";
import PageNotFound from "./pages/404";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Product from "./components/Product";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Dashboard from "./pages/Dashboard";
import ProductForm from "./pages/CreateProduct";

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Header />
            <Home /> <Footer />{" "}
          </>
        }
      />
      <Route
        path="/products"
        element={
          <>
            <Header />
            <Products /> <Footer />
          </>
        }
      />
      <Route
        path="/products/:id"
        element={
          <>
            <Header />
            <Product/> <Footer />
          </>
        }
      />
      <Route
        path="/login"
        element={
          <>
            <Header />
            <Login/>
            <Footer />
          </>
        }
      />
      <Route
        path="/register"
        element={
          <>
            <Header />
            <Register/>
            <Footer />
          </>
        }
      />
      <Route
        path="/cart"
        element={
          <>
            <Header />
            <Cart/>
            <Footer />
          </>
        }
      />
      <Route
        path="/dashboard"
        element={
          <>
            <Header />
            <Dashboard/>
            <Footer />
          </>
        }
      />
      <Route
        path="/create-product"
        element={
          <>
            <Header />
            <ProductForm/>
            <Footer />
          </>
        }
      />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default App;
