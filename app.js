const express = require('express')
const app = express()

var path = require("path");

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))

var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'usershomework'
});

connection.connect()

connection.query('SELECT * FROM users', function (err, data) {
  if (err) throw err

  app.get('/users', function (req, res) {
    var usernames = '';
    for(let i=0; i< data.length; i+=1){
      usernames+= data[i].username + ', ';
    }
    res.send('Users are: ' + usernames);
  })

  
})

connection.query('SELECT * FROM users', function (err, data) {
  if (err) throw err
  for(let i=0; i< data.length; i+=1){
    app.get('/users/' + data[i].id, function(req, res){
      res.send('id: ' + data[i].id + ', Username: ' + data[i].username + ', E-mail: ' + data[i].email + ', Adress: ' + data[i].adress + ', Role: ' + data[i].role);

    })
  }
})

connection.end()