class SystemCheck {
  static async checkBackendConnection() {
    console.log('Backend bağlantısı kontrol ediliyor...');
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/system/health`);
      const data = await response.json();
      console.log('Backend yanıtı:', data);
      return {
        status: 'success',
        backend: data
      };
    } catch (error) {
      console.error('Backend bağlantı hatası:', error);
      return {
        status: 'error',
        message: 'Backend bağlantısı başarısız',
        error: error.message
      };
    }
  }

  static async checkBrowserCompatibility() {
    return {
      status: 'success',
      browser: {
        name: navigator.userAgent,
        localStorage: !!window.localStorage,
        sessionStorage: !!window.sessionStorage,
        cookies: navigator.cookieEnabled
      }
    };
  }

  static async performHealthCheck() {
    console.log('%cFrontend sistem kontrolü başlatılıyor...', 'color: blue; font-weight: bold');

    const backendCheck = await this.checkBackendConnection();
    const browserCheck = await this.checkBrowserCompatibility();

    const systemStatus = {
      timestamp: new Date().toISOString(),
      backend: backendCheck,
      browser: browserCheck,
      environment: process.env.NODE_ENV,
      version: process.env.REACT_APP_VERSION || '1.0.0'
    };

    console.log('%cFrontend sistem durumu:', 'color: green; font-weight: bold', systemStatus);
    return systemStatus;
  }
}

export default SystemCheck; 