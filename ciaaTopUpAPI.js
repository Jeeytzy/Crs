const axios = require('axios');

/**
 * CiaaTopUp API Helper Functions
 * Ganti dari Atlantic H2H ke CiaaTopUp
 */

class CiaaTopUpAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = 'https://ciaatopup.my.id';
  }

  // Helper untuk membuat headers
  getHeaders() {
    return {
      'X-APIKEY': this.apiKey,
      'Content-Type': 'application/json'
    };
  }

  // Get Profile / Saldo
  async getProfile() {
    try {
      const res = await axios.get(`${this.baseURL}/h2h/profile`, {
        headers: this.getHeaders()
      });
      
      // Mapping response CiaaTopUp ke format lama Atlantic
      if (res.data.success) {
        return {
          status: true,
          data: {
            name: res.data.user.fullname,
            username: res.data.user.username,
            balance: res.data.user.saldo,
            email: res.data.user.email,
            nomor: res.data.user.nomor,
            isVerified: res.data.user.isVerified
          }
        };
      }
      return { status: false, message: res.data.message || 'Gagal get profile' };
    } catch (err) {
      console.error('[CiaaTopUp] Error getProfile:', err.response?.data || err.message);
      return { status: false, message: err.message };
    }
  }

  // Create Deposit
  async createDeposit(nominal, metode = 'QRISFAST', reff_id = null) {
    try {
      const params = new URLSearchParams();
      params.append('nominal', nominal);
      params.append('metode', metode);
      
      const res = await axios.get(`${this.baseURL}/h2h/deposit/create?${params.toString()}`, {
        headers: this.getHeaders()
      });
      
      // Mapping response
      if (res.data.success) {
        return {
          status: true,
          data: {
            id: res.data.data.id,
            reff_id: res.data.data.reff_id || reff_id,
            nominal: res.data.data.nominal,
            tambahan: res.data.data.tambahan || 0,
            fee: res.data.data.fee || 0,
            get_balance: res.data.data.get_balance,
            qr_string: res.data.data.qr_string,
            qr_image: res.data.data.qr_image,
            status: res.data.data.status,
            created_at: res.data.data.created_at,
            expired_at: res.data.data.expired_at,
            // Untuk bank transfer
            bank: res.data.data.bank,
            tujuan: res.data.data.tujuan,
            atas_nama: res.data.data.atas_nama
          }
        };
      }
      return { status: false, message: res.data.message || 'Gagal create deposit' };
    } catch (err) {
      console.error('[CiaaTopUp] Error createDeposit:', err.response?.data || err.message);
      return { status: false, message: err.message };
    }
  }

  // Check Deposit Status
  async checkDepositStatus(depositId) {
    try {
      const params = new URLSearchParams();
      params.append('id', depositId);
      
      const res = await axios.get(`${this.baseURL}/h2h/deposit/status?${params.toString()}`, {
        headers: this.getHeaders()
      });
      
      if (res.data.success) {
        return {
          status: true,
          data: {
            id: res.data.data.id,
            reff_id: res.data.data.reff_id,
            nominal: res.data.data.nominal,
            status: res.data.data.status,
            metode: res.data.data.metode,
            created_at: res.data.data.created_at
          }
        };
      }
      return { status: false, message: res.data.message || 'Deposit not found' };
    } catch (err) {
      console.error('[CiaaTopUp] Error checkDepositStatus:', err.response?.data || err.message);
      return { status: false, message: err.message };
    }
  }

  // Cancel Deposit
  async cancelDeposit(depositId) {
    try {
      const params = new URLSearchParams();
      params.append('id', depositId);
      
      const res = await axios.get(`${this.baseURL}/h2h/deposit/cancel?${params.toString()}`, {
        headers: this.getHeaders()
      });
      
      if (res.data.success) {
        return {
          status: true,
          data: res.data.data
        };
      }
      return { status: false, message: res.data.message || 'Gagal cancel deposit' };
    } catch (err) {
      console.error('[CiaaTopUp] Error cancelDeposit:', err.response?.data || err.message);
      return { status: false, message: err.message };
    }
  }

  // Get Deposit Methods
  async getDepositMethods() {
    try {
      const res = await axios.get(`${this.baseURL}/deposit/metode`, {
        headers: this.getHeaders()
      });
      
      if (res.data.success) {
        return {
          status: true,
          data: res.data.metode
        };
      }
      return { status: false, message: res.data.message || 'Gagal get metode' };
    } catch (err) {
      console.error('[CiaaTopUp] Error getDepositMethods:', err.response?.data || err.message);
      return { status: false, message: err.message };
    }
  }

  // Get Price List
  async getPriceList(code = null) {
    try {
      let url = `${this.baseURL}/h2h/layanan/price-list`;
      if (code) {
        url += `?code=${code}`;
      }
      
      const res = await axios.get(url, {
        headers: this.getHeaders()
      });
      
      if (res.data.success) {
        return {
          status: true,
          data: res.data.data
        };
      }
      return { status: false, message: res.data.message || 'Gagal get price list' };
    } catch (err) {
      console.error('[CiaaTopUp] Error getPriceList:', err.response?.data || err.message);
      return { status: false, message: err.message };
    }
  }

  // Create Order
  async createOrder(code, tujuan) {
    try {
      const params = new URLSearchParams();
      params.append('code', code);
      params.append('tujuan', tujuan);
      
      const res = await axios.get(`${this.baseURL}/h2h/order/create?${params.toString()}`, {
        headers: this.getHeaders()
      });
      
      if (res.data.success) {
        return {
          status: true,
          data: {
            id: res.data.data.id,
            reff_id: res.data.data.reff_id,
            layanan: res.data.data.layanan,
            code: res.data.data.code,
            target: res.data.data.target,
            price: res.data.data.price,
            sn: res.data.data.sn,
            status: res.data.data.status,
            created_at: res.data.data.created_at
          }
        };
      }
      return { status: false, message: res.data.message || 'Gagal create order' };
    } catch (err) {
      console.error('[CiaaTopUp] Error createOrder:', err.response?.data || err.message);
      return { status: false, message: err.message };
    }
  }

  // Check Order Status
  async checkOrderStatus(orderId) {
    try {
      const params = new URLSearchParams();
      params.append('id', orderId);
      
      const res = await axios.get(`${this.baseURL}/h2h/order/check?${params.toString()}`, {
        headers: this.getHeaders()
      });
      
      if (res.data.success) {
        return {
          status: true,
          data: res.data.data
        };
      }
      return { status: false, message: res.data.message || 'Order not found' };
    } catch (err) {
      console.error('[CiaaTopUp] Error checkOrderStatus:', err.response?.data || err.message);
      return { status: false, message: err.message };
    }
  }

  // Get Transaction History
  async getTransactionHistory() {
    try {
      const res = await axios.get(`${this.baseURL}/h2h/mutasi`, {
        headers: this.getHeaders()
      });
      
      if (res.data.success) {
        return {
          status: true,
          data: {
            mutasiDeposit: res.data.mutasiDeposit || [],
            mutasiOrder: res.data.mutasiOrder || []
          }
        };
      }
      return { status: false, message: res.data.message || 'Gagal get mutasi' };
    } catch (err) {
      console.error('[CiaaTopUp] Error getTransactionHistory:', err.response?.data || err.message);
      return { status: false, message: err.message };
    }
  }
}

module.exports = CiaaTopUpAPI;
