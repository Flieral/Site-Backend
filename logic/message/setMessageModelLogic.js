var mysql = require('mysql')

module.exports = {
  setMessageModel: function (token, payload, callback) {
    var connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'adp',
      database: 'FlieralSite'
    })
    connection.connect(function (err) {
      if (err) {
        callback(err, null)
        return
      }
      connection.query('SELECT * FROM ArrivedMessagesToken WHERE Token =?', token, function (error, results) {
        if (error) {
          callback(error, null)
          connection.end()
          return
        }
        if ((results.length != 0) && results[0].Token !== null && parseInt(results[0].Counter, 10) < 5) {
          var newCounter = parseInt(results[0].Counter, 10) + 1
          connection.query('UPDATE ArrivedMessagesToken SET Counter = ? WHERE Token = ?', [newCounter, token], function (error, results2) {
            if (error) {
              callback(error, null)
              connection.end()
              return
            }
            var newRowtoMsginUpdate = {
              Name: payload.name,
              Email: payload.email,
              Phone: payload.phone,
              Subject: payload.subject,
              Message: payload.message,
              TokenId: token
            }
            connection.query('INSERT INTO ArrivedMessages SET ', newRowtoMsginUpdate, function (error, results3) {
              if (error) {
                callback(error, null)
                connection.end()
                return
              }
              callback(null, results3.affectedRows)
              connection.end()
              return
            })
          })
        } else {
          if (results.length == 0) {
            var newRowtoMsgToken = {
              Token: token,
              Counter: 1
            }
            connection.query('INSERT INTO ArrivedMessagesToken SET ', newRowtoMsgToken, function (error, results4) {
              if (error) {
                callback(error, null)
                connection.end()
                return
              }
              var newRowtoMsginInsert = {
                Name: payload.name,
                Email: payload.email,
                Phone: payload.phone,
                Subject: payload.subject,
                Message: payload.message,
                TokenId: results4.insertId
              }
              connection.query('INSERT INTO ArrivedMessages SET ', newRowtoMsginInsert, function (error, results5) {
                if (error) {
                  callback(error, null)
                  connection.end()
                  return
                }
                callback(null, results5.affectedRows)
                connection.end()
                return
              })
            })
          }
          else {
            callback(new Error('Exceed Apart'), null)
            connection.end()
            return
          }
        }
      })
    })
  }
}