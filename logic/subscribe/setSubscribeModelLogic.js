var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'adp',
  database: 'FlieralSite'
})

module.exports = {
  setSubscriberModel: function (token, payload, callback) {
    connection.connect()
    connection.query('SELECT * FROM SubscribeToken WHERE Token =?', token, function (error, results) {
      if (error) {
        callback(error, null)
        connection.end()
        return
      }
      if (results[0].Token !== null && results[0].Counter < 5) {
        var newCounter = results[0].Counter + 1
        connection.query('UPDATE SubscribeToken SET Counter = ? WHERE Token = ?', [newCounter, token], function (error, results2) {
          if (error) {
            callback(error, null)
            connection.end()
            return
          }
          var newRowtoSubinUpdate = {
            Email: payload.email,
            STokenId: token
          }
          connection.query('INSERT INTO Subscribers SET ', newRowtoSubinUpdate, function (error, results3) {
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
          var newRowtoSubToken = {
            Token: token,
            Counter: 1
          }
          connection.query('INSERT INTO SubscribeToken SET ', newRowtoSubToken, function (error, results4) {
            if (error) {
              callback(error, null)
              connection.end()
              return
            }
            var newRowtoSubinInsert = {
              Email: payload.email,
              STokenId: results4.insertId
            }
            connection.query('INSERT INTO Subscribers SET ', newRowtoSubinInsert, function (error, results5) {
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