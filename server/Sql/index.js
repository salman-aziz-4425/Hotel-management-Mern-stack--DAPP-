const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const multer=require("multer");
const jwt=require('jsonwebtoken')
const upload=multer({
  limits:{
      fileSize:1000000
  },
  fileFilter(req,file,cb){
      if(!file.originalname.endsWith(/\.(jpg|jpeg|png)$/)){
          return cb(new Error('Please upload a PDF'))
      }
       cb(undefined,true)
  }
})
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  database: "salman1",
  password: "password",
});

app.post("/create", (req, res) => {
  const name = req.body.name
  const Email=req.body.Email
  const Password=req.body.password
  console.log(name)
console.log(name)
  db.query(
    "INSERT INTO Registeration (name,Email,Password) VALUES (?,?,?)",
    [name,Email,Password],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});
app.use(express.json());
app.get("/Login", (req, res) => {
  db.query(
    `SELECT * FROM Registeration where name=? and Password=?`,
    [req.query.name,req.query.password],
    (err, result) => {
      if (err) {
        console.log("error")
      } else {
        res.send({
          name:result[0].name,
          Email:result[0].Email,
          password:result[0].Password,
          token:"token",
        })
      }
    }
  );
});
app.get("/Rooms", (req, res) => {
  const type = req.query.type
  const Price=parseInt(req.query.Price)
  db.query(
    `SELECT * from ROOMS WHERE name=? or Price<=?`,
    [type,Price],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result)
      }
    }
  );
});

app.use(express.json());
app.post('/update', (req, res) => {
const password=req.body.Password
const name=req.body.Name
  db.query(
    "UPDATE Registeration SET Password=? Where name=?",
    [password,name],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values updated");
      }
    }
  );
});
app.post('/Booking',(req,res)=>{
  const Username=req.body.User;
const Roomname=req.body.Room;
const Imagesrc=req.body.image;
const RoomDesc=req.body.Description;
  db.query(
    "INSERT INTO BOOKING VALUES(?,?,?,?)",
    [Username,Roomname,Imagesrc,RoomDesc],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Room booked");
      }
    })
})

app.get("/BookedRooms", (req, res) => {
  const name = req.query.name
  db.query(
    `SELECT * from Booking WHERE username=?`,
    [name],
    (err,result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result)
      }
    }
  );
});
app.delete("/deleteRooms", (req, res) => {
  const Roomname =req.query.Roomname
  const name=req.query.name
  console.log(Roomname)
  console.log(name)
  db.query(
    `DELETE FROM Booking WHERE Roomname=? and username=?`,
    [Roomname,name],
    (err,result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("OK")
      }
    }
  );
});
app.post('/users/me/avatar',upload.single('avatar'),async (req,res)=>{
  const buffer=await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
 console.log(buffer)
  
  res.send()
},(error,req,res,next)=>{
  res.status(400).send({error:error.message})
})

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});
