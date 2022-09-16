const express = require('express');
const mysql = require('mysql');

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3050;

const app = express();

app.use(bodyParser.json());

//?Create Connect
const conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'my_db'
});
//Route
app.get('/', (req,res) => {
    res.send('Welcome to my API!');
});

// all users
app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    conn.query(sql, (error, results) => {
        if(error) throw error;
        if(results.length > 0){
            res.json(results);
        }else {
            res.send('Not results')
        }

    });

});

app.get('/users/:id', (req, res) => {
    const {id } = req.params;
    const sql = `SELECT * FROM users WHERE idUser = ${id}`;
    conn.query(sql, (error, result) => {
        if(error) throw error;

        if(result.length > 0){
            res.json(result);
        }else {
            res.send('Not results')
        }

    });
});


app.post('/add', (req,res) => {
    const sql = 'INSERT INTO users SET ?';
    const userObj = {
        name : req.body.name,
        lastname : req.body.lastname,
        nickname : req.body.nickname,
        password : req.body.password,
        email : req.body.email
    }
    conn.query(sql, userObj, error => {
        if (error) throw error;
        res.send('User Created');
    })
});

app.put('/update/:id', (req, res) => {
    const {id } = req.params;
    const {name, lastname, nickname, password, email} = req.body;
    const sql = `UPDATE users SET name = '${name}',  lastname = '${lastname}', nickname = '${nickname}', password = '${password}', email = '${email}' WHERE idUser = ${id}`;
    
    conn.query(sql, error => {
        if (error) throw error;
        res.send('User Updated');
    });
});

app.delete('/delete/:id', (req, res) => {
    const {id } = req.params;
    const sql = `DELETE FROM users WHERE idUser = ${id}`;
    conn.query(sql, error => {
        if (error) throw error;
        res.send('User Deleted');
    });

});


//Check Connect
conn.connect(error => {
    if(error) throw error;
    console.log('Database server running!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT} `));