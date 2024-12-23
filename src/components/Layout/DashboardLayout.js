import { useState } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { 
  FaHome, FaUser, FaTruck, FaMoneyBill, FaMap, 
  FaBell, FaStar, FaHeadset, FaCog, FaSignOutAlt,
  FaBars, FaChevronDown, FaChevronRight, FaPlus,
  FaList, FaInbox, FaKey, FaUserCircle
} from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { Logo } from '../common/Logo';
import profileImage from '../../assets/images/ofd.jpeg';

const quickMenuItems = [
  { path: '/dashboard', icon: <FaHome />, title: 'Dashboard' },
  { path: '/dashboard/loads', 
    icon: <FaTruck />, 
    title: 'Yük Yönetimi',
    subItems: [
      { path: '/dashboard/loads/create', icon: <FaPlus />, title: 'İlan Oluştur' },
      { path: '/dashboard/loads/manage', icon: <FaList />, title: 'İlanlarım' },
      { path: '/dashboard/loads/offers', icon: <FaInbox />, title: 'Gelen Teklifler' },
    ]
  },
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
    ]
  },
];

const supportMenuItems = [
  { path: '/dashboard/feedback', icon: <FaStar />, title: 'Geri Bildirim' },
  { path: '/dashboard/support', icon: <FaHeadset />, title: 'İletişim ve Yardım' },
];

export const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const location = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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
                Quick Menu
              </h2>
            )}
            <nav>
              {quickMenuItems.map((item, index) => (
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
                {renderMenuItem(item, index + quickMenuItems.length)}
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