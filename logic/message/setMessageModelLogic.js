var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'flieralsite'
})

module.exports = {
  setMessageModel: function (token, payload, callback) {
    connection.connect()
    connection.query('SELECT * FROM arrivedmessagestoken WHERE Token =?', token, function (error, results) {
      if (error) {
        callback(error, null)
        connection.end()
        return
      }
      if (results[0].Token !== null && results[0].Counter < 5) {
        var newCounter = results[0].Counter + 1
        connection.query('UPDATE arrivedmessagestoken SET Counter = ? WHERE Token = ?', [newCounter, token], function (error, results2) {
          if (error) {
            callback(error, null)
            connection.end()
            return
          }
          var newRowtoMsginUpdate = {
            Name: payload.Name,
            Email: payload.Email,
            Phone: payload.Phone,
            Subject: payload.Subject,
            Message: payload.Message,
            TokenId: token
          }
          connection.query('INSERT INTO arrivedmessages SET ', newRowtoMsginUpdate, function (error, results3) {
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
            Counter: 0
          }
          connection.query('INSERT INTO arrivedmessagestoken SET ', newRowtoMsgToken, function (error, results4) {
            if (error) {
              callback(error, null)
              connection.end()
              return
            }
            var newRowtoMsginInsert = {
              Name: payload.Name,
              Email: payload.Email,
              Phone: payload.Phone,
              Subject: payload.Subject,
              Message: payload.Message,
              TokenId: results4.insertId
            }
            connection.query('INSERT INTO arrivedmessages SET ', newRowtoMsginInsert, function (error, results5) {
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