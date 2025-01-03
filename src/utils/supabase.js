import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://mwondkyurmrltkfhnfhu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13b25ka3l1cm1ybHRrZmhuZmh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU5MTI0NDcsImV4cCI6MjA1MTQ4ODQ0N30.NpUIaFprqWO7h1rDibKWfxehZ54WCMFHQG5JykI8y_A';

// Supabase istemcisini oluştur
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Storage işlemleri için yardımcı fonksiyonlar
const storage = {
  // Profil fotoğrafı yükleme
  uploadProfilePhoto: async (file, userId, options = {}) => {
    if (!userId) {
      throw new Error('Kullanıcı ID\'si bulunamadı');
    }

    if (!file) {
      throw new Error('Yüklenecek dosya bulunamadı');
    }

    try {
      console.log('Upload başlıyor:', {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        userId
      });

      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}/profile.${fileExt}`;
      
      // Upload işlemi için options
      const uploadOptions = {
        upsert: true,
        contentType: file.type,
        onUploadProgress: (progress) => {
          if (options.onProgress) {
            const percentage = (progress.loaded / progress.total) * 100;
            options.onProgress(Math.round(percentage));
          }
        }
      };

      console.log('Supabase upload çağrısı yapılıyor...');
      
      const { data, error } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, uploadOptions);

      if (error) {
        console.error('Supabase upload hatası:', error);
        throw new Error(`Yükleme hatası: ${error.message}`);
      }

      console.log('Upload başarılı, public URL alınıyor...');

      // Public URL oluştur
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      console.log('İşlem tamamlandı:', publicUrl);

      return publicUrl;
    } catch (error) {
      console.error('Detaylı hata:', {
        message: error.message,
        stack: error.stack,
        cause: error.cause
      });
      throw new Error(`Fotoğraf yükleme hatası: ${error.message}`);
    }
  },

  // Dosya silme
  deleteFile: async (path, bucket = 'avatars') => {
    try {
      const { error } = await supabase.storage
        .from(bucket)
        .remove([path]);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Dosya silme hatası:', error);
      throw error;
    }
  }
};

export { supabase, storage }; 