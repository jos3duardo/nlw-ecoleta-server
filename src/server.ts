import express from 'express'

const app = express();

app.get('/users', (request, response) => {
    console.log('Listagem de usuarios')

    response.json([
        'Diego',
        'Jose',
        'Pedro',
        'Pedro',
        'Pedro',
        'Leandro'
    ]);
})

app.listen(3334)