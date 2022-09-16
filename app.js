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
    res.send('Get User by Id');
});

app.post('/add', (req,res) => {
    res.send('New User');
});

app.put('/update/:id', (req, res) => {
    res.send('Update User')
});

app.delete('/delete/:id', (req, res) => {
    res.send('Delete User')
});


//Check Connect
conn.connect(error => {
    if(error) throw error;
    console.log('Database server running!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT} `));