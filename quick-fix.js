/**
 * QUICK FIX - Update kode pakai package alternatif
 * Jalankan: node quick-fix.js
 */

const fs = require('fs');

const file = 'AsistenVirtual.js';
if (!fs.existsSync(file)) {
  console.error('❌ AsistenVirtual.js tidak ditemukan!');
  process.exit(1);
}

// Backup
fs.copyFileSync(file, `${file}.backup.${Date.now()}`);
console.log('✅ Backup dibuat\n');

let code = fs.readFileSync(file, 'utf8');
let changes = 0;

// 1. Hapus/comment import yang ga ada
const removeImports = [
  'const { createCanvas } = require("canvas");',
  "const { createCanvas } = require('canvas');",
  "const JsConfuser = require('js-confuser');",
  'const JsConfuser = require("js-confuser");',
  "const { ImageUploadService } = require('node-upload-images');",
  'const { ImageUploadService } = require("node-upload-images");',
  "const canvafy = require('canvafy');",
  'const canvafy = require("canvafy");',
  "const { Client } = require('ssh2');",
  'const { Client } = require("ssh2");'
];

removeImports.forEach(imp => {
  if (code.includes(imp)) {
    code = code.replace(imp, `// ${imp} // DISABLED - tidak kompatibel Termux`);
    console.log(`✅ Disabled: ${imp.slice(0,40)}...`);
    changes++;
  }
});

// 2. Tambah import alternatif di bagian atas (setelah require terakhir)
const newImports = `

// ===== PACKAGE ALTERNATIF UNTUK TERMUX =====
// Pengganti js-confuser
const JavaScriptObfuscator = require('javascript-obfuscator');
const JsConfuser = {
  obfuscate: (code, options) => {
    return JavaScriptObfuscator.obfuscate(code, options).getObfuscatedCode();
  }
};

// Pengganti node-upload-images
const imgbbUploader = require('imgbb-uploader');
const ImageUploadService = {
  upload: async (imagePath, apiKey) => {
    return await imgbbUploader({ apiKey: apiKey || process.env.IMGBB_API_KEY, imagePath });
  }
};

// Canvas & Canvafy - disabled (uncomment jika berhasil install)
// const { createCanvas } = require('canvas');
// const canvafy = require('canvafy');

// SSH2 - disabled (uncomment jika diperlukan)
// const { Client } = require('ssh2');

`;

// Cari posisi setelah semua require
const lastRequireIndex = code.lastIndexOf('const');
const lineAfterRequires = code.indexOf('\n', lastRequireIndex);

if (lineAfterRequires > -1) {
  code = code.slice(0, lineAfterRequires) + newImports + code.slice(lineAfterRequires);
  console.log('✅ Import alternatif ditambahkan');
  changes++;
}

// Save
fs.writeFileSync(file, code, 'utf8');

console.log(`\n🎉 ${changes} perubahan berhasil!`);
console.log('\n📝 Langkah selanjutnya:');
console.log('1. npm install');
console.log('2. npm start');
console.log('\n⚠️  Fitur canvas/canvafy akan disabled, fitur lain tetap jalan!');