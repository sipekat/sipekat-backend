const jwt = require('jsonwebtoken');
const config = require('../config/secret');

function verifikasi() {
  return function(req, rest, next){
    const role = req.body.role;
    const tokenWithBearer = req.headers.authorization;
    if(tokenWithBearer){
      const token = tokenWithBearer.split(' ')[1];
      //verif
      jwt.verify(token, config.secret, function(error, decoded){
        if(error){
          return rest.status(401).send({auth:false, message:'Token tidak terdaftar'});
        }else {
          if(role =="admin"){
            req.auth = decoded;
            next();
          }else {
            return rest.status(401).send({auth:false, message:'Gagal mengotorisasi role anda!'});
          }
        } 
      })
    }else {
      return rest.status(401).send({auth:false, message:'Token tidak tersedia'});
    }
  }
}

module.exports = verifikasi;