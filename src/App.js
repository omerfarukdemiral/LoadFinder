import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Welcome } from './pages/Welcome';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
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
import { RoleSelection } from './pages/Register/RoleSelection';
import { DriverInfo } from './pages/Profile/DriverInfo';
import { ShipperInfo } from './pages/Profile/ShipperInfo';
import { LoadListings } from './pages/Loads/LoadListings';
import { Users } from './pages/Admin/Users';
import { Settings } from './pages/Admin/Settings';
import { DriverOffers } from './pages/Driver/Offers';
import { useEffect } from 'react';
import SystemCheck from './utils/systemCheck';

const AppRoutes = () => {
  const { user } = useAuth();

  const AdminRoute = ({ children }) => {
    if (user?.role !== 'admin') {
      return <Navigate to="/dashboard" />;
    }
    return children;
  };

  const DriverRoute = ({ children }) => {
    if (user?.role !== 'driver' && user?.role !== 'admin') {
      return <Navigate to="/dashboard" />;
    }
    return children;
  };

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/register/role-selection" element={<RoleSelection />} />
      
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="profile">
          <Route path="personal" element={<PersonalInfo />} />
          <Route path="password" element={<ChangePassword />} />
          <Route path="driver-info" element={<DriverInfo />} />
          <Route path="shipper-info" element={<ShipperInfo />} />
        </Route>
        <Route path="loads">
          <Route path="create" element={<CreateLoad />} />
          <Route path="manage" element={<ManageLoads />} />
          <Route path="offers" element={<LoadOffers />} />
        </Route>
        <Route path="driver">
          <Route path="offers" element={
            <DriverRoute>
              <DriverOffers />
            </DriverRoute>
          } />
        </Route>
        <Route path="admin">
          <Route path="users" element={
            <AdminRoute>
              <Users />
            </AdminRoute>
          } />
          <Route path="settings" element={
            <AdminRoute>
              <Settings />
            </AdminRoute>
          } />
        </Route>
        <Route path="payments" element={<Payments />} />
        <Route path="map" element={<Map />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="feedback" element={<Feedback />} />
        <Route path="support" element={<Support />} />
        <Route path="load-listings" element={<LoadListings />} />
      </Route>
    </Routes>
  );
};

function App() {
  useEffect(() => {
    const checkSystem = async () => {
      console.log('Sistem kontrolü başlatılıyor...');
      try {
        const status = await SystemCheck.performHealthCheck();
        console.log('%cSistem kontrolü tamamlandı:', 'color: green; font-weight: bold', status);
      } catch (error) {
        console.error('%cSistem kontrolü başarısız:', 'color: red; font-weight: bold', error);
      }
    };

    checkSystem();
  }, []);

  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;