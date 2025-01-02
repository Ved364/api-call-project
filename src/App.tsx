import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Users from './pages/Users';
import UserDetails from './pages/UserDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/users' element={<Users />} />
        <Route path='/user/:id' element={<UserDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
