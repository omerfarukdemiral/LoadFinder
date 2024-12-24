import { useEffect, useRef } from 'react';

export const withClickOutside = (WrappedComponent) => {
  return function WithClickOutside({ onClose, ...props }) {
    const wrapperRef = useRef(null);

    useEffect(() => {
      function handleClickOutside(event) {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
          onClose();
        }
      }

      // ESC tuşu ile kapatma
      function handleEscKey(event) {
        if (event.key === 'Escape') {
          onClose();
        }
      }

      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscKey);
      
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscKey);
      };
    }, [onClose]);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div ref={wrapperRef} className="relative">
          <WrappedComponent onClose={onClose} {...props} />
        </div>
      </div>
    );
  };
}; 