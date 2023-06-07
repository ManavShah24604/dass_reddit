const express = require("express");
const router = express.Router();

router.route("/").get(async (req, res) => {
    res.status(200).send("To take ")
    console.log('recieved  ');
})



router.route("/").post(async (req, res) => {
    console.log(req.body);
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var confirmPassword = req.body.confirmPassword;
    var age = req.body.age;
    var phone = req.body.phone;
    const temp = new Data({
        name: name,
        email: email,
        password: password,
        age: age,
        phone: phone
    });
    if (password != confirmPassword)
        return res.status(400).send("Password Does not matches")
    // else if (phone.length != 10)
    //     return res.status(400).send("Contact Number should be 10 digits")
    // else if (age < 10)
    //     return res.status(400).send("Too small boy !!! ")
    // else if (age > 100)
    //     return res.status(400).send("Chacha not for you ")
    else {
        try {
            console.log(req.body);
            // console.log('hii');
            const user = await Data.create(temp)
            // console.log('not here ');
            console.log(user)
            return res.status(200).send("Succesfully added to the database :)")
        }
        catch (err) {
            // console.log(" hiii i am here ");
            var toSend;
            // if (err.keyPattern.password == 1)
            //     toSend = "Please try some new password this is alredy again"
            // else if (err.keyPattern.email == 1)
            //     toSend = "not a unique e-mail"
            // console.log(toSend);
            console.log('hii')
            console.log(err);
            return res.status(400).send(toSend);
        }
    }
    // res.status(200).send("To post  ")
})




module.exports = router;