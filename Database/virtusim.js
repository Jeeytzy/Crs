const axios = require('axios');
const settings = require('../settings');

const API_KEY = settings.VirtuSimKey;
const BASE_URL = 'https://virtusim.com/api';
const proxyPool = settings.virtualSimProxies || [];

async function requestWithProxy(handler) {
  const candidates = proxyPool.length ? proxyPool : [null];
  let lastError;

  for (const proxyUrl of candidates) {
    try {
      const config = proxyUrl
        ? buildAxiosProxy(proxyUrl)
        : { proxy: false };

      return await handler(config);
    } catch (err) {
      lastError = err;
      continue;
    }
  }

  throw lastError;
}

function buildAxiosProxy(proxyUrl) {
  try {
    const parsed = new URL(proxyUrl);
    const config = {
      proxy: {
        protocol: parsed.protocol.replace(':', ''),
        host: parsed.hostname,
        port: Number(parsed.port)
      }
    };

    if (parsed.username || parsed.password) {
      config.proxy.auth = {
        username: decodeURIComponent(parsed.username || ''),
        password: decodeURIComponent(parsed.password || '')
      };
    }

    return config;
  } catch (err) {
    console.error('VirtuSim proxy parse error:', err.message);
    return { proxy: false };
  }
}

module.exports = {
  async GetServiceList() {
    try {
      const res = await requestWithProxy((config) =>
        axios.get(`${BASE_URL}/service-list?api_key=${API_KEY}`, config)
      );
      return res.data;
    } catch (err) {
      console.error('VirtuSim GetServiceList Error:', err.message);
      return { status: false };
    }
  },

  async OrderNumber(service, country = 'indonesia') {
    try {
      const res = await requestWithProxy((config) =>
        axios.post(`${BASE_URL}/order`, {
          api_key: API_KEY,
          service,
          country
        }, config)
      );
      return res.data;
    } catch (err) {
      console.error('VirtuSim OrderNumber Error:', err.message);
      return { status: false };
    }
  },

  async CheckOrderStatus(orderId) {
    try {
      const res = await requestWithProxy((config) =>
        axios.get(`${BASE_URL}/check-order?api_key=${API_KEY}&order_id=${orderId}`, config)
      );
      return res.data;
    } catch (err) {
      console.error('VirtuSim CheckOrderStatus Error:', err.message);
      return { status: false };
    }
  },

  async ChangeStatusNumber(orderId, status) {
    try {
      const res = await requestWithProxy((config) =>
        axios.post(`${BASE_URL}/change-status`, {
          api_key: API_KEY,
          order_id: orderId,
          status
        }, config)
      );
      return res.data;
    } catch (err) {
      console.error('VirtuSim ChangeStatusNumber Error:', err.message);
      return { status: false };
    }
  }
};
