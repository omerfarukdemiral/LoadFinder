import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from '../components/Layout/DashboardLayout';
import { PersonalInfo } from '../pages/Profile/PersonalInfo';
import { ChangePassword } from '../pages/Profile/ChangePassword';
// ... diğer importlar

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<DashboardLayout />}>
          {/* ... diğer dashboard route'ları ... */}
          
          {/* Profile Routes */}
          <Route path="profile">
            <Route path="personal" element={<PersonalInfo />} />
            <Route path="password" element={<ChangePassword />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};