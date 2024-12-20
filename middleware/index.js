const express = require('express');
const auth = require("./auth");
const verifikasi = require('./verifikasi');
const router = express.Router();

//mendaftarkan regist
router.post('/api/v1/register', auth.registrasi);
router.post('/api/v1/login', auth.login);

//test auth
router.get('/api/v1/rahasia', verifikasi(""), auth.halamanrahasia);

module.exports = router;