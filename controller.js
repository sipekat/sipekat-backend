'use strict';

const response = require('./res');
const connection = require('./koneksi');
const e = require('express');

exports.index = function (req, res) {
  res.send("<h1>REST API Sipekat</h1>");
};

//menampilkan data user
exports.tampildatauser = function (req, res) {
  connection.query('SELECT * FROM user', function (error, rows, fields) {
    if (error) {
      console.log(error);
    } else {
      response.ok(rows, res);
    }
  });
};

//data user berdasarkan id
exports.datauserid = function (req, res) {
  const id = req.body.id;
  connection.query('SELECT * FROM user WHERE id_user = ?', [id],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        response.ok(rows, res);
      }
    });
};

//tambah data user
exports.tambahdatauser = function (req, res) {
  const id_user = req.body.id_user;
  const nama = req.body.nama;
  const email = req.body.email;
  const nomor_hp = req.body.nomor_hp;
  const tanggalLahir = req.body.tanggalLahir;
  const password = req.body.password;

  connection.query('INSERT INTO user (id_user, nama, email, nomor_hp, tanggalLahir, password) VALUES (?, ?, ?, ?, ?, ?)',
    [id_user, nama, email, nomor_hp, tanggalLahir, password],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        response.ok("Data Berhasil Ditambahkan", res);
      }
    });
};

//update data user
exports.updatedatauser = function (req, res) {
  const id_user = req.body.id_user;
  const nama = req.body.nama;
  const email = req.body.email;
  const nomor_hp = req.body.nomor_hp;
  const tanggalLahir = req.body.tanggalLahir;
  const password = req.body.password;

  connection.query('UPDATE user SET id_user = ?, nama = ?, email = ?, nomor_hp = ?, tanggalLahir = ?, password = ? WHERE id_user = ?',
    [id_user, nama, email, nomor_hp, tanggalLahir, password, id_user],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        response.ok("Data Berhasil Diupdate", res);
      }
    });
}

//hapus data user
exports.hapusdatauser = function (req, res) {
  const id = req.body.id_user;
  connection.query('DELETE FROM user WHERE id_user = ?', [id],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        response.ok("Data Berhasil Dihapus", res);
      }
    });
}

exports.datapelapor = function (req, res) {
  connection.query('SELECT * FROM datapelapor', function (error, rows, fields) {
    if (error) {
      console.log(error);
    } else {
      response.ok(rows, res);
    }
  });
}

exports.datapelaporwithid = function (req, res) {
  const id = req.body.user_id_user;
  connection.query('SELECT * FROM datapelapor WHERE user_id_user = ?', [id],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        response.ok(rows, res);
      }
    });
}

exports.tambahdatapelapor = function (req, res) {
  const id_pelapor = req.body.id_pelapor;
  const namaPelapor = req.body.namaPelapor;
  const email = req.body.email;
  const nomorWa = req.body.nomorWa;
  const alamat = req.body.alamat;

  connection.query('INSERT INTO datapelapor (id_pelapor, namaPelapor, email, nomorWa, alamat) VALUES (?, ?, ?, ?, ?)',
    [id_pelapor, namaPelapor, email, nomorWa, alamat],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        response.ok("Data Berhasil Ditambahkan", res);
      }
    });
}

exports.tampilkanlaporan = function (req, res) {
  connection.query('SELECT * FROM laporanuser', function (error, rows, fields) {
    if (error) {
      console.log(error);
    } else {
      response.ok(rows, res);
    }
  });
}

exports.tampilkanlaporanwithid = function (req, res) {
  const id = req.body.id_laporan;
  connection.query('SELECT * FROM laporanuser WHERE id_laporan = ?', [id],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        response.ok(rows, res);
      }
    });
}