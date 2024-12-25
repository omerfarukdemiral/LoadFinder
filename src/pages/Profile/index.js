import { useAuth } from '../../contexts/AuthContext';
import { DriverInfo } from './DriverInfo';
import { ShipperInfo } from './ShipperInfo';

export const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#e0e0e0] font-blinker">Profil</h1>
      {user?.role === 'driver' ? <DriverInfo /> : <ShipperInfo />}
    </div>
  );
};