require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { mongoose } = require('./db.js');
const jwt = require ('jsonwebtoken');

var articleController = require('./controllers/articleController.js');
var userController = require('./controllers/userController.js');
var app = express();
let refreshTokens = [];

app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:4200' }));

app.listen(3000, () => console.log('Server started at port : 3000'));


app.use('/articles', articleController);
app.use('/users', userController);
 



function authenticateToken(req, res, next) {
  const bearerHeader = req.headers['authorization']
  if (typeof bearerHeader !== undefined){
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      req.token = bearerToken ; 
      next();
  }else{
      res.sendStatus(403);
  } 
}

app.get('/protected', authenticateToken, (req, res) => {
  jwt.verify(req.token,process.env.ACCESS_TOKEN_SECRET, (err,data) => {
      if(err){
          res.sendStatus(403);
      }else{
          res.json({
              text:'this is protected',
              data: data
          });
      }
  })
});
app.delete('/logout', (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  res.sendStatus(204)
})
app.post('/token', (req, res) => {
  const refreshToken = req.body.token
  if (refreshToken == null) return res.sendStatus(401)
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    const accessToken = generateAccessToken({ name: user.name })
    res.json({ accessToken: accessToken })
  })
})
