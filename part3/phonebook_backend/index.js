require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { Person } = require('./models/Person')

const app = express();
app.use(express.json());
app.use(cors())

morgan.token('data', function (req, res) {
    if (req.method === 'POST') {
        return JSON.stringify(req.body);
    }
    return " ";
})

app.use(morgan(":method :url :status :res[content-length] - :response-time ms :data"));

app.use(express.static('build'))

let phonebooks = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
];

app.get('/api/persons', (req, res) => {
    Person
        .find({})
        .then((data) => {
            res.status(200).json(data);
        })
        .catch(err => console.log(err));
});

app.get('/info', (req, res) => {
    const HTML = `
    <p>Phonebook has info for ${phonebooks.length} people</p>
    ${new Date()}
    `;
    res.status(200).send(HTML);

});

app.get('/api/persons/:id', (req, res) => {
    const person = phonebooks.find((p) => p.id == id);
    // console.log(person);
    if (person !== undefined) {
        res.send(person);
    } else {
        return res.status(404).send({ message: `id:${id} is not found.` });
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = phonebooks.find((p) => p.id === id);
    // console.log(person);
    if (person !== undefined) {
        phonebooks = phonebooks.filter((p) => p.id !== id)
        res.status(204).end()
    } else {
        return res.status(404).send({ message: `id:${id} is not found.` });
    }
});


app.post('/api/persons', (req, res) => {
    // console.log(req.body);
    if (req.body.name === undefined || req.body.number === undefined) {
        return res.status(404).send({ error: "name and number are required" })
    }
    const { name, number } = req.body;
    Person.findOne({ name: name }).then((data) => {
        if (data) {
            res.status(404).send({ error: "name must be unique" }).end();
        }
    });

    const newPerson = new Person({ name, number })
    newPerson.save().then(((data) => {
        res.status(201).json(data);
    }))
        .catch(err => console.log(err));

})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

