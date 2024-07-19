const express = require("express");
const app = express();
var cors = require('cors');
var cors = require('cors');
const port = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json({ extended: false }));

// route included
app.use("/payment", require("./routes/payment"));

app.listen(port, () => console.log(`server started on port ${port}`));
