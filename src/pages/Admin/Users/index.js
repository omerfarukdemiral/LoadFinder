import { useState } from 'react';
import { FaUsers, FaEdit, FaTrash, FaUserPlus } from 'react-icons/fa';

export const Users = () => {
  const [users, setUsers] = useState([]);

  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'driver': return 'bg-blue-600';
      case 'shipper': return 'bg-green-600';
      case 'admin': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#e0e0e0] font-blinker flex items-center gap-2">
          <FaUsers />
          Kullanıcı Yönetimi
        </h1>
        <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center gap-2">
          <FaUserPlus />
          Yeni Kullanıcı
        </button>
      </div>

      <div className="bg-[#242424] rounded-lg border border-[#333333] overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#2a2a2a]">
            <tr>
              <th className="px-4 py-3 text-left text-gray-400">ID</th>
              <th className="px-4 py-3 text-left text-gray-400">Ad Soyad</th>
              <th className="px-4 py-3 text-left text-gray-400">E-posta</th>
              <th className="px-4 py-3 text-left text-gray-400">Rol</th>
              <th className="px-4 py-3 text-left text-gray-400">Durum</th>
              <th className="px-4 py-3 text-left text-gray-400">Kayıt Tarihi</th>
              <th className="px-4 py-3 text-left text-gray-400">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t border-[#333333] hover:bg-[#2a2a2a]">
                <td className="px-4 py-3 text-gray-300">#{user.id}</td>
                <td className="px-4 py-3 text-gray-300">{user.name}</td>
                <td className="px-4 py-3 text-gray-300">{user.email}</td>
                <td className="px-4 py-3">
                  <span className={`${getRoleBadgeColor(user.role)} text-white text-xs px-2 py-1 rounded-full`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`${user.status === 'active' ? 'bg-green-600' : 'bg-gray-600'} text-white text-xs px-2 py-1 rounded-full`}>
                    {user.status === 'active' ? 'Aktif' : 'Pasif'}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-300">{user.registrationDate}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button className="text-blue-400 hover:text-blue-500">
                      <FaEdit />
                    </button>
                    <button 
                      className="text-red-400 hover:text-red-500"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}; 