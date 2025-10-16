const axios = require('axios');
const settings = require('../settings');

const API_KEY = settings.VirtuSimKey;
const BASE_URL = 'https://virtusim.com/api';

module.exports = {
  async GetServiceList() {
    try {
      const res = await axios.get(`${BASE_URL}/service-list?api_key=${API_KEY}`);
      return res.data;
    } catch (err) {
      console.error('VirtuSim GetServiceList Error:', err.message);
      return { status: false };
    }
  },

  async OrderNumber(service, country = 'indonesia') {
    try {
      const res = await axios.post(`${BASE_URL}/order`, {
        api_key: API_KEY,
        service,
        country
      });
      return res.data;
    } catch (err) {
      console.error('VirtuSim OrderNumber Error:', err.message);
      return { status: false };
    }
  },

  async CheckOrderStatus(orderId) {
    try {
      const res = await axios.get(`${BASE_URL}/check-order?api_key=${API_KEY}&order_id=${orderId}`);
      return res.data;
    } catch (err) {
      console.error('VirtuSim CheckOrderStatus Error:', err.message);
      return { status: false };
    }
  },

  async ChangeStatusNumber(orderId, status) {
    try {
      const res = await axios.post(`${BASE_URL}/change-status`, {
        api_key: API_KEY,
        order_id: orderId,
        status
      });
      return res.data;
    } catch (err) {
      console.error('VirtuSim ChangeStatusNumber Error:', err.message);
      return { status: false };
    }
  }
};
