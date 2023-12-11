const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/UserRoutes");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

//const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

 app.use(express.static(path.join(__dirname, "../netflix-ui/build")));
 app.get("*", function (req, res) {
   res.sendFile(path.join(__dirname, "../netflix-ui/build/index.html"));
 });

//mongoose.connect("mongodb://127.0.0.1:27017/netflix",{
mongoose.connect("mongodb+srv://princebhandari:princebhandari@cluster0.agdo9ep.mongodb.net/netflix?retryWrites=true&w=majority",{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("DB Connetion Successfull");
  });
// .catch((err) => {
// console.log(err.message);
//});


app.use("/api/user", userRoutes);
app.listen(10000, console.log("server started ",port));
