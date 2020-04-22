// import packages
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const content = require("./routes/content");
//env setup
const { DB_URI, PORT = 8000 } = process.env;
mongoose
	.connect(DB_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
	.then(() => {
		console.log("mongodb connected");
	})
	.catch((e) => {
		console.log(e);
	});
app.use(bodyParser.json({ extended: true }));
app.use(cors());

app.use("/api/public/content", content);

app.listen(PORT, function () {
	console.log("The Server Has Started!");
});
