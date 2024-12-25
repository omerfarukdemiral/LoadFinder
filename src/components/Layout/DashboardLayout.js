import { useState } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { 
  FaHome, FaUser, FaTruck, FaMoneyBill, FaMap, 
  FaBell, FaStar, FaHeadset, FaCog, FaSignOutAlt,
  FaBars, FaChevronDown, FaChevronRight, FaPlus,
  FaList, FaInbox, FaKey, FaUserCircle, FaBuilding, 
  FaClipboardList, FaHandshake, FaUsers, FaUserCog
} from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { Logo } from '../common/Logo';
import profileImage from '../../assets/images/ofd.jpeg';
import { Profile } from '../../pages/Profile';
import { MOCK_USERS_DETAILED } from '../../constants/mockData';

const getQuickMenuItems = (user) => {
  const baseMenuItems = [
    { path: '/dashboard', icon: <FaHome />, title: 'Dashboard' },
    { path: '/dashboard/load-listings', icon: <FaClipboardList />, title: 'Yük İlanları' },
  ];

  // Shipper ve Admin için Yük Yönetimi menüsü
  if (user?.role === 'shipper' || user?.role === 'admin') {
    baseMenuItems.push({
      path: '/dashboard/loads',
      icon: <FaTruck />,
      title: 'Yük Yönetimi',
      subItems: [
        { path: '/dashboard/loads/create', icon: <FaPlus />, title: 'İlan Oluştur' },
        { path: '/dashboard/loads/manage', icon: <FaList />, title: 'İlanlarım' },
        { path: '/dashboard/loads/offers', icon: <FaInbox />, title: 'Gelen Teklifler' },
      ]
    });
  }

  // Driver için Teklifler menüsü
  if (user?.role === 'driver' || user?.role === 'admin') {
    baseMenuItems.push({
      path: '/dashboard/driver/offers',
      icon: <FaHandshake />,
      title: 'Tekliflerim'
    });
  }

  // Ortak menü öğeleri
  baseMenuItems.push(
    { path: '/dashboard/payments', icon: <FaMoneyBill />, title: 'Ödeme Sistemi' },
    { path: '/dashboard/map', icon: <FaMap />, title: 'Harita' },
    { path: '/dashboard/notifications', icon: <FaBell />, title: 'Bildirimler' },
    {
      path: '/dashboard/profile',
      icon: <FaUser />,
      title: 'Profil',
      subItems: [
        { path: '/dashboard/profile/personal', icon: <FaUserCircle />, title: 'Kişisel Bilgiler' },
        { path: '/dashboard/profile/password', icon: <FaKey />, title: 'Şifre Değiştirme' },
        ...(user?.role === 'driver' || user?.role === 'admin' ? [
          { path: '/dashboard/profile/driver-info', icon: <FaTruck />, title: 'Şoför Bilgileri' }
        ] : []),
        ...(user?.role === 'shipper' || user?.role === 'admin' ? [
          { path: '/dashboard/profile/shipper-info', icon: <FaBuilding />, title: 'Firma Bilgileri' }
        ] : [])
      ]
    }
  );

  // Admin için ek menüler
  if (user?.role === 'admin') {
    baseMenuItems.push(
      { path: '/dashboard/admin/users', icon: <FaUsers />, title: 'Kullanıcılar' },
      { path: '/dashboard/admin/settings', icon: <FaCog />, title: 'Sistem Ayarları' }
    );
  }

  return baseMenuItems;
};

const supportMenuItems = [
  { path: '/dashboard/feedback', icon: <FaStar />, title: 'Geri Bildirim' },
  { path: '/dashboard/support', icon: <FaHeadset />, title: 'İletişim ve Yardım' },
];

export const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const location = useLocation();
  const { user, logout, updateUser, updateUserRole } = useAuth();
  const navigate = useNavigate();

  const menuItems = getQuickMenuItems(user);

  const toggleSubmenu = (index) => {
    setActiveSubmenu(activeSubmenu === index ? null : index);
  };

  const renderMenuItem = (item, index, isSubMenu = false) => {
    if (item.subItems && !isSubMenu) {
      return (
        <div
          key={index}
          onClick={() => toggleSubmenu(index)}
          className={`flex items-center px-6 py-3 transition-colors cursor-pointer
            ${!isSidebarOpen && 'justify-center px-3'}
            text-[#e0e0e0] hover:bg-[#2a2a2a]`}
        >
          <span className="text-xl">{item.icon}</span>
          {isSidebarOpen && (
            <>
              <span className="ml-3 font-medium">{item.title}</span>
              <span className="ml-auto">
                {activeSubmenu === index ? <FaChevronDown /> : <FaChevronRight />}
              </span>
            </>
          )}
        </div>
      );
    }

    return (
      <Link
        key={item.path}
        to={item.path}
        className={`flex items-center px-6 py-3 transition-colors
          ${location.pathname === item.path ? 'bg-[#333333] text-white' : 'text-[#e0e0e0] hover:bg-[#2a2a2a]'}
          ${!isSidebarOpen && 'justify-center px-3'}
          ${isSubMenu && 'pl-14 pr-4 py-2 text-sm bg-[#282828]'}`}
      >
        <span className={`${isSubMenu ? 'text-lg' : 'text-xl'}`}>{item.icon}</span>
        {isSidebarOpen && (
          <span className="ml-3 font-medium">{item.title}</span>
        )}
      </Link>
    );
  };

  const getRoleBadge = () => {
    if (user?.role === 'driver') {
      return (
        <div className="flex items-center bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
          <FaTruck className="mr-1" />
          Şoför
        </div>
      );
    }
    else if (user?.role === 'shipper') {
    return (
      <div className="flex items-center bg-green-600 text-white text-xs px-2 py-1 rounded-full">
        <FaBuilding className="mr-1" />
        Yük Veren
      </div>
    );
  }else {
    return (
      <div className="flex items-center bg-red-600 text-white text-xs px-2 py-1 rounded-full">
        <FaUser className="mr-1" />
        Admin
      </div>
    );
  }
};

  const handleRoleChange = (e) => {
    const newRole = e.target.value;
    updateUserRole(newRole);
  };

  return (
    <div className="flex h-screen bg-[#1a1a1a] font-nunito">
      {/* Sidebar */}
      <div 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } transition-all duration-300 bg-[#242424] border-r border-[#333333] flex flex-col`}
      >
        {/* Logo Bölümü */}
        <div className="p-4 border-b border-[#333333]">
          <Logo className={!isSidebarOpen ? 'justify-center' : ''} showText={isSidebarOpen} />
        </div>
        
        {/* Quick Menu - Esnek alan */}
        <div className="flex-1 overflow-y-auto">
          <div className="py-4">
            {isSidebarOpen && (
              <h2 className="px-6 text-xs font-semibold text-[#999999] uppercase tracking-wider mb-2">
                Hızlı Menü
              </h2>
            )}
            <nav>
              {menuItems.map((item, index) => (
                <div key={item.path || index}>
                  {renderMenuItem(item, index)}
                  {isSidebarOpen && item.subItems && activeSubmenu === index && (
                    <div className="bg-[#242424]">
                      {item.subItems.map((subItem) => (
                        renderMenuItem(subItem, null, true)
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>

        {/* Support Menu - Alt kısımda sabit */}
        <div className="border-t border-gray-700 mt-auto">
          {isSidebarOpen && (
            <h2 className="px-6 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Destek
            </h2>
          )}
          <nav className="py-2">
            {supportMenuItems.map((item, index) => (
              <div key={item.path}>
                {renderMenuItem(item, index + menuItems.length)}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-[#1c1c1c] text-white h-16 flex items-center justify-between px-6 border-b border-[#333333]">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-[#e0e0e0] hover:text-white transition-colors"
          >
            <FaBars className="w-6 h-6" />
          </button>

          <div className="flex items-center space-x-4">
            {/* Geliştirici Modu - Kullanıcı Değiştirme */}
            <div className="flex items-center gap-2 bg-yellow-500/10 px-3 py-1.5 rounded-md border border-yellow-500/20">
              <FaUserCog className="text-yellow-500" />
              <select
                value={user?.id}
                onChange={(e) => {
                  const selectedUser = MOCK_USERS_DETAILED.find(
                    u => u.id === Number(e.target.value)
                  );
                  if (selectedUser) {
                    updateUser(selectedUser);
                  }
                }}
                className="bg-[#2a2a2a] border border-[#333333] text-[#e0e0e0] rounded-md p-1 text-sm min-w-[200px]"
              >
                {MOCK_USERS_DETAILED.map(mockUser => (
                  <option key={mockUser.id} value={mockUser.id}>
                    {mockUser.name} ({mockUser.role === 'admin' ? 'Admin' : 
                      mockUser.role === 'driver' ? 'Şoför' : 'Yük Veren'})
                  </option>
                ))}
              </select>
            </div>

            <button className="p-2 hover:bg-[#2a2a2a] rounded-full transition-colors">
              <FaBell className="text-xl" />
            </button>
            <button className="p-2 hover:bg-[#2a2a2a] rounded-full transition-colors">
              <FaCog className="text-xl" />
            </button>
            
            {/* Profil bölümü */}
            <div className="flex items-center space-x-3">
              <div 
                onClick={() => navigate('/dashboard/profile/personal')}
                className="flex items-center space-x-3 cursor-pointer hover:bg-[#2a2a2a] p-2 rounded-lg transition-colors"
              >
                {getRoleBadge()}
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#333333] bg-[#2a2a2a]">
                  <img 
                    src={user?.avatar || profileImage} 
                    alt="Profil" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-white">{user?.name || 'Admin'}</span>
                  <span className="text-xs text-gray-400">@{user?.username || 'admin'}</span>
                </div>
              </div>
              
              <button 
                onClick={logout}
                className="p-2 hover:bg-[#2a2a2a] rounded-full transition-colors"
                title="Çıkış Yap"
              >
                <FaSignOutAlt className="text-xl" />
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#1a1a1a] p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};