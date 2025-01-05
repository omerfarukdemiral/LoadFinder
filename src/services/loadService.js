import api from '../utils/api';

export const loadService = {
  // Yük ilanı oluşturma
  createLoad: async (loadData) => {
    const response = await api.post('/loads', loadData);
    return response.data;
  },

  // Shipper'a ait yük ilanlarını getirme
  getMyLoads: async () => {
    const response = await api.get('/loads/my-loads');
    return response.data;
  },

  // Tüm yük ilanlarını getirme
  getAllLoads: async () => {
    const response = await api.get('/loads');
    return response.data;
  },

  // Yük ilanı güncelleme
  updateLoad: async (id, loadData) => {
    const response = await api.put(`/loads/${id}`, loadData);
    return response.data;
  },

  // Yük ilanı silme
  deleteLoad: async (id) => {
    const response = await api.delete(`/loads/${id}`);
    return response.data;
  }
}; 