var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'adp',
  database: 'FlieralSite'
})

module.exports = {
  setMessageModel: function (token, payload, callback) {
    connection.connect()
    connection.query('SELECT * FROM ArrivedMessagesToken WHERE Token =?', token, function (error, results) {
      if (error) {
        callback(error, null)
        connection.end()
        return
      }
      if (results[0].Token !== null && results[0].Counter < 5) {
        var newCounter = results[0].Counter + 1
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
        if (results[0].Token === null) {
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
      }
    })
  }
}