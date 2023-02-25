const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log("give password as argument");
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://user:${password}@cluster0.rjcwa.mongodb.net/phonebookDB?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const recordSchema = new mongoose.Schema({
    id: Number,
    name: String,
    number: String
});

const Record = mongoose.model('Record', recordSchema);

if (process.argv.length === 3) {

    Record
        .find({})
        .then((data) => {
            console.log(data);
        })
        .catch(err => console.log(err));
}
else if (process.argv.length === 5) {

    const record = new Record({
        id: Math.round(Math.random(1000)),
        name: process.argv[3],
        number: process.argv[4]
    });

    record.save().then(() => {
        console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
    }).catch(err => console.log(err));


} else {
    process.exit(1);
}