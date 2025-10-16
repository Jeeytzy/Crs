# 🤖 AsistenVirtual Telegram Bot

Bot Telegram Virtual Assistant dengan sistem deposit, topup, dan pembayaran menggunakan **CiaaTopUp API**

### Yang Sudah Dilakukan:
- ✅ Semua panggilan API Atlantic diganti dengan CiaaTopUp wrapper (`ciaaAPI`)
- ✅ Deposit creation menggunakan `ciaaAPI.createDeposit()`
- ✅ Status checking menggunakan `ciaaAPI.checkDepositStatus()`
- ✅ Error handling sudah diperbaiki
- ✅ Bot berhasil running dan tersambung ke Telegram

## 🚀 Cara Menjalankan di Termux

### 1. Install Node.js (jika belum)
```bash
pkg update && pkg upgrade
pkg install nodejs git
```

### 2. Clone/Download Project
```bash
# Masuk ke folder project
cd /sdcard/AsistenVirtual  # atau path folder project Anda
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Konfigurasi Bot

Edit file `settings.js`:
```javascript
// Token Bot Telegram Anda
token: 'YOUR_BOT_TOKEN_HERE',

// Owner ID Telegram Anda
owner: 'YOUR_TELEGRAM_ID',

// API Key CiaaTopUp
ApikeyAtlantic: "YOUR_CIAATOPUP_API_KEY",

// VirtuSim API Key
VirtuSimKey: "YOUR_VIRTUSIM_KEY"
```

### 5. Jalankan Bot
```bash
npm start
```

atau

```bash
node AsistenVirtual.js
```

## 📁 Struktur Project

```
.
├── AsistenVirtual.js       # Main bot file
├── ciaaTopUpAPI.js         # CiaaTopUp API wrapper
├── settings.js             # Konfigurasi bot
├── package.json            # Dependencies
├── Database/               # Database files (JSON)
│   ├── premiumUsers.json
│   ├── stok.json
│   ├── jualan.json
│   └── ...
├── source/                 # Source files
│   ├── deposit.js          # Saldo management
│   └── saldo.json          # Saldo database
└── atlantik/              # Transaction history
    └── transaksi.json
```

## 🔧 API CiaaTopUp

Bot menggunakan wrapper class `CiaaTopUpAPI` dengan method:

### Available Methods:
- `getProfile()` - Get user profile & balance
- `createDeposit(nominal, metode, reff_id)` - Create QRIS deposit
- `checkDepositStatus(depositId)` - Check deposit status
- `getPriceList(code)` - Get price list for products
- `createOrder(code, tujuan)` - Create product order
- `checkOrderStatus(orderId)` - Check order status
- `getTransactionHistory()` - Get transaction history

### Contoh Penggunaan:
```javascript
// Create deposit
const res = await ciaaAPI.createDeposit(50000, 'QRISFAST', 'REF123');

// Check status
const status = await ciaaAPI.checkDepositStatus(depositId);

// Get profile
const profile = await ciaaAPI.getProfile();
```

## 📝 Fitur Bot

### Payment & Deposit
- ✅ Deposit via QRIS (CiaaTopUp)
- ✅ Auto-check payment status
- ✅ Transaction history tracking
- ✅ Balance management

### Products & Services
- ✅ Virtual SIM (OTP services via VirtuSim)
- ✅ Product stock management (`/addstok`, `/delstok`, `/stok`)
- ✅ Auto order system
- ✅ QRIS payment integration

### Admin Features
- ✅ User management (premium, access control)
- ✅ Group management
- ✅ Welcome messages
- ✅ Auto-reply system
- ✅ Broadcast messages

## 🛠️ Troubleshooting

### Bot tidak connect / Error 409 Conflict?
**Error**: `409 Conflict: terminated by other getUpdates request`

**Penyebab**: Ada bot instance lain yang masih running dengan token yang sama

**Solusi**:
1. **Stop semua instance bot** di device lain
2. Pastikan tidak ada bot running di Replit/server lain
3. Restart bot Anda: `node AsistenVirtual.js`

Telegram hanya mengizinkan **1 instance aktif** per bot token.

### Bot tidak connect (error lain)?
1. Pastikan token bot benar di `settings.js`
2. Check koneksi internet
3. Pastikan tidak ada firewall yang blocking

### Error saat deposit/order?
1. Pastikan API Key CiaaTopUp valid
2. Check saldo di CiaaTopUp
3. Check logs untuk error detail

### Dependencies error?
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📞 Support

- **Developer**: @Jeeyhosting
- **WhatsApp**: +6283122028438

## 📄 License

Credit by Jeeyhosting
🙏 Hargai hasil karya developer

---

**Note**: File asli yang Anda berikan mengandung beberapa syntax error (HTML entities, missing parentheses). Semua error sudah diperbaiki dalam versi ini.
