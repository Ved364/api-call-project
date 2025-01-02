import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Users from "./pages/Users";
import UserDetails from "./pages/UserDetails";
import UsersList from "./pages/UsersList";
import './styles/userList.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/user/:id" element={<UserDetails />} />
        <Route path="/userslist" element={<UsersList />} />
        <Route path="/userslist/:id" element={<UsersList />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
