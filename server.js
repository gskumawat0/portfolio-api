// import packages
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const expressSanitizer = require("express-sanitizer");
const content = require("./routes/content");

//env setup
const { DB_URI, PORT = 8000, NODE_ENV = "development" } = process.env;
mongoose
	.connect(DB_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
	.then(() => {
		console.log("mongodb connected");
	})
	.catch((e) => {
		console.log(e.message);
	});

app.use(cors());
app.use(bodyParser.json());
app.use(expressSanitizer());

app.use("/api/public", content);

app.use((err, req, res, next) => {
	if (err) {
		return res.status(500).json({
			message: err.message,
		});
	}
	next();
});

if (NODE_ENV === "development") {
	const morgan = require("morgan");
	app.use(morgan("dev"));
	mongoose.set("debug", true);
}

app.listen(PORT, function () {
	console.log(`The Server is live at http://localhost:${PORT}`);
});
