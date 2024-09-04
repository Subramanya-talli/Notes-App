const Dotenv = require("dotenv")
const express = require("express")
const app = express();
const routes = require("./routes/routes")
const connectToDataBase = require("./connectDb");
const Notes = require('./model/note')
const path = require("path")
const method_override = require("method-override")
const StaticRoutes = require("./routes/staticRoutes");
const userRoute = require("./routes/user"); 
const cookieParser = require("cookie-parser");
const { restrictedToLoginUser } = require("./middleware/auth")

Dotenv.config();

const PORT = process.env.PORT;
app.set("view engine", "ejs");


app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(method_override('_method'));
app.use(cookieParser());
app.use("/Css", express.static(path.resolve(__dirname, 'assets/Css')));
app.use("/assets/Images", express.static(path.resolve(__dirname, 'assets/images')));



app.get('/', async(req,res) => {
    res.render("home");    
})

app.use('/users', restrictedToLoginUser, routes);
app.use('/user', userRoute);

app.listen(PORT, function()
{
    console.log(`Server is running in the ${PORT}`)
})


connectToDataBase(process.env.MONGODB_URL).then(()=>{
    console.log("connected to DataBase")
}).catch((err)=>
{
    console.log(err)
})

