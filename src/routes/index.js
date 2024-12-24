import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from '../components/Layout/DashboardLayout';
import { PersonalInfo } from '../pages/Profile/PersonalInfo';
import { ChangePassword } from '../pages/Profile/ChangePassword';
import { DriverInfo } from '../pages/Profile/DriverInfo';
import { ShipperInfo } from '../pages/Profile/ShipperInfo';
import { LoadListings } from '../pages/Loads/LoadListings';
import { LoadManagement } from '../pages/Loads/LoadManagement';
import { CreateLoad } from '../pages/Loads/CreateLoad';
import { LoadOffers } from '../pages/Loads/LoadOffers';
import { Users } from '../pages/Admin/Users';
import { Settings } from '../pages/Admin/Settings';
import { DriverOffers } from '../pages/Driver/Offers';
import { Notifications } from '../pages/Notifications';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, checkAccess } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !checkAccess(allowedRoles)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
        <Route element={<DashboardLayout />}>
          <Route path="dashboard">
            {/* Ana Dashboard Sayfası */}
            <Route index element={<div>Dashboard Ana Sayfa</div>} />

            {/* Yük İlanları - Herkes Erişebilir */}
            <Route path="load-listings" element={<LoadListings />} />

            {/* Yük Yönetimi - Sadece Shipper ve Admin */}
            <Route path="loads">
              <Route index element={
                <ProtectedRoute allowedRoles={['shipper', 'admin']}>
                  <LoadManagement />
                </ProtectedRoute>
              } />
              <Route path="create" element={
                <ProtectedRoute allowedRoles={['shipper', 'admin']}>
                  <CreateLoad />
                </ProtectedRoute>
              } />
              <Route path="manage" element={
                <ProtectedRoute allowedRoles={['shipper', 'admin']}>
                  <LoadManagement />
                </ProtectedRoute>
              } />
              <Route path="offers" element={
                <ProtectedRoute allowedRoles={['shipper', 'admin']}>
                  <LoadOffers />
                </ProtectedRoute>
              } />
            </Route>

            {/* Şoför Teklifleri - Sadece Driver ve Admin */}
            <Route path="driver">
              <Route path="offers" element={
                <ProtectedRoute allowedRoles={['driver', 'admin']}>
                  <DriverOffers />
                </ProtectedRoute>
              } />
            </Route>

            {/* Profil Sayfaları */}
            <Route path="profile">
              <Route path="personal" element={<PersonalInfo />} />
              <Route path="password" element={<ChangePassword />} />
              <Route path="driver-info" element={
                <ProtectedRoute allowedRoles={['driver', 'admin']}>
                  <DriverInfo />
                </ProtectedRoute>
              } />
              <Route path="shipper-info" element={
                <ProtectedRoute allowedRoles={['shipper', 'admin']}>
                  <ShipperInfo />
                </ProtectedRoute>
              } />
            </Route>

            {/* Admin Sayfaları */}
            <Route path="admin">
              <Route path="users" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Users />
                </ProtectedRoute>
              } />
              <Route path="settings" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Settings />
                </ProtectedRoute>
              } />
            </Route>

            {/* Ortak Sayfalar */}
            <Route path="notifications" element={<Notifications />} />
          </Route>
        </Route>

        {/* 404 Sayfası */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};