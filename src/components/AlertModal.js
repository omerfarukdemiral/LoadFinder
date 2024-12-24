import React from 'react';
import { FaExclamationTriangle, FaTimes } from 'react-icons/fa';
import { withClickOutside } from './withClickOutside';

const AlertModal = ({ title, message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-[#242424] rounded-lg w-full max-w-md border border-[#333333] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-[#333333] bg-[#2a2a2a]">
          <div className="flex items-center gap-3">
            <FaExclamationTriangle className="text-2xl text-yellow-500" />
            <h3 className="text-xl font-semibold text-white">{title}</h3>
          </div>
          <button onClick={onCancel} className="text-gray-400 hover:text-white transition-colors">
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-300">{message}</p>
        </div>

        {/* Footer */}
        <div className="border-t border-[#333333] p-4 bg-[#2a2a2a] flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-[#3a3a3a] text-white rounded-md hover:bg-[#444444] transition-colors"
          >
            İptal
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Onayla
          </button>
        </div>
      </div>
    </div>
  );
};

export default withClickOutside(AlertModal); 