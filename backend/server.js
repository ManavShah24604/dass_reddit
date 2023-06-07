// jshint esversion:6
const cors = require('cors');
const express = require("express");

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json())
app.use(cors());
const PORT = 7000;
const mongoose = require('mongoose');
const uri = ""
// const { application } = require('express');
// const { RedoTwoTone, OneK, AodOutlined } = require('@mui/icons-material');
// const { default: reactSelect } = require('react-select');
var db = mongoose.connect("mongodb+srv://admin:admin@dass.qbwf4ei.mongodb.net/test?retryWrites=true&w=majority", { useNewURLParser: true });


const Numberofuserschema = new mongoose.Schema({
    date:
    {
        type: Date
    },
    no: {
        type: Number
    },
    subgid:
    {
        type: String
    }
});
const userData = mongoose.model("userData", Numberofuserschema);


const subgUsers = new mongoose.Schema({
    date:
    {
        type: String
    },
    no: {
        type: Number
    },
    subgid:
    {
        type: String
    }
});
const subgUsersData = mongoose.model("subgusersData", subgUsers);

const reportDelete = new mongoose.mongoose.Schema({
    reported:
    {
        type: Number
    },
    deleted: {
        type: Number
    },
    subgid:
    {
        type: String
    },
    store:
    {
        type: Number
    }
});
const reportDeletedata = mongoose.model("reportDeletedata", reportDelete);

const postnumber = new mongoose.Schema({
    date:
    {
        type: String
    },
    no: {
        type: Number
    },
    subgid:
    {
        type: String
    }
});

const postNumber = mongoose.model("postNumber", postnumber);


const newSchmea = new mongoose.Schema(
    {
        date:
        {
            type: Date
        },
        name:
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
            required: [true, 'Password is required']
        },
        age:
        {
            type: String,
            require: [true, 'Age is required']
        },
        phone:
        {
            type: String,
            required: [true, 'Contact is required']
        },
        followers:
        {
            type: Array
        },
        following:
        {
            type: Array
        }

    }
);
const Data = mongoose.model("Data", newSchmea);

const postSchema = new mongoose.Schema(
    {
        text:
        {
            type: String
        },
        like:
        {
            type: Array
        },
        dislike: {
            type: Array
        },
        email:
        {
            type: String
        },
        subgid:
        {
            type: String
        },
        ok: {
            type: Boolean
        },
        saved:
        {
            type: Array
        },
        comments: {
            type: Array
        },

    }
);

const postData = mongoose.model("post", postSchema);

const reportSchema = new mongoose.Schema(
    {
        date: {
            type: Date
        },
        reportedby:
        {
            type: String
        },
        reportedof:
        {
            type: String
        },
        concern: { type: String },
        text: { type: String },
        subgid: { type: String },
        postid: { type: String },
        state: {
            type: Number
        }
    }
)
const reportData = mongoose.model("report", reportSchema);


const subgschema = new mongoose.Schema(
    {
        name:
        {
            type: String,
            required: [true, 'Name is required']
        },
        description:
        {
            type: String,
            // required: [true, 'Name is required']
        },
        tags:
        {
            type: String
        },
        bannedKeywords:
        {
            type: String
        },
        email:
        {
            type: String,
            require: true
        },
        followers:
        {
            type: Array
        },
        permanent:
        {
            type: Array
        },
        left:
        {
            type: Array
        },
        blockedusers:
        {
            type: Array
        },
        posts:
        {
            type:Number
        }

    }
);

const subgData = mongoose.model("subgData", subgschema);

function ValidateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
    // alert("You have entered an invalid email address!")
    return (false)
}


app.post('/api/register', async (req, res) => {
    console.log(req.body);
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var confirmPassword = req.body.confirmPassword;
    var age = req.body.age;
    var phone = req.body.phone;
    var temp = {};
    if (password != confirmPassword)
        return res.status(400).send("Password Does not match")
    else if(phone.length!=10)
    {
        return res.status(400).send("Length of phone should be 10 ");
    }
    else if(ValidateEmail(email)==false)
    {
        console.log('gere in incorrect email ');
        return res.status(400).send("Email not valid  ");
    }
    else {


        // console.log('hii');

        temp = Data({
            name: name,
            email: email,
            age: age,
            phone: phone,
            followers: [],
            following: []

        });
        bcrypt.hash(password, 10, async function (err, hash) {
            temp.password = hash;
            // console.log('this is user', user);
            try {
                const user = await Data.create(temp);
                return res.status(200).send('Enter Details Properly ');
            }
            catch (err) {
                var toSend;
                console.log('this ise errr ', err);;
                return res.status(400).send(err);
            }
            // return res.status(200).send("Succesfully added to the database :)")
        })
        // const dt = new Date();
        // console.log(dt);
        // userData.find(({ date: dt }), async function (errrrrrr, val) {
        //     console.log('this is ', val);
        //     if (val.length == 0) {
        //         var myobj = {
        //             date: dt,
        //             no: 1
        //         }
        //         const some = await userData.create(myobj);
        //     }
        //     else {
        //         var newvalues = { $set: { no: val[0].no + 1 } };
        //         userData.updateOne(({ date: dt }), (newvalues), function (er, ans) {
        //             console.log('inserted date ');
        //         })
        //     }
        // });

        // console.log('not here ');
        // return res.status(200).send('Enter Details Properly ');



    }
})

app.post('/api/addFollowers', async (req, res) => {
    console.log(req.body)
    var follower = req.body.follower;
    var following = req.body.following;
    var myquery = { 'email': follower };
    console.log(follower, following);
    Data.find(({ 'email': follower }), function (err, val) {
        var temparr = val[0].following;
        if (err) console.log(err);
        else {
            console.log(val);
            temparr.push(following);
            temparr = [...new Set(temparr)];
            var newvalues = { $set: { following: temparr } };
            // console.log('these are ', newvalues)
            Data.updateOne(({ 'email': follower }), newvalues, function (err, res) {
                if (err) console.log('this ', err);
                else
                    console.log("1 document updated");
                //   db.close();
            });
        }
    });

    myquery = { email: following };
    Data.find(({ 'email': following }), function (err, val) {
        var temparr = val[0].followers;
        console.log('in following ', temparr)
        temparr.push(follower);
        temparr = [...new Set(temparr)];
        var newvalues = { $set: { followers: temparr } };

        Data.updateOne(({ 'email': following }), newvalues, function (err, res) {
            if (err) console.log(err);
            else
                console.log("1 document updated");
            //   db.close();
        });
    });

    return res.status(200).send('ok');


})

app.post('/api/login', async (req, res) => {

    console.log(req.body);

    if(ValidateEmail(req.body.email)==false)
    {
        console.log('gere in incorrect email ');
        return res.status(400).send('email not valid');
    }

    Data.find(({ "email": req.body.email }), function (err, val) {
        // console.log('hii');
        console.log(val);
        if (val.length == 0) {
            console.log('in er1;')
            return res.status(200).send(val);
        }
        else {
            bcrypt.compare(req.body.password, val[0].password).then(function (resul) {
                // resul == true/false
                if (resul == true) {

                    // console.log('hii', resul);
                    const jwttoken = jwt.sign(
                        {
                            user: val[0]
                        },
                        "secret_token"
                    )
                    console.log('yes here ');
                    return res.status(200).send({ token: jwttoken, data: val[0] });
                }
                else
                    return res.status(200).send(val);
            });
        }
    })



    // return res.status(200).send(":)");
});

app.post('/api/getFollower', async (req, res) => {

    console.log(req.body);

    Data.find(({ "email": req.body.email }), function (err, val) {
        // console.log('hii');
        return res.status(200).send(val[0].followers);

    })   // return res.status(200).send(":)");
});

app.post('/api/getFollowing', async (req, res) => {

    console.log(req.body);

    Data.find(({ "email": req.body.email }), function (err, val) {
        // console.log('hii');
        return res.status(200).send(val[0].following);

    })   // return res.status(200).send(":)");
});

app.post('/api/dashboard', async (req, res) => {

    console.log(req.body);

    Data.find(({ "email": req.body.email }), function (err, val) {
        // console.log('hii');
        return res.status(200).send(val);

    })   // return res.status(200).send(":)");
});



app.post('/api/updateData', async (req, res) => {
    console.log("this is here ", req.body);
    var name = req.body.name;
    var email = req.body.email;
    // var password = req.body.password;
    var age = req.body.age;
    var phone = req.body.phone;
    var temp = {};

    try {
        temp = Data({
            name: name,
            age: age,
            phone: phone
        });
        // console.log(temp);
        console.log("here the email is: ", email);
        var myquery = { email: req.body.email };
        console.log("myquery ", myquery);
        var newvalues = { $set: { name: name, age: age, phone: phone } };
        Data.updateOne(myquery, newvalues, function (err, res) {
            if (err) console.log(err);
            else
                console.log("1 document updated");
            //   db.close();
        });

        // console.log('not here ');
        return res.status(200).send("Succesfully added to the database :)")
    }
    catch (err) {
        var toSend;
        return res.status(400).send(err);
    }

})


app.post('/api/following', async (req, res) => {

    console.log(req.body);
    var myquery = { email: req.body.email };
    var newvalues = { $set: { following: req.body.farr } };
    Data.updateOne(myquery, newvalues, function (err, res) {
        if (err) console.log(err);
        else
            console.log("1 document updated");
        //   db.close();

        Data.find(({ email: req.body.name }), function (err, val) {
            if (val.length > 0) {
                console.log(val[0].followers);
                var temparr = val[0].followers.filter((_, index) => val[0].followers[index] != req.body.email);
                newvalues = { $set: { followers: temparr } };
                console.log('this is temparr ', temparr, req.body.name);
                Data.updateOne({ email: req.body.name }, newvalues, function (err, res) {
                    console.log('updated');
                })
            }
        })
    });


    return res.status(200).send('yes');


});


app.post('/api/follower', async (req, res) => {

    console.log(req.body);
    var myquery = { email: req.body.email };
    var newvalues = { $set: { followers: req.body.farr } };
    Data.updateOne(myquery, newvalues, function (err, res) {
        if (err) console.log(err);
        else
            console.log("1 document updated");

        Data.find(({ email: req.body.name }), function (err, val) {
            if (val.length > 0) {
                console.log(val[0].following);
                var temparr = val[0].following.filter((_, index) => val[0].following[index] != req.body.email);
                newvalues = { $set: { following: temparr } };
                console.log('this is temparr ', temparr, req.body.name);
                Data.updateOne({ email: req.body.name }, newvalues, function (err, res) {
                    console.log('updated');
                })
            }
        })

    });




    return res.status(200).send('yes');


});


app.post('/api/mysubgform', async (req, res) => {

    console.log(req.body);
    temp = subgData({
        name: req.body.data.name,
        description: req.body.data.description,
        tags: req.body.data.tags,
        bannedKeywords: req.body.data.bannedKeywords,
        email: req.body.email,
        permanent: req.body.email,
        posts:0
    });
    const user = await subgData.create(temp);

    return res.status(200).send('yes');

});


app.post('/api/mysubgdata', async (req, res) => {
    console.log(req.body);
    subgData.find(({ "email": req.body.email }), function (err, val) {
        console.log(val);
        return res.status(200).send(val);
    }
    )
});

app.post('/api/subgdata', async (req, res) => {
    console.log(req.body);
    subgData.find(({}), function (err, val) {
        console.log(val);
        return res.status(200).send(val);
    }
    )
});

app.post('/api/joiningpageinitial', async (req, res) => {
    console.log(req.body);
    subgData.find(({ _id: req.body.subgid }), function (err, val) {
        console.log(val[0]);
        return res.status(200).send(val[0]);
    })
}
)

app.post('/api/joiningpage', async (req, res) => {
    console.log(req.body);
    Data.find(({ email: req.body.email }), function (err, val) {
        console.log(val);
        return res.status(200).send(val);
    }
    )
});

app.post('/api/mysubgDelete', async (req, res) => {

    console.log('this i sre  ', req.body);
    var myquery = { _id: req.body._id };
    postData.remove(({ subgid: req.body._id }), function (err, res) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(res, 'updated');
        }
    });


    reportData.remove(({ subgid: req.body._id, }), function (err, res) {
        if (err) {
            console.log(err);
        }
        else {
            console.log('reportdata updated ');
        }
    })

    // console.log(result);
    subgData.remove(myquery, function (err, obj) {
        console.log('deleted');
    });



    return res.status(200).send('yes');
})

app.post('/api/joinsubg', async (req, res) => {
    console.log(req.body);
    subgData.find(({ _id: req.body._id }), function (err, val) {
        console.log(val[0]);
        var temparr = []
        console.log(val[0].followers);
        if (val[0].followers != undefined) {
            temparr = val[0].followers
        }
        temparr.push(req.body.email);
        temparr = [...new Set(temparr)];
        var newvalues = { $set: { followers: temparr } };
        console.log(temparr);
        subgData.updateOne({ _id: req.body._id }, newvalues, function (errr, res) {
            if (errr) console.log(errr);
            else console.log('1 document updated ');
        })

    })
    return res.status(200).send('yes');
})

app.post('/api/leavesubg', async (req, res) => {
    console.log(req.body);
    subgData.find(({ _id: req.body._id }), function (err, val) {
        // console.log(val[0]);
        var temparr = []
        // console.log(val[0].followers);
        temparr = val[0].followers;
        var followers = temparr.filter((_, index) => temparr[index] != req.body.email);
        // var followers = temparr;
        temparr = val[0].permanent;
        var permanent = temparr.filter((_, index) => temparr[index] != req.body.email);
        console.log("this are forl ", followers);
        var temparr = val[0].left;
        temparr.push(req.body.email)
        var newvalues = { $set: { followers: followers, permanent: permanent, left: temparr } };
        subgData.updateOne({ _id: req.body._id }, newvalues, function (errr, res) {
            if (errr) console.log(errr);
            else console.log('1 document updated ');
        })
        var temp = {
            date: new Date(),
            no: permanent.length
        }

        var date = new Date();
        var temp = {
            date: new Date(),
            no: permanent.length,
            subgid: req.body._id
        }
        var ok = 1;
        userData.find(({ subgid: req.body._id }), function (err, val) {
            for (i = 0; i < val.length; i++) {
                if (val[i].date == date) {
                    var newvalues = { $set: { no: permanent.length } };
                    userData.updateOne({ subgid: req.body._id, date: val[i].date }, (newvalues), function (er, some) {
                        console.log('updatedd');
                    })
                    ok = 0;
                    break;
                }
            }
            if (ok == 1) {
                const some = userData.create(temp);
            }
        })


    })
    return res.status(200).send('yes');
})


app.post('/api/accept', async (req, res) => {
    console.log(req.body);
    subgData.find(({ _id: req.body._id }), function (err, val) {
        var permanent = [];
        var followers = [];
        permanent = val[0].permanent;
        followers = val[0].followers;
        permanent.push(req.body.email);
        for (var i = 0; i < followers.length; i++) {
            if (followers[i] == req.body.email) {
                var spliced = followers.splice(i, 1);
                console.log("Removed element: " + spliced);
                console.log("Remaining elements: " + followers);
            }
        }
        console.log(permanent, "  ", followers)
        permanent = [...new Set(permanent)];
        var newvalues = { $set: { followers: followers, permanent: permanent } };

        subgData.updateOne({ _id: req.body._id }, newvalues, function (errr, res) {
            if (errr) console.log(errr);
            else console.log('1 document updated ');
        })
        var date = new Date();
        var temp = {
            date: new Date(),
            no: permanent.length,
            subgid: req.body._id
        }
        var ok = 1;


        userData.find(({ subgid: req.body._id }), function (err, val) {
            for (i = 0; i < val.length; i++) {
                if (val[i].date == date) {
                    var newvalues = { $set: { no: permanent.length } };
                    userData.updateOne({ subgid: req.body._id, date: val[i].date }, (newvalues), function (er, some) {
                        console.log('updatedd');
                    })
                    ok = 0;
                    break;
                }
            }
            if (ok == 1) {
                const some = userData.create(temp);
            }
        })


    })
})


app.post('/api/reject', async (req, res) => {
    console.log(req.body);
    subgData.find(({ _id: req.body._id }), function (err, val) {
        var permanent = [];
        var followers = [];
        permanent = val[0].permanent;
        followers = val[0].followers;
        for (var i = 0; i < followers.length; i++) {
            if (followers[i] == req.body.email) {
                var spliced = followers.splice(i, 1);
                console.log("Removed element: " + spliced);
                console.log("Remaining elements: " + followers);
            }
        }
        console.log(permanent, "  ", followers)
        var newvalues = { $set: { followers: followers } };

        subgData.updateOne({ _id: req.body._id }, newvalues, function (errr, res) {
            if (errr) console.log(errr);
            else console.log('1 document updated ');
        })



    })
})


app.post('/api/postData', async (req, res) => {
    console.log(req.body, 'ss here ');
    const user = postData.create(req.body);
    var newvalues = { $inc: { posts: 1 } };

    subgData.updateOne(({_id:req.body.subgid}),newvalues,function(err,res)
    {
        if(err)
        {
            console.log(err);
        }
        else 
        {
            console.log('subg updated ');
        }
    })
    var len = 0;
    // postData.find(({subgid:req.body.subgid}),function(err,val)
    // {
    //     console.log('hrer ');
    //     len = val.length;
    // })
    var date = new Date();
    var datestr = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate()
    var temp = {
        date: datestr,
        no: 1,
        subgid: req.body.subgid
    }
    var ok = 1;
    postNumber.find(({ subgid: req.body.subgid }), function (err, val) {
        console.log('thisi val', val);
        for (var i = 0; i < val.length; i++) {
            if (val[i].date == datestr) {
                var newvalues = { $set: { no: val[i].no + 1 } };
                postNumber.updateOne({ subgid: req.body.subgid, date: val[i].date }, (newvalues), function (er, some) {
                    console.log('updatedd');
                })
                ok = 0;
                break;
            }
        }
        if (ok == 1) {
            const some = postNumber.create(temp);
        }
    })

    return res.status(200).send('ok');
})

app.post('/api/getPosts', (req, res) => {
    // console.log(req.body);

    var date = new Date();
    var datestr = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate()
    var temp = {
        date: datestr,
        no: 1,
        subgid: req.body._id
    }
    var ok = 1;
    subgUsersData.find(({ subgid: req.body._id }), function (err, val) {
        console.log('thisi val', val);
        for (var i = 0; i < val.length; i++) {
            if (val[i].date == datestr) {
                var newvalues = { $set: { no: val[i].no + 1 } };
                subgUsersData.updateOne({ subgid: req.body._id, date: val[i].date }, (newvalues), function (er, some) {
                    console.log('updatedd');
                })
                ok = 0;
                break;
            }
        }
        if (ok == 1) {
            const some = subgUsersData.create(temp);
        }
    })

    postData.find(({ subgid: req.body._id }), function (err, val) {
        // console.log('tji is return value ', val)
        if (err) {
            res.status(400).send("error");
        }
        else
            return res.status(200).send(val);
    })


})

app.post('/api/savePosts', async (req, res) => {
    // console.log(req.body);
    postData.find(({ _id: req.body.postid }), function (err, val) {
        console.log(val[0])
        var temparr = val[0].saved;
        temparr.push(req.body.email);
        var newvalues = { $set: { saved: val[0].saved } };

        postData.updateOne({ _id: req.body.postid }, newvalues, function (errr, res) {
            if (errr) console.log(errr);
            else console.log('1 document updated ');
        })
        return res.status(200).send(val);
    })
})

app.post('/api/upvote', async (req, res) => {
    console.log(req.body);
    postData.find(({ _id: req.body.postid }), function (err, val) {
        var temparr = val[0].like;
        for (var i = 0; i < val[0].like.length; i++) {
            if (val[0].like[i] == req.body.email) {
                console.log('came herer ')

                var newarr = temparr.filter((_, index) => temparr[index] != req.body.email);
                var newvalues = { $set: { like: newarr } };

                postData.updateOne({ _id: req.body.postid }, newvalues, function (errr, res) {
                    if (errr) console.log(errr);
                    else console.log('1 document updated ');
                })

                return res.status(200).send(val);

            }
        }
        temparr.push(req.body.email);

        var newvalues = { $set: { like: temparr } };

        postData.updateOne({ _id: req.body.postid }, newvalues, function (errr, res) {
            if (errr) console.log(errr);
            else console.log('1 document updated ');
        })


        return res.status(200).send(val);
    })
})


app.post('/api/downvote', async (req, res) => {
    console.log(req.body);
    postData.find(({ _id: req.body.postid }), function (err, val) {

        var temparr = val[0].dislike;
        for (var i = 0; i < val[0].dislike.length; i++) {
            if (val[0].dislike[i] == req.body.email) {

                var newarr = temparr.filter((_, index) => temparr[index] != req.body.email);
                var newvalues = { $set: { dislike: newarr } };

                postData.updateOne({ _id: req.body.postid }, newvalues, function (errr, res) {
                    if (errr) console.log(errr);
                    else console.log('1 document updated ');
                })

                return res.status(200).send(val);

            }
        }
        temparr.push(req.body.email);

        var newvalues = { $set: { dislike: temparr } };

        postData.updateOne({ _id: req.body.postid }, newvalues, function (errr, res) {
            if (errr) console.log(errr);
            else console.log('1 document updated ');
        })


        return res.status(200).send(val);
    })
})


app.post('/api/savedPosts', async (req, res) => {
    console.log(req.body);
    postData.find(({}), function (err, val) {
        var temparr = [];
        // console.log(val);
        for (var i = 0; i < val.length; i++) {
            for (var j = 0; j < val[i].saved.length; j++) {
                console.log(val[i].saved, req.body.email)
                if (val[i].saved[j] == req.body.email) {
                    temparr.push(val[i]);
                    break;
                }
            }
        }
        return res.status(200).send(temparr);
    })

});

app.post('/api/deletePosts', async (req, res) => {
    // console.log('tis is this   ', req.body);


    postData.find(({ _id: req.body.postid }), function (err, val) {
        if (err) {
            console.log('in err');
            return res.status(400).send(err);
        }
        else {
            var temparr = val[0].saved;
            var temparr = temparr.filter((_, i) => temparr[i] != req.body.email)
            var newvalues = { $set: { saved: temparr } };
            console.log(temparr)
            postData.updateOne(({ _id: req.body.postid }), (newvalues), function (errr, res) {
                if (errr) console.log(errr);
                else console.log('1 document updated ');
            })
            // console.log(val);
        }

        return res.status(200).send(temparr);
    })

});

app.post('/api/saveComments', async (req, res) => {
    console.log(req.body);
    var temp = req.body.index;
    temp.comments.push(req.body.comments.comment);
    var newvalues = { $set: { comments: temp.comments } };

    postData.updateOne(({ _id: temp._id }), (newvalues), function (errr, res) {
        if (errr) console.log(errr);
        else console.log('1 document updated ');
    })
});

app.post('/api/permanent', async (req, res) => {
    console.log('permanent ', req.body);
    subgData.find(({ _id: req.body._id }), function (err, val) {
        if (err) {
            return res.status(400).send(err);
        }
        else {
            console.log(val[0]);
            return res.status(200).send(val[0].permanent);
        }
    })
})

app.post('/api/report', async (req, res) => {

    console.log(req.body);

    const res2 = await reportData.create(req.body);
    return res.status(200).send(":)");
});

app.post('/api/ReportData', async (req, res) => {
    console.log(req.body);

    var date_diff_inseconds = function (date) {
        var dt1 = new Date(date);
        var dt2 = new Date();
        // console.log(dt1,dt2);
        // var ans =  Math.floor((Date.UTC( dt2.getMonth(), dt2.getDate(), dt2.getTime()) - Date.UTC( dt1.getMonth(), dt1.getDate(), dt2.getTime())) / (1000));
        var ans = Math.floor((dt2.getTime() - dt1.getTime()) / (1000 * 60 * 60 * 24));
        console.log(dt1.getTime(), '   ', dt2.getTime());
        console.log('ans is ', ans);
        return ans;
    }

    reportData.find(({ subgid: req.body.subgid }), function (err, val) {
        // console.log(val);
        if (err) {
            return res.status(400).send(err);
        }
        else {
            var toDelete = [], toReturn = [];
            for (var i = 0; i < val.length; i++) {
                console.log('this is date ', val[i].date, date_diff_inseconds(val[i].date));
                if (date_diff_inseconds(val[i].date) > 1) //  1 hour 
                {
                    toDelete.push(val[i]);
                }
                else {
                    toReturn.push(val[i]);
                }
            }
            for (var i = 0; i < toDelete.length; i++) {
                reportData.deleteOne(({ _id: toDelete[i]._id }), function (er, some) {
                    console.log('deleted');
                })
            }

            return res.status(200).send(toReturn);
        }
    })
    // return res.status(200).send('ok');


})
app.post('/api/ignore', async (req, res) => {
    console.log(req.body);
    var newvalues = { $set: { state: 1 } };
    reportData.updateOne(({ _id: req.body._id }), (newvalues), function (err, some) {

        console.log('updated');
    })
    return res.status(200).send('updated')
})

app.post('/api/deletereport', async (req, res) => {

    console.log(req.body);

    var len = 0;
    var temp2 = 0, temp3 = 0;
    var del = [];
    
    var newvalues2 = { $inc: { posts: -1 } };

    subgData.updateOne(({_id:req.body.subgid}),newvalues2,function(err,res)
    {
        if(err)
        {
            console.log(err);
        }
        else 
        {
            console.log('subg updated ');
        }
    })

    reportDeletedata.find(({ subgid: req.body.subgid }), function (err, val) {
        console.log('this is val ', val);
        for (var i = 0; i < val.length; i++) {
            if (val[i].deleted > temp2) {
                temp2 = val[i].deleted;
            }
            if (val[i].store > temp3) {
                temp3 = val[i].store;
            }
        }
        // console.log(temp2,'this is temp2');
        console.log(temp2, 'this is temp2');
        var store = 0;
        reportData.find(({ postid: req.body.postid }), function (err, val3) {
            store = val3.length;
            reportData.find(({ subgid: req.body.subgid }), function (err, val2) {
                len = val2.length;
                console.log('length', val2.length);
                const some = {
                    subgid: req.body.subgid,
                    reported: len + temp3,
                    deleted: temp2 + 1,
                    store: store + temp3
                }
                console.log('this     ml', some);
                reportDeletedata.create(some);

                postData.remove(({ _id: req.body.postid }), function (err, res) {
                    console.log('deleted post ')

                    var newvalues = { $set: { state: 1 } };
                    reportData.remove(({ postid: req.body.postid }), function (err, some) {
                        console.log('deleted');
                    })
                })



            })
        })


    })
    // temp2 = Math.max(...del);
    return res.status(200).send('updated')
})

app.post('/api/blockuser', async (req, res) => {
    console.log(req.body);
    subgData.find(({ _id: req.body.subgid }), function (err, val) {
        var blockedusers = val[0].blockedusers;
        blockedusers.push(req.body.reportedof);
        blockedusers = [...new Set(blockedusers)];
        var permanent = val[0].permanent;
        var permanent = permanent.filter((_, index) => permanent[index] != req.body.reportedof);

        var newvalues = { $set: { blockedusers: blockedusers, permanent: permanent } };
        subgData.updateOne(({ _id: req.body.subgid }), (newvalues), function (er, some) {

            console.log('updated');
        })
    })
    var newv = { $set: { state: 3 } };

    reportData.updateOne(({ _id: req.body._id }), (newv), function (err, val) {
        console.log('updated reports  ');
    })

    var newvalues = { $set: { email: 'BLOCKED USER' } };
    postData.updateOne(({ _id: req.body.postid }), (newvalues), function (err, val) {
        console.log('updated posts ');
    })


    return res.status(200).send('updated')



})

app.post('/api/Blockedusers', async (req, res) => {
    console.log(req.body);
    reportData.find(({ subgid: req.body._id }), function (err, val) {
        var temparr = [];
        for (var i = 0; i < val.length; i++) {
            if (val[i].state == 3) {
                temparr.push(val[i].reportedof);
            }
        }
        var newarr = [...new Set(temparr)];
        console.log('set is ', newarr);
        return res.status(200).send(newarr);
    })
});

app.post('/api/firstchart', async (req, res) => {
    userData.find(({}), function (err, val) {
        var temparr = {
            labels: [],
            datasets: []
        };
        for (var i = 0; i < val.length; i++) {
            if (val[i].subgid == req.body.subgid) {
                temparr.labels.push(val[i].date);
                temparr.datasets.push(val[i].no);
            }
        }
        return res.status(200).send(temparr);
    })
});

app.post('/api/secondchart', async (req, res) => {
    console.log(req.body);
    postNumber.find(({ subgid: req.body.subgid }), function (err, val) {
        var temparr = {
            labels: [],
            datasets: []
        };
        for (var i = 0; i < val.length; i++) {

            temparr.labels.push(val[i].date);
            temparr.datasets.push(val[i].no);

        }
        console.log(temparr);
        return res.status(200).send(temparr);
    })
});

app.post('/api/thirdchart', async (req, res) => {
    console.log(req.body);
    reportDeletedata.find(({ subgid: req.body.subgid }), function (err, val) {
        var temparr = {
            labels: [],
            datasets: []
        };
        for (var i = 0; i < val.length; i++) {

            temparr.labels.push(val[i].deleted);
            temparr.datasets.push(val[i].reported);

        }
        console.log(temparr);
        return res.status(200).send(temparr);
    })
});


app.post('/api/fourthchart', async (req, res) => {
    console.log(req.body);
    subgUsersData.find(({ subgid: req.body.subgid }), function (err, val) {
        var temparr = {
            labels: [],
            datasets: []
        };
        for (var i = 0; i < val.length; i++) {

            temparr.labels.push(val[i].date);
            temparr.datasets.push(val[i].no);

        }
        console.log(temparr);
        return res.status(200).send(temparr);
    })
});

app.listen(PORT, () => {
    console.log('Server running on PORT ', PORT);
})