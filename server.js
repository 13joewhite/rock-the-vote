const express = require('express')
const app = express()
require("dotenv").config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const expressJwt = require('express-jwt')
const secret = process.env.SECRET || "some secret passphrase here for local development"

app.use(express.json())
app.use(morgan('dev'))
 
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
    
    app.use('/auth', require('./routes/authRouter'))
    app.use("/api", expressJwt({secret: secret, algorithms: ['sha1', 'RS256', 'HS256']}))
    app.use('/api/post', require('./routes/postRouter.js'))
    app.use('/api/user', require('./routes/userRouter.js'))
    app.use('/api/likeDislike', require('./routes/likeDislikeRouter.js'))
    app.use('/api/comment', require('./routes/commentRouter.js'))
    
    app.use((err, req, res, next) => {
      console.log(err)
        if(err.name === "UnauthorizedError") {
          res.status(err.status)
        }
      return res.send({errMsg: err.message})
    })

      // ... other imports 
  const path = require("path")

  // ... other app.use middleware 
  app.use(express.static(path.join(__dirname, "client", "build")))

  // ...
  // Right before your app.listen(), add this:
  app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });

  const port = process.env.PORT || 7000
app.listen(port, () => {
    console.log(`Server running on Port ${port}`)
})