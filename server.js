require('dotenv').config();
const express = require("express");
const port=process.env.PORT||3000;
const ejs = require("ejs");
const path = require("path");
const layouts = require("express-ejs-layouts");
const app = express();
app.use(layouts);
 app.use(express.urlencoded({extended:false}));
 app.use(express.json());
const mongoose=require("mongoose");
const session = require("express-session");
 const flash = require("express-flash");
 const passport = require("passport");
 const MongoDbConnect = require("connect-mongo");
 require('./app/db/connc');
//session config....
app.use(session({
secret:process.env.SECRET_KEY,
resave:false,
saveUninitialized:true,
store: MongoDbConnect.create({
    mongoUrl: process.env.MONGO_CONNECTION_URL||'mongodb://localhost:27017/myblog',
   
  }),
 cookie:{maxAge:1000*60*60*24}, 
}));
app.use(flash())
//passport config
const passportinit = require('./app/config/passport');
passportinit(passport);
app.use(passport.initialize());
app.use(passport.session());
//setting up global session
app.use((req,res,next)=>{
res.locals.session = req.session;
res.locals.user = req.user;
next();
});
 app.set("views", path.join(__dirname,"resources/views"));
 app.set("view engine","ejs");
 app.use(express.static('public'))
 // Set these values, found in Bucket > Settings after logging in at https://app.cosmicjs.com/login
require('./routes/routes.js')(app);


app.listen(port , ()=>{

	console.log(`your server is runnig on${port}`)
})

