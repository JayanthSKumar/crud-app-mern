const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/users");

const app = express();
const port = 3001;

//DB connection
mongoose.connect("mongodb://localhost:27017/crud")

//middleware
app.use(cors())          //allows requests from other domains to access your server's resources
app.use(express.json())  //When a client sends data to the server in a JSON format (commonly in the body of an HTTP request), this middleware parses that data and makes it available in req.body of the request object. This is particularly useful when you're building APIs or web applications that send and receive JSON data

app.get("/", async (req, res) => {
    await UserModel.find({})
        .then(users => res.json(users))
        .catch(err => res.json(err))
})

app.post("/createUser", async (req, res) => {
    await UserModel.create(req.body)
        .then(users => res.json(users))
        .catch(err => res.json(err))
})

app.get("/getUser/:id", async (req, res) => {
    const id = req.params.id;
    await UserModel.findById({_id:id})
        .then(user => res.json(user))
        .catch(err => res.json(err))

})
app.put("/updateUser/:id", async (req, res) => {
    const id = req.params.id;
    await UserModel.findByIdAndUpdate({_id:id}, {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age
    })
    .then(user => res.json(user))
    .catch(err => res.json(err))
})

app.delete("/:id", async (req, res) => {
    const id = req.params.id;
    await UserModel.findByIdAndDelete({_id:id})
    .then(user => res.json(user))
    .catch(err => res.json(err))
})

app.listen(port, () => {
    console.log(`Server is Running in Port ${port}`);
})