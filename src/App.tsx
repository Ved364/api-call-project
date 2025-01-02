import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Users from "./pages/Users";
import UserDetails from "./pages/UserDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/user/:id" element={<UserDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
