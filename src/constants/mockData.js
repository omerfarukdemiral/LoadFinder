import defaultAvatar from '../assets/images/ofd.jpeg';

// Kullanıcılar için mock data
export const MOCK_USERS = Array(10).fill(null).map((_, index) => ({
  id: index + 1,
  name: `Kullanıcı ${index + 1}`,
  email: `user${index + 1}@example.com`,
  role: ['driver', 'shipper', 'admin'][Math.floor(Math.random() * 3)],
  status: ['active', 'inactive'][Math.floor(Math.random() * 2)],
  avatar: defaultAvatar,
  registrationDate: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString('tr-TR')
}));

// Yük teklifleri için mock data
export const MOCK_LOAD_OFFERS = Array(8).fill(null).map((_, index) => ({
  id: index + 1,
  loadType: ['Konteyner', 'Kuru Yük', 'Soğuk Yük'][Math.floor(Math.random() * 3)],
  from: ['İstanbul', 'Ankara', 'İzmir', 'Bursa'][Math.floor(Math.random() * 4)],
  to: ['Antalya', 'Adana', 'Mersin', 'Konya'][Math.floor(Math.random() * 4)],
  price: Math.floor(Math.random() * 3000 + 2000),
  status: ['pending', 'accepted', 'rejected'][Math.floor(Math.random() * 3)],
  deadline: new Date(Date.now() + Math.random() * 864000000).toLocaleDateString('tr-TR'),
  distance: Math.floor(Math.random() * 800 + 200)
}));

// Yük ilanları için mock data
export const MOCK_LOAD_LISTINGS = Array(12).fill(null).map((_, index) => ({
  id: `L${(index + 1).toString().padStart(5, '0')}`,
  title: `Yük İlanı ${index + 1}`,
  loadType: ['Konteyner', 'Kuru Yük', 'Soğuk Yük'][Math.floor(Math.random() * 3)],
  from: ['İstanbul', 'Ankara', 'İzmir', 'Bursa'][Math.floor(Math.random() * 4)],
  to: ['Antalya', 'Adana', 'Mersin', 'Konya'][Math.floor(Math.random() * 4)],
  price: Math.floor(Math.random() * 3000 + 2000),
  status: ['active', 'completed', 'cancelled'][Math.floor(Math.random() * 3)],
  createdAt: new Date(Date.now() - Math.random() * 864000000).toLocaleDateString('tr-TR'),
  deadline: new Date(Date.now() + Math.random() * 864000000).toLocaleDateString('tr-TR'),
  distance: Math.floor(Math.random() * 800 + 200),
  vehicleType: ['Tır', 'Kamyon', 'Kamyonet'][Math.floor(Math.random() * 3)],
  weight: Math.floor(Math.random() * 20 + 1),
  volume: Math.floor(Math.random() * 100 + 10),
  // Yük veren bilgileri eklendi
  shipper: {
    id: Math.floor(Math.random() * 5) + 1, // 1-5 arası random shipper ID
    companyName: ['Anadolu Lojistik', 'Marmara Taşımacılık', 'Ege Nakliyat', 'Karadeniz Kargo', 'Akdeniz Transport'][Math.floor(Math.random() * 5)],
    taxNumber: Math.floor(Math.random() * 9000000000 + 1000000000).toString(),
    rating: (Math.random() * 2 + 3).toFixed(1), // 3.0-5.0 arası rating
    totalLoads: Math.floor(Math.random() * 100 + 50), // 50-150 arası toplam yük
    address: {
      city: ['İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya'][Math.floor(Math.random() * 5)],
      district: ['Kadıköy', 'Çankaya', 'Konak', 'Nilüfer', 'Muratpaşa'][Math.floor(Math.random() * 5)],
      fullAddress: 'Örnek Mah. Test Sok. No:123'
    },
    contact: {
      phone: `0${Math.floor(Math.random() * 1000000000 + 5000000000)}`,
      email: `info@${['anadolu', 'marmara', 'ege', 'karadeniz', 'akdeniz'][Math.floor(Math.random() * 5)]}lojistik.com`,
      website: `www.${['anadolu', 'marmara', 'ege', 'karadeniz', 'akdeniz'][Math.floor(Math.random() * 5)]}lojistik.com`
    }
  }
}));

// Şoför teklifleri için mock data - Load Listings ile ilişkili
export const MOCK_DRIVER_OFFERS = MOCK_LOAD_LISTINGS.slice(0, 8).map((relatedLoad, index) => ({
  id: `O${(index + 1).toString().padStart(5, '0')}`,
  loadId: relatedLoad.id,
  loadType: relatedLoad.loadType,
  from: relatedLoad.from,
  to: relatedLoad.to,
  price: Math.floor(Math.random() * 3000 + 2000),
  status: ['pending', 'accepted', 'rejected'][Math.floor(Math.random() * 3)],
  deadline: relatedLoad.deadline,
  distance: relatedLoad.distance,
  createdAt: new Date(Date.now() - Math.random() * 864000000).toISOString(),
  // Yük ve firma detaylarını ekleyelim
  loadDetails: {
    ...relatedLoad,  // Tüm yük detaylarını al
    weight: relatedLoad.weight,
    volume: relatedLoad.volume,
    vehicleType: relatedLoad.vehicleType
  },
  // Firma bilgilerini ekleyelim
  shipper: relatedLoad.shipper  // MOCK_LOAD_LISTINGS'den gelen firma bilgileri
}));

// Şehirler listesi
export const CITIES = [
  'İstanbul',
  'Ankara',
  'İzmir',
  'Bursa',
  'Antalya',
  'Adana',
  'Mersin',
  'Konya'
];

// Yük tipleri
export const LOAD_TYPES = [
  'Konteyner',
  'Soğuk Yük',
  'Kuru Yük',
  'Ağır Yük',
  'Depo Yükü',
  'Endüstriyel',
  'Araç',
  'Deniz Yükü',
  'Diğer'
];

// Araç tipleri
export const VEHICLE_TYPES = [
  'Tır',
  'Kamyon',
  'Kamyonet',
  'Frigorifik',
  'Lowbed',
  'Tenteli'
];

// Statü tipleri
export const STATUS_TYPES = {
  ACTIVE: 'active',
  PENDING: 'pending',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected'
};

// Profil bilgileri için mock data
export const MOCK_PERSONAL_INFO = {
  firstName: 'Ahmet',
  lastName: 'Yılmaz',
  email: 'ahmet.yilmaz@example.com',
  phone: '0532 123 4567',
  address: 'İstanbul, Türkiye',
  company: 'Lojistik A.Ş.',
  avatar: defaultAvatar
};

// Şoför bilgileri için mock data
export const MOCK_DRIVER_INFO = {
  driverLicenseNo: '34ABC123456',
  vehicleType: 'tir',
  vehiclePlate: '34 TIR 123',
  experience: '8'
};

// Yük veren bilgileri için mock data
export const MOCK_SHIPPER_INFO = {
  // Düzenlenebilir alanlar
  companyName: 'Anadolu Lojistik A.Ş.',
  taxNumber: '1234567890',
  sector: 'Uluslararası Taşımacılık',
  contact: {
    phone: '0532 123 4567',
    email: 'info@anadolulojistik.com',
    website: 'www.anadolulojistik.com'
  },
  address: {
    city: 'İstanbul',
    district: 'Kadıköy',
    fullAddress: 'Atatürk Mah. İstanbul Cad. No:123'
  },

  // Salt okunur alanlar
  rating: '4.8',
  totalLoads: 156,
  completedLoads: 142,
  cancelledLoads: 14,
  memberSince: '2023-01-15',
  verificationStatus: 'verified', // verified, pending, rejected
  companySize: '50-100',
  lastActivityDate: '2024-03-15'
};

// Yük ilanları için detaylı mock data
export const MOCK_LOAD_LISTINGS_DETAILED = Array(25).fill(null).map((_, index) => {
  const hasShipper = Math.random() > 0.1; // %80 ihtimalle firma bilgisi olsun
  
  return {
    id: index + 1,
    loadType: LOAD_TYPES[Math.floor(Math.random() * LOAD_TYPES.length)],
    size: ['2m x 2m x 2m', '3m x 2m x 2m', '4m x 2m x 2m', '5m x 2m x 2m'][Math.floor(Math.random() * 4)],
    weight: [800, 1000, 1500, 2000, 2500, 3000][Math.floor(Math.random() * 6)],
    distance: [300, 500, 700, 1000, 1200, 1500][Math.floor(Math.random() * 6)],
    budget: [2000, 2500, 3000, 3500, 4000, 4500, 5000][Math.floor(Math.random() * 7)],
    from: CITIES[Math.floor(Math.random() * CITIES.length)],
    to: CITIES[Math.floor(Math.random() * CITIES.length)],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    requirements: ['Sigorta zorunlu', 'Deneyimli şoför', 'GPS takip sistemi'],
    deadline: '2024-03-20',
    status: ['Aktif', 'Tamamlandı', 'İptal'][Math.floor(Math.random() * 3)],
    // Firma bilgileri (opsiyonel)
    shipper: hasShipper ? {
      id: Math.floor(Math.random() * 5) + 1,
      companyName: ['Anadolu Lojistik', 'Marmara Taşımacılık', 'Ege Nakliyat', 'Karadeniz Kargo', 'Akdeniz Transport'][Math.floor(Math.random() * 5)],
      taxNumber: Math.floor(Math.random() * 9000000000 + 1000000000).toString(),
      rating: (Math.random() * 2 + 3).toFixed(1),
      totalLoads: Math.floor(Math.random() * 100 + 50),
      address: {
        city: CITIES[Math.floor(Math.random() * CITIES.length)],
        district: ['Kadıköy', 'Çankaya', 'Konak', 'Nilüfer', 'Muratpaşa'][Math.floor(Math.random() * 5)],
        fullAddress: 'Örnek Mah. Test Sok. No:123'
      },
      contact: {
        phone: `0${Math.floor(Math.random() * 1000000000 + 5000000000)}`,
        email: `info@example.com`,
        website: `www.example.com`
      }
    } : null
  };
});

// Yük yönetimi için mock data
export const MOCK_MANAGE_LOADS = [
  {
    id: 1,
    loadType: 'Konteyner',
    size: '2m x 2m x 2m',
    weight: 1000,
    distance: 500,
    budget: 2000,
    status: 'Aktif',
  },
  {
    id: 2,
    loadType: 'Kuru Yük',
    size: '3m x 2m x 2m',
    weight: 1500,
    distance: 700,
    budget: 2500,
    status: 'Aktif',
  },
  {
    id: 3,
    loadType: 'Soğuk Yük',
    size: '4m x 2m x 2m',
    weight: 2000,
    distance: 300,
    budget: 3000,
    status: 'Tamamlandı',
  },
  {
    id: 4,
    loadType: 'Tehlikeli Madde',
    size: '2m x 2m x 2m',
    weight: 800,
    distance: 1000,
    budget: 4000,
    status: 'Aktif',
  }
];

// Gelen teklifler için mock data
export const MOCK_INCOMING_OFFERS = [
  {
    offerId: '#O12345',
    loadId: '#L789',
    loadDetails: {
      id: 'L789',
      loadType: 'Konteyner',
      from: 'İstanbul',
      to: 'Ankara',
      weight: 1000,
      distance: 450,
      price: 3500,
      requirements: ['Sigorta zorunlu', 'Deneyimli şoför', 'GPS takip sistemi'],
      description: 'Acil teslimat gerekiyor.',
      deadline: '2024-03-25',
      status: 'active'
    },
    offerer: 'Ahmet Yılmaz',
    offererId: '1',
    price: 5000,
    status: 'Pending',
    createdAt: '2024-03-15T10:30:00',
  },
  {
    offerId: '#O12346',
    loadId: '#L790',
    loadDetails: {
      id: 'L790',
      loadType: 'Kuru Yük',
      from: 'İzmir',
      to: 'Antalya',
      weight: 2000,
      distance: 350,
      price: 4000,
      requirements: ['Sigorta zorunlu', 'GPS takip sistemi'],
      description: 'Standart teslimat.',
      deadline: '2024-03-28',
      status: 'active'
    },
    offerer: 'Mehmet Demir',
    offererId: '2',
    price: 4500,
    status: 'Accepted',
    createdAt: '2024-03-14T15:45:00',
  },
  {
    offerId: '#O12347',
    loadId: '#12347',
    offerer: 'Ayşe Kaya',
    price: 6000,
    status: 'Rejected',
  },
  {
    offerId: '#O12348',
    loadId: '#12348',
    offerer: 'Fatma Çelik',
    price: 5500,
    status: 'Pending',
  }
];

export const MOCK_LOADS = [
  {
    id: 1,
    loadType: 'Konteyner',
    size: '2m x 2m x 2m',
    weight: 1000,
    distance: 500,
    budget: 2000,
    from: 'İstanbul',
    to: 'Ankara',
    createdBy: 'user1',
    createdAt: new Date(),
    status: 'Pending'
  }
];

export const MOCK_OFFERS = [
  {
    id: 1,
    loadId: 1, // İlişki için
    offerer: 'Şoför Ahmet',
    price: 1800,
    note: 'Hemen taşıyabilirim',
    status: 'Pending',
    createdAt: new Date()
  }
]; 