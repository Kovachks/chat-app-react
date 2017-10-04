const express = require("express")
const app = express();
var server = require('http').createServer(app)
const http    =  require('http').Server(app);
const io      =  require("socket.io")(server);
const mongoose = require("mongoose");
const bodyParser = require("body-parser")



/*Creating Schema and Models for DB*/
const Schema = mongoose.Schema;

const MessageSchema = new Schema({s_text: String});

const Message = mongoose.model('Message', MessageSchema)

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/chat",
    {
      useMongoClient: true
    }
  );

const db = mongoose.connection;

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
    console.log("Mongoose Connected")
});

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
  }
/*  This is auto initiated event when Client connects to Your Machine.  */

io.on('connection',function(socket){  
    console.log("A user is connected");
    socket.on('status added',function(status){
      add_status(status,function(res){
          console.log(status)
        if(res){
            io.emit('refresh feed',status);
        } else {
            io.emit('error');
        }
      });
    });
    socket.on('disconnect', function(){
        console.log("A user has disconnected")
    })
});

const add_status = function (status,callback) {
    Message.create({s_text: status},function(err){
            if(!err) {
              callback(true);
            }
        });
    };

const PORT = 8000;

server.listen(PORT,function(){
    console.log("Listening on " + PORT);
});
