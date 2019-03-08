// import packages
process.env.NODE_ENV === 'development' && require("dotenv").config();
// console.log(process.env.NODE_ENV === 'development', 1211, process.env.DATABASEURL);
const express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    nodemailer = require("nodemailer"),
    bodyParser = require("body-parser"),
    User = require("./models/user.js"),
    session = require("express-session"),
    // cookieParser = require("cookie-parser"),
    flash = require("connect-flash");

// nodemailer transporter setup
let transporter = nodemailer.createTransport({
    host: 'smtp.stackmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'projectmail@nintia.in', // generated ethereal user
        pass: process.env.EMAIL_PWD // generated ethereal password
    }
});


//env setup
const dbUrl = process.env.DATABASEURL;
mongoose.connect(dbUrl, { useNewUrlParser: true, useCreateIndex: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));


//express session config( connect -flash require session)
app.use(session({
    secret: "gufyfwdwe76r74524234343jkke833220v2893747464ee23leh",
    resave: false,
    saveUninitialized: false,
}));


//flash config
// app.use(cookieParser('my connect wibes'));
app.use(flash());

app.use(function(req, res, next) {
    // res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.get('/', function(req, res) {
    res.render('index');
});

//handle user input
app.post('/', async function(req, res) {
    try {
        let { name, message, email, subject } = req.body;
        let newMessage = await User.create({ name, message, email, subject });

        console.log(newMessage)
        // send mail
        let userMailOption = {
            from: 'projectmail@nintia.in', // sender address
            to: newMessage.email, // list of receivers
            subject: `Thanks for contacting Gouri Shankar`, // Subject line
            text: `
Hi ${newMessage.name},
I hope you are doing well.
you contact me regarding: ${newMessage.subject}
Again thanks for asking us.
Regards : -
 Gskumawat
                            ` // html body
        };

        // send mail with defined transport object
        transporter.sendMail(userMailOption);
        let myMailOption = {
            from: 'projectmail@nintia.in', // sender address
            to: "gskumawat555@gmail.com", // list of receivers
            subject: `${newMessage.name} contact you from portfolio`, // Subject line
            text: `
    New user registered. concern are as below : 
    Email : ${newMessage.email}  
    Name : ${newMessage.name}
    subject: ${newMessage.subject}
    Message : ${newMessage.message} 
    help him well.
    And remember to enjoy your day.
                         ` // html body
        };

        // send mail with defined transport object
        transporter.sendMail(myMailOption);

        req.flash("success", "thanks for contacting me. i'll back to you shortly.");
        return res.redirect('/#flash');
    }
    catch (err) {
        req.flash('error', err.message);
        return res.redirect('/');
    }
});


// for unknown urls
app.get('*', function(req, res) {
    res.send("please enter correct url or report to admin at gskumawat555@gmail.com");
});
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The Server Has Started!");
});
