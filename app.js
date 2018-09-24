// import packages
var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    nodemailer = require("nodemailer"),
    bodyParser = require("body-parser"),
    User = require("./models/user.js"),
    session = require("express-session"),
    cookieParser = require("cookie-parser"),
    flash = require("connect-flash");

// nodemailer transporter setup
let transporter = nodemailer.createTransport(
{
    host: 'smtp.stackmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth:
    {
        user: 'gs@nintia.in', // generated ethereal user
        pass: 'gsK@w3b95' // generated ethereal password
    }
});


//env setup
var url = process.env.DATABASEURL || "mongodb://localhost/portfolio";
mongoose.connect(url, { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));


//express session config( connect -flash require session)
app.use(session(
{
    secret: "gufyfwdwe76r74524234343jkke833220vf633ejkyucvfgatryuifd43632893747464ee23leh",
    resave: false,
    saveUninitialized: false,
}));


//flash config
app.use(cookieParser('my connect wibes'));
app.use(flash());

app.use(function(req, res, next)
{
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});
app.get('/', function(req, res)
{
    res.render('index');
});

//handle user input
app.post('/', function(req, res)
{
    var name = req.body.user.name,
        message = req.body.user.message,
        username = req.body.user.email;
    var newMessage = { name: name, username: username, message: message };

    User.create(newMessage, function(error, newMessage)
    {
        if (error)
        {
            req.flash("error", "something went wrong. try again");
        }
        else
        {
            req.flash("success", "thanks for contacting me. i'll back to you shortly.");

            // send mail
            let mailOptions = {
                from: 'gs@nintia.in', // sender address
                to: `${newMessage.username}`, // list of receivers
                subject: `thanks for connecting with gskumawat`, // Subject line
                html: `<div style='padding:20px; background:#aea9d8;'>
                            <p style='margin: 0; line-height:10px; font-size:18px;'> Hi ${newMessage.name}, How are you?.</p> <br> 
                            <p style='margin:0; line-height:10px; font-size:18px;'>I hope you are doing well. i'm very happy that you take an extra step to solve your problem.</p><br>
                            <p style='margin:0; line-height:10px; font-size:18px;'>You reach out to us, so be assured your problem will solved shortly.till then keep enjoying and be happy.</p> <br>
                            <p style='margin:0; line-height:10px; font-size:18px;'>Again thanks for asking us.</p> <br> <br>
                            <p style='margin: 0 20px; line-height:10px; font-size:20px;'>Regards : -</p> <br>
                            <h4 style='margin: 0 30px; line-height:15px; font-size:20px;'> Gskumawat</h4> 
                        </div>` // html body
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) =>
            {
                if (error)
                {
                    req.flash("error", "please provide correct email address. it's only medium for further communication");
                    // console.log(error);
                }
                else
                {
                    // console.log('message sent to user successfully');
                }

            });


            //send email to me
            let mailMeOptions = {
                from: 'gs@nintia.in', // sender address
                to: "gskumawat555@gmail.com", // list of receivers
                subject: 'a new request has arrived', // Subject line
                html: `<div style='padding:20px; background:#aea9d8;'>
                        <p style='margin: 0; line-height:10px; font-size:18px;'> New user registered. credentials are below : </p><br> 
                        <p style='margin: 0; line-height:10px; font-size:18px;'> Email : ${newMessage.username}  </p><br>
                        <p style='margin: 0; line-height:10px; font-size:18px;'>Name : ${newMessage.name}</p> <br>
                        <p style='margin: 0; line-height:10px; font-size:18px;'>Message : ${newMessage.message} </p><br>
                        <p style='margin: 0; line-height:10px; font-size:18px;'> help him well.</p> <br>
                        <p style='margin: 0; line-height:10px; font-size:18px;'> From : -</p> <br>
                        <p style='margin: 0; line-height:10px; font-size:18px;'> Gskumawat(portfolio)</p>
                     </div>` // html body
            };

            // send mail with defined transport object
            transporter.sendMail(mailMeOptions, (error, info) =>
            {
                if (error)
                {
                    // console.log(error);
                }
                else
                {
                    // console.log('message sent to me successfully');
                }

            });
        }
    });
    setTimeout(function()
    {
        res.redirect('/');
    }, 5000);
});


// for unknown urls
app.get('*', function(req, res)
{
    res.send("please enter correct url or report to admin at gskumawat555@gmail.com");
});
app.listen(process.env.PORT, process.env.IP, function()
{
    // console.log("The Server Has Started!");
});
