const express = require("express");
const connectDB = require("./config/db");

const app = express();
//Connect Database
connectDB();

//Init Middleware
app.use(express.json({ extended: false }))

app.get("/", (req,res) => res.send("Server Running"));

//Define Routes
app.use("/api/user", require("./routes/api/user"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/profile", require("./routes/api/profile"));


const PORT =process.env.PORT || 3000;
app.listen(PORT,function(){
    console.log("Server Running successfully on port "+PORT)
})