import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RegistrationConfirmation from './pages/RegistrationConfirmation';
import ImageGenerator from './pages/ImageGenerator';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import Shop from './pages/Shop';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration-success" element={<RegistrationConfirmation />} />
        <Route path="/image" element={<ImageGenerator />} />
        <Route path="/shop" element={<Shop />} />
        
        {/* Auth Route */}
        <Route path="/arety/admin/login" element={<AdminLogin />} />
        
        {/* Protected Dashboard */}
        <Route element={<AdminProtectedRoute />}>
           <Route path="/arety/admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
  );
}

export default App;
