const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/users', (req, res) => {
    const url = 'http://jsonplaceholder.typicode.com/users';
    fetch(url)
        .then(response => response.json())
        .then(data => res.send(data))
        .catch(err => res.send(err))
})

app.get('/posts', (req, res) => {
    const url2 = 'http://jsonplaceholder.typicode.com/posts';
    fetch(url2)
        .then(response => response.json())
        .then(data => res.send(data))
        .catch(err => res.send(err))
})
app.listen(8000);