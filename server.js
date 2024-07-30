const express = require("express");
const mongoose = require("mongoose");
const app = express();
var cors = require('cors');
var cors = require('cors');
const port = process.env.PORT || 5000;

// middlewares
app.use(cors({
    origin: '*', // replace with your frontend domain
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json({ extended: false }));

const dbURI = 'mongodb+srv://prajjwal:SzTiVxJDpZQaPY9z@journal-db.lxytsl8.mongodb.net/journal-db?retryWrites=true&w=majority';

mongoose.connect(dbURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    console.log("whact")
    return res.json('MY SERVER IS RUNNING!!!');
})

app.use("/payment", require("./routes/payment"));

// route included
app.use("/payment", require("./routes/payment"));

app.use("/newsletter", require("./routes/newsletter"));

app.use("/save-order", require("./routes/orders"));


app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
  });
