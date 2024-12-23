import { Link } from 'react-router-dom';
import { FaTruck } from 'react-icons/fa';

export const Logo = ({ className = '', showText = true }) => {
  return (
    <Link to="/" className={`flex items-center ${className}`}>
      <FaTruck className="text-3xl text-blue-200 mr-2" />
      {showText && (
        <span className="font-blinker text-xl font-bold text-white">
          EDATApp - LoadFinder
        </span>
      )}
    </Link>
  );
}; 