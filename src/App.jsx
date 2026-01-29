import { Routes, Route } from "react-router-dom";

import Landingpage from "./pages/landingpage";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Product from "./pages/product";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Landingpage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/product" element={<Product />} />
    </Routes>
  );
}

export default App;
