const mongoose = require('mongoose');
// mongoose.set("strictQuery", false);
// mongoose.connect(process.env.MONGO_URL, () => {
//   console.log("Connected to MongoDB");
// });
mongoose.connect("mongodb://localhost:27017/mydb", { useNewURLParser: true });

const newSchmea = new mongoose.Schema(
    {
        Name:
        {
            type: String,
            required: [true, 'Name is required']
        },
        Email:
        {
            type: String,
            unique: [true, "already used e-mail"],
            required: [true, 'E-mail is required']
        },
        Password:
        {
            type: String,
            unique: [true, "already used password"],
            required: [true, 'Password is required']
        },
        Age:
        {
            type: Number,
            require: [true, 'Age is required'];
        },
        Contact:
        {
            type: Number,
            required:[true,'Contact is required']
        }
    }
);

const myData = mongoose.model("Data", newSchmea);

const temp = new myData({
    Name: 'manav',
    Email: 'manavdshah@gmail.com',
    Password: 'xyz',
    Age: 18,
    Contact: 324324324234
});

// temp.save();