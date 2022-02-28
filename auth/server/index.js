require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const User = require("./models/user");

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.post("/",async (req,res) =>{
    try{
        console.log("req.body:",req.body);
        const newUser = new User({
            username : req.body.username,
            email:req.body.email,
            password:req.body.password,
        });
        await User.create(newUser);
        res.send("User Added");

    }
    catch(err){
            console.log("error: ",err);
        }
});

const port = process.env.port || 4000;
app.listen(port, console.log(`Listening on port ${port}...`));