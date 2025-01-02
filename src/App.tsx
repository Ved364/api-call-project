import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import UsersPage from "./pages/UsersPage";
import UserDetailsPage from "./pages/UserDetailsPage";
import UsersList from "./pages/UsersList";
import './styles/userList.css';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/user/:id" element={<UserDetailsPage />} />
        <Route path="/userslist" element={<UsersList />} />
        <Route path="/userslist/:id" element={<UsersList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
