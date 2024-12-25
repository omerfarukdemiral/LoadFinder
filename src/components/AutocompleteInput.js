import React, { useState, useEffect, useRef } from 'react';
import { FaMapMarkerAlt, FaTimes } from 'react-icons/fa';

const AutocompleteInput = ({ value, onChange, placeholder, onSelect }) => {
  const [predictions, setPredictions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const autocompleteService = useRef(null);
  const sessionToken = useRef(null);

  useEffect(() => {
    if (window.google && window.google.maps && window.google.maps.places) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
      sessionToken.current = new window.google.maps.places.AutocompleteSessionToken();
    }
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    onChange(value);

    if (value.length >= 3 && autocompleteService.current) {
      autocompleteService.current.getPlacePredictions({
        input: value,
        types: ['(cities)'],
        sessionToken: sessionToken.current
      }, (predictions, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setPredictions(predictions);
          setShowDropdown(true);
        }
      });
    } else {
      setPredictions([]);
      setShowDropdown(false);
    }
  };

  const handleSelect = (prediction) => {
    onChange(prediction.description);
    onSelect(prediction);
    setPredictions([]);
    setShowDropdown(false);
  };

  return (
    <div className="relative">
      <div className="relative">
        <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2 bg-[#2a2a2a] border border-[#333333] text-white rounded-md"
        />
        {value && (
          <button
            onClick={() => {
              onChange('');
              setPredictions([]);
              setShowDropdown(false);
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
          >
            <FaTimes />
          </button>
        )}
      </div>

      {showDropdown && predictions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-[#2a2a2a] border border-[#333333] rounded-md shadow-lg max-h-60 overflow-auto">
          {predictions.map((prediction) => (
            <button
              key={prediction.place_id}
              onClick={() => handleSelect(prediction)}
              className="w-full px-4 py-2 text-left text-white hover:bg-[#333333] flex items-center gap-2"
            >
              <FaMapMarkerAlt className="text-gray-400" />
              {prediction.description}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutocompleteInput; 