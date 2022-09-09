require('dotenv').config();

const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
const bcrypt = require('bcrypt')
const jwt = require ('jsonwebtoken');

var { User } = require('../models/user');



// => localhost:3000/users/
router.get('/', (req, res) => {
    User.find((err, docs) => {
        if (!err) { res.send(docs);}
        else { console.log('Error in Retriving Users :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        User.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving User :' + JSON.stringify(err, undefined, 2)); }
    });
});


router.post('/',async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    var user = new User({
        name: req.body.name,
        lastname: req.body.lastname,
        birthday: req.body.birthday,
        email: req.body.email,
        password: hashedPassword,
        role: "User"
    });
    user.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in User Save :' + JSON.stringify(err, undefined, 2)); }
    });
});
router.post('/login', async (req, res) => {
    const emailreq = req.body.email;
    const firstuser = await User.findOne({ email: emailreq }).exec();
    const user = { email: emailreq};
    
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET,{expiresIn: "20s"});
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET,{expiresIn: "1y"});

    if(firstuser==null){
        return res.status(400).send('Cannot find user')
    }else{
        try {
            if(await bcrypt.compare(req.body.password, firstuser.password)) {
              res.json({accessToken: accessToken,
                        refreshToken: refreshToken});
              res.send('Success');
            } else {
              res.send('Not Allowed')
            }
          } catch {
            res.status(500).send()
          }
    }
    
  })
router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var user = {
        name: req.body.name,
        lastname: req.body.lastname,
        birthday: req.body.birthday,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role
    };
    User.findByIdAndUpdate(req.params.id, { $set: user }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in User Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        User.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in User Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});


module.exports = router;