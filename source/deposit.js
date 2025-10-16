const fs = require('fs');
const path = require('path');

const saldoFile = path.join(__dirname, 'saldo.json');

if (!fs.existsSync(saldoFile)) {
  fs.writeFileSync(saldoFile, JSON.stringify({}, null, 2));
}

function readSaldo() {
  return JSON.parse(fs.readFileSync(saldoFile));
}

function writeSaldo(data) {
  fs.writeFileSync(saldoFile, JSON.stringify(data, null, 2));
}

function addSaldo(userId, amount) {
  const data = readSaldo();
  data[userId] = (data[userId] || 0) + amount;
  writeSaldo(data);
  return data[userId];
}

function minSaldo(userId, amount) {
  const data = readSaldo();
  if (!data[userId] || data[userId] < amount) return false;
  data[userId] -= amount;
  writeSaldo(data);
  return data[userId];
}

function cekSaldo(userId) {
  const data = readSaldo();
  return data[userId] || 0;
}

function listSaldo() {
  return readSaldo();
}

function resetSaldo(userId) {
  const data = readSaldo();
  data[userId] = 0;
  writeSaldo(data);
  return true;
}

module.exports = { addSaldo, minSaldo, cekSaldo, listSaldo, resetSaldo };
