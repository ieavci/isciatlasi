const mysql = require('mysql2/promise');
const config = require('../config');

const pool = mysql.createPool(config.db);

pool.getConnection()
  .then(connection => {
    console.log('MySQL bağlantısı oluşturuldu.');
    connection.release();
  })
  .catch(err => {
    console.error('MySQL bağlantı hatası: ', err);
  });

module.exports = pool;
