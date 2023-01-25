// jshint esversion:6
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/mydb", { useNewURLParser: true });
const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

// mongose 
const newSchmea = new mongoose.Schema(
    {
        name2:
        {
            type: String,
            required: [true, 'Name is required']
        },
        email:
        {
            type: String,
            unique: [true, "already used e-mail"],
            required: [true, 'E-mail is required']
        },
        password:
        {
            type: String,
            unique: [true, "already used password"],
            required: [true, 'Password is required']
        },
        age:
        {
            type: Number,
            require: [true, 'Age is required']
        },
        number2:
        {
            type: Number,
            required: [true, 'Contact is required']
        }
    }
);
const Data = mongoose.model("Data", newSchmea);

/////////

// app.get("/",function(req,res)
// {
//     res.sendFile(__dirname + "/index.html");
// });



app.post("/", async function (req, res) {
    var name = req.body.name2;
    var email = req.body.email;
    var password = req.body.password;
    var confirmPassword = req.body.confirmPassword;
    var age = req.body.age;
    var phone = req.body.number2;
    const temp = new Data({
        Name: name,
        Email: email,
        Password: password,
        Age: age,
        Contact: phone
    });
    console.log(req.body);
    // console.log(name, email, password, confirmPassword, age, phone);
    if (password != confirmPassword)
        return res.status(200).send("Password Does not matches")
    else if (phone.length != 10)
        return res.status(200).send("Contact Number should be 10 digits")
    else if (age < 10)
        return res.status(200).send("Too small boy !!! ")
    else if (age > 100)
        return res.status(200).send("Chacha not for you ")
    else {
        try {
            console.log(req.body);
            const user = await Data.create(req.body)
            console.log(user)
            return res.status(200).send("Succesfully added to the database :)")
        }
        catch (err) {
            console.log(" hiii i am here ");
            var toSend;
            if (err.keyPattern.password == 1)
                toSend = "Please try some new password this is alredy again"
            else if (err.keyPattern.email == 1)
                toSend = "not a unique e-mail"
            console.log(toSend);
            return res.status(400).send(toSend);
        }
    }
});
const PORT = 7000;
// app.listen(7000, 'localhost');  or  for all interfaces
// app.listen(7000, '0.0.0.0');
app.listen(PORT, function (err) {
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
})