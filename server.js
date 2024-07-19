const express = require("express");
const app = express();
var cors = require('cors');
var cors = require('cors');
const port = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
    console.log("whact")
    return res.json('MY SERVER IS RUNNING!!!');
})

app.use("/payment", require("./routes/payment"));

// route included
app.use("/payment", require("./routes/payment"));

app.listen(port, () => console.log(`server started on port ${port}`));
