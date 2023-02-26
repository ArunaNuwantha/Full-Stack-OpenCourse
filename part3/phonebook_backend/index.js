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

const errorHandler = (error, req, res, next) => {
    console.error(error.name);
    if (error.name === 'ValidationError') {
        return res.status(400).json({ name: error.name, message: error.message });
    }
    next(error);

}



app.get('/api/persons', (req, res, next) => {
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

app.get('/api/persons/:id', (req, res, next) => {
    Person.findOne({ _id: req.params.id }).
        then((person) => {
            if (person) {
                return res.send(person);
            } else {
                // return res.status(404).send({ message: `id:${req.params.id} is not found.` });
                next(`id:${req.params.id} is not found. `);
            }
        }).catch(err => {
            next(err);
        });
});


app.post('/api/persons', (req, res, next) => {
    // console.log(req.body);
    if (req.body.name === undefined || req.body.number === undefined) {
        return res.status(404).send({ error: "name and number are required" })
    }
    const { name, number } = req.body;
    Person.findOne({ name: name }).then((data) => {
        if (data) {
            return res.status(404).json({ error: "name must be unique" }).end();
        }
    });

    const newPerson = new Person({ name, number })
    newPerson.save()
        .then(((data) => {
            res.status(201).json(data);
        }))
        .catch(error => {
            // console.log(error);
            next(error);
        });

});

app.put('/api/persons/:id', (req, res, next) => {
    if (req.body.name === undefined || req.body.number === undefined) {
        return res.status(404).send({ error: "name and number are required" })
    }
    const { name, number } = req.body;
    Person.findOneAndUpdate({ name: name }, { $set: { number: number } }).then((data) => {
        if (data) {
            return res.status(203).json(data);
        }
    });

});

app.delete('/api/persons/:id', (req, res, next) => {

    Person.findByIdAndRemove(req.params.id)
        .then((person) => {
            console.log(person);
            if (person) {
                return res.status(204).end();
            } else {
                return res.status(404).send({ message: `id:${req.params.id} is not found.` });
            }
        }).catch(err => {
            next(err);
        })
});

app.use(errorHandler);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

