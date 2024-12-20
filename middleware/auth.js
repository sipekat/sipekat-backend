const connection = require('../koneksi');
const mysql = require('mysql');
const md5 = require('md5');
const response = require('../res');
const jwt = require('jsonwebtoken');
const config = require('../config/secret');
const ip = require('ip');
const nodemailer = require('nodemailer');

// Fungsi untuk menghasilkan OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Menghasilkan OTP 6 digit
}

// Fungsi untuk mengirim email
async function sendEmail(to, otp) {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Ganti dengan layanan email yang Anda gunakan
    auth: {
      user: process.env.email, // Ganti dengan email Anda
      pass: process.env.password // Ganti dengan password email Anda
    }
  });

  const mailOptions = {
    from: 'noreply',
    to: to,
    subject: 'Your OTP Code',
    text: `Your OTP code is: ${otp}`
  };

  return transporter.sendMail(mailOptions);
}

exports.registrasi = async function (req, res) {
  const post = {
    nama: req.body.nama,
    email: req.body.email,
    nomor_hp: req.body.nomor_hp,
    tanggalLahir: new Date(),
    password: md5(req.body.password),
    role: req.body.role
  }

  let query = "SELECT email FROM ?? WHERE ??=?";
  const table = ["user", "email", post.email];

  query = mysql.format(query, table);

  connection.query(query, async function(error, rows) {
    if(error){
        console.log(error);
    } else {
      if(rows.length == 0){
        let query = "INSERT INTO ?? SET ?";
        const table = ["user"];
        query = mysql.format(query, table);
        connection.query(query, post, async function(error, rows){
          if(error){
            console.log(error);
          } else {
            // Generate OTP
            const otp = generateOTP();

            // Kirim OTP ke email
            try {
              await sendEmail(post.email, otp);
              response.ok("Berhasil menambahkan data user baru. OTP telah dikirim ke email Anda.", res);
            } catch (emailError) {
              console.log(emailError);
              response.ok("Berhasil menambahkan data user baru, tetapi gagal mengirim OTP ke email.", res);
            }
          }
        });
      } else {
        response.ok("Email sudah terdaftar!", res);
      }
    }
  });
}

//login
exports.login = function(req, res){
  const post = {
    email: req.body.email,
    password: req.body.password,
  }

  let query = "SELECT * FROM ?? WHERE ??=? AND ??=?";
  const table = ["user", "password", md5(post.password), "email", post.email];

  query = mysql.format(query, table);
  connection.query(query, function(error, rows) {
    if(error){
      console.log(error);
    } else {
        if(rows.length == 1){
          const token = jwt.sign({rows}, config.secret, {
              expiresIn: 1440
          });
          id_user = rows[0].id;

          const data = {
            id_user: id_user,
            token_akses: token,
            ip_address: ip.address
          }

          let query = "INSERT INTO ?? SET ?";
          const table = ["tokenakses"];

          query = mysql.format(query, table);
          connection.query(query, data, function(error, rows){
            if(error){
              console.log(error);
            }else {
              res.json({
                succes: true,
                message:'Token JWT terbuat!',
                token:token,
                currUser: data.id_user,
              });
            }
          })
        }else {
          res.json({"error!": true, "message":"email atau password anda salah!"});
       }
    }
  })
}

exports.halamanrahasia = function(req, res){
  response.ok("Halaman ini hanya untuk user dengan role = admin!", res);
}