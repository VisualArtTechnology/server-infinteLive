
const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./router");
const port = process.env.port || 3000;
const fileUpload = require('express-fileupload')

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


app.use('/',router)


app.listen(port,() => {
  console.log(`example listening ${port}`);
})