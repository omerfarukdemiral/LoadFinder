import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Welcome } from './pages/Welcome';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { Profile } from './pages/Profile';
import { Loads } from './pages/Loads';
import { Payments } from './pages/Payments';
import { Map } from './pages/Map';
import { Notifications } from './pages/Notifications';
import { Feedback } from './pages/Feedback';
import { Support } from './pages/Support';
import { DashboardLayout } from './components/Layout/DashboardLayout';
import { CreateLoad } from './pages/Loads/CreateLoad';
import { ManageLoads } from './pages/Loads/ManageLoads';
import { LoadOffers } from './pages/Loads/LoadOffers';
import { PersonalInfo } from './pages/Profile/PersonalInfo';
import { ChangePassword } from './pages/Profile/ChangePassword';

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Dashboard Routes - Nested route yapısını düzenledik */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="profile">
          <Route path="personal" element={<PersonalInfo />} />
          <Route path="password" element={<ChangePassword />} />
        </Route>
        <Route path="loads">
          <Route path="create" element={<CreateLoad />} />
          <Route path="manage" element={<ManageLoads />} />
          <Route path="offers" element={<LoadOffers />} />
        </Route>
        <Route path="payments" element={<Payments />} />
        <Route path="map" element={<Map />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="feedback" element={<Feedback />} />
        <Route path="support" element={<Support />} />
      </Route>
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;